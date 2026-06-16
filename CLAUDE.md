# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Personal portfolio site for David Ortiz, built with Next.js 16 (App Router), React 19, and Tailwind CSS 4, deployed on Vercel. It is a single-page site that presents David as a builder/operator: selected work, how he works, his stack, current learning notes, and a clear contact path.

It is NOT an "ecosystem router" or an agency site. Do not reframe it around HighEncode, CSBrainAI, Prompt Defenders, or a multi-site ecosystem. Outside projects may appear only as ordinary portfolio examples, never as the organizing structure.

**Production**: `davidtiz.com`
**Vercel Project**: `david-ortiz-portfolio` (team: razs-projects-29d4f2e6)

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
  page.tsx          # Home — single-page personal portfolio (client component, dtz-* classes)
  layout.tsx        # Root layout, fonts, metadata
  globals.css       # Global styles + dtz-* design system (light/dark themes)
  error.tsx         # Page-level error boundary
  global-error.tsx  # App-level error boundary
  not-found.tsx     # Custom 404
  api/chat/route.ts # AI chat endpoint — used by the homepage floating assistant
  api/whatsapp/webhook/      # Meta webhook: verify handshake + HMAC, forwards to n8n
  api/meta/embedded-signup/  # Coexistence callback/status (token exchange behind default-off flag)
  admin/whatsapp-coexistence/ # Admin-key-gated Meta signup launcher
  contact/whatsapp/ # Screened redirect (route.ts) + challenge issuance (challenge/route.ts)
components/
  ai-assistant.tsx  # Floating chat concierge on the homepage (calls /api/chat)
  contact/          # ProtectedWhatsAppLink — screened WhatsApp redirect (used by homepage + /contact)
  icons/            # brand-icons (used by homepage + /contact)
data/content.ts     # Shared content + centralized contact (`contact`, `whatsappHref`)
lib/                # site-config, contact-links, meta-embedded-signup, abuse-store, utils
public/visuals/     # Hero/workbench images and SVGs
public/demo/        # Static Spanish local-business demos; hub served at /demo via rewrite,
                    # linked from the homepage work card
```

Tests live next to the code as `*.test.ts` (Vitest, node environment; `vitest.config.ts` maps `@/*` and stubs `server-only`).

## Clean Architecture Boundaries

Canonical boundary guidance lives in [`docs/ARCHITECTURE-BOUNDARIES.md`](docs/ARCHITECTURE-BOUNDARIES.md). Read it before refactoring route handlers, contact flows, chat behavior, or shared content/data modules.

Short version: this app is intentionally small, so do not over-abstract; but do not let business/security rules drift further into framework files without characterization tests. For the WhatsApp redirect lane, preserve challenge validation, full challenge value integrity, replay blocking, sanitization, and redirect message behavior.

## Homepage sections (`app/page.tsx`)
1. Header — brand, nav (Start / Work / About / Notes / Contact), light/dark toggle
2. Hero — positioning + CTAs (See selected work, Message me on WhatsApp)
3. Selected Work — category cards (local business sites, AI workflow, RAG, automation, prompt safety)
4. About / Operating Style — how David works
5. Stack — tools he reaches for
6. Notes / Current Focus — what he's working on now
7. Contact — WhatsApp-first (screened redirect), email, and GitHub
8. Footer — WhatsApp · Email · GitHub

## Contact protection behavior

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

## AI assistant (`components/ai-assistant.tsx` → `POST /api/chat`)

- Floating concierge on the homepage; sends `{ messages }`, renders `{ message, fallback }`,
  handles `429` (rate limit) gracefully.
- The route is rate-limited (15/min/IP via `lib/abuse-store`), caps payloads, and tries a
  cheapest-first model chain: `OPENROUTER_MODELS` (comma-separated) → `OPENROUTER_MODEL` →
  default `openrouter/free`. Missing key or all-models-failed degrades to a canned keyword
  fallback instead of erroring.

## Design / Styling
- Uses custom `dtz-*` classes defined in `app/globals.css`. Keep this design language: accessible, personal, light/dark, grounded. Not cyberpunk/agency.
- Theme is stored in `localStorage` under `davidtiz-theme` and also honors `?theme=` and `prefers-color-scheme`.

## Contact details
- Centralized in `data/content.ts` → `contact` (whatsappNumber, email, github) and `whatsappHref`.
- These are public business details, NOT secrets. Never move them into `.env`.

## Constraints for future edits
- Brand boundary: this site never becomes an ecosystem router. Rules + allowed-link test live in `docs/BRAND-BOUNDARY.md`.
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
