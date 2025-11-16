# David Ortiz — AI Automation Portfolio

Next.js 14 + Tailwind rebuild focused on AI automation, chatbots, scraping, and AI security services. Includes dedicated Work With Me and Case Studies pages, live web-design demos under `/projects`, and an AI concierge powered by OpenRouter.

## Getting Started

```bash
npm install
npm run dev
```

- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – lint project

## Secret management (Doppler)

The repo uses Doppler for secrets. Install Doppler CLI, then:

```bash
doppler setup         # authenticate once
doppler secrets set OPENROUTER_API_KEY

doppler run -- npm run dev
```

Vercel pulls secrets from Doppler at build time.

## Deployment

The repo is linked to the Vercel project `david-ortiz-portfolio` (team `razs-projects-29d4f2e6`).

- Production deploy: `vercel --prod`
- Domains: `cs-learning.me` (apex) and `www.cs-learning.me`
  - @ → 76.76.21.21 (A record)
  - www → cname.vercel-dns-017.com (CNAME)

Alias commands (when needed):
```bash
vercel alias set david-ortiz-portfolio-<latest>.vercel.app cs-learning.me
vercel alias set david-ortiz-portfolio-<latest>.vercel.app www.cs-learning.me
vercel certs issue cs-learning.me www.cs-learning.me
```

### Monitoring

`.github/workflows/check-project-routes.yml` runs hourly and curls each `/projects/<slug>/` URL on `https://cs-learning.me`. The workflow fails (and alerts) if any route stops returning `200`. Add new slugs to `PROJECT_URLS` whenever more demos ship.

## Structure

```
app/
  page.tsx              # Home
  work-with-me/         # Engagement details
  case-studies/         # Deep dives
  api/chat/route.ts     # AI assistant endpoint
components/             # Section components
data/                   # Content used across sections
public/projects/        # Legacy Tailwind demos
```
