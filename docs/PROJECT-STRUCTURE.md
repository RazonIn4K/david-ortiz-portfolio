# Project Structure Map

> Living reference for how this repo actually fits together — entry points, the real
> import graph, and the state of past follow-ups.
> Last verified against `main` after the June 2026 hardening stack (PRs #53–#68) merged.

## What this is

Personal portfolio for David Ortiz — **Next.js 16 (App Router), React 19, Tailwind CSS 4**,
deployed on Vercel, production domain `davidtiz.com`. It is a personal builder/operator
portfolio, **not** an agency or multi-site "ecosystem" router (see `CLAUDE.md` / `AGENTS.md`).

The user-facing front page (`/`) is deliberately small. The rest of the surface area is
secondary routes (contact, portfolio, privacy, demos) and backend integrations
(WhatsApp webhook → n8n, Meta coexistence, AI chat).

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Framer Motion, lucide-react |
| Fonts | Geist Sans / Geist Mono (`next/font`) |
| Analytics | `@vercel/analytics` (only mounted when `VERCEL=1`) |
| Lint | ESLint flat config (`eslint.config.mjs` → `eslint-config-next`) |
| Tests | Vitest (`npm test`), node env, specs co-located as `*.test.ts` |
| CI | GitHub Actions: `ci.yml` (lint → test → build) + `codeql.yml`, on push/PR |
| Secrets | Doppler (`doppler run -- …`), project `david-ortiz-portfolio` |

Notable config: `next.config.mjs` sets `typescript.ignoreBuildErrors: false` (type errors
fail the build) and rewrites `/demo` → `/demo/index.html`.

## Runtime entry points

In the App Router, every `page.tsx` / `route.ts` is independently reachable by URL —
the homepage does not have to import them. Reachable surfaces:

| URL | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — single client component, `dtz-*` styles, mounts the floating AI assistant |
| `/contact` | `app/contact/page.tsx` | Contact hub; renders `ProtectedWhatsAppLink` |
| `/contact/whatsapp` | `app/contact/whatsapp/route.ts` | Screened WhatsApp redirect: HttpOnly cookie/token pairing, single-use (replay → 403), abuse scoring |
| `/contact/whatsapp/challenge` | `.../challenge/route.ts` | Mints the challenge: returns the token + sets the HttpOnly cookie |
| `/portfolio` | `app/portfolio/page.tsx` | Portfolio detail page |
| `/privacy` | `app/privacy/page.tsx` | Static privacy page (a Meta-app precondition) |
| `/demo` (+ `/demo/*.html`) | `public/demo/` via rewrite | Static Spanish local-business demos; linked from the homepage work card; demos link back to the screened WhatsApp path |
| `/admin/whatsapp-coexistence` | `page.tsx` + `launcher.tsx` | Admin-key-gated Meta Embedded Signup launcher (404 without key) |
| `/api/chat` | `app/api/chat/route.ts` | OpenRouter chat — **used by the homepage assistant**. Rate-limited (15/min/IP), payload caps, cheapest-first model chain (`OPENROUTER_MODELS` → `OPENROUTER_MODEL` → `openrouter/free`), canned-keyword fallback |
| `/api/whatsapp/webhook` | `route.ts` | Meta verify handshake + HMAC signature check; forwards to n8n with correlation-id, privacy-safe outcome logging |
| `/api/meta/embedded-signup/*` | `callback/route.ts`, `status/route.ts` | Coexistence flow; server-side token exchange exists but is gated behind `META_EMBEDDED_SIGNUP_ALLOW_TOKEN_EXCHANGE=true` (default off — Meta currently blocks ES for this app) |
| specials | `app/layout.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx` | Framework chrome |

**Edge layer:** `proxy.ts` (Next.js 16 middleware) runs before all routes except static
assets and only canonicalizes the host (`www.davidtiz.com` → `davidtiz.com`, 308).

## Import graph — live modules

No dynamic/lazy imports exist, so static analysis is complete.

### Homepage (`/`) pulls in four local modules
```
app/page.tsx
 ├─ components/icons/brand-icons.tsx        (GithubIcon)
 ├─ components/contact/protected-whatsapp-link.tsx
 ├─ components/ai-assistant.tsx             (floating concierge → POST /api/chat)
 └─ data/content.ts                         (contact, whatsappHref)
```

### Live components / libs (and what keeps them alive)
| Module | Reachable via |
|---|---|
| `components/contact/protected-whatsapp-link.tsx` | `/`, `/contact` — fetches one shared challenge per page load |
| `components/ai-assistant.tsx` | `/` |
| `components/icons/brand-icons.tsx` | `/`, `/contact` |
| `data/content.ts` | everywhere (content + `contact` + `chatConfig`) |
| `lib/site-config.ts` | `/contact`, `/portfolio`, `lib/contact-links` |
| `lib/contact-links.ts` | `/contact` (social/hire/follow links; ecosystem links pruned in #59) |
| `lib/meta-embedded-signup.ts` | Meta callback/status/launcher (HMAC state, admin key, gated token exchange) |
| `lib/abuse-store.ts` | `/contact/whatsapp` + `/api/chat` — rate windows + single-use tokens; REST Redis (Vercel KV/Upstash env vars) when configured, in-memory fallback, fails open |

## History: the June 2026 cleanup + hardening stack (merged)

- **#53** removed dead scaffold: `components/ui-creative/` (10 files), the `/design-system`
  showcase cluster (`ds-*` components + tokens + site-configs), `lib/design-system/animations.ts`,
  and an accidentally committed `dev_server.log`.
- **#54** fixed the `CONTACT_PATH` ReferenceError that 500'd the WhatsApp redirect's happy
  path, and set `ignoreBuildErrors: false`.
- **#55** untracked the stale `verification/` Playwright artifacts (gitignored).
- **#56** added Vitest + the first security specs (Meta signup state HMAC, webhook signatures).
- **#57** restored CI (lint/test/build) + CodeQL; removed the stale `/projects` rewrite.
- **#58** ran middleware on `/api/chat`; pointed `doppler.yaml` at the project config.
- **#59** pruned HighEncode/CSBrainAI/Prompt Defenders ecosystem links from contact surfaces.
- **#60** rate-limited `/api/chat` + env-driven cheapest-first model chain.
- **#61** re-added the AI assistant as a floating homepage concierge.
- **#62** moved challenge issuance server-side (HttpOnly cookie; fixed a multi-link race).
- **#63** privacy-safe n8n forward logging (status/duration/correlation-id only).
- **#64** behavior tests for `/api/chat` guards + the challenge/replay flow.
- **#65** wired `public/demo/` into the site (`/demo` rewrite + homepage card CTA).
- **#66** implemented the Meta coexistence token exchange behind a default-off flag.
- **#67** optional Redis-backed persistence for abuse state (in-memory fallback, fail-open).
- **#68** fixed the case-sensitive SameSite test assertion that briefly broke main CI.

All validated post-merge: CI + CodeQL green; production E2E confirmed the challenge → 302 →
replay-403 flow, `/demo` routes, and a real (non-fallback) `/api/chat` model response.

Direct pushes on 2026-06-10 after the stack: dependency prune (122 packages of v0/shadcn
residue incl. `lib/utils.ts`; package renamed to `david-ortiz-portfolio`; plain
`tsc --noEmit` now clean), the `/pay` funnel retirement (Stripe links deactivated and
account renamed, pages/scripts removed — see `docs/MAINTENANCE.md`), and repo hygiene
(17 merged-PR branches deleted, `-main-sync` worktree removed).

## Open operational notes

1. **Shared abuse state is dormant until Redis exists.** Provision via Vercel Marketplace
   (Upstash) — `KV_REST_API_URL`/`KV_REST_API_TOKEN` appear automatically; no code change.
   Until then, rate/replay state is per-instance in-memory (by design).
2. **Meta Embedded Signup stays parked.** Meta blocks it for this app ("BSPs or TPs" only).
   When unblocked: set `META_EMBEDDED_SIGNUP_ALLOW_TOKEN_EXCHANGE=true`, run the launcher,
   store the returned token as `WHATSAPP_ACCESS_TOKEN`, flip the flag back off. Never click
   takeover/migration wording (see `docs/WHATSAPP_COEXISTENCE_EMBEDDED_SIGNUP_SPEC.md`).
3. **`verification/` stays local-only** (gitignored); the old scripts target the pre-overhaul
   site and would need a rewrite against the current routes if browser e2e is ever wanted.
