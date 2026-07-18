# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Project Overview

Personal portfolio site for David Ortiz, built with Next.js 16 (App Router), React 19, and Tailwind CSS 4, deployed on Vercel. It presents one identity: an AI-security / offensive-evaluation engineer who also ships production software. Proof over description: verified competition results (Gray Swan Arena, NCL), live products (PromptDefenders), CTF writeups, and one shipped client build.

It is NOT an "ecosystem router" or an agency site. Do not reframe it around HighEncode, CSBrainAI, Prompt Defenders, or a multi-site ecosystem. Outside projects may appear only as ordinary portfolio examples, never as the organizing structure. SMB web-services sales/scoping belongs to highencodelearning.com; Hernandez Landscape appears here as exactly one secondary proof card/entry.

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
- Fonts: Geist Sans (body), Geist Mono (labels/status), Fraunces serif display for H1/H2 (`next/font`)
- Analytics: Vercel Analytics
- Deployment: Vercel

## Structure

```
app/
  page.tsx          # Home — thin server component: reads latest writeups, renders components/home-page.tsx
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
  home-page.tsx     # Homepage client component (dtz-* classes, framer-motion reveals)
  ai-assistant.tsx  # Floating chat concierge on the homepage (calls /api/chat)
  contact/          # ProtectedWhatsAppLink — screened WhatsApp redirect (used by homepage + /contact)
  icons/            # brand-icons (used by homepage + /contact)
data/content.ts     # Shared content: heroChips, proofCards, chatConfig, centralized contact (`contact`, `whatsappHref`)
lib/                # site-config, contact-links, meta-embedded-signup, abuse-store, utils
public/visuals/     # Hero/workbench images and SVGs
public/demo/        # Static Spanish local-business demos; hub served at /demo via rewrite
                    # (no longer linked from the homepage)
```

Tests live next to the code as `*.test.ts` (Vitest, node environment; `vitest.config.ts` maps `@/*` and stubs `server-only`).

## Clean Architecture Boundaries

Canonical boundary guidance lives in [`docs/ARCHITECTURE-BOUNDARIES.md`](docs/ARCHITECTURE-BOUNDARIES.md). Read it before refactoring route handlers, contact flows, chat behavior, or shared content/data modules.

Short version: this app is intentionally small, so do not over-abstract; but do not let business/security rules drift further into framework files without characterization tests. For the WhatsApp redirect lane, preserve challenge validation, full challenge value integrity, replay blocking, sanitization, and redirect message behavior.

## Homepage sections (`components/home-page.tsx`)
1. Header — brand + "AI Security Engineer" role label, nav (Work / Process / Writeups / Contact), light/dark toggle
2. Hero — one identity sentence ("I break AI systems and ship production software.") + 3 credential chips (`data/content.ts` → `heroChips`), CTAs (See the work / How I work)
3. Selected proof — 4 proof cards, each one artifact + one result + one link (`data/content.ts` → `proofCards`), followed by a compact lab log: 3 newest writeups, read from `content/writeups` at build time by `app/page.tsx`
4. How I work — 3 process steps
5. Contact — one line + WhatsApp (screened redirect), email, and GitHub buttons
6. Footer — WhatsApp · Email · GitHub · route links

Copy rules for this page: every number must be checkable at the linked source; no em-dashes in rendered copy; no filler adjectives; keep body text under ~400 words. `/portfolio` is a proof index across the same categories (Hernandez is one entry, with scoping links to highencodelearning.com).

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

## GitLab CI/CD & Security Scanners
All 7 active workspaces are mirrored to GitLab to run automated Ultimate security scans on the `main` branch.
- **Remotes:** Every repository has a `gitlab` SSH remote (e.g. `git@gitlab.com:razonin4k/david-ortiz-portfolio-ci.git`).
- **Scanners:** SAST, Secret Detection, Dependency Scanning, and DAST (Dynamic Application Security Testing) are enabled.
- **DAST Staging Target:** `https://david-ortiz-portfolio-git-main-razs-projects-29d4f2e6.vercel.app` (configured as a manual trigger).
- **Documentation:** For setup, triggers, and scanning details, see [docs/GITLAB-CI.md](file:///Users/davidortiz/Git-Projects/david-ortiz-portfolio/docs/GITLAB-CI.md) in this repository.

