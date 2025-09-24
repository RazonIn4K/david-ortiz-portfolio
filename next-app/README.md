# Next.js App (next-app/)

This directory contains the Next.js 14 App Router application for the portfolio.

## Local development

1. Install dependencies
   
   ```bash
   npm install
   ```

2. Run the dev server
   
   ```bash
   npm run dev
   ```

3. Lint and typecheck
   
   ```bash
   npm run lint
   npm run typecheck
   ```

4. Build
   
   ```bash
   npm run build
   ```

## Tech

- Next.js 14 + App Router
- TypeScript
- Tailwind CSS (configured via `postcss.config.js` and `tailwind.config.ts`)
- Vercel Analytics & Speed Insights

## SEO

- `app/robots.ts` and `app/sitemap.ts` are configured.
- Open Graph image is provided by `app/opengraph-image.tsx`.

## CI

A GitHub Actions workflow `.github/workflows/next-app-ci.yml` runs typecheck, lint, and build on PRs and on pushes to the migration branch.
