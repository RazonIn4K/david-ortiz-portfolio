# David Tiz brand: Warm Operator token set (proposal)

Status: PROPOSAL, not yet applied to `app/globals.css`. Owner decision 2026-06-17 chose the "Warm Operator" direction to give davidtiz.com an identity distinct from Razon Lab (which owns dark + teal). This file is the drop-in replacement for the `--dtz-*` color tokens. Review, then apply to the `.dtz-site` light and dark blocks in `globals.css`.

## Why this palette

Razon Lab = cool, dark, electric teal (the lab is alive). David Tiz = the person: warm, editorial, grounded, credible. The warm accents (clay, brass) already existed as secondary tokens in the current system, so this is a refinement, not a rebuild. It also creates the maximum visual separation between the two properties.

## Light mode (default)

```css
--dtz-bg: #f4efe6;        /* warm paper */
--dtz-bg-2: #ece4d6;      /* deeper paper, for the page gradient */
--dtz-fg: #1c1714;        /* warm near-black ink */
--dtz-muted: #4a423b;     /* secondary text */
--dtz-subtle: #6f655b;    /* tertiary text / captions */
--dtz-panel: #fbf7f0;     /* cards / raised surfaces */
--dtz-panel-dark: #100d0a;
--dtz-border: #d8cbb8;    /* hairlines */
--dtz-accent: #9b352d;    /* clay — primary accent, links, CTAs */
--dtz-accent-2: #c2872f;  /* brass — secondary accent */
--dtz-accent-3: #8a5a00;  /* ochre — tertiary / highlights */
--dtz-accent-soft: #efe2d0;/* soft clay tint on paper */
--dtz-on-accent: #ffffff; /* text on clay */
--dtz-focus: #9b352d;     /* focus ring */
```

## Dark mode (warm, not the lab's cool dark)

```css
--dtz-bg: #16110d;        /* warm near-black, NOT Razon's #0e1116 cool */
--dtz-bg-2: #1f1813;
--dtz-fg: #f4efe6;
--dtz-muted: #c9bdae;
--dtz-subtle: #a99c8d;
--dtz-panel: #221a14;
--dtz-panel-dark: #0c0907;
--dtz-border: #4a3f34;
--dtz-accent: #e0795f;    /* clay brightened for dark bg */
--dtz-accent-2: #e0a955;  /* brass brightened */
--dtz-accent-3: #d9a441;
--dtz-accent-soft: #3a241d;
--dtz-on-accent: #1c1714;
--dtz-focus: #f0a98a;
```

## Contrast check (verify in the build, do not skip)

- Body ink `#1c1714` on paper `#f4efe6`: very high contrast, passes AA and AAA.
- Clay `#9b352d` on paper `#f4efe6`: about 5.4:1, passes AA for normal text and links.
- Brass `#c2872f` on paper: about 2.6:1 — use brass only for large text, icons, or fills, NOT body links.
- Dark mode clay `#e0795f` on `#16110d`: about 6:1, passes AA.

## Type direction

Keep the current Geist Sans/Mono for UI and code. For the warm-editorial feel, consider a serif for H1/display only (the logo concepts use a serif wordmark). Optional, not required for the palette swap.

## How to differentiate from Razon Lab in one line

Razon Lab is a cool dark lab with a teal glow and an amber spark. David Tiz is warm paper and ink with a clay accent and a brass highlight. Same person behind both, two clearly different rooms.

## Apply steps (when ready)

1. Replace the `--dtz-*` color values in the light `.dtz-site` block with the light set above.
2. Replace the dark-mode `--dtz-*` block with the dark set above.
3. Run the contrast check above; adjust brass usage if any body text uses it.
4. Update `og.png` / favicon to the new clay/paper mark (Canva logo, once chosen).
5. `npm run build` to confirm no token references break, then deploy.
