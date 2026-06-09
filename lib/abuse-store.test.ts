import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

// Fresh module per test so the in-memory fallback state never leaks between tests.
async function loadStore() {
  vi.resetModules()
  return import("@/lib/abuse-store")
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.useRealTimers()
  vi.resetModules()
})

describe("abuse-store (in-memory fallback, no Redis configured)", () => {
  beforeEach(() => {
    vi.stubEnv("KV_REST_API_URL", "")
    vi.stubEnv("KV_REST_API_TOKEN", "")
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "")
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "")
  })

  it("reports the persistent store as not configured", async () => {
    const store = await loadStore()
    expect(store.isPersistentAbuseStoreConfigured()).toBe(false)
  })

  it("counts events within a window and resets after it elapses", async () => {
    vi.useFakeTimers()
    const store = await loadStore()

    expect((await store.incrementWindow("k", 60_000)).count).toBe(1)
    expect((await store.incrementWindow("k", 60_000)).count).toBe(2)
    expect((await store.incrementWindow("other", 60_000)).count).toBe(1)

    vi.advanceTimersByTime(61_000)
    expect((await store.incrementWindow("k", 60_000)).count).toBe(1)
  })

  it("tracks single-use tokens until their ttl expires", async () => {
    vi.useFakeTimers()
    const store = await loadStore()

    expect(await store.hasTokenBeenUsed("tok")).toBe(false)
    await store.markTokenUsed("tok", 2_000)
    expect(await store.hasTokenBeenUsed("tok")).toBe(true)

    vi.advanceTimersByTime(2_500)
    expect(await store.hasTokenBeenUsed("tok")).toBe(false)
  })
})

describe("abuse-store (REST Redis configured)", () => {
  beforeEach(() => {
    vi.stubEnv("KV_REST_API_URL", "https://fake-kv.example.com")
    vi.stubEnv("KV_REST_API_TOKEN", "fake-token")
  })

  function pipelineResponse(results: unknown[]) {
    return new Response(JSON.stringify(results.map((result) => ({ result }))), { status: 200 })
  }

  it("uses INCR/PEXPIRE/PTTL for windows and maps the results", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(pipelineResponse([7, 1, 30_000]))
    vi.stubGlobal("fetch", fetchSpy)
    const store = await loadStore()

    const result = await store.incrementWindow("chat:rate:1.2.3.4", 60_000)
    expect(result).toEqual({ count: 7, retryAfterSeconds: 30 })

    const [url, init] = fetchSpy.mock.calls[0]
    expect(String(url)).toBe("https://fake-kv.example.com/pipeline")
    expect(init.headers.Authorization).toBe("Bearer fake-token")
    const commands = JSON.parse(init.body)
    expect(commands[0]).toEqual(["INCR", "dtz:abuse:chat:rate:1.2.3.4"])
    expect(commands[1]).toEqual(["PEXPIRE", "dtz:abuse:chat:rate:1.2.3.4", 60_000, "NX"])
    expect(commands[2]).toEqual(["PTTL", "dtz:abuse:chat:rate:1.2.3.4"])
  })

  it("answers replay checks via EXISTS and marks tokens via SET PX", async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValueOnce(pipelineResponse([0]))
      .mockResolvedValueOnce(pipelineResponse(["OK"]))
      .mockResolvedValueOnce(pipelineResponse([1]))
    vi.stubGlobal("fetch", fetchSpy)
    const store = await loadStore()

    expect(await store.hasTokenBeenUsed("tok")).toBe(false)
    await store.markTokenUsed("tok", 120_000)
    expect(await store.hasTokenBeenUsed("tok")).toBe(true)

    const setCommands = JSON.parse(fetchSpy.mock.calls[1][1].body)
    expect(setCommands[0]).toEqual(["SET", "dtz:abuse:used:tok", "1", "PX", 120_000])
  })

  it("fails open to the in-memory fallback when Redis is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")))
    const store = await loadStore()

    // Still enforces counting locally instead of throwing or always-allowing.
    expect((await store.incrementWindow("k", 60_000)).count).toBe(1)
    expect((await store.incrementWindow("k", 60_000)).count).toBe(2)

    await store.markTokenUsed("tok", 60_000)
    expect(await store.hasTokenBeenUsed("tok")).toBe(true)
  })
})
