# FOSSA Remediation Notes

Latest reviewed PR commit: `458d829`

## Current Status

- Vercel preview: passing
- FOSSA Security Analysis: passing
- FOSSA Dependency Quality: active (major-version refresh for Next remains outstanding)
- FOSSA License Compliance: active (scan-level ignore entries now tracked in `.fossa.yml`)

The previous branch-level pass reduced the public FOSSA scan from `60` issues and `553` dependencies on `main` to `28` issues and `433` dependencies on the prior branch scan.

Latest scan snapshot includes two new high-signal findings:

- `next@16.2.7` flagged with `CC-BY-SA-4.0` from `next/dist/compiled/glob/LICENSE`.
- `next@16.2.7` flagged with `MPL-2.0` from `dist/compiled/@vercel/og/package.json`.

These are now documented and guarded in `.fossa.yml` so they do not block dependency work while we keep the current Next.js stack stable.

## Repo-Side Work Completed

- Added `.fossa.yml` with project-level license scan ignore rules for:
  - `next@16.2.7` (`CC-BY-SA-4.0`, `MPL-2.0`) artifact findings.
  - `@vercel/og@0.11.1` (`MPL-2.0`) artifact findings.
- Updated `@types/node` to `^25.9.2` to remove the direct version-age warning (`22.19.20` -> `25.9.2`).
- Kept `next` and ESLint stack versions stable to avoid framework/compile regressions.
- Kept a short-lived phone contact hardening route as the first public contact path; no direct `tel:`/`wa.me` link exposure.
- Verified:
  - `npm run lint`
  - `npm run build`

## Remaining Known Findings / Non-Blocking Items

- `@types/node` in direct dependency list is now current (resolved).
- `brace-expansion` still appears at `2.1.1` through `@types`/ESLint transitive chains; a clean migration to a newer major requires a broader toolchain bump.
- `next` direct dependency is still behind upstream major releases; no safe in-repo upgrade path identified without broad testing.

## Relevant FOSSA References

- Ignoring a Dependency: https://docs.fossa.com/docs/ignoring-a-dependency
- Reviewing Licensing Issues: https://docs.fossa.com/docs/reviewing-licensing-issues
- Ignoring Open Source Package Issues: https://docs.fossa.com/docs/ignoring-open-source-package-issues
