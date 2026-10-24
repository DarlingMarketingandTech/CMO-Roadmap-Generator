# Decisions and open questions

This document separates confirmed task direction from proposals. Do not mark implementation complete by accepting a design decision.

## Confirmed task direction

- Jacob selected CMO Roadmap Generator for deeper development research.
- Prepare an adaptable build plan and Markdown handoff for a project he will create.
- Aim for a valuable GitHub project and eventual LLC website addition.
- This research session did not authorize or perform a new repository, push or release.

## Proposed decisions

| ID | Question | Recommendation to test | Status / trigger |
|---|---|---|---|
| D01 | New repo or dedicated Project board? | Keep one canonical code home; use a board if organizational separation is the only need. Preserve history if moving. | Open before import |
| D02 | Real schedule or priority groups? | Start with a small dependency-aware schedule or honest now/next/later groups; never leave default weeks under contradictory dates. | Open for M1 |
| D03 | Pilot audience? | Owner-led local/professional businesses first; preserve other inputs without claiming equivalent depth. | Proposed for M2 |
| D04 | Add capacity input? | Add only a question that changes selected/deferred work; use approximate hours/readiness rather than false precision. | Decide after scenario review |
| D05 | Minimum lead storage? | Small durable request record through a thin adapter; select provider after retention, ownership and recovery needs. | Open before M3 persistence |
| D06 | Snapshot semantics? | Start with engine/content version metadata and explicit recomputation wording; snapshots if users need historical stability. | Open before changing share contract |
| D07 | Website integration? | Ordinary stable link first; shared code or proxy later only with a proven need. | Open for M5 |
| D08 | AI role? | No requirement in the initial release. Test only a defined comprehension/evidence problem with constrained outputs. | Deferred |
| D09 | Public license? | Owner chooses deliberately after checking rights; source visibility alone is insufficient. | Open before open-source release |
| D10 | Brand/name and services? | Match the selected current LLC site; use stable service IDs separate from labels. | Open before presentation/integration |
| D11 | Inquiry choices? | One reliable email request plus a real discussion link; remove stubs. | Proposed for immediate cleanup |
| D12 | Framework upgrade strategy? | Patch supported 15.x first, isolate any major upgrade from policy changes. Recheck support/advisories when starting. | 15.5.28 patch committed locally as `77413607aed8630c717c768052e2a2d7dfa7236f`. Next 16 remains deferred. |
| D13 | How should imperfect channel lists be read? | Empty or omitted channels mean `none`. Reject duplicates and `none` mixed with real channels. Store surviving channels in compact-codec order so the share token decodes to the displayed answers. | Implemented with CMO-002. Scoring and week labels were not changed. |
| D14 | What HTTP status should an invalid results link return? | A missing or malformed roadmap input is a document that does not exist: HTTP 404 via `notFound()` with a helpful results-segment view and a route back to intake. The email route keeps 400. Links never expire, so error copy says invalid or incomplete. | Implemented with CMO-003 and committed locally. Valid and fallback links stay 200. |

None of these choices needs to block source review, fixtures or a dependency assessment. Ask only when the actual work depends on the answer.

## Outstanding evidence gaps

No target-user usefulness tests, actual email delivery/bounce results, production environment validation, current mobile/keyboard/print evidence, storage/provider choice, conversion baseline or verified commercial outcome exists in this audit. The knowledge-engine connection failed; historical Drive screenshots were located but not reviewed as runtime evidence.

## Decision entry template

Decision ID and date; owner; status (proposed/accepted/superseded); evidence/problem; options; chosen approach and reason; affected contracts/fixtures; costs and privacy implications; what would cause reconsideration; links to work item and verification.

## Plan revision rule

When changing direction, state what evidence changed and what work will stop or move later. Keep the roadmap and backlog consistent. Do not create another planning document as a substitute for resolving the decision here.
