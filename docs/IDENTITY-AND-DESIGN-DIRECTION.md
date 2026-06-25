# davidtiz.com — Identity and Design Direction

Status: design direction (owner brief 2026-06-17). This is the serious identity spec for the next version of davidtiz.com. Palette is the chosen "Warm Operator" set (see `BRAND-WARM-OPERATOR-TOKENS-PROPOSAL.md`). Governance: this site stays the personal hub, never an ecosystem router or services marketplace (see `BRAND-BOUNDARY.md`); paid services route to High Encode Learning LLC.

## The core idea

The site is a **warm command center**: an operator's bench, not a sci-fi cockpit. The warmth (paper, ink, clay) makes it human and credible and dodges the dark-hacker cliche; the structure (dense system panels, monospace labels, proof tiles, a command palette) makes it read as a field lab and proof-of-work archive. That combination is the differentiator. Most technical personal sites are either cold dashboards or generic portfolios. This one is a lab you can tell a person runs.

## 1. Positioning statement

David Ortiz is a systems builder who coordinates many AIs, tools, and workflows into reliable systems, with a focus on AI orchestration, security-minded automation, and prompt defense. The edge is not using one technology well; it is making many models and tools work together, knowing which context goes to which model, when to distrust output, and how to prove the result. davidtiz.com is where that work is studied in public and kept as evidence.

One line: I build and secure multi-AI systems, and I show my work.

## 2. Homepage hero section

- Eyebrow (mono, clay): `SYSTEMS BUILDER // AI ORCHESTRATION · SECURITY · AUTOMATION`
- Headline (serif display, ink): one of the options in section 8.
- Subhead (sans, muted): "I coordinate models, tools, and workflows into systems that hold up, and I study how they fail in public. Not one technology, a working stack of them."
- Primary CTA (clay fill): "See the systems" -> Work
- Secondary CTA (ink outline): "How I work" -> About/Operating style
- Status strip (mono, thin rule above): a live-feeling line, e.g. `NOW: prompt-defense evals · multi-AI routing study · learning in public` and `LAST SHIPPED: <project> · <date>`. This single strip is what makes it feel like a command center rather than a brochure.

The hero is warm paper, generous whitespace, one clay accent. No hero image needed; the type, the mono status strip, and one restrained system-diagram motif carry it.

## 3. Visual identity direction

Warm Operator. Warm paper and ink as the base, clay as the primary accent, brass as the secondary highlight. The "lab" feeling is built from layout and detail, not color: monospace metadata labels, 1px warm rules, small-caps section kickers, data tiles with problem/result, and a recurring "layers" motif (a nod to the abstraction-stack work) used sparingly as a section divider or hero glyph. Texture is flat and clean, never distressed. Think field notebook plus instrument panel, printed on good paper.

Logo: a clean geometric "DO" monogram in clay (flat, no texture), reused as favicon, avatar, and OG badge, paired with a "David Ortiz" serif wordmark. (Regenerate the logo to this spec; the first batch was too decorative.)

## 4. Sitemap

```text
/                Home (command center: positioning, status, top systems, paths)
/work            Selected systems (3-5 flagship builds, each with proof)
/lab             Field lab (experiments, evals, in-progress notes, the "log")
/writing         Essays and breakdowns (the abstraction-stack series, security pieces)
/about           Operating style (how I coordinate AIs/tools, principles, stack)
/contact         Direct, screened (WhatsApp redirect, email, channels)
/uses (optional) The actual stack and why (tools, models, routing)
```

Services live on High Encode Learning, not here. davidtiz.com links to it once, framed as "the company I operate," never as a service menu.

## 5. Homepage wireframe (text)

```text
[ Header ]  DO monogram | Work  Lab  Writing  About  Contact | theme toggle | ⌘K
------------------------------------------------------------------
[ Hero ]
  SYSTEMS BUILDER // AI ORCHESTRATION · SECURITY · AUTOMATION   (mono, clay)
  <Serif display headline>                                       (ink)
  <one-line subhead>                                             (muted)
  [ See the systems ]  [ How I work ]
  ── NOW: prompt-defense evals · multi-AI routing · learning in public   (mono strip)
     LAST SHIPPED: <project> · <date>
------------------------------------------------------------------
[ Selected systems ]  (3 cards, not a wall)
  Each: title · one-line problem · what I built · what it proves · [open]
  e.g. PromptDefenders · Razon Live Lab · a multi-AI orchestration build
  link: "See the full archive ->" (to /work)
------------------------------------------------------------------
[ How I work ]  (operating style, 3-4 principles in plain first person)
  "Route by trust boundary." "Distrust polished output." "Prove it, sanitized."
------------------------------------------------------------------
[ From the lab ]  (latest 3 experiments/notes, dated, mono tags)
  link: "Open the lab log ->"
------------------------------------------------------------------
[ Writing ]  (2-3 featured essays: the buffer-overflow piece, abstraction stack)
------------------------------------------------------------------
[ Contact ]  one clear path (WhatsApp screened) + email + channels
[ Footer ]   David Ortiz · the person. High Encode Learning -> the company I operate.
```

## 6. Sections: projects, labs, writing, services

- **Work (systems):** flagship builds only, 3-5. Each is a case in the format problem -> what I built -> stack -> what it proves -> link. Quality over volume; this is the recruiter/client surface.
- **Lab:** the field-lab log. Smaller, dated entries: experiments, eval runs, "I tried X and here is what broke." This is where volume lives, so Work stays clean. Filterable by tag (AI security, orchestration, automation, learning).
- **Writing:** longform breakdowns. The abstraction-stack series and the "prompt injection is a buffer overflow" piece anchor it. Distinct from Lab (finished thinking vs working notes).
- **Services:** NOT a section here. One honest footer line to High Encode Learning LLC. davidtiz.com sells the person; High Encode sells the work.

## 7. Design language

- **Colors:** paper `#f4efe6`, ink `#1c1714`, clay `#9b352d` (primary), brass `#c2872f` (secondary, large text/fills only), plus the warm dark mode set. Full values in the token proposal.
- **Typography:** serif display for H1/H2 (editorial, human, e.g. a modern serif like Fraunces or Newsreader); grotesque/Geist sans for body (clean, current); monospace (Geist Mono) for labels, status strips, tags, and metadata. The mono is the "instrument panel" voice; the serif is the "person" voice. That pairing is the whole identity in two typefaces.
- **Animation:** restrained and purposeful. Micro-reveals on scroll (fade/translate 8px, fast), a slow single "status" pulse on the NOW strip, hover states that reveal proof metadata. No parallax, no full-screen scroll-jacking, no typing-terminal effect, no particle fields.
- **Interaction ideas:**
  - A `⌘K` command palette for navigation and jumping to any project/note. This is the credible-futuristic "command center" device, useful not gimmicky.
  - Proof tiles with progressive disclosure: collapsed shows the claim, expand shows the evidence (metrics, repo, demo), so the page is calm but deep.
  - A filterable Lab log (tags as mono chips).
  - A subtle "system status" header element (current focus) that makes the site feel live.

## 8. Ten hero headline options

1. I build systems out of many AIs.
2. Multi-AI systems, built and proven in public.
3. I make models, tools, and workflows work together.
4. The operator behind the stack.
5. Coordinating AIs into systems that hold up.
6. Security-minded automation, studied in the open.
7. I build the glue between models, tools, and humans.
8. Less "uses AI," more "makes AI systems work."
9. A field lab for AI orchestration and defense.
10. I wire models into systems, then try to break them.

## 9. Ten tagline options

1. Systems builder. AI orchestration, security, automation.
2. I coordinate many AIs into useful systems.
3. Build it, secure it, prove it.
4. Public command center and proof-of-work archive.
5. The person who makes the stack cooperate.
6. Prompt defense, automation, and multi-AI workflows.
7. Not one tool. A working system of them.
8. Studied in public, kept as evidence.
9. Where AI systems get built and stress-tested.
10. Operator of models, tools, and workflows.

## 10. Separating personal identity from business and services

- davidtiz.com = the person and the proof. It shows who David is, the systems, the lab, the writing, and a direct contact path. It never lists prices, packages, or a service menu.
- High Encode Learning LLC = the company and the paid work (local-business sites, automations, implementation). It lives at highencodelearning.com with its own commercial brand and Stripe.
- The bridge: one restrained footer/contact line, "David Ortiz operates High Encode Learning," linking to the company. That is the only crossover. This mirrors the existing brand boundary and keeps recruiters (who want the person) and clients (who want the company) from getting a muddled message.
- Razon Live Lab, PromptDefenders, csbrainai appear here only as selected-work evidence cards, never as a brand directory.

## 11. Showing proof-of-work without overwhelming

- **Tier it.** Home shows 3 flagship systems. /work shows the full curated set. /lab holds everything else (the long tail of experiments and notes). A visitor never hits a wall of 40 cards.
- **Progressive disclosure.** Each proof tile is calm by default (claim + one line) and deep on demand (expand for metrics, repo, demo, what it proves). The page rewards curiosity instead of front-loading.
- **One format everywhere:** problem -> what I built -> what it proves. Consistency makes scanning fast.
- **Date and tag the lab log** so it reads as an active, current practice, not a static portfolio.
- **Lead with outcomes, not tech lists.** "Cut X to Y" or "caught Z class of failure" beats a logo soup of tools.

## 12. What would make this site feel generic (avoid)

- Dark hacker cliche: terminal green, matrix rain, glitch text, hooded figures, neon-on-black. (The warm palette is the antidote; do not betray it.)
- Generic SaaS template: gradient hero blob, three feature cards with line icons, "Trusted by," fake testimonials.
- Buzzword positioning: "passionate developer," "AI enthusiast," "cybersecurity student." Name the specific edge (multi-AI orchestration + defense) instead.
- Logo soup: a wall of tech badges standing in for actual proof.
- Wall-of-projects with no hierarchy: everything equal weight, nothing flagship.
- Over-animation: scroll-jacking, parallax, typewriter effects, particles. They read as gimmick and hurt credibility.
- Agency-brochure voice on the personal hub: "we deliver solutions." This is a person; write in first person, plainly.
- Pretending it is a company: no pricing tables or service menus here. That is High Encode's job.

## Reconciling a second design opinion (2026-06-17)

A second AI produced an independent identity direction. It converged on the same core (systems builder, field lab, command center, proof tiers, personal-vs-business split), which is a strong signal. Adopted and rejected items below.

### Adopted from the second opinion

- **Role label:** "Technical Systems Builder," defined immediately as "focused on AI orchestration, security-minded automation, prompt defense, and learning systems." Use this as the role line under the name.
- **Tagline (new lead option):** "Tools are powerful. Systems make them useful." This is the strongest tagline on offer; promote it to the primary tagline.
- **/now page:** add as a core page (not optional). It fits a dynamic practice: current builds, current learning track, open problems. Lets the homepage stay calm while signaling momentum.
- **Rename Writing -> Field Notes.** "Blog" and even "Writing" are generic; "Field Notes" fits the lab identity. Each note uses: question -> experiment -> takeaway -> next test.
- **Labs structure:** each lab entry is question -> current experiments -> artifacts -> status. Lab areas: AI Orchestration, Prompt Defense, Security Automation, Learning Systems.
- **System-map hero (boundary-safe version):** a node graph with David at center and four areas (AI orchestration, security automation, prompt defense, learning systems), with project artifacts as proof nodes. IMPORTANT: nodes are evidence of work, not navigation to sibling brand sites. This keeps the command-center feel without becoming an ecosystem router.
- **Five proof layers:** (1) homepage cards (5-7 flagship), (2) case studies, (3) field notes, (4) /now, (5) selected repos. Recruiters/clients stay calm; peers can go deep.
- **Status + type badges on every proof item:** Live / In progress / Archived, and Product / Lab / Client / Security.

### Rejected, with reasons

- **The dark teal palette (`#0E1116` + `#2DD4BF` + `#F2A35E`).** These are Razon Lab's exact tokens. Using them re-merges David Tiz into the lab's identity, which defeats the owner's explicit goal (chosen 2026-06-17) of giving David Tiz a distinct identity. Keep Warm Operator. The field-lab feel comes from structure (system map, mono labels, proof tiles), not from going dark.
- **"davidtiz.com becomes the map of all brands" (listing High Encode, Razon Lab, Prompt Defenders, CSBrainAI as a directory).** This is the ecosystem-router pattern `BRAND-BOUNDARY.md` explicitly forbids. The second AI did not have that governance. Keep projects as proof cards; reference High Encode once as "the company I operate." No brand directory.
- **A `/services` page on davidtiz.com.** Services belong to High Encode Learning LLC. davidtiz.com sells the person, not packages. Keep the one honest link out.

### Net effect on this spec

Positioning, hero, palette (Warm Operator), and the personal-vs-business split stay as written above. Add /now to the sitemap, rename Writing to Field Notes, adopt the system-map hero (boundary-safe), the "Tools are powerful. Systems make them useful." tagline, the "Technical Systems Builder" role label, and the five-layer proof model.

## Next build steps (when ready)

1. Lock the logo (regenerate the clean geometric DO monogram per section 3).
2. Apply the Warm Operator tokens to `globals.css` (light + dark) and run the contrast check.
3. Add the serif display + mono pairing (next/font).
4. Restructure home to the wireframe in section 5; add the NOW status strip.
5. Build the ⌘K command palette and the Lab log with tag filters.
6. Swap og.png and favicon to the new clay/paper mark.
