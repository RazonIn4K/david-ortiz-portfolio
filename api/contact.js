// Contact form API endpoint for Vercel serverless functions
// Handles contact form submissions with validation (no database required)
// Using Formspree for contact forms (no server-side storage)
// ===== CONSTANTS AND CONFIGURATION =====
// Field validation limits
const FIELD_LIMITS = {
  NAME: { MIN: 2, MAX: 100 },
  EMAIL: { MAX: 254 },
  MESSAGE: { MIN: 10, MAX: 5000 },
  SUBJECT: { MAX: 200 }
};
// Spam detection thresholds
const SPAM_THRESHOLDS = {
  MAX_LINKS: 3,
  MIN_REPEATED_PATTERNS: 2,
  REPEATED_CHAR_LENGTH: 4
};
// Response messages
const MESSAGES = {
  SUCCESS: 'Thank you for your message! I will get back to you within 24 hours.',
  SPAM_SUCCESS: 'Thank you for your message. We will get back to you soon.',
  RATE_LIMIT: 'Please wait before sending another message',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_ERROR: 'Please try again later or contact us directly'
};
// HTTP status codes
const STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  METHOD_NOT_ALLOWED: 405,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500
};
// Rate limiting configuration
const CONTACT_RATE_LIMIT = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5, // 5 submissions per hour per IP
};
// In-memory rate limiting store
const contactRateLimitStore = new Map();
/**
 * Regular expression for validating email addresses
 * @type {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * List of keywords commonly found in spam messages
 * @type {string[]}
 */
const SPAM_KEYWORDS = [
  'viagra', 'casino', 'lottery', 'winner', 'congratulations',
  'click here', 'free money', 'make money fast', 'work from home',
  'bitcoin', 'cryptocurrency', 'investment opportunity'
];
/**
 * Rate limiting for contact form submissions
 * @param {Object} req - Request object
 * @returns {Object} Rate limit result with allowed, remaining, and resetTime
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
// ===== VALIDATION PREDICATES =====
/**
 * Validation predicates to eliminate complex conditionals
 * These functions encapsulate common validation logic for better readability
 */

/**
 * Check if field is missing or invalid type
 * @param {*} field - Field value to check
 * @returns {boolean} True if field is missing or not a string
 */
function isFieldMissing(field) {
  return !field || typeof field !== 'string';
}

/**
 * Check if field is empty after trimming
 * @param {string} field - Field value to check
 * @returns {boolean} True if field is empty
 */
function isFieldEmpty(field) {
  return field.trim().length === 0;
}

/**
 * Check if field is too short
 * @param {string} field - Field value to check
 * @param {number} minLength - Minimum required length
 * @returns {boolean} True if field is too short
 */
function isFieldTooShort(field, minLength) {
  return field.trim().length < minLength;
}

/**
 * Check if field is too long
 * @param {string} field - Field value to check
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} True if field is too long
 */
function isFieldTooLong(field, maxLength) {
  return field.trim().length > maxLength;
}

/**
 * Check if field is required but missing/empty
 * @param {*} field - Field value to check
 * @returns {boolean} True if required field is invalid
 */
function isRequiredFieldInvalid(field) {
  return isFieldMissing(field) || isFieldEmpty(field);
}

/**
 * Check if email format is valid
 * @param {string} email - Email to validate
 * @returns {boolean} True if email format is valid
 */
function isEmailFormatValid(email) {
  return EMAIL_REGEX.test(email.trim());
}

// ===== VALIDATION HELPER FUNCTIONS =====
/**
 * Validate name field
 * @param {string} name - Name value
 * @returns {string|null} Error message or null if valid
 */
function validateName(name) {
  if (isRequiredFieldInvalid(name)) {
    return 'Name is required';
  }
  if (isFieldTooShort(name, FIELD_LIMITS.NAME.MIN)) {
    return `Name must be at least ${FIELD_LIMITS.NAME.MIN} characters`;
  }
  if (isFieldTooLong(name, FIELD_LIMITS.NAME.MAX)) {
    return `Name must be less than ${FIELD_LIMITS.NAME.MAX} characters`;
  }
  return null;
}
/**
 * Validate email field
 * @param {string} email - Email value
 * @returns {string|null} Error message or null if valid
 */
function validateEmail(email) {
  if (isRequiredFieldInvalid(email)) {
    return 'Email is required';
  }
  if (!isEmailFormatValid(email)) {
    return 'Please enter a valid email address';
  }
  if (isFieldTooLong(email, FIELD_LIMITS.EMAIL.MAX)) {
    return 'Email address is too long';
  }
  return null;
}
/**
 * Validate message field
 * @param {string} message - Message value
 * @returns {string|null} Error message or null if valid
 */
function validateMessage(message) {
  if (isRequiredFieldInvalid(message)) {
    return 'Message is required';
  }
  if (isFieldTooShort(message, FIELD_LIMITS.MESSAGE.MIN)) {
    return `Message must be at least ${FIELD_LIMITS.MESSAGE.MIN} characters`;
  }
  if (isFieldTooLong(message, FIELD_LIMITS.MESSAGE.MAX)) {
    return `Message must be less than ${FIELD_LIMITS.MESSAGE.MAX} characters`;
  }
  return null;
}
/**
 * Validate subject field (optional)
 * @param {string} subject - Subject value
 * @returns {string|null} Error message or null if valid
 */
function validateSubject(subject) {
  if (isFieldMissing(subject)) {
    return null; // Optional field
  }
  if (isFieldTooLong(subject, FIELD_LIMITS.SUBJECT.MAX)) {
    return `Subject must be less than ${FIELD_LIMITS.SUBJECT.MAX} characters`;
  }
  return null;
}
/**
 * Field validator configuration for table-driven validation
 * Reduces cyclomatic complexity by using iteration instead of multiple conditionals
 */
const FIELD_VALIDATORS = {
  name: { validator: validateName, required: true },
  email: { validator: validateEmail, required: true },
  message: { validator: validateMessage, required: true },
  subject: { validator: validateSubject, required: false }
};

/**
 * Validate contact form data using table-driven approach
 * Complexity reduced from CC=19 to CC=3 by eliminating multiple if statements
 * @param {Object} data - Form data
 * @returns {Object} Validation result with isValid flag and errors
 */
function validateContactForm(data) {
  const errors = {};

  // Use table-driven validation to reduce cyclomatic complexity
  for (const [fieldName, config] of Object.entries(FIELD_VALIDATORS)) {
    const error = config.validator(data[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
// ===== SPAM DETECTION FUNCTIONS =====
/**
 * Check for spam keywords
 * @param {string} content - Content to check
 * @returns {Object|null} Spam result or null if clean
 */
function checkSpamKeywords(content) {
  const spamWords = SPAM_KEYWORDS.filter(keyword => content.includes(keyword));
  if (spamWords.length > 0) {
    return {
      isSpam: true,
      reason: 'Contains spam keywords',
      keywords: spamWords
    };
  }
  return null;
}
/**
 * Check for excessive links
 * @param {string} content - Content to check
 * @returns {Object|null} Spam result or null if clean
 */
function checkExcessiveLinks(content) {
  const linkCount = (content.match(/https?:\/\//g) || []).length;
  if (linkCount > SPAM_THRESHOLDS.MAX_LINKS) {
    return {
      isSpam: true,
      reason: 'Too many links',
      linkCount
    };
  }
  return null;
}
/**
 * Check for repeated characters
 * @param {string} content - Content to check
 * @returns {Object|null} Spam result or null if clean
 */
function checkRepeatedCharacters(content) {
  const repeatedPattern = new RegExp(`(.)\\1{${SPAM_THRESHOLDS.REPEATED_CHAR_LENGTH - 1},}`, 'g');
  const repeatedChars = content.match(repeatedPattern);
  if (repeatedChars && repeatedChars.length > SPAM_THRESHOLDS.MIN_REPEATED_PATTERNS) {
    return {
      isSpam: true,
      reason: 'Excessive repeated characters',
      patterns: repeatedChars
    };
  }
  return null;
}
/**
 * Basic spam detection
 * @param {Object} data - Form data
 * @returns {Object} Spam detection result
 */
function detectSpam(data) {
  const content = `${data.name} ${data.email} ${data.subject || ''} ${data.message}`.toLowerCase();
  // Run spam checks
  const keywordCheck = checkSpamKeywords(content);
  if (keywordCheck) return keywordCheck;
  const linkCheck = checkExcessiveLinks(content);
  if (linkCheck) return linkCheck;
  const repeatedCheck = checkRepeatedCharacters(content);
  if (repeatedCheck) return repeatedCheck;
  return { isSpam: false };
}
/**
 * Sanitize form data to prevent injection attacks and enforce limits
 * @param {Object} data - Raw form data
 * @returns {Object} Sanitized form data
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
 * @param {Object} formData - Sanitized form data
 * @returns {Promise<Object>} Email sending result
 */
async function sendNotificationEmail(formData) {
  // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
  return { success: true };
}
// ===== CUSTOM ERROR CLASSES =====
/**
 * Custom error classes for better error handling and response generation
 * These classes encapsulate error-specific data and simplify error handling logic
 */

/**
 * Rate limit exceeded error
 * Contains rate limit information for proper response formatting
 */
class RateLimitError extends Error {
  constructor(rateCheck) {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
    this.rateCheck = rateCheck;
  }
}

/**
 * Form validation error
 * Contains validation errors for detailed response
 */
class ValidationError extends Error {
  constructor(validationErrors) {
    super('Form validation failed');
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
  }
}

/**
 * Method not allowed error
 * For HTTP method validation
 */
class MethodNotAllowedError extends Error {
  constructor(allowedMethods) {
    super('Method not allowed');
    this.name = 'MethodNotAllowedError';
    this.allowedMethods = allowedMethods;
  }
}

// ===== HANDLER HELPER FUNCTIONS =====
/**
 * Set CORS headers for response
 * @param {Object} res - Response object
 */
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
/**
 * Validate HTTP method and handle preflight requests
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object|null} Response for OPTIONS, null if valid POST
 * @throws {MethodNotAllowedError} If method is not POST or OPTIONS
 */
function validateHttpMethod(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(STATUS.OK).end();
  }
  if (req.method !== 'POST') {
    throw new MethodNotAllowedError(['POST']);
  }
  return null;
}
/**
 * Apply rate limiting and validation
 * @param {Object} req - Request object
 * @returns {Object} Validated form data
 * @throws {RateLimitError} If rate limit exceeded
 * @throws {ValidationError} If validation fails
 */
function applyRateLimitAndValidate(req) {
  // Check rate limit
  const rateCheck = contactRateLimit(req);
  if (!rateCheck.allowed) {
    throw new RateLimitError(rateCheck);
  }

  // Validate form data
  const formData = req.body;
  const validation = validateContactForm(formData);
  if (!validation.isValid) {
    throw new ValidationError(validation.errors);
  }

  return formData;
}
/**
 * Process form submission
 * @param {Object} sanitizedData - Sanitized form data
 * @param {Object} req - Request object
 * @returns {Object} Submission result
 */
function processFormSubmission(sanitizedData, req) {
  // Check for spam
  const spamCheck = detectSpam(sanitizedData);
  if (spamCheck.isSpam) {
    return { isSpam: true };
  }
  // Log submission
  logSubmission(sanitizedData);
  // Send notification (async, non-blocking)
  sendNotificationEmail(sanitizedData).catch(error => {
  });
  return {
    isSpam: false,
    submissionId: `contact-${Date.now()}`
  };
}
/**
 * Log submission for debugging
 * @param {Object} data - Sanitized form data
 */
function logSubmission(data) {
  console.log('Contact form submission:', {
    name: data.name,
    email: data.email,
    subject: data.subject,
    timestamp: new Date().toISOString()
  });
}
// ===== RESPONSE CREATION FUNCTIONS =====
/**
 * Consolidated response creation functions with error-specific handling
 * This approach reduces complexity by centralizing response logic
 */

/**
 * Create success response for contact form submission
 * @param {Object} res - Response object
 * @param {boolean} isSpam - Whether submission is spam
 * @param {string} submissionId - Submission ID
 * @returns {Object} Response
 */
function createSuccessResponse(res, isSpam, submissionId) {
  const message = isSpam ? MESSAGES.SPAM_SUCCESS : MESSAGES.SUCCESS;
  return res.status(STATUS.OK).json({
    success: true,
    message,
    submissionId,
    timestamp: new Date().toISOString()
  });
}

/**
 * Create error response based on error type
 * Uses instanceof checks to provide appropriate responses for different error types
 * @param {Object} res - Response object
 * @param {Error} error - Error object
 * @returns {Object} Response
 */
function createErrorResponse(res, error) {
  // Handle rate limit errors
  if (error instanceof RateLimitError) {
    return res.status(STATUS.RATE_LIMITED).json({
      error: 'Too many contact form submissions',
      message: MESSAGES.RATE_LIMIT,
      retryAfter: Math.ceil((error.rateCheck.resetTime - Date.now()) / 1000 / 60),
      timestamp: new Date().toISOString()
    });
  }

  // Handle validation errors
  if (error instanceof ValidationError) {
    return res.status(STATUS.BAD_REQUEST).json({
      error: MESSAGES.VALIDATION_FAILED,
      errors: error.validationErrors,
      timestamp: new Date().toISOString()
    });
  }

  // Handle method not allowed errors
  if (error instanceof MethodNotAllowedError) {
    return res.status(STATUS.METHOD_NOT_ALLOWED).json({
      error: MESSAGES.METHOD_NOT_ALLOWED,
      allowed: error.allowedMethods,
      timestamp: new Date().toISOString()
    });
  }

  // Default server error response
  return res.status(STATUS.SERVER_ERROR).json({
    error: 'Internal server error',
    message: MESSAGES.INTERNAL_ERROR,
    details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    timestamp: new Date().toISOString()
  });
}
/**
 * Main handler function for contact form API endpoint
 * Simplified orchestration function with reduced complexity (CC < 9, LoC < 70)
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {Promise<Object>} HTTP response
 */
async function handler(req, res) {
  setCORSHeaders(res);

  try {
    // Handle preflight and method validation
    const methodResponse = validateHttpMethod(req, res);
    if (methodResponse) return methodResponse;

    // Apply rate limiting and validation (throws on error)
    const formData = applyRateLimitAndValidate(req);

    // Sanitize and process form submission
    const sanitizedData = sanitizeFormData(formData);
    const submissionResult = processFormSubmission(sanitizedData, req);

    // Return success response
    return createSuccessResponse(res, submissionResult.isSpam, submissionResult.submissionId);

  } catch (error) {
    console.error('Contact form error:', error);
    return createErrorResponse(res, error);
  }
}

/**
 * Vercel serverless function configuration
 * @type {Object}
 */
const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    }
  }
};

module.exports = handler;
module.exports.config = config;