# FOSSA Scan Playbook (Portfolio Repo)

Goal: keep dependency scans predictable, keep useful findings reviewable, and avoid losing track after dependency churn.

## Current reviewed config entries

- `next@16.3.0`
  - `CC-BY-SA-4.0` in `next/dist/compiled/glob/LICENSE`
  - `MPL-2.0` in `next/dist/compiled/@vercel/og/package.json`
  - Covered by the exact-version `npm+next$16.3.0` entry in `.fossa.yml`
- `@vercel/og@0.11.1`
  - `MPL-2.0` in the declaration bundled through Next.js
  - Existing `.fossa.yml` entry retained unchanged

These entries are narrow records of prior review. They do not mean the overall License Compliance check passes, and they do not waive any other license finding.

## Current resolved dependency graph

- `next@16.3.0`
- `brace-expansion@2.1.4`, enforced through the root override
- `js-yaml@4.3.1`, enforced through the root override

Do not treat the graph versions as a list of FOSSA's provider-side quality findings without inspecting those finding records.

## Hosted scan boundary

The last observed hosted scan was PR #87 commit `660bb809a6f2f8c4c4554bc605c4c6a477b245c8` on 2026-08-11:

- Security Analysis passed.
- License Compliance failed with 15 policy flags and 1 policy conflict.
- Dependency Quality failed with 3 dependency-quality findings.

All 16 license-policy results and all 3 dependency-quality results remain unresolved. This config/documentation refresh adds or changes no LGPL ignore. Re-run FOSSA on the exact new head before claiming any status change.

If a reviewed dependency changes locator/version on a future scan, update:

- `.fossa.yml` first (locator/versions)
- `docs/fossa-remediation-notes.md`
- PR notes/changelog for this scan change

## Pre-merge dependency check

Run before opening PRs that touch:

- `package.json`
- `package-lock.json`
- `.fossa.yml`

1. Use Node 20 and run `npm ci` for a lockfile-exact install.
2. Verify the resolved graph:
   ```bash
   npm ls next brace-expansion js-yaml --all
   ```
3. `npm run lint`
4. `npm test`
5. `npm run build`
6. Re-check dependency age state:
   ```bash
   npm outdated --json
   ```
7. Re-run or trigger the FOSSA scan for the exact branch head.
8. In FOSSA, resolve scan findings with this rule:
   - **Existing expected issue + no location/version change**: no action except adding scan run timestamp in PR notes
   - **Existing expected issue + new locator/version**: update ignore + docs in the same PR
   - **Any new denied security issue**: block merge until remediated
   - **Any new denied license issue**: block unless legally reviewed and intentionally risk-accepted
   - **Any LGPL or other policy conflict**: do not add an ignore without explicit legal or maintainer disposition

## Quarterly hygiene

- Confirm `fossa-remediation-notes.md` still reflects the current active findings.
- Review whether the accepted findings are still acceptable for your intended distribution model.
- Confirm every locator in `.fossa.yml` still matches the exact installed package version and the locally inspected artifact.

## Useful reference links

- [Ignoring a dependency](https://docs.fossa.com/docs/ignoring-a-dependency)
- [Ignoring open source package issues](https://docs.fossa.com/docs/ignoring-open-source-package-issues)
- [Reviewing licensing issues](https://docs.fossa.com/docs/reviewing-licensing-issues)
