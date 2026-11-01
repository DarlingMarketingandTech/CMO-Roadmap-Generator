> Proposed replacement for the root README. It is staged here for comparison; the existing root README has been preserved. If adopting it at the root, update its relative documentation links.

# CMO Roadmap Generator

A short business assessment that produces an explainable, phased marketing plan and a practical next step.

For owners who have too many disconnected marketing priorities, this project aims to answer: **What should we work on first, why does it matter, and what can our available team realistically complete?**

## Status

Research and planning package prepared October 23, 2026. The audited upstream application is [DarlingMarketingandTech/CMO-Roadmap-Generator](https://github.com/DarlingMarketingandTech/CMO-Roadmap-Generator), commit `d7ad20bb3df07d6e7be2a5af932f509738a4aede`.

If this README has just been added to a new repository, import the application source/history before running the commands below. The documentation package alone is not a runnable app. The dependency/security and correctness findings in the audit are still open until a subsequent change proves otherwise.

## Existing application capabilities

- Seven-question intake: business type, stage, goal, bottleneck, channels, stack maturity and team capacity.
- Deterministic rules that rank ten work modules and select six or eight.
- Three phase groups, an executive summary, explanation, watch-outs and engagement suggestions.
- Compact and legacy links that encode answers; no account or database is required to view a plan.
- Browser print/save-PDF controls.
- A server endpoint and branded Resend summary-email template, dependent on external configuration.

These are source-backed capabilities, not a claim that every user journey is production-ready. Scheduling consistency, strict input validation, delivery reliability and commercial follow-up need improvement. See [the audit](01-CURRENT-STATE-AUDIT.md).

## Design direction

Preserve the explainable core. Separate priority selection from scheduling and capacity. Make every recommendation traceable, every call to action honest and every plan useful without requiring an email address. Add AI or external integrations only when a focused experiment demonstrates a benefit worth the cost and operating burden.

The output is planning guidance based on self-reported answers, not a completed business audit, guaranteed forecast or promise of results.

## Current stack

Next.js App Router, React, TypeScript in strict mode, CSS Modules/custom properties, Motion for React, React Hook Form, Zod, React Email and Resend. The audited manifest pins Next.js 15.5.14 and React 19.1.0; these are baseline facts, not recommended versions for a new release. Patch and verify dependencies first.

## Run the imported source

Use the runtime and lockfile selected for the current milestone. The audited Vercel project specifies Node 24.x; the source does not yet pin a Node engine or package-manager version.

```sh
npm ci
npm run dev
```

Existing checks, before adding new scripts:

```sh
npx tsc --noEmit --incremental false
npm run build
```

The baseline has no `test`, `lint` or `typecheck` script. Add meaningful tests and CI during the first milestones; do not claim nonexistent commands passed.

Without email credentials, plan generation still works; the email endpoint returns 503. Do not configure real delivery while running synthetic route tests. Configure credentials through local ignored environment files and the deployment provider; never put them in this README or a public issue.

## Environment contract

| Variable | Existing use |
|---|---|
| RESEND_API_KEY | Required to send email |
| RESEND_FROM | Required sender; verify it with the provider |
| RESEND_REPLY_TO | Optional reply destination |
| NEXT_PUBLIC_BOOKING_URL | Public booking CTA |
| STRATEGY_BOOKING_URL | Server-side email override |
| STRATEGY_CONTACT_EMAIL | Server fallback email address |
| LEAD_LOG_VERBOSE | Enables personal-data logging; avoid in production |

The current browser mailto helper ignores STRATEGY_CONTACT_EMAIL and hardcodes an example address. Do not assume setting the server variable fixes browser links. The upstream README references env.example, but no such file is tracked. Add a reviewed blank-valued environment example as implementation work; the baseline .gitignore ignores all .env-prefixed names.

## Documentation

- [Start here](../START-HERE.md)
- [Current-state audit](01-CURRENT-STATE-AUDIT.md)
- [Adaptive roadmap](02-ADAPTIVE-ROADMAP.md)
- [Architecture and contracts](03-ARCHITECTURE-AND-DATA-CONTRACTS.md)
- [Prioritized backlog](04-PRIORITIZED-BACKLOG.md)
- [Validation](05-VALIDATION-AND-ACCEPTANCE.md)
- [Product and UX brief](06-PRODUCT-AND-UX-BRIEF.md)
- [Decisions and open questions](07-DECISIONS-AND-OPEN-QUESTIONS.md)
- [Repository transition / website integration](08-REPOSITORY-TRANSITION-AND-WEBSITE-INTEGRATION.md)
- [Evidence register](09-EVIDENCE-REGISTER.md)
- [Next-session handoff](10-SESSION-HANDOFF.md)

## Portfolio evidence

An isolated build/type check passed and the source-matching Vercel production deployment was READY at audit time. Domain and HTTP checks are recorded with their limitations in the validation document. No adoption, revenue, customer conversion or email deliverability result has been established.

When the next release is verified, add a synthetic worked example, an annotated decision trace and a short demonstration. Document the problem, tradeoffs and measured checks instead of presenting feature counts as proof of value.

## Ownership and license

Project owner: Jacob Darling / Darling MarTech LLC. The audited tree contains no LICENSE file. Public source visibility does not itself select an open-source license. Choose a license and verify rights to assets/dependencies before presenting the new repository as an open-source release.
