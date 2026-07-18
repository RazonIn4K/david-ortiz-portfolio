# David Ortiz — Personal Portfolio

Personal site for David Ortiz, built with Next.js, React, Tailwind CSS, and Vercel. It presents one identity: an AI-security / offensive-evaluation engineer who also ships production software, backed by verifiable proof (Gray Swan Arena profile, NCL score report, live products, CTF writeups). The homepage uses anchor navigation (`#start`, `#work`, `#process`, `#contact`), plus focused secondary pages (`/contact`, `/portfolio`, `/writeups`, `/privacy`, `/demo`).

## Getting Started

```bash
npm install
npm run dev
```

- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – lint project
- `npm test` – run the Vitest suite

## Secret management (Doppler)

The repo uses Doppler for secrets. Install the Doppler CLI, then:

```bash
doppler setup
doppler run -- npm run dev
```

Do not commit secrets. Public contact details (WhatsApp number and email) live in `data/content.ts`, not in env files.

## Deployment

Linked to the Vercel project `david-ortiz-portfolio` (team `razs-projects-29d4f2e6`).

- Production deploy: `vercel --prod`
- Domain: `davidtiz.com`

## Structure

```
app/
  page.tsx          # Home — thin server component: reads latest writeups, renders components/home-page.tsx
  layout.tsx        # Root layout, fonts, metadata
  globals.css       # Global styles + dtz-* design system, light/dark
  error.tsx         # Page-level error boundary
  global-error.tsx  # App-level error boundary
  not-found.tsx     # Custom 404
  contact/          # Contact hub + screened WhatsApp redirect/challenge
  portfolio/        # Proof index (competition results, products, writeups, one client build)
  writeups/         # CTF technique writeups (markdown in content/writeups)
  api/chat/route.ts # AI chat endpoint (used by the homepage assistant)
components/         # Homepage, AI assistant, theme shell, contact link, icons
data/content.ts     # Shared content (heroChips, proofCards) + centralized contact details
lib/                # site-config, contact-links, abuse-store, meta helpers, writeups
public/             # Images, visuals, and the /demo static pages
```

## Notes

- The homepage is a personal portfolio, not a router to other sites.
- Contact is WhatsApp-first (see `data/content.ts` → `contact` / `whatsappHref`), with email as the fallback backup.

## Contact protection

This repo keeps the public WhatsApp path behind a one-step screened redirect:

- Public buttons point to `/contact/whatsapp`.
- `/contact/whatsapp` adds `wa.me/<number>?text=...` server-side.
- A short-lived `dzt-contact-challenge` token/cookie handshake is enforced before redirect.
- The route includes bot-detection scoring and returns `403` with anti-abuse headers when the handshake or risk checks fail.

If this still gets noisy:

- Keep one clear human handoff before any final commitments.
- Add a separate disposable number/business forwarding line for broad campaigns if needed.

## Dependency and supply-chain checks

If you touch dependencies or `.fossa.yml`, follow the documented scan workflow before merge:

- [FOSSA scan playbook](docs/fossa-scan-playbook.md)
- [FOSSA remediation notes](docs/fossa-remediation-notes.md)

## GitLab CI/CD Security Scans
This project is integrated with GitLab CI/CD to run automated security scans (SAST, Secret Detection, Dependency Scanning, and manual DAST). For more details, see [GitLab CI/CD Security Integration](docs/GITLAB-CI.md).

