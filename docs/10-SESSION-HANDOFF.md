# Next-session handoff

Updated October 23, 2026 after the local CMO-003 invalid-link handling. This file is the short continuation entry point.

## Current state

Canonical working copy: `C:\dev\CMO-Roadmap-Generator`. CMO-001 is local commit `77413607aed8630c717c768052e2a2d7dfa7236f` on `cmo-001-supported-dependencies`. CMO-002 is local commit `a07aab2ebb58b31391446418425a8e1e117878b0` on `cmo-002-shared-intake-validation`. Neither was pushed.

CMO-003 was reviewed against the validation record and committed locally on `cmo-003-invalid-link-handling`. No push, deployment, pull request, or email was created.

A results URL with missing or malformed roadmap input now returns HTTP 404 through `notFound()` and `src/app/results/not-found.tsx`. The view says the link is invalid or incomplete, keeps the `?q=`/`?answers=` hint, and routes back to `/intake`. Valid compact links, valid legacy links, and the invalid-q fallback to valid legacy answers still return 200 with the same plans. The email route still returns 400 for a bad token; its copy now says invalid or incomplete because nothing in a token expires.

Checks on Node 22.23.2 and npm 10.9.8: `npm test` 7 passed; `npm run typecheck` passed; `npm run build` passed on Next.js 15.5.28. A recount found 7 tests; an earlier note of 8 counted the suite wrapper. A local production server confirmed 404 on the empty and malformed results URLs, 200 on the valid clinic link and the fallback, 400 on the bad email token, and the default Next 404 on an unknown route. A desktop browser rendered the 404 view and its intake link worked. The 12 demo plans still hash to `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`.

## Active milestone

CMO-003 is committed locally. The next bounded item is CMO-004: the contradictory phase/week scheduling. That directly affects whether someone can trust and follow the generated plan, so it comes before feature expansion or interface polish. CMO-004 requires decision D02 (dependency-aware schedule versus honest priority groups) first. Do not start a redesign, Next 16, a database, or an AI service.

## First actions

1. CMO-003 is committed locally. Keep it unpushed.
2. Resolve D02 with Jacob, then start CMO-004 using the regression cases in the validation document.
3. Keep the demo hash above as the reference until the CMO-004 scheduling change makes a new baseline intentional.

## Known traps

- Old README names removed files and styling libraries.
- `npm test` and `npm run typecheck` exist. There is still no lint script.
- Setting STRATEGY_CONTACT_EMAIL does not fix the hardcoded client mailto address.
- A compact schema version is not a rules/content version.
- A passing build, a clean audit, or a correct HTTP status does not validate marketing advice or real delivery.
- Next 15.5.28 alone does not move PostCSS or Sharp to the patched versions. Keep the overrides with the Next pin.
- The demo hash is a stability check. It is not evidence that the displayed weeks are a schedule.
- The results 404 view renders from the streamed flight payload and needs JavaScript. The no-JavaScript fallback is still open.

## Decisions and external actions

D01 remains open. D12's 15.x patch is the CMO-001 commit above; Next 16 remains deferred. D13 records the CMO-002 channel normalization. D14 records the CMO-003 invalid-link status policy and is committed locally. D02 blocks CMO-004. No push, deployment, or message was performed. Keep credentials and personal submissions out of this file.
