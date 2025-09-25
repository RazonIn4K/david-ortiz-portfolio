// AI Chat API endpoint for handling chat interactions
// Integrates with OpenRouter AI service and uses lightweight in-memory rate limiting
/**
 * Rate limiting for chat requests
 */
const CHAT_RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 chat requests per minute per session
};
// In-memory rate limiting store
const chatRateLimitStore = new Map();
/**
 * Validate chat request data
 */
function validateChatRequest(data) {
  const errors = {};
  // Required fields
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Message is too long (max 1000 characters)';
  }
  if (!data.sessionId || typeof data.sessionId !== 'string') {
    errors.sessionId = 'Session ID is required';
  }
  // Optional fields validation
  if (data.history && !Array.isArray(data.history)) {
    errors.history = 'History must be an array';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
/**
 * Rate limiting for chat requests
 */
function chatRateLimit(req) {
  const sessionId = req.body?.sessionId || 'unknown';
  const now = Date.now();
  const windowStart = now - CHAT_RATE_LIMIT.windowMs;
  if (!chatRateLimitStore.has(sessionId)) {
    chatRateLimitStore.set(sessionId, []);
  }
  const requests = chatRateLimitStore.get(sessionId);
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  chatRateLimitStore.set(sessionId, validRequests);
  if (validRequests.length >= CHAT_RATE_LIMIT.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: windowStart + CHAT_RATE_LIMIT.windowMs
    };
  }
  validRequests.push(now);
  chatRateLimitStore.set(sessionId, validRequests);
  return {
    allowed: true,
    remaining: CHAT_RATE_LIMIT.maxRequests - validRequests.length,
    resetTime: windowStart + CHAT_RATE_LIMIT.windowMs
  };
}
/**
 * Send message to OpenRouter AI service
 */
async function sendToOpenRouter(message, history = []) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenRouter API key not configured');
  }
  // Build conversation context
  const messages = [
    {
      role: 'system',
      content: `You are an AI assistant helping visitors on David Ortiz's portfolio website. David is a Cloud Support Engineer specializing in database optimization and infrastructure management.
Guidelines:
- Be helpful and professional
- Keep responses concise and relevant
- Focus on David's technical expertise when appropriate
- If asked about David's background, mention his database optimization work and infrastructure expertise
- Keep responses under 150 tokens
- Don't make up information about David's specific projects beyond what's mentioned`
    }
  ];
  // Add conversation history (last 5 messages for context)
  if (history && history.length > 0) {
    const recentHistory = history.slice(-5);
    recentHistory.forEach(item => {
      if (item.type === 'user') {
        messages.push({ role: 'user', content: item.message });
      } else if (item.type === 'assistant') {
        messages.push({ role: 'assistant', content: item.message });
      }
    });
  }
  // Add current message
  messages.push({ role: 'user', content: message });
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://www.cs-learning.me',
      'X-Title': 'David Ortiz Portfolio Chat'
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_PRIMARY_MODEL || 'x-ai/grok-4-fast:free',
      messages: messages,
      max_tokens: 150,
      temperature: 0.7,
      stream: false
    })
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }
  const data = await response.json();
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response format from OpenRouter');
  }
  return {
    response: data.choices[0].message.content,
    model: data.model || process.env.OPENROUTER_PRIMARY_MODEL || 'x-ai/grok-4-fast:free',
    usage: data.usage
  };
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
  const startTime = Date.now();
  try {
    // Rate limiting
    const rateCheck = chatRateLimit(req);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: 'Too many chat requests',
        retryAfter: Math.ceil((rateCheck.resetTime - Date.now()) / 1000),
        remaining: rateCheck.remaining
      });
    }
    // Validate request data
    const validation = validateChatRequest(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        errors: validation.errors
      });
    }
    const { message, sessionId, history } = req.body;
    // Send to OpenRouter AI
    const aiResult = await sendToOpenRouter(message, history);
    const responseTime = Date.now() - startTime;
    // Optional: Log for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
    }
    // Success response
    return res.status(200).json({
      success: true,
      response: aiResult.response,
      model: aiResult.model,
      responseTime: responseTime,
      usage: aiResult.usage,
      sessionId: sessionId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    // Log error for debugging
    // Return appropriate error response
    if (error.message.includes('OpenRouter')) {
      return res.status(502).json({
        error: 'AI service temporarily unavailable',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        responseTime: responseTime
      });
    }
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      responseTime: responseTime,
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
      sizeLimit: '100kb'
    }
  }
};