# Architecture Boundaries

Created: 2026-06-14

This document is the canonical repo-level reference for clean-architecture boundaries in `david-ortiz-portfolio`.

The app is intentionally small, so do **not** over-abstract. The goal is to prevent business rules from drifting deeper into framework files while keeping changes practical and testable.

## Layer Map

| Layer | Current Files / Modules | Rule |
|---|---|---|
| Domain | `data/content.ts`, durable contact/content rules, public contact constants | No Next.js imports. Plain data, types, and business language only. |
| Application / Use Cases | Contact-intake policy, WhatsApp redirect behavior, chat fallback/rate-limit decisions; currently partly embedded in route handlers | Extract here when behavior grows or needs focused tests. Keep framework types out where practical. |
| Interface Adapters | `app/api/*/route.ts`, `app/contact/whatsapp/route.ts`, `app/contact/whatsapp/challenge/route.ts` | Translate `NextRequest`/`NextResponse` to use-case inputs/outputs. Keep handlers thin when possible. |
| Frameworks / Drivers | `app/page.tsx`, `app/layout.tsx`, Vercel/Next config, Redis/OpenRouter/Meta SDK boundaries | Most volatile layer. Do not let framework concerns leak into domain data. |

## Modernization Rule

Before refactoring an under-tested behavior, add or extend a characterization test that captures current behavior.

For the WhatsApp redirect lane, preserve:

- challenge/cookie validation,
- full challenge value integrity (`token.issuedAt` must match between query and cookie),
- expiry enforcement,
- replay blocking,
- burst/risk scoring,
- text sanitization,
- redirect message behavior,
- `no-store` and `noindex,nofollow` response headers where applicable.

## When To Extract A Use Case

Extract behavior out of a route handler when at least one of these becomes true:

- the same rule is needed from more than one route/component,
- tests require too much `NextRequest`/`NextResponse` setup,
- the route mixes security validation, business decisions, and framework response building,
- a future change risks altering user-facing/business behavior,
- AI agents keep editing adapter code when they should be editing business rules.

## What Not To Do

- Do not move public contact constants into `.env`; they are intentionally public business details.
- Do not add abstraction just to satisfy a pattern.
- Do not let route handlers become the permanent home for growing business rules.
- Do not let domain/data files import Next.js, Vercel, SDKs, or request/response types.
- Do not make broad refactors without characterization tests first.

## Verification Expectations

For modernization/refactor work, run the narrowest useful check first, then broaden:

```bash
npm test -- --run app/contact/whatsapp/route.test.ts
npm test
npm run lint
npm run build
```

If a command cannot be run, record that clearly in the session log.
