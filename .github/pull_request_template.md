# Pull Request

## Description

<!-- Provide a concise description of the changes in this PR -->

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Security patch
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)

## Motivation and Context

<!-- Why is this change required? What problem does it solve? -->
<!-- If it fixes an open issue, please link to the issue here -->

Fixes #(issue)

## Changes Made

<!-- List the specific changes made in this PR -->

-
-
-

## Security Checklist

- [ ] No secrets or API keys in code or git history
- [ ] Input validation added for new API routes
- [ ] Rate limiting applied to new endpoints (if applicable)
- [ ] PII is hashed before logging (using `lib/security/sanitize.js`)
- [ ] CSP headers updated for new external resources (if applicable)
- [ ] Dependencies updated (no known vulnerabilities)
- [ ] Error messages don't leak sensitive information

## Testing

### Test Coverage

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

### Manual Test Steps

<!-- Describe the steps to manually test this PR -->

1.
2.
3.

### Test Results

<!-- Paste relevant test outputs or screenshots -->

```
# Test command output
```

## Privacy & Analytics

- [ ] No new L5 tools added (max 1 allowed - see `docs/Tool-Analytics.md`)
- [ ] Privacy policy updated if data collection changed
- [ ] Analytics tracking is privacy-safe (no PII)

## Documentation

- [ ] Code comments added/updated
- [ ] README updated (if applicable)
- [ ] Security policy updated (if applicable)
- [ ] Privacy policy updated (if applicable)
- [ ] API documentation updated (if applicable)

## Performance Impact

<!-- Describe any performance implications -->

- [ ] Performance tested (Lighthouse score maintained ≥90)
- [ ] Bundle size impact: **+/- X KB**
- [ ] No performance regression

## Accessibility

- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (if applicable)
- [ ] Color contrast verified

## Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

## Deployment Notes

<!-- Any special deployment considerations? -->

- [ ] Environment variables updated in Vercel dashboard
- [ ] Database migrations (N/A for static site)
- [ ] Rollback plan documented (if high-risk change)

## Go-Live Gate Checklist (for production PRs)

<!-- Reference: docs/Go-Live-Gate.md -->

- [ ] CI pipeline passing (lint, test, Syft/Grype, CodeQL)
- [ ] Security headers verified
- [ ] Rate limiting tested
- [ ] PII hashing verified in logs
- [ ] Privacy policy reviewed
- [ ] Manual QA completed
- [ ] Preview deployment tested on Vercel

## Screenshots / Recordings

<!-- Add screenshots or recordings if UI changes are involved -->

**Before**:


**After**:


## Additional Notes

<!-- Any additional information reviewers should know -->

---

## Reviewer Checklist

<!-- For reviewers: Verify the following -->

- [ ] Code quality and readability
- [ ] Security best practices followed
- [ ] No PII logged without hashing
- [ ] Tests pass and cover new code
- [ ] Documentation is clear and complete
- [ ] Performance impact is acceptable
- [ ] Accessibility standards met
- [ ] No new dependencies without justification

---

**By submitting this PR, I confirm that:**
- [ ] I have read the `SECURITY.md` and `PRIVACY.md` policies
- [ ] I have followed the secure development practices
- [ ] I have not committed secrets or sensitive data
- [ ] I understand the L5 tool limit (max 1 analytics tool)
