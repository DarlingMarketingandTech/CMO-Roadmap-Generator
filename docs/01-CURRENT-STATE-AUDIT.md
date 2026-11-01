# Current-state audit

Audit date: October 23, 2026. Baseline: `DarlingMarketingandTech/CMO-Roadmap-Generator`, main at `d7ad20bb3df07d6e7be2a5af932f509738a4aede`. This is a historical snapshot. Evidence links and external references are in [09-EVIDENCE-REGISTER.md](09-EVIDENCE-REGISTER.md).

## Executive assessment

The app is a compact, coherent proof of an explainable strategy engine. It has more real implementation than its old documentation suggests, but less execution planning and lead infrastructure than its presentation implies. The right next step is to strengthen the existing system, not rebuild it as an AI product.

Its primary value hypothesis is helping an owner prioritize a small amount of useful marketing work and making your consulting judgment visible. That hypothesis remains unvalidated with target users. The current weights are authored heuristics; they have not been established as empirically optimal or predictive.

## Provenance and coverage

- All 36 tracked non-public-asset text files retrieved at the exact baseline, including package-lock.json. Tree: 43 tracked files. Public assets/binary favicon inventoried, not visually reviewed.
- GitHub has main and one older Copilot branch. PR #1 was merged March 28. The latest three source changes add the expanded rules/email flow, replace vanilla-extract with CSS Modules, then remove the old homepage in favor of /intake.
- Dell XPS checkout was clean and at the same SHA. No local source edits were incorporated into the audit.
- Vercel project cmo-roadmap-generator, in darling-mar-tech, reports Next.js and Node 24.x. Latest production deployment `dpl_HmstigFMAUGpNTi4fqWStF2toMZn` is READY and matches the baseline SHA.
- One historical GitHub Actions run succeeded for the Copilot coding agent on its branch. There is no tracked application CI workflow; that run is not evidence of a current test pipeline.
- Drive discovery found the cmo-roadmap-generator folder with two historical PNG screenshots. Those files were located by metadata, not visually inspected, and were not used as proof of current behavior.
- The optional Darling Knowledge Engine lookup returned an unavailable/429 error. No findings are attributed to it.

## Actual architecture

The application uses Next.js 15.5.14, React/React DOM 19.1.0, TypeScript, React Hook Form, Motion, Zod, React Email and Resend. CSS Modules and custom properties are active. No vanilla-extract dependency remains. No AI API, database, account system, job queue or CRM adapter exists in the inspected source.

The source separates intake, results, pure domain helpers, presentation and email reasonably well. rules.ts is about 1,000 lines and mixes module scoring, engagement selection, explanatory prose and commercial CTAs. Results CSS is also large. These are maintenance opportunities, not reasons to rewrite the whole app.

## Runtime path

1. / redirects to /intake.
2. The client wizard gathers seven selections. None is mutually exclusive with other channel choices in the UI. Answers stay in React state; partial intake is lost on reload.
3. The client encodes answers into a base64url tuple and navigates to /results?q=....
4. The server decodes answers, computes 13 flags, applies additive scores to ten modules and adds an industry adjustment.
5. The engine selects six modules for founder-only, otherwise eight. It sorts by score, then slices them into phases: 2/2/2 or 3/3/2.
6. Separate branches generate primary/supporting services, engagement format, a suggested sprint, narrative, watch-outs and CTA metadata.
7. Results render the plan. Toolbar copies an answer link or opens browser print.
8. Email submission validates an outer request, decodes answers again, recomputes the plan, maps it to a summary template and calls Resend.
9. The post-send lead hook only logs in selected modes; it does not persist the lead.

## Findings and priority

| ID | Priority | Finding | Evidence status / consequence |
|---|---|---|---|
| F01 | P0 before next release | Outdated vulnerable dependencies | Manifest pins Next 15.5.14. Official October 14 advisory points to patched 15.5.28. npm audit --omit=dev reports 9 vulnerable dependency nodes: 1 critical, 5 high, 3 moderate. Exploitability varies by feature/runtime. |
| F02 | P0 before wider use | Legacy decoding is not runtime schema validation | Numeric/string/object activeChannels and unknown enums can pass. Numeric activeChannels reproduced HTTP 500 on /results locally. |
| F03 | P1 | Ranking is incorrectly presented as scheduling | Slicing by score leaves original mod.phase and mod.week unchanged; a module labeled Week 9-11 can appear in Days 1-30. Reproduced in demo and generated cases. |
| F04 | P1 | Stub inquiry paths imply capture | Get full version and request call only console.info personal details; UI says details are noted. No durable submission exists. |
| F05 | P1 | Browser fallback address is hardcoded | buildMailtoHref uses strategy@example.com. Server environment fallback cannot fix the client helper. |
| F06 | P1 | Industry inference is too broad | All professional-service answers map to legal, including accounting, consulting and finance explicitly offered by intake. Legal narrative can misdescribe them. |
| F07 | P1 | Service and engagement branches can disagree with priorities | They are independent ordered conditionals, not a single decision model. Clinic booking and ROI conditions have different precedence across branches. Manual-workflow demo recommends website work despite workflow pressure. Needs strategic owner review. |
| F08 | P1 | Stated bottleneck can be ignored by its named flag | hasMessyStack checks only stackMaturity=messy/none, not bottleneck=messy-stack. A solid-stack/messy-bottleneck fixture yields MarTech score zero while explanation claims that bottleneck raises it. |
| F09 | P1 | Email route lacks production abuse/retry controls | No rate limit, application idempotency, body-size boundary or provider-call exception boundary is present in source. Length-limited fields and honeypot are helpful but incomplete. Hosting protections were not inspected. |
| F10 | P1 | Answer links are not stable plan snapshots | Links encode answers/schema version, not rules/content versions. The same link can change after engine updates. No expiry exists, despite one error message mentioning expired data. Links are encoded, not encrypted. |
| F11 | P1 | Capacity model is too shallow | Founder-only reduces count from eight to six, but no hours, budget, readiness or prerequisites constrain the plan. Selecting six large workstreams does not establish feasibility. |
| F12 | P1 | Email cannot reopen the full plan directly | Model/template omit a results URL; prose tells the recipient to revisit the page/link but supplies only the strategy CTA. |
| F13 | P2 | Invalid q plus valid legacy answers diverge between page and email | Page parser falls back to legacy answers; ResultsDisplay still chooses raw q first for the email token. Reproduced at function level. |
| F14 | P2 | Public copy exposes implementation and overstates status | UI mentions environment keys, deterministic internals and commercial path. Email success says Delivered after API acceptance, without a delivery event. |
| F15 | P2 | Accessibility and print need direct verification | Wizard has no explicit focus transfer/reduced-motion handling or semantic progress control. Print styles exist but no completed browser/print test was possible here. No claim of accessibility compliance is made. |
| F16 | P2 | Documentation and quality automation lag | No lint/test/typecheck scripts, no tracked env example or LICENSE. README describes removed homepage and vanilla-extract files. |

P0 means address before another release or broader promotion; it does not mean this audit performed exploitation or confirmed compromise.

## Concrete reproduction examples

### Schedule contradiction

clinic-bookings demo: healthcare, early, more-bookings, no-leads, SEO/social, basic stack, founder-only. Phase 1 contains website-conversion labeled Week 5-7 and crm-cleanup labeled Week 5-6. The phase header says Days 1-30. SaaS reporting places attribution-cleanup labeled Week 11-12 in Phase 1. This is a visible product contradiction, not just an unused metadata field: ResultsDisplay renders mod.week.

28,797 of 28,800 generated cases had at least one mismatch between a module's default phase and assigned phase. This is a synthetic-coverage observation, not a real-user prevalence estimate. 12,168 cases selected at least one zero/negative-scored module because selection always fills six/eight positions. Such selection may be intentional, but needs a minimum-value/defer rule instead of implicit filler.

### Legacy link failure

Take a valid intake object and change activeChannels to 3. Base64-encode the JSON as the legacy answers query. decodeIntakeAnswersLegacy returns it because it checks only truthy scalar fields. composeRoadmap calls includes on the numeric value and throws. The built local /results route returned 500. sendRoadmapRequestSchema accepts the same token in its otherwise valid outer request; composition occurs before the existing rendering try/catch.

### No active-channel specificity

Scoring uses the boolean hasActiveChannels, not distinct SEO versus paid/email channel logic. The current channel question provides context and whether optimization is appropriate; it does not select channel-specific execution plans. Keep claims proportionate or add tested channel rules later.

## What is worth preserving

- Pure deterministic composition, easy to inspect and inexpensive to run.
- One composition pipeline for page and email; server recomputation rather than trusting posted plan HTML.
- Strong separation between request schema, view-model and email template.
- Twelve reusable synthetic demos.
- Strict TypeScript, relatively small dependency surface, and basic buildability.
- No account required to get value, compact links and browser-native export.
- Some privacy-conscious default logging choices in the server lead hook, although client stubs undermine that discipline.

## Tests performed and limits

Passed: isolated npm ci --ignore-scripts, next build, TypeScript no-emit check; 28,800 generated domain cases with count/uniqueness and semantic round-trip invariants; 1,536 channel-mask round trips; all 12 email view-model title/phase parity checks; valid local result, root redirect, missing-configuration 503 and unknown-route 404.

Deliberately failing probes reproduced malformed legacy data and identified phase/week conflicts. A passing invariant matrix does not establish that marketing advice is correct or commercially effective.

Browser automation could not launch because the available Playwright package lacked its browser binary; the attempted download returned an invalid/truncated archive. HTTP and domain checks were completed instead. Keyboard behavior, real mobile rendering, print layout, contrast, screen readers, real email, delivery/bounce handling and booking remain unverified. Production environment values were not read. No production endpoint received malformed probes or email requests.
