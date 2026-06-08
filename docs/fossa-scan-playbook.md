# FOSSA Scan Playbook (Portfolio Repo)

Goal: keep dependency scans predictable, keep useful findings reviewable, and avoid losing track after dependency churn.

## Current known accepted issues

- `next@16.2.7`
  - `CC-BY-SA-4.0` in `next/dist/compiled/glob/LICENSE`
  - `MPL-2.0` in `dist/compiled/@vercel/og/package.json`
  - Tracked in `.fossa.yml` as non-blocking
- `brace-expansion@2.1.1`
  - Transitive via `@typescript-eslint`/`eslint`
  - Accepted without framework bump for now

If any of the above changes locator/version on future scans, update:

- `.fossa.yml` first (locator/versions)
- `docs/fossa-remediation-notes.md`
- PR notes/changelog for this scan change

## Pre-merge dependency check

Run before opening PRs that touch:

- `package.json`
- `package-lock.json`
- `.fossa.yml`

1. `npm install`
2. `npm run lint`
3. `npm run build`
4. Re-check dependency state:
   ```bash
   npm outdated --json
   npm ls brace-expansion
   ```
5. Re-run/trigger the FOSSA scan for this branch.
6. In FOSSA, resolve scan findings with this rule:
   - **Existing expected issue + no location/version change**: no action except adding scan run timestamp in PR notes
   - **Existing expected issue + new locator/version**: update ignore + docs in the same PR
   - **Any new denied security issue**: block merge until remediated
   - **Any new denied license issue**: block unless legally reviewed and intentionally risk-accepted

## Quarterly hygiene

- Confirm `fossa-remediation-notes.md` still reflects the current active findings.
- Review whether the accepted findings are still acceptable for your intended distribution model.
- Add a ticket for intentional `next`/`eslint` toolchain refresh when business risk allows a framework upgrade window.

## Useful reference links

- [Ignoring a dependency](https://docs.fossa.com/docs/ignoring-a-dependency)
- [Ignoring open source package issues](https://docs.fossa.com/docs/ignoring-open-source-package-issues)
- [Reviewing licensing issues](https://docs.fossa.com/docs/reviewing-licensing-issues)
