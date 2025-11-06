# Security Policy

## Reporting a Vulnerability

**We take security seriously.** If you discover a security vulnerability, please report it responsibly.

### 🔒 How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

**Preferred Method**: Email security report to:
- **Email**: [Your Email - e.g., security@cs-learning.me]
- **Subject**: `[SECURITY] Vulnerability Report - [Brief Description]`

**What to Include**:
1. **Description**: Clear explanation of the vulnerability
2. **Impact**: Potential security impact (data leak, XSS, CSRF, etc.)
3. **Steps to Reproduce**: Detailed steps to reproduce the issue
4. **Proof of Concept**: Screenshots, code snippets, or working PoC (if safe)
5. **Affected Components**: Which files/routes are affected
6. **Suggested Fix**: If you have a proposed solution

### Response Timeline

| Stage | Timeframe |
|-------|-----------|
| **Initial Response** | Within 48 hours |
| **Triage & Validation** | Within 1 week |
| **Fix Development** | Depends on severity |
| **Disclosure** | After fix is deployed |

### Severity Levels

- **Critical**: RCE, authentication bypass, data breach
- **High**: XSS, CSRF, SQL injection, sensitive data exposure
- **Medium**: Rate limit bypass, information disclosure
- **Low**: Minor issues with limited impact

---

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest (main) | ✅ Yes        |
| Previous releases | ❌ No     |

**Note**: This is a portfolio site with continuous deployment. Only the latest version on `main` branch is supported.

---

## Security Features

### 🛡️ Defense in Depth

#### 1. **Security Headers** (vercel.json)
- ✅ Content-Security-Policy (CSP)
- ✅ HTTP Strict Transport Security (HSTS)
- ✅ X-Frame-Options (SAMEORIGIN)
- ✅ X-Content-Type-Options (nosniff)
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy

**Verify Headers**: Use [securityheaders.com](https://securityheaders.com)

#### 2. **Rate Limiting** (lib/security/rateLimiter.js)
- Token bucket algorithm
- 10 requests per minute per IP
- Applied to all API routes
- **Production Note**: Consider Upstash Redis for distributed rate limiting

#### 3. **PII Protection** (lib/security/sanitize.js)
- HMAC-SHA256 hashing for sensitive data
- No raw emails/IPs in logs
- Automatic redaction of API keys, tokens
- See `hashAndLen()` utility

#### 4. **Dependency Security**
- Regular `npm audit` runs
- Automated vulnerability scanning (Grype)
- SBOM generation (Syft)
- CodeQL static analysis

#### 5. **Environment Variables**
- All secrets stored in Vercel dashboard
- No hardcoded credentials
- `.env` files in `.gitignore`

---

## Secure Development Practices

### Code Review Checklist

Before merging PRs, verify:

- [ ] No secrets in code or git history
- [ ] Input validation on all API routes
- [ ] Rate limiting applied to new endpoints
- [ ] PII hashed before logging
- [ ] CSP headers allow new external resources (if any)
- [ ] Dependencies updated (no known vulnerabilities)
- [ ] Error messages don't leak sensitive information

### Secrets Management

```bash
# ✅ GOOD: Environment variables
const apiKey = process.env.OPENROUTER_API_KEY;

# ❌ BAD: Hardcoded secrets
const apiKey = 'sk_live_abc123...';
```

**Audit Git History**:
```bash
# Check for leaked secrets
git log -S "sk_" --all
git log -S "api_key" --all
```

### Input Validation

All API routes must validate input:

```javascript
function validateInput(data) {
  if (!data.message || typeof data.message !== 'string') {
    throw new Error('Invalid input');
  }
  // Sanitize and validate...
}
```

### Output Encoding

Prevent XSS by encoding user-generated content:

```javascript
// Static site: Use textContent instead of innerHTML
element.textContent = userInput; // Safe

// API responses: Validate and sanitize
res.json({ message: sanitize(userInput) });
```

---

## Threat Model

### Attack Surface

1. **Static Assets**: HTML, CSS, JS files (integrity verified)
2. **API Routes**: `/api/chat`, `/api/contact`, `/api/analytics`
3. **Third-Party Scripts**: Vercel Analytics (CSP-protected)
4. **External Services**: OpenRouter AI (API key rotation)

### Potential Threats

| Threat | Mitigation |
|--------|------------|
| **XSS** | CSP headers, output encoding |
| **CSRF** | SameSite cookies (if used), CORS policies |
| **Rate Limit Bypass** | Token bucket + future Upstash Redis |
| **API Key Exposure** | Environment variables, rotation |
| **Dependency Vulnerabilities** | Automated scanning, regular updates |
| **DDoS** | Vercel's built-in protection + rate limiting |

### Out of Scope

The following are **not security vulnerabilities**:

- SPF/DKIM/DMARC records (email authentication)
- Social engineering attacks
- Brute force attacks (rate limiting mitigates)
- Denial of Service (handled by Vercel infrastructure)
- Physical security
- Issues in third-party services (report to them directly)

---

## Incident Response

### If Security Incident Occurs

1. **Detect**: Monitor logs, alerts, or reports
2. **Contain**: Temporarily disable affected feature
3. **Investigate**: Root cause analysis
4. **Remediate**: Deploy fix via CI/CD
5. **Communicate**: Notify affected users (if applicable)
6. **Post-Mortem**: Document lessons learned

### Emergency Contacts

- **Tech Lead**: [Name/Email]
- **Vercel Support**: support@vercel.com
- **OpenRouter Support**: support@openrouter.ai

---

## Security Tooling

### Static Analysis

- **CodeQL**: Automated code scanning (GitHub Actions)
- **npm audit**: Dependency vulnerability scanning
- **Stylelint**: CSS security issues

### Runtime Protection

- **Rate Limiting**: `lib/security/rateLimiter.js`
- **PII Hashing**: `lib/security/sanitize.js`
- **Security Headers**: `vercel.json`

### Vulnerability Scanning

```bash
# Run security audit
npm audit

# Generate SBOM
syft dir:. -o json

# Scan for vulnerabilities
grype dir:. --fail-on high
```

---

## Compliance

### Standards

- **OWASP Top 10**: Mitigations in place for common vulnerabilities
- **GDPR**: PII protection via hashing, minimal data collection
- **CCPA**: No sale of personal data, opt-out not required (no tracking)

### Privacy

See `PRIVACY.md` for detailed privacy policy.

### Data Retention

- **API Logs**: Retained for 30 days (hashed PII)
- **Analytics**: Aggregate data only (Vercel Analytics)
- **User Data**: No user accounts; chat sessions are ephemeral

---

## Security Updates

**Stay Informed**:
- GitHub Security Advisories (watch this repo)
- npm security bulletins
- Vercel status page

**Update Cadence**:
- **Critical**: Within 24 hours
- **High**: Within 1 week
- **Medium/Low**: Next regular deployment

---

## Acknowledgments

We appreciate responsible disclosure. Security researchers who report valid vulnerabilities will be:

- Acknowledged in release notes (if desired)
- Given credit in this file (with permission)

**Hall of Fame**: [No reports yet]

---

## Resources

- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [Vercel Security Documentation](https://vercel.com/docs/security)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Security Headers Checker](https://securityheaders.com)

---

**Last Updated**: 2025-11-06
**Policy Version**: 1.0
