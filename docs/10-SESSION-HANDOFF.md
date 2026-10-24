# Next-session handoff

Updated October 23, 2026 after the local CMO-001 dependency patch. This file is the short continuation entry point; update it after implementation work rather than duplicating project status across several instruction files.

## Current state

Canonical working copy: `C:\dev\CMO-Roadmap-Generator`. Local branch `cmo-001-supported-dependencies`, based on `origin/main` at `d7ad20bb3df07d6e7be2a5af932f509738a4aede`. This commit is the CMO-001 checkpoint. The branch has not been pushed. No pull request, deployment, issue, or email was created.

CMO-001 is committed locally and is not a release. Next.js is pinned to 15.5.28, Zod to 4.6.7, and Resend to 6.34.1. React and React DOM remain 19.1.0 because the current audit did not flag them. PostCSS 8.5.31 and Sharp 0.35.5 are explicit overrides: Next 15.5.28 still depends on PostCSS 8.4.31, and its Sharp range can still resolve to 0.34.5. Node is pinned to `22.x || 24.x`, with package manager `npm@10.9.8`. This session verified Node 22.23.2. The audit's production deployment note said Node 24.x; that setting was not opened or changed.

The updated lockfile audit reported zero vulnerabilities, including dev dependencies. Clean `npm ci`, `npm run typecheck`, and `npm run build` passed on Next.js 15.5.28. Twelve committed demo plans had the same semantic SHA-256 before and after the dependency change: `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`. That output still contains the known week/phase contradictions. Browser, keyboard, print, and delivery checks remain open.

## Active milestone

The dependency half of M0 is locally checked. The next bounded item is CMO-002: one shared intake schema and a regression for the malformed legacy link. Do not start a redesign, Next 16 migration, database, or AI service.

## First actions

1. Recheck Next 15 maintenance status before a later release. On October 23, 2026 the support page still listed 15.x as Maintenance LTS, while its two-year wording starts at the October 21, 2024 release.
2. Implement CMO-002 on this dependency baseline. Use the demo hash above as the unchanged-behavior reference until a scheduling or validation change is intentional.

## Known traps

- Old README names removed files and styling libraries.
- `npm run typecheck` now exists. Lint and test scripts still do not.
- Setting STRATEGY_CONTACT_EMAIL does not fix the hardcoded client mailto address.
- A compact schema version is not a rules/content version.
- A READY deployment, a passing build, or a clean audit does not validate marketing advice or real delivery.
- The only historical Actions success is a Copilot agent run, not application CI.
- Next 15.5.28 alone does not move PostCSS or Sharp to the patched versions. Keep the overrides with the Next pin.
- The demo hash is a stability check. It is not evidence that the displayed weeks are a schedule.

## Decisions and external actions

D01 remains open. This work stayed in the existing repository because moving was not required. D12's 15.x patch is implemented locally; a Next 16 upgrade remains deferred. No push, deployment, or message was authorized or performed. Keep credentials and personal submissions out of this file.
