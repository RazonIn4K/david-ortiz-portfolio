# David Ortiz — Personal Portfolio

Personal portfolio site for David Ortiz, built with Next.js, React, Tailwind CSS, and Vercel. It presents an editorial introduction, three inspectable work records, a personal approach, current field notes, and email-first contact. It is a single-page site with anchor navigation (`#start`, `#work`, `#approach`, `#notes`, `#contact`), plus focused secondary pages (`/contact`, `/portfolio`, `/writeups`, `/privacy`). The legacy `/demo` files remain reachable but are excluded from the sitemap and temporarily noindexed.

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

Do not commit secrets. Public email and GitHub details live in `data/content.ts`, not in env files. The phone number there supports an unlinked operational route and must not be rendered on public pages.

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
  contact/          # Email-first contact hub + unlinked operational redirect/challenge
  portfolio/        # Selected-work detail page
  api/chat/route.ts # Standalone, rate-limited personal-site guide API; not mounted on `/`
components/         # Theme shell, protected contact link, icons
data/content.ts     # Centralized personal contact details
data/home-content.ts # Typed homepage navigation, actions, and proof records
lib/                # site-config, contact-links, abuse-store, meta helpers
public/             # Images, visuals, and temporarily contained /demo static pages
```

## Notes

- The homepage is a personal portfolio, not a router to other sites.
- Its job is to establish David's identity and judgment through a curated set of work, personal operating notes, and verifiable evidence.
- Public contact is email-first, with professional and creative profiles as secondary paths. Operational redirect mechanics stay off public pages. Personal contact remains distinct from commercial client intake.

## Portfolio brand governance

- DavidTiz owns personal identity, curated proof, and personal contact.
- RazonWorks is the only owner of commercial services and client intake.
- High Encode Learning owns education and learner support.
- Razon Lab is the experimental research arm of RazonWorks.

The canonical portfolio decision and contract live in the `RazonIn4K/razonworks` repository at `docs/adr/0039-portfolio-brand-and-content-ownership.md`, `docs/brand/portfolio-charter.md`, and `docs/brand/content-ownership-ledger.md`. The local rules are in [docs/BRAND-BOUNDARY.md](docs/BRAND-BOUNDARY.md).

The proof-first homepage and `/portfolio` record are implemented in local source. `/portfolio` uses checked-in evidence and does not render a sibling-business handoff. No hosted behavior was verified or changed by this checkpoint. A future implementation may provide one contextual, secondary RazonWorks handoff only after the exact destination exists and its hosted behavior is verified.

## Contact protection

This repo retains an unlinked WhatsApp redirect as operational infrastructure:

- Public pages do not link to `/contact/whatsapp` or describe its security mechanics.
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
