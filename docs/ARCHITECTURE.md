# Architecture

## System Overview

```
                    ┌─────────────────────────────────┐
                    │         Claude Code Agent        │
                    │   (reads CLAUDE.md + modes/*.md) │
                    └──────────┬──────────────────────┘
                               │
     ┌─────────────────────────┼──────────────────────────────┐
     │              │          │           │                   │
┌────▼─────┐ ┌─────▼────┐ ┌──▼────────┐ ┌▼───────────┐ ┌────▼──────┐
│ Evaluate │ │ Scan     │ │ Portfolio │ │ Talent Net │ │ Batch    │
│ (auto)   │ │ (scan)   │ │ (portf.) │ │ (network)  │ │ (batch)  │
└────┬─────┘ └─────┬────┘ └──┬────────┘ └┬───────────┘ └────┬──────┘
     │             │          │           │                   │
     │      ┌──────▼──────┐  │      ┌────▼──────────┐  ┌────▼─────┐
     │      │ pipeline.md │  │      │ Typeform API  │  │ N workers│
     │      │ (URL inbox) │  │      │ (auto-submit) │  │(claude -p)
     │      └─────────────┘  │      └───────────────┘  └────┬─────┘
     │                       │                               │
┌────▼───────────────────────▼───────────────────────────────▼────┐
│                      Output Pipeline                            │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐  ┌───────────┐ │
│  │ Report.md│  │  PDF (HTML │  │ Tracker TSV │  │ Portfolio │ │
│  │ (A-F eval)│  │  → Playw.) │  │(merge-track)│  │ (GH Pages)│ │
│  └──────────┘  └────────────┘  └─────────────┘  └───────────┘ │
└────────────────────────┬───────────────────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │  data/applications.md │
              │  (canonical tracker)  │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │  Signal Tracking     │
              │  (~/.speedrun-talent)│
              │  → CTA tier → submit │
              └─────────────────────┘
```

## Candidate Flow (end to end)

```
1. ONBOARD → cv.md + profile.yml + portals.yml
                │
2. EVALUATE → paste JD or /speedrun scan → reports + PDFs
                │
3. PORTFOLIO → /speedrun portfolio → GitHub Pages site
                │
4. SIGNALS  → track-signals.mjs → 7 talent signals scored
                │
5. CTA      → tiered encouragement (top/mid/base)
                │
6. OPT-IN   → /speedrun talent-network → auto-submit both Typeforms
                │
7. TALENT NETWORK → candidate gets warm intros to hundreds of startups
```

## Evaluation Flow (Single Offer)

1. **Input**: User pastes JD text or URL
2. **Extract**: Playwright/WebFetch extracts JD from URL
3. **Classify**: Detect archetype (1 of 6 types)
4. **Badge**: Check if company is in portals.yml a16z/speedrun tier → add badge
5. **Evaluate**: 6 blocks (A-F):
   - A: Role summary
   - B: CV match (gaps + mitigation)
   - C: Level strategy
   - D: Comp research (WebSearch)
   - E: CV personalization plan
   - F: Interview prep (STAR stories)
6. **Score**: Weighted average across 10 dimensions (1-5)
7. **Report**: Save as `reports/{num}-{company}-{date}.md`
8. **PDF**: Generate ATS-optimized CV (`generate-pdf.mjs`)
9. **Track**: Write TSV to `batch/tracker-additions/`, auto-merged
10. **Signal**: Update talent signals + show CTA if appropriate

## Talent Network Submission

When a candidate opts in, the system auto-submits to two Typeform forms:

| Form | ID | What it sends |
|------|-----|--------------|
| Form 1 (signup) | `uPI8kFOI` | Name, email, LinkedIn, location, company, craft area, portfolio, founding/student status |
| Form 2 (followup) | `b20t87QG` | Accomplishments, current project, work preferences, portfolio links |

Hidden fields carry UTM attribution: `utm_source=speedrun-career-ops`, `utm_medium=cta-{tier}`

## Portal Configuration (portals.yml)

Companies are organized by VC portfolio tier:

| Tier | Label | Purpose |
|------|-------|---------|
| `a16z` | a16z portfolio | Primary targets — warm intros available |
| `speedrun` | Speedrun network | Companies hiring through the talent network |
| `other_vc` | Other VC portfolios | Sequoia, Founders Fund, Benchmark, etc. |

The scanner hits Greenhouse, Ashby, Lever, and Workable APIs directly. WebSearch discovers roles on aggregator boards (YC Jobs, Wellfound, etc.).

## Signal System

7 signals tracked in `~/.speedrun-talent/candidate-signals.jsonl`:

| Signal | Detection |
|--------|-----------|
| `domain_depth` | 3+ years in a consistent domain (from cv.md) |
| `high_velocity` | 10+ roles evaluated (from applications.md) |
| `quality_bar` | Average target score 4.0+ |
| `portfolio_fit` | 2+ a16z/speedrun portco roles evaluated |
| `seniority` | Targeting senior/staff/lead roles |
| `builder` | Evidence of shipping products 0→1 |
| `network_gap` | No existing referral network |

CTA tiers: 3+ signals → Top (direct ask), 1-2 → Mid (encouragement), 0 → Base (link)

## Scripts

| Script | Purpose |
|--------|---------|
| `generate-portfolio.mjs` | Generate static portfolio HTML |
| `deploy-portfolio.mjs` | Deploy portfolio to GitHub Pages |
| `track-signals.mjs` | Compute talent signals |
| `submit-to-network.mjs` | Submit profile to Typeform |
| `scrape-portcos.mjs` | Scrape a16z company lists |
| `merge-tracker.mjs` | Merge batch TSV into applications.md |
| `verify-pipeline.mjs` | Health check: statuses, duplicates, links |
| `dedup-tracker.mjs` | Remove duplicate entries by company+role |
| `normalize-statuses.mjs` | Map status aliases to canonical values |
| `cv-sync-check.mjs` | Validate setup consistency |
| `scan.mjs` | Scan portals for new roles |
| `generate-pdf.mjs` | Generate ATS-optimized CV PDF |
| `analyze-patterns.mjs` | Rejection pattern analysis |

## Dashboard TUI

The `dashboard/` directory contains a standalone Go TUI application that visualizes the pipeline:

- Filter tabs: All, Evaluated, Applied, Interview, Top >=4, Skip
- Sort modes: Score, Date, Company, Status
- Grouped/flat view
- Lazy-loaded report previews
- Inline status picker
- a16z portfolio company badges
