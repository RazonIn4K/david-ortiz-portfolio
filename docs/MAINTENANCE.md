# Maintenance notes

Last reviewed: 2026-06-10. This is the operational companion to `docs/PROJECT-STRUCTURE.md` and `docs/BRAND-BOUNDARY.md`. If a statement here conflicts with reality, fix this file in the same PR.

## Working-copy discipline

One checkout, one session at a time. The repo at `~/Git-Projects/david-ortiz-portfolio` is canonical. A linked worktree at `~/Git-Projects/david-ortiz-portfolio-main-sync` (created during the June 2026 overhaul) still holds the `main` branch, which forces other checkouts onto side branches. When you no longer need it, remove it from the canonical checkout on the Mac:

```bash
git worktree remove ~/Git-Projects/david-ortiz-portfolio-main-sync
git worktree prune
```

Until then, work happens on a branch (currently `work`) and lands on `main` via push or PR. Never run two agent sessions against this repo concurrently; the June 10 session lost time to exactly that.

## Secrets and environment

Doppler is the source of truth for env vars (`doppler.yaml`, `scripts/deploy_secrets.sh`); Vercel project env should be set from Doppler, not hand-edited. Vars the code reads today: `OPENROUTER_API_KEY` / `OPENROUTER_MODEL` (assistant), `WHATSAPP_*` and `META_*` (coexistence, gated), `N8N_WEBHOOK_URL` / `N8N_FORWARD_SECRET` (webhook forwarding, unset), `KV_REST_API_URL` / `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (optional shared abuse state), `NEXT_PUBLIC_PERSONAL_SITE_URL` / `NEXT_PUBLIC_BUSINESS_SITE_URL` (fallbacks hardcoded).

## Parked integrations

- **n8n (wanted, not live):** the WhatsApp webhook forwards events only when `N8N_WEBHOOK_URL` + `N8N_FORWARD_SECRET` are set. To go live: stand up the n8n workflow, set both vars via Doppler, then send a signed test event.
- **Meta / WhatsApp coexistence (parked):** token exchange is behind a default-off flag. When registering the webhook with Meta, use the apex URL `https://davidtiz.com/api/whatsapp/webhook`. Never register the `www` host: `proxy.ts` 308-redirects all `www` traffic and Meta will not follow redirects reliably.
- **Shared abuse state (optional):** `lib/abuse-store.ts` falls back to per-instance memory. Provision a Redis/KV store and set the env vars above if replay/burst limits should hold across serverless instances.

## Payments (/pay)

The Stripe links in `data/payment-links.ts` were probed on 2026-06-10 and are **live** (active checkout pages on the "Tomodachi" Stripe account, e.g. the $15 flyer item). `docs/BRAND-BOUNDARY.md` documents `/pay` as a deliberate sub-brand exception. Decision pending from David: keep as-is, or retire. If retiring: deactivate the payment links in the Stripe dashboard first, then remove `app/pay/`, `app/pagar/`, `data/payment-links.ts`, and `scripts/stripe-*.sh` in one PR.

## Branch hygiene

Remote branches with unmerged commits and no open PR, both superseded by what is on `main` (safe to delete on GitHub): `refactor/prune-ecosystem-links` (superseded by the #71 copy-audit decision) and `test/whatsapp-and-chat-coverage` (superseded by the test suite merged via #62-#74). Merged PR head branches can be pruned at any time.

## Verification

CI runs lint + vitest + build on every push/PR; CodeQL and a 6-hour production uptime probe (`.github/workflows/uptime-check.yml`) run on schedules. Locally: `npm test`, `npm run lint`, `npx tsc --noEmit` (clean as of 2026-06-10), `npm run build`. The uptime probe asserts the WhatsApp redirect returns 403 to bare requests; a 200/302/500 there means the contact guard broke.
