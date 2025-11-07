# Go-Live Gate Checklist

## Overview

This document defines the **mandatory pre-deployment checklist** for the David Ortiz portfolio website. All items must be verified before pushing changes to production.

**Purpose:** Ensure security, accessibility, performance, and SEO standards are met before deployment.

---

## 🔒 Security Checklist

### Headers & CSP

- [ ] **Security headers configured** in `lib/security/headers.js`
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-Frame-Options: SAMEORIGIN`
  - [ ] `X-XSS-Protection: 1; mode=block`
  - [ ] `Strict-Transport-Security` with preload
  - [ ] `Content-Security-Policy` with no `unsafe-eval`
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
  - [ ] `Permissions-Policy` disables camera, microphone, geolocation

- [ ] **Verify headers in production:**
  ```bash
  curl -I https://www.cs-learning.me | grep -E "(X-|Content-Security|Strict-)"
  ```

### Input Validation & Sanitization

- [ ] All user inputs sanitized (use `lib/security/sanitize.js`)
- [ ] Email validation uses `isValidEmail()`
- [ ] URL validation uses `isValidUrl()`
- [ ] Form data escaped with `escapeHtml()` before display
- [ ] No SQL injection vectors (no direct DB queries)
- [ ] No command injection vectors

### Rate Limiting

- [ ] **Token bucket rate limiter** configured (`lib/security/token-bucket.js`)
- [ ] API endpoints rate-limited:
  - [ ] `/api/analytics` - 60 req/min
  - [ ] `/api/contact` - 5 req/hour
  - [ ] `/api/chat` - 20 req/min
- [ ] Rate limit headers exposed (`X-RateLimit-Remaining`, `X-RateLimit-Reset`)

### Privacy & PII Protection

- [ ] **L5=NONE policy** enforced (see `docs/Tool-Analytics.md`)
- [ ] No raw PII in logs
- [ ] Correlation IDs hashed with `generateCorrelationId()`
- [ ] Error messages redacted with `redactSensitiveData()`
- [ ] Analytics consent banner active (`src/js/consent-banner.min.js`)

### Secrets Management

- [ ] No hardcoded API keys in code
- [ ] Environment variables used for secrets
- [ ] `.env` file in `.gitignore`
- [ ] Vercel environment variables configured (if applicable)

---

## ♿ Accessibility Checklist (WCAG 2.1 AA)

### HTML Semantics

- [ ] All pages use semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [ ] Proper heading hierarchy (only one `<h1>` per page)
- [ ] Form labels associated with inputs (`<label for="...">`)
- [ ] Buttons use `<button>` (not `<div onclick="">`)

### ARIA & Screen Readers

- [ ] `aria-label` on icon-only buttons
- [ ] `aria-describedby` for form error messages
- [ ] `role="alert"` for dynamic error messages
- [ ] Skip links present (`<a href="#main" class="skip-link">`)
- [ ] Landmark regions labeled (`role="main"`, `aria-label="Main navigation"`)

### Keyboard Navigation

- [ ] All interactive elements focusable with Tab
- [ ] Focus indicators visible (`:focus` styles defined)
- [ ] No keyboard traps
- [ ] Logical tab order (matches visual flow)

### Color & Contrast

- [ ] Text contrast ratio ≥ 4.5:1 for normal text
- [ ] Text contrast ratio ≥ 3:1 for large text (18pt+)
- [ ] Color not sole indicator of state (use icons + text)

### Validation Tools

- [ ] Run [axe DevTools](https://www.deque.com/axe/devtools/) (0 violations)
- [ ] Run [WAVE](https://wave.webaim.org/) (0 errors)
- [ ] Test with [NVDA](https://www.nvaccess.org/) screen reader
- [ ] Test with keyboard-only navigation

---

## 🚀 Performance Checklist

### Core Web Vitals

- [ ] **LCP (Largest Contentful Paint)** < 2.5s
- [ ] **FID (First Input Delay)** < 100ms
- [ ] **CLS (Cumulative Layout Shift)** < 0.1

**Verify with:**
```bash
# Use Lighthouse
npm run lighthouse

# Or online
https://pagespeed.web.dev/analysis?url=https://www.cs-learning.me
```

### Image Optimization

- [ ] Images compressed (use WebP/AVIF where supported)
- [ ] Images lazy-loaded (`loading="lazy"`)
- [ ] SVG icons optimized (minified)
- [ ] OG image size < 1MB (`assets/og-image.svg`)

### JavaScript & CSS

- [ ] JS files minified (`.min.js`)
- [ ] CSS files minified (`.min.css`)
- [ ] Critical CSS inlined
- [ ] Non-critical JS deferred (`defer` or `async`)
- [ ] No render-blocking resources

### Caching

- [ ] Static assets have long cache headers (1 year)
- [ ] HTML has no-cache headers
- [ ] Service worker configured (if PWA features enabled)

---

## 🔍 SEO Checklist

### Meta Tags

- [ ] `<title>` tag present and descriptive (< 60 chars)
- [ ] `<meta name="description">` present (< 160 chars)
- [ ] `<meta name="keywords">` present
- [ ] Canonical URL set (`<link rel="canonical">`)
- [ ] `<meta name="robots" content="index, follow">`

### Open Graph & Social

- [ ] `og:title` meta tag
- [ ] `og:description` meta tag
- [ ] `og:image` meta tag (1200×630px image)
- [ ] `og:url` meta tag
- [ ] `og:type` meta tag
- [ ] Twitter Card meta tags (`twitter:card`, `twitter:image`)

### Structured Data

- [ ] JSON-LD structured data present (Person, WebSite schemas)
- [ ] Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)

### Sitemap & Robots

- [ ] `robots.txt` accessible at `/robots.txt`
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.cs-learning.me/sitemap.xml
  ```
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] Sitemap submitted to Google Search Console

### URL Structure

- [ ] URLs descriptive and readable
- [ ] HTTPS enforced (redirect HTTP → HTTPS)
- [ ] No trailing slashes inconsistency
- [ ] 404 page accessible (`404.html`)
- [ ] 500 page accessible (`500.html`)

---

## 🧪 CI/CD & Testing Checklist

### GitHub Actions Workflows

- [ ] **Security scan workflow** active (`.github/workflows/security-scan.yml`)
  - [ ] Syft SBOM generation
  - [ ] Grype vulnerability scanning
  - [ ] CodeQL analysis
  - [ ] SBOM artifact published

- [ ] **Build workflow** passing
- [ ] All tests passing (if tests exist)

### Dependency Security

- [ ] `npm audit` shows 0 high/critical vulnerabilities
- [ ] Dependabot enabled for automated updates
- [ ] SBOM generated (`sbom.json` artifact)

### Code Quality

- [ ] No console.log() in production code
- [ ] No commented-out code blocks
- [ ] ESLint passes (if configured)
- [ ] Code reviewed by at least one person (PR approval)

---

## 🌐 Deployment Checklist

### Pre-Deployment

- [ ] All items in this checklist verified
- [ ] Feature branch merged to main
- [ ] Git tags created for version tracking
- [ ] CHANGELOG.md updated

### Vercel Configuration

- [ ] `vercel.json` headers match `lib/security/headers.js`
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured (cs-learning.me)
- [ ] HTTPS certificate active
- [ ] Branch previews enabled

### Post-Deployment Verification

Within 10 minutes of deployment:

- [ ] **Smoke tests:**
  - [ ] Homepage loads (200 OK)
  - [ ] Contact form submits successfully
  - [ ] AI chat initializes (if enabled)
  - [ ] Navigation links work
  - [ ] Assets load correctly (no 404s in console)

- [ ] **Security headers verified:**
  ```bash
  curl -I https://www.cs-learning.me | grep "Content-Security-Policy"
  ```

- [ ] **Analytics tracking:**
  - [ ] Vercel Speed Insights recording
  - [ ] Custom analytics events firing

- [ ] **Error pages accessible:**
  - [ ] https://www.cs-learning.me/test-404 → 404 page
  - [ ] 500 page template exists

### Monitoring

- [ ] Set up uptime monitoring (e.g., UptimeRobot, Better Uptime)
- [ ] Configure error alerting (e.g., Sentry, Vercel notifications)
- [ ] Review Vercel deployment logs

---

## 📊 Performance Budget

Do not deploy if metrics exceed these thresholds:

| Metric | Threshold |
|--------|-----------|
| Page Size | < 2 MB |
| JavaScript Size | < 500 KB |
| CSS Size | < 100 KB |
| First Load Time | < 3s |
| Time to Interactive | < 4s |
| Lighthouse Score | ≥ 90 |

**Check with:**
```bash
npm run build && npm run analyze
```

---

## 🚨 Rollback Plan

If critical issues found post-deployment:

1. **Immediate:** Revert to previous Vercel deployment
   ```bash
   vercel rollback
   ```

2. **Fix:** Create hotfix branch from previous stable tag
   ```bash
   git checkout -b hotfix/critical-issue v1.0.0
   ```

3. **Communicate:** Update status page or add banner to site

4. **Post-Mortem:** Document incident and update this checklist

---

## ✅ Sign-Off

**Deployment Date:** _________________

**Verified By:** _________________

**Sign-Off:**
- [ ] Security checklist complete
- [ ] Accessibility checklist complete
- [ ] Performance checklist complete
- [ ] SEO checklist complete
- [ ] CI/CD checklist complete
- [ ] Deployment checklist complete

**Approved for Production Deployment:** ☐ YES | ☐ NO

---

## Appendix: Useful Commands

### Security Scan
```bash
# Check for security headers
curl -I https://www.cs-learning.me

# Scan dependencies
npm audit

# Check for secrets in code
git secrets --scan
```

### Accessibility Scan
```bash
# Pa11y CLI
npx pa11y https://www.cs-learning.me

# Lighthouse accessibility audit
npx lighthouse https://www.cs-learning.me --only-categories=accessibility
```

### Performance Scan
```bash
# Lighthouse
npx lighthouse https://www.cs-learning.me

# WebPageTest
https://www.webpagetest.org/
```

### SEO Validation
```bash
# Check robots.txt
curl https://www.cs-learning.me/robots.txt

# Check sitemap
curl https://www.cs-learning.me/sitemap.xml

# Validate structured data
https://search.google.com/test/rich-results
```

---

**Last Updated:** 2025-01-06
**Version:** 1.0
**Owner:** David Ortiz
