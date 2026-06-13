# Maintenance notes

Last reviewed: 2026-06-10. This is the operational companion to `docs/PROJECT-STRUCTURE.md` and `docs/BRAND-BOUNDARY.md`. If a statement here conflicts with reality, fix this file in the same PR.

## Working-copy discipline

One checkout, one session at a time. The repo at `~/Git-Projects/david-ortiz-portfolio` is canonical and sits on `main`. The `-main-sync` worktree from the June 2026 overhaul was removed on 2026-06-10; do not create parallel worktrees or run two agent sessions against this repo concurrently. The June 10 session lost time to exactly that.

## Secrets and environment

Doppler is the source of truth for env vars (`doppler.yaml`, `scripts/deploy_secrets.sh`); Vercel project env should be set from Doppler, not hand-edited. Vars the code reads today: `OPENROUTER_API_KEY` / `OPENROUTER_MODEL` (assistant), `WHATSAPP_*` and `META_*` (coexistence, gated), `N8N_WEBHOOK_URL` / `N8N_FORWARD_SECRET` (webhook forwarding, unset), `KV_REST_API_URL` / `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (optional shared abuse state), `NEXT_PUBLIC_PERSONAL_SITE_URL` / `NEXT_PUBLIC_BUSINESS_SITE_URL` (fallbacks hardcoded).

## Parked integrations

- **n8n (wanted, not live):** the WhatsApp webhook forwards events only when `N8N_WEBHOOK_URL` + `N8N_FORWARD_SECRET` are set. To go live: stand up the n8n workflow, set both vars via Doppler, then send a signed test event.
- **Meta / WhatsApp coexistence (parked):** token exchange is behind a default-off flag. When registering the webhook with Meta, use the apex URL `https://davidtiz.com/api/whatsapp/webhook`. Never register the `www` host: `proxy.ts` 308-redirects all `www` traffic and Meta will not follow redirects reliably.
- **Shared abuse state (optional):** `lib/abuse-store.ts` falls back to per-instance memory. Provision a Redis/KV store and set the env vars above if replay/burst limits should hold across serverless instances.

## Payments (retired 2026-06-10)

David retired the `/pay` funnel on 2026-06-10: `app/pay/`, `app/pagar/`, `data/payment-links.ts`, and `scripts/stripe-*.sh` removed; `docs/stripe/` moved to `docs/archive/stripe/`; robots/tests/docs updated. The seven Stripe payment links were deactivated in the dashboard and verified inactive via the Stripe API on account `acct_1RTxsnP5UmVB5UbV`; the public business name was set to "David Ortiz" and the card statement descriptor changed from `TOMODACHI.PW` to `DAVID ORTIZ` (note: the CLI's `stripe login` restricted key cannot write payment links or account settings, so dashboard + API verification is the working pattern). Deactivated link IDs, should they ever need reactivating: `plink_1TeryXP5UmVB5UbVMgvYmQe8` (Flyer $15), `plink_1TerzDP5UmVB5UbVdGCnDQMa` (WhatsApp Setup $40), `plink_1TerzqP5UmVB5UbVPQML6aFC` (Order Page $60), `plink_1Tes0RP5UmVB5UbV6NubpvDK` (Combo $150), `plink_1Tes0xP5UmVB5UbVyiNJa3cm` (Website + Google $300), `plink_1Tes1WP5UmVB5UbV62mQmczp` (Maintenance $50/mo), `plink_1Tes29P5UmVB5UbVuTnlRhGW` (Deposit $100).

## Branch hygiene

Cleaned 2026-06-10: all 17 stale remote branches deleted after verifying each mapped to a merged PR (#52-#68; "unmerged commit" counts were squash-merge artifacts). Standing rule: delete the head branch when a PR merges, and keep `origin/main` as the only long-lived branch.

## Verification

GitHub Actions CI runs lint + vitest + build on every push/PR; CodeQL and a 6-hour production uptime probe (`.github/workflows/uptime-check.yml`) run on schedules. Locally: `npm test`, `npm run lint`, `npx tsc --noEmit` (clean as of 2026-06-10), `npm run build`. The uptime probe asserts the WhatsApp redirect returns 403 to bare requests; a 200/302/500 there means the contact guard broke.

Additionally, GitLab CI/CD automatically runs Ultimate security scans (SAST, Secret Detection, Dependency Scanning) on any commit pushed to the `gitlab` remote's `main` branch. A manual DAST scan is also available in the GitLab pipeline dashboard, targeting the main-branch staging/preview URL. For details, see [docs/GITLAB-CI.md](file:///Users/davidortiz/Git-Projects/david-ortiz-portfolio/docs/GITLAB-CI.md).

