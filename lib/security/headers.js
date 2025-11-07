/**
 * Security Headers Configuration
 *
 * This is the single source of truth for all HTTP security headers across the application.
 * These headers are enforced via Vercel's edge network (vercel.json configuration).
 *
 * For Next.js migration: Import this config in next.config.mjs headers() function.
 *
 * @module lib/security/headers
 */

/**
 * Content Security Policy (CSP) Configuration
 *
 * Defines trusted sources for different content types to prevent XSS attacks.
 * Updated to support current site requirements while maintaining strict security.
 */
const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for inline scripts; consider moving to nonce-based CSP in Next.js
    "https://www.googletagmanager.com",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com",
    "https://cdn.tailwindcss.com"
  ],
  'connect-src': [
    "'self'",
    "https://openrouter.ai",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com"
  ],
  'frame-src': [
    "https://www.beautiful.ai"
  ],
  'img-src': [
    "'self'",
    "data:",
    "blob:",
    "https://img.icons8.com",
    "https://images.unsplash.com",
    "https://lh3.googleusercontent.com"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind; consider using nonce in Next.js
    "https://fonts.googleapis.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': [
    "'self'",
    "https://formspree.io"
  ],
  'frame-ancestors': ["'self'"]
};

/**
 * Converts CSP directives object to string format
 */
function buildCSP(directives) {
  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

/**
 * Security Headers Configuration
 *
 * These headers are applied to all routes via Vercel edge network.
 * Reference: https://owasp.org/www-project-secure-headers/
 */
export const SECURITY_HEADERS = {
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Prevent clickjacking attacks
  'X-Frame-Options': 'SAMEORIGIN',

  // Legacy XSS protection (mostly superseded by CSP)
  'X-XSS-Protection': '1; mode=block',

  // Enforce HTTPS with HSTS
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Control browser features and APIs
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

  // Content Security Policy
  'Content-Security-Policy': buildCSP(CSP_DIRECTIVES)
};

/**
 * Cache Control Headers for Different Content Types
 *
 * Optimized caching strategy:
 * - HTML: No cache (always fresh)
 * - Static assets: Long-term immutable cache
 * - API: No cache (always fresh)
 */
export const CACHE_HEADERS = {
  html: {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  },
  staticAssets: {
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  api: {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
};

/**
 * CORS Headers for API Routes
 *
 * Adjust allowedOrigins for production environments.
 * Currently allows all origins for public API endpoints.
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // Restrict in production if needed
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400' // 24 hours
};

/**
 * Generates Vercel headers configuration
 *
 * @returns {Array} Headers configuration for vercel.json
 */
export function getVercelHeadersConfig() {
  return [
    // Apply security headers to all routes
    {
      source: '/(.*)',
      headers: Object.entries(SECURITY_HEADERS).map(([key, value]) => ({
        key,
        value
      }))
    },
    // HTML files: no cache
    {
      source: '/(.*).html',
      headers: Object.entries(CACHE_HEADERS.html).map(([key, value]) => ({
        key,
        value
      }))
    },
    // Static assets: long-term cache
    {
      source: '/src/(.*)',
      headers: Object.entries(CACHE_HEADERS.staticAssets).map(([key, value]) => ({
        key,
        value
      }))
    },
    {
      source: '/assets/(.*)',
      headers: Object.entries(CACHE_HEADERS.staticAssets).map(([key, value]) => ({
        key,
        value
      }))
    },
    // API routes: no cache
    {
      source: '/api/(.*)',
      headers: Object.entries(CACHE_HEADERS.api).map(([key, value]) => ({
        key,
        value
      }))
    }
  ];
}

/**
 * For Next.js: Use this function in next.config.mjs
 *
 * Example:
 * ```js
 * import { getVercelHeadersConfig } from './lib/security/headers.js';
 *
 * export default {
 *   async headers() {
 *     return getVercelHeadersConfig();
 *   }
 * }
 * ```
 */

export default {
  SECURITY_HEADERS,
  CACHE_HEADERS,
  CORS_HEADERS,
  getVercelHeadersConfig
};
