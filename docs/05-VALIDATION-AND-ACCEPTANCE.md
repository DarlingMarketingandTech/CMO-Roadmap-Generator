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
