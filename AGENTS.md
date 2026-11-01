# Agent working agreement

## Goal

Build a trustworthy, explainable marketing-planning tool for owner-led businesses. Improve useful decisions, achievable scope and reliable follow-through. Prefer a focused improvement to a rewrite or an integration added for its own sake.

## Read order and authority

1. User instructions in the current session.
2. This file.
3. docs/10-SESSION-HANDOFF.md and the active milestone in docs/02-ADAPTIVE-ROADMAP.md.
4. Relevant architecture, backlog and validation sections only.

Source code determines current runtime behavior. docs/01-CURRENT-STATE-AUDIT.md is a dated baseline; do not silently rewrite its historical findings as current facts. Record later verification separately. docs/07-DECISIONS-AND-OPEN-QUESTIONS.md records proposed and accepted design decisions. No agent or subagent hierarchy is required by this package.

## Before changing code

- Confirm canonical repository, branch, HEAD and working-tree changes. Preserve other work.
- Select one bounded backlog item and its acceptance checks; state what it proves.
- Inspect relevant source before relying on the old README or audit.
- Do not infer permission to publish, merge, deploy or contact people from a planning task. Follow the actual authorization in the session without inventing extra approval gates for ordinary reversible work.

## Invariants

- One validated IntakeAnswers contract for UI, compact links, legacy links and the API.
- Same valid input and the same engine/content versions produce the same semantic plan.
- Canonicalize a validated answer object; do not forward an unvalidated raw token after falling back to another format.
- Priority ranking, prerequisite ordering, capacity and assigned dates are distinct concerns. Render dates from the assigned schedule.
- Explain real rule contributions; do not fabricate confidence percentages, revenue forecasts or completed outcomes.
- Recompute the plan server-side before sending; never trust client-supplied plan HTML or business recommendations.
- Keep planning accessible without a signup. Collect only information required for a chosen follow-up action.
- A stub must not claim details were saved. Provider acceptance must not be labeled inbox delivery.
- Never log credentials or full personal submissions by default. Keep private business/client records out of public fixtures.

## Implementation habits

Preserve the pure domain boundary under src/lib. Separate content/service IDs from display labels before broad catalog changes. Add small adapters for chosen delivery/storage providers; do not make the engine depend on CRM, AI or hosting APIs. Reuse existing components. Add libraries only for a demonstrated need.

## Verification and handoff

Run the checks appropriate to the change. Until scripts are introduced, use `npx tsc --noEmit --incremental false` and `npm run build`. Add regression cases for the reproduced decoder and schedule defects; avoid tests that merely repeat implementation. Test email through a fake transport unless a real test send is explicitly in scope. Record exact commit, command, result and material limitations. A successful build is not a browser, accessibility or delivery test.

Update the relevant backlog status and next-session handoff after a coherent milestone. Record why plans changed. Keep proposals marked proposed until decided or implemented, and implementation marked unverified until tested.
