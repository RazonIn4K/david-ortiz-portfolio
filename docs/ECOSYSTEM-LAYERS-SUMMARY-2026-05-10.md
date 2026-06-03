# Ecosystem Layers Summary - 2026-05-10

This document captures the current state after the multi-site cleanup, proof-app setup, storage review, and visual pass.

## Public Surface Roles

### davidtiz.com

Personal hub and routing layer.

- Explains David Ortiz's work in a casual, personal voice.
- Points client/business inquiries to HighEncode.
- Points AI/RAG proof work to CSBrainAI.
- Points prompt-safety/security proof work to Prompt Defenders.
- Hosts the AI assistant that explains the ecosystem and routes visitors.

### HighEncode

Business-facing local implementation surface.

- Focus: local-business websites, quote flow, bilingual pages, lead capture, handoff, and owner-friendly automation.
- Should not carry CSBrainAI or Prompt Defenders as footer links unless they are framed as ecosystem links on the personal hub.
- Public story stays local-business implementation, not AI-security or cybersecurity branding.

### CSBrainAI

Private RAG proof asset.

- Focus: cited answers, Supabase vector search, OpenAI embeddings, OpenRouter answer synthesis, validation, rate limiting, and privacy-safe telemetry.
- The app stores curated knowledge chunks in Supabase `rag_docs`.
- User questions are not inserted into Supabase. The API returns `q_hash`, citations, provider/model metadata, and answer text.
- Upstash stores hashed rate-limit identifiers under `csbrainai:ratelimit`.

### Prompt Defenders

AI-security and prompt-risk proof asset.

- Focus: prompt-injection scanning, rule-pack scoring, advisory evidence, optional OpenRouter review, and optional async queue metadata.
- Raw prompt text is not persisted by the app.
- Upstash stores hashed rate-limit identifiers and optional hash-only queue jobs under `prompt-defenders:*`.

## Infrastructure Layers

### Deployment

- Vercel deploys all public Next.js surfaces.
- Production aliases currently verified:
  - `https://davidtiz.com`
  - `https://highencodelearning.com`
  - `https://csbrainai.vercel.app`
  - `https://prompt-defenders.vercel.app`

### Secrets

- Doppler is the local secret source for proof apps.
- Current project/config targets:
  - CSBrainAI: `local-mac-work/dev_csbrainai`
  - Prompt Defenders: `local-mac-work/dev_prompt_defenders`
- Secrets are not printed into docs or chat output.

### Data

- Supabase is used by CSBrainAI for RAG knowledge chunks and pgvector search.
- Upstash Redis is shared by CSBrainAI and Prompt Defenders because the current free tier has one database.
- Redis key namespaces separate the apps:
  - `csbrainai:ratelimit`
  - `prompt-defenders:ratelimit`
  - `prompt-defenders:queue:*`
- Rate-limit identifiers are now HMAC-hashed before reaching Redis.

### Models

- CSBrainAI uses OpenAI embeddings for vector retrieval.
- CSBrainAI uses OpenRouter for answer synthesis.
- Prompt Defenders uses OpenRouter for synchronous live deep review when enabled.
- Current low-cost model default for both proof apps is `mistralai/mistral-small-3.2-24b-instruct`.

### Observability

- CSBrainAI has Sentry-oriented hooks and metrics plumbing; optional `SENTRY_DSN` is still the remaining support key.
- Prompt Defenders has Datadog RUM copy and monitoring hooks.
- Browser verification confirmed app-owned `localStorage`, `sessionStorage`, and first-party cookies are empty during the main proof flows.

## Work Completed

- Repositioned the ecosystem so each domain has a clear role.
- Removed stale HighEncode footer references to CSBrainAI and Prompt Defenders.
- Overhauled davidtiz.com as the personal hub.
- Added and verified the davidtiz.com AI assistant.
- Wired CSBrainAI live RAG with Supabase, OpenAI embeddings, OpenRouter, and Upstash.
- Wired Prompt Defenders with production API auth, hash salt, Upstash queue/rate limiting, and OpenRouter live review.
- Added route redirects:
  - Prompt Defenders `/scanner` -> `/#scanner`
  - Prompt Defenders `/about` -> `/#about`
  - CSBrainAI `/ask` -> `/#ask`
  - CSBrainAI `/demo` -> `/#ask`
- Fixed a privacy gap by hashing rate-limit identifiers before storing them in Upstash.
- Removed old raw-IP rate-limit keys from the shared Upstash database.
- Added data persistence docs for CSBrainAI and Prompt Defenders.
- Added route verification docs for CSBrainAI and Prompt Defenders.
- Added deterministic visual diagrams:
  - `public/visuals/gemini-ecosystem-hero.webp`
  - `public/visuals/ecosystem-layer-map.svg`
  - `public/visuals/proof-asset-gallery.svg`
  - `public/visuals/local-proof-stack.svg`
  - `public/visuals/bilingual-service-map.svg`
  - `public/visuals/owner-handoff-board.svg`
  - `public/visuals/csbrain-data-flow.svg`
  - `public/visuals/csbrain-answer-trace.svg`
  - `public/visuals/csbrain-knowledge-base.svg`
  - `public/visuals/prompt-data-flow.svg`
  - `public/visuals/prompt-risk-matrix.svg`
  - `public/visuals/prompt-evidence-report.svg`
- Added HighEncode visual-system sections to the homepage, Services page, and Start Here page so the local-business offer is explained with proof-stack, bilingual-service, and owner-handoff diagrams.
- Added CSBrainAI visual proof cards for answer trace and knowledge-base pipeline.
- Added Prompt Defenders visual proof cards for risk matrix and evidence report.
- Generated the ecosystem hero image through the Gemini GUI using the logged-in Chrome browser, then optimized it to WebP before placing it on davidtiz.com.
- Submitted the same image-generation request through ChatGPT's GUI in a temporary chat. That generation remained in a finalizing state during this pass, so the production asset used is the completed Gemini image.

## Verification Completed

- CSBrainAI:
  - `npm run lint`
  - `npm run type-check`
  - `npm test -- --runInBand`
  - `npm run build`
  - Production `/api/answer` returns `q_hash`, citations, model, and provider.
  - Supabase `rag_docs` count checked: 3 sample chunks.
  - Upstash raw-IP key check: 0 raw-IP keys.

- Prompt Defenders:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
  - Production `/api/scan` returns a critical result for a prompt-injection sample.
  - Upstash raw-IP key check: 0 raw-IP keys.

- Browser:
  - Live UI routes loaded for Prompt Defenders and CSBrainAI.
  - Main proof flows worked in browser automation.
  - App-owned browser storage was empty after the flows.
  - Axe checks returned 0 WCAG 2.0-2.2 A/AA violations on the proof-app root and focused sections.

- HighEncode:
  - `xmllint --noout public/visuals/*.svg`
  - `npm run lint -- --quiet`
  - `npm run build`
  - `npm run type-check` after `.next/types` regenerated
  - `npm run links:audit`
  - `npm run a11y:themes`
  - `npm run responsive:audit`
  - Production visual routes returned `200 image/svg+xml`
  - Browser screenshots were taken for home, Services, and Start Here across desktop and mobile.
  - Local dev server was restarted on `http://localhost:3002` after stale chunk references caused false error-boundary audit failures.

- Public deploys:
  - `https://highencodelearning.com`
  - `https://davidtiz.com`
  - `https://csbrainai.vercel.app`
  - `https://prompt-defenders.vercel.app`

## Remaining Decisions

- Decide whether to add paid Upstash billing so Prompt Defenders can have its own Redis database instead of sharing the free-tier CSBrainAI database.
- Add optional `SENTRY_DSN` to CSBrainAI if production telemetry should be fully enabled.
- Decide whether to keep the Gemini-generated ecosystem hero as the lead personal-site visual or make the deterministic `ecosystem-layer-map.svg` the first visual for clarity.
- Commit the current work in intentionally scoped commits. The repos contain broader dirty changes from the full redesign effort, so commits should be separated by site and by responsibility.
