# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js site for David Ortiz's personal notes, systems experiments, design-system work, and legacy demo projects served via rewrites. This repo is the personal side of the ecosystem. Business-facing work lives at High Encode Learning.

**Production**: `davidtiz.com` (apex domain preferred, www redirects to apex)
**Vercel Project**: `david-ortiz-portfolio` (team: razs-projects-29d4f2e6)

## Development Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Build & Production
npm run build            # Production build
npm run start            # Run production server locally

# Code Quality
npm run lint             # Run ESLint

# With Doppler (secrets management)
doppler run -- npm run dev
doppler run -- npm run build
```

## Secret Management (Doppler)

This project uses Doppler CLI for secrets management. The Doppler project is `david-ortiz-portfolio`.

**First-time setup:**
```bash
doppler login                                          # Authenticate with Doppler (one-time)
doppler setup --project david-ortiz-portfolio --config dev --no-interactive  # Configure for dev
```

**Working with secrets:**
```bash
doppler secrets                                        # List all secrets
doppler secrets set KEY="value"                        # Add/update a secret
doppler run -- npm run dev                            # Run dev server with Doppler secrets
doppler run -- npm run build                          # Build with Doppler secrets
```

**Vercel Integration:**
To sync secrets to Vercel, set up the Doppler-Vercel integration in the [Doppler Dashboard](https://dashboard.doppler.com) under Integrations. This will automatically sync secrets from Doppler to Vercel on every change.

**Required secrets:**
- `OPENROUTER_API_KEY` - Powers the AI concierge (get from [OpenRouter](https://openrouter.ai))
- `SITE_URL` - Used for OpenRouter HTTP-Referer header (defaults to davidtiz.com)
- `OPENROUTER_PRIMARY_MODEL` - Optional override for AI model (defaults to fallback chain: openrouter/sherlock-dash-alpha → openrouter/sherlock-think-alpha → nvidia/nemotron-nano-9b-v2:free → z-ai/glm-4.5-air:free)

## Architecture

### Project Structure

```
app/
  page.tsx                 # Home: personal notebook + contact hub
  contact/page.tsx         # Shareable direct-contact page
  design-system/page.tsx   # Public design-system preview
  layout.tsx               # Root layout + metadata
  api/chat/route.ts        # AI assistant API (POST only)

components/                # UI sections, ecosystem pieces, launchers
  ui-creative/             # Homepage/client-facing components
  design-system/           # Public design-system preview components
  ecosystem/               # Shared ecosystem banners/footers/cross-site CTAs

data/
  content.ts              # Centralized content: services[], showcaseProjects[], etc.
                         # Source of truth for site content

lib/
  site-config.ts          # Active domains and ecosystem labels
  contact-links.ts        # Confirmed contact channels and footer/launcher data
  design-system/          # Shared design-system configs
```

### AI Assistant (`/api/chat`)

- **POST-only** endpoint with session-based rate limiting (10 req/min per sessionId)
- Integrates with OpenRouter API (configured via env vars)
- Maintains last 5 messages of history for context
- System prompt: AI concierge for David's automation studio (< 150 tokens)
- Request validation: message (required, max 1000 chars), sessionId (required), history (optional array)
- Returns 429 on rate limit with `retryAfter` seconds

Client component: `components/ui-creative/ai-assistant.tsx` (handles chat UI and state)

### Content Management

Most shared site content lives in `data/content.ts` as typed exports:
- `services: Service[]` - 4 service offerings with bullets, icons, links
- `showcaseProjects: Project[]` - Demo projects with metrics
- `caseStudies`, `testimonials`, etc.

Confirmed contact and handoff links live in `lib/contact-links.ts`.

### Styling

- **Tailwind CSS** with custom theme extension in `tailwind.config.ts`
- Custom colors: `ink`, `slate`, `accent`, `teal`
- Custom background: `bg-grid-light` (radial gradient)
- Typography plugin: `@tailwindcss/typography` for prose content
- Uses Inter font from `next/font/google`

### Performance

- Framer Motion imports are optimized via Next.js experimental `optimizePackageImports`
- All components use `clsx` for conditional className logic
- Client components (AIAssistant) are clearly marked with `'use client'`

## Deployment

```bash
# Deploy to production (requires Vercel CLI)
vercel --prod

# Manual alias setup (if needed)
vercel alias set david-ortiz-portfolio-<latest>.vercel.app davidtiz.com
vercel alias set david-ortiz-portfolio-<latest>.vercel.app www.davidtiz.com
vercel certs issue davidtiz.com www.davidtiz.com
```

**DNS Configuration**:
- @ → 76.76.21.21 (A record)
- www → 76.76.21.21 (A record)

## Path Aliases

TypeScript `baseUrl: "."` with `@/*` mapping to root:
```ts
import { AIAssistant } from '@/components/ui-creative/ai-assistant';
import { quickReachLinks } from '@/lib/contact-links';
```

## Important Notes

- Keep the personal/business split explicit: `davidtiz.com` is personal and reflective, `highencodelearning.com` is the business-facing layer
- Confirmed contact channels live in `lib/contact-links.ts`; do not invent social links the user has not actually provided
- Shared ecosystem/design-system components should stay truthful even if they are not used on the homepage
- When modifying the AI assistant behavior, update the system prompt in `app/api/chat/route.ts`
