// Analytics API endpoint for Vercel serverless functions
// Simplified - Vercel Analytics handles real analytics
// This endpoint just returns success for compatibility
/**
 * Rate limiting configuration
 */
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute per IP
  skipSuccessfulRequests: false
};
// In-memory rate limiting store (use Redis in production)
const rateLimitStore = new Map();
/**
 * Simple rate limiting middleware
 */
function rateLimit(req) {
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;
  // Get or create request log for this IP
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }
  const requests = rateLimitStore.get(ip);
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  rateLimitStore.set(ip, validRequests);
  // Check if limit exceeded
  if (validRequests.length >= RATE_LIMIT.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: windowStart + RATE_LIMIT.windowMs
    };
  }
  // Add current request
  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);
  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - validRequests.length,
    resetTime: windowStart + RATE_LIMIT.windowMs
  };
}
/**
 * Validate analytics event data
 */
function validateEvent(event) {
  const required = ['event', 'timestamp', 'sessionId'];
  const missing = required.filter(field => !(field in event));
  if (missing.length > 0) {
    return { valid: false, error: `Missing required fields: ${missing.join(', ')}` };
  }
  // Validate event name
  if (typeof event.event !== 'string' || event.event.length === 0) {
    return { valid: false, error: 'Event name must be a non-empty string' };
  }
  // Validate timestamp
  if (!Number.isInteger(event.timestamp) || event.timestamp <= 0) {
    return { valid: false, error: 'Timestamp must be a positive integer' };
  }
  // Check timestamp is not too old or too far in future
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  const maxFuture = 5 * 60 * 1000; // 5 minutes
  if (event.timestamp < now - maxAge || event.timestamp > now + maxFuture) {
    return { valid: false, error: 'Timestamp is too old or too far in the future' };
  }
  return { valid: true };
}
/**
 * Main handler function
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      allowed: ['POST']
    });
  }
  try {
    // Rate limiting
    const rateCheck = rateLimit(req);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((rateCheck.resetTime - Date.now()) / 1000)
      });
    }
    // Set rate limit headers
    res.setHeader('X-RateLimit-Remaining', rateCheck.remaining);
    res.setHeader('X-RateLimit-Reset', new Date(rateCheck.resetTime).toISOString());
    // Parse request body
    let events;
    try {
      events = Array.isArray(req.body) ? req.body : [req.body];
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid JSON in request body'
      });
    }
    // Validate events
    const validationErrors = [];
    const validEvents = [];
    events.forEach((event, index) => {
      const validation = validateEvent(event);
      if (validation.valid) {
        validEvents.push({
          ...event,
          receivedAt: new Date(),
          userAgent: req.headers['user-agent'],
          ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
        });
      } else {
        validationErrors.push({
          index,
          error: validation.error
        });
      }
    });
    // If no valid events, return validation errors
    if (validEvents.length === 0) {
      return res.status(400).json({
        error: 'No valid events found',
        validationErrors
      });
    }
    // Analytics handled by Vercel Analytics
    // Just log in development for debugging
    if (process.env.NODE_ENV === 'development') {
    }
    // Success response
    const response = {
      success: true,
      processed: validEvents.length,
      stored: validEvents.length,
      timestamp: new Date().toISOString()
    };
    // Include validation errors if any (partial success)
    if (validationErrors.length > 0) {
      response.validationErrors = validationErrors;
      response.warnings = `${validationErrors.length} events were invalid and skipped`;
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
}
/**
 * Configuration for Vercel
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb' // Limit body size to prevent abuse
    }
  }
};