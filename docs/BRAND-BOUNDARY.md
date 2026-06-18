# David Ortiz Portfolio Brand Boundary

> The one rule every agent and contributor must hold: **davidtiz.com is David's
> personal home base, not a router to other properties.** When a change is
> ambiguous, this document wins over cleverness.

## This site is

- David Ortiz's personal home base.
- A place for selected work, current notes, direct contact, and trust signals.
- The canonical identity layer for David as a builder/operator.
- WhatsApp-first for contact, with a screened redirect protecting the number.

## This site is not

- A multi-domain ecosystem router.
- A services marketplace or agency brochure.
- A brand directory or "choose a brand" page for High Encode, CSBrainAI,
  Prompt Defenders, Razon Live Lab, or any future project.
- A landing page that asks visitors to "choose a brand."

## Allowed outbound links

- **Selected work examples on `/portfolio`** — e.g., the Hernandez Landscape site and
  its case note (currently hosted on the business property). These are portfolio
  artifacts: evidence of work, never navigation.
- **Individual proof cards for David's own projects** — e.g., a prompt-defense demo
  or Razon Live Lab. These belong only as selected-work evidence, never as a
  dedicated brands/projects directory, sibling-domain nav, or ecosystem section.
  High Encode Learning stays off this personal hub except where a page explains
  the personal-vs-business split.
- **Required legal/privacy/platform links** (e.g., `/privacy`).
- **Project demos hosted inside this repo** (`/demo` and its sub-pages).
- **Personal profiles** on `/contact`: GitHub, LinkedIn, YouTube, Twitch, X, Facebook,
  Instagram, Upwork, Fiverr, Calendly. These are *David's* channels, not sibling brands.
- One-off links when they serve the current page's user task.

## Not allowed

- Footer or nav sections named "ecosystem," "network," "our brands," or similar.
- Navigation that routes visitors to sibling domains as destinations.
- Copy that makes other brands the organizing structure of davidtiz.com.
- High Encode Learning service CTAs or company routing on this personal hub.
- Re-adding pruned brand links to the contact surfaces (removed in PR #59) or
  reviving the deleted `/design-system` multi-site showcase (removed in PR #53).

## The three-question test for a new outbound link

Before adding any external link, all three must be "yes":

1. **Task** — does it complete the visitor's task *on this page* (see the work,
   reach David)?
2. **Artifact, not architecture** — is it evidence of work or a personal channel,
   rather than a doorway to another brand's site structure?
3. **Removable** — if the linked property disappeared tomorrow, would this site
   still make complete sense?

If any answer is "no," it does not belong here.

## Sub-brand exception: the local-business demos

`public/demo/*` intentionally uses a warm "tianguis" palette instead of the
`dtz-*` language. The demos form a Spanish-first funnel (demo → WhatsApp) aimed
at local-business clients and live entirely inside this repo. Do not "fix" them
to match the dtz theme, and do not grow them into a separate brand.

(The `/pay` + `/pagar` payment pages that completed this funnel were retired on
2026-06-10: pages and `data/payment-links.ts` removed, Stripe links deactivated.
See `docs/MAINTENANCE.md`.)

## Inbound rule (for the other properties)

Other properties may include one restrained line — "Built/operated by
David Ortiz" — linking to davidtiz.com. Nothing larger: no banners, no cross-site
nav bars, no shared "ecosystem" components.

## Enforcement

- Design language: every page except the `/demo` pages renders inside
  the `.dtz-site` scope (see `components/theme-shell.tsx`) and styles with
  `var(--dtz-*)` tokens (unified in PR #70).
- Copy audit (run before merging copy changes; expect ~1 hit, the
  `businessSiteUrl` constant that feeds the allowed `/portfolio` links):

  ```bash
  grep -rniE "ecosystem|multi-site|brand network|choose a brand|our brands" \
    app/ components/ data/ lib/ public/demo/ --include="*.tsx" --include="*.ts" --include="*.html"
  ```

- History: ecosystem contact links pruned in #59; the multi-site design-system
  showcase removed in #53; secondary pages unified on dtz in #70. Do not undo
  these by accident.
