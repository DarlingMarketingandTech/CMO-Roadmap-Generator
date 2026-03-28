# CMO Roadmap Generator

A production-ready, deterministic 90-day marketing roadmap generator for SMB and mid-market businesses. Users answer 7 intake questions and instantly receive a personalized, phased marketing plan — no AI, no database, no login required.

## What It Does

The CMO Roadmap Generator takes a user through a 7-question intake covering their business type, stage, goals, bottlenecks, active channels, stack maturity, and team capacity. A deterministic rules engine maps those answers to:

- **Flags** — derived booleans (e.g. pre-launch, messy stack, conversion focus)
- **Weighted module scores** — every roadmap module receives points from explicit rules; the top 6–8 IDs become your plan
- **Phased modules** — distributed across three 30-day phases

Phases:

- **Phase 1 — Foundation** (Days 1–30): Strategic and operational baseline
- **Phase 2 — Build & Systems** (Days 31–60): Core marketing infrastructure
- **Phase 3 — Optimize & Scale** (Days 61–90): Testing and automation

The output includes:

- **Executive summary** — briefing-style lead tied to bottleneck, stage, and vertical lens
- Business summary snapshot (structured context)
- Top 3 priorities and full 3-phase module breakdown
- **Industry lens** — scoring nudges, module copy appendices, service nuance, and a closing narrative sentence for healthcare, legal, local, SaaS, and e-commerce (`general` for other types)
- **Why this roadmap** — narrative plus structured explainability (answers, flags, ranked tracks, bullets)
- **Recommended service path** — primary + supporting offerings (Darling MarTech–aligned)
- **Engagement path** — Audit / Advisory vs Project Build vs Embedded / Fractional (`getEngagementFormatRecommendation`)
- **Sprint / program shape** — time-boxed next step (`getRecommendedEngagement`)
- **Primary CTA** — button label + mailto subject/body vary by recommended primary service (`getPrimaryCta`)
- **Watch-outs** — vertical + constraint-specific pitfalls (`buildWatchOuts`)
- **Share link** — compact `?q=` encoding (no database); legacy `?answers=` still supported
- **Save as PDF** — browser print → “Save as PDF”
- **Lead capture + email delivery** — “Send my roadmap” posts to a server route; [Resend](https://resend.com) sends a branded HTML email (see below)

## Running Locally

```bash
npm install
npm run dev
```

Copy `env.example` to `.env.local` and add at least `RESEND_API_KEY` and `RESEND_FROM` to test email delivery (see **Roadmap email (Resend)**).

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
| Forms | React Hook Form |
| Transactional email | [Resend](https://resend.com) + [@react-email/components](https://react.email) |

**No AI APIs. No database. No authentication. No Tailwind CSS.**

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── send-roadmap/
│   │       └── route.ts         # POST: validate → composeRoadmap → Resend
│   ├── layout.tsx
│   ├── page.tsx                 # Landing + sample profiles
│   ├── page.css.ts
│   ├── intake/
│   │   ├── page.tsx             # Suspense wrapper
│   │   ├── IntakeForm.tsx       # Wizard + ?demo= prefill
│   │   └── page.css.ts
│   └── results/
│       ├── page.tsx
│       ├── ResultsDisplay.tsx
│       ├── ResultsLeadForm.tsx
│       ├── ResultsToolbar.tsx   # Print + copy share link
│       └── page.css.ts
├── lib/
│   ├── types.ts                 # Domain types, IndustrySegment, engagement format, CTA
│   ├── questions.ts             # Intake schema
│   ├── flags.ts                 # Answer → flag mapping (documented)
│   ├── modules.ts               # Roadmap modules + ALL_MODULE_IDS
│   ├── industry.ts              # Vertical segment, score boosts, module/service copy lens
│   ├── rules.ts                 # Scoring, services, engagement format, CTA, explainability
│   ├── compose-roadmap.ts       # Assembly pipeline
│   ├── booking-url.ts           # NEXT_PUBLIC_BOOKING_URL + server overrides → CTA href
│   ├── encode-answers.ts        # Compact `q` + legacy `answers` encoding
│   ├── demo-profiles.ts         # Preset scenarios + URL helpers
│   └── email/
│       ├── roadmap-email-model.ts   # Roadmap → email view-model (no scoring)
│       ├── decode-roadmap-token.ts  # Token → IntakeAnswers (same as results URL)
│       ├── log-lead-submission.ts   # Stub hook for webhooks / Sheets (optional logging)
│       └── send-roadmap-schema.ts   # Zod body for POST /api/send-roadmap
├── emails/
│   └── RoadmapEmail.tsx         # React Email template (HTML)
└── styles/
    ├── tokens.css.ts
    └── global.css.ts
```

## How the Deterministic Rules Engine Works

### 1. Compute Flags (`flags.ts`)

`computeFlags(answers)` maps raw answers to booleans such as:

- `isPreLaunch`, `isFounderOnly`, `hasMessyStack`, `needsBrandClarity`, `needsLeadGen`, `needsBookings`, `needsROIClarity`, `isLocalOrHealthcare`, `hasActiveChannels`, `isEarlyStage`
- **Phase 2 additions:** `needsConversionLift` (poor-conversion bottleneck), `isEcommerce`, `needsWorkflowRelief` (team-capacity bottleneck)

### 2. Score Modules (`rules.ts`)

- `computeModuleScores(flags, answers)` applies **documented weight constants** (`W.CRITICAL`, `W.HIGH`, …) per rule block.
- `orderModuleIdsFromScores(scores, limit)` sorts all module IDs by score and takes the top **6** (founder-only) or **8** (otherwise).
- `scoreModules(flags, answers)` remains a convenience wrapper around the above.

### 3. Industry branching (`industry.ts`)

`resolveIndustrySegment(answers)` maps `businessType` into: `healthcare`, `legal` (professional services), `local`, `saas`, `ecommerce`, or `general`.

- **`applyIndustryScoreAdjustments`** — additive module scores (e.g. legal → brand + site + CRM; SaaS → attribution + CRM + KPI; healthcare → site + KPI + CRM) layered **after** core rules in `computeModuleScores`.
- **`applyIndustryModuleLens`** — appends a short vertical paragraph to selected module descriptions where `MODULE_LENS[moduleId][segment]` is defined (sparse matrix — extend by adding cells).
- **`refineServiceCopyForIndustry`** — appends one-line commercial nuance to primary/secondary service descriptions.
- **`getIndustryClosingSentence`** — optional final sentence appended in `generateWhyThisRoadmap`.

**Safe extension:** add scoring deltas in `applyIndustryScoreAdjustments`, copy in `MODULE_LENS` / `refineServiceCopyForIndustry`, or closing lines in `getIndustryClosingSentence`. Avoid duplicating full modules unless necessary.

### 4. Assemble Roadmap (`compose-roadmap.ts`)

`composeRoadmap(answers)` resolves the industry segment, scores and orders modules, applies the **industry module lens**, splits into phases, then attaches:

- `getServiceRecommendations` + `refineServiceCopyForIndustry`
- `generateWhyThisRoadmap(flags, answers, industrySegment)`
- `getEngagementFormatRecommendation` — audit vs project vs embedded/fractional
- `getRecommendedEngagement` — sprint/program framing (orthogonal to format)
- `getPrimaryCta` — commercial CTA + mailto metadata
- `buildExecutiveSummary`, `buildWatchOuts`, `buildRoadmapExplainability`, `buildBusinessSummary`

### 5. Engagement format vs sprint (`rules.ts`)

- **`getEngagementFormatRecommendation`** — deterministic composite: counts “strong” tracks (score ≥ 8), considers stack messiness, team capacity, stage, and bottleneck complexity.  
  - **≥6 strong tracks** → phased **project** (too many parallel bets for embedded).  
  - **Dedicated/full team + mature stage + clean stack** → **embedded/fractional**.  
  - **Founder-only, messy stack, or diagnosis-heavy ROI/brand** → **audit/advisory**.  
  - Else bounded outcomes → **project build** (launch, conversion, bookings, lead gen).

- **`getRecommendedEngagement`** — concrete working style (e.g. “CRO workstream”, “local growth program”). Tune independently of format.

### 6. Primary CTA selection (`getPrimaryCta`)

Maps **recommended primary service title** (exact `SERVICE_OFFERING` string) to `headline`, `buttonLabel`, and `mailtoSubject`. Segment adds one line of context to the mail body intro. Default fallback avoids generic “Book a call” for every profile.

**Extend:** add rows to the `map` array in `getPrimaryCta` when you add new service branches in `getServiceRecommendations`.

### 7. Shareable roadmap URLs (`encode-answers.ts`)

- **Primary:** `?q=` — base64url(JSON) of `[schemaVersion, typeIdx, stageIdx, goalIdx, bottleneckIdx, channelBitmask, stackIdx, teamIdx]`. Shorter than legacy JSON base64; fully deterministic; **no database**.
- **Legacy:** `?answers=` — full JSON base64 (`encodeIntakeAnswersForQuery`) still decoded via `parseIntakeAnswersFromResultsParams` (tries `q` first, then `answers`).

Intake submit and demo “View roadmap” links use **`encodeIntakeAnswersCompact`**. The results toolbar **copies** the canonical `?q=` URL.

**Tradeoff:** extreme future schema changes require bumping `SCHEMA_VERSION` and keeping decoders backward-compatible for old links.

## Sample Demo Profiles

Twelve presets live in `src/lib/demo-profiles.ts`. On the home page:

- **View roadmap** — `/results?q=…` (compact)
- **Walk through intake** — `/intake?demo=<id>` with the form prefilled

## Roadmap email (Resend)

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes (to send) | Resend API key |
| `RESEND_FROM` | Yes (to send) | Verified sender, e.g. `CMO Roadmap <onboarding@resend.dev>` |
| `RESEND_REPLY_TO` | No | Reply-To on outbound mail |
| `NEXT_PUBLIC_BOOKING_URL` | No | **Recommended** public Cal / meetings URL — used on the **results page** and in the **email** when `STRATEGY_BOOKING_URL` is unset |
| `STRATEGY_BOOKING_URL` | No | Optional **server-only** override (wins over `NEXT_PUBLIC_*` in the API route so you can keep a private link out of the client bundle) |
| `STRATEGY_CONTACT_EMAIL` | No | Mailto fallback when no booking URL is set (defaults to `strategy@example.com`) |
| `LEAD_LOG_VERBOSE` | No | Set to `1` to log full lead payload (including email) to the server console |

Copy **`env.example`** to **`.env.local`** for local development.

### Changing the booking URL

- Set **`NEXT_PUBLIC_BOOKING_URL`** so the results page primary CTA and the transactional email use the same HTTPS booking link (restart dev server after changing).
- Optionally set **`STRATEGY_BOOKING_URL`** only on the server if you need a different URL in email than on the page, or a link you do not want embedded in client JavaScript.

### Flow

1. User submits **Send my roadmap** with email (required), optional name and company.
2. `POST /api/send-roadmap` with `{ email, name?, company?, roadmapToken, _hp? }`.
3. **`roadmapToken`** is the compact (`q`) or legacy (`answers`) string — the API **decodes** it and runs **`composeRoadmap`** (same pipeline as the results page). No client-supplied roadmap JSON.
4. **`roadmapToEmailModel`** maps the `Roadmap` to a small view-model; **`RoadmapEmail.tsx`** renders HTML via **`@react-email/render`**; **Resend** delivers.
5. **`logLeadSubmission`** runs after a successful send (dev: summary line; set **`LEAD_LOG_VERBOSE=1`** for full JSON). Extend that function to POST to a webhook, Google Apps Script, Airtable, etc.

### Template location

- **`src/emails/RoadmapEmail.tsx`** — branded HTML email (priorities, phases as module titles, services, engagement path, sprint line, CTA).
- **`src/lib/email/roadmap-email-model.ts`** — shared formatting from `Roadmap` → email props.

### Testing locally

1. Set `RESEND_API_KEY` and `RESEND_FROM` in `.env.local`.
2. Run `npm run dev`, open a results page, submit the form with an allowed recipient (per Resend account rules).
3. Dev logs: `[send-roadmap] sent` with Resend id on success.

### Honeypot

Field `_hp` must be empty; non-empty bodies fail validation.

## PDF Export

There is **no server-side PDF library**. The results page includes **Save PDF / Print**, which opens the system print dialog; users choose **Save as PDF** for a clean document. Print-oriented styles avoid breaking phases across pages where possible; the lead form and bottom CTA are hidden in print.

**Follow-up (optional):** add `pdf-lib` or `@react-pdf/renderer` if you need programmatic PDFs without relying on the browser.

## Lead capture (other intents)

- **Get the full version** / **Book a strategy conversation** — stub: inline note + `console.info`; primary delivery path is **Send my roadmap** (Resend) or the page strategy CTA.

## How to Add New Questions

1. Extend `IntakeAnswers` in `src/lib/types.ts`
2. Add the question to `QUESTIONS` in `src/lib/questions.ts`
3. Optionally extend `computeFlags` and add scoring blocks in `computeModuleScores`
4. Update `buildInfluentialAnswers` / `FLAG_META` if the new dimension should appear in explainability

## How to Add New Roadmap Modules

1. Add an entry to `ALL_MODULES` in `src/lib/modules.ts` (IDs are picked up automatically via `ALL_MODULE_IDS`)
2. Add scoring rules in `computeModuleScores` in `src/lib/rules.ts`

## Service Catalog (Darling MarTech–aligned)

Offerings used in recommendations:

- Brand Strategy & Positioning  
- Go-To-Market Planning  
- MarTech Audit  
- Website Redesign & Conversion UX  
- CRM / Lead Flow Cleanup  
- Local SEO / GEO Optimization  
- Conversion Optimization  
- Lifecycle / Email Automation  
- Attribution / Reporting Cleanup  

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

## Follow-Up Ideas (Next Pass)

- Replace `mailto:` with a real API route + ESP or CRM webhook  
- Optional URL shortener (would introduce external dependency or minimal KV store)  
- Unit tests for `computeModuleScores`, `getEngagementFormatRecommendation`, and `composeRoadmap` per demo profile  
- Deeper print stylesheet (page headers, margins) if PDF fidelity becomes critical  
- Optional `localStorage` “resume draft” for partial intake (still no server DB)  
