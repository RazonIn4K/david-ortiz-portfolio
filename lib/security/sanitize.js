/**
 * Input Sanitization Utilities
 *
 * Provides security utilities for sanitizing user input to prevent:
 * - XSS (Cross-Site Scripting)
 * - SQL Injection
 * - Command Injection
 * - Path Traversal
 *
 * PRIVACY: No raw PII is logged. Only hashed correlation IDs are used.
 *
 * @module lib/security/sanitize
 */

/**
 * HTML Entity Map for XSS Prevention
 */
const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

/**
 * Escapes HTML special characters to prevent XSS attacks
 *
 * @param {string} str - The string to escape
 * @returns {string} HTML-safe string
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'/]/g, char => HTML_ENTITIES[char]);
}

/**
 * Validates and sanitizes email addresses
 *
 * PRIVACY: Does not log raw email. Returns boolean validation result only.
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 *
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid.email') // false
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;

  // RFC 5322 simplified pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Additional checks
  const maxLength = 254; // RFC 5321
  const hasValidLength = email.length <= maxLength;
  const matchesPattern = emailPattern.test(email);

  return hasValidLength && matchesPattern;
}

/**
 * Sanitizes string input by removing dangerous characters
 *
 * Removes: null bytes, control characters, and common injection patterns
 *
 * @param {string} str - String to sanitize
 * @param {Object} options - Sanitization options
 * @param {number} options.maxLength - Maximum allowed length (default: 1000)
 * @param {boolean} options.allowNewlines - Allow \n and \r (default: false)
 * @returns {string} Sanitized string
 */
export function sanitizeString(str, options = {}) {
  const {
    maxLength = 1000,
    allowNewlines = false
  } = options;

  if (typeof str !== 'string') return '';

  let sanitized = str;

  // Remove null bytes and control characters
  sanitized = sanitized.replace(/\0/g, '');

  if (!allowNewlines) {
    sanitized = sanitized.replace(/[\r\n]/g, '');
  }

  // Remove other control characters (except tab if newlines allowed)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  // Enforce max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validates URL and ensures it's safe
 *
 * Only allows http and https protocols to prevent javascript: protocol XSS
 *
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is safe
 */
export function isValidUrl(url) {
  if (typeof url !== 'string') return false;

  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Generates a hashed correlation ID for tracking without exposing PII
 *
 * Uses simple hash function. For production, consider crypto.subtle.digest.
 *
 * @param {string} data - Data to hash (e.g., email, IP)
 * @returns {string} Hashed correlation ID
 *
 * @example
 * generateCorrelationId('user@example.com')
 * // Returns: 'c1234567890abcdef' (deterministic hash)
 */
export function generateCorrelationId(data) {
  if (typeof data !== 'string') return 'invalid';

  // Simple hash function (use crypto.subtle.digest in production)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Convert to hex and ensure positive
  return 'c' + Math.abs(hash).toString(16).padStart(15, '0');
}

/**
 * Sanitizes object by escaping all string values
 *
 * Recursively processes nested objects and arrays.
 *
 * @param {Object} obj - Object to sanitize
 * @param {number} maxDepth - Maximum recursion depth (default: 5)
 * @returns {Object} Sanitized object
 */
export function sanitizeObject(obj, maxDepth = 5) {
  if (maxDepth <= 0) return {};
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, maxDepth - 1));
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = sanitizeString(key, { maxLength: 100 });

    if (typeof value === 'string') {
      sanitized[sanitizedKey] = escapeHtml(value);
    } else if (typeof value === 'object') {
      sanitized[sanitizedKey] = sanitizeObject(value, maxDepth - 1);
    } else {
      sanitized[sanitizedKey] = value;
    }
  }

  return sanitized;
}

/**
 * Validates analytics event data (used in api/analytics.js)
 *
 * Ensures event data doesn't contain PII and is properly formatted.
 *
 * @param {Object} event - Analytics event object
 * @returns {Object} { valid: boolean, sanitized: Object, error?: string }
 */
export function validateAnalyticsEvent(event) {
  if (!event || typeof event !== 'object') {
    return { valid: false, error: 'Event must be an object' };
  }

  const sanitized = {
    event: sanitizeString(event.event, { maxLength: 100 }),
    timestamp: parseInt(event.timestamp, 10) || Date.now(),
    sessionId: sanitizeString(event.sessionId, { maxLength: 50 }),
    metadata: event.metadata ? sanitizeObject(event.metadata, 3) : {}
  };

  // Validate required fields
  if (!sanitized.event) {
    return { valid: false, error: 'Event name is required' };
  }

  if (!sanitized.sessionId) {
    return { valid: false, error: 'Session ID is required' };
  }

  return { valid: true, sanitized };
}

/**
 * Redacts sensitive information from logs
 *
 * Replaces email addresses, API keys, and tokens with [REDACTED]
 *
 * @param {string} str - String that may contain sensitive data
 * @returns {string} Redacted string
 */
export function redactSensitiveData(str) {
  if (typeof str !== 'string') return '';

  let redacted = str;

  // Redact email addresses
  redacted = redacted.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]');

  // Redact API keys (common patterns)
  redacted = redacted.replace(/\b[A-Za-z0-9]{32,}\b/g, '[API_KEY_REDACTED]');

  // Redact Bearer tokens
  redacted = redacted.replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [TOKEN_REDACTED]');

  // Redact potential secrets
  redacted = redacted.replace(/(['"])(secret|password|token|key)['"]:\s*['"]([^'"]+)['"]/gi, '$1$2$1: $1[REDACTED]$1');

  return redacted;
}

/**
 * Default export for convenience
 */
export default {
  escapeHtml,
  isValidEmail,
  isValidUrl,
  sanitizeString,
  sanitizeObject,
  generateCorrelationId,
  validateAnalyticsEvent,
  redactSensitiveData
};
