# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Next.js 16 portfolio site for David Ortiz's AI Automation Studio built with React 19 and Tailwind CSS 4. The site showcases AI automation services with a sleek dark cyberpunk aesthetic, interactive animations, and an AI concierge assistant.

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

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **UI**: React 19, Tailwind CSS 4, Framer Motion
- **Fonts**: Geist Sans & Geist Mono (via `next/font`)
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

### Project Structure

```
app/
  layout.tsx              # Root layout with fonts and metadata
  page.tsx                # Home page (single page app)
  globals.css             # Global styles, animations, CSS variables
  error.tsx               # Page-level error boundary
  global-error.tsx        # App-level error boundary (full crash recovery)
  not-found.tsx           # Custom 404 page
  design-system/
    page.tsx              # Design system showcase page
    error.tsx             # Design system error boundary

components/
  design-system/          # Theamed components for multi-site ecosystem
    ds-button.tsx         # Site-aware button variants
    ds-card.tsx           # Site-aware card variants
    ds-badge.tsx          # Site-aware badge variants
    ds-input.tsx          # Site-aware input component
    ds-icon-set.tsx       # Custom icon components
    ds-ecosystem-nav.tsx  # Ecosystem navigation component
  ui-creative/            # Creative UI components used on main page
    ai-assistant.tsx      # Floating AI chatbot assistant
    animated-stats.tsx    # Animated statistics display
    ecosystem-links.tsx   # Links to ecosystem sites
    floating-dock.tsx     # Floating navigation dock
    hex-grid-bg.tsx       # Hexagonal grid background
    holographic-card.tsx  # Holographic effect card
    orbit-visualization.tsx # Orbiting tools visualization
    service-grid.tsx      # Services grid layout
    terminal-hero.tsx     # Terminal-style hero animation

data/
  content.ts              # Centralized content: services, projects, testimonials

lib/
  utils.ts                # Utility functions (cn helper)
  design-system/
    tokens.ts             # Design tokens (colors, typography, spacing)
    site-configs.ts       # Per-site configuration for ecosystem
    animations.ts         # Animation utilities

public/
  projects/               # Legacy static Tailwind demo sites
    taskflow-pro/
    bella-cucina/
    prime-properties/
    powerfit-studios/

types/
  chat.ts                 # TypeScript types for chat functionality
```

### Key Pages

- **`/`** - Main portfolio page with hero, services, ecosystem links, and contact CTA
- **`/design-system`** - Interactive design system documentation for the multi-site ecosystem

### Home Page Sections

The home page (`app/page.tsx`) is a client component featuring:
1. **HexGridBackground** - Animated hexagonal pattern background
2. **AIAssistant** - Floating AI chatbot (bottom-right)
3. **FloatingDock** - Fixed navigation dock
4. **Header/Nav** - Logo and navigation links
5. **Hero Section** - Headlines with TerminalHero animation
6. **Stats Section** - AnimatedStats with counters
7. **Ecosystem Section** - OrbitVisualization showing tool integrations
8. **Services Section** - ServiceGrid with HolographicCards
9. **Learning Section** - EcosystemLinks to related sites
10. **CTA Section** - Call to action for booking
11. **Footer** - Simple footer with links

### AI Assistant

The AI assistant (`components/ui-creative/ai-assistant.tsx`) provides:
- Floating trigger button with pulse animation
- Expandable chat panel
- Quick action buttons for common queries
- Simulated intelligent responses based on keywords
- Typing indicator animation

**Note**: Currently uses client-side simulated responses. Can be extended to use a real API endpoint.

### Design System

The design system supports multiple sites in the ecosystem:
- **cs-learning.me** - Main portfolio (teal/dark theme)
- **highencodelearning.com** - Education platform (blue/light theme)
- **csbrainai.com** - AI learning tool (purple/dark theme)
- **promptdefenders.com** - Security tool (red/dark theme)

Components accept a `site` prop to automatically apply the correct theme.

### Styling

- **Theme**: Dark cyberpunk with teal (#2dd4bf), cyan (#22d3ee), coral (#ff6b6b), and purple (#a78bfa) accents
- **Glass effects**: `.glass` and `.glass-strong` classes for backdrop blur
- **Glow effects**: `.glow-teal`, `.glow-coral`, `.glow-purple` for box shadows
- **Gradient text**: `.gradient-text` and `.gradient-text-warm` for colorful text
- **Animations**: Float, pulse-ring, scan-line, glitch, data-flow, hexagon-pulse, shimmer, morph

### CSS Variables (globals.css)

Brand colors:
- `--cs-navy`: #060a14 (background)
- `--cs-teal`: #2dd4bf
- `--cs-cyan`: #22d3ee
- `--cs-coral`: #ff6b6b
- `--cs-purple`: #a78bfa

## Deployment

```bash
# Deploy to production (requires Vercel CLI)
vercel --prod
```

The site auto-deploys from the main branch via Vercel's GitHub integration.

## Path Aliases

TypeScript `baseUrl: "."` with `@/*` mapping to root:
```ts
import { AIAssistant } from '@/components/ui-creative/ai-assistant';
import { tokens } from '@/lib/design-system/tokens';
```

## Secret Management (Doppler)

This project uses Doppler CLI for secrets management. The Doppler project is `david-ortiz-portfolio`.

**First-time setup:**
```bash
doppler login
doppler setup --project david-ortiz-portfolio --config dev --no-interactive
```

**Required secrets:**
- `OPENROUTER_API_KEY` - For AI integrations (optional)
- `SITE_URL` - Production URL

## Accessibility Features

- **ARIA labels**: All interactive elements have proper aria-label attributes
- **Keyboard navigation**: Full keyboard support with focus-visible rings
- **Reduced motion**: All components respect `prefers-reduced-motion` preference
- **Screen reader support**: Live regions for dynamic content (chat messages, loading states)
- **Semantic HTML**: Proper heading hierarchy and landmark elements

## Error Handling

The site implements comprehensive error boundaries:
- `app/error.tsx` - Catches page-level errors with "Try again" and "Go home" options
- `app/global-error.tsx` - Catches app-level crashes, includes its own HTML/body for recovery
- `app/not-found.tsx` - Branded 404 page with navigation options
- `app/design-system/error.tsx` - Specific error boundary for design system page

## Important Notes

- The site is a single-page app with anchor navigation (`#services`, `#learning`, `#contact`)
- Static project demos in `public/projects/` are legacy Tailwind sites, not Next.js pages
- All animations use Framer Motion for smooth 60fps performance
- The design system page showcases components for the entire ecosystem of sites
- HexGridBackground uses throttled mouse tracking for performance optimization
