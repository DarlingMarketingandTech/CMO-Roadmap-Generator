# Prioritized backlog

Initial status for every item: **Proposed**. The package creates no GitHub issues automatically. Import only the next few items into the board; link them back here and update status after actual work. P0 is before release/promotion, P1 is core trust/usefulness, P2 is quality/presentation, P3 is optional expansion.

## Now: preserve, patch and establish correctness

### CMO-001 / P0 / Canonical baseline and supported dependencies

Status on October 23, 2026: locally checked and committed on `cmo-001-supported-dependencies`. Base SHA is `d7ad20bb3df07d6e7be2a5af932f509738a4aede`. Push and deployment remain pending. The commit SHA is the target recorded in the session handoff after the commit.

Preserve source/history, select the canonical home, pin runtime/package manager and patch the lockfile from reviewed current advisories. Capture current fixture outputs before changing policy.

Acceptance: exact base and target SHA recorded; clean install/type/build pass; dependency audit reviewed by reachable feature, not just count; no unreviewed major migration or automatic audit-force fix. Depends on owner choice of repository home only if moving is required. Local checks covered the install, typecheck, build, audit, and unchanged demo output. The target SHA remains open.

### CMO-002 / P0 / Shared validated intake and legacy crash regression

Introduce one runtime schema; validate every decoded format; normalize channels. Bound tokens and compact bitmasks.

Acceptance: numeric/object/string channels, unknown enums, fractional/unknown masks and oversized tokens fail safely. Existing valid fixtures round-trip. Local malformed legacy route no longer yields 500. API rejects the same payload before composition. Depends on CMO-001 check baseline.

### CMO-003 / P1 / Canonical decode result for page and email

Fix invalid-q/valid-legacy fallback by deriving a canonical token from validated answers. Define error states/status behavior and remove false expiry language.

Acceptance: page, copied link and email input agree for q-only, legacy-only and mixed parameters; legacy support policy documented. Depends on CMO-002.

### CMO-004 / P1 / Real sequencing and consistent week labels

Select dependency-aware dates versus priority-only groups. Move displayed schedule metadata into assigned work. Add clear deferred work.

Acceptance: clinic-bookings, ecom-conversion and prelaunch-brand no longer render impossible phase/week combinations; prerequisites respected; no filler solely to hit six/eight; owner-reviewed examples. Depends on schedule decision D02.

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
