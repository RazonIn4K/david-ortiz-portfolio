# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Project Overview

Personal portfolio site for David Ortiz, built with Next.js 16 (App Router), React 19, and Tailwind CSS 4 for Vercel. It is a single-page site that presents David as a builder/operator: curated proof, how he works, his stack, personal operating notes, and a clear personal contact path.

It is NOT an "ecosystem router" or an agency site. Do not reframe it around High Encode, RazonWorks, Razon Lab, CSBrainAI, Prompt Defenders, or a multi-site ecosystem. Outside projects may appear only as curated proof. A future RazonWorks business handoff may appear only as a contextual secondary route after its destination is implemented and verified. It must never replace David's personal identity, selected work, or personal contact as the organizing structure.

Portfolio roles are fixed for this overhaul: RazonWorks is the only owner of commercial services and client intake, High Encode Learning owns education, DavidTiz owns personal identity and curated proof, and Razon Lab is the experimental research arm of RazonWorks. The canonical portfolio decision and contract live in the RazonWorks repository at `docs/adr/0039-portfolio-brand-and-content-ownership.md`, `docs/brand/portfolio-charter.md`, and `docs/brand/content-ownership-ledger.md`. This repository's local boundary must not contradict them. If the documents conflict, pause public changes and reconcile the canonical decision and local boundary together before implementation.

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
  personal-homepage.tsx # Client homepage implementation (dtz-* classes)
  contact/          # ProtectedWhatsAppLink — screened WhatsApp redirect (used by homepage + /contact)
  icons/            # brand-icons (used by homepage + /contact)
data/content.ts     # Centralized personal contact (`contact`, `whatsappHref`)
data/home-content.ts # Typed homepage navigation, actions, and three proof records
lib/                # site-config, contact-links, meta-embedded-signup, abuse-store, utils
public/visuals/     # Hero/workbench images and SVGs
public/demo/        # Static Spanish local-business demos; hub served at /demo via rewrite,
                    # retained outside primary navigation and temporarily noindexed
```

Tests live next to the code as `*.test.ts` (Vitest, node environment; `vitest.config.ts` maps `@/*` and stubs `server-only`).

## Clean Architecture Boundaries

Canonical boundary guidance lives in [`docs/ARCHITECTURE-BOUNDARIES.md`](docs/ARCHITECTURE-BOUNDARIES.md). Read it before refactoring route handlers, contact flows, chat behavior, or shared content/data modules.

Short version: this app is intentionally small, so do not over-abstract; but do not let business/security rules drift further into framework files without characterization tests. For the WhatsApp redirect lane, preserve challenge validation, full challenge value integrity, replay blocking, sanitization, and redirect message behavior.

## Homepage sections (`components/personal-homepage.tsx`)
1. Header: personal mark, Work / How I work / Notes / Contact, light/dark toggle
2. Hero: technical-systems positioning with local `#work` and `#notes` actions
3. Selected Work: exactly three typed proof records with problem, David's role, decision, tradeoff, and evidence
4. How I Work: four personal operating principles
5. Working Vocabulary: the small tool groups David actually reaches for
6. Operating Notes: current focus plus the published writeups path
7. Personal Contact: screened WhatsApp, email, and GitHub
8. Footer: personal contact and focused local routes

## Design / Styling
- Uses custom `dtz-*` classes defined in `app/globals.css`. Keep this design language: accessible, personal, light/dark, grounded. Not cyberpunk/agency.
- Theme is stored in `localStorage` under `davidtiz-theme` and also honors `?theme=` and `prefers-color-scheme`.

## Contact details
- Centralized in `data/content.ts` → `contact` (whatsappNumber, email, github) and `whatsappHref`.
- These are public contact details, NOT secrets. Never move them into `.env`.

## Constraints for future edits
- Brand boundary: this site never becomes an ecosystem router. Rules + allowed-link test live in `docs/BRAND-BOUNDARY.md`.
- Personal contact remains the route for employment, collaboration, speaking, referrals, and peer contact. Do not replace it with a commercial intake flow.
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

## GitLab CI/CD & Security Scanners
All 7 active workspaces are mirrored to GitLab to run automated Ultimate security scans on the `main` branch.
- **Remotes:** Every repository has a `gitlab` SSH remote (e.g. `git@gitlab.com:razonin4k/david-ortiz-portfolio-ci.git`).
- **Scanners:** SAST, Secret Detection, Dependency Scanning, and DAST (Dynamic Application Security Testing) are enabled.
- **DAST Staging Target:** `https://david-ortiz-portfolio-git-main-razs-projects-29d4f2e6.vercel.app` (configured as a manual trigger).
- **Documentation:** For setup, triggers, and scanning details, see [docs/GITLAB-CI.md](file:///Users/davidortiz/Git-Projects/david-ortiz-portfolio/docs/GITLAB-CI.md) in this repository.
