/**
 * Security Headers Configuration
 *
 * Centralized security headers for the portfolio site.
 * Used by vercel.json to apply headers across all routes.
 *
 * References:
 * - OWASP Secure Headers Project
 * - MDN Web Docs: HTTP Headers
 */

/**
 * Generate security headers for the application
 * @returns {Array<{key: string, value: string}>} Array of security headers
 */
export function securityHeaders() {
  return [
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN'
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()'
    },
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://cdn.tailwindcss.com",
        "connect-src 'self' https://openrouter.ai https://va.vercel-scripts.com https://vitals.vercel-insights.com",
        "frame-src https://www.beautiful.ai",
        "img-src 'self' data: https://img.icons8.com https://images.unsplash.com https://lh3.googleusercontent.com blob:",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://formspree.io",
        "frame-ancestors 'self'"
      ].join('; ')
    }
  ];
}

/**
 * Generate cache control headers for different file types
 * @param {string} pattern - File pattern (html, static, api)
 * @returns {Array<{key: string, value: string}>} Array of cache headers
 */
export function cacheHeaders(pattern) {
  const cacheStrategies = {
    html: 'no-cache, no-store, must-revalidate',
    static: 'public, max-age=31536000, immutable',
    api: 'no-cache, no-store, must-revalidate'
  };

  return [
    {
      key: 'Cache-Control',
      value: cacheStrategies[pattern] || cacheStrategies.html
    }
  ];
}
