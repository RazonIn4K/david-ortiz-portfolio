/**
 * Lightweight Storage Module
 *
 * A simple, efficient storage solution perfect for portfolio sites.
 * No database needed - leverages platform services and in-memory storage.
 */

// Optional: Uncomment when ready to use Vercel KV
// import { kv } from '@vercel/kv';

/**
 * Lightweight storage class with in-memory default and KV upgrade path
 */
export class LightweightStore {
  constructor(options = {}) {
    this.useKV = options.useKV || process.env.USE_VERCEL_KV === 'true';
    this.memoryStore = new Map();
    this.cleanupInterval = null;

    // Start cleanup interval for in-memory store
    if (!this.useKV) {
      this.startCleanup();
    }
  }

  /**
   * Get value by key
   */
  async get(key) {
    if (this.useKV) {
      // Uncomment when KV is ready
      // return await kv.get(key);
      return null;
    }

    const entry = this.memoryStore.get(key);
    if (!entry) return null;

    // Check if expired
    if (entry.expires && entry.expires < Date.now()) {
      this.memoryStore.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Set value with optional TTL
   */
  async set(key, value, ttlSeconds = null) {
    if (this.useKV) {
      // Uncomment when KV is ready
      // if (ttlSeconds) {
      //   await kv.setex(key, ttlSeconds, value);
      // } else {
      //   await kv.set(key, value);
      // }
      return;
    }

    const entry = {
      value,
      expires: ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null
    };

    this.memoryStore.set(key, entry);
  }

  /**
   * Delete key
   */
  async delete(key) {
    if (this.useKV) {
      // Uncomment when KV is ready
      // await kv.del(key);
      return;
    }
    this.memoryStore.delete(key);
  }

  /**
   * Rate limiting helper - perfect for API protection
   */
  async checkRateLimit(identifier, options = {}) {
    const {
      limit = 5,
      windowMs = 60000, // 1 minute default
      prefix = 'rate'
    } = options;

    const key = `${prefix}:${identifier}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get current requests
    const requests = (await this.get(key)) || [];

    // Filter to requests within window
    const validRequests = requests.filter(time => time > windowStart);

    // Check if limit exceeded
    if (validRequests.length >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: Math.min(...validRequests) + windowMs
      };
    }

    // Add current request
    validRequests.push(now);
    await this.set(key, validRequests, Math.ceil(windowMs / 1000));

    return {
      allowed: true,
      remaining: limit - validRequests.length,
      resetTime: now + windowMs
    };
  }

  /**
   * Session storage helper
   */
  async getSession(sessionId) {
    return await this.get(`session:${sessionId}`);
  }

  async setSession(sessionId, data, ttlSeconds = 3600) {
    return await this.set(`session:${sessionId}`, data, ttlSeconds);
  }

  /**
   * Simple counter (useful for analytics)
   */
  async increment(key, amount = 1) {
    const current = (await this.get(key)) || 0;
    const newValue = current + amount;
    await this.set(key, newValue);
    return newValue;
  }

  /**
   * Cleanup expired entries (for in-memory store)
   */
  cleanup() {
    if (this.useKV) return;

    const now = Date.now();
    for (const [key, entry] of this.memoryStore.entries()) {
      if (entry.expires && entry.expires < now) {
        this.memoryStore.delete(key);
      }
    }
  }

  /**
   * Start automatic cleanup interval
   */
  startCleanup(intervalMs = 60000) {
    if (this.cleanupInterval) return;

    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, intervalMs);
  }

  /**
   * Stop cleanup interval
   */
  stopCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Get store statistics
   */
  getStats() {
    return {
      type: this.useKV ? 'vercel-kv' : 'in-memory',
      size: this.memoryStore.size,
      memoryUsage: process.memoryUsage().heapUsed
    };
  }
}

// Create singleton instance
const defaultStore = new LightweightStore();

/**
 * Simple rate limiter for immediate use in API endpoints
 */
export function simpleRateLimit(identifier, limit = 5, windowMs = 60000) {
  return defaultStore.checkRateLimit(identifier, { limit, windowMs });
}

/**
 * Session helpers
 */
export const session = {
  get: (id) => defaultStore.getSession(id),
  set: (id, data, ttl) => defaultStore.setSession(id, data, ttl),
  delete: (id) => defaultStore.delete(`session:${id}`)
};

/**
 * Analytics helpers (simple counters)
 */
export const analytics = {
  track: async (event) => {
    const day = new Date().toISOString().split('T')[0];
    await defaultStore.increment(`analytics:${event}:${day}`);
    await defaultStore.increment(`analytics:${event}:total`);
  },

  getCount: async (event, date = null) => {
    if (date) {
      return await defaultStore.get(`analytics:${event}:${date}`);
    }
    return await defaultStore.get(`analytics:${event}:total`);
  }
};

/**
 * Export everything
 */
export default {
  LightweightStore,
  simpleRateLimit,
  session,
  analytics,
  store: defaultStore
};

/**
 * MIGRATION NOTES:
 *
 * Replace legacy database calls with these simple alternatives:
 *
 * 1. Contact Form:
 *    - Before: mongoClient.storeContactSubmission(data)
 *    - After: Just use Formspree (no storage needed)
 *
 * 2. Rate Limiting:
 *    - Before: Complex DB queries
 *    - After: simpleRateLimit(ip, 5, 60000)
 *
 * 3. Analytics:
 *    - Before: server-side DB logging
 *    - After: analytics.track(eventName) or use Vercel Analytics
 *
 * 4. Chat Logs:
 *    - Before: server-side DB logging
 *    - After: Optional - remove or use session.set()
 *
 * Benefits:
 * - 0ms database latency (all in-memory)
 * - Zero configuration required
 * - No connection strings or credentials
 * - Automatically cleans up expired data
 * - Ready for Vercel KV upgrade when needed
 */