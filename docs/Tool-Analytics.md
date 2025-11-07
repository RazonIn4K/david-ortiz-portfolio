# Tool Analytics & Privacy Policy

## Executive Summary

This document defines the analytics, telemetry, and privacy policies for the David Ortiz portfolio website.

**TL;DR:**
- ✅ **L5 Logging Level: NONE** (No raw PII ever logged)
- ✅ Correlation IDs are **hashed only**
- ✅ Analytics is **privacy-first** and **consent-based**
- ✅ Vercel Speed Insights enabled (aggregated metrics only)
- ✅ No third-party tracking pixels or cookies

---

## L5 Logging Policy: NONE

### What is L5?

L5 refers to **Logging Level 5**, which in many security frameworks represents the most verbose logging level that includes Personally Identifiable Information (PII).

### Our Policy: L5 = NONE

**This project has a strict L5=NONE policy.**

This means:

❌ **NEVER logged:**
- Raw email addresses
- Full IP addresses
- Names, phone numbers, or physical addresses
- Session tokens or authentication credentials
- Form submission content (except sanitized metadata)
- Any data that can identify an individual user

✅ **Acceptable to log:**
- Hashed correlation IDs (see `lib/security/sanitize.js::generateCorrelationId`)
- Aggregated metrics (page views, error rates, performance metrics)
- Sanitized event names and types
- Browser/device metadata (user agent, screen size)
- Geographic region (city/state level only, never precise location)

### Implementation

All logging utilities in this project use the sanitization functions from `lib/security/sanitize.js`:

```js
import { generateCorrelationId, redactSensitiveData } from '@/lib/security/sanitize';

// ✅ Good: Hash PII before logging
const correlationId = generateCorrelationId(userEmail);
logger.info('User action', { correlationId, action: 'form_submit' });

// ❌ Bad: Never log raw PII
logger.info('User action', { email: userEmail }); // FORBIDDEN
```

### Enforcement

- All API endpoints use `redactSensitiveData()` for error messages
- Form submissions sanitize input before processing
- Analytics events validate against PII before transmission
- Code review checklist includes L5 policy verification

---

## Analytics Implementation

### Current Analytics Stack

1. **Vercel Speed Insights** (Primary)
   - Aggregated performance metrics
   - Real User Monitoring (RUM)
   - No PII collected
   - Compliant with GDPR, CCPA
   - Documentation: https://vercel.com/docs/speed-insights

2. **Custom Analytics API** (`/api/analytics.js`)
   - Privacy-first event tracking
   - Hashed session IDs only
   - Rate-limited to prevent abuse
   - Validates all events (see `lib/security/sanitize.js::validateAnalyticsEvent`)

3. **Consent-Based Activation**
   - Analytics only loads after user consent
   - Managed by `src/js/consent-banner.min.js`
   - LocalStorage preference: `analytics_consent`

### Analytics Events Tracked

All events are **privacy-safe** and **consent-gated**:

| Event Name | Description | Data Collected |
|------------|-------------|----------------|
| `page_view` | User views a page | Page URL, timestamp, hashed session ID |
| `cta_click` | Call-to-action clicked | Button label, category, timestamp |
| `form_submit` | Contact form submitted | Event type only (no form data) |
| `error_404` | 404 page viewed | Requested URL, referrer |
| `error_500` | 500 error occurred | Error timestamp (no stack traces) |
| `scroll_depth` | User scrolls page | Percentage scrolled (25%, 50%, 75%, 100%) |

### Data Retention

- **Server logs:** 7 days (Vercel default)
- **Analytics events:** 90 days (aggregated after 30 days)
- **Error logs:** 30 days (PII redacted)
- **Session IDs:** Hashed, never stored with user data

---

## Privacy Compliance

### GDPR Compliance

✅ **Lawful Basis:** Legitimate interest + consent for analytics
✅ **Data Minimization:** Only collect what's necessary
✅ **Right to Access:** Users can request their hashed correlation ID data
✅ **Right to Erasure:** Session data auto-expires after 7 days
✅ **Privacy by Design:** L5=NONE enforced at code level

### CCPA Compliance

✅ **Do Not Sell:** We never sell user data
✅ **Opt-Out:** Consent banner allows analytics opt-out
✅ **Transparency:** This document discloses all data collection

### Cookie Policy

**Session Cookies Only (No Tracking):**

| Cookie Name | Purpose | Duration | Essential |
|-------------|---------|----------|-----------|
| `analytics_consent` | Stores user's analytics preference | 1 year | No |
| `session_id` | Anti-CSRF and session correlation (hashed) | Session | Yes |

**No third-party cookies are used.**

---

## Rate Limiting & Abuse Prevention

### Token Bucket Rate Limiter

Implemented in `lib/security/token-bucket.js`:

- **Analytics API:** 60 requests/minute per IP
- **Contact Form:** 5 submissions/hour per IP
- **Chat API:** 20 requests/minute per IP

### Hashed IP Storage

```js
// IPs are hashed before storage
const hashedIP = generateCorrelationId(req.headers['x-forwarded-for']);
rateLimiter.consume(hashedIP);
```

**No raw IP addresses are stored in rate limiter memory.**

---

## Security Headers & CSP

All analytics scripts are whitelisted in Content Security Policy (`lib/security/headers.js`):

```js
'script-src': [
  "'self'",
  "https://va.vercel-scripts.com",        // Vercel Analytics
  "https://vitals.vercel-insights.com",   // Speed Insights
]
```

No inline `eval()` or unsafe third-party scripts allowed.

---

## Form Data Handling

### Contact Form (`api/contact.js`)

1. **Input Sanitization:**
   ```js
   import { sanitizeString, isValidEmail, escapeHtml } from '@/lib/security/sanitize';

   const sanitized = {
     name: sanitizeString(req.body.name, { maxLength: 100 }),
     email: isValidEmail(req.body.email) ? req.body.email : null,
     message: sanitizeString(req.body.message, { maxLength: 2000, allowNewlines: true })
   };
   ```

2. **No Database Storage:**
   - Form submissions sent to Formspree (third-party)
   - No local database stores user messages
   - Formspree Privacy Policy: https://formspree.io/legal/privacy-policy/

3. **Rate Limiting:**
   - 5 submissions per hour per IP (hashed)
   - CAPTCHA can be added if spam increases

### AI Chat (`api/chat.js`)

1. **Ephemeral Sessions:**
   - Chat messages not persisted
   - Session ID is hashed
   - OpenRouter API used (privacy policy: https://openrouter.ai/privacy)

2. **Input Validation:**
   - Max message length: 1000 characters
   - XSS prevention via `escapeHtml()`
   - No file uploads allowed

---

## Monitoring & Alerting

### What We Monitor

✅ **System Health:**
- API response times
- Error rates (500s)
- Page load performance

✅ **Security Events:**
- Rate limit violations
- Invalid request patterns
- CSP violations

❌ **What We DO NOT Monitor:**
- Individual user browsing patterns
- Keystrokes or mouse movements
- Private form content

### Alerting Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 5% over 5 min | Email alert to admin |
| API latency | > 2s p95 | Performance investigation |
| Rate limit hits | > 100/hour | IP investigation (hashed) |

---

## Audit & Compliance

### Code Review Checklist

Before merging any PR that touches data handling:

- [ ] No raw PII in logs (grep for email, password, ssn, phone)
- [ ] All user input sanitized (uses `sanitizeString()` or equivalent)
- [ ] Correlation IDs hashed (uses `generateCorrelationId()`)
- [ ] Rate limiting applied to new endpoints
- [ ] Security headers updated if new resources added
- [ ] Privacy policy updated if data collection changes

### Annual Review

**Last Review:** 2025-01-06
**Next Review:** 2026-01-06
**Reviewer:** David Ortiz

Changes to this policy require:
1. Update this document
2. Update consent banner text
3. Notify users via site banner (if material change)

---

## Contact & Data Requests

### Data Subject Access Requests (DSAR)

Users can request:
- Copy of their hashed correlation ID data
- Deletion of analytics events linked to their session
- Opt-out from analytics tracking

**How to Request:**
Email `david@cs-learning.me` with subject: "DSAR Request - [Your Session ID]"

**Response Time:** 30 days (per GDPR requirements)

### Security Concerns

Report security vulnerabilities to:
- **Email:** david@cs-learning.me
- **GitHub Issues:** https://github.com/RazonIn4K/david-ortiz-portfolio/issues/new?labels=security

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-06 | Initial privacy policy, L5=NONE established |

---

## Summary

**L5 Logging Level: NONE** is strictly enforced across all systems.

- No raw PII in logs
- Correlation IDs are hashed only
- Analytics is consent-based and privacy-first
- Rate limiting prevents abuse
- Annual privacy policy review

This policy ensures compliance with GDPR, CCPA, and industry best practices while maintaining useful analytics for site improvement.
