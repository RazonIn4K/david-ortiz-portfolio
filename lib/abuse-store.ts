import "server-only"

// Shared store for abuse-control state (rate windows, single-use challenge
// tokens). On serverless, module-level Maps are per-instance and reset on
// cold start, so enforcement is best-effort. When an Upstash-compatible REST
// Redis is configured (Vercel KV / Marketplace Redis / Upstash), state is
// shared across instances; otherwise everything falls back to the in-memory
// Maps with identical semantics. Redis errors fail OPEN to in-memory: this
// state guards abuse, so availability of the real feature wins over strict
// enforcement.

const REDIS_TIMEOUT_MS = 800
const KEY_PREFIX = "dtz:abuse:"

type RedisConfig = { url: string; token: string }

function getRedisConfig(): RedisConfig | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url: url.replace(/\/$/, ""), token } : null
}

export function isPersistentAbuseStoreConfigured() {
  return getRedisConfig() !== null
}

type RedisCommand = (string | number)[]

async function redisPipeline(config: RedisConfig, commands: RedisCommand[]): Promise<unknown[] | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REDIS_TIMEOUT_MS)

  try {
    const response = await fetch(`${config.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      signal: controller.signal,
    })

    if (!response.ok) {
      await response.body?.cancel()
      return null
    }

    const data = (await response.json()) as { result?: unknown; error?: string }[]
    if (!Array.isArray(data) || data.some((entry) => entry.error)) return null

    return data.map((entry) => entry.result)
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

// --- Fixed-window rate counting ----------------------------------------------

type MemoryWindow = { count: number; resetAt: number }
const memoryWindows = new Map<string, MemoryWindow>()

function memoryCleanupWindows(now: number) {
  for (const [key, window] of memoryWindows.entries()) {
    if (window.resetAt <= now) memoryWindows.delete(key)
  }
}

function memoryIncrementWindow(key: string, windowMs: number) {
  const now = Date.now()
  memoryCleanupWindows(now)
  const existing = memoryWindows.get(key)

  if (!existing || existing.resetAt <= now) {
    memoryWindows.set(key, { count: 1, resetAt: now + windowMs })
    return { count: 1, retryAfterSeconds: Math.ceil(windowMs / 1000) }
  }

  existing.count += 1
  return { count: existing.count, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) }
}

/**
 * Count one event in a fixed window. Returns the event count within the
 * current window (1 = first event) and seconds until the window resets.
 */
export async function incrementWindow(
  key: string,
  windowMs: number,
): Promise<{ count: number; retryAfterSeconds: number }> {
  const config = getRedisConfig()
  if (config) {
    const fullKey = `${KEY_PREFIX}${key}`
    const results = await redisPipeline(config, [
      ["INCR", fullKey],
      ["PEXPIRE", fullKey, windowMs, "NX"],
      ["PTTL", fullKey],
    ])

    if (results && typeof results[0] === "number") {
      const ttl = typeof results[2] === "number" && results[2] > 0 ? results[2] : windowMs
      return { count: results[0], retryAfterSeconds: Math.ceil(ttl / 1000) }
    }
  }

  return memoryIncrementWindow(key, windowMs)
}

// --- Single-use token tracking -------------------------------------------------

const memoryUsedTokens = new Map<string, number>()

function memoryCleanupUsedTokens(now: number) {
  for (const [token, expiresAt] of memoryUsedTokens.entries()) {
    if (expiresAt <= now) memoryUsedTokens.delete(token)
  }
}

/** True if the token was already consumed (replay). Read-only. */
export async function hasTokenBeenUsed(key: string): Promise<boolean> {
  const config = getRedisConfig()
  if (config) {
    const results = await redisPipeline(config, [["EXISTS", `${KEY_PREFIX}used:${key}`]])
    if (results && typeof results[0] === "number") {
      return results[0] === 1
    }
  }

  const now = Date.now()
  memoryCleanupUsedTokens(now)
  return memoryUsedTokens.has(key)
}

/** Mark a token consumed for ttlMs (call only after the action succeeds). */
export async function markTokenUsed(key: string, ttlMs: number): Promise<void> {
  const config = getRedisConfig()
  if (config) {
    const results = await redisPipeline(config, [["SET", `${KEY_PREFIX}used:${key}`, "1", "PX", ttlMs]])
    if (results) return
  }

  const now = Date.now()
  memoryUsedTokens.set(key, now + ttlMs)
  memoryCleanupUsedTokens(now)
}
