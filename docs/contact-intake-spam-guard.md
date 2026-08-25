# Contact Intake Spam Guard

Status: retained operational reference; removed from the public portfolio surface on 2026-08-25.

The guarded redirect remains available for private operational use, but public pages are email-first and must not link to this route or explain its security mechanics.

## What changed now

- The homepage no longer shows a direct phone/text call button.
- The homepage and `/contact` no longer link to this route.
- The redirect route sends `X-Robots-Tag: noindex,nofollow` so it is not treated as a page to index.
- Public contact sections do not mention the redirect, challenge, or phone number.
- The contact route now requires a strict challenge handshake (issued token + matching cookie), then applies scored abuse checks (user-agent checks, referrer presence, burst-rate window, and suspicious content patterns), sanitizes outbound message text, and returns a `403` blocked response with anti-bot headers when validation fails.
- The challenge parser accepts both old-second and new-millisecond issued-at values so the route remains compatible with mixed client token formats.
- Successful challenge validation is single-use: each generated challenge token is invalidated after one successful redirect to reduce replay by scrapers.

## Current behavior in code

1. A private caller may render a link through `ProtectedWhatsAppLink`; public pages do not import it.
2. On mount, it generates a random token and timestamp, then stores a browser cookie:
   - `dzt-contact-challenge=<token>.<issuedAt>` (10-minute TTL)
3. The link receives the same value as `?challenge=...` and sends the user to `/contact/whatsapp`.
4. `app/contact/whatsapp/route.ts` validates:
   - challenge exists,
   - cookie exists and matches token,
   - challenge age is within the 10-minute window.
5. If any check fails, the route responds with `403` and includes `X-Contact-Guard` reason metadata for diagnostics.
6. On valid use, the route marks the token as consumed and clears the scoped challenge cookie.

This does not make the number impossible to discover. It reduces passive scraping from static homepage HTML and gives us a server route where stronger checks can be added later.

## Recommended bot path

Use a screened WhatsApp intake bot, not a fully autonomous sales bot.

1. Keep WhatsApp off the public portfolio surface.
2. Use `/contact/whatsapp?intent=...` only for a deliberately authorized private flow.
3. Require a structured first message with project context.
4. Receive incoming WhatsApp Business Platform webhooks through the existing signed route at `/api/whatsapp/webhook`.
5. Forward verified events to n8n.
6. In n8n, label the lead as `real`, `needs-info`, `spam`, or `blocked`.
7. Let the bot ask at most one clarifying question for missing context.
8. Keep all final replies, quotes, payment links, and commitments human-approved.

## Suggested filters

- Implemented: block/reject for missing/invalid challenge + score-based abuse signals (current scoring includes):
  - missing/short user-agent
  - bot-like automation headers
  - missing referrer / cross-site fetch
  - long text
  - short custom messages with insufficient context
  - repeated word pattern typical in spam generators
  - link-heavy/spam-like message patterns
  - burst traffic from the same IP (60s window)
  - challenge mismatch/expiry/missing cookie
- Keep `intent` filtering on `/contact/whatsapp` and reject automation-flood templates.
- Add a cooldown per sender before sending any automated reply.
- Keep a manual blocklist and allowlist.
- Store only the minimum useful lead data and keep deletion handling aligned with the privacy page.

## Brand alignment note

- The public portfolio is the default home for personal contact about employment, collaboration, speaking, referrals, and peer work.
- Commercial services and client intake belong to RazonWorks. A future RazonWorks route from this site must stay secondary and may be added only after its intended destination is implemented and verified.
- Razon Lab is the experimental research arm of RazonWorks, not a general creator-brand navigation target. A specific experiment may appear as curated proof with a link to its canonical artifact.
- Avoid exposing a bare phone link in static HTML. Keep personal contact screened and auditable, and do not silently convert it into commercial intake.

## Better than a public phone button

For spam control, the best order is:

1. WhatsApp CTA with a prefilled project-context message.
2. Email as a backup.
3. Call-back request after context is provided.
4. Direct phone number only in trusted follow-up, not as the first visible CTA.

## Implementation notes

- The repo already verifies Meta webhook signatures with `x-hub-signature-256`.
- Do not add a homepage AI chat widget as the spam filter unless `/api/chat` has rate limiting and abuse controls.
- If calls become a real spam problem, use a separate business line or forwarding number so the personal number is not the public surface.
- Do not auto-send payment links or project commitments from the bot.

## References

- Meta WhatsApp Cloud API docs: https://developers.facebook.com/docs/whatsapp/cloud-api/
- Meta/WhatsApp Node SDK webhook signature note: https://whatsapp.github.io/WhatsApp-Nodejs-SDK/api-reference/types/webhookCallbackFunction/
