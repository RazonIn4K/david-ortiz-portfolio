# Local Verification Checklist

## Overview

This document provides **step-by-step instructions** for verifying SEO, security headers, accessibility, and error pages locally before deployment.

---

## Prerequisites

Ensure you have the following tools installed:

```bash
# Node.js & npm
node --version   # Should be v18+ or v20+
npm --version

# Optional: Python (for dev server)
python3 --version

# Optional: curl (for header testing)
curl --version
```

---

## 1️⃣ Verify Security Headers Locally

### Step 1: Start Local Dev Server

**Option A: Using Python dev server**
```bash
python3 dev-server.py 9000
```

**Option B: Using a simple HTTP server**
```bash
npx serve . -p 9000
```

**Option C: Using Vercel CLI (recommended)**
```bash
npm install -g vercel
vercel dev --port 9000
```

### Step 2: Check Security Headers

Open a new terminal and run:

```bash
# Test security headers
curl -I http://localhost:9000

# Check for specific headers
curl -I http://localhost:9000 | grep -E "(Content-Security-Policy|X-Content-Type-Options|Strict-Transport-Security|X-Frame-Options)"
```

**Expected Output:**
```
HTTP/1.1 200 OK
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' ...
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
strict-transport-security: max-age=63072000; includeSubDomains; preload
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()
```

### Step 3: Verify CSP (Content Security Policy)

Check that the CSP header matches `lib/security/headers.js`:

```bash
# Extract CSP header
curl -I http://localhost:9000 | grep -i "content-security-policy"

# Compare with headers.js
cat lib/security/headers.js | grep -A 30 "CSP_DIRECTIVES"
```

**Verify these directives are present:**
- `default-src 'self'`
- `script-src` includes Vercel analytics domains
- `img-src` includes `data:`, `blob:`, and image CDNs
- `form-action` includes `'self'` and Formspree
- `object-src 'none'`

### Step 4: Test Header Enforcement

Open browser console (F12) and check for CSP violations:

1. Navigate to http://localhost:9000
2. Open DevTools → Console
3. Look for messages like: `"Refused to load ... because it violates the following Content Security Policy directive..."`

**No CSP violations = ✅ Headers working correctly**

---

## 2️⃣ Verify SEO Essentials

### robots.txt

```bash
# Check robots.txt exists and is accessible
curl http://localhost:9000/robots.txt

# Expected output:
# User-agent: *
# Allow: /
# Sitemap: https://www.cs-learning.me/sitemap.xml
```

**Verify:**
- ✅ File exists at `/robots.txt`
- ✅ Allows all user agents
- ✅ Points to sitemap

### sitemap.xml

```bash
# Check sitemap.xml exists
curl http://localhost:9000/sitemap.xml

# Expected: Valid XML with URLs
```

**Verify:**
- ✅ File exists at `/sitemap.xml`
- ✅ Contains homepage URL (`https://www.cs-learning.me/`)
- ✅ Contains section anchors (`#about`, `#skills`, `#projects`, `#contact`)
- ✅ Valid XML format

### Canonical URLs

Open http://localhost:9000 and view page source (Ctrl+U):

```html
<!-- Should be present in <head> -->
<link rel="canonical" href="https://www.cs-learning.me/" />
```

**Verify in browser:**
1. Open http://localhost:9000
2. Right-click → "View Page Source"
3. Search for `rel="canonical"`

**Expected:** `<link rel="canonical" href="https://www.cs-learning.me/">`

### Open Graph Meta Tags

View page source and verify these tags exist:

```html
<meta property="og:title" content="David Ortiz - Cloud Support Portfolio" />
<meta property="og:description" content="..." />
<meta property="og:image" content="/assets/og-image.png" />
<meta property="og:url" content="https://www.cs-learning.me" />
<meta property="og:type" content="website" />
```

**Testing with Social Media Debuggers:**

1. **Facebook Sharing Debugger**
   - Go to: https://developers.facebook.com/tools/debug/
   - Enter: `https://www.cs-learning.me` (after deployment)
   - Verify image and description appear

2. **Twitter Card Validator**
   - Go to: https://cards-dev.twitter.com/validator
   - Enter URL
   - Verify card preview

3. **LinkedIn Post Inspector**
   - Go to: https://www.linkedin.com/post-inspector/
   - Enter URL
   - Verify preview

---

## 3️⃣ Verify Accessible Error Pages

### 404 Page

**Test 404 page:**
```bash
# Visit non-existent page
curl -I http://localhost:9000/this-page-does-not-exist

# Expected: 404 status
```

**Browser test:**
1. Navigate to http://localhost:9000/test-404
2. Should see custom 404 page

**Verify accessibility:**
- [ ] Page has `<html lang="en">`
- [ ] Main content in `<main>` or `role="main"`
- [ ] Error code has `aria-label="Error 404"`
- [ ] Links have descriptive text
- [ ] "Report issue" link present
- [ ] Focus indicators visible (Tab through page)

### 500 Page

**Browser test:**
1. Open `500.html` directly: http://localhost:9000/500.html
2. Should see custom 500 error page

**Verify accessibility:**
- [ ] Page has `<html lang="en">`
- [ ] Main content in `<main>` or `role="main"`
- [ ] Error code has `aria-label="Error 500"`
- [ ] Error details have `role="alert"`
- [ ] Links have descriptive text and `aria-label`
- [ ] "Report issue" link points to GitHub issues
- [ ] Timestamp populated by JavaScript

**Test error timestamp:**
Open browser console and check:
```javascript
document.getElementById('error-timestamp').textContent
// Should show current ISO timestamp
```

---

## 4️⃣ Verify Footer "Report an Issue" Link

1. Open http://localhost:9000
2. Scroll to footer
3. Verify link exists: "Found an issue? Report it on GitHub"
4. Click link → Should open GitHub issues page in new tab

**Expected URL:**
```
https://github.com/RazonIn4K/david-ortiz-portfolio/issues/new
```

**Verify:**
- [ ] Link opens in new tab (`target="_blank"`)
- [ ] Link has `rel="noopener noreferrer"`
- [ ] Link has descriptive `aria-label`

---

## 5️⃣ Verify OG Image

### Check Image Exists

```bash
# Check if OG image exists
ls -lh assets/og-image.svg

# Expected: File exists, ~3-4 KB
```

### View Image in Browser

Navigate to: http://localhost:9000/assets/og-image.svg

**Verify:**
- [ ] Image displays correctly
- [ ] Shows "David Ortiz" title
- [ ] Shows metrics (87%, $40K, 1.3s)
- [ ] Shows tech stack (AWS, GCP, PostgreSQL, Docker)
- [ ] Blue/purple color scheme matches brand

### Test Image Reference

View page source and verify:
```html
<meta property="og:image" content="/assets/og-image.png" />
```

**NOTE:** HTML references `.png` but we created `.svg`.

**Options:**
1. Update HTML to reference `.svg`: `content="/assets/og-image.svg"`
2. Convert SVG to PNG (for better social media compatibility)

**To convert to PNG (optional):**
```bash
# Using ImageMagick
convert -background none -resize 1200x630 assets/og-image.svg assets/og-image.png

# Or using Inkscape
inkscape assets/og-image.svg --export-filename=assets/og-image.png --export-width=1200 --export-height=630
```

---

## 6️⃣ Accessibility Testing

### Automated Tools

**1. axe DevTools (Chrome Extension)**

Install: https://www.deque.com/axe/devtools/

1. Open http://localhost:9000
2. Open DevTools → axe DevTools tab
3. Click "Scan ALL of my page"
4. **Expected:** 0 violations, 0 critical issues

**2. WAVE (Browser Extension)**

Install: https://wave.webaim.org/extension/

1. Open http://localhost:9000
2. Click WAVE extension icon
3. **Expected:** 0 errors, minimal alerts

**3. Lighthouse (Chrome DevTools)**

1. Open http://localhost:9000
2. Open DevTools → Lighthouse tab
3. Select "Accessibility" category
4. Click "Generate report"
5. **Expected:** Score ≥ 95

### Manual Testing

**Keyboard Navigation:**
1. Open http://localhost:9000
2. Press `Tab` repeatedly
3. **Verify:**
   - [ ] Can reach all interactive elements
   - [ ] Focus indicators visible
   - [ ] Logical tab order (top to bottom, left to right)
   - [ ] No keyboard traps
   - [ ] Skip link appears on Tab ("Skip to main content")

**Screen Reader (NVDA - Windows):**

Download: https://www.nvaccess.org/download/

1. Install NVDA
2. Press `Ctrl + Alt + N` to start
3. Navigate to http://localhost:9000
4. Use arrow keys to navigate
5. **Verify:**
   - [ ] Page title announced
   - [ ] Headings structure makes sense
   - [ ] Form labels read correctly
   - [ ] Link purposes clear

**Color Contrast:**

Use Lighthouse or manual checker:
- https://webaim.org/resources/contrastchecker/

**Verify:**
- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Large text (18pt+) ≥ 3:1

---

## 7️⃣ Performance Testing

### Lighthouse Performance Audit

1. Open http://localhost:9000
2. Open DevTools → Lighthouse
3. Select "Performance" category
4. Click "Generate report"

**Target Metrics:**
- [ ] Performance Score ≥ 90
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Time to Interactive (TTI) < 3.5s

### Check Asset Sizes

```bash
# Check JavaScript bundle sizes
ls -lh src/js/*.js

# Check CSS sizes
ls -lh src/css/*.css

# Check image sizes
ls -lh assets/*.{png,jpg,svg,webp}
```

**Thresholds:**
- JS files: < 100 KB each (after minification)
- CSS files: < 50 KB each
- Images: < 500 KB each

---

## 8️⃣ Privacy & Analytics Verification

### Check L5=NONE Policy

**Verify no raw PII in code:**

```bash
# Search for potential PII leaks
grep -r "console.log.*email" .
grep -r "console.log.*password" .
grep -r "console.log.*phone" .

# Expected: No matches (or only in sanitization utilities)
```

### Verify Hashed Correlation IDs

Check `lib/security/sanitize.js`:

```bash
# Test correlation ID generation
node -e "const { generateCorrelationId } = require('./lib/security/sanitize.js'); console.log(generateCorrelationId('user@example.com'));"

# Expected: c123456789abcdef (hashed ID, not raw email)
```

### Check Analytics Consent

1. Open http://localhost:9000
2. Open DevTools → Application → Local Storage
3. Clear `analytics_consent` key
4. Refresh page
5. **Verify:** Consent banner appears
6. Click "Accept" → `analytics_consent` set to `true`
7. Refresh → Banner should not appear again

---

## 9️⃣ CI/CD Verification

### Check GitHub Actions Workflow

```bash
# Verify workflow file exists
ls -la .github/workflows/security-scan.yml

# Validate YAML syntax
npx yaml-validator .github/workflows/security-scan.yml
```

### Local SBOM Generation (Optional)

**Install Syft:**
```bash
curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin
```

**Generate SBOM:**
```bash
syft dir:. -o json --file sbom.json
```

**Verify:**
```bash
# Check SBOM was created
ls -lh sbom.json

# View package count
jq '.artifacts | length' sbom.json
```

**Install Grype:**
```bash
curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin
```

**Scan for vulnerabilities:**
```bash
grype sbom:sbom.json -o table
```

**Expected:** Minimal vulnerabilities (0 critical, < 5 high)

---

## 🔟 Final Checklist Summary

Before deployment, ensure all items pass:

### Security
- [ ] Security headers present (`curl -I` test)
- [ ] CSP configured correctly (no console violations)
- [ ] No raw PII in logs (grep test)
- [ ] Rate limiting configured

### SEO
- [ ] `robots.txt` accessible
- [ ] `sitemap.xml` accessible
- [ ] Canonical URLs present
- [ ] OG meta tags present
- [ ] OG image exists and displays

### Accessibility
- [ ] axe DevTools: 0 violations
- [ ] WAVE: 0 errors
- [ ] Lighthouse Accessibility: ≥ 95
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] 404 page accessible
- [ ] 500 page accessible

### UX
- [ ] "Report issue" footer link works
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] No console errors

### Performance
- [ ] Lighthouse Performance: ≥ 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Asset sizes within limits

### Privacy
- [ ] L5=NONE policy enforced
- [ ] Analytics consent banner appears
- [ ] No third-party tracking

### CI/CD
- [ ] GitHub Actions workflow valid
- [ ] SBOM generation works
- [ ] No critical vulnerabilities

---

## 🚀 Production Verification (Post-Deployment)

After deploying to production:

### 1. Security Headers (Production)

```bash
curl -I https://www.cs-learning.me | grep -E "(Content-Security|Strict-Transport|X-)"
```

### 2. SSL/TLS Certificate

```bash
# Check SSL certificate
openssl s_client -connect www.cs-learning.me:443 -servername www.cs-learning.me < /dev/null

# Or use online tool:
https://www.ssllabs.com/ssltest/analyze.html?d=www.cs-learning.me
```

**Expected:** A or A+ rating

### 3. Social Media Previews

Test with actual social media debuggers (URLs in section 2):
- [ ] Facebook Sharing Debugger
- [ ] Twitter Card Validator
- [ ] LinkedIn Post Inspector

### 4. Google Search Console

Submit sitemap:
1. Go to: https://search.google.com/search-console
2. Select property: cs-learning.me
3. Navigate to: Sitemaps
4. Submit: `https://www.cs-learning.me/sitemap.xml`

### 5. Uptime Monitoring

Set up monitoring with:
- UptimeRobot: https://uptimerobot.com/
- Better Uptime: https://betteruptime.com/
- Pingdom: https://www.pingdom.com/

---

## Troubleshooting

### Headers Not Appearing Locally

**Issue:** `curl -I http://localhost:9000` doesn't show security headers

**Solution:**
- Use Vercel CLI (`vercel dev`) instead of Python server
- Headers are enforced by Vercel edge network, not local file server
- Check `vercel.json` configuration

### OG Image Not Loading

**Issue:** Social media previews show broken image

**Solution:**
1. Check if image exists: `ls assets/og-image.svg`
2. Verify meta tag path: `/assets/og-image.png` (update to `.svg` or convert)
3. Use absolute URL in production: `https://www.cs-learning.me/assets/og-image.svg`

### 404/500 Pages Not Working

**Issue:** Custom error pages not displaying

**Solution:**
- Check `vercel.json` for error page configuration
- In local dev, manually navigate to `/404.html` and `/500.html`
- Verify pages exist in root directory

---

**Last Updated:** 2025-01-06
**Version:** 1.0
**Maintainer:** David Ortiz
