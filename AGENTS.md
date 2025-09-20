# Repository Guidelines

## Project Structure & Modules
Personal-Website ships as a static frontend with optional serverless APIs. The root hosts `index.html`, `styles.css`, `script.js`, and `config.js`. Client enhancers (`analytics-tracker.js`, `enhanced-chat-system.js`, `progressive-enhancement.js`) layer progressive features on top of the markup. Backend-facing logic lives in `api/` (`analytics.js`, `contact.js`, `chat-log.js`, `mongodb-client.js`) and is tuned for Vercel’s Node runtime. Operational helpers reside in `scripts/`, while docs (`README.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`, `MONGODB_INTEGRATION.md`) track architecture and deployment decisions.

## Build, Setup & Local Development
Install dependencies once with `npm install`. Use `npm run dev` (Python HTTP server on :8000) for local previews; `npm run build` simply validates that no build step is required. Before exercising APIs, copy `.env.example` to `.env.local`, fill MongoDB and OpenRouter values, then warm collections with `node scripts/setup-mongodb-indexes.js setup`. Run the integration suite via `node --env-file=.env.local scripts/test-integrations.js`; the 15+ checks cover MongoDB connectivity, endpoint rate limits, and data sanitation paths.

## Coding Style & Naming Conventions
Follow the existing ES6 class patterns in `script.js` and `enhanced-chat-system.js`: PascalCase for classes, camelCase for members, and 2-space indentation. Prefer `const`/`let`, keep DOM work gated behind `DOMContentLoaded`, and preserve progressive-enhancement guards (feature detection blocks, serverless fallbacks). CSS keeps kebab-case selectors (`.hero-banner`), while env variables remain SCREAMING_SNAKE_CASE. Avoid hard-coded secrets; use `process.env` fallbacks and document defaults.

## Testing & Quality Gates
There is no unit test harness; confidence comes from the integration runner and manual smoke checks. Extend `scripts/test-integrations.js` whenever endpoints or collections evolve, mirroring the existing pattern: logging helpers plus explicit assertions for success flags, TTL expirations, and schema validation. Before opening a PR, run the integration suite, exercise the AI chat session limits, confirm analytics batching, and verify offline storage fallbacks in your browser.

## Security, Rate Limits & Resilience
All endpoints enforce rate limits (analytics 60/min, contact 5/hour, chat 10/min) and rely on server-side validation, spam detection, and PII redaction. MongoDB TTL indexes handle retention (90-day chat logs, 1-year analytics, 2-year contacts); re-run the setup script after schema changes. Client code must keep localStorage fallbacks intact for degraded modes and avoid leaking secrets or verbose console logs. Monitor connection caching notes in `mongodb-client.js` to stay serverless-friendly.

## Commit & PR Process
Commits use short, imperative subjects (e.g., “Secure API keys…”), occasionally prefixed with uppercase scopes for broad work (`ENHANCEMENT:`). For pull requests, clarify the visitor-facing impact, list verification steps (`npm run dev`, integration script), and attach screenshots for UI tweaks. Link related issues/docs, flag required environment updates, and mention any MongoDB migrations or index adjustments to keep reviewers aligned.
