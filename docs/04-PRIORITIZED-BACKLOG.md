# Prioritized backlog

Initial status for every item: **Proposed**. The package creates no GitHub issues automatically. Import only the next few items into the board; link them back here and update status after actual work. P0 is before release/promotion, P1 is core trust/usefulness, P2 is quality/presentation, P3 is optional expansion.

## Now: preserve, patch and establish correctness

### CMO-001 / P0 / Canonical baseline and supported dependencies

Status on October 23, 2026: committed locally as `77413607aed8630c717c768052e2a2d7dfa7236f` on `cmo-001-supported-dependencies`. Base SHA is `d7ad20bb3df07d6e7be2a5af932f509738a4aede`. Push and deployment remain pending.

Preserve source/history, select the canonical home, pin runtime/package manager and patch the lockfile from reviewed current advisories. Capture current fixture outputs before changing policy.

Acceptance: exact base and target SHA recorded; clean install/type/build pass; dependency audit reviewed by reachable feature, not just count; no unreviewed major migration or automatic audit-force fix. Depends on owner choice of repository home only if moving is required. Local checks covered the install, typecheck, build, audit, and unchanged demo output. The target SHA remains open.

### CMO-002 / P0 / Shared validated intake and legacy crash regression

Status on October 23, 2026: reviewed against the validation record and committed locally on `cmo-002-shared-intake-validation`. It includes the canonical-token fix below because email must submit the answers that are displayed. The commit SHA is recorded in the session handoff.

Introduce one runtime schema; validate every decoded format; normalize channels. Bound tokens and compact bitmasks.

Acceptance: numeric/object/string channels, unknown enums, fractional/unknown masks and oversized tokens fail safely. Existing valid fixtures round-trip. Local malformed legacy route no longer yields 500. API rejects the same payload before composition. Depends on CMO-001 check baseline. Local checks passed; see the validation record. Push and deployment were not done.


### CMO-003 / P1 / Canonical decode result for page and email

Status on October 24, 2026: reviewed against the validation record and committed locally on `cmo-003-invalid-link-handling`, from CMO-002 commit `a07aab2ebb58b31391446418425a8e1e117878b0`. The commit SHA is recorded in the session handoff. `npm test` is 7 tests; an earlier note of 8 counted the suite wrapper.

The invalid-q fallback derives the email token from the validated answers; that slice shipped in CMO-002 so the displayed plan and the email request cannot diverge.

The remaining slice is implemented: a results URL with missing or malformed roadmap input now returns HTTP 404 through `notFound()` and renders a results-segment not-found view that explains the link is invalid or incomplete and routes back to `/intake`. Valid compact links, valid legacy links, and the invalid-q fallback to valid legacy answers still return 200. The email route still returns 400 for a bad token and its copy now says the link data is invalid or incomplete; nothing in a token expires.

Acceptance: page, copied link and email input agree for q-only, legacy-only and mixed parameters; legacy support policy documented. The agreement slice is checked in CMO-002. The 404 status, fallback behavior, and copy were checked locally; see the CMO-003 validation record. Depends on CMO-002.

### CMO-004 / P1 / Real sequencing and consistent week labels

Status on October 24, 2026: reviewed against D02 and the validation record and committed locally on `cmo-004-consistent-roadmap-scheduling`, from CMO-003 commit `d6c64cfbee48f7cd471edd76ef9f7204204ef82f`. The commit SHA is recorded in the session handoff. No push or deployment. Actual PDF printing, dark-theme print readability, and email delivery remain unverified.

Results and print show the assigned phase window and the existing effort band. Catalog weeks are not displayed. Modules with a final score at or below zero are omitted, not listed as later work. Positive-score order and founder/non-founder phase placement stay. Empty phases remain visible. Web, print, and email share that placement. Attribution before the KPI baseline is still unresolved. The CMO-003 hash is unchanged. The CMO-004 hash is recorded beside it. See the validation record.

### CMO-005 / P1 / Reconcile signals, industry and commercial branches

Fix messy-stack bottleneck handling; avoid mapping every professional-service user to legal; align service/engagement explanations with selected work through stable IDs and explicit precedence.

Acceptance: accountant/consultant fixtures avoid legal-case language; messy-bottleneck/solid-stack case is honored or explicitly explained as conflicting evidence; bookings+ROI and retention+conversion cases have reviewed outcomes; no “follow your scores” claim for an unrelated branch.

## Next: useful results and dependable requests

### CMO-006 / P1 / Achievable plan and first action

Choose pilot audience; add actionable tasks, definitions of done and minimum capacity/readiness inputs. Avoid question bloat.

Acceptance: five representative scenarios each have one clear next action, reason, prerequisite, realistic effort band and completion evidence; assumptions/deferred items visible; no revenue guarantees. Depends on CMO-004/005.

### CMO-007 / P1 / Remove phantom inquiry capture and fix destinations

Remove or explicitly disable stub intents until they are implemented. Centralize approved booking/contact destinations; remove example mailto behavior from a release build.

Acceptance: no request path says saved/noted without persistence; no browser or email link routes to strategy@example.com; environment failures use user-friendly copy without revealing setup instructions.

### CMO-008 / P1 / Reliable summary delivery with a full plan link

Add canonical results URL/version context to the email model, provider adapter and complete error boundary. Distinguish accepted, failed and unknown outcomes.

Acceptance: fake transport tests verify canonical link and summary parity, rejected/thrown provider calls, timeouts and safe errors. Template includes a usable full-plan link. Real delivery test remains a separately scoped verification step. Depends on CMO-002/003/007.

### CMO-009 / P1 / Request persistence, consent and abuse controls

Choose minimum retention and destination before implementing. Add bounded body/token parsing, shared/persistent abuse protection appropriate to serverless deployment, request/provider idempotency and partial-failure reconciliation.

Acceptance: duplicate retries do not produce duplicate delivery or lost lead records; rate-limit/failure behavior is tested; no full PII logging; transactional request separated from optional marketing consent; lead retention/deletion documented. Depends on storage decision D05 and CMO-008. Do not default to an expensive CRM.

## Then: trustworthy experience and portfolio release

### CMO-010 / P2 / Accessible wizard and progressive result UI

Add focus/step announcements, semantic choice groups, keyboard behavior and reduced motion. Show first priorities and action before detailed reasoning. Add resume only if needed.

Acceptance: actual keyboard-only completion and back navigation; focus reaches new question/appropriate error; reduced motion honored; phone and 200% zoom review; no document overflow. Automated checks supplement manual review.

### CMO-011 / P2 / Print and share quality

Test real browser print/PDF, long content and email-opened links. Separate immutable snapshot claims from recomputation.

Acceptance: readable light print output, sensible page breaks, visible plan/version/date/assumptions, no controls or personal form fields in export; compact and supported legacy URLs reopen with defined semantics.

### CMO-012 / P1-P2 / Repeatable verification and CI

Add scripts for type checking, meaningful linting and tests; review a small PR pipeline. Test decoders, selected decision scenarios, scheduling invariants, email adapter and one end-to-end journey.

Acceptance: checks actually run on the intended PR commit; no credentials required for unit tests; no CI path sends live email; failing regression blocks the release. This item starts alongside early bug work and expands only with new behavior.

### CMO-013 / P2 / Publishable documentation and rights

Replace outdated README content, add blank environment example, select license, record third-party assets and provide synthetic worked examples.

Acceptance: another developer can set up safely; demo and status are accurate; history/provenance retained; no private company results or client information used as proof without permission.

### CMO-014 / P2 / LLC website handoff and review preview

Start with a stable ordinary link; decide integration only after the current site is selected. Verify service mapping and cross-site journey on an exact preview.

Acceptance: website -> assessment -> result -> intended follow-up works, including mobile/back/share paths; no domain or production mutation assumed; index/canonical policy chosen; source/deployed revision recorded.

### CMO-015 / P2 / Small pilot and outcome evidence

Test with a few representative owner-led businesses; record comprehension, usefulness and attempted action, not only completion rate.

Acceptance: documented feedback, known denominator and one prioritized revision. Distinguish requested email, provider acceptance, delivery event, inquiry and real qualified conversation. No invented success percentages.

## Later / conditional

### CMO-016 / P3 / Evidence-backed enrichment or AI experiment

Only start after a defined limitation and baseline. Candidate experiments: approved-rule explanation rewrite, opt-in public-site evidence, one-way CRM handoff or saved plan history.

Acceptance: testable benefit, bounded cost/data exposure, fallback and evaluation set. The feature can be removed without changing deterministic core correctness. No automatic broad agent/plugin expansion.
