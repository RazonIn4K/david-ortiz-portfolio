/**
 * Lightweight Storage Alternative to MongoDB
 *
 * For a portfolio site, you're absolutely right - MongoDB is overkill!
 * Here's a simpler approach using Vercel's built-in services:
 *
 * Option 1: Vercel KV (Redis) - Best for your use case
 * - Perfect for rate limiting
 * - Session storage
 * - Simple key-value pairs
 * - No connection management needed
 *
 * Option 2: Just use existing services
 * - Formspree for contact forms (you already have this!)
 * - Vercel Analytics (already integrated!)
 * - Remove chat logging entirely (not critical for portfolio)
 */

// Example using Vercel KV (when you set it up)
import { kv } from '@vercel/kv';

/**
 * Rate limiting with Vercel KV
 * Much simpler than MongoDB!
 */
export async function checkRateLimit(identifier, limit = 5, window = 3600) {
  const key = `rate_limit:${identifier}`;
  const count = await kv.incr(key);

  if (count === 1) {
    await kv.expire(key, window);
  }

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    reset: Date.now() + window * 1000
  };
}

/**
 * For contact forms - just use Formspree!
 * You already have it integrated, no database needed
 */
export async function handleContactForm(data) {
  // Formspree handles everything
  // No need to store in database
  return { success: true };
}

/**
 * For analytics - Vercel Analytics handles this
 * No need for custom storage
 */
export async function trackEvent(event) {
  // Vercel Analytics already does this
  // Just use their dashboard
  return { tracked: true };
}

/**
 * RECOMMENDATION:
 *
 * 1. Remove MongoDB completely - it's overkill
 * 2. Use Formspree for contacts (already done!)
 * 3. Use Vercel Analytics (already done!)
 * 4. For rate limiting: Use Vercel KV or just in-memory
 * 5. For chat: Consider removing or use simple in-memory storage
 *
 * This will:
 * - Reduce complexity
 * - Lower costs (no MongoDB Atlas fees)
 * - Faster response times
 * - Easier maintenance
 * - Still have all the features you need!
 */

// Simple in-memory storage for development/small scale
const memoryStore = new Map();

export function simpleRateLimit(key, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!memoryStore.has(key)) {
    memoryStore.set(key, []);
  }

  const requests = memoryStore.get(key)
    .filter(time => time > windowStart);

  if (requests.length >= limit) {
    return { allowed: false, remaining: 0 };
  }

  requests.push(now);
  memoryStore.set(key, requests);

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    for (const [k, v] of memoryStore.entries()) {
      const valid = v.filter(time => time > windowStart);
      if (valid.length === 0) {
        memoryStore.delete(k);
      } else {
        memoryStore.set(k, valid);
      }
    }
  }

  return { allowed: true, remaining: limit - requests.length };
}

export default {
  checkRateLimit,
  handleContactForm,
  trackEvent,
  simpleRateLimit
};