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

## Environment via Doppler

Secrets are managed through [Doppler](https://www.doppler.com/). Install the Doppler CLI, update `doppler.yaml` with your `project`/`config`, then run:

```bash
doppler setup                # authenticate once
doppler secrets set OPENROUTER_API_KEY
doppler secrets set OPENROUTER_PRIMARY_MODEL=x-ai/grok-4-fast:free
doppler secrets set SITE_URL=https://www.cs-learning.me

doppler run -- npm run dev   # injects secrets when running locally
```

## Structure

```
app/
  page.tsx              # Home
  work-with-me/         # Engagement details
  case-studies/         # Deep dives
  api/chat/route.ts     # AI assistant endpoint
components/             # Section components
public/projects/        # Legacy Tailwind demos served statically
```
