# Evidence register

Prepared October 23, 2026. All repository references below are pinned to the inspected SHA. External documentation is a retrieved snapshot; verify current supported versions before future implementation.

CMO-001 rechecked the support policy and October 14, 2026 Next.js advisory on October 23, 2026 before editing dependencies. The support page still listed 15.x as Maintenance LTS and 16.x as Active LTS. Its two-year maintenance wording dates from the October 21, 2024 release of 15, so that window should be rechecked before another release. The newest published 15.5 release found was 15.5.28. The resulting local verification is in [05-VALIDATION-AND-ACCEPTANCE.md](05-VALIDATION-AND-ACCEPTANCE.md). It does not replace the baseline evidence below.

## Primary source and deployment

- [Repository](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator)
- [Commit d7ad20bb3df07d6e7be2a5af932f509738a4aede](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/commit/d7ad20bb3df07d6e7be2a5af932f509738a4aede)
- [Merged initial PR #1](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/pull/1)
- [Observed Vercel deployment inspector](https://vercel.com/darling-mar-tech/cmo-roadmap-generator/HmstigFMAUGpNTi4fqWStF2toMZn): READY, production, matching SHA. Vercel status is not workflow verification.
- [Public intake retrieved](https://cmo-roadmap-generator.vercel.app/intake): first question/options, HTTP 200 through Firecrawl.
- Dell XPS read-only git status/HEAD: clean at matching SHA. No environment secrets read.
- [Drive project folder](https://drive.google.com/drive/folders/1fIsD0ZxknqVRbRGbXjmyx13tSpyGd96Z): two historical PNGs located; not used as current UI validation.
- Optional knowledge-engine lookup failed with unavailable/429; no evidence came from that connection.

## Official technical references

| Reference | Used for |
|---|---|
| [Next.js support policy](https://nextjs.org/support-policy) | Supported LTS approach; recheck dates when implementing |
| [Next.js October 14, 2026 security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026) | Published patched releases 15.5.28 / 16.4.1 and feature-specific impacts; not proof of exploitability here |
| [Resend idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys) | Optional provider deduplication with documented 24-hour window |
| [Resend email event types](https://resend.com/docs/webhooks/event-types) | Separate sent/delivered/failure event vocabulary |
| [Resend delivered event](https://resend.com/docs/webhooks/emails/delivered) | Distinct provider delivery event; not proof of inbox reading |
| [W3C multi-page forms](https://www.w3.org/WAI/tutorials/forms/multi-page/) | Logical steps, orientation and progress; supports future UX checks |

The exploratory Resend URL /docs/webhooks/email-delivered returned 404; the corrected plural-path reference above was retrieved. It is not treated as a product defect.

## Audit methods

Reproducibility commands and observed outcomes are in [05-VALIDATION-AND-ACCEPTANCE.md](05-VALIDATION-AND-ACCEPTANCE.md). Scratch-only probe scripts and raw connector responses are not included in this public-ready documentation package. The probes used unchanged transpiled domain modules, twelve committed presets, the six scalar-question Cartesian product and channel masks. Future implementation should convert the relevant failures into committed regression tests.

## Complete text-file coverage

The following 36 tracked text files were retrieved. Public asset files and binary favicon were inventoried, not visually audited. Links identify source paths, not a claim that every possible runtime state has been tested.

| Source file | Audit purpose |
|---|---|
| [.gitignore](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/.gitignore) | Excluded runtime/secrets and missing env example implications |
| [README.md](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/README.md) | Documentation claims and drift |
| [next.config.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/next.config.ts) | Framework configuration |
| [package-lock.json](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/package-lock.json) | Exact dependency resolution and vulnerability inventory |
| [package.json](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/package.json) | Declared dependencies/scripts |
| [src/app/api/send-roadmap/route.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/api/send-roadmap/route.ts) | Email flow/view-model/schema |
| [src/app/globals.css](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/globals.css) | UI, styling, metadata or navigation behavior |
| [src/app/intake/IntakeForm.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/intake/IntakeForm.tsx) | UI, styling, metadata or navigation behavior |
| [src/app/intake/page.module.css](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/intake/page.module.css) | UI, styling, metadata or navigation behavior |
| [src/app/intake/page.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/intake/page.tsx) | UI, styling, metadata or navigation behavior |
| [src/app/layout.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/layout.tsx) | UI, styling, metadata or navigation behavior |
| [src/app/page.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/page.tsx) | UI, styling, metadata or navigation behavior |
| [src/app/results/ResultsDisplay.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/results/ResultsDisplay.tsx) | UI, styling, metadata or navigation behavior |
| [src/app/results/ResultsLeadForm.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/results/ResultsLeadForm.tsx) | UI, styling, metadata or navigation behavior |
| [src/app/results/ResultsToolbar.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/results/ResultsToolbar.tsx) | UI, styling, metadata or navigation behavior |
| [src/app/results/page.module.css](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/results/page.module.css) | UI, styling, metadata or navigation behavior |
| [src/app/results/page.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/app/results/page.tsx) | UI, styling, metadata or navigation behavior |
| [src/components/brand/BrandWordmark.module.css](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/components/brand/BrandWordmark.module.css) | UI, styling, metadata or navigation behavior |
| [src/components/brand/BrandWordmark.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/components/brand/BrandWordmark.tsx) | UI, styling, metadata or navigation behavior |
| [src/emails/RoadmapEmail.tsx](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/emails/RoadmapEmail.tsx) | Email flow/view-model/schema |
| [src/lib/booking-url.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/booking-url.ts) | UI, styling, metadata or navigation behavior |
| [src/lib/compose-roadmap.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/compose-roadmap.ts) | Selection and phase assignment |
| [src/lib/demo-profiles.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/demo-profiles.ts) | Synthetic scenarios |
| [src/lib/email/decode-roadmap-token.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/email/decode-roadmap-token.ts) | Email flow/view-model/schema |
| [src/lib/email/log-lead-submission.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/email/log-lead-submission.ts) | Email flow/view-model/schema |
| [src/lib/email/roadmap-email-model.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/email/roadmap-email-model.ts) | Email flow/view-model/schema |
| [src/lib/email/send-roadmap-schema.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/email/send-roadmap-schema.ts) | Email flow/view-model/schema |
| [src/lib/encode-answers.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/encode-answers.ts) | Transport validation, fallback and compatibility |
| [src/lib/flags.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/flags.ts) | Signal derivation |
| [src/lib/industry.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/industry.ts) | Industry mapping/score/language assumptions |
| [src/lib/modules.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/modules.ts) | Work definitions and stale week metadata |
| [src/lib/motion.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/motion.ts) | UI, styling, metadata or navigation behavior |
| [src/lib/questions.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/questions.ts) | Intake choices |
| [src/lib/rules.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/rules.ts) | Scoring, policy precedence, explanation and CTA coupling |
| [src/lib/types.ts](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/src/lib/types.ts) | Domain contracts |
| [tsconfig.json](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator/blob/d7ad20bb3df07d6e7be2a5af932f509738a4aede/tsconfig.json) | Compiler strictness and aliases |
