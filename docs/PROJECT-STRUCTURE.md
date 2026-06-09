# Project Structure Map

> Living reference for how this repo actually fits together — entry points, the real
> import graph (what loads vs. what is dead), and prioritized follow-ups.
> Last verified against `main` after the Next.js 16 / `davidtiz.com` overhaul.

## What this is

Personal portfolio for David Ortiz — **Next.js 16 (App Router), React 19, Tailwind CSS 4**,
deployed on Vercel, production domain `davidtiz.com`. It is a personal builder/operator
portfolio, **not** an agency or multi-site "ecosystem" router (see `CLAUDE.md` / `AGENTS.md`).

The user-facing front page (`/`) is deliberately small. Most of the surface area is either
secondary routes (contact, pay, portfolio, privacy), backend integrations
(WhatsApp/Meta/chat), or scaffold that is reachable only from a dev showcase route.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, Framer Motion, lucide-react |
| Fonts | Geist Sans / Geist Mono (`next/font`) |
| Analytics | `@vercel/analytics` (only mounted when `VERCEL=1`) |
| Lint | ESLint flat config (`eslint.config.mjs` → `eslint-config-next`) |
| Secrets | Doppler (`doppler run -- …`) |

Notable config: `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and
`images.unoptimized: true`. The first one means **type errors (including undefined
references) do not fail the build** — see follow-up #1.

## Runtime entry points

In the App Router, every `page.tsx` / `route.ts` is independently reachable by URL —
the homepage does not have to import them. Reachable surfaces:

| URL | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | The real homepage — single client component, `dtz-*` styles |
| `/contact` | `app/contact/page.tsx` | Contact hub; renders `ProtectedWhatsAppLink` |
| `/contact/whatsapp` | `app/contact/whatsapp/route.ts` | Screened WhatsApp redirect (cookie/token + abuse scoring) |
| `/portfolio` | `app/portfolio/page.tsx` | Portfolio detail page |
| `/privacy` | `app/privacy/page.tsx` | Static privacy page |
| `/pay`, `/pagar` | `app/pay/page.tsx`, `app/pagar/page.tsx` | Stripe payment-link menu (Spanish) |
| `/design-system` | `app/design-system/page.tsx` | **Dev showcase** of `ds-*` components |
| `/admin/whatsapp-coexistence` | `app/admin/whatsapp-coexistence/page.tsx` + `launcher.tsx` | Admin tool |
| `/api/chat` | `app/api/chat/route.ts` | OpenRouter chat w/ keyword fallback; **not used by homepage** |
| `/api/whatsapp/webhook` | `app/api/whatsapp/webhook/route.ts` | Meta webhook verify + HMAC + forward to n8n |
| `/api/meta/embedded-signup/*` | `callback/route.ts`, `status/route.ts` | Meta embedded-signup flow |
| specials | `app/layout.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx` | Framework chrome |

## Import graph — live vs. dormant

Verified by static import analysis; there are **no** dynamic/lazy imports
(`dynamic()` / `import()` / `require()`) anywhere, so this graph is complete.

### Homepage (`/`) pulls in only three local modules
```
app/page.tsx
 ├─ components/icons/brand-icons.tsx        (GithubIcon)
 ├─ components/contact/protected-whatsapp-link.tsx
 └─ data/content.ts                         (contact, whatsappHref)
```

### Live components / libs (and what keeps them alive)
| Module | Reachable via |
|---|---|
| `components/contact/protected-whatsapp-link.tsx` | `/`, `/contact`, `/pay` |
| `components/icons/brand-icons.tsx` | `/`, `/contact` |
| `data/content.ts` | everywhere |
| `data/payment-links.ts` | `/pay` |
| `lib/site-config.ts` | `/contact`, `/portfolio`, `lib/contact-links` |
| `lib/contact-links.ts` | `/contact` |
| `lib/meta-embedded-signup.ts` | `/api/meta/embedded-signup/callback` |
| `components/design-system/ds-*` (6), `lib/design-system/tokens.ts`, `lib/design-system/site-configs.ts`, `lib/utils.ts` | **only** `/design-system` showcase |

### 🟡 Live but isolated to the `/design-system` showcase
The `ds-*` cluster (`ds-button/card/badge/input/ecosystem-nav/icon-set`) plus
`tokens.ts` and `site-configs.ts` are reachable *only* through the `/design-system`
dev page. `ds-ecosystem-nav` / `site-configs` encode a multi-site "ecosystem" concept
that the project docs explicitly say is **not** the site's framing. If `/design-system`
is removed, this whole cluster becomes dead.

## Cleanup performed (branch `chore/remove-dead-scaffold`)

Removed code that is imported by nothing reachable:

- `components/ui-creative/` — entire directory (10 files: `ai-assistant`, `terminal-hero`,
  `holographic-card`, `orbit-visualization`, `hex-grid-bg`, `floating-dock`,
  `floating-contact`, `animated-stats`, `service-grid`, `ecosystem-links`). Nothing in the
  app imports any of them; they only import outward. Confirmed by repo-wide grep (only
  doc references existed, now updated).
- `lib/design-system/animations.ts` — zero importers.
- `dev_server.log` — an accidentally committed runtime log; added `*.log` + `dev_server.log`
  to `.gitignore`.

Docs updated to match: `CLAUDE.md`, `AGENTS.md` (removed stale `ui-creative/` references).

## Prioritized follow-ups (not in the cleanup PR)

1. **🔴 Bug: `/contact/whatsapp` 500s on the happy path.**
   `app/contact/whatsapp/route.ts:242` references `CONTACT_PATH`, which is **never
   defined** in the repo. On a valid (non-blocked) redirect, `markChallengeCookieConsumed`
   throws `ReferenceError`; the `GET` handler has no try/catch, so it returns HTTP 500 —
   breaking the one genuinely live contact feature. Hidden by `ignoreBuildErrors: true`.
   Likely intended value: `"/contact/whatsapp"` (the cookie's scoped path). Fix in a
   dedicated PR with a manual happy-path check.
2. **Decide the fate of `/design-system` + the `ds-*` cluster.** If the showcase is not
   meant to ship, removing the route lets the whole cluster (6 components + tokens +
   site-configs) be deleted too. If it ships, keep it but note it contradicts the
   "not an ecosystem" framing.
3. **`verification/` (17 tracked artifacts: PNG screenshots + `.py` scripts).** Decide
   whether these belong in the repo or should move to CI artifacts / be gitignored.
4. **Reconsider `typescript.ignoreBuildErrors: true`.** It hid follow-up #1. Turning it
   off (or running `tsc --noEmit` in CI) would catch undefined references before deploy.
5. **Minor doc drift.** `AGENTS.md` lists `contact` as having a `phone` field; the actual
   `data/content.ts` `contact` is `{ whatsappNumber, email, github }` (no `phone`).
