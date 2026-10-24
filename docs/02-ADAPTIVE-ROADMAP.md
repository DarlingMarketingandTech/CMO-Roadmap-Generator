# Adaptive roadmap blueprint

Status: proposed, ready for owner discussion and first bounded implementation. Baseline and findings: [01-CURRENT-STATE-AUDIT.md](01-CURRENT-STATE-AUDIT.md). No phase below is implemented by this documentation package.

## Desired result

An owner can finish a short assessment, recognize the situation described, choose one feasible next action, save/share the plan and request help without losing the request. The result should demonstrate Jacob's strategic and technical judgment on GitHub and fit naturally into the LLC website.

Useful is the first goal. Impressive follows from clear reasoning, disciplined engineering, good writing and evidence that the product works.

## Proposed product principles

- Preserve a deterministic recommendation core with visible reasons and versioned behavior.
- Favor an owner-led business pilot over claiming expertise across every industry immediately.
- Distinguish recommended priorities from the schedule, prerequisites and commercial service offer.
- Offer value before asking for contact details.
- Make work explicit: action, owner, effort band, dependency and evidence of completion.
- Prefer one reliable lead path and one small delivery adapter over several half-connected choices.
- Defer accounts, broad CRM sync, payments, autonomous agents and AI-generated strategy until a proven need justifies them.

## Milestones and exit gates

| Milestone | Proposed scope | Evidence to exit | Reconsider when |
|---|---|---|---|
| M0: establish the new home | Choose canonical repo/board; preserve history; import docs; patch supported dependencies and pin runtime | Exact base/target SHA, clean install, type/build checks, reviewed dependency audit and captured baseline scenarios | New repo adds no value beyond a Project board; local source diverges |
| M1: trustworthy input and decisions | Shared intake schema, decoder normalization, canonical token, phase/date contract, bottleneck/industry fixes, core regression suite | Malformed URLs fail safely; valid compact/legacy behavior is defined; no rendered phase/week contradiction; selected fixtures reviewed strategically | Fixing schema requires backward-compatibility migration or schedule policy changes |
| M2: a genuinely useful owner plan | Narrow pilot audience; add readiness/capacity evidence only where it changes decisions; one next action; detailed tasks and success checks; expandable reasoning | Five representative target scenarios produce plausible, achievable plans; user can explain first action and why | Users need a guided review rather than self-service; inputs are too vague |
| M3: dependable delivery and inquiry | One real request flow, safe email adapter, results link, durable lead decision, retry/idempotency/abuse controls, truthful states | Fake-provider acceptance tests; one separately scoped real test; retained request trace; configured booking/contact path; no fake saved/delivered state | Storage/provider complexity exceeds pilot needs; retention/privacy decisions unresolved |
| M4: polished, inclusive presentation | Mobile and keyboard pass; focus and reduced motion; concise progressive results; tested print; copy and branding aligned with selected site | Actual browser evidence at phone/tablet/desktop sizes, keyboard flow, readable print output, no dead CTA | New UI obscures explanations or expands the intake without benefit |
| M5: website integration and portfolio release | Stable standalone URL/link first; decide integration boundary; CI, example, rights/license, deployment verification | Versioned release and exact preview; working website handoff; agreed public scope; no unsupported claims | Website architecture changes; embedding adds routing/cookie/policy cost |
| M6: pilot and measured iteration | Small pilot, privacy-conscious funnel metrics, reviewed feedback, one improvement at a time | Evidence that users complete and use the result; clear next revision rationale | No one values the result; the product should become a guided consulting tool |

M0 and M1 should start before integration. M2 and M3 can inform each other, but avoid expanding both scope and infrastructure at once. M4 can be explored early with low-cost prototypes, while final polish follows a stable output contract. M5 can initially be only an ordinary link from the LLC site.

## Suggested first three work slices

### Slice A: preserve and patch

Preserve the March baseline and import history if moving. Recheck current advisories. Patch the 15.x line first if it remains supported, rather than combining a major framework migration with rule changes. As researched, 15.5.28 is an official patched release; use a newer supported patch if required when implementation begins. Review direct and transitive package fixes, including the lockfile's Zod/Resend-related findings. Pin Node/package-manager versions and add reproducible check scripts.

Completion: source baseline retained; upgraded branch builds/types check; domain fixture behavior unchanged except documented dependency effects. A new build alone does not authorize production release.

Local status on October 23, 2026: the 15.5.28 patch, lockfile overrides, clean install, typecheck, and build are committed locally as CMO-001 (`77413607aed8630c717c768052e2a2d7dfa7236f`). Next 16 and production release stay deferred. Details are in the validation record and session handoff.

### Slice B: close trust-breaking bugs

Add the shared runtime intake schema and canonical decode result. Fix numeric channels/unknown enums, compact mask constraints and q/legacy fallback. Fix the professional-service mapping and messy-stack bottleneck behavior with strategic approval. Separate assigned schedule metadata from default module hints. Remove or explicitly disable nonfunctional lead intents and example contact links.

Completion: the reproduced failure cases become regressions; representative valid plans render coherent dates and an honest CTA. No new database or AI dependency is required for this slice.

### Slice C: make one output actionable

Choose a pilot segment and one real recurring problem. Review the content and rules behind five representative cases. Replace broad deliverables with first actions, assumptions, prerequisites, effort bands and definitions of done. Add a capacity control only if it improves which work gets selected or deferred. Do not collect extra data merely to look personalized.

Completion: a tester can name the next action, the reason and a sensible way to tell it is complete.

## Capacity and timeline

Plan by reviewed slices, not an externally promised date. A reasonable first session is source/branch setup plus a dependency assessment; subsequent sessions can isolate validation and scheduling. Estimate effort after selecting the schedule and storage policies. Avoid a fixed “two weeks to production” promise before those decisions.

## Change protocol

At each milestone review:

1. Record observed problem/opportunity and supporting evidence.
2. State the smallest change worth testing and what it displaces.
3. Identify affected contract, migration or privacy assumptions.
4. Update the decision log and backlog priorities.
5. Define a measurable acceptance check and rollback/defer option.

Keep Now to one main milestone and a few bounded work items. Keep Next to the following gate. Everything else stays Later or explicitly Deferred. Avoid relabeling new ideas as committed requirements.

## Optional opportunities and their triggers

| Opportunity | Consider only when | Small experiment |
|---|---|---|
| AI explanation or rewriting | Users struggle to understand approved deterministic recommendations | Rewrite an already-computed plan without changing priorities; compare comprehension and factual consistency |
| Website crawl/import | Self-reported inputs demonstrably miss important readiness signals | Opt-in fetch of one public page; show evidence and allow correction; bound URL access |
| CRM adapter | Durable pilot requests are being used and manual transfer becomes costly | One-way, consent-aware idempotent handoff to one chosen CRM |
| Accounts and saved plans | Returning users actually need cross-device editing/history | Test a saved-plan link before a full account system |
| PDF generation service | Browser print fails the actual distribution need | Compare one high-quality print template with a generated PDF |
| Rules editor | Repeated content/rule updates become slow and error-prone | Versioned data files and validation before an admin CMS |

These are experiments, not prerequisites to a useful first release.
