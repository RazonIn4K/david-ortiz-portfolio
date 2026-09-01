# David Ortiz Portfolio Brand Boundary

> The one rule every agent and contributor must hold: **davidtiz.com is David's
> personal identity and curated proof hub, not a router to other properties.**
> Personal contact stays distinct from commercial client intake.

The active RazonWorks source boundary is `/Users/davidortiz/Git-Projects/razonworks-studio/docs/repository-boundary.md`; the retired broad-platform governance files are historical evidence, not current product requirements. This repository's local boundary must not contradict the active lean boundary. If the documents conflict, pause public changes and reconcile the lean RazonWorks boundary and local boundary together before implementation.

## This site is

- David Ortiz's personal home base.
- A place for curated work, personal operating notes, direct personal contact, and trust signals.
- The canonical identity layer for David as a builder/operator.
- A first-person record of David's decisions, tradeoffs, role, and evidence.
- Email-first for personal contact, with GitHub, LinkedIn, scheduling, and selected social profiles as secondary paths.
- WhatsApp and its redirect/security mechanics are operational infrastructure, not public portfolio content.

## This site is not

- A multi-domain ecosystem router.
- A services marketplace or agency brochure.
- A brand directory or "choose a brand" page for High Encode, CSBrainAI,
  Prompt Defenders, Razon Lab, or any future project.
- A landing page that asks visitors to "choose a brand."
- The canonical home for commercial services, client intake, education, or full experimental research artifacts.

## Allowed outbound links

- **Selected work on `/portfolio`**: the current record uses checked-in captures and
  a typed role-and-decision summary. A later external case link must be refreshed and
  verified before it is presented as current evidence.
- **Individual proof cards for David's own projects**: e.g., a prompt-defense demo
  or a Razon Lab experiment. These belong only as curated evidence, never as a
  dedicated brands/projects directory, sibling-domain nav, or ecosystem section.
- **One future RazonWorks business handoff** from an appropriate proof or contact
  context. It must be visibly secondary, lead to a verified destination, and never
  replace personal contact. Phase 0 does not implement this link.
- **High Encode Learning or Razon Lab links** only when a specific learning resource
  or experiment artifact helps the visitor understand the selected work. Do not use
  either property as a general business destination.
- **Required legal/privacy/platform links** (for example, `/privacy`).
- **Project demos retained inside this repo** (`/demo` and its sub-pages). They remain
  reachable but are temporarily excluded from the sitemap and noindexed.
- **Personal profiles** on `/contact`: GitHub, LinkedIn, YouTube, Twitch, X, Facebook,
  Instagram, and Calendly. These are *David's* channels, not sibling brands or package marketplaces.
- One-off links when they serve the current page's user task.

## Not allowed

- Footer or nav sections named "ecosystem," "network," "our brands," or similar.
- Primary navigation, shared cross-site navigation, or multiple calls to sibling properties.
- Copy that makes other brands the organizing structure of davidtiz.com.
- High Encode Learning service CTAs or company routing on this personal hub.
- RazonWorks pricing, service catalogs, or client intake embedded in this site.
- Full curriculum or full experiment reports that belong to High Encode Learning or Razon Lab.
- Re-adding pruned brand links to the contact surfaces (removed in PR #59) or
  reviving the deleted `/design-system` multi-site showcase (removed in PR #53).

## The four-question test for a new outbound link

Before adding any external link, all four must be "yes":

1. **Task** — does it complete the visitor's task *on this page* (see the work,
   reach David)?
2. **Owned purpose**: is it personal proof, a personal channel, or the single approved
   secondary handoff to RazonWorks?
3. **Correct hierarchy**: does David's identity, proof, and personal contact remain
   complete without entering another property?
4. **Removable**: if the linked property disappeared tomorrow, would this site
   still make complete sense?

If any answer is "no," it does not belong here.

## Sub-brand exception: the local-business demos

`public/demo/*` intentionally uses a warm "tianguis" palette instead of the
`dtz-*` language. The legacy demos remain in this repository and keep their
existing screened WhatsApp behavior. The current source excludes them from the
sitemap and adds a temporary `noindex, nofollow` response header. This is
containment, not migration, retirement, redirect, or hosted-state verification.

(The `/pay` + `/pagar` payment pages that completed this funnel were retired on
2026-06-10: pages and `data/payment-links.ts` removed, Stripe links deactivated.
See `docs/MAINTENANCE.md`.)

## Inbound rule (for the other properties)

Other properties may include one restrained authorship line such as "Built and
operated by David Ortiz" linking to davidtiz.com. Nothing larger: no banners, no
cross-site nav bars, and no shared "ecosystem" components.

## Content ownership

- DavidTiz owns David's personal story, role, judgment, curated proof, operating notes, and personal contact.
- RazonWorks owns commercial service scope, deliverables, project discussions, and client intake.
- High Encode Learning owns courses, tutorials, learning paths, and learner support.
- Razon Lab, as the experimental arm of RazonWorks, owns methods, environments, results, limitations, and reproducible artifacts.

DavidTiz may summarize material owned elsewhere only when the summary explains David's role or judgment. Link to the canonical artifact instead of cloning the full service page, lesson, case study, or experiment.

## Migration status

- The Phase 0 governance commit changed documentation only; that statement is historical.
- The 2026-08-10 proof-first checkpoint removed the homepage assistant mount and commercial contact marketplace; its public WhatsApp treatment is historical and was superseded on 2026-08-25.
- The 2026-08-25 editorial checkpoint rebuilds `/` as a warm personal notebook, uses one portfolio record plus two published writeups as proof, and makes `/`, `/contact`, and `/privacy` email-first with no public WhatsApp language or links.
- The portfolio-containment checkpoint rewrites `/portfolio` around problem, role, decision, tradeoff, and checked-in evidence. It removes the package grid and sibling-business links without adding a RazonWorks destination.
- Unused service, case-study, resource, and sibling-brand exports were removed from `data/content.ts`; the module now holds public email/GitHub details plus the number required by the unlinked operational route.
- The standalone `/api/chat` route remains rate-limited and now returns a boundary response for commercial-intake markers before any model call. It is not mounted on the homepage.
- No hosted behavior, analytics, deployment, or domain state was changed or verified by this checkpoint.
- No business destination is rendered or configured in the current source. Add one only in a later authorized implementation slice after the intended RazonWorks destination exists and its hosted behavior is verified.
- `/demo` remains reachable source, but it is absent from the sitemap and receives a temporary source-configured `noindex, nofollow` response header.
- A coordinated RazonWorks implementation branch now contains local source for `/lab` and `/es/lab`. This repository does not claim those routes are hosted, and the standalone Lab-domain redirect remains unverified and incomplete.

## Enforcement

- Design language: every page except the `/demo` pages renders inside
  the `.dtz-site` scope (see `components/theme-shell.tsx`) and styles with
  `var(--dtz-*)` tokens (unified in PR #70).
- Copy audit (run before merging copy changes):

  ```bash
  grep -rniE "ecosystem|multi-site|brand network|choose a brand|our brands" \
    app/ components/ data/ lib/ public/demo/ --include="*.tsx" --include="*.ts" --include="*.html"
  ```

- History: ecosystem contact links pruned in #59; the multi-site design-system
  showcase removed in #53; secondary pages unified on dtz in #70. Do not undo
  these by accident.
