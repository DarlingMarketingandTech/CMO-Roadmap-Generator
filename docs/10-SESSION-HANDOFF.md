# Next-session handoff

Updated October 24, 2026 after the local CMO-006 starting-action commit. This file is the short continuation entry point.

## Current state

Canonical working copy: `C:\dev\CMO-Roadmap-Generator`. CMO-001 is local commit `77413607aed8630c717c768052e2a2d7dfa7236f` on `cmo-001-supported-dependencies`. CMO-002 is local commit `a07aab2ebb58b31391446418425a8e1e117878b0` on `cmo-002-shared-intake-validation`. Neither was pushed.

CMO-003 was reviewed against the validation record and committed locally as `d6c64cfbee48f7cd471edd76ef9f7204204ef82f` on `cmo-003-invalid-link-handling`. No push, deployment, pull request, or email was created.

CMO-004 was reviewed against D02 and the validation record and committed locally as `ce45be53cc44643a7251076ac0ca30ea881683fa` on `cmo-004-consistent-roadmap-scheduling`. No push, deployment, pull request, or email was created. Actual PDF printing, dark-theme print readability, and email delivery remain unverified.

CMO-005 was reviewed against its acceptance criteria and committed locally as `e71abe40d2f8b651421ba81a859173b3428df0f0` on `cmo-005-reconcile-recommendations`. Professional Services uses general language. A disorganized-stack bottleneck raises MarTech and CRM work even when maturity is solid, and the plan says the answers disagree. The service card no longer claims to follow the scores. D15 records the unchanged service, engagement, and summary order. That disagreement stays a product limitation and needs a coherence review before a public pilot.

CMO-006 is the local commit on `cmo-006-actionable-first-action`, created from that CMO-005 commit. D16 is accepted. Website conversion, CRM cleanup, and attribution cleanup show a starting task, the output to keep, a field-level completion check, and the access or prerequisite. When no channel is named, the website task asks for the desired customer action and does not claim there is no live page or no current traffic. Overall module effort describes the whole module. Scores, module order, phase placement, and service titles are unchanged. The CTA still follows the service title.

A results URL with missing or malformed roadmap input returns HTTP 404 through `notFound()` and `src/app/results/not-found.tsx`. Valid compact links, valid legacy links, and the invalid-q fallback to valid legacy answers still return 200. The plans they render follow the CMO-004 sequencing rule and the CMO-005 recommendation language. The email route still returns 400 for a bad token.

The CMO-003 demo hash remains `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`. The CMO-004 hash remains `6c51827e741cb5c4d49280829ff96cea8e5816eae8d96eb1cf7cea6c554eb217`. The CMO-005 hash is `451f240ca9e2a62ae9db73047817a0940b6f6738f00a36e667818ef243f7472b`.

## Active milestone

CMO-006 starting guidance is in the local commit on this branch. Attribution still depends on the KPI baseline, and saas-reporting still schedules attribution cleanup ahead of that baseline. The page says deeper attribution and channel ROI stay blocked until a written outcome definition and a current number exist. D15's service CTA still names different work from the first scheduled module. The next change points the primary button and mailto subject at the first action, before starting guidance is written for the other seven modules. Leave the service order unchanged. Do not start a redesign, Next 16, a database, or an AI service.

## First actions

1. Review the local CMO-006 commit. The three modules are website conversion, CRM cleanup, and attribution cleanup. The no-channel website task does not infer a missing page or missing traffic.
2. Align the primary CTA with the first useful action. The drafted labels are "Review the page note from this plan," "Review the inquiry list from this plan," and "Review the measurement gap list." Do this before expanding the guidance to the other modules.
3. Keep the branch unpushed. Keep all three demo hashes. Do not overwrite `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`, `6c51827e741cb5c4d49280829ff96cea8e5816eae8d96eb1cf7cea6c554eb217`, or `451f240ca9e2a62ae9db73047817a0940b6f6738f00a36e667818ef243f7472b`.

## Known traps

- Old README names removed files and styling libraries.
- `npm test` and `npm run typecheck` exist. There is still no lint script.
- Setting STRATEGY_CONTACT_EMAIL does not fix the hardcoded client mailto address.
- A compact schema version is not a rules/content version.
- A passing build, a clean audit, or a correct HTTP status does not validate marketing advice or real delivery.
- Next 15.5.28 alone does not move PostCSS or Sharp to the patched versions. Keep the overrides with the Next pin.
- The CMO-003 demo hash still includes catalog weeks inside the saved roadmap JSON. The page no longer renders those strings. The hash is not evidence that attribution waits for a KPI baseline.
- saas-reporting still places attribution-cleanup ahead of kpi-baseline. That limitation is recorded, not solved.
- The results 404 view renders from the streamed flight payload and needs JavaScript. The no-JavaScript fallback is still open.
- Professional Services still cannot tell law, accounting, consulting, and finance apart. The plan uses general language. It does not add a profession question.
- Honoring a messy-stack bottleneck also blocks the embedded engagement format. That side effect is recorded in the validation note.
- The current module outcome bullets still describe finished programs. On the first scheduled module, when it is one of the three D16 modules, those bullets are labeled later work. The other modules still say "Expected outcomes."

## Decisions and external actions

D01 remains open. D12's 15.x patch is the CMO-001 commit above; Next 16 remains deferred. D13 records the CMO-002 channel normalization. D14 records the CMO-003 invalid-link status policy and is committed locally as `d6c64cfbee48f7cd471edd76ef9f7204204ef82f`. D02 is accepted and committed locally as `ce45be53cc44643a7251076ac0ca30ea881683fa`. D15 is committed locally with CMO-005 as `e71abe40d2f8b651421ba81a859173b3428df0f0`. The service disagreement remains a product limitation. D16 is accepted and implemented in the local CMO-006 commit. PDF printing, dark-theme print readability, and email delivery remain unverified. No push, deployment, or message was performed. Keep credentials and personal submissions out of this file.
