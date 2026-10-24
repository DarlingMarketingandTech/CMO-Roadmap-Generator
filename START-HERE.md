# CMO Roadmap Generator: research and project handoff

Prepared for Jacob Darling / Darling MarTech LLC, October 23, 2026.

## The recommendation

Keep the existing deterministic engine and turn it into a trustworthy planning tool for owner-led businesses. Its strongest asset is inspectable strategic logic. The next release should make the plan coherent, achievable and easy to act on, then connect an honest inquiry/delivery workflow to the LLC website.

Do not begin with a rewrite, an AI orchestration layer or another large feature list. The current app builds, but planning correctness and input validation need work before a wider launch. This deeper audit refines the earlier portfolio recommendation: the opportunity is strong; the immediate work is reliability and product quality, followed by presentation and integration.

## What was established

- GitHub main, the clean Dell XPS checkout and the latest READY Vercel production deployment all point to `d7ad20bb3df07d6e7be2a5af932f509738a4aede`.
- All 36 tracked non-public-asset text files were retrieved, including the lockfile, CSS, components, domain logic and email code. The tree has 43 tracked files total. Binary/public visual assets were inventoried, not visually audited.
- An isolated install from the committed lockfile, production build and TypeScript check passed.
- Domain probes covered every combination of the six scalar questions, with one rotating representative channel set per combination: 28,800 cases. Another 1,536 cases covered all 128 valid channel masks for each of 12 demo profiles.
- The basic structural/round-trip invariants passed. Important product inconsistencies and malformed-input failures were reproduced; see the audit and validation documents.
- No live emails were sent, production settings changed, repositories created or existing code pushed.

## The four findings that drive the plan

1. **Patch dependencies first.** The source pins Next.js 15.5.14. An official October 14 security advisory identifies 15.5.28 as a patched 15.x release. The lockfile audit also reports vulnerable dependency nodes. Recheck current advisories before implementation; a package warning alone does not prove this exact deployment is exploitable.
2. **Make sequencing truthful.** Modules are sorted by score and sliced into phases, but retain original week labels. A founder clinic demo places website work labeled Week 5-7 in Days 1-30. Ranking importance is not a schedule.
3. **Validate the full decoded intake.** A legacy URL with numeric activeChannels passes decoding and produces HTTP 500 locally. The email request envelope also accepts that inner payload before composition throws.
4. **Make follow-up real.** Two inquiry options are stubs; lead logging does not persist submissions; fallback links use strategy@example.com; the emailed summary does not include a full results link. Complete one reliable path before adding more.

## Read these in order

1. [Current-state audit](docs/01-CURRENT-STATE-AUDIT.md): what exists, findings, strengths and limits.
2. [Adaptive roadmap](docs/02-ADAPTIVE-ROADMAP.md): proposed sequence, gates and reconsideration points.
3. [Prioritized backlog](docs/04-PRIORITIZED-BACKLOG.md): concrete buildable work items.
4. [Validation and acceptance](docs/05-VALIDATION-AND-ACCEPTANCE.md): what must be proved.
5. [Repository transition and website integration](docs/08-REPOSITORY-TRANSITION-AND-WEBSITE-INTEGRATION.md): how to start without creating another drifting copy.

README.md is a replacement/readme draft for the future code home. AGENTS.md is the single concise agent operating contract. The remaining documents supply architecture, UX, decisions, evidence and a next-session handoff. The GitHub issue template supports bounded work without introducing a new agent hierarchy.

## Current local setup

The documentation has been installed in the existing synced CMO-Roadmap-Generator repository for work in Cursor. Application source and the existing root README are preserved. The proposed replacement README is in docs/README-PROPOSED.md. Continue in this existing code home unless Jacob later chooses a move.

Open this repository folder in Cursor. Begin by reading AGENTS.md, this file, and docs/10-SESSION-HANDOFF.md; inspect current code and working-tree changes, then begin CMO-001. The newly added documentation is expected to appear as untracked files until reviewed and committed.

## How to use this package

This ZIP contains Markdown documentation only. It does not include application source, dependencies, secrets, a configured database, CI workflows or deployment configuration. Add the files after choosing the canonical repository and importing the application history. Read the transition guide before replacing any existing README. Nothing in this package claims that proposed features already work.

A GitHub Project board and a GitHub repository are different things. If you only need a dedicated planning workspace, keep the existing repository and attach a Project board. If you prefer a new repository, preserve history and make one home canonical. Either choice can use this package.

## First bounded build task

Confirm the source commit and new home; preserve the audited baseline; update dependencies to supported patched versions on a focused branch; rerun build, type checking and the baseline fixtures. Then fix intake validation and the reproduced legacy-link crash. Leave the visual redesign and website release for later milestones.

The roadmap is a proposal, not a fixed commitment. Reorder it when evidence changes. Record why, what is deferred and what success will prove; keep one active milestone small enough to review.
