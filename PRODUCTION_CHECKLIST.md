# Production Deployment Checklist

## Pre-Deployment Tasks

### ✅ Completed
- [x] Security audit performed
- [x] npm audit shows 0 vulnerabilities
- [x] All API endpoints have rate limiting
- [x] Input validation on all forms
- [x] API keys in environment variables
- [x] MongoDB indexes configured
- [x] TTL policies for data cleanup
- [x] Fixed consent-banner.js path
- [x] Reorganized project structure
- [x] UI testing with Playwright
- [x] Form submission validation
- [x] Git repository up to date

### ⚠️ Recommended Before Production

#### High Priority
- [ ] Remove/disable console.log statements (103 occurrences found)
- [ ] Restrict CORS origins from wildcard to specific domains
- [ ] Implement reCAPTCHA on contact form
- [ ] Set NODE_ENV=production in Vercel

#### Medium Priority
- [ ] Add security headers in vercel.json:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Strict-Transport-Security
- [ ] Implement Redis for distributed rate limiting
- [ ] Set up error monitoring (Sentry or similar)
- [ ] Configure custom error pages

#### Low Priority
- [ ] Minify all CSS files
- [ ] Optimize image sizes
- [ ] Set up automated backups for MongoDB
- [ ] Implement API request signing

## Environment Variables Verification

Ensure these are set in Vercel:
```
✅ MONGODB_CONNECTION_STRING
✅ MONGODB_DATABASE
✅ MONGODB_USERNAME
✅ OPENROUTER_API_KEY
✅ OPENROUTER_PRIMARY_MODEL
? GOOGLE_MAPS_API_KEY
? GA_MEASUREMENT_ID
```

## Performance Targets
- [ ] Lighthouse Performance: >90
- [ ] Lighthouse Accessibility: >95
- [ ] Lighthouse Best Practices: >90
- [ ] Lighthouse SEO: >90
- [ ] First Contentful Paint: <1.5s
- [ ] Time to Interactive: <3.5s

## Security Headers to Add (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

## CORS Configuration Update
Replace wildcard with:
```javascript
const allowedOrigins = [
  'https://cs-learning.me',
  'https://www.cs-learning.me',
  'https://david-ortiz-portfolio.vercel.app'
];

const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin);
}
```

## Testing Checklist
- [ ] All forms submit correctly
- [ ] Chat functionality works
- [ ] Analytics tracking confirmed
- [ ] Mobile responsive design verified
- [ ] Cross-browser compatibility tested
- [ ] 404 page displays correctly
- [ ] All external links work
- [ ] Beautiful.ai embeds load

## Monitoring Setup
- [ ] Set up uptime monitoring
- [ ] Configure error alerting
- [ ] Enable performance monitoring
- [ ] Set up backup strategy
- [ ] Create incident response plan

## Final Steps
1. [ ] Run production build locally
2. [ ] Test all functionality
3. [ ] Verify environment variables
4. [ ] Deploy to staging environment
5. [ ] Run security scan
6. [ ] Performance testing
7. [ ] Deploy to production
8. [ ] Verify production deployment
9. [ ] Monitor for 24 hours
10. [ ] Document any issues

---
*Last Updated: September 22, 2025*
*Use this checklist before each production deployment*