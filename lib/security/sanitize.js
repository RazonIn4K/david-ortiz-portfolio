/**
 * Privacy & Data Sanitization Utilities
 *
 * Provides cryptographic hashing functions for protecting PII in logs and analytics.
 * Uses HMAC-SHA256 for one-way hashing with a secret salt.
 *
 * IMPORTANT:
 * - NEVER log raw PII (emails, IPs, names, etc.) without hashing
 * - Store the SALT securely in environment variables
 * - Rotate the salt periodically for enhanced security
 * - Use consistent salt for correlation across logs
 */

import crypto from 'crypto';

/**
 * Default salt from environment (should be set in production)
 * Generate a strong salt with: openssl rand -base64 32
 */
const DEFAULT_SALT = process.env.PRIVACY_HASH_SALT || 'default-dev-salt-change-in-production';

/**
 * Hash a string with HMAC-SHA256 and return hash with length
 *
 * This function hashes sensitive data for privacy-safe logging while
 * preserving the original length for debugging purposes.
 *
 * @param {string} data - The string to hash (e.g., email, IP address, session ID)
 * @param {string} salt - Optional salt for hashing (defaults to env variable)
 * @returns {string} Hash in format "hash:<hex>:len:<length>"
 *
 * @example
 * hashAndLen('user@example.com')
 * // Returns: "hash:a3f2b9c1...d8e4:len:16"
 *
 * hashAndLen('192.168.1.1')
 * // Returns: "hash:7b3e9a2f...c4d1:len:11"
 */
export function hashAndLen(data, salt = DEFAULT_SALT) {
  if (typeof data !== 'string') {
    throw new TypeError('Data must be a string');
  }

  if (!data) {
    return 'hash:empty:len:0';
  }

  // Create HMAC-SHA256 hash
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(data);
  const hash = hmac.digest('hex').substring(0, 16); // First 16 chars for brevity

  // Return hash with original length
  return `hash:${hash}:len:${data.length}`;
}

/**
 * Hash multiple fields in an object
 *
 * @param {Object} obj - Object containing fields to hash
 * @param {Array<string>} fields - Array of field names to hash
 * @param {string} salt - Optional salt for hashing
 * @returns {Object} New object with specified fields hashed
 *
 * @example
 * hashFields({ email: 'user@example.com', name: 'John' }, ['email'])
 * // Returns: { email: 'hash:a3f2b9c1:len:16', name: 'John' }
 */
export function hashFields(obj, fields, salt = DEFAULT_SALT) {
  const result = { ...obj };

  fields.forEach(field => {
    if (obj[field] !== undefined && obj[field] !== null) {
      result[field] = hashAndLen(String(obj[field]), salt);
    }
  });

  return result;
}

/**
 * Sanitize an email address for logging
 * Masks domain while preserving structure for debugging
 *
 * @param {string} email - Email address to sanitize
 * @param {string} salt - Optional salt for hashing
 * @returns {string} Sanitized email with hashed parts
 *
 * @example
 * sanitizeEmail('john.doe@example.com')
 * // Returns: "hash:7a8b9c:len:8@hash:3d4e5f:len:11"
 */
export function sanitizeEmail(email, salt = DEFAULT_SALT) {
  if (typeof email !== 'string' || !email.includes('@')) {
    return hashAndLen(email, salt);
  }

  const [localPart, domain] = email.split('@');
  const hashedLocal = hashAndLen(localPart, salt);
  const hashedDomain = hashAndLen(domain, salt);

  return `${hashedLocal}@${hashedDomain}`;
}

/**
 * Sanitize an IP address for logging
 * Masks last octet(s) while preserving structure
 *
 * @param {string} ip - IP address to sanitize
 * @param {boolean} fullHash - If true, fully hash the IP; otherwise mask last octet
 * @param {string} salt - Optional salt for hashing
 * @returns {string} Sanitized IP address
 *
 * @example
 * sanitizeIp('192.168.1.100')
 * // Returns: "192.168.1.xxx" (default masking)
 *
 * sanitizeIp('192.168.1.100', true)
 * // Returns: "hash:7b3e9a2f:len:13" (full hash)
 */
export function sanitizeIp(ip, fullHash = false, salt = DEFAULT_SALT) {
  if (typeof ip !== 'string' || !ip) {
    return 'invalid-ip';
  }

  if (fullHash) {
    return hashAndLen(ip, salt);
  }

  // IPv4 masking: 192.168.1.xxx
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      parts[3] = 'xxx';
      return parts.join('.');
    }
  }

  // IPv6 masking: preserve first 4 groups
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) {
      return parts.slice(0, 4).join(':') + '::xxx';
    }
  }

  // Fallback to full hash
  return hashAndLen(ip, salt);
}

/**
 * Create a privacy-safe log entry
 * Automatically hashes common PII fields
 *
 * @param {Object} logData - Log data object
 * @param {Array<string>} piiFields - Fields containing PII to hash
 * @returns {Object} Sanitized log entry
 *
 * @example
 * createPrivacySafeLog({
 *   email: 'user@example.com',
 *   ip: '192.168.1.100',
 *   action: 'login',
 *   timestamp: Date.now()
 * }, ['email', 'ip'])
 */
export function createPrivacySafeLog(logData, piiFields = []) {
  const sanitized = { ...logData };

  // Auto-detect and sanitize common PII fields
  if (sanitized.email) {
    sanitized.email = sanitizeEmail(sanitized.email);
  }
  if (sanitized.ip) {
    sanitized.ip = sanitizeIp(sanitized.ip, true);
  }

  // Hash additional specified fields
  piiFields.forEach(field => {
    if (sanitized[field] !== undefined && field !== 'email' && field !== 'ip') {
      sanitized[field] = hashAndLen(String(sanitized[field]));
    }
  });

  return sanitized;
}

/**
 * Redact sensitive patterns from strings (e.g., API keys, tokens)
 *
 * @param {string} text - Text that may contain sensitive data
 * @returns {string} Text with sensitive patterns redacted
 *
 * @example
 * redactSensitivePatterns('Bearer sk_live_abcdef123456')
 * // Returns: "Bearer [REDACTED]"
 */
export function redactSensitivePatterns(text) {
  if (typeof text !== 'string') {
    return text;
  }

  return text
    // API keys (sk_live_, pk_live_, etc.)
    .replace(/\b(sk|pk|api|key)_[a-zA-Z0-9_]{16,}\b/gi, '[REDACTED]')
    // Bearer tokens
    .replace(/Bearer\s+[A-Za-z0-9._~+/-]+=*/gi, 'Bearer [REDACTED]')
    // JWT tokens (simple pattern)
    .replace(/\beyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*\b/g, '[JWT_REDACTED]')
    // Email addresses in logs
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_REDACTED]')
    // Credit card numbers (simple pattern)
    .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD_REDACTED]');
}
