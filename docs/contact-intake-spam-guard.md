# Contact Intake Spam Guard

This is the recommended path for protecting David's public phone number while keeping the site easy to contact.

## What changed now

- The homepage no longer shows a direct call/text phone button.
- The homepage WhatsApp CTA now points to `/contact/whatsapp`, a local redirect route that adds the real `wa.me` number server-side.
- The redirect route sends `X-Robots-Tag: noindex,nofollow` so it is not treated as a page to index.
- The contact section now explains the screened-contact approach instead of presenting the phone number as an open public target.
- The contact route now requires a strict challenge handshake (issued token + matching cookie), then applies scored abuse checks (user-agent checks, referrer presence, burst-rate window, and suspicious content patterns), sanitizes outbound message text, and returns a `403` blocked response with anti-bot headers when validation fails.
- The challenge parser accepts both old-second and new-millisecond issued-at values so the route remains compatible with mixed client token formats.

## Current behavior in code

1. Public link is rendered through `ProtectedWhatsAppLink`.
2. On mount, it generates a random token and timestamp, then stores a browser cookie:
   - `dzt-contact-challenge=<token>.<issuedAt>` (10-minute TTL)
3. The link receives the same value as `?challenge=...` and sends the user to `/contact/whatsapp`.
4. `app/contact/whatsapp/route.ts` validates:
   - challenge exists,
   - cookie exists and matches token,
   - challenge age is within the 10-minute window.
5. If any check fails, the route responds with `403` and includes `X-Contact-Guard` reason metadata for diagnostics.

This does not make the number impossible to discover. It reduces passive scraping from static homepage HTML and gives us a server route where stronger checks can be added later.

## Recommended bot path

Use a screened WhatsApp intake bot, not a fully autonomous sales bot.

1. Keep WhatsApp as the first public contact path.
2. Route public clicks through `/contact/whatsapp?intent=...` so the number is never exposed as a static `tel:`/`wa.me` URL.
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

- The public portfolio is the default contact home; use a separate creator brand layer (`Razon Live Lab`, `@razonlab`, `razonlab.com`) only as an optional navigation target, not as the replacement for this site.
- Avoid exposing a bare phone link in static HTML while keeping the business path screened and auditable.

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
