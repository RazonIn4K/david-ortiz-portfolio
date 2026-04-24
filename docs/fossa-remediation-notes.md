# FOSSA Remediation Notes

Latest reviewed PR commit: `fa0bac9425daf92152256fc8638f31344b42878f`

## Current Status

- Vercel preview: passing
- FOSSA Security Analysis: passing
- FOSSA Dependency Quality: failing
- FOSSA License Compliance: failing

The PR reduced the public FOSSA scan from `60` issues and `553` dependencies on `main` to `28` issues and `433` dependencies on the latest branch scan.

## Repo-Side Work Already Done

- Removed `@vercel/analytics`.
- Updated Next.js and safe direct framework dependencies.
- Removed unused generated `components/ui` wrappers and the packages they pulled in.
- Replaced removed Lucide brand icon exports with local brand icon wrappers.
- Updated `lucide-react`, `typescript`, and `@types/node`.
- Kept `eslint` on `9.39.4` because ESLint 10 currently breaks the `eslint-config-next` plugin stack.

## Remaining Local License Sources

These are the remaining packages with licenses that commonly trigger FOSSA policy review:

| Package | License | Source | Notes |
| --- | --- | --- | --- |
| `caniuse-lite` | `CC-BY-4.0` | `next`, `browserslist` | Framework/browser data dependency. |
| `@img/sharp-libvips-darwin-arm64` | `LGPL-3.0-or-later` | optional `sharp` dependency from `next` | Optional image stack. `next.config.mjs` already has `images.unoptimized = true`, but the optional dependency remains in the npm lockfile. |
| `axe-core` | `MPL-2.0` | `eslint-config-next` via `eslint-plugin-jsx-a11y` | Development-only lint accessibility dependency. |
| `lightningcss` | `MPL-2.0` | `@tailwindcss/postcss` | Build-time Tailwind dependency. Required for the current build. |
| `lightningcss-darwin-arm64` | `MPL-2.0` | optional native package for `lightningcss` | Optional native package, but omitting optional dependencies breaks the build. |
| `argparse` | `Python-2.0` | `eslint` via `js-yaml` | Development-only lint dependency. |

## Tested But Not Kept

- `npm ci --omit=optional`: not viable. The build fails because Tailwind needs the optional `lightningcss` native package.
- `eslint@10.2.1`: not viable yet. Lint fails inside the current `eslint-config-next` plugin stack.
- Broad `npm update`: not kept. It created an invalid optional WASM dependency tree for `@napi-rs/wasm-runtime`, so `npm ls --all` failed.

## Required FOSSA-Side Actions

The remaining failures need FOSSA maintainer access:

1. Open the latest FOSSA scan for the PR commit.
2. Review the active License Compliance issues.
3. Ignore or approve dev-only and optional framework/tooling dependencies where appropriate.
4. Re-run the FOSSA policy scan.

Relevant FOSSA docs:

- Ignoring a Dependency: https://docs.fossa.com/docs/ignoring-a-dependency
- Reviewing Licensing Issues: https://docs.fossa.com/docs/reviewing-licensing-issues
- Ignoring Open Source Package Issues: https://docs.fossa.com/docs/ignoring-open-source-package-issues
