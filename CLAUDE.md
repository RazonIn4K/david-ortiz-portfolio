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

# With Doppler (secrets)
doppler run -- npm run dev
```

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
  design-system/    # Design system showcase page (separate from homepage)
  api/chat/route.ts # AI chat endpoint (NOT used by the homepage)
components/
  design-system/    # Reusable site-aware components
  ui-creative/
    ai-assistant.tsx # Floating assistant — NOT imported by the homepage anymore
data/content.ts     # Shared content + centralized contact (`contact`, `whatsappHref`)
lib/                # Utilities and design tokens
public/visuals/     # Hero/workbench images and SVGs
```

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

- `ProtectedWhatsAppLink` in `components/contact/protected-whatsapp-link.tsx` sets:
  - a short-lived `dzt-contact-challenge` cookie scoped to `/contact/whatsapp`
  - a matching `challenge` query param on the outbound link
- `app/contact/whatsapp/route.ts` validates that cookie/token pairing before issuing the redirect.
- The route applies light abuse scoring (user-agent quality, referrer, burst patterns, link/spam signals) and returns `403` when blocked.

## Design / Styling
- Uses custom `dtz-*` classes defined in `app/globals.css`. Keep this design language: accessible, personal, light/dark, grounded. Not cyberpunk/agency.
- Theme is stored in `localStorage` under `davidtiz-theme` and also honors `?theme=` and `prefers-color-scheme`.

## Contact details
- Centralized in `data/content.ts` → `contact` (whatsappNumber, email, github) and `whatsappHref`.
- These are public business details, NOT secrets. Never move them into `.env`.

## Constraints for future edits
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
