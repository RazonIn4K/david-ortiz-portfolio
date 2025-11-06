# Analytics & Monitoring Tools Policy

## Tool Classification: L5 Tools

**L5 Tools** are third-party services that process user data, requiring careful privacy consideration.

### Current L5 Tools in Use

| Tool | Purpose | L5 Status | Data Collected | Justification |
|------|---------|-----------|----------------|---------------|
| **Vercel Analytics** | Page views, performance metrics | ✅ Active | Anonymous page views, Web Vitals | Privacy-safe, no PII, essential for performance monitoring |

**Total L5 Tools**: 1 / 1 (MAX LIMIT REACHED)

---

## Policy: Maximum 1 L5 Tool

**Rationale**: Minimize external data processing to protect user privacy and reduce attack surface.

### Why This Limit?

1. **Privacy by Design**: Each additional tool increases privacy risk
2. **Data Minimization**: GDPR/CCPA principle of collecting only necessary data
3. **Security Surface**: Fewer third-party dependencies = reduced risk
4. **Performance**: Third-party scripts impact page load time
5. **Compliance**: Easier to audit and document data flows

---

## Prohibited L5 Tools

The following tools are **explicitly prohibited** for this project:

### ❌ Error Tracking
- **Sentry**: Full error tracking with stack traces (excessive data collection)
- **Rollbar**: Similar to Sentry
- **Datadog**: Full observability platform (overkill for static site)

**Alternative**: Server-side logging with PII redaction (see `lib/security/sanitize.js`)

### ❌ User Session Recording
- **FullStory**: Records user sessions (privacy violation)
- **Hotjar**: Heatmaps and session recordings
- **LogRocket**: Session replay

**Alternative**: Use Vercel Analytics for aggregate metrics only

### ❌ Heavy Analytics Platforms
- **Google Analytics 4**: Privacy concerns, script bloat
- **Mixpanel**: User tracking (overkill for portfolio)
- **Amplitude**: Similar to Mixpanel

**Alternative**: Vercel Analytics provides sufficient insights

---

## Adding a New L5 Tool

**CURRENT STATUS**: ⛔ **BLOCKED** - Maximum limit (1) reached

To add a new L5 tool, you must:

1. **Remove Existing Tool**: Uninstall Vercel Analytics first
2. **Privacy Impact Assessment**: Document data collection practices
3. **Security Review**: Evaluate CSP requirements, script integrity
4. **Alternatives Analysis**: Prove no privacy-safe alternative exists
5. **Team Approval**: Get sign-off from tech lead and privacy officer
6. **Update Documentation**: Update this file and `PRIVACY.md`

### Evaluation Checklist

- [ ] Tool is essential (not nice-to-have)
- [ ] No first-party alternative exists
- [ ] Privacy policy reviewed and acceptable
- [ ] GDPR/CCPA compliant
- [ ] Script loading is async (non-blocking)
- [ ] CSP headers updated to allow tool
- [ ] Tool has SLA/reliability guarantees

---

## First-Party Alternatives

**Preferred approach**: Build privacy-safe analytics without third-party tools.

### Lightweight Options

1. **Server-Side Logging**: Log API requests with hashed IPs
2. **Vercel Analytics**: Already in use (privacy-safe)
3. **Cloudflare Analytics**: Server-side, privacy-preserving (if using Cloudflare)
4. **Self-Hosted**: Plausible, Umami (privacy-focused, self-hosted)

### What We DON'T Need

- User tracking across sessions
- Individual user identification
- Behavioral analysis
- Conversion funnels
- Heatmaps/session replay

**Why**: This is a portfolio site, not a SaaS product. Aggregate metrics are sufficient.

---

## Data Collection Principles

### ✅ Allowed

- **Aggregate metrics**: Total page views, bounce rate
- **Performance data**: Web Vitals, LCP, FID, CLS
- **Referrer data**: Where traffic originates (aggregate)
- **Device/browser stats**: For compatibility testing

### ❌ Not Allowed

- **PII**: Names, emails, IP addresses (unless hashed)
- **User tracking**: Cross-session tracking, fingerprinting
- **Behavioral data**: Click paths, form inputs
- **Location data**: GPS, precise geolocation
- **Personal content**: User-generated content from chat

---

## Monitoring Without L5 Tools

### Vercel Dashboard (Built-in)
- Deployment status
- Build logs
- Function execution logs
- Bandwidth usage

### Browser DevTools
- Client-side errors (during development)
- Performance profiling
- Network waterfall

### API Logging (First-Party)
- Request rate limiting triggers
- Error rates by endpoint
- Response times

**Code Example**:
```javascript
// Privacy-safe API logging
import { createPrivacySafeLog } from '../lib/security/sanitize.js';

console.log('API Request:', createPrivacySafeLog({
  endpoint: '/api/chat',
  method: 'POST',
  ip: req.headers['x-forwarded-for'],
  responseTime: 123,
  status: 200
}, ['ip']));
```

---

## Quarterly Review

**Review Date**: [Quarterly]
**Next Review**: [Q2 2025]

### Review Questions

1. Is Vercel Analytics still necessary?
2. Are we getting value from the current tool?
3. Can we reduce data collection further?
4. Are there privacy-safe alternatives available?

**Action Items**: Document decisions and update this file.

---

## Contact

**Questions about analytics policy?**
- Tech Lead: [Name]
- Privacy Officer: [Name]
- Security Contact: See `SECURITY.md`
