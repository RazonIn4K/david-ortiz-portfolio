# Architecture

This repository's system map is an [Archify](https://tt-a1i.github.io/archify/) specification.

- Spec: `docs/archify/davidtiz-architecture.json`
- Type: architecture (showcase)
- Captured: 2026-08-27

## Summary

davidtiz.com is a personal proof site running on Next.js App Router via Vercel CDN. Public pages (/, /contact, /portfolio, /writeups, /privacy) are indexed, while POST /api/chat remains available but unmounted on the homepage. A gated WhatsApp lane issues challenge tokens with HttpOnly cookies and validates them before redirecting to wa.me. External APIs include OpenRouter (rate-limited 15/min/IP via Upstash or memory), Meta HMAC webhooks forwarded to n8n, and admin-gated Embedded Signup.

## Regenerate the interactive HTML

Do not commit the generated HTML (~700KB).

```bash
npx -y skills add tt-a1i/archify --skill archify --agent cursor --global --copy --yes
# then, from the Archify package:
node bin/archify.mjs deliver architecture docs/archify/davidtiz-architecture.json /tmp/davidtiz.html --quality showcase
```
