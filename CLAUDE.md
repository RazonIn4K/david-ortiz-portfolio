# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Personal portfolio site for David Ortiz, built with Next.js 16 (App Router), React 19, and Tailwind CSS 4 for Vercel. It is a single-page editorial portfolio that presents David as a builder, learner, and documentarian through curated work, a plain-language approach, field notes, and a clear email-first contact path.

It is NOT an "ecosystem router" or an agency site. Do not reframe it around High Encode, RazonWorks, Razon Lab, CSBrainAI, Prompt Defenders, or a multi-site ecosystem. Outside projects may appear only as curated proof. A future RazonWorks business handoff may appear only as a contextual secondary route after its destination is implemented and verified. It must never replace David's personal identity, selected work, or personal contact as the organizing structure.

Portfolio roles are fixed for this overhaul: RazonWorks is the only owner of commercial services and client intake, High Encode Learning owns education, DavidTiz owns personal identity and curated proof, and Razon Lab is the experimental research arm of RazonWorks. The active RazonWorks source boundary is `/Users/davidortiz/Git-Projects/razonworks-studio/docs/repository-boundary.md`; the retired broad-platform governance files are historical evidence, not current product requirements. This repository's local boundary must not contradict the active lean boundary. If the documents conflict, pause public changes and reconcile the lean RazonWorks boundary and local boundary together before implementation.

The repository records the following public target and Vercel project. This documentation-only phase did not reverify provider or hosted state.

**Recorded public target**: `davidtiz.com`
**Recorded Vercel Project**: `david-ortiz-portfolio` (team: razs-projects-29d4f2e6)

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Run production server locally
npm run lint     # Run ESLint
npm test         # Run Vitest suite (route handlers + lib, node env)
npm run test:watch

# With Doppler (secrets)
doppler run -- npm run dev
```

CI (`.github/workflows/ci.yml`) runs lint → test → build on every push/PR; CodeQL runs alongside. `next.config.mjs` has `ignoreBuildErrors: false`, so type errors fail the build.

## Tech Stack
- Framework: Next.js 16 (App Router)
- UI: React 19, Tailwind CSS 4, Framer Motion
- Fonts: Geist Sans & Geist Mono (`next/font`)
- Analytics: Vercel Analytics
- Deployment: Vercel

## Structure

```
app/
  page.tsx          # Home route wrapper and canonical metadata
  layout.tsx        # Root layout, fonts, metadata
  globals.css       # Global styles + dtz-* design system (light/dark themes)
  error.tsx         # Page-level error boundary
  global-error.tsx  # App-level error boundary
  not-found.tsx     # Custom 404
  api/chat/route.ts # Standalone rate-limited guide API; not mounted on the homepage
  api/whatsapp/webhook/      # Meta webhook: verify handshake + HMAC, forwards to n8n
  api/meta/embedded-signup/  # Coexistence callback/status (token exchange behind default-off flag)
  admin/whatsapp-coexistence/ # Admin-key-gated Meta signup launcher
  contact/whatsapp/ # Screened redirect (route.ts) + challenge issuance (challenge/route.ts)
components/
  personal-homepage.tsx # Editorial client homepage implementation (dtz-* classes)
  contact/          # Unlinked operational WhatsApp redirect component
  icons/            # brand-icons (used by homepage + /contact)
data/content.ts     # Public email/GitHub plus the operational redirect number
data/home-content.ts # Typed homepage navigation, actions, and three proof records
lib/                # site-config, contact-links, meta-embedded-signup, abuse-store, utils
public/visuals/     # Decorative hero/OG assets; generated visuals never count as proof
public/portfolio/   # Checked-in website and published-page proof captures
public/demo/        # Static Spanish local-business demos; hub served at /demo via rewrite,
                    # retained outside primary navigation and temporarily noindexed
```

Tests live next to the code as `*.test.ts` (Vitest, node environment; `vitest.config.ts` maps `@/*` and stubs `server-only`).

## Clean Architecture Boundaries

Canonical boundary guidance lives in [`docs/ARCHITECTURE-BOUNDARIES.md`](docs/ARCHITECTURE-BOUNDARIES.md). Read it before refactoring route handlers, contact flows, chat behavior, or shared content/data modules.

Short version: this app is intentionally small, so do not over-abstract; but do not let business/security rules drift further into framework files without characterization tests. The unlinked WhatsApp redirect lane remains operational infrastructure; if it is touched, preserve challenge validation, full challenge value integrity, replay blocking, sanitization, and redirect message behavior.

## Homepage sections (`components/personal-homepage.tsx`)
1. Header: personal mark, Work / Approach / Notes / Contact, light/dark toggle
2. Editorial hero: first-person introduction, decorative generated artwork, and local `#work` / `#notes` actions
3. Selected Work: screenshot-led proof for one website record and two published security writeups
4. Approach: three plain-language personal principles and a compact working-tool list
5. Field Notes: current questions plus the complete published-writeups path
6. Contact: concise email-first invitation with GitHub, LinkedIn, and `/contact`
7. Footer: focused local routes

## Contact protection behavior

This is unlinked operational infrastructure. Public pages must not import the component, link the route, or describe these mechanics.

- `ProtectedWhatsAppLink` fetches one shared challenge per page load from
  `GET /contact/whatsapp/challenge`, which returns the token AND sets a short-lived
  `dzt-contact-challenge` cookie (HttpOnly, SameSite=Lax, scoped to `/contact/whatsapp`).
  The component echoes the token as the `challenge` query param on the outbound link.
- `app/contact/whatsapp/route.ts` validates the cookie/token pairing, age, and single-use
  (replay → 403) before issuing the 302 to `wa.me`.
- The route applies light abuse scoring (user-agent quality, referrer, burst patterns,
  link/spam signals) and returns `403` when blocked.
- Replay/burst state goes through `lib/abuse-store.ts`: shared via REST Redis when
  `KV_REST_API_URL`/`UPSTASH_REDIS_REST_URL` (+ token) are configured, otherwise
  in-memory per instance; Redis errors fail open.

## Standalone guide API (`POST /api/chat`)

- The proof-first homepage does not mount a floating assistant. Do not remount one without a brand-boundary and open-dialog accessibility review.
- The route is rate-limited (15/min/IP via `lib/abuse-store`), caps payloads, and tries a
  cheapest-first model chain: `OPENROUTER_MODELS` (comma-separated) → `OPENROUTER_MODEL` →
  default `openrouter/free`. Missing key or all-models-failed degrades to a canned keyword
  fallback instead of erroring.
- Commercial-intake markers return a personal-site boundary response before any model call.

## Design / Styling
- Uses custom `dtz-*` classes defined in `app/globals.css`. Keep this design language: accessible, personal, light/dark, grounded. Not cyberpunk/agency.
- Theme is stored in `localStorage` under `davidtiz-theme` and also honors `?theme=` and `prefers-color-scheme`.
- Motion is progressive CSS enhancement and must honor `prefers-reduced-motion`. Critical copy and proof remain visible without client-side animation state.
- Generated images may support the editorial mood, but proof cards must use real checked-in site/page captures with truthful alt text and source labels.

## Contact details
- Centralized in `data/content.ts` → `contact` (operational whatsappNumber, public email, public github).
- Email and GitHub are public. The phone number supports an unlinked operational route; never render it or its mechanics on public pages and never move it into `.env`.

## Constraints for future edits
- Brand boundary: this site never becomes an ecosystem router. Rules + allowed-link test live in `docs/BRAND-BOUNDARY.md`.
- Personal contact remains the route for employment, collaboration, speaking, referrals, and peer contact. Do not replace it with a commercial intake flow.
- Public contact surfaces are email-first. Do not surface WhatsApp, a phone number, challenge mechanics, replay controls, or anti-abuse implementation language on the homepage, `/contact`, or `/privacy`.
- Commercial services and client intake belong to RazonWorks. Any future RazonWorks link here must stay secondary and contextual.
- No business destination is rendered or configured by the current personal-proof source. Add one only after the exact RazonWorks destination and its hosted behavior are verified.
- `/demo` remains reachable source and is not migrated or retired. It is excluded from the sitemap and receives a temporary `noindex, nofollow` response header.
- High Encode Learning owns teaching and learner support. Razon Lab owns reproducible experiment artifacts as the experimental arm of RazonWorks.
- Operational state (working-copy rule, parked integrations, retired /pay funnel, env source of truth): `docs/MAINTENANCE.md`.
- Do not touch secrets (`.env.local`, `.env.production`, Doppler).
- Do not invent clients, testimonials, revenue, certifications, job titles, or years of experience.
- Keep tone plain and honest; avoid agency-brochure language.

## Path Aliases
TypeScript `baseUrl: "."` with `@/*` mapping to root, e.g. `import { contact } from "@/data/content"`.

## Deployment
```bash
vercel --prod
```
Auto-deploys from the connected branch via Vercel's GitHub integration.
