# FOSSA Remediation Notes

Last observed hosted scan: PR #87 commit `660bb809a6f2f8c4c4554bc605c4c6a477b245c8` on 2026-08-11.

The counts below belong to that exact commit. A later config or documentation commit must receive its own hosted scan before its status can be described as current.

## Current Status

- Vercel preview: passing at the scanned commit
- FOSSA Security Analysis: passing at the scanned commit
- FOSSA Dependency Quality: failing with 3 dependency-quality findings
- FOSSA License Compliance: failing with 15 policy flags and 1 policy conflict

The 16 license-policy results and 3 dependency-quality results remain unresolved. Updating a version-specific locator does not waive them, establish a legal disposition, or prove that a later scan will pass. No LGPL ignore is added or changed by this refresh.

## Known Scanner State

- `next@16.3.0` retains the locally verified bundled artifact license matches covered by the existing narrow ignore:
  - `CC-BY-SA-4.0` (`next/dist/compiled/glob/LICENSE`)
  - `MPL-2.0` (`next/dist/compiled/@vercel/og/package.json`)
- `brace-expansion@2.1.4` is enforced by the root override across the relevant ESLint dependency chains.
- `js-yaml@4.3.1` is enforced by the root override in the ESLint dependency graph.
- The hosted scan still reports 3 dependency-quality findings. Their provider-side records, not an inferred package name in this document, are the source of truth for disposition.

The existing `.fossa.yml` entries cover only the named Next.js and bundled `@vercel/og` license matches. They do not convert the remaining scan findings into accepted or non-blocking issues.

## Recent Repo-Side Work

- Pinned `next` and `eslint-config-next` to `16.3.0`.
- Raised the `brace-expansion` override to `2.1.4` and added the `js-yaml` `4.3.1` override.
- Updated the existing Next.js FOSSA locator to `npm+next$16.3.0` after confirming the two named bundled artifacts remain present locally.
- Kept the separate `npm+@vercel/og$0.11.1` entry unchanged.
- Added no new license ignore and made no legal or maintainer disposition for the unresolved findings.

## Future Scan Controls

- Before any dependency update PR, refresh the local dependency scan context and compare this file with the live FOSSA scan.
- If a previously ignored issue disappears or changes locator/version, update `.fossa.yml` first and then verify the scan.
- Treat any new dependency issue that is not covered by this document as blocking until reviewed.
- Treat an exact-head hosted scan as the only evidence that a config change affected FOSSA status.
- A dependency scan workflow is tracked in `docs/fossa-scan-playbook.md`.

## Relevant FOSSA References

- [Ignoring a Dependency](https://docs.fossa.com/docs/ignoring-a-dependency)
- [Reviewing Licensing Issues](https://docs.fossa.com/docs/reviewing-licensing-issues)
- [Ignoring Open Source Package Issues](https://docs.fossa.com/docs/ignoring-open-source-package-issues)

## Out-of-Date Item Check (Quick)

- Confirm the resolved graph contains `next@16.3.0`, `brace-expansion@2.1.4`, and `js-yaml@4.3.1`.
- Do not infer that those three packages account for the provider's 3 dependency-quality findings; inspect the hosted finding records.
- Do not add a license ignore solely to make a status check green. License conflicts require explicit legal or maintainer review.
