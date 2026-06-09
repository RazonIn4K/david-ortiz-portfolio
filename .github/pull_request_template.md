# Pull Request

## Summary

<!-- Provide a concise description of what changed and why -->

## Change Type

- [ ] UI/UX or layout update
- [ ] Content/copy update
- [ ] Data/content.ts update
- [ ] AI assistant or API change
- [ ] Assets/branding (icons, images, video)
- [ ] Config/build/dependencies
- [ ] Docs/ops

## Scope (check all that apply)

- [ ] app/ (routes, layout, metadata)
- [ ] components/
- [ ] data/
- [ ] app/api/chat/route.ts
- [ ] public/ assets
- [ ] config files (next.config, tsconfig, eslint, vercel)
- [ ] scripts/ or docs/

## Changes Made

- 
- 
- 

## QA Checklist

### Core

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] If dependency files changed: dependency and FOSSA scan checklist completed
- [ ] Manual smoke test on key pages (`/`, `/contact`, `/portfolio`, `/pay`)

### Content & Links (if applicable)

- [ ] Links/CTAs validated
- [ ] Copy updated in `data/content.ts` (or noted exceptions)
- [ ] Metrics/pricing/claims verified

### AI Assistant (if applicable)

- [ ] Prompt/behavior updates tested end-to-end
- [ ] Rate limiting still enforced
- [ ] Env vars checked: `OPENROUTER_API_KEY`, `SITE_URL`, `OPENROUTER_MODELS` / `OPENROUTER_MODEL`

### Assets & Branding (if applicable)

- [ ] Favicons updated in `public/` and `app/layout.tsx`
- [ ] Social preview/OG updates documented (if used)
- [ ] Images optimized and sized appropriately

## Deployment Notes

- [ ] Vercel preview checked
- [ ] Environment/config updates documented

## Screenshots / Recordings

**Before**:

**After**:

## Additional Notes

<!-- Anything else reviewers should know -->
