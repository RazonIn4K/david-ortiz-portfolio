# David Ortiz — Personal Site

Next.js site for David Ortiz's personal notes, experiments, demos, and systems-thinking writeups. This repo is the personal side of the ecosystem. The business-facing layer lives at [highencodelearning.com](https://highencodelearning.com).

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
- Domains: `davidtiz.com` (canonical apex) and `www.davidtiz.com`
  - @ → 76.76.21.21 (A record)
  - www → 76.76.21.21 (A record, redirects to apex)

Alias commands (when needed):
```bash
vercel alias set david-ortiz-portfolio-<latest>.vercel.app davidtiz.com
vercel alias set david-ortiz-portfolio-<latest>.vercel.app www.davidtiz.com
vercel certs issue davidtiz.com www.davidtiz.com
```

### Monitoring

`.github/workflows/check-project-routes.yml` runs hourly and curls each `/projects/<slug>/` URL on `https://davidtiz.com`. The workflow fails (and alerts) if any route stops returning `200`. Add new slugs to `PROJECT_URLS` whenever more demos ship.

## Structure

```
app/
  page.tsx              # Home
  contact/page.tsx      # Shareable direct-contact hub
  design-system/page.tsx
  api/chat/route.ts     # AI assistant endpoint
components/             # UI sections, launchers, ecosystem components
data/                   # Shared content used across sections
lib/
  site-config.ts        # Active domains and ecosystem labels
  contact-links.ts      # Confirmed contact channels
```
