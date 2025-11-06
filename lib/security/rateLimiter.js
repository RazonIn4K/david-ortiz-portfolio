/**
 * Rate Limiter - Token Bucket Implementation
 *
 * Lightweight in-memory rate limiting for API routes.
 * Default: 10 requests per minute per IP address.
 *
 * PRODUCTION RECOMMENDATION:
 * For production workloads with multiple serverless instances,
 * consider using Upstash Redis for distributed rate limiting:
 * - https://upstash.com/docs/redis/features/ratelimit
 * - Provides atomic operations across instances
 * - Low latency with edge caching
 * - Persistent rate limit state
 *
 * Current implementation is suitable for:
 * - Single-instance deployments
 * - Development/testing
 * - Low-traffic applications
 */

/**
 * In-memory store for rate limiting
 * Structure: Map<string, {tokens: number, lastRefill: number}>
 */
const rateLimitStore = new Map();

/**
 * Rate limit configuration
 */
const DEFAULT_CONFIG = {
  maxRequests: 10,        // Maximum requests per window
  windowMs: 60 * 1000,    // 1 minute window
  tokensPerInterval: 10,  // Tokens to add per interval
};

/**
 * Token bucket rate limiter
 *
 * @param {string} identifier - Unique identifier (IP address, user ID, etc.)
 * @param {Object} config - Rate limit configuration
 * @param {number} config.maxRequests - Maximum requests per window
 * @param {number} config.windowMs - Time window in milliseconds
 * @returns {Object} Rate limit result
 */
export function checkRateLimit(identifier, config = DEFAULT_CONFIG) {
  const now = Date.now();
  const { maxRequests, windowMs } = { ...DEFAULT_CONFIG, ...config };

  // Get or initialize bucket
  let bucket = rateLimitStore.get(identifier);

  if (!bucket) {
    bucket = {
      tokens: maxRequests,
      lastRefill: now
    };
    rateLimitStore.set(identifier, bucket);
  }

  // Calculate tokens to add based on elapsed time (token bucket refill)
  const timeSinceLastRefill = now - bucket.lastRefill;
  const tokensToAdd = Math.floor(timeSinceLastRefill / windowMs) * maxRequests;

  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(maxRequests, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  // Check if request is allowed
  if (bucket.tokens > 0) {
    bucket.tokens -= 1;
    return {
      allowed: true,
      remaining: bucket.tokens,
      resetTime: bucket.lastRefill + windowMs,
      retryAfter: 0
    };
  }

  // Rate limit exceeded
  const retryAfter = Math.ceil((bucket.lastRefill + windowMs - now) / 1000);
  return {
    allowed: false,
    remaining: 0,
    resetTime: bucket.lastRefill + windowMs,
    retryAfter: Math.max(1, retryAfter) // At least 1 second
  };
}

/**
 * Get client identifier from request
 * Extracts IP address from various headers (Vercel, Cloudflare, etc.)
 *
 * @param {Object} req - HTTP request object
 * @returns {string} Client identifier (IP address)
 */
export function getClientIdentifier(req) {
  // Try various headers in order of preference
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list, take the first IP
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    return realIp;
  }

  const vercelForwardedFor = req.headers['x-vercel-forwarded-for'];
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(',')[0].trim();
  }

  // Fallback to connection remote address
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * Middleware function for Vercel serverless functions
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @param {Object} config - Rate limit configuration
 * @returns {boolean} True if allowed, false if rate limited
 */
export function rateLimitMiddleware(req, res, config = DEFAULT_CONFIG) {
  const identifier = getClientIdentifier(req);
  const result = checkRateLimit(identifier, config);

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', config.maxRequests || DEFAULT_CONFIG.maxRequests);
  res.setHeader('X-RateLimit-Remaining', result.remaining);
  res.setHeader('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

  if (!result.allowed) {
    res.setHeader('Retry-After', result.retryAfter);
    res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: result.retryAfter,
      resetTime: new Date(result.resetTime).toISOString()
    });
    return false;
  }

  return true;
}

/**
 * Cleanup old entries from rate limit store
 * Should be called periodically to prevent memory leaks
 *
 * @param {number} maxAge - Maximum age in milliseconds (default: 1 hour)
 */
export function cleanupRateLimitStore(maxAge = 60 * 60 * 1000) {
  const now = Date.now();
  const keysToDelete = [];

  for (const [key, bucket] of rateLimitStore.entries()) {
    if (now - bucket.lastRefill > maxAge) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach(key => rateLimitStore.delete(key));

  return keysToDelete.length;
}

// Auto-cleanup every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => cleanupRateLimitStore(), 60 * 60 * 1000);
}
