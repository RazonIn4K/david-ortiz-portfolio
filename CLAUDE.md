# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 14 portfolio site for David Ortiz's AI automation studio. The site showcases AI automation services (chatbots, scraping, AI security) with an OpenRouter-powered AI concierge, case studies, and legacy Tailwind demo projects served via rewrites.

**Production**: `cs-learning.me` (apex domain preferred, www redirects to apex)
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

Secrets are managed via Doppler CLI:

```bash
doppler setup                        # Authenticate once
doppler secrets set OPENROUTER_API_KEY  # Set a secret
doppler run -- npm run dev           # Run with secrets
```

Vercel pulls secrets from Doppler at build time. Required secrets:
- `OPENROUTER_API_KEY` - Powers the AI concierge
- `SITE_URL` - Used for OpenRouter HTTP-Referer header (defaults to cs-learning.me)
- `OPENROUTER_PRIMARY_MODEL` - Optional override for AI model (defaults to fallback chain: openrouter/sherlock-dash-alpha → openrouter/sherlock-think-alpha → nvidia/nemotron-nano-9b-v2:free → z-ai/glm-4.5-air:free)

## Architecture

### Project Structure

```
app/
  page.tsx                 # Home: section components composed top-to-bottom
  layout.tsx               # Root layout with Navbar + Footer
  api/chat/route.ts        # AI assistant API (POST only)
  work-with-me/page.tsx    # Engagement details
  case-studies/page.tsx    # Deep dive case studies

components/               # Section components imported by pages
  Hero.tsx                # Above-the-fold CTA
  ServicesSection.tsx     # 4 service cards
  AIAssistant.tsx         # Chatbot UI (client component)
  Navbar.tsx, Footer.tsx  # Layout chrome

data/
  content.ts              # Centralized content: services[], showcaseProjects[], etc.
                         # Source of truth for site content

lib/
  constants.ts            # UPWORK_URL and other constants

public/projects/          # Legacy static Tailwind demos (NOT Next.js pages)
  taskflow-pro/
  bella-cucina/
  prime-properties/
  powerfit-studios/
  urban-thread/
```

### Routing & Rewrites

**Important**: `/projects/:slug` routes serve **static HTML** from `public/projects/`, NOT Next.js pages.

- Next.js rewrites (both `next.config.mjs` and `vercel.json`) map `/projects/:slug` → `/projects/:slug/index.html`
- These demos are legacy Tailwind sites with independent HTML/CSS/JS
- Do NOT create Next.js pages under `app/projects/` - the rewrites would conflict

If you need to modify a project demo, edit the static HTML files in `public/projects/:slug/index.html`.

### AI Assistant (`/api/chat`)

- **POST-only** endpoint with session-based rate limiting (10 req/min per sessionId)
- Integrates with OpenRouter API (configured via env vars)
- Maintains last 5 messages of history for context
- System prompt: AI concierge for David's automation studio (< 150 tokens)
- Request validation: message (required, max 1000 chars), sessionId (required), history (optional array)
- Returns 429 on rate limit with `retryAfter` seconds

Client component: `components/AIAssistant.tsx` (handles chat UI and state)

### Content Management

All site content lives in `data/content.ts` as typed exports:
- `services: Service[]` - 4 service offerings with bullets, icons, links
- `showcaseProjects: Project[]` - Demo projects with metrics
- `caseStudies`, `testimonials`, etc.

When updating site copy, edit `data/content.ts` rather than hardcoding in components.

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
vercel alias set david-ortiz-portfolio-<latest>.vercel.app cs-learning.me
vercel alias set david-ortiz-portfolio-<latest>.vercel.app www.cs-learning.me
vercel certs issue cs-learning.me www.cs-learning.me
```

**DNS Configuration**:
- @ → 76.76.21.21 (A record)
- www → cname.vercel-dns-017.com (CNAME)

## CI/CD

GitHub Actions workflows in `.github/workflows/`:
- `check-project-routes.yml` - Hourly cron to verify `/projects/*` demos return HTTP 200
- `ci.yml` - Standard CI checks
- `codeql.yml` - Security scanning
- `security-scan.yml` - Additional security audits

## Path Aliases

TypeScript `baseUrl: "."` with `@/*` mapping to root:
```ts
import { Hero } from '@/components/Hero';
import { UPWORK_URL } from '@/lib/constants';
```

## Important Notes

- Do NOT create Next.js pages under `app/projects/` - these routes are handled by static rewrites
- All external URLs (Upwork, GitHub repos, ShopMatch Pro, Prompt Defenders) are defined in `data/content.ts`
- When modifying the AI assistant behavior, update the system prompt in `app/api/chat/route.ts:48`
- The site uses `next-themes` for potential dark mode (imported but not fully implemented)
