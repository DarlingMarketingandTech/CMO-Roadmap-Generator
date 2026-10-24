# Next-session handoff

Updated October 23, 2026 after the local CMO-002 intake validation. This file is the short continuation entry point.

## Current state

Canonical working copy: `C:\dev\CMO-Roadmap-Generator`. CMO-001 is local commit `77413607aed8630c717c768052e2a2d7dfa7236f` on `cmo-001-supported-dependencies`, based on `d7ad20bb3df07d6e7be2a5af932f509738a4aede`. It was not pushed.

CMO-002 was reviewed against the validation record and committed locally on `cmo-002-shared-intake-validation`. No push, deployment, pull request, or email was created.

One Zod intake contract now feeds the form, compact `q` links, legacy `answers` links, results rendering, and email submission. Invalid enums, non-array channels, duplicate channels, `none` mixed with real channels, fractional masks, mask bits above 127, and oversized tokens fail closed. A numeric `activeChannels` legacy URL renders the existing error view with HTTP 200 instead of throwing. The email route returns HTTP 400 for that token before composition.

An invalid `q` with a valid legacy payload displays the legacy answers, and the email token is the compact encoding of those validated answers. Empty or omitted channels become `none`. Surviving channels use compact-codec order so the token reopens to the same object. Scoring, phase day labels, and week labels were not changed. The 12 demo plans still hash to `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`.

Checks on Node 22.23.2 and npm 10.9.8: `npm test` 6 passed; `npm run typecheck` passed; `npm run build` passed on Next.js 15.5.28. A local production server confirmed the malformed legacy page, a valid compact clinic page, and the invalid-q fallback. Browser, keyboard, print, and delivery checks remain open.

## Active milestone

CMO-002 is committed. The next bounded item is the rest of CMO-003: results error status behavior and removal of the false expiry sentence. Do not start scheduling, a redesign, Next 16, a database, or an AI service. D02 is still required before CMO-004.

## First actions

1. Decide whether a bad results URL should stay on the current HTTP 200 error view or use a non-success status. Remove the expiry wording when that copy is changed.
2. Keep the demo hash above as the reference until a scheduling change is intentional.

## Known traps

- Old README names removed files and styling libraries.
- `npm test` and `npm run typecheck` exist. There is still no lint script.
- Setting STRATEGY_CONTACT_EMAIL does not fix the hardcoded client mailto address.
- A compact schema version is not a rules/content version.
- A passing build, a clean audit, or HTTP 200 on an error view does not validate marketing advice or real delivery.
- Next 15.5.28 alone does not move PostCSS or Sharp to the patched versions. Keep the overrides with the Next pin.
- The demo hash is a stability check. It is not evidence that the displayed weeks are a schedule.
- The email route can still say link data is expired. Nothing in the token expires.

## Decisions and external actions

D01 remains open. D12's 15.x patch is the CMO-001 commit above; Next 16 remains deferred. D13 records the channel normalization used by CMO-002. No push, deployment, or message was performed. Keep credentials and personal submissions out of this file.
