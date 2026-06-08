# FOSSA Remediation Notes

Latest reviewed PR commit: `11c6fa2`

## Current Status

- Vercel preview: passing
- FOSSA Security Analysis: passing
- FOSSA Dependency Quality: active (manual review remains for `next` major-version drift)
- FOSSA License Compliance: active (non-blocking licenses are documented and tracked in `.fossa.yml`)

## Known Scanner State

- `next@16.2.7` shows artifact license matches:
  - `CC-BY-SA-4.0` (`next/dist/compiled/glob/LICENSE`)
  - `MPL-2.0` (`dist/compiled/@vercel/og/package.json`)
- `brace-expansion` appears as transitive at `2.1.1` via transitive `@typescript-eslint`/`eslint` chains.
- FOSSA policy still flags `next` as older than current upstream.

These findings are tracked as non-blocking in `.fossa.yml` while we preserve stack stability.

## Recent Repo-Side Work

- Added/kept `.fossa.yml` ignore entries for the Next.js internal license findings:
  - `next@16.2.7` (`CC-BY-SA-4.0`, `MPL-2.0`)
  - `@vercel/og@0.11.1` (`MPL-2.0`)
- Upgraded `@types/node` to `^25.9.2` (the direct dependency age warning at `22.19.20` is no longer active).
- Kept the phone-contact hardening path as the first public contact mechanism; no bare `tel:` or direct `wa.me` links are rendered on public pages.
- Verified:
  - `npm run lint`
  - `npm run build`

## Future Scan Controls

- Before any dependency update PR, refresh the local dependency scan context and compare this file with the live FOSSA scan.
- If a previously ignored issue disappears or changes locator/version, update `.fossa.yml` first and then verify the scan.
- Treat any new dependency issue that is not covered by this document as blocking until reviewed.
- A full dependency jump plan (including `next` and `eslint` stack refresh risk) is tracked in `docs/fossa-scan-playbook.md`.

## Relevant FOSSA References

- [Ignoring a Dependency](https://docs.fossa.com/docs/ignoring-a-dependency)
- [Reviewing Licensing Issues](https://docs.fossa.com/docs/reviewing-licensing-issues)
- [Ignoring Open Source Package Issues](https://docs.fossa.com/docs/ignoring-open-source-package-issues)

## Out-of-Date Item Check (Quick)

- `next@16.2.7` is intentionally held stable until a broader framework upgrade is scheduled.
- `brace-expansion@2.1.1` is transitive and currently accepted for this project’s current lint/toolchain matrix.
