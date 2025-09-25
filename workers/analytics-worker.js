/**
 * Cloudflare Worker for Analytics Endpoint
 * Handles analytics events from the portfolio site
 *
 * Deploy this to Cloudflare Workers and update CONFIG.API_BASE_URL
 * with your worker URL (e.g., https://analytics.your-subdomain.workers.dev)
 */

// CORS configuration
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // Update with your domain in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute per IP
};

// Simple in-memory rate limiter (resets on worker restart)
const rateLimitMap = new Map();

/**
 * Check rate limit for IP
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip);
  const validRequests = requests.filter(timestamp => timestamp > windowStart);

  if (validRequests.length >= RATE_LIMIT.maxRequests) {
    return false;
  }

  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);

  // Clean up old entries
  if (rateLimitMap.size > 1000) {
    const oldestIP = rateLimitMap.keys().next().value;
    rateLimitMap.delete(oldestIP);
  }

  return true;
}

/**
 * Handle preflight requests
 */
function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/**
 * Process analytics event
 */
async function processAnalytics(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
        'Retry-After': '60',
      },
    });
  }

  try {
    // Handle both JSON and text/plain content types (for sendBeacon compatibility)
    const contentType = request.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      // Handle text/plain or other content types (common with sendBeacon)
      const text = await request.text();
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
          status: 400,
          headers: {
            ...CORS_HEADERS,
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // Handle array of events or single event
    const events = Array.isArray(data) ? data : [data];
    const validEvents = [];

    // Validate and process each event
    for (const event of events) {
      if (event && (event.event || event.params)) {
        validEvents.push(event);
      }
    }

    if (validEvents.length === 0) {
      return new Response(JSON.stringify({ error: 'No valid events found' }), {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
      });
    }

    // Enrich events with request metadata
    const enrichedEvents = validEvents.map(event => ({
      ...event,
      metadata: {
        ip: ip,
        userAgent: request.headers.get('User-Agent'),
        country: request.headers.get('CF-IPCountry'),
        timestamp: new Date().toISOString(),
      },
    }));

    // If KV namespace is available, store the events
    if (env?.ANALYTICS_KV) {
      for (const event of enrichedEvents) {
        const key = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await env.ANALYTICS_KV.put(key, JSON.stringify(event), {
          expirationTtl: 30 * 24 * 60 * 60, // 30 days
        });
      }
    }

    // Log to console (visible in Cloudflare dashboard)
    console.log('Analytics events processed:', enrichedEvents.length);
    enrichedEvents.forEach(event => console.log('Event:', event));

    // Return success
    return new Response(JSON.stringify({
      success: true,
      processed: enrichedEvents.length
    }), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  }
}

/**
 * Main handler
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // Only accept POST to /api/analytics
    if (request.method !== 'POST' || url.pathname !== '/api/analytics') {
      return new Response('Not found', {
        status: 404,
        headers: CORS_HEADERS,
      });
    }

    return processAnalytics(request, env);
  },
};

/**
 * Deployment instructions:
 *
 * 1. Install Wrangler CLI:
 *    npm install -g wrangler
 *
 * 2. Login to Cloudflare:
 *    wrangler login
 *
 * 3. Create wrangler.toml in this directory:
 *    name = "portfolio-analytics"
 *    main = "analytics-worker.js"
 *    compatibility_date = "2024-01-01"
 *
 * 4. Deploy:
 *    wrangler deploy
 *
 * 5. Update your CONFIG.API_BASE_URL with the worker URL
 *
 * Optional: Create a KV namespace for persistent storage:
 *    wrangler kv:namespace create "ANALYTICS_KV"
 *    Add the binding to wrangler.toml
 */