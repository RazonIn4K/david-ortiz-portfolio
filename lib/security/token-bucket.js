/**
 * Token Bucket Rate Limiter
 *
 * Implements the token bucket algorithm for rate limiting API requests.
 * This provides smoother rate limiting compared to simple window-based approaches.
 *
 * Features:
 * - Token bucket algorithm (allows bursts while maintaining average rate)
 * - In-memory storage (use Redis for production multi-instance setups)
 * - Automatic cleanup of expired buckets
 * - Per-IP and per-key rate limiting
 *
 * PRIVACY: Only stores hashed IPs, never raw IP addresses.
 *
 * @module lib/security/token-bucket
 */

import { generateCorrelationId } from './sanitize.js';

/**
 * Token Bucket Class
 *
 * Implements rate limiting using the token bucket algorithm.
 * Each bucket starts with a maximum number of tokens and refills at a constant rate.
 */
class TokenBucket {
  /**
   * Creates a new token bucket
   *
   * @param {Object} options - Configuration options
   * @param {number} options.capacity - Maximum number of tokens (burst capacity)
   * @param {number} options.refillRate - Tokens added per second
   * @param {number} options.windowMs - Time window in milliseconds (for cleanup)
   */
  constructor(options = {}) {
    this.capacity = options.capacity || 60;
    this.refillRate = options.refillRate || 1; // tokens per second
    this.tokens = this.capacity;
    this.lastRefill = Date.now();
  }

  /**
   * Refills tokens based on elapsed time
   */
  refill() {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill) / 1000;
    const tokensToAdd = elapsedSeconds * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  /**
   * Attempts to consume a token
   *
   * @param {number} tokens - Number of tokens to consume (default: 1)
   * @returns {boolean} True if tokens were consumed successfully
   */
  consume(tokens = 1) {
    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }

    return false;
  }

  /**
   * Gets current bucket state
   *
   * @returns {Object} { tokens: number, capacity: number, percentage: number }
   */
  getState() {
    this.refill();

    return {
      tokens: Math.floor(this.tokens),
      capacity: this.capacity,
      percentage: Math.floor((this.tokens / this.capacity) * 100)
    };
  }
}

/**
 * Rate Limiter using Token Buckets
 *
 * Manages multiple token buckets for different clients/keys.
 */
class RateLimiter {
  /**
   * Creates a new rate limiter
   *
   * @param {Object} options - Configuration options
   * @param {number} options.capacity - Maximum tokens per bucket (burst size)
   * @param {number} options.refillRate - Tokens per second
   * @param {number} options.cleanupIntervalMs - Cleanup interval (default: 60000)
   * @param {number} options.maxBucketAge - Max bucket age in ms (default: 300000)
   */
  constructor(options = {}) {
    this.capacity = options.capacity || 60;
    this.refillRate = options.refillRate || 1;
    this.cleanupIntervalMs = options.cleanupIntervalMs || 60000; // 1 minute
    this.maxBucketAge = options.maxBucketAge || 300000; // 5 minutes

    this.buckets = new Map();
    this.lastAccess = new Map();

    // Start cleanup timer
    this.startCleanup();
  }

  /**
   * Gets or creates a token bucket for a key
   *
   * PRIVACY: Hashes the key before storage (no raw IPs stored)
   *
   * @param {string} key - Client identifier (IP, user ID, etc.)
   * @returns {TokenBucket} Token bucket for this key
   */
  getBucket(key) {
    // Hash the key for privacy (no raw IPs in memory)
    const hashedKey = generateCorrelationId(key);

    if (!this.buckets.has(hashedKey)) {
      this.buckets.set(hashedKey, new TokenBucket({
        capacity: this.capacity,
        refillRate: this.refillRate
      }));
    }

    this.lastAccess.set(hashedKey, Date.now());
    return this.buckets.get(hashedKey);
  }

  /**
   * Attempts to consume tokens for a key
   *
   * @param {string} key - Client identifier
   * @param {number} tokens - Number of tokens to consume
   * @returns {Object} { allowed: boolean, remaining: number, resetTime: number }
   */
  consume(key, tokens = 1) {
    const bucket = this.getBucket(key);
    const allowed = bucket.consume(tokens);
    const state = bucket.getState();

    return {
      allowed,
      remaining: state.tokens,
      resetTime: Date.now() + (this.capacity - state.tokens) / this.refillRate * 1000,
      retryAfter: allowed ? 0 : Math.ceil((tokens - state.tokens) / this.refillRate)
    };
  }

  /**
   * Checks if request is allowed without consuming tokens
   *
   * @param {string} key - Client identifier
   * @param {number} tokens - Number of tokens needed
   * @returns {boolean} True if request would be allowed
   */
  check(key, tokens = 1) {
    const bucket = this.getBucket(key);
    const state = bucket.getState();
    return state.tokens >= tokens;
  }

  /**
   * Periodic cleanup of old buckets
   */
  cleanup() {
    const now = Date.now();

    for (const [key, lastTime] of this.lastAccess.entries()) {
      if (now - lastTime > this.maxBucketAge) {
        this.buckets.delete(key);
        this.lastAccess.delete(key);
      }
    }
  }

  /**
   * Starts periodic cleanup timer
   */
  startCleanup() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.cleanupIntervalMs);

    // Don't keep process alive for cleanup
    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  /**
   * Stops cleanup timer
   */
  stopCleanup() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
  }

  /**
   * Gets current statistics
   *
   * @returns {Object} { activeBuckets: number, totalRequests: number }
   */
  getStats() {
    return {
      activeBuckets: this.buckets.size,
      oldestBucket: this.getOldestBucketAge()
    };
  }

  /**
   * Gets age of oldest bucket
   */
  getOldestBucketAge() {
    const now = Date.now();
    let oldest = 0;

    for (const lastTime of this.lastAccess.values()) {
      const age = now - lastTime;
      if (age > oldest) {
        oldest = age;
      }
    }

    return oldest;
  }
}

/**
 * Preset rate limiter configurations
 */
export const RATE_LIMIT_PRESETS = {
  // Strict: 30 requests/minute with 30 burst
  strict: {
    capacity: 30,
    refillRate: 0.5 // 30 per minute = 0.5 per second
  },

  // Standard: 60 requests/minute with 60 burst
  standard: {
    capacity: 60,
    refillRate: 1 // 60 per minute = 1 per second
  },

  // Relaxed: 120 requests/minute with 120 burst
  relaxed: {
    capacity: 120,
    refillRate: 2 // 120 per minute = 2 per second
  },

  // API: 100 requests/minute with 20 burst
  api: {
    capacity: 20,
    refillRate: 1.67 // 100 per minute = 1.67 per second
  }
};

/**
 * Creates a rate limiter with a preset configuration
 *
 * @param {string} preset - Preset name ('strict', 'standard', 'relaxed', 'api')
 * @returns {RateLimiter} Configured rate limiter
 */
export function createRateLimiter(preset = 'standard') {
  const config = RATE_LIMIT_PRESETS[preset] || RATE_LIMIT_PRESETS.standard;
  return new RateLimiter(config);
}

/**
 * Express/Vercel middleware for rate limiting
 *
 * @param {RateLimiter} limiter - Rate limiter instance
 * @param {Object} options - Middleware options
 * @returns {Function} Middleware function
 */
export function rateLimitMiddleware(limiter, options = {}) {
  const {
    keyGenerator = (req) => req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
    onRateLimited = null
  } = options;

  return (req, res, next) => {
    const key = keyGenerator(req);
    const result = limiter.consume(key);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    res.setHeader('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

    if (!result.allowed) {
      res.setHeader('Retry-After', result.retryAfter);

      if (onRateLimited) {
        return onRateLimited(req, res, result);
      }

      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: result.retryAfter,
        message: `Rate limit exceeded. Please try again in ${result.retryAfter} seconds.`
      });
    }

    // Call next middleware
    if (next) {
      next();
    }
  };
}

/**
 * Default exports
 */
export default {
  TokenBucket,
  RateLimiter,
  createRateLimiter,
  rateLimitMiddleware,
  RATE_LIMIT_PRESETS
};
