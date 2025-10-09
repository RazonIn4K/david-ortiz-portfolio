# David Ortiz — Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./docs/LICENSE)

Modern, fast personal portfolio optimized for performance, accessibility, and SEO.

- **Live demo**: https://david-ortiz-portfolio-flax.vercel.app
- **Goals**: Showcase professional full‑stack skills, clean UI/UX, and pragmatic engineering.

---

## Features
- Interactive UI with progressive enhancement
- Smart lazy‑loading and asset optimization
- Structured CSS and JS modules
- Analytics + speed insights hooks
- Production-ready static deployment (Vercel, GitHub Pages)
- Placeholder-ready showcase assets under `assets/placeholders/` for all Tailwind case-study demos

## Contributor Guide
See [AGENTS.md](./AGENTS.md) for the tailored contributor playbook covering layout, local preview commands, style conventions, testing expectations, and PR norms.

## Getting started

### Prerequisites
- Node.js 18+ (for build/lint tooling)
- Python 3 (for local dev server)

### Install
```bash
npm install
```

### Run locally (with live reload and helpful tooling)
```bash
npm run dev
# serves at http://localhost:9000
```

### Simple static serve (no tooling)
```bash
npm run serve
# serves at http://localhost:8000
```

### Build (minify/optimize assets)
```bash
npm run build
```

### Optimize & audit
```bash
npm run optimize          # build + performance audit
npm run performance-audit # lighthouse against http://localhost:9000
```

### Lint
```bash
npm run lint
npm run lint-fix
```

## Project structure
```
.
├─ index.html
├─ src/
│  ├─ css/                 # styles.css (global styles)
│  ├─ js/                  # modular JS (progressive enhancement, analytics, etc.)
│  ├─ services/            # integration helpers
│  └─ utils/               # shared utilities
├─ assets/                 # images, icons, etc.
├─ scripts/                # build/minify utilities
├─ dev-server.py           # local dev server
└─ vercel.json             # optional Vercel config
```

## Deployment
- Vercel: connect the repo and deploy from the dashboard (recommended)
- GitHub Pages: serve the root as a static site

## Roadmap
- Componentize UI sections and design tokens
- Optional Next.js version for server‑rendered pages
- Expanded project gallery with live demos

## License
This project is licensed under the **ISC** license. See `docs/LICENSE` for details.
