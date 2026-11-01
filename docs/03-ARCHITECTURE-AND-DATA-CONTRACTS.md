# Architecture and data contracts

## Existing modules and responsibilities

| Layer | Current files | Behavior |
|---|---|---|
| Domain types | src/lib/types.ts | IntakeAnswers, Flags, module/phase/service/result types |
| Intake catalog | questions.ts, demo-profiles.ts | Seven question definitions and twelve synthetic presets |
| Signals | flags.ts | Thirteen derived booleans |
| Priority policy | rules.ts, industry.ts | Additive scores, industry nudges, service/engagement/narrative logic |
| Work catalog | modules.ts | Ten module definitions, static phase/week/outcomes/effort |
| Assembly | compose-roadmap.ts | Select six/eight, slice phases, attach narrative and recommendations |
| Transport | encode-answers.ts | Compact schema-v1 tuple and legacy JSON encoding/decoding |
| Intake UI | app/intake/IntakeForm.tsx | Client wizard, in-memory state, compact URL navigation |
| Results UI | app/results/page.tsx, ResultsDisplay/LeadForm/Toolbar | Server composition, display, print/share and submission |
| Delivery | app/api/send-roadmap/route.ts, lib/email/*, emails/RoadmapEmail.tsx | Request schema, recomposition, summary model, rendering and provider call |

Current flow: selections -> encoded answers -> server decode -> flags -> scores -> selection -> phase slices -> explanations/service branches -> page or email summary. There is no stored plan identity, rules version or submission record.

## Proposed boundary: pure decisions, thin adapters

Keep src/lib domain code independent of hosting, storage, CRM and model APIs. Incrementally split rules.ts by concern once tests protect behavior; do not move files and change policy in the same difficult-to-review patch.

Proposed stages:

1. Parse and validate input.
2. Normalize answers and make assumptions explicit.
3. Compute rule contributions with stable rule IDs.
4. Rank candidate work and explain relevance.
5. Apply eligibility, prerequisites and capacity.
6. Assign a schedule or an honest “do next / later” grouping.
7. Produce an output model with actions and deferred work.
8. Map to HTML, print or summary email.
9. Hand an explicit request to a delivery/storage adapter when the user asks.

## Intake contract

Create a shared runtime schema for all fields and enum values. Reject wrong types before any includes/map call. Channel values must be allowed, unique and canonicalized; none must not coexist with real channels. Decide whether an empty array is normalized to none or rejected, and apply the policy consistently to both URL formats and API.

Validate compact payload length, exact version, integral bounded indexes and an integral channel mask from 0 through 127. Reject fractional masks and unknown bits rather than silently interpreting them. Bound token length before decoding; apply equivalent bounds to query and body inputs.

Return a validated canonical answer object and its canonical token from one parser. ResultsDisplay and email should use that token, even if an invalid q caused fallback to a valid legacy payload. Preserve known valid old links under an explicit compatibility policy; do not treat legacy decoding as a trusted bypass.

## Recommendation and scheduling contract

Separate these concepts:

- ModuleDefinition: stable ID, relevance criteria, default hints, prerequisites, estimated effort band, actions and suggested success evidence.
- ScoredCandidate: ID, raw score and rule-contribution trace. A score is a heuristic, not confidence or predicted ROI.
- SelectedWork: selection reason, eligibility, assumptions, dependencies and defer reason when omitted.
- ScheduledWork: assigned phase/date range from the scheduler; no stale definition week is rendered.
- EngagementSuggestion: optional commercial recommendation with its own explanation; cannot override the useful plan to favor a sale.

For the first release, a simple dependency-aware scheduler or honest priority groups may be sufficient. Do not build a general project-management optimizer. Resolve the policy with Jacob before implementation and capture canonical fixtures.

Use stable service IDs for branching and map labels separately. Current CTA selection matches exact service-title strings; editing display copy can break that coupling. Centralize service/booking configuration so browser and email share the same approved destination.

## Versioning and share semantics

Current q schemaVersion=1 describes the encoding only. It does not freeze rules or content. Decide between:

- Recompute-on-open: simplest, but label the engine/content revision and warn that results can change; define support for older inputs.
- Stored snapshot: introduces storage/access/retention work but can preserve an approved plan.
- Versioned deterministic recipe: include engine/content versions and retain compatible implementations/data; avoids storing personal details but costs version maintenance.

Suggested starting decision: versioned output metadata plus explicit recomputation wording, with snapshots deferred unless users require them. Do not promise identical future results without implementing one of the stable alternatives.

Never place name, email, company-private free text or confidential business details in shared URL tokens. Base64 is encoding, not confidentiality. If server snapshots are introduced, design unguessable access, revocation and retention deliberately.

## Delivery contract

The current route has configuration checks, JSON parsing, strict outer Zod validation, honeypot, token decode, server recomposition, React Email rendering and a Resend call. Provider returned errors are handled, but unexpected composition/send exceptions are not fully contained. There is no durable submission status.

Proposed adapter input: validated canonical answers or a versioned plan reference, recipient address, requested action and consent context appropriate to that action. Proposed result: request ID, accepted/failed/unknown state, safe error code and optional provider message ID. Do not turn “provider accepted” into “recipient inbox received.”

If persistence is added, distinguish lead/request storage from full plan storage. Define a small repository interface before selecting a provider. Persist minimum fields, policy version, requested intent, plan version/reference and delivery state as needed. Separate transactional delivery from optional marketing permission. Retention/deletion must be decided before collecting a database of leads.

Use a stable request ID for application idempotency and provider idempotency; do not deduplicate all future emails to a person indefinitely. Resend's documented provider-key window is 24 hours, not permanent storage or a substitute for abuse controls. Constrain outbound retry behavior and reconcile partial failures.

## Website boundary

Prefer a stable standalone tool linked from the selected LLC site first. Keep the engine independent so it can later be imported as shared code or served behind a carefully tested integration route. No iframe, rewrite, subpath or monorepo arrangement is selected by this document. Each must be tested for root-relative /intake, /results and /api paths before adoption.
