# Privacy Policy

**Effective Date**: November 6, 2025
**Last Updated**: November 6, 2025

## Overview

This Privacy Policy explains how cs-learning.me ("we", "our", "the Site") collects, uses, and protects your information.

**Our Commitment**: We believe in privacy by design. We collect only essential data and never sell your information.

---

## What We Collect

### 1. Automatically Collected (Anonymous)

#### Vercel Analytics
- **Purpose**: Understand page performance and traffic patterns
- **Data Collected**:
  - Page views (aggregate count)
  - Web Vitals (LCP, FID, CLS)
  - Referrer URL
  - Browser type and device category (aggregate)
- **PII**: None (fully anonymous)
- **Cookies**: None required
- **Opt-Out**: Not applicable (no personal data)

#### API Logs (Server-Side)
- **Purpose**: Rate limiting, error debugging
- **Data Collected**:
  - IP address (hashed via HMAC-SHA256)
  - Request timestamp
  - API endpoint accessed
  - HTTP status code
- **Retention**: 30 days
- **Privacy Protection**: All IPs hashed before logging (see `lib/security/sanitize.js`)

### 2. User-Provided Data

#### Contact Form
- **Data Collected**:
  - Name (optional)
  - Email address
  - Message content
- **Purpose**: Respond to inquiries
- **Third-Party**: Formspree (form handling service)
- **Retention**: Managed by Formspree (see their privacy policy)
- **Your Rights**: Request deletion by contacting us

#### AI Chat Feature
- **Data Collected**:
  - Chat messages
  - Conversation history (session-based)
  - Session ID (randomly generated)
- **Purpose**: Provide conversational assistance
- **Third-Party**: OpenRouter AI
- **Retention**:
  - Client-side: Cleared on page refresh
  - Server-side: Not stored (ephemeral)
  - OpenRouter: Per their data retention policy
- **PII Protection**: No emails or names collected in chat

---

## What We DON'T Collect

✅ **No Cookies**: We don't use cookies (except essential Vercel infrastructure cookies)
✅ **No Tracking**: No cross-site tracking or user fingerprinting
✅ **No Personal Profiles**: We don't build user profiles
✅ **No Advertising IDs**: No ad targeting or retargeting
✅ **No Location Data**: No GPS or precise geolocation
✅ **No Device Identifiers**: No IMEI, MAC addresses, etc.

---

## How We Use Your Information

### Legitimate Purposes

1. **Site Performance**: Monitor load times, uptime, errors
2. **Security**: Rate limiting, fraud prevention
3. **Communication**: Respond to contact form submissions
4. **AI Assistance**: Provide chat functionality
5. **Legal Compliance**: Respond to lawful requests

### We NEVER

- ❌ Sell your data to third parties
- ❌ Use data for advertising
- ❌ Share data without your consent (except as legally required)
- ❌ Track you across other websites

---

## Third-Party Services

### Analytics & Infrastructure

| Service | Purpose | Data Shared | Privacy Policy |
|---------|---------|-------------|----------------|
| **Vercel** | Hosting, CDN, analytics | Anonymous page views, Web Vitals | [Vercel Privacy](https://vercel.com/legal/privacy-policy) |
| **OpenRouter AI** | AI chat responses | Chat messages, no PII | [OpenRouter Privacy](https://openrouter.ai/privacy) |
| **Formspree** | Contact form handling | Name, email, message | [Formspree Privacy](https://formspree.io/legal/privacy-policy/) |

### No Other L5 Tools

Per our **Tool-Analytics Policy** (`Tool-Analytics.md`):
- **Maximum 1 L5 tool** (analytics/monitoring) allowed
- **Currently**: Vercel Analytics only
- **Prohibited**: Sentry, Datadog, Google Analytics, Hotjar, FullStory

---

## Data Security

### Technical Measures

1. **Encryption in Transit**: HTTPS with HSTS preload
2. **Security Headers**: CSP, X-Frame-Options, etc. (see `SECURITY.md`)
3. **Rate Limiting**: 10 requests/min/IP to prevent abuse
4. **PII Hashing**: All IP addresses hashed with HMAC-SHA256 before logging
5. **Environment Variables**: Secrets stored securely (Vercel dashboard)
6. **Dependency Scanning**: Automated vulnerability scanning (Grype, CodeQL)

### Organizational Measures

- Regular security audits
- Incident response plan
- Access control (minimum necessary)
- No data backups (ephemeral data only)

---

## Data Retention

| Data Type | Retention Period | Justification |
|-----------|------------------|---------------|
| **API Logs** (hashed IPs) | 30 days | Security monitoring, debugging |
| **Vercel Analytics** | Indefinite (aggregate) | Performance trends |
| **Chat Messages** | Not stored | Ephemeral sessions only |
| **Contact Form** | Per Formspree policy | Communication records |

---

## Your Rights

Depending on your location (GDPR, CCPA), you may have the right to:

### Under GDPR (EU Users)
- **Access**: Request what data we have about you
- **Rectification**: Correct inaccurate data
- **Erasure**: Request deletion ("right to be forgotten")
- **Portability**: Receive your data in machine-readable format
- **Object**: Object to processing
- **Restrict**: Restrict certain types of processing

### Under CCPA (California Users)
- **Know**: What personal information is collected
- **Delete**: Request deletion of personal information
- **Opt-Out**: Opt-out of data sales (not applicable - we don't sell data)
- **Non-Discrimination**: Equal service regardless of privacy choices

### How to Exercise Rights

**Email**: [Your Email - e.g., privacy@cs-learning.me]
**Subject**: `Privacy Request - [Access/Deletion/Correction]`

**Response Time**: Within 30 days

**Note**: Due to our privacy-by-design approach (hashed IPs, no user accounts), we may not be able to identify you from our logs. We'll do our best to assist.

---

## Children's Privacy

This site is **not directed to children under 13** (or 16 in the EU). We do not knowingly collect personal information from children.

If you believe a child has provided us with personal information, please contact us immediately.

---

## International Data Transfers

- **Hosting**: Vercel (global CDN, data may be processed in various locations)
- **OpenRouter AI**: Data processed per their infrastructure
- **Legal Basis**: Necessary for service provision, legitimate interest

**EU Users**: Data transfers comply with GDPR (e.g., Standard Contractual Clauses).

---

## Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.

**Material Changes**: If we make significant changes, we'll add a notice on the homepage for 30 days.

**Your Continued Use**: Using the site after changes means you accept the updated policy.

---

## Do Not Track

We honor **Do Not Track (DNT)** browser signals. However, since we don't track users anyway, DNT doesn't change our behavior.

---

## Contact Us

**Privacy Questions or Requests**:
- **Email**: [Your Email - e.g., privacy@cs-learning.me]
- **Response Time**: Within 48 hours

**Security Issues**: See `SECURITY.md` for vulnerability reporting.

---

## Legal Disclosures

We may disclose information if:
1. **Required by Law**: Court order, subpoena, legal obligation
2. **Safety**: Protect rights, property, or safety of users/public
3. **Fraud Prevention**: Investigate potential fraud or abuse

We will resist overly broad requests and notify you when legally permitted.

---

## Data Controller

**David Ortiz Portfolio**
cs-learning.me
[Your Email]

**EU Representative**: [If required under GDPR]
**UK Representative**: [If required under UK GDPR]

---

## Additional Resources

- **Security Policy**: [SECURITY.md](./SECURITY.md)
- **Analytics Policy**: [Tool-Analytics.md](./Tool-Analytics.md)
- **Go-Live Checklist**: [Go-Live-Gate.md](./Go-Live-Gate.md)

---

**Transparency Commitment**: We believe in radical transparency. If you have questions about how we handle data, ask us directly.

---

**Policy Version**: 1.0
**Effective**: November 6, 2025
