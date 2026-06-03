# David Ortiz — Personal Portfolio

Personal portfolio site for David Ortiz, built with Next.js, React, Tailwind CSS, and Vercel. It presents selected work, current learning threads, practical web systems, AI-assisted workflow experiments, and contact information. It is a single-page site with anchor navigation (`#work`, `#about`, `#notes`, `#contact`).

## Getting Started

```bash
npm install
npm run dev
```

- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – lint project

## Secret management (Doppler)

The repo uses Doppler for secrets. Install the Doppler CLI, then:

```bash
doppler setup
doppler run -- npm run dev
```

Do not commit secrets. Public contact details (business phone, email) live in `data/content.ts`, not in env files.

## Deployment

Linked to the Vercel project `david-ortiz-portfolio` (team `razs-projects-29d4f2e6`).

- Production deploy: `vercel --prod`
- Domain: `davidtiz.com`

## Structure

```
app/
  page.tsx          # Home — single-page personal portfolio (dtz-* design)
  layout.tsx        # Root layout, fonts, metadata
  globals.css       # Global styles + dtz-* design system, light/dark
  error.tsx         # Page-level error boundary
  global-error.tsx  # App-level error boundary
  not-found.tsx     # Custom 404
  design-system/    # Design system showcase page
  api/chat/route.ts # AI chat endpoint (not used by the homepage)
components/         # Section + design-system components
data/content.ts     # Shared content + centralized contact details
lib/                # Utilities and design tokens
public/             # Images, visuals, legacy demos
```

## Notes

- The homepage is a personal portfolio, not a router to other sites.
- Contact is WhatsApp-first (see `data/content.ts` → `contact` / `whatsappHref`), with phone and email as backups.
