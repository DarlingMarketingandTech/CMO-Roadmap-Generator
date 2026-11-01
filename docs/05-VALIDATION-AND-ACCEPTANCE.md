# Validation and acceptance

## Audit execution record

Source: main `d7ad20bb3df07d6e7be2a5af932f509738a4aede`. Executed against a source snapshot isolated from the user's checkout and production. No application-source fixes were made. Domain TypeScript modules were transpiled unchanged to CommonJS for probes; tsc separately checked the source.

| Check | Observed result | Limits |
|---|---|---|
| npm ci --ignore-scripts --no-audit --no-fund | Passed; 81 packages installed | Dependency lifecycle scripts intentionally skipped; no production credentials |
| npm run build | Passed; Next 15.5.14 production build | Buildability, not security or strategic correctness |
| npx --no-install tsc --noEmit --incremental false | Passed | Run before generated build-type races; no runtime validation claim |
| Six scalar question combinations | 28,800 cases; zero structural/semantic round-trip invariant errors | One representative channel subset per case, rotating among none, SEO and paid/email/content; not exhaustive full input space |
| Full channel mask sweep on 12 demos | 1,536 cases; zero semantic round-trip errors | 128 valid masks per demo; semantic equality, not textual token equality |
| Email view-model parity on 12 demos | All phase/module titles match composed plan | No real email sent or rendered-email layout inspection |
| Root and intake HTTP | Root follows redirect to /intake, 200 | HTTP-level only |
| Valid compact result HTTP | 200 with roadmap heading | No interactive browser proof |
| Invalid compact token | 200 with existing error state | Baseline behavior, not proposed API/HTTP policy |
| Malformed legacy numeric channels | Reproduced 500 | Tested locally only, not against production |
| Unknown route | 404 | Local built server |
| Email route without config | 503 with missing-config JSON | No provider contact |
| npm audit --omit=dev --json | 9 vulnerable dependency nodes: 1 critical / 5 high / 3 moderate | Registry snapshot; nodes can overlap advisories; not proof of exploitability |
| Browser automation | Blocked by missing browser; download invalid/truncated | No claim that keyboard/mobile/print browser checks passed |

The generated probe initially compared JSON strings and incorrectly counted object-key-order differences as failures. It was corrected to semantic deep equality and rerun. Only corrected results above are used. Key ordering is not a recommendation failure.

## Domain observations requiring policy decisions

| Observation | Count / example | Interpretation |
|---|---|---|
| Assigned phase differs from module default phase | 28,797 / 28,800 generated cases | Under current UI, stale week labels can contradict assigned days |
| A selected module has score <=0 | 12,168 / 28,800 | Fixed selection count can fill with weak candidates; not automatic proof each plan is bad |
| Different selected module sequences | 1,982 in generated matrix | Variation exists; variation is not evidence of personalization quality |
| Professional-service classification | Always legal | Inconsistent with accounting/finance/consulting intake labels |
| Compact mask 1.5, 128 or 1024 | All accepted in probes | Should be an explicit integer/range contract |
| Valid legacy fallback after bad q | Page parses valid answers, email selects bad q | Canonicalize validated input before display/submission |

Counts describe synthetic coverage, not measured user incidence, customer demand or advice accuracy.

## Required regression cases

1. clinic-bookings: founder capacity; no Week 5-7 card inside Days 1-30 after scheduling fix.
2. saas-reporting: measurement dependencies before advanced attribution; coherent first action.
3. prelaunch-brand: no premature optimization simply to fill module count.
4. manual-workflow: systems bottleneck is addressed, not just generic website work.
5. professional-service accountant/consultant: no legal-matter or attorney assumptions.
6. messy-stack bottleneck with solid maturity: explicit reconciliation of conflicting input.
7. bookings plus ROI bottleneck: strategic/service/engagement precedence is deliberate.
8. retention plus conversion bottleneck: explain the tradeoff; no contradictory sprint label.
9. compact and legacy valid inputs: equal semantic decision output after normalization.
10. malformed channels, enum, tuple and mask inputs: bounded graceful rejection; never a 500.
11. invalid q plus valid legacy answers: one canonical plan/token for page, share and email.
12. zero/negative candidates: eligibility/defer behavior tested according to selected policy.

## Meaningful test layers

### Domain tests

Validate rules and scheduling invariants with small, reviewed fixtures. Check deterministic semantic output and old-link policy. Prefer invariants and intended outcomes to giant unreviewed snapshot files. Record rule/content versions with expected results. Include property-based coverage only where it finds boundary errors.

### Route/adapter tests

Use a fake email transport and a fake submission store. Cover invalid JSON, unsupported inputs, missing config, honeypot, oversized request, rate limit, duplicate request ID, rejected provider result, thrown provider exception, timeout/unknown outcome and persistence/delivery partial failure. No unit test should require a live key or send a message.

### Browser tests

Exercise complete wizard, back navigation, validation, choice state, no horizontal overflow, reduced motion, focus, result links, copied token and print layout. Review at approximately 320/390/768/1440 CSS-pixel widths and real phone behavior. Keyboard and screen-reader review remain necessary; an automated accessibility scan is not certification.

### Delivery test

In a separately scoped verification step, send only to an authorized controlled address. Verify message content, result link, provider acceptance, recipient-server event when configured, and inbox placement as distinct observations. Test bounce/retry with supported provider facilities or fake events. Do not call a provider-accepted request Delivered.

### Strategic usefulness review

Jacob reviews five contrasting plans against business constraints. A target user should understand the first action, recognize the assumptions, identify what was deferred and say how they would know it helped. Weight changes require a written reason, affected fixtures and counterexamples.

## Minimum release gate

- Supported patched dependencies and reviewed audit findings.
- Build, type check and meaningful regression suite on exact release commit.
- No known malformed-input crash, stale schedule dates or false lead-capture success.
- Real approved contact/booking destination; no example address fallback.
- Clear output assumptions and planning-only claim; no fabricated business results.
- Real mobile/keyboard/print evidence and defined old-link behavior.
- Safe email/request handling if enabled, with deliberate retention and marketing-consent policy.
- Verified preview/project/commit; production action only within separately authorized scope.

## Result record template

For each milestone record date, base/target SHA, test environment, commands/fixtures, passed/failed/blocked checks, exact limits, related work item, and remaining release hold. Keep a blocked check blocked; do not convert lack of a browser or credential into a pass.

## CMO-001 local verification

Recorded October 23, 2026. This does not change the audit execution record above. Base SHA `d7ad20bb3df07d6e7be2a5af932f509738a4aede` on local branch `cmo-001-supported-dependencies`. The target is the local CMO-001 commit; it was not pushed. Environment: Windows, Node 22.23.2, npm 10.9.8. The historical production note said Vercel uses Node 24.x; that setting was not rechecked.

| Check | Observed result | Limits |
|---|---|---|
| Demo semantic hash before and after dependency changes | Both `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14` across 12 committed demos | Proves dependency resolution did not change current plan output. The hash still contains the known week/phase contradictions. |
| `npm audit --omit=dev --json --package-lock-only` before changes | 9 vulnerable nodes: 1 critical, 5 high, 3 moderate | Registry snapshot at execution time |
| Same audit after the lockfile update, then a full audit including dev dependencies | 0 vulnerabilities in both | Not an exploitability or penetration test |
| `npm ci --no-audit --no-fund` after removing `node_modules` | Passed; 77 packages added | Lifecycle scripts were allowed so the framework install could finish |
| `npm run typecheck` | Passed | `tsc --noEmit --incremental false` |
| `npm run build` | Passed; Next.js 15.5.28 | Buildability only. The local build saw `.env.local`; its values were not read or recorded. |
| Existing send-request schema against Zod 4.6.7 | Trimmed valid request accepted; invalid email, unknown field, and filled honeypot rejected | Temporary local check with synthetic example data. Not a committed regression suite. |

Resolved production versions: Next 15.5.28, React 19.1.0, React DOM 19.1.0, Zod 4.6.7, Resend 6.34.1, PostCSS 8.5.31, Sharp 0.35.5, nanoid 3.3.20, source-map-js 1.2.2. `svix` and `uuid` are no longer in the tree. No `npm audit fix --force` and no Next 16 migration.

Reachable feature review:

- App Router server components and route handlers are present, so the server-component denial-of-service advisories fixed after 15.5.15/15.5.16 were relevant. Next 15.5.28 covers them.
- The app does not configure `next/image`, SVG, middleware, rewrites, i18n, Server Actions, or `use cache`. Those advisories were not demonstrated against this source. They are included because the patched Next and Sharp releases close them together. The default image optimizer is part of the Next server, which is why Sharp is pinned to 0.35.5 rather than left on 0.34.5.
- PostCSS, nanoid, and source-map-js run in the build-time CSS pipeline. The app does not parse visitor-supplied CSS. PostCSS 8.5.31 is an override because Next 15.5.28 still depends on PostCSS 8.4.31; that override also brings the patched nanoid and source-map-js releases.
- Zod validates `POST /api/send-roadmap`. The current schema bounds strings and does not constrain arrays or other collections, so the published memory advisory does not describe a collection this route asks Zod to validate. Zod 4.6.7 is the same-major fix. The route still has no separate body-size limit; that remains CMO-009.
- Resend 6.9.4 pulled `svix` and `uuid` 10.0.0. The send route calls `emails.send` and does not verify webhooks. Resend 6.34.1 stays on major 6 and removes that chain. The existing call site typechecks. No email was sent.

Blocked for this item: browser, keyboard, print, production deployment, and a real email delivery check. A passing build does not close those.

## CMO-002 local verification

Recorded October 23, 2026 on `cmo-002-shared-intake-validation`, from CMO-001 commit `77413607aed8630c717c768052e2a2d7dfa7236f`. The diff was reviewed and committed locally; the commit SHA is in the session handoff. Environment: Windows, Node 22.23.2, npm 10.9.8.

| Check | Observed result | Limits |
|---|---|---|
| `npm test` | 6 passed, 0 failed | Parser, demo round-trip, and one email-route rejection. Not a browser test. |
| `npm run typecheck` | Passed | Includes the new test file |
| `npm run build` | Passed; Next.js 15.5.28 | Buildability only. `.env.local` was present and was not read. |
| Demo semantic hash | `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14` across 12 demos | Same hash as before CMO-001 and after it. Week labels are unchanged. |
| `GET /results?answers=` with numeric `activeChannels` on local `next start` | HTTP 200 and the existing “Something Went Wrong” view | Previously reproduced as HTTP 500. This was a local production server, not Vercel. |
| Valid compact clinic link on that server | HTTP 200 and the roadmap heading | One demo, not the full matrix |
| Invalid `q` plus that clinic’s valid legacy link | HTTP 200 and clinic plan content | Confirms fallback still renders. The email token itself is covered by the unit test. |
| `POST /api/send-roadmap` with the numeric-channel token and a fake provider key | HTTP 400 before composition | No email was sent. The response still uses the existing expiry wording. |

Compatibility chosen in this change: omitted or empty channels become `none`; duplicate channels and `none` combined with another channel are rejected; remaining channels are ordered like the compact codec. Demo module selections, phase day labels, and week labels stayed the same through that normalization. At the time of this record, results error pages still used HTTP 200; that status policy and the false expiry sentence were completed in CMO-003 below.

## CMO-003 local verification

Recorded October 23, 2026 on `cmo-003-invalid-link-handling`, from CMO-002 commit `a07aab2ebb58b31391446418425a8e1e117878b0`. The diff was reviewed against this record and committed locally. Environment: Windows, Node 22.23.2, npm 10.9.8. A recount on October 24, 2026 found 7 tests, not 8: the new case is one test, and the suite wrapper is not an eighth test.

| Check | Observed result | Limits |
|---|---|---|
| `npm test` | 7 passed, 0 failed | One new test covers missing, empty, and malformed results parameters. The email assertion checks the exact error sentence. Not a browser test. |
| `npm run typecheck` | Passed | `tsc --noEmit --incremental false` |
| `npm run build` | Passed; Next.js 15.5.28 | Buildability only. `.env.local` was present and was not read. |
| Demo semantic hash | `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14` across 12 demos | Same projection and hash as the CMO-001 and CMO-002 records. Scoring, phase day labels, and week labels are unchanged. |
| `GET /results` with no parameters on local `next start` | HTTP 404 with the invalid-or-incomplete view | Local production server, not Vercel |
| `GET /results?answers=` with numeric `activeChannels` | HTTP 404 with the same view | Previously HTTP 200 after CMO-002, HTTP 500 at baseline |
| Valid compact clinic link | HTTP 200 and the roadmap heading | One demo, not the full matrix |
| Invalid `q` plus that clinic's valid legacy link | HTTP 200 and clinic plan content | Fallback preserved; email token parity is unit-tested |
| Unknown route `GET /this-route-does-not-exist` | HTTP 404 with Next's default view | The results-specific copy does not leak to other routes |
| `POST /api/send-roadmap` with the numeric-channel token | HTTP 400, body `Invalid or incomplete roadmap link data` | No email sent. The word "expired" is gone from the source. |
| Browser check of the 404 view on that server | View rendered; "Take the Assessment" navigated to `/intake`; a valid compact link rendered the clinic roadmap | Local desktop browser only; no keyboard, mobile, or print review |

Status policy chosen in this change: a results URL whose roadmap input is missing or fails the shared intake contract is a document that does not exist, so the page calls `notFound()` and Next.js serves HTTP 404 from `src/app/results/not-found.tsx`. A rendered page cannot carry a 4xx status any other way in the App Router; the email route keeps HTTP 400. Known limitation: the 404 view's markup arrives in the streamed flight payload and renders client-side, so it needs JavaScript, unlike the fully server-rendered 200 roadmap pages. The no-JavaScript fallback remains an open UX item per the product brief.

## CMO-004 local verification

Recorded October 24, 2026 on `cmo-004-consistent-roadmap-scheduling`, from CMO-003 commit `d6c64cfbee48f7cd471edd76ef9f7204204ef82f`. The diff was reviewed against D02 and this record and committed locally. Environment: Windows, Node 22.23.2, npm 10.9.8. D02 was accepted before this change. No email was sent. Actual PDF printing, dark-theme print readability, and email delivery remain unverified.

The CMO-003 projection is unchanged. `src/lib/fixtures/demo-roadmap-baseline-cmo003.json` is still the key-sorted full roadmap JSON for the twelve demos, and its SHA-256 is still `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`.

The CMO-004 projection uses the same method on the new composer output. `src/lib/fixtures/demo-roadmap-baseline-cmo004.json` hashes to `6c51827e741cb5c4d49280829ff96cea8e5816eae8d96eb1cf7cea6c554eb217`. Catalog `week` strings remain on the module objects inside both files. Results, print, and email no longer render them. The hash change is the omitted modules below, not a relabel of the retained modules.

Semantic differences from the CMO-003 roadmap JSON:

| Demo | What changed |
|---|---|
| clinic-bookings | Phase 3 omits brand-strategy. email-automation stays. Founder placement of the other five modules is unchanged. |
| local-visibility | Phase 2 omits brand-strategy. Phase 3 omits gtm-planning and martech-audit and is empty. Phase 1 still holds website-conversion, crm-cleanup, and local-seo. |
| ecom-conversion | Phase 3 omits brand-strategy and gtm-planning and is empty. The six positive modules stay in the previous 3 / 3 groups. |
| ecom-traffic-gap | Same module omission and placement as ecom-conversion. |
| manual-workflow | Phase 3 omits brand-strategy. kpi-baseline stays in that phase. |
| healthcare-booking-ux | Phase 3 omits brand-strategy. attribution-cleanup stays in that phase. |
| home-services-local | Phase 3 omits brand-strategy. kpi-baseline stays in that phase. |
| saas-reporting | Module placement unchanged. attribution-cleanup remains the first Phase 1 module, ahead of kpi-baseline. No prerequisite was added. |
| law-differentiation | Module placement unchanged. |
| law-reputation-site | Module placement unchanged. |
| saas-growth-blind | Module placement unchanged. |
| prelaunch-brand | Module placement unchanged. conversion-optimization and email-automation stay unselected. The engagement title is still "Positioning & GTM sprint (2–3 weeks)". |

For the five unchanged demos, `composeRoadmap` deep-equals the CMO-003 entry. Their screen, print, and email copy still changes: catalog weeks are hidden, and the phase section says the windows are suggested sequencing. Omitted modules are absent from the email as well. They are not listed as later work. Service titles, engagement titles, scores, and score floors were not edited.

| Check | Observed result | Limits |
|---|---|---|
| `npm test` | 14 passed, 0 failed | 7 intake tests and 7 schedule tests. The schedule tests cover positive-score omission, stable order and phase placement, empty phases, phase-window labels, email parity, the unresolved attribution order, and both baseline hashes. |
| `npm run typecheck` | Passed | `tsc --noEmit --incremental false` |
| `npm run build` | Passed; Next.js 15.5.28 | Buildability only. `.env.local` was present and was not read. |
| Clinic results on local `next start` port 3456 | Phase windows Days 1–30, 31–60, and 61–90. Website conversion shows High effort and no week. Brand strategy is absent. The sequencing sentence is visible. The sprint title is still "Local growth program (90 days)". | Desktop browser on the local production server. Not Vercel. |
| Ecommerce results on that server | Conversion optimization remains first. Phase 3 shows "No additional priorities recommended for this phase based on your answers." Brand strategy and go-to-market planning are absent. No catalog week is in the page text. | Same desktop session. |
| Print media on the clinic page | Toolbar computed `display: none`. Print title "CMO Roadmap Generator — 90-Day Plan" computed `display: block`. Sequencing note, Days 1–30, and High effort remained. No catalog week and no brand strategy in the page text. | Emulated print CSS, not an operating-system print dialog, PDF, or light-theme print review. The phase cards stayed on the dark theme. |
| Email HTML for the two demos | Not rendered in a standalone script. The shared schedule view test asserts the email model matches phase labels, day windows, titles, and the empty-phase sentence, and that the view contains no "Week " label. The production build compiled the template. | No provider send. JSX for the template is compiled by Next, and a one-off `tsx` render failed because React was not in scope. |

The page heading, print document title, email subject, and layout description still use the 90-day product name. The phase section, on screen and in the email model, says the day ranges are suggested sequencing and not guaranteed completion dates. Mobile, keyboard, and a real print or PDF pass remain open.

## CMO-005 local verification

Recorded October 24, 2026 on `cmo-005-reconcile-recommendations`, from CMO-004 commit `ce45be53cc44643a7251076ac0ca30ea881683fa`. Reviewed against the CMO-005 acceptance criteria and committed locally. Environment: Windows, Node 22.23.2, npm 10.9.8. No email was sent. Actual PDF printing, dark-theme print readability, and email delivery remain unverified. D15 remains a product limitation pending a coherence review before a public pilot.

`src/lib/fixtures/demo-roadmap-baseline-cmo003.json` is unchanged and still hashes to `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`. `src/lib/fixtures/demo-roadmap-baseline-cmo004.json` is unchanged and still hashes to `6c51827e741cb5c4d49280829ff96cea8e5816eae8d96eb1cf7cea6c554eb217`. The CMO-005 projection uses the same key-sorted method. `src/lib/fixtures/demo-roadmap-baseline-cmo005.json` hashes to `451f240ca9e2a62ae9db73047817a0940b6f6738f00a36e667818ef243f7472b`.

Scores, module order, phase placement, service titles, and engagement titles are unchanged for all 12 demos. The professional-services score bumps are the same numbers previously applied under the legal segment. They are not specific to one profession, so the two professional demos keep their module order.

| Demo | What changed against the CMO-004 roadmap |
|---|---|
| clinic-bookings | The founder sentence no longer says the roadmap was streamlined to six modules. This plan schedules five. Service, engagement, scores, and module order are unchanged. |
| home-services-local | Same founder-sentence correction only. |
| manual-workflow | Same founder-sentence correction. The stack bullet no longer says hygiene “scored high.” It says a disorganized stack raises MarTech and CRM work. CRM still scores 18, MarTech 15, and website conversion 6. The service remains Website Redesign because the lead-generation branch is still checked first. |
| prelaunch-brand | Founder sentence, plus the same stack-bullet correction. Module order and the engagement title are unchanged. |
| saas-reporting | Only the stack bullet. It no longer claims the stack “scored high.” Attribution remains ahead of the KPI baseline. |
| law-differentiation | Segment id is `professional` rather than `legal`. Module descriptions, watch-outs, the closing sentence, the business-type explanation, the executive summary, and the contact intro use general professional-services language. The secondary service no longer says “retained work.” Module order, scores, and service titles are unchanged. |
| law-reputation-site | Same language change as law-differentiation. |
| local-visibility | Unchanged. |
| ecom-conversion | Unchanged. |
| ecom-traffic-gap | Unchanged. |
| healthcare-booking-ux | Unchanged. |
| saas-growth-blind | Unchanged. |

Plain-language cases, each covered by `src/lib/recommendations.test.ts`:

- An accounting or consulting business can only choose Professional Services. That option also lists law and finance. The plan now says the intake does not identify a profession. It does not say attorney, matter, case, or bar.
- A business with stack maturity “Solid but Could Be Better” and bottleneck “Disorganized Marketing Stack” previously left MarTech at zero while the bottleneck sentence said it raised MarTech. MarTech now scores 9 and CRM scores 12, both are scheduled, and the plan says the two answers disagree and that it follows the bottleneck. If maturity is actually messy, the plan does not call the answers a conflict. The same bottleneck also blocks the embedded-format path, because that path requires a stack the rules treat as disciplined. None of the 12 demos use this combination.
- Bookings plus ROI, and retention plus conversion, keep the branch order in D15. The service note no longer says the suggestions follow the scores.

The email model changes only where the roadmap service description changes. That is the secondary blurb on the two professional demos. Clinic and the other demos keep the same email titles, phase placement, and blurbs. This is not a delivery test.

| Check | Observed result | Limits |
|---|---|---|
| `npm test` | 18 passed, 0 failed | 7 intake, 7 schedule, and 4 recommendation tests. Schedule tests still lock the CMO-003 and CMO-004 files. Recommendation tests lock the CMO-005 file and the three cases above. |
| `npm run typecheck` | Passed | `tsc --noEmit --incremental false` |
| `npm run build` | Passed; Next.js 15.5.28 | Buildability only. `.env.local` was present and was not read. |
| Law-differentiation results on local `next start` port 3456 | Segment reads “Professional services lens.” Module copy uses that lens. The summary says the intake does not name a profession. Watch-outs talk about inquiry quality and consideration cycles. No attorney, matter, case, bar, or “legal” wording was in the page text. The service note says the suggestions follow a fixed order and can name different work than the highest-scored modules. | Desktop browser on the local production server. Not a PDF or email delivery test. |
| Clinic results on that server | The narrative says the roadmap is capped for a founder-led team. It does not say six modules. Brand strategy is absent. The sprint title is still “Local growth program (90 days).” The same service note is visible. | Same desktop session. |
| Solid-stack / messy-bottleneck results on that server | CRM cleanup is scheduled, then email, then MarTech audit. The narrative says the answers disagree and the plan follows the bottleneck. The bullet and the bottleneck explanation both say the answers are in tension. The service card remains the lead-generation website path, and the note says that can differ from the highest-scored modules. | Same desktop session. One synthetic profile, not one of the 12 demos. |

## CMO-006 local verification

Recorded October 24, 2026 on `cmo-006-actionable-first-action`, from CMO-005 commit `e71abe40d2f8b651421ba81a859173b3428df0f0`. D16 was accepted with the refinements in that decision. A later correction removed the claim that an unnamed channel means there is no live page or no current traffic. The no-channel task still asks for the desired customer action. Environment: Windows, Node 22.23.2, npm 10.9.8. No email was sent. No push or deployment. Actual PDF printing, dark-theme print readability, and email delivery remain unverified.

Recommendation output is unchanged. `composeRoadmap` for all 12 demos still deep-equals `src/lib/fixtures/demo-roadmap-baseline-cmo005.json`. That file still hashes to `451f240ca9e2a62ae9db73047817a0940b6f6738f00a36e667818ef243f7472b`. The CMO-003 file is still `ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14`. The CMO-004 file is still `6c51827e741cb5c4d49280829ff96cea8e5816eae8d96eb1cf7cea6c554eb217`. Scores, module order, phase placement, service titles, engagement titles, and catalog outcome sentences were not edited.

The new content is a view over the first scheduled module. It is not stored on the roadmap object.

| Demo | Content added | Recommendation unchanged |
|---|---|---|
| clinic-bookings | Starting action for website conversion. The note must name the desired customer action, the current request, and where inquiries arrive. Overall module effort is High. Catalog outcomes are labeled later work on that card only. | First module remains website-conversion. Service remains Local SEO. |
| local-visibility and home-services-local | No active channel, so the note names the desired customer action. The copy does not treat that answer as evidence of no live page or no current traffic. | Module order and service titles unchanged. |
| manual-workflow | Starting action for CRM cleanup. The output is the marked list of records missing a next step. A blocked list completes the access check and leaves cleanup blocked. Overall module effort is Medium. | First module remains crm-cleanup. Service remains Website Redesign. |
| saas-reporting | Starting action for attribution cleanup, with the KPI baseline prerequisite beside it. "Number unavailable" documents the gap and is not a usable baseline. Channel ROI stays blocked. Attribution remains ahead of kpi-baseline. | Service remains Attribution / Reporting Cleanup. |
| prelaunch-brand, ecom-conversion, law-differentiation, and any other first module outside the three ids | No starting-action block. | Unchanged. |

Email coverage is narrower than the page. The rendered plain-text email for clinic and saas includes the task, the output, the completion check, the access line, and "Overall module effort." SaaS also includes "Before deeper analysis," the baseline name, "number unavailable," and the channel-ROI block. The local-visibility email includes the desired-customer-action task and does not say there is no live page or no current traffic. The email does not include the later outcome bullets, so "Full CRO audit completed," "Lead scoring model implemented," and "ROI by channel calculated and benchmarked" are absent from those messages. Plans whose first module is outside the three ids have no starting-action section in the email. The email button remains "Book a strategy conversation." That render used `@react-email/render` in the unit test. It was not a provider send.

The results page, in this environment, also shows "Book a strategy conversation" as the visible control. The service-specific label stays on the mailto subject and body. For manual-workflow the browser showed subject "Website / conversion strategy — roadmap follow-up" while the starting action was the inquiry list. Clinic and saas keep the local-growth and attribution subjects from the same CTA map. The model labels "Discuss local growth," "Book a website strategy review," and "Talk through your reporting gaps" were not the visible button text.

| Check | Observed result | Limits |
|---|---|---|
| `npm test` | 28 passed, 0 failed | 7 intake, 7 schedule, 4 recommendation, and 10 starting-action tests. The new tests cover the three content branches, both CRM completion states, the attribution prerequisite, goal wording, unchanged catalog outcomes, the three baseline hashes, and rendered email text. |
| `npm run typecheck` | Passed | `tsc --noEmit --incremental false` |
| `npm run build` | Passed; Next.js 15.5.28 | Buildability only. `.env.local` was present and was not read. |
| Clinic results on local `next start` port 3457 | Starting action appears before Top 3 priorities. Completion names the desired customer action, the current request, and where inquiries arrive. The website card says "Overall module effort: High" and "Later work in this module." The CRM card still says "Medium effort" and "Expected outcomes." Local SEO remains the service. No catalog week. | Desktop browser on the local production server. Port 3456 was already in use, so this used 3457. Not Vercel. |
| Manual-workflow results on that server | Both completion states are visible, including "This is not completed cleanup." Scope says one pass and does not assign additional people. Later cards keep their existing effort wording and "Expected outcomes." The service description is still the website path. | Same desktop session. |
| SaaS-reporting results on that server | The prerequisite sits beside the starting action at a 1280px layout viewport (two columns, same row). At the 754px browser pane and at 390px it stacks in one column with no horizontal overflow. Attribution text appears before KPI / Reporting Baseline. Channel ROI remains in the later-work list. | 1280px and 390px were emulated layout viewports. The 754px width was the browser pane. |
| Print media on clinic, manual-workflow, and saas-reporting | Toolbar computed `display: none`. Print title computed `display: block`. The bottom CTA and lead form were hidden. The starting action, overall module effort, completion text, and later-work outcomes remained. SaaS print stacked the prerequisite in one column. Text color stayed `rgb(245, 240, 232)` on the dark surface. No catalog week. | Emulated print CSS, not an operating-system print dialog, PDF, or light-theme print review. |
| local-visibility results on local `next start` port 3458, after the copy correction | The starting task says the intake did not name an active channel and asks for the one request the first page should make. The page text does not say there is no live page or no current traffic. Completion still requires the desired customer action. | Desktop browser on the local production server. Not a print pass. The rendered email for this demo is covered by the unit test. |

## CMO-006 contact alignment

Recorded October 24, 2026 on `cmo-006-align-primary-cta`, from starting-guidance commit `530242db3e8c04f72d1c8d555f94bfacb27d9a8d`. Contact alignment is committed on this branch. No email was sent. No deployment.

The button label and mailto subject come from the starting action. Website conversion, including the no-channel task, says "Discuss your page note." CRM cleanup says "Discuss your inquiry list." Attribution cleanup says "Discuss your measurement baseline" for both saas-reporting and saas-growth-blind. Law-differentiation, prelaunch-brand, and ecom-conversion have no starting action and say "Book a strategy conversation." The purpose sentence says the link opens a conversation and does not save, attach, submit, or review the note, list, or baseline. Service titles, engagement titles, and the CMO-005 roadmap objects stayed on the baseline hash.

The destination order is `STRATEGY_BOOKING_URL`, then `NEXT_PUBLIC_BOOKING_URL`, then `STRATEGY_CONTACT_EMAIL`. The mailto has a subject and no body. Example.com addresses and hosts are unavailable. This environment's configured booking URL is an https link, so the page and the rendered email use that link and do not add a query. The address is not recorded here.

| Check | Observed result | Limits |
|---|---|---|
| `npm test` | 33 passed, 0 failed | 7 intake, 7 schedule, 4 recommendation, 10 starting-action, and 5 contact tests. Recommendation tests still lock the CMO-005 file. |
| `npm run typecheck` | Passed | `tsc --noEmit --incremental false` |
| `npm run build` | Passed; Next.js 15.5.28 | Buildability only. `.env.local` was loaded by the build. |
| Clinic, manual-workflow, saas-reporting, local-visibility, and law-differentiation on local `next start` port 3459 | The visible buttons were "Discuss your page note," "Discuss your inquiry list," "Discuss your measurement baseline," "Discuss your page note," and "Book a strategy conversation." Each href was the configured https booking URL, with no query, no `body`, and no example.com host. Local SEO, the lead-engine workshop, and the attribution service path stayed in place. Law-differentiation had no starting-action block. The no-channel task still asks for the desired customer action. | Desktop browser. The booking URL is not copied into this record. Not a print pass. |
| Rendered email for those five plans | The button label and href matched the page. The href did not include the task text, the name "Alex Example," or the company. | `@react-email/render` in a local script and in the unit tests. Not a provider send. |
| Clinic results on local `next start` port 3460 with the three contact variables set empty | The page showed "A conversation link is not configured." There was no contact link, no mailto, and no example.com href. The starting action and Local SEO service path remained. | One desktop page. The empty values were process environment for that server only. `.env.local` was not edited. |

## CMO-007 website readiness

Branch `cmo-007-website-readiness`, created from `main` at `e1089f8` on November 1, 2026. Not pushed or deployed. No live email was sent. The final commit hash is recorded in docs/10-SESSION-HANDOFF.md.

Commits: `8cc149f` stubs and contact default, `54707ab` email handler and full-plan email, `0ebc3ec` short-version gate (D18), `8cab330` stage question (D17), `e622f33` rebrand and link back, then this documentation commit.

Checks on the final code: `npx tsc --noEmit --incremental false` passes. `npm test` passes 44 of 44 across 8 suites. `npm run build` compiles and generates 8 static pages.

What the tests prove:

- `send-roadmap.test.ts`, through a fake transport: the visitor receives the full plan (every scheduled module title, "Why this plan", "Request a consult" linking to the website contact page, no example.com). The owner copy goes to `LEAD_NOTIFY_EMAIL` with reply-to set to the visitor. No copy is sent when that setting is unset. A provider failure returns 502 and skips the copy. A failed copy still returns 200 to the visitor. A missing configuration returns 503 without naming the setting. A filled honeypot sends nothing.
- `roadmap-preview.test.ts`: for all 12 demos, the preview object passed to the browser contains no module description, outcome, service description, engagement text, reasoning, or watch-out.
- `stage-question.test.ts`: the stage copy has no "$", "ARR", "revenue", or "enterprise". Compact indexes 0–3 are unchanged. Old index 4 and legacy `enterprise` decode as `established` and re-encode with index 3. Index 5 is rejected. The CMO-007 baseline hash is pinned.
- The CMO-003/004/005 fixture comparisons pass after applying only the D17 label rename, so scores, order, phases, services, and engagement are unchanged for all 12 demos.

Browser check (production build on localhost, Playwright, Chromium): intake at 1280 px and 375 px, the stage question at 375 px, clinic results at 1280 px, saas-reporting results at 375 px, print media at 1280 px, and an invalid link at 375 px (HTTP 404). No horizontal overflow at 375 px. Two defects found and fixed in the browser pass: optional-field labels wrapped and misaligned the form, and the skip link showed over content in print and full-page captures. The served HTML for the clinic plan contains no outcomes, "Expected outcomes", watch-outs, "example.com", or "RESEND".

Contrast (computed from the brand tokens): crimson on cream ≈ 7.6:1, muted on cream ≈ 6.7:1, white on crimson ≈ 8.9:1, ink on cream and cream on ink ≈ 15:1. All pass WCAG AA for body text.

Not verified: real Resend delivery and the owner copy in a real inbox; the email's rendering in mail clients (it was rendered to HTML but not viewed in a client); keyboard-only and screen-reader passes beyond the accessibility tree; the deployed site; the website contact page accepting the visitor. The main website is still on HOLD at its Vercel address.

Final verification: commit `e0f29222a96575c125f35fb05146cbd8aa3c054c` with a clean tree (only the untracked `.claude/` folder). `npx tsc --noEmit --incremental false` passed. `npm test`: 44 tests, 8 suites, 44 pass, 0 fail. `npm run build`: compiled successfully, 8 of 8 static pages generated. The commit that adds this paragraph changes documentation only.
