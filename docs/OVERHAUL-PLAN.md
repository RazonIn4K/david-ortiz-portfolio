# davidtiz.com Overhaul Plan (david-ortiz-portfolio)

Date: 2026-06-09
Status: Executed (D1–D4 complete, 2026-06-10)

> Execution record: #70 merged and verified in production (D1); `docs/BRAND-BOUNDARY.md`
> added with CLAUDE.md/AGENTS.md pointers and a clean copy audit (#71, D2+D3);
> ecosystem-era docs archived to `docs/archive/` (D4). CI green throughout.
Role in portfolio strategy: **personal home base — finish and protect the boundary; no major overhaul needed.**
Cross-repo governance: see `E:\Codebases\PORTFOLIO-OVERHAUL-MASTER-PLAN.md`.

---

## Current diagnosis (verified against the repo)

This repo is **no longer the ecosystem problem**. Verified state:

- Ecosystem links to HighEncode/CSBrainAI/Prompt Defenders were already pruned from
  contact surfaces in PR #59 (recorded at `docs/PROJECT-STRUCTURE.md:95`).
- `CLAUDE.md` and `AGENTS.md` already state the site "is NOT an 'ecosystem router'"
  and forbid reframing it around the other brands.
- The only remaining cross-domain reference is `businessSiteUrl`
  (`https://highencodelearning.com`, defined at `lib/site-config.ts:2,31-34`) used
  four times on `/portfolio` (`app/portfolio/page.tsx:79,86,168,388`). This fits the
  "selected work" rule and stays.
- Copy audit is clean: the only "hub" usages are descriptive ("contact hub" at
  `app/contact/page.tsx:31,91`), not organizational.
- `main` is clean at commit `032d799` (PR #69). **PR #70 is open on branch
  `feat/design-coherence-overhaul`** and is needed: `main` today has no robots or
  sitemap routes, and the secondary pages (/contact, /portfolio, /privacy, 404,
  error) still use a different design language than the homepage.
- PR #70 received a review follow-up: `global-error.tsx` now supports dark mode via
  inline CSS variables + `prefers-color-scheme` instead of forcing a bright fallback.

### Stack and gates
Next.js 16.2.7 (App Router), React 19.2, Tailwind 4, TypeScript, Vitest.
Scripts: `dev`, `build` (TS errors fail the build), `lint`, `test`, `test:watch`.
CI: lint → test → build on every push/PR, plus CodeQL.

### Route map (main, pre-#70)
| Route | File | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` (530 lines, monolithic) | Homepage; footer inline at lines 514-525 |
| `/contact` | `app/contact/page.tsx` | Contact hub; screened WhatsApp flow via `app/contact/whatsapp/*` |
| `/portfolio` | `app/portfolio/page.tsx` | Selected work; links to High Encode as `businessSiteUrl` |
| `/privacy` | `app/privacy/page.tsx` | Legal / Meta app requirement |
| `/pay`, `/pagar` | `app/pay/page.tsx`, `app/pagar/page.tsx` | Spanish-first Stripe payment menu; noindex; warm palette — intentional sub-brand |
| `/demo` | `public/demo/*.html` via rewrite (`next.config.mjs:12-20`) | Spanish local-business demo hub (pedidos, citas, servicios) |
| `/admin/whatsapp-coexistence` | `app/admin/.../page.tsx` | Admin-key gated; 404 without key |
| API | `/api/chat`, `/api/whatsapp/webhook`, `/api/meta/embedded-signup/*` | Rate-limited, HMAC-checked, privacy-safe logging |
| 404/error | `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx` | Restyled by #70 |

---

## Goal

```text
davidtiz.com
  /            personal intro, selected work lanes, process, stack, notes, contact
  /contact     all direct paths (screened WhatsApp, email, GitHub)
  /portfolio   selected projects only — not a brand directory
  /privacy     legal / Meta requirement
  /demo        local-business demo hub (sub-brand)
  /pay         Spanish payment funnel (sub-brand, noindex)
```

It must NOT become: "Visit my ecosystem", "Choose a brand", a directory of
HighEncode + CSBrainAI + Prompt Defenders.

---

## PR plan

### PR D1 — Merge #70 after visual pass  (Week 1, blocks nothing else)

Scope: merge `feat/design-coherence-overhaul` once visually approved. The remaining
risk is visual taste, not code risk.

Checks before merge:

```bash
npm test
npm run lint
npm run build
```

Manual preview checklist:

```text
/
/contact
/portfolio
/privacy
a missing path (e.g. /missing-page) → 404
dark mode on /contact and /portfolio (and the global-error fallback if reachable)
robots.txt
sitemap.xml
/pay  (confirm it is intentionally untouched — warm palette preserved)
```

Acceptance: secondary pages read as "David Ortiz personal site", not "template skin";
`/pay` and `/demo` unchanged.

### PR D2 — Add `docs/BRAND-BOUNDARY.md`  (Week 1, small)

Create the canonical boundary doc so every future agent (and future-you) knows the
rule. Much of this codifies what `CLAUDE.md` already says, but the boundary doc is
what the OTHER repos point at as the inbound-link rule.

Suggested contents:

```md
# David Ortiz Portfolio Brand Boundary

## This site is
- David Ortiz's personal home base.
- A place for selected work, current notes, direct contact, and trust signals.
- The canonical identity layer for David as a builder/operator.

## This site is not
- A multi-domain ecosystem router.
- A services marketplace.
- A brand directory or "choose a brand" page for High Encode, CSBrainAI,
  Prompt Defenders, Razon Live Lab, or any future project.

## Allowed outbound links
- Selected work examples on /portfolio (current example: highencodelearning.com via businessSiteUrl).
- Individual proof cards for David's own projects, as long as they stay selected-work
  evidence and do not become sibling-domain navigation or an ecosystem section.
- Required legal/privacy/platform links.
- Project demos hosted inside this repo (/demo).
- One-off links when they serve the current page's user task.

## Not allowed
- Footer sections named "ecosystem."
- Navigation that routes visitors to sibling domains.
- Copy that makes other brands the organizing structure of davidtiz.com.

## Inbound rule
Other properties may include one restrained line: "Built/operated by David Ortiz"
linking to davidtiz.com. Nothing more.

## Sub-brands
/pay and /demo are an intentional Spanish local-business funnel with its own warm
visual language. Do not fold them into the dtz design system.
```

Also add a one-line pointer to this doc from `CLAUDE.md` and `AGENTS.md` so agents
find it.

### PR D3 — Post-#70 copy audit  (Week 1, optional, 30 minutes)

After #70 lands, grep the app for:

```text
ecosystem | multi-site | brand network | choose a brand | our brands
```

Keep harmless descriptive phrases ("contact hub" at `app/contact/page.tsx:31,91`).
Remove anything that makes davidtiz.com sound like a brand router. Ensure CTA
language says "selected work" / "contact David", never "my network" or "services hub".

### PR D4 — Archive ecosystem-era planning docs  (Week 1–2, hygiene)

The repo root and `docs/` still carry documents from the old multi-brand strategy,
which will confuse future agents now that the boundary doc says the opposite:

```text
ECOSYSTEM_REDESIGN_PLANS.md                      (root)
docs/ECOSYSTEM-LAYERS-SUMMARY-2026-05-10.md
docs/ECOSYSTEM-CONTINUATION-FULL-WORK-LOG-2026-05-10.md
docs/PUBLIC-ECOSYSTEM-SHIP-LOG-2026-05-10.md
```

Move them to `docs/archive/` with a short README noting they predate the
brand-boundary decision (2026-06). Do not delete — they are useful history.

---

## What NOT to do in this repo

- Do not add a sibling-brand directory, ecosystem nav, or High Encode service CTA.
- Prompt Defenders and Razon Live Lab may appear only as individual proof cards
  for David's own work.
- Do not restyle `/pay`, `/pagar`, or `public/demo/*` into the dtz design system.
- Do not move the public `contact` object out of `data/content.ts` into env vars
  (explicit existing constraint).
- Do not invent clients, testimonials, revenue, or titles (existing constraint).
- Do not turn `/portfolio` into a directory of all four properties; it stays
  "selected projects only."

## Done criteria for this repo

- [x] #70 merged; robots.txt and sitemap.xml live; secondary pages visually coherent.
- [x] `docs/BRAND-BOUNDARY.md` exists and is referenced from CLAUDE.md/AGENTS.md (#71).
- [x] Copy audit clean; only sanctioned outbound links remain (#71).
- [x] Ecosystem-era planning docs archived (`docs/archive/`).
- [x] CI (lint/test/build) green on main.
