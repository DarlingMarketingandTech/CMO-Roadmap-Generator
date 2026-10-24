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
| D02 | Real schedule or priority groups? | Keep ranked phase windows as suggested sequencing. Omit modules scored at or below zero. Preserve positive-score order and phase placement. Leave attribution-before-baseline unresolved. | Accepted and implemented locally on October 24, 2026. Committed locally. PDF printing, dark-theme print readability, and email delivery remain unverified. |
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
| D15 | When should the service card follow the scored modules? | Keep the existing service, engagement, and summary branch order. Say so when bookings and ROI, or retention and conversion, both apply. Do not claim the service follows the scores. | Recorded with CMO-005. The false score claim is removed and the split is explained. The disagreement remains a product limitation and needs a coherence review before a public pilot. Service order was not changed. |

None of these choices needs to block source review, fixtures or a dependency assessment. Ask only when the actual work depends on the answer.

## Outstanding evidence gaps

No target-user usefulness tests, actual email delivery/bounce results, production environment validation, current mobile/keyboard/print evidence, storage/provider choice, conversion baseline or verified commercial outcome exists in this audit. The knowledge-engine connection failed; historical Drive screenshots were located but not reviewed as runtime evidence.

## Decision entry template

Decision ID and date; owner; status (proposed/accepted/superseded); evidence/problem; options; chosen approach and reason; affected contracts/fixtures; costs and privacy implications; what would cause reconsideration; links to work item and verification.

## Plan revision rule

When changing direction, state what evidence changed and what work will stop or move later. Keep the roadmap and backlog consistent. Do not create another planning document as a substitute for resolving the decision here.

## D02 — Phase windows, effort, and dependencies

Decision ID: D02. Date: October 24, 2026. Owner: Jacob. Status: **accepted and implemented locally. Committed on `cmo-004-consistent-roadmap-scheduling`.** Actual PDF printing, dark-theme print readability, and email delivery remain unverified.

Jacob accepted the recommendation on October 24, 2026. A module whose final score is at or below zero is not recommended by the current assessment. It is not listed as a deferred commitment for later. Phase windows are suggested sequencing, because the app has not measured available hours or task dependencies. Attribution cleanup before the KPI baseline stays an explicit limitation. Scoring, score floors, caps, commercial engagement copy, and prerequisite behavior were not changed. The checks are in the CMO-004 validation record.

### Evidence

Ranking and phase placement already happen in `composeRoadmap`. `computeModuleScores` adds rule weights, then `orderModuleIdsFromScores` sorts descending and keeps six modules for `founder-only` or eight otherwise. The composer slices that list into Phase 1 / Phase 2 / the rest. Founder-sized lists use 2 then 2. Larger lists use 3 then 3. The phase objects carry fixed windows: Days 1–30, Days 31–60, and Days 61–90.

The week string on each module is not an output of that slice. `ALL_MODULES` in `src/lib/modules.ts` stores a catalog phase and a catalog week together, as a default 12-week template:

| Catalog phase | Modules | Catalog weeks | Effort |
|---|---|---|---|
| 1 | brand-strategy, gtm-planning | Week 1–2 | high |
| 1 | martech-audit | Week 2–3 | medium |
| 1 | kpi-baseline | Week 3–4 | medium |
| 2 | website-conversion | Week 5–7 | high |
| 2 | crm-cleanup | Week 5–6 | medium |
| 2 | local-seo | Week 6–8 | medium |
| 3 | conversion-optimization | Week 9–11 | medium |
| 3 | email-automation | Week 9–10 | medium |
| 3 | attribution-cleanup | Week 11–12 | high |

Those week strings are intended placement inside that template. Several modules share a week range, so the string is not an exclusive duration. `effort` is a separate `low` / `medium` / `high` field, and the results page renders it beside the week. No module record has a prerequisite id. The only prerequisite sentence in the engine is prose: when messaging is the bottleneck, positioning is "treated as prerequisite to efficient acquisition." The scheduler does not read that sentence.

`ResultsDisplay` prints the assigned phase window and the catalog week on the same card. Print uses that same component. `@media print` hides the toolbar and shows a document title. It does not hide `.moduleWeek`, so a printed plan shows the same contradiction. `roadmapToEmailModel` sends the assigned phase title, the day window, and the module titles. It does not send week strings or effort. Email and the page can therefore describe the same modules while only the page invents a second clock.

The recorded demo hash `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14` is the SHA-256 of the key-sorted full roadmap JSON for the 12 demos. It was reproduced on October 24, 2026 from CMO-003 commit `d6c64cfbee48f7cd471edd76ef9f7204204ef82f`. The preimage is `src/lib/fixtures/demo-roadmap-baseline-cmo003.json`. That file still contains the contradictory week strings. It is the baseline to keep.

### Options

1. **Dependency-aware calendar.** Assign start dates from prerequisites, effort, and capacity. The catalog has none of those edges, and it has no hour estimates. A generated date would be a completion promise the rules do not support.
2. **Now / next / later, with the day ranges removed.** This is honest about uncertainty. It also discards the phase windows the ranker already assigns, and it rewrites the 90-day frame the page and email already use.
3. **Recommended.** Keep priority order and the assigned phase windows. Display that window as the timing. Stop displaying catalog weeks. Defer modules scored at or below zero without pulling later modules forward and without changing how many real modules sit in each phase. Record prerequisite gaps instead of inventing edges that reorder the plan.

Option 3 is the recommendation because the source supports it. The assigned `days` string is the placement the composer calculates. The catalog week is the placement the module author wrote for a different, fixed order. Effort remains effort. Dependencies remain unencoded until a later decision adds a real edge.

### Chosen display rule, if accepted

- Phase placement is the assigned phase and its day window.
- Estimated effort stays the existing low / medium / high band.
- A dependency is an explicit prerequisite edge. None exist today. This change adds none.
- The day window means where the ranked work sits. The heading and the email stop saying the phase is execution that finishes at the end of the window.
- The scheduled module does not carry the catalog week. The catalog in `modules.ts` keeps `phase` and `week` so the baseline and the conflict list remain inspectable.
- Phase width follows capacity, not the count left after omission. Founder-only plans place 2 modules, then 2, then the rest. Every other plan places 3, then 3, then the rest. A phase with no remaining modules stays visible and says "No additional priorities recommended for this phase based on your answers."
- Selection takes the highest scores above zero, up to six for founder-only and eight otherwise. A non-positive module is omitted. It is not recommended by this assessment, and it is not a later commitment. The selector does not backfill past the cap.

Rejected relabel: rewriting Week 5–7 into Week 1–4 because a module landed in Phase 1. That would hide the catalog clock by inventing a new one. The phase window is already the assigned timing.

### Founder-led clinic, before and after

`clinic-bookings`: healthcare, early, more bookings, no leads, SEO and social, basic stack, founder-only. Scores from the current engine:

| Assigned phase | Window | Module | Score | Effort | Catalog placement |
|---|---|---|---|---|---|
| 1 | Days 1–30 | website-conversion | 20 | high | Phase 2, Week 5–7 |
| 1 | Days 1–30 | crm-cleanup | 13 | medium | Phase 2, Week 5–6 |
| 2 | Days 31–60 | local-seo | 12 | medium | Phase 2, Week 6–8 |
| 2 | Days 31–60 | kpi-baseline | 6 | medium | Phase 1, Week 3–4 |
| 3 | Days 61–90 | email-automation | 5 | medium | Phase 3, Week 9–10 |
| 3 | Days 61–90 | brand-strategy | 0 | high | Phase 1, Week 1–2 |

The page currently shows Week 5–7 and Week 5–6 inside Days 1–30, and Week 1–2 inside Days 61–90. Email shows the same six titles and the same day windows, without the week strings. The sprint title is "Local growth program (90 days)".

After the accepted rule, the five positive modules stay in the same phases and the same order. Their cards show the phase window and the effort band. They do not show a week. `brand-strategy` is omitted. The assessment does not recommend it, and the plan does not carry it forward as later work. Top priorities stay Website Redesign, CRM / Lead Flow Cleanup, and Local SEO. Putting the high-effort website module in the first window follows its score. The window is suggested sequencing, not a finish date.

### Non-founder plan, before and after

`ecom-conversion`: ecommerce, growth, more leads, poor conversion, paid search plus email plus social, solid stack, small team. The cap is eight, so the current slice is 3 / 3 / 2.

| Assigned phase | Window | Module | Score | Effort | Catalog placement |
|---|---|---|---|---|---|
| 1 | Days 1–30 | conversion-optimization | 25 | medium | Phase 3, Week 9–11 |
| 1 | Days 1–30 | website-conversion | 24 | high | Phase 2, Week 5–7 |
| 1 | Days 1–30 | email-automation | 17 | medium | Phase 3, Week 9–10 |
| 2 | Days 31–60 | attribution-cleanup | 9 | high | Phase 3, Week 11–12 |
| 2 | Days 31–60 | crm-cleanup | 6 | medium | Phase 2, Week 5–6 |
| 2 | Days 31–60 | kpi-baseline | 3 | medium | Phase 1, Week 3–4 |
| 3 | Days 61–90 | brand-strategy | 0 | high | Phase 1, Week 1–2 |
| 3 | Days 61–90 | gtm-planning | 0 | high | Phase 1, Week 1–2 |

After the accepted rule, the six positive modules stay in those same phases. The non-founder slice stays 3 / 3 / rest even though only six modules remain. Phase 3 stays visible and says "No additional priorities recommended for this phase based on your answers." Brand strategy and go-to-market planning are omitted, not carried as later commitments. Conversion optimization remains first. Removing Week 9–11 from its card does not turn it into a first-month completion promise. Its effort stays medium, and the outcome lines stay definitions of done for the module.

`ecom-traffic-gap` currently selects the same modules, scores, and phases as `ecom-conversion`. The same before/after applies.

### Conflicts this relabel does not solve

These stay unresolved on purpose.

- **Non-positive modules.** Besides the clinic and the two ecommerce demos, the previous selector also scheduled score-zero modules in `local-visibility` (brand-strategy, gtm-planning, martech-audit), `manual-workflow` (brand-strategy), `healthcare-booking-ux` (brand-strategy), and `home-services-local` (brand-strategy). Those modules are now omitted from the page and the email. They are not listed as later commitments.
- **`attribution-cleanup` has no encoded prerequisite.** In `saas-reporting` it scores 17 and is placed in Days 1–30, ahead of `kpi-baseline` at score 12 in the same phase. Its catalog label is Week 11–12. The validation case asks for measurement before advanced attribution. The module data does not say that. This proposal leaves attribution first, shows the Phase 1 window, and does not print Week 11–12. A later decision can add the edge `kpi-baseline` before `attribution-cleanup` and accept the reorder. Until then, the order is rank, and the missing edge is still missing.
- **Pre-launch penalty leak.** For `prelaunch-brand`, conversion-optimization stays at -5 and stays unselected. email-automation is penalized to -2, then the score floor raises it to 1. It falls outside the founder cap, so the current plan and this proposal both leave it out. The floor is untouched here. Raising the cap later would schedule that repaired score unless the floor is fixed separately.
- **`prelaunch-brand` phase 1 is two high-effort modules**, gtm-planning (26) and brand-strategy (24), both catalog Week 1–2, both already in Days 1–30. Dropping the week labels leaves a true phase match. The engagement title remains "Positioning & GTM sprint (2–3 weeks)". That title is a commercial claim. This item does not rewrite it, and the phase window does not become that sprint length.
- **Effort is not a week count.** A high-effort module in a founder phase can still be more work than the window can hold. CMO-006 and D04 own capacity. This decision does not claim the clinic can finish the website module in thirty days.

`law-differentiation`, `law-reputation-site`, `saas-reporting`, `saas-growth-blind`, and `prelaunch-brand` already select only positive scores. Their module order stays. Their hash still changes if scheduled modules stop carrying catalog weeks.

### Bounded implementation plan

Do this only after the proposal is accepted. One behavior change, then tests, then a new hash recorded beside the old one.

1. In `src/lib/compose-roadmap.ts`, select positive scores up to the capacity cap, slice by capacity as specified above, and return deferred modules separately. Keep `src/lib/rules.ts` weights unchanged.
2. In `src/lib/types.ts`, keep catalog `week` on the module definition. The scheduled value used by the page and email exposes the assigned phase window and the effort band, and it does not expose the catalog week as timing.
3. Add one pure schedule view used by `ResultsDisplay` and `roadmapToEmailModel`. Print stays on `ResultsDisplay`, so it cannot drift. Update `src/emails/RoadmapEmail.tsx` to the same phase titles, day windows, module titles, empty-phase sentence, and deferred titles.
4. Replace the results heading "90-day execution by phase" and the email heading "90-day roadmap by phase" with priority-window wording: the day range places the work, and it is not a finish date. Leave engagement titles, outcome bullets, and `src/app/layout.tsx` marketing description for a separate copy pass unless the accepted review asks for the layout sentence in the same change.
5. Tests live in a new `src/lib/schedule.test.ts`, as listed in the validation document. Run `npm test` and `npm run typecheck`. A browser pass of the clinic and ecommerce results, including print preview, happens after the behavior change. No email is sent.
6. Leave `src/lib/fixtures/demo-roadmap-baseline-cmo003.json` byte-for-byte. Record the new semantic hash in the validation document with the module-id and timing differences. Do not overwrite `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`.

### Reconsider when

Reconsider if Jacob wants the day ranges removed, wants attribution to wait for a KPI baseline, or wants effort translated into hours. Any of those is a different decision. Privacy impact is none: the change recomputes the same synthetic and user-supplied answers and does not add storage. The cost is a changed plan body in email and on screen for every demo whose week label or filler module is visible today.

## D15 — Service order and scored priorities

Decision ID: D15. Date: October 24, 2026. Owner: Jacob. Status: **recorded with CMO-005 and committed locally. The branch order is unchanged. The false “follow your scores” claim is removed and the split is stated in the plan. Explaining the disagreement makes it transparent. The recommendation still needs a coherence review before a public pilot.**

The service card, the engagement, and the opening summary are three separate first-match lists. They are not derived from the highest-scored module. CMO-005 does not reorder them. Two combinations show why a reorder would be a business-policy choice rather than a correction of the answers.

A healthcare business whose goal is Increase Bookings / Appointments and whose bottleneck is Lack of Reporting / ROI Visibility gets three different leads. Local SEO scores 12. Attribution scores 13 and website conversion scores 14, so Local SEO is not the highest-scored module. The service path still chooses Local SEO because bookings is checked before ROI. The engagement is “Measurement baseline + attribution roadmap” and the opening summary starts with ROI, because those two lists check ROI before bookings. The plan now says that split in plain language.

A business whose goal is Improve Retention / LTV and whose bottleneck is Poor Conversion Rates has lifecycle email at 15 and website conversion at 10. The service is still Website Redesign & Conversion UX and the engagement is still “CRO workstream + test backlog,” because conversion is checked before the retention goal. The plan says the commercial path follows the conversion bottleneck and that lifecycle email still receives weight from the retention goal.

The manual-workflow demo is the same kind of split. CRM scores 18 and MarTech scores 15, while website conversion scores 6. The service remains Website Redesign because more-leads is checked before team-capacity workflow relief. The engagement remains “Lead engine blueprint workshop” for the same reason. That order stays until an owner chooses a different precedence.

The results and print sentence is: “These service suggestions follow a fixed order of your answers. They can name different work than the highest-scored modules.” The email template never claimed the services follow the scores. It still shows the service titles the branch lists choose.

Reconsider if Jacob wants one of these lists to follow the top scored module, or wants bookings and ROI, or retention and conversion, to share one winner. Prerequisite edges, channel-specific strategy, and a new profession question are separate decisions.
