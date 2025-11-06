# Go-Live Gate Checklist

Pre-deployment checklist for production readiness. **All items must be ✅ before deploying to production.**

## 🔒 Security

- [ ] **Security Headers**: Verify all headers in `vercel.json` are active
  - [ ] Content-Security-Policy configured
  - [ ] HSTS with preload enabled
  - [ ] X-Frame-Options set to SAMEORIGIN
  - [ ] X-Content-Type-Options set to nosniff
- [ ] **Rate Limiting**: All API routes implement rate limiting (10 req/min/IP)
- [ ] **Environment Variables**: All secrets stored in Vercel dashboard (not in code)
  - [ ] `OPENROUTER_API_KEY` set
  - [ ] `PRIVACY_HASH_SALT` set (generate with `openssl rand -base64 32`)
- [ ] **PII Protection**: No raw PII logged (emails, IPs hashed via `lib/security/sanitize.js`)
- [ ] **Dependency Audit**: Run `npm audit` and resolve high/critical vulnerabilities
- [ ] **SBOM Generated**: CI generates Software Bill of Materials (Syft)
- [ ] **Vulnerability Scan**: Grype scan passes (no high/critical vulnerabilities)

## 🔐 Privacy

- [ ] **Privacy Policy**: `PRIVACY.md` reviewed and published
- [ ] **Data Collection**: Only essential data collected (see `Tool-Analytics.md`)
- [ ] **Analytics**: Max 1 L5 tool enabled (currently: Vercel Analytics)
- [ ] **Cookie Consent**: Not required (no cookies used)
- [ ] **PII Hashing**: All logs use `hashAndLen()` for sensitive data

## 🧪 Testing

- [ ] **Linting**: `npm run lint` passes
- [ ] **Build**: `npm run build` succeeds without errors
- [ ] **Manual QA**: Test all interactive features
  - [ ] Contact form submission
  - [ ] AI chat functionality
  - [ ] Project page navigation
  - [ ] Mobile responsiveness
- [ ] **Performance**: Lighthouse score ≥90 for all categories
- [ ] **Accessibility**: No critical WCAG violations

## 📊 Monitoring

- [ ] **Error Tracking**: NOT using Sentry/Datadog per policy
- [ ] **Analytics**: Vercel Analytics configured (privacy-safe)
- [ ] **Uptime**: Monitor via Vercel dashboard
- [ ] **Rate Limit Logs**: Review API logs for rate limit triggers

## 🚀 Deployment

- [ ] **Branch**: Deploying from `main` branch
- [ ] **Preview Deploy**: Test in Vercel preview environment first
- [ ] **DNS**: Domain configured correctly (cs-learning.me)
- [ ] **SSL**: HTTPS enabled and forced
- [ ] **Service Worker**: Updated with new assets (if applicable)
- [ ] **Sitemap**: `sitemap.xml` updated with new routes

## 📝 Documentation

- [ ] **README**: Operating Policies section present
- [ ] **SECURITY.md**: Security policy published
- [ ] **PRIVACY.md**: Privacy policy published
- [ ] **Tool-Analytics.md**: L5 tool usage documented
- [ ] **API Documentation**: `/api` routes documented (if public)

## ✅ Final Checks

- [ ] **CI Pipeline**: All GitHub Actions workflows passing
  - [ ] CodeQL analysis complete (no critical findings)
  - [ ] Syft/Grype scan passing
  - [ ] Linting and type checking passing
- [ ] **Secrets Audit**: No secrets in git history (use `git log -S "sk_" --all`)
- [ ] **Rollback Plan**: Previous deployment tagged for quick rollback
- [ ] **Team Notification**: Stakeholders informed of deployment window

---

## Emergency Rollback

If critical issues arise post-deployment:

```bash
# Revert to previous deployment via Vercel dashboard
# OR re-deploy previous commit
git revert HEAD
git push origin main
```

**Post-Rollback**: Document incident, root cause, and prevention strategy.

---

## Approval

- [ ] **Security Review**: Approved by [Name/Date]
- [ ] **Privacy Review**: Approved by [Name/Date]
- [ ] **Tech Lead**: Approved by [Name/Date]

**Date**: ________________
**Deployed By**: ________________
**Deployment ID**: ________________
