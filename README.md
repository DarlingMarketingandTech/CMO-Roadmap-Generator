# CMO Roadmap Generator

A production-ready, deterministic 90-day marketing roadmap generator for SMB and mid-market businesses. Users answer 7 intake questions and instantly receive a personalized, phased marketing plan — no AI, no database, no login required.

## What It Does

The CMO Roadmap Generator takes a user through a 7-question intake covering their business type, stage, goals, bottlenecks, active channels, stack maturity, and team capacity. A deterministic rules engine maps those answers to a prioritized set of roadmap modules distributed across three 30-day phases:

- **Phase 1 — Foundation** (Days 1–30): Establish the strategic and operational baseline
- **Phase 2 — Build & Systems** (Days 31–60): Stand up core marketing infrastructure
- **Phase 3 — Optimize & Scale** (Days 61–90): Compound results through testing and automation

The output includes:
- Top 3 priorities to act on immediately
- Full 3-phase module breakdown with outcomes and effort levels
- Primary and secondary service recommendations
- A personalized "Why This Roadmap" explanation based on the user's answers

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

To build for production:

```bash
npm run build
npm start
```

## Tech Stack

| Concern | Library |
|---------|---------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | vanilla-extract/css |
| Animation | Motion for React |
| Forms | React Hook Form + Zod |
| Fonts | Inter + Playfair Display (next/font) |

**No AI APIs. No database. No authentication. No Tailwind CSS.**

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, global style import
│   ├── page.tsx            # Landing page
│   ├── page.css.ts         # Landing page styles (vanilla-extract)
│   ├── globals.css         # Minimal CSS reset (non-VE globals)
│   ├── intake/
│   │   ├── page.tsx        # Multi-step intake form
│   │   └── page.css.ts     # Intake styles (vanilla-extract)
│   └── results/
│       ├── page.tsx        # Results / roadmap page
│       └── page.css.ts     # Results styles (vanilla-extract)
├── lib/
│   ├── types.ts            # All domain TypeScript types
│   ├── questions.ts        # 7 intake questions with options
│   ├── flags.ts            # Answer → flag mapping
│   ├── modules.ts          # All 10 roadmap modules
│   ├── rules.ts            # Scoring, service recs, why-text
│   └── compose-roadmap.ts  # Roadmap assembly pipeline
└── styles/
    ├── tokens.css.ts       # Design tokens (colors, spacing, type)
    └── global.css.ts       # Global styles via globalStyle
```

## How the Deterministic Rules Engine Works

The engine runs in four sequential steps, all in `src/lib/`:

### 1. Compute Flags (`flags.ts`)

`computeFlags(answers)` maps raw answers to 10 boolean flags:

```ts
isPreLaunch         // stage === 'pre-launch'
isFounderOnly       // capacity === 'founder-only'
hasMessyStack       // stack === 'messy' | 'none'
needsBrandClarity   // bottleneck === 'unclear-messaging'
needsLeadGen        // goal === 'more-leads' | bottleneck === 'no-leads'
needsBookings       // goal === 'more-bookings'
needsROIClarity     // goal === 'roi-clarity' | bottleneck === 'no-reporting'
isLocalOrHealthcare // type === 'local-service' | 'healthcare'
hasActiveChannels   // channels.length > 0 && !includes('none')
isEarlyStage        // stage === 'early' | 'pre-launch'
```

### 2. Score Modules (`rules.ts`)

`scoreModules(flags, answers)` starts with all module IDs and applies a priority scoring pass:

| Rule | Effect |
|------|--------|
| `needsBrandClarity` | Brand Strategy moves to position 1 |
| `isPreLaunch` | GTM Planning moves to top 2; optimization deprioritized |
| `hasMessyStack` | MarTech Audit + CRM Cleanup move to top 3 |
| `needsROIClarity` | KPI Baseline + Attribution Cleanup move to top 4 |
| `needsBookings && isLocalOrHealthcare` | Local SEO + Website Conversion move to top 3 |
| `isFounderOnly` | Result set capped at 6 modules; operationally heavy modules dropped |
| `hasActiveChannels` | Conversion Optimization promoted; pure foundation deprioritized |

The function returns an ordered array of module IDs (6 for founder-only, 8 for others).

### 3. Assemble Modules (`compose-roadmap.ts`)

`composeRoadmap(answers)` fetches the full `RoadmapModule` objects from `modules.ts`, then distributes them into phases:

- Phase 1: modules 0–2 (first 3 in the scored list)
- Phase 2: modules 3–5
- Phase 3: modules 6–7 (or 5–7 for founder-only)

It also extracts the top 3 priorities (first 3 module titles), calls `getServiceRecommendations`, and calls `generateWhyThisRoadmap`.

### 4. Recommend Services + Why-Text (`rules.ts`)

`getServiceRecommendations(flags, answers)` returns primary/secondary service cards using the same flag logic.

`generateWhyThisRoadmap(flags, answers)` assembles a 3-sentence personalized summary from a set of conditional text blocks.

## How to Add New Questions

1. Add the new answer key to `IntakeAnswers` in `src/lib/types.ts`
2. Add corresponding value type (e.g. `type NewAnswerType = 'a' | 'b'`)
3. Add the question object to the `QUESTIONS` array in `src/lib/questions.ts`:

```ts
{
  id: 'myNewQuestion',
  label: 'Your question label?',
  description: 'Helper text for the user.',
  type: 'single', // or 'multi'
  options: [
    { value: 'a', label: 'Option A', description: 'Details about A' },
    { value: 'b', label: 'Option B', description: 'Details about B' },
  ],
}
```

4. If the new answer should drive routing logic, add a corresponding flag in `src/lib/flags.ts` and use it in `src/lib/rules.ts`

## How to Add New Roadmap Modules

Add an entry to the `ALL_MODULES` array in `src/lib/modules.ts`:

```ts
{
  id: 'my-new-module',
  title: 'My New Module',
  description: 'What this module delivers and why it matters.',
  phase: 2,          // default phase (1, 2, or 3)
  week: 'Week 5–6',  // reference timeline
  outcomes: [
    'First concrete outcome',
    'Second concrete outcome',
    'Third concrete outcome',
  ],
  effort: 'medium',  // 'low' | 'medium' | 'high'
}
```

Then reference its `id` in `scoreModules` in `src/lib/rules.ts` to include it in the scoring logic.

## How to Change Scoring Logic

All scoring rules live in `scoreModules()` in `src/lib/rules.ts`. The function:

1. Starts with `ALL_MODULE_IDS` in default order
2. Applies priority overrides using `splice` + `unshift` based on flag combinations
3. Optionally filters the list (e.g. drops modules that are too heavy for `isFounderOnly`)
4. Slices to the target length (6 or 8)

To change which modules are prioritized for a given flag, find the relevant `if (flags.someFlag)` block and reorder accordingly. To add a new rule:

```ts
if (flags.myNewFlag) {
  // Move 'my-new-module' to position 1
  const idx = ordered.indexOf('my-new-module');
  if (idx > -1) ordered.splice(idx, 1);
  ordered.unshift('my-new-module');
}
```

## Available Roadmap Modules

| ID | Title | Default Phase |
|----|-------|--------------|
| `brand-strategy` | Brand Strategy & Positioning | 1 |
| `gtm-planning` | Go-To-Market Planning | 1 |
| `martech-audit` | MarTech Audit & Cleanup | 1 |
| `kpi-baseline` | KPI / Reporting Baseline | 1 |
| `website-conversion` | Website Redesign & Conversion UX | 2 |
| `crm-cleanup` | CRM / Lead Flow Cleanup | 2 |
| `local-seo` | Local SEO / GEO Optimization | 2 |
| `conversion-optimization` | Conversion Optimization | 3 |
| `email-automation` | Lifecycle / Email Automation | 3 |
| `attribution-cleanup` | Attribution / Reporting Cleanup | 3 |

## Example Rule Patterns

| Scenario | Roadmap Behavior |
|----------|-----------------|
| Bottleneck = unclear messaging | Brand Strategy & Positioning is prioritized first |
| Goal = bookings + type = healthcare or local service | Local SEO + Website Conversion lead the roadmap |
| Stack maturity = messy or none | MarTech Audit + CRM Cleanup move to top of Phase 1 |
| Goal = ROI clarity | KPI Baseline + Attribution Cleanup are prioritized |
| Stage = pre-launch | GTM Planning leads; optimization work is deferred |
| Capacity = founder-only | Roadmap capped at 6 modules; operationally heavy items dropped |
| Active channels exist | Conversion Optimization promoted over pure foundation work |

## Phase 2 Roadmap (Not Yet Implemented)

If Phase 1 is clean and stable, Phase 2 additions would include:

1. **PDF Export** — downloadable roadmap using `pdf-lib` or `@react-pdf/renderer`
2. **Email Capture** — lightweight email input on the results page (no backend required for basic mailto or form service)
3. **Demo Profiles** — preset sample answers accessible from the landing page for quick demos
4. **Shareable URL** — results are already URL-shareable via base64-encoded query params (no backend needed)
