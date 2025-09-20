// Chat logging API endpoint for AI interactions
// Handles logging of AI chat conversations to MongoDB

import MongoDBClient from './mongodb-client.js';

/**
 * Rate limiting for chat logging
 */
const CHAT_RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 chat logs per minute per session
};

// In-memory rate limiting store
const chatRateLimitStore = new Map();

/**
 * Validate chat log data
 */
function validateChatLog(data) {
  const errors = {};

  // Required fields
  if (!data.query || typeof data.query !== 'string' || data.query.trim().length === 0) {
    errors.query = 'Query is required';
  } else if (data.query.trim().length > 1000) {
    errors.query = 'Query is too long (max 1000 characters)';
  }

  if (!data.response || typeof data.response !== 'string' || data.response.trim().length === 0) {
    errors.response = 'Response is required';
  } else if (data.response.trim().length > 10000) {
    errors.response = 'Response is too long (max 10000 characters)';
  }

  if (!data.sessionId || typeof data.sessionId !== 'string') {
    errors.sessionId = 'Session ID is required';
  }

  if (!data.model || typeof data.model !== 'string') {
    errors.model = 'Model is required';
  }

  // Optional fields validation
  if (data.responseTime && (!Number.isInteger(data.responseTime) || data.responseTime < 0)) {
    errors.responseTime = 'Response time must be a positive integer';
  }

  if (data.tokenCount && (!Number.isInteger(data.tokenCount) || data.tokenCount < 0)) {
    errors.tokenCount = 'Token count must be a positive integer';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Rate limiting for chat logging
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
 * Sanitize chat log data
 */
function sanitizeChatLog(data) {
  return {
    query: data.query.trim().substring(0, 1000),
    response: data.response.trim().substring(0, 10000),
    sessionId: data.sessionId.trim(),
    model: data.model.trim(),
    responseTime: data.responseTime || null,
    tokenCount: data.tokenCount || null,
    errorOccurred: data.errorOccurred || false,
    userFeedback: data.userFeedback || null
  };
}

/**
 * Detect sensitive information in chat logs
 */
function detectSensitiveInfo(data) {
  const sensitivePatterns = [
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card numbers
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email addresses
    /\b\d{3}-\d{3}-\d{4}\b/, // Phone numbers
    /\b(?:password|pass|pwd|secret|key|token)\s*[:=]\s*\S+/i // Passwords/tokens
  ];

  const content = `${data.query} ${data.response}`;
  const detectedPatterns = [];

  sensitivePatterns.forEach((pattern, index) => {
    if (pattern.test(content)) {
      detectedPatterns.push({
        type: ['credit_card', 'ssn', 'email', 'phone', 'credentials'][index],
        pattern: pattern.toString()
      });
    }
  });

  return {
    hasSensitiveInfo: detectedPatterns.length > 0,
    patterns: detectedPatterns
  };
}

/**
 * Redact sensitive information
 */
function redactSensitiveInfo(text) {
  return text
    .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[REDACTED_CARD]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_SSN]')
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[REDACTED_EMAIL]')
    .replace(/\b\d{3}-\d{3}-\d{4}\b/g, '[REDACTED_PHONE]')
    .replace(/\b(?:password|pass|pwd|secret|key|token)\s*[:=]\s*\S+/gi, '[REDACTED_CREDENTIALS]');
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
    const rateCheck = chatRateLimit(req);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: 'Too many chat log requests',
        retryAfter: Math.ceil((rateCheck.resetTime - Date.now()) / 1000)
      });
    }

    // Validate chat log data
    const validation = validateChatLog(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    // Sanitize data
    const sanitizedData = sanitizeChatLog(req.body);

    // Check for sensitive information
    const sensitiveCheck = detectSensitiveInfo(sanitizedData);
    if (sensitiveCheck.hasSensitiveInfo) {
      console.warn('🔒 Sensitive information detected in chat log:', sensitiveCheck.patterns);

      // Redact sensitive information
      sanitizedData.query = redactSensitiveInfo(sanitizedData.query);
      sanitizedData.response = redactSensitiveInfo(sanitizedData.response);
      sanitizedData.redacted = true;
      sanitizedData.redactionReason = 'Sensitive information detected';
    }

    // Prepare chat log for storage
    const chatLog = {
      ...sanitizedData,
      timestamp: new Date(),
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      userAgent: req.headers['user-agent'],
      loggedAt: new Date(),
      ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days TTL
    };

    // Store in MongoDB
    const mongoClient = new MongoDBClient();
    const result = await mongoClient.logChatInteraction(chatLog);

    if (!result.success) {
      console.error('Failed to store chat log:', result.error);
      return res.status(500).json({
        error: 'Failed to log chat interaction',
        details: process.env.NODE_ENV === 'development' ? result.error : undefined
      });
    }

    // Log analytics event for chat interaction
    try {
      await mongoClient.logAnalyticsEvent({
        event: 'ai_chat_interaction',
        data: {
          model: sanitizedData.model,
          queryLength: sanitizedData.query.length,
          responseLength: sanitizedData.response.length,
          responseTime: sanitizedData.responseTime,
          errorOccurred: sanitizedData.errorOccurred,
          redacted: sanitizedData.redacted || false
        },
        sessionId: sanitizedData.sessionId,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to log chat analytics:', error);
    }

    // Success response
    return res.status(200).json({
      success: true,
      logId: result.id,
      redacted: sanitizedData.redacted || false,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat log API error:', error);

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
      sizeLimit: '500kb' // Smaller limit for chat logs
    }
  }
};