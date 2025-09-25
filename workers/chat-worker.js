/**
 * Cloudflare Worker for Chat Endpoint
 * Provides a simple chat interface with OpenRouter API
 *
 * Deploy this to Cloudflare Workers and update CONFIG.API_BASE_URL
 * Set your OPENROUTER_API_KEY as an environment variable
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // Update with your domain in production
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute per IP
};

const rateLimitMap = new Map();

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
  return true;
}

async function handleChat(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({
      error: 'Too many requests. Please wait a moment.'
    }), {
      status: 429,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { message, sessionId, history = [] } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({
        error: 'Message is required'
      }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    // Check for API key
    if (!env.OPENROUTER_API_KEY) {
      // Fallback response when API key is not configured
      return new Response(JSON.stringify({
        response: "I'm currently offline, but you can reach David directly through the contact form below. He typically responds within 24 hours.",
        fallback: true
      }), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: `You are David Ortiz's AI assistant on his portfolio website. You help visitors learn about David's expertise in cloud support engineering, database optimization, and his professional experience. Be helpful, concise, and professional. If asked about contact or hiring, encourage them to use the contact form.`
      },
      ...history.slice(-3).map(h => ({
        role: h.type === 'user' ? 'user' : 'assistant',
        content: h.message
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://cs-learning.me',
        'X-Title': 'David Ortiz Portfolio Chat'
      },
      body: JSON.stringify({
        model: 'x-ai/grok-4-fast:free',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter API error:', error);

      return new Response(JSON.stringify({
        response: "I'm having trouble connecting right now. Please try again later or use the contact form below.",
        error: true
      }), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content ||
      "I couldn't generate a response. Please try again.";

    return new Response(JSON.stringify({
      response: aiResponse,
      sessionId: sessionId
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Chat error:', error);

    return new Response(JSON.stringify({
      response: "I'm experiencing technical difficulties. Please use the contact form below to reach David directly.",
      error: true
    }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/chat') {
      return handleChat(request, env);
    }

    return new Response('Not found', {
      status: 404,
      headers: CORS_HEADERS,
    });
  },
};

/**
 * Deployment:
 *
 * 1. Create wrangler.toml:
 *    name = "portfolio-chat"
 *    main = "chat-worker.js"
 *    compatibility_date = "2024-01-01"
 *
 *    [vars]
 *    # Add non-sensitive config here
 *
 * 2. Set secret:
 *    wrangler secret put OPENROUTER_API_KEY
 *
 * 3. Deploy:
 *    wrangler deploy
 */