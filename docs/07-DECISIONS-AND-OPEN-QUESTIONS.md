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
| D11 | Inquiry choices? | One reliable email request plus a real discussion link; remove stubs. | Implemented with CMO-007 on November 1, 2026: the two stub intents are removed, the email request is the only form action, and the discussion link defaults to the website contact page. Superseded in part by D18. |
| D12 | Framework upgrade strategy? | Patch supported 15.x first, isolate any major upgrade from policy changes. Recheck support/advisories when starting. | 15.5.28 patch committed locally as `77413607aed8630c717c768052e2a2d7dfa7236f`. Next 16 remains deferred. |
| D13 | How should imperfect channel lists be read? | Empty or omitted channels mean `none`. Reject duplicates and `none` mixed with real channels. Store surviving channels in compact-codec order so the share token decodes to the displayed answers. | Implemented with CMO-002. Scoring and week labels were not changed. |
| D14 | What HTTP status should an invalid results link return? | A missing or malformed roadmap input is a document that does not exist: HTTP 404 via `notFound()` with a helpful results-segment view and a route back to intake. The email route keeps 400. Links never expire, so error copy says invalid or incomplete. | Implemented with CMO-003 and committed locally. Valid and fallback links stay 200. |
| D15 | When should the service card follow the scored modules? | Keep the existing service, engagement, and summary branch order. Say so when bookings and ROI, or retention and conversion, both apply. Do not claim the service follows the scores. | Recorded with CMO-005. The false score claim is removed and the split is explained. The disagreement remains a product limitation and needs a coherence review before a public pilot. Service order was not changed. |
| D17 | How should the stage question read for owner-led businesses? | Four plain-language stages with no revenue bands. Drop Enterprise; old links decode it as Established. | Accepted November 1, 2026 and implemented with CMO-007. See D17 below. |
| D18 | Should the full plan be gated behind an email request? | Results page shows a short version; the full plan is sent only by email, with a consult link and an owner lead copy. | Accepted November 1, 2026 by Jacob and implemented with CMO-007. Overrides the AGENTS.md "no signup" invariant for the full plan only. See D18 below. |
| D16 | What concrete task should the first scheduled module ask the owner to do? | Show one starting task, the artifact it produces, a field-level completion check, and the access or prerequisite that task needs. The effort band is labeled overall module effort. Website conversion, CRM cleanup, and attribution cleanup only. Service order and phase order stay unchanged. The primary contact button and mailto subject follow that starting task. | Accepted October 24, 2026 with the refinements below. Starting guidance is local commit `530242db3e8c04f72d1c8d555f94bfacb27d9a8d`. Contact alignment is committed on `cmo-006-align-primary-cta`. |

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

Reconsider if Jacob wants one of these lists to follow the top scored module, or wants bookings and ROI, or retention and conversion, to share one winner. Prerequisite edges, channel-specific strategy, and a new profession question are separate decisions. The coherence review before a public pilot is still open. D16 proposes the first-action content and a CTA follow-up without changing this order.

## D16 — First action for three modules

Decision ID: D16. Date: October 24, 2026. Owner: Jacob. Status: **accepted October 24, 2026 with the refinements below. Starting guidance is local commit `530242db3e8c04f72d1c8d555f94bfacb27d9a8d` on `cmo-006-actionable-first-action`. Contact alignment is committed on `cmo-006-align-primary-cta`.**

Accepted refinements, applied in the implementation:

- Completion requires named fields in the note. Rereading the note is not the completion check. When an active channel is named, the note names the desired customer action, the current request, and where inquiries arrive. When no channel is named, the note names the desired customer action. That answer does not establish whether a page or traffic exists, so the copy does not claim either is absent.
- A blocked CRM login completes the access check only. The cleanup task stays blocked. That state is not completed cleanup. With no formal stack, the output is the list of inquiry sources the owner can already see.
- Attribution shows the KPI baseline prerequisite beside the starting action. The note needs a written outcome definition and a current number, or an explicit "number unavailable" entry. That entry documents the gap. A usable baseline is the definition plus a current number. Deeper attribution and channel ROI stay blocked until that measurement exists. The scheduler still places attribution ahead of the baseline in saas-reporting.
- The existing effort band is labeled "Overall module effort." It describes the whole module. It does not estimate the starting task.

The starting action renders once, before the top-three cards and before the module outcome list. On that first module, the catalog outcomes are labeled "Later work in this module." Other modules keep "Expected outcomes" and their existing effort wording. The email includes the starting-action fields and, for attribution, the prerequisite. It does not repeat the later outcome bullets. See the CMO-006 validation record for the coverage difference and the CTA mismatch.

CMO-006 asks for one next action, a reason, a prerequisite, the existing effort band, and completion evidence. This proposal covers the first scheduled module only, and only three module ids. The other seven modules keep their current descriptions until a later pass. No new intake question is added. D04 stays open. Service precedence and phase order stay as CMO-005 left them.

The current catalog describes a program and then lists outcomes that read as finished work. Website conversion says a CRO audit is completed, page changes are deployed, and Core Web Vitals are improved. CRM cleanup says data is enriched, routing is corrected, and lead scoring is implemented. Attribution cleanup says an attribution model is implemented, channel ROI is calculated, and budget recommendations are delivered. The intake collects business type, stage, goal, bottleneck, active channels, stack maturity, and team capacity. It does not collect a URL, a tool name, a staff roster, a budget, or hours available. The existing effort value stays a low, medium, or high band. This proposal does not convert that band into hours or days.

The pilot lens is the product brief's owner-led local and professional audience. The drafts below use only answers every current business type already gives, so the same sentences can render for the other types. That does not claim equal industry depth.

### Website conversion

The current module id is `website-conversion`. Its catalog effort band is high. The page labels that band "Overall module effort."

When `activeChannels` is `none`, the intake did not name an active channel. That answer does not establish whether a page or traffic exists. The starting task is to write the one request the first page should make of a visitor. The useful output is that sentence. The task is done when the note names the desired customer action. The only setup required is the goal already selected in intake. The task does not claim a page was redesigned.

When any other channel is selected, the starting task is to open the page a person reaches from one of those channels and write three lines: where the inquiry arrives, what the page currently asks the visitor to do, and the one request the owner wants that page to make. The useful output is that three-line note. The task is done when the note names the desired customer action, the current request, and where inquiries arrive. The setup required is access to a page the owner already uses. The intake does not store a URL, so the sentence asks the owner to open the page they already know. A founder-only answer means this note is the whole first action. The capacity label stays a scope limit. It does not become a staff count or an hour budget.

Deployed design changes and Core Web Vitals work remain later work inside the same module. They are not the definition of done for this task.

### CRM cleanup

The current module id is `crm-cleanup`. Its catalog effort band is medium. The page labels that band "Overall module effort."

When stack maturity is `none`, the selected answer is "No Formal Stack." The starting task is to list every place a new inquiry arrives that the owner can already see, such as an inbox, a phone, a form, a spreadsheet, or a notebook. The useful output is that list, including an explicit blank if one combined list does not exist. The task is done when each place is written down and the note says whether one list shows all of them. The setup required is the owner's own view of those places. The task does not require buying a CRM, enriching records, or implementing lead scoring.

When stack maturity is `basic`, `messy`, `solid`, or `advanced`, the answers say some tooling exists and do not name the product. The starting task is to open the current inquiry list in the tool the owner already uses and mark each row that has no next step. The useful output is that marked list. The task is done when the saved list identifies each record with no next step. The setup required is access to that existing tool. If the owner cannot open it, the note says access is blocked. That completes the access check. The cleanup task stays blocked. It is not completed cleanup.

A founder-only or team-capacity answer means one pass over the current list. The task does not assign additional people.

### Attribution cleanup

The current module id is `attribution-cleanup`. Its catalog effort band is high. The page labels that band "Overall module effort."

The measurement baseline this module needs is `kpi-baseline`: a written definition of the one result named by the selected primary goal, and one current number for that result, or an explicit statement that the number is not available. Hiding the catalog week labels did not put `kpi-baseline` ahead of attribution. In saas-reporting, attribution-cleanup is still the first module in Days 1–30, and kpi-baseline is still later in that same phase.

The starting note can be written before a usable baseline exists. Write the one result the selected goal is supposed to count, list each report the owner already opens, and mark every report that does not define that result. Record a current number, or write "number unavailable." The useful output is that marked list. The note is complete when it contains a written outcome definition and either a current number or an explicit "number unavailable" entry. Writing "number unavailable" documents the gap. It does not establish a usable baseline. The prerequisite sits beside this action: deeper attribution and channel ROI stay blocked until the definition and a current number both exist. The setup required is access to reports the owner already opens. The goal supplies the result in the owner's words:

- Increase Bookings / Appointments: a booked appointment.
- Generate More Leads: a new inquiry.
- Improve Retention / LTV: a repeat customer or repeat purchase.
- Launch: a first inquiry or first order. A pre-launch stage means the business has not gone live.
- Understand Marketing ROI: the note says the intake has not supplied a number that ties a result to spend.
- Build Brand Awareness: the note says the intake has not supplied a visibility measure.

An attribution model, channel ROI, and a budget recommendation wait until the baseline note has both the definition and a current number. A missing number stays a gap. The task does not fill that gap with an estimate.

### D15 and the service CTA

The primary button and mailto are chosen from the service title, not from the first scheduled module.

| Plan | First scheduled module | Service CTA | Does the CTA support that first action? |
|---|---|---|---|
| clinic-bookings | Website conversion. The drafted output is the three-line page note. | "Discuss local growth," because the service branch chooses Local SEO. | No. The button opens a local-growth conversation. |
| manual-workflow | CRM cleanup. The drafted output is the inquiry list. CRM scores 18 and website conversion scores 6. | "Book a website strategy review." | No. The button opens a website conversation. |
| saas-reporting | Attribution cleanup, still ahead of kpi-baseline. The drafted output is the measurement gap list. | "Talk through your reporting gaps." The service title is Attribution / Reporting Cleanup. | The topic matches the module. The button still reads as an attribution fix, while the drafted task stops at the baseline gap. Week-label removal did not change this order. |
| D15 bookings plus ROI | Website conversion is the highest-scored module, at 14. | "Discuss local growth." The engagement is the measurement baseline, and the opening summary starts with ROI. | No. The page offers three different next steps. |
| D15 retention plus conversion | Lifecycle email scores 15. | "Book a website strategy review." | No. The button follows the conversion branch. |

The earlier page check, before this follow-up, showed "Book a strategy conversation" because no public booking URL was set. The mailto subject and body still came from the service title. Manual-workflow used subject "Website / conversion strategy — roadmap follow-up" while the starting action was the inquiry list.

Contact alignment, committed on `cmo-006-align-primary-cta`: the visible button and the mailto subject come from the same starting-action data as the page and email. Website conversion says "Discuss your page note." CRM cleanup says "Discuss your inquiry list." Attribution cleanup says "Discuss your measurement baseline." That last label does not say whether a current number exists. "Discuss" names the conversation, including when the owner has not written the note yet. The sentence beside the button says the link opens a conversation about that starting task and does not save, attach, submit, or review a note, list, or baseline. When the first module has no starting action, the button says "Book a strategy conversation."

The service card, engagement title, scores, and schedule stay on the CMO-005 result. The service-specific `primaryCta` labels remain on that object and are not the visible button. The destination is `STRATEGY_BOOKING_URL`, then `NEXT_PUBLIC_BOOKING_URL`, then a mailto to `STRATEGY_CONTACT_EMAIL` with the subject only. A missing value, or an example.com address or booking host, shows "A conversation link is not configured." The link does not carry the task text, a name, or a company. D15's coherence review and D02's attribution order stay open.

### Bounded implementation plan

The starting-guidance steps below were accepted and committed locally on October 24, 2026 as `530242db3e8c04f72d1c8d555f94bfacb27d9a8d`. The contact alignment described above is committed on `cmo-006-align-primary-cta`.

1. Add a pure helper that reads the first scheduled module id and the validated answers. Return the starting task, the artifact, the completion check, the access it needs, and the module's existing effort band. Implement the three module ids above. Any other id returns no first-action block.
2. Render that block once, above the top-three cards. Print uses the same results component. Add the same four lines to the email model so the summary describes the same artifact. Keep the current module outcome bullets, and label them as later work in the module so they do not read as the finish line for the first task.
3. Leave score weights, module selection, phase slicing, and the service, engagement, and summary branch order unchanged. The CTA follow-up above is a separate change after this content is accepted.
4. Tests to add with the implementation: clinic produces the website note and keeps its Local SEO service title; a `none` channel case does not claim live traffic; manual-workflow produces the inquiry list; a `none` stack case does not require a CRM; saas-reporting names `kpi-baseline`, keeps attribution ahead of that baseline, and withholds channel ROI until a definition and a current number exist. Compare the 12 demos with the CMO-005 fixture and preserve its hash. Service titles stay the same.
5. Stay outside this implementation: new questions, hour estimates, staff or budget assumptions, prerequisite reordering, channel-specific strategy, guidance for the other seven modules, and a visual redesign.

Reconsider if Jacob wants the first action to follow the service card instead of the first scheduled module, wants hour estimates, or wants attribution held until the baseline exists. The last of those remains D02.

## D17 — Stage question for owner-led businesses

Decision ID: D17. Date: November 1, 2026. Owner: Jacob. Status: **accepted and implemented with CMO-007.**

The old stage options used ARR bands ("under $1M ARR", "$1M–$10M ARR", "$10M+ ARR") and an Enterprise option. That language fits software companies, not the owner-led local and professional businesses the website serves. Jacob approved this wording:

| Stored value | Label | Description |
|---|---|---|
| `pre-launch` | Getting ready to open | Not taking customers yet |
| `early` | Just getting started | Open, with a handful of customers; still learning what brings them in |
| `growth` | Steady and ready to grow | Regular customers coming in; you want more of them |
| `established` | Well established | Known in your market; you want to protect and sharpen what works |

The question now reads "Where is your business today?"

Scoring: the stored values and every rule that reads them are unchanged, except that `enterprise` is gone. It was only read by the engagement-format "mature stage" check, which still counts `growth` and `established`. All 12 demos keep identical scores, module order, phases, services, and engagement. The only output change is the stage label in `businessSummary.headline` and in the Stage row of `explainability.influentialAnswers`. Tests apply exactly that rename (`src/lib/fixtures/stage-label-change.ts`) before comparing with the CMO-003, CMO-004, and CMO-005 baselines. Those fixture files are unchanged byte-for-byte. The new baseline is `src/lib/fixtures/demo-roadmap-baseline-cmo007.json`, SHA-256 `a9f21063b4a7f238c8ad0f649da645c0efc64b1f46908fe3ba87eaab14a30091`.

Old links: compact tokens keep stage indexes 0–3. Index 4 (`enterprise`) and the legacy word `enterprise` both decode as `established`, and the link re-encodes with index 3. Index 5 and above are still rejected. This changes the plan for an old enterprise link in two places that only `established` triggers: the SaaS email-automation bump in `industry.ts` and the brand-clarity diagnosis route in the engagement format. That is accepted: Enterprise is no longer an audience the tool claims to serve.

Reconsider if Jacob wants a revenue or headcount question, or if pilot owners cannot place themselves in one of the four stages.

## D18 — Short version on the page, full plan by email

Decision ID: D18. Date: November 1, 2026. Owner: Jacob. Status: **accepted and implemented with CMO-007.**

Jacob asked for the tool to work as lead generation: show a short version of the result, ask for contact details, email the full result, and include a consult link in that email. He chose the strict version: the page and share links show only the short version.

This overrides the AGENTS.md invariant "Keep planning accessible without a signup" for the full plan only. The intake and the short version still need no signup.

- **Short version (page and share links):** business headline, executive summary, industry lens, top 3 priorities, and the D16 starting action. `src/lib/roadmap-preview.ts` builds it on the server. `src/app/results/page.tsx` passes only that object to the client component, so the full plan is not in the page HTML or the RSC payload. A test checks all 12 demos for leaked module descriptions, outcomes, service descriptions, reasoning, and watch-outs.
- **Full plan (email only):** every scheduled module with effort, description, and outcomes (the starting module's outcomes stay labeled "Later work in this module"), the reasoning and influential answers, services with full descriptions, engagement path and program shape, and watch-outs. This reverses the D16 rule that the email omits later outcomes. The email is still recomputed server-side from the answer token.
- **Consult link:** the email button says "Request a consult" and links to the website contact page (`https://darling-martech-website-project-v4.vercel.app/contact` until the domain moves). A booking URL can replace it later through `STRATEGY_BOOKING_URL`. The page keeps the D16 starting-task button labels.
- **Lead copy:** when `LEAD_NOTIFY_EMAIL` is set, Jacob receives one email per request with the name, email, business name, the seven answers, and the top 3 priorities. Reply-to is the visitor. A failed copy is logged without personal details and does not fail the visitor's request. Nothing is stored in a database. The form tells the visitor that Darling MarTech receives a copy only when that setting is present.
- **Print:** the page no longer offers Print. The emailed plan is the complete document.

Costs: delivery now carries the whole value of the tool. Resend must use a verified sending domain before launch, and a delivery failure leaves the visitor with only the short version and the contact link. Reconsider if pilot completion of the email step is low, if owners object to the gate, or when Jacob has a scheduling link for the consult button.
