# Security Infrastructure

This directory contains security utilities for the portfolio application.

## Architecture

Since this is a **static site with Vercel Serverless Functions** (not Next.js), security headers are configured in `vercel.json` rather than a `next.config.mjs` file.

### Modules

#### `headers.js`
- **Purpose**: Centralized security headers configuration
- **Usage**: Reference for `vercel.json` headers configuration
- **Note**: For Next.js projects, this can be imported directly. For static sites, use as documentation reference.

#### `rateLimiter.js`
- **Purpose**: Token bucket rate limiter (10 req/min/IP)
- **Usage**: Import in API routes (`/api/*.js`)
- **Production Note**: Consider using Upstash Redis for distributed rate limiting when scaling

```javascript
// Example usage in /api/myroute.js
import { rateLimitMiddleware } from '../../lib/security/rateLimiter.js';

export default async function handler(req, res) {
  // Apply rate limiting
  if (!rateLimitMiddleware(req, res)) {
    return; // Rate limit response already sent
  }

  // Continue with request handling...
}
```

#### `sanitize.js`
- **Purpose**: Privacy-safe hashing for PII protection
- **Usage**: Hash sensitive data before logging
- **Critical**: NEVER log raw PII (emails, IPs, tokens)

```javascript
// Example usage in API routes
import { hashAndLen, sanitizeEmail, createPrivacySafeLog } from '../../lib/security/sanitize.js';

// Log with privacy protection
console.log('User action:', createPrivacySafeLog({
  email: userEmail,
  ip: clientIp,
  action: 'login'
}, ['email', 'ip']));
```

## Configuration

### Environment Variables

Required for production:

```bash
# Privacy hashing salt (generate with: openssl rand -base64 32)
PRIVACY_HASH_SALT=your-secret-salt-here
```

### Vercel Headers

Security headers are configured in `vercel.json` based on `headers.js`. When updating security headers:

1. Update `lib/security/headers.js` (source of truth)
2. Manually sync changes to `vercel.json`
3. Test locally with `npm run dev`
4. Deploy and verify headers with browser DevTools

## Security Checklist

- [ ] Environment variables configured in Vercel dashboard
- [ ] Rate limiting enabled on all API routes
- [ ] PII hashing in all logs
- [ ] CSP headers tested and verified
- [ ] HSTS preload enabled
- [ ] Security headers validated with securityheaders.com
