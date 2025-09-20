// Contact form API endpoint for Vercel serverless functions
// Handles contact form submissions with validation and MongoDB storage

import MongoDBClient from './mongodb-client.js';

/**
 * Rate limiting for contact form (stricter than analytics)
 */
const CONTACT_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5, // 5 submissions per hour per IP
};

// In-memory rate limiting store
const contactRateLimitStore = new Map();

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Spam detection keywords
 */
const SPAM_KEYWORDS = [
  'viagra', 'casino', 'lottery', 'winner', 'congratulations',
  'click here', 'free money', 'make money fast', 'work from home',
  'bitcoin', 'cryptocurrency', 'investment opportunity'
];

/**
 * Rate limiting for contact form
 */
function contactRateLimit(req) {
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const now = Date.now();
  const windowStart = now - CONTACT_RATE_LIMIT.windowMs;

  if (!contactRateLimitStore.has(ip)) {
    contactRateLimitStore.set(ip, []);
  }

  const requests = contactRateLimitStore.get(ip);
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  contactRateLimitStore.set(ip, validRequests);

  if (validRequests.length >= CONTACT_RATE_LIMIT.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: windowStart + CONTACT_RATE_LIMIT.windowMs
    };
  }

  validRequests.push(now);
  contactRateLimitStore.set(ip, validRequests);

  return {
    allowed: true,
    remaining: CONTACT_RATE_LIMIT.maxRequests - validRequests.length,
    resetTime: windowStart + CONTACT_RATE_LIMIT.windowMs
  };
}

/**
 * Validate contact form data
 */
function validateContactForm(data) {
  const errors = {};

  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  } else if (data.email.trim().length > 254) {
    errors.email = 'Email address is too long';
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 5000) {
    errors.message = 'Message must be less than 5000 characters';
  }

  // Optional subject validation
  if (data.subject && typeof data.subject === 'string' && data.subject.trim().length > 200) {
    errors.subject = 'Subject must be less than 200 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Basic spam detection
 */
function detectSpam(data) {
  const content = `${data.name} ${data.email} ${data.subject || ''} ${data.message}`.toLowerCase();

  // Check for spam keywords
  const spamWords = SPAM_KEYWORDS.filter(keyword => content.includes(keyword));
  if (spamWords.length > 0) {
    return {
      isSpam: true,
      reason: 'Contains spam keywords',
      keywords: spamWords
    };
  }

  // Check for excessive links
  const linkCount = (content.match(/https?:\/\//g) || []).length;
  if (linkCount > 3) {
    return {
      isSpam: true,
      reason: 'Too many links',
      linkCount
    };
  }

  // Check for repeated characters (common in spam)
  const repeatedChars = content.match(/(.)\1{4,}/g);
  if (repeatedChars && repeatedChars.length > 2) {
    return {
      isSpam: true,
      reason: 'Excessive repeated characters',
      patterns: repeatedChars
    };
  }

  return { isSpam: false };
}

/**
 * Sanitize form data
 */
function sanitizeFormData(data) {
  return {
    name: data.name.trim().substring(0, 100),
    email: data.email.trim().toLowerCase().substring(0, 254),
    subject: (data.subject || '').trim().substring(0, 200),
    message: data.message.trim().substring(0, 5000)
  };
}

/**
 * Send notification email (placeholder for future implementation)
 */
async function sendNotificationEmail(formData) {
  // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
  console.log('📧 New contact form submission:', {
    name: formData.name,
    email: formData.email,
    subject: formData.subject
  });

  return { success: true };
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
    const rateCheck = contactRateLimit(req);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: 'Too many contact form submissions',
        message: 'Please wait before sending another message',
        retryAfter: Math.ceil((rateCheck.resetTime - Date.now()) / 1000 / 60) // minutes
      });
    }

    // Parse and validate form data
    const formData = req.body;
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        errors: validation.errors
      });
    }

    // Sanitize data
    const sanitizedData = sanitizeFormData(formData);

    // Spam detection
    const spamCheck = detectSpam(sanitizedData);
    if (spamCheck.isSpam) {
      console.warn('🚫 Spam detected in contact form:', spamCheck);

      // Still return success to user (don't reveal spam detection)
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon.'
      });
    }

    // Prepare data for storage
    const contactSubmission = {
      ...sanitizedData,
      submittedAt: new Date(),
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
      userAgent: req.headers['user-agent'],
      status: 'pending',
      spamScore: 0, // Could integrate with spam detection service
      responseTime: null
    };

    // Store in MongoDB
    const mongoClient = new MongoDBClient();
    const result = await mongoClient.storeContactSubmission(contactSubmission);

    if (!result.success) {
      console.error('Failed to store contact submission:', result.error);
      return res.status(500).json({
        error: 'Failed to process your message',
        message: 'Please try again later or contact us directly'
      });
    }

    // Send notification email (async, don't wait for completion)
    sendNotificationEmail(sanitizedData).catch(error => {
      console.error('Failed to send notification email:', error);
    });

    // Log analytics event
    try {
      await mongoClient.logAnalyticsEvent({
        event: 'contact_form_submission',
        data: {
          hasSubject: !!sanitizedData.subject,
          messageLength: sanitizedData.message.length
        },
        sessionId: req.headers['x-session-id'] || 'unknown',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Failed to log contact form analytics:', error);
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you within 24 hours.',
      submissionId: result.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Contact form API error:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Please try again later or contact us directly',
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
      sizeLimit: '1mb'
    }
  }
};