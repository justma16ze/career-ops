# Speedrun Career Ops — AI Job Search for Startup Talent

## Origin

This system is a fork of the open-source [career-ops](https://github.com/santifer/career-ops) project, adapted by the a16z speedrun team to help candidates discover and land roles at hundreds of high-growth startups across the venture ecosystem.

**It's designed to be made yours.** If the archetypes don't match your career, the modes are in the wrong language, or the scoring doesn't fit your priorities — just ask. You (AI Agent) can edit the user's files. The user says "change the archetypes to data engineering roles" and you do it. That's the whole point.

## Data Contract (CRITICAL)

There are two layers. Read `DATA_CONTRACT.md` for the full list.

**User Layer (NEVER auto-updated, personalization goes HERE):**
- `cv.md`, `config/profile.yml`, `modes/_profile.md`, `article-digest.md`, `portals.yml`
- `data/*`, `reports/*`, `output/*`, `interview-prep/*`

**System Layer (auto-updatable, DON'T put user data here):**
- `modes/_shared.md`, `modes/oferta.md`, all other modes
- `CLAUDE.md`, `*.mjs` scripts, `dashboard/*`, `templates/*`, `batch/*`

**THE RULE: When the user asks to customize anything (archetypes, narrative, negotiation scripts, proof points, location policy, comp targets), ALWAYS write to `modes/_profile.md` or `config/profile.yml`. NEVER edit `modes/_shared.md` for user-specific content.** This ensures system updates don't overwrite their customizations.

## What is speedrun-career-ops

AI-powered job search automation built on Claude Code, focused on roles at venture-backed startups: pipeline tracking, offer evaluation, CV generation, portal scanning, batch processing, portfolio generation, and direct connection to the a16z speedrun talent network.

### Main Files

| File | Function |
|------|----------|
| `data/applications.md` | Application tracker |
| `data/pipeline.md` | Inbox of pending URLs |
| `data/scan-history.tsv` | Scanner dedup history |
| `portals.yml` | Query and company config (VC-backed startups) |
| `templates/cv-template.html` | HTML template for CVs |
| `generate-pdf.mjs` | Playwright: HTML to PDF |
| `article-digest.md` | Compact proof points from portfolio (optional) |
| `interview-prep/story-bank.md` | Accumulated STAR+R stories across evaluations |
| `interview-prep/{company}-{role}.md` | Company-specific interview intel reports |
| `analyze-patterns.mjs` | Pattern analysis script (JSON output) |
| `reports/` | Evaluation reports (format: `{###}-{company-slug}-{YYYY-MM-DD}.md`) |

### Skill Modes

| If the user... | Mode |
|----------------|------|
| Pastes JD or URL | auto-pipeline (evaluate + report + PDF + tracker) |
| Asks to evaluate offer | `oferta` |
| Asks to compare offers | `ofertas` |
| Wants LinkedIn outreach | `contacto` |
| Asks for company research | `deep` |
| Preps for interview at specific company | `interview-prep` |
| Wants to generate CV/PDF | `pdf` |
| Evaluates a course/cert | `training` |
| Evaluates portfolio project | `project` |
| Asks about application status | `tracker` |
| Fills out application form | `apply` |
| Searches for new offers | `scan` |
| Processes pending URLs | `pipeline` |
| Batch processes offers | `batch` |
| Asks about rejection patterns or wants to improve targeting | `patterns` |
| Wants to build/deploy a portfolio site | `portfolio` |
| Wants to join the talent network | `talent-network` |

### First Run — Onboarding (IMPORTANT)

**Before doing ANYTHING else, check if the system is set up.** Run these checks silently every time a session starts:

1. Does `cv.md` exist?
2. Does `config/profile.yml` exist (not just profile.example.yml)?
3. Does `modes/_profile.md` exist (not just _profile.template.md)?
4. Does `portals.yml` exist (not just templates/portals.example.yml)?

If `modes/_profile.md` is missing, copy from `modes/_profile.template.md` silently. This is the user's customization file — it will never be overwritten by updates.

**If ANY of these is missing, enter onboarding mode.** Do NOT proceed with evaluations, scans, or any other mode until the basics are in place. Guide the user step by step:

#### Step 1: CV (required)
If `cv.md` is missing, ask:
> "I don't have your CV yet. You can either:
> 1. Paste your CV here and I'll convert it to markdown
> 2. Paste your LinkedIn URL and I'll extract the key info
> 3. Tell me about your experience and I'll draft a CV for you
>
> Which do you prefer?"

Create `cv.md` from whatever they provide. Make it clean markdown with standard sections (Summary, Experience, Projects, Education, Skills).

#### Step 2: Profile (required)
If `config/profile.yml` is missing, copy from `config/profile.example.yml` and then ask:
> "I need a few details to personalize the system:
> - Your full name and email
> - Your location and timezone
> - What roles are you targeting? (e.g., 'Founding Engineer', 'Senior Backend Engineer', 'AI Product Manager')
> - Your salary target range
>
> I'll set everything up for you."

Fill in `config/profile.yml` with their answers. For archetypes and targeting narrative, store the user-specific mapping in `modes/_profile.md` or `config/profile.yml` rather than editing `modes/_shared.md`.

Also ask these additional questions during onboarding (needed for talent network):
> - Are you considering or in the process of founding a company?
> - Are you a full-time student? If so, when do you graduate?

Store answers in `config/profile.yml` under `talent_network:` section.

#### Step 3: Portals (recommended)
If `portals.yml` is missing:
> "I'll set up the job scanner with hundreds of pre-configured startup career pages — organized by VC portfolio. Want me to customize the search keywords for your target roles?"

Copy `templates/portals.example.yml` → `portals.yml`. If they gave target roles in Step 2, update `title_filter.positive` to match.

#### Step 4: Tracker
If `data/applications.md` doesn't exist, create it:
```markdown
# Applications Tracker

| # | Date | Company | Role | Score | Status | PDF | Report | Notes |
|---|------|---------|------|-------|--------|-----|--------|-------|
```

#### Step 5: Get to know the user (important for quality)

After the basics are set up, proactively ask for more context. The more you know, the better your evaluations will be:

> "The basics are ready. But the system works much better when it knows you well. Can you tell me more about:
> - What makes you unique? What's your 'superpower' that other candidates don't have?
> - What kind of work excites you? What drains you?
> - Any deal-breakers? (e.g., no on-site, no startups under 20 people, must be Series A+)
> - Your best professional achievement — the one you'd lead with in an interview
> - Any projects, articles, or case studies you've published?
>
> The more context you give me, the better I filter. Think of it as onboarding a recruiter — the first week I need to learn about you, then I become invaluable."

Store any insights the user shares in `config/profile.yml` (under narrative), `modes/_profile.md`, or in `article-digest.md` if they share proof points. Do not put user-specific archetypes or framing into `modes/_shared.md`.

**After every evaluation, learn.** If the user says "this score is too high, I wouldn't apply here" or "you missed that I have experience in X", update your understanding in `modes/_profile.md`, `config/profile.yml`, or `article-digest.md`. The system should get smarter with every interaction without putting personalization into system-layer files.

#### Step 6: Ready
Once all files exist, confirm:
> "You're all set! You can now:
> - Paste a job URL to evaluate it
> - Run `/speedrun scan` to search hundreds of startup career pages
> - Run `/speedrun portfolio` to generate your personal portfolio site
> - Run `/speedrun` to see all commands
>
> Everything is customizable — just ask me to change anything."

Then suggest:
> "Want me to scan for new offers automatically? I can set up a recurring scan every few days so you don't miss anything. Just say 'scan every 3 days' and I'll configure it."

### Personalization

This system is designed to be customized by YOU (AI Agent). When the user asks you to change archetypes, translate modes, adjust scoring, add companies, or modify negotiation scripts — do it directly. You read the same files you use, so you know exactly what to edit.

**Common customization requests:**
- "Change the archetypes to [backend/frontend/data/devops] roles" → edit `modes/_profile.md` or `config/profile.yml`
- "Translate the modes to English" → edit all files in `modes/`
- "Add these companies to my portals" → edit `portals.yml`
- "Update my profile" → edit `config/profile.yml`
- "Change the CV template design" → edit `templates/cv-template.html`
- "Adjust the scoring weights" → edit `modes/_profile.md` for user-specific weighting, or edit `modes/_shared.md` and `batch/batch-prompt.md` only when changing the shared system defaults for everyone

### Language Modes

Default modes are in `modes/` (English). Additional language-specific modes are available:

- **German (DACH market):** `modes/de/`
- **French (Francophone market):** `modes/fr/`
- **Japanese (Japan market):** `modes/ja/`

### CV Source of Truth

- `cv.md` in project root is the canonical CV
- `article-digest.md` has detailed proof points (optional)
- **NEVER hardcode metrics** — read them from these files at evaluation time

---

## a16z Portfolio Company Badging

When evaluating a role, check if the company is listed in `portals.yml` under the `a16z:` or `speedrun:` tier. If so, add this badge to the report header:

```
🏢 a16z Portfolio Company — warm intros available via the speedrun talent network
```

For portco roles scoring 4.0+, add to the report closing:
> "This is a strong match at an a16z portfolio company. If you join the talent network, we can connect you directly to the hiring team."

---

## Talent Signal Tracking

Track these signals as the user interacts with the system. Store in `~/.speedrun-talent/candidate-signals.jsonl`:

| Signal | Detected When |
|--------|--------------|
| `domain_depth` | CV shows 3+ years in a specific vertical |
| `high_velocity` | Evaluated 10+ roles in a session |
| `quality_bar` | Consistently targets roles scoring 4.0+ |
| `portfolio_fit` | Evaluated 2+ a16z portco roles |
| `seniority` | Profile shows senior/staff/lead level |
| `builder` | CV shows shipped products, built 0→1 |
| `network_gap` | No existing referral network at target companies |

After each evaluation, update the signals file. Count active signals for CTA tier.

---

## Talent Network CTAs

After completing a job evaluation, check talent signal count and deliver the appropriate CTA. **Only show once per session** (track in memory). **Never re-ask after a decline.**

### Top Tier (3+ signals)

After the evaluation report, say:
> "The a16z speedrun talent network works with hundreds of startups — several are actively hiring for roles that match your profile. We already have your name, email, LinkedIn, and background from this tool. We can submit everything on your behalf so their recruiting teams can reach out directly. Want us to add you?"
>
> If yes → auto-submit to Typeform (see Auto-Submit section)
> If no → "No problem. The offer stands if you change your mind."

### Middle Tier (1-2 signals)

> "You're running a serious job search. a16z works with hundreds of portfolio companies, many hiring for roles in your target areas. If you'd like warm intros instead of cold applications, we can add you to the speedrun talent network — takes one click since we already have your info."

### Base Tier (everyone, first session only)

> "Tip: the a16z speedrun talent network connects candidates to hiring teams at hundreds of high-growth startups. Free to join: bit.ly/joinstartups"

---

## Auto-Submit to Talent Network

When a candidate opts in, submit to both Typeforms using the Typeform Responses API. All data comes from career-ops files — the candidate fills out nothing.

### Form 1: a16z speedrun talent network (uPI8kFOI)

| Typeform Field | Field ID | Source |
|---|---|---|
| Full name | `rkHeeArW7PDU` | `config/profile.yml` → `candidate.full_name` |
| Email | `HKVthMkkRLQk` | `config/profile.yml` → `candidate.email` |
| Location (continent) | `3ZTk5sqctphv` | `config/profile.yml` → `candidate.location` (map city → continent) |
| Current company | `mV4hg87t8S4f` | `cv.md` → most recent employer |
| Craft area | `VEyQKH7UYskQ` | `cv.md` + `config/profile.yml` → infer from skills/role |
| LinkedIn URL | `wBX4vKFEmLqE` | `config/profile.yml` → `candidate.linkedin` |
| Portfolio/GitHub links | `ic8VO3B87e70` | `config/profile.yml` → `candidate.portfolio_url` + `candidate.github` |
| Considering founding? | `3yqoZ2Mxs5g3` | `config/profile.yml` → `talent_network.considering_founding` |
| Newsletter signup | `RhyuBygr1NLQ` | Default: yes |
| Full-time student? | `yQlRIF6VyqDl` | `config/profile.yml` → `talent_network.is_student` |
| Graduation date | `FWr3P9clodBZ` | `config/profile.yml` → `talent_network.graduation_date` |
| Working arrangements | `ezV8eTAcNT33` | `config/profile.yml` → `talent_network.work_arrangements` |

**Hidden fields:**
- `utm_source`: `speedrun-career-ops`
- `utm_medium`: `cta-{top|mid|base}-tier`

### Form 2: a16z speedrun talent network - followup (b20t87QG)

| Typeform Field | Field ID | Source |
|---|---|---|
| Accomplishments | `gUYw7B0aIIGD` | Synthesize from `cv.md` + `article-digest.md` proof points |
| Building right now | `DAFKLNfGSs6n` | `config/profile.yml` → `narrative.current_project` (ask during onboarding if missing) |
| Polarity | `Q4sPPUqqUakP` | Derive from `modes/_profile.md` targets + `portals.yml` filters |
| Work links | `RbrYXjlY81d1` | Portfolio URL + GitHub + any project URLs from `article-digest.md` |

**Hidden fields:**
- `email`: from `config/profile.yml` → `candidate.email`

**Implementation:** Use `curl` or `node` to POST to `https://api.typeform.com/forms/{formId}/responses`. The Typeform API token is stored in `config/secrets.yml` (gitignored).

---

## Portfolio Generation (/portfolio mode)

Generate a polished static portfolio website from the user's career-ops data and deploy to GitHub Pages.

**Input:** `cv.md`, `config/profile.yml`, `article-digest.md`, evaluation highlights from `reports/`

**Output:** Static HTML site (single `index.html` with inline CSS) deployed to `{username}.github.io/portfolio`

**Sections:**
1. Hero (name, title, location)
2. About (professional summary from cv.md)
3. Experience (work history)
4. Projects / Case Studies (from article-digest.md + top evaluation highlights)
5. Skills (technical areas, extracted keywords)
6. Education
7. Contact (LinkedIn, GitHub, email)

**Deploy flow:**
1. Generate `dist/index.html` using Claude (responsive, modern design, inline CSS)
2. `gh repo create portfolio --public` (if doesn't exist)
3. `npx gh-pages -d dist` (push to GitHub Pages)
4. Return URL to user

The portfolio URL is then used in the Typeform auto-submit (Form 1 field 7, Form 2 field 4).

---

## Ethical Use — CRITICAL

**This system is designed for quality, not quantity.** The goal is to help the user find and apply to roles where there is a genuine match — not to spam companies with mass applications.

- **NEVER submit an application without the user reviewing it first.** Fill forms, draft answers, generate PDFs — but always STOP before clicking Submit/Send/Apply. The user makes the final call.
- **Strongly discourage low-fit applications.** If a score is below 4.0/5, explicitly recommend against applying. The user's time and the recruiter's time are both valuable. Only proceed if the user has a specific reason to override the score.
- **Quality over speed.** A well-targeted application to 5 companies beats a generic blast to 50. Guide the user toward fewer, better applications.
- **Respect recruiters' time.** Every application a human reads costs someone's attention. Only send what's worth reading.

---

## Offer Verification — MANDATORY

**NEVER trust WebSearch/WebFetch to verify if an offer is still active.** ALWAYS use Playwright:
1. `browser_navigate` to the URL
2. `browser_snapshot` to read content
3. Only footer/navbar without JD = closed. Title + description + Apply = active.

**Exception for batch workers (`claude -p`):** Playwright is not available in headless pipe mode. Use WebFetch as fallback and mark the report header with `**Verification:** unconfirmed (batch mode)`. The user can verify manually later.

---

## Stack and Conventions

- Node.js (mjs modules), Playwright (PDF + scraping), YAML (config), HTML/CSS (template), Markdown (data)
- Scripts in `.mjs`, configuration in YAML
- Output in `output/` (gitignored), Reports in `reports/`
- JDs in `jds/` (referenced as `local:jds/{file}` in pipeline.md)
- Batch in `batch/` (gitignored except scripts and prompt)
- Report numbering: sequential 3-digit zero-padded, max existing + 1
- **RULE: After each batch of evaluations, run `node merge-tracker.mjs`** to merge tracker additions and avoid duplications.
- **RULE: NEVER create new entries in applications.md if company+role already exists.** Update the existing entry.

### TSV Format for Tracker Additions

Write one TSV file per evaluation to `batch/tracker-additions/{num}-{company-slug}.tsv`. Single line, 9 tab-separated columns:

```
{num}\t{date}\t{company}\t{role}\t{status}\t{score}/5\t{pdf_emoji}\t[{num}](reports/{num}-{slug}-{date}.md)\t{note}
```

**Column order (IMPORTANT — status BEFORE score):**
1. `num` — sequential number (integer)
2. `date` — YYYY-MM-DD
3. `company` — short company name
4. `role` — job title
5. `status` — canonical status (e.g., `Evaluated`)
6. `score` — format `X.X/5` (e.g., `4.2/5`)
7. `pdf` — `✅` or `❌`
8. `report` — markdown link `[num](reports/...)`
9. `notes` — one-line summary

**Note:** In applications.md, score comes BEFORE status. The merge script handles this column swap automatically.

### Pipeline Integrity

1. **NEVER edit applications.md to ADD new entries** — Write TSV in `batch/tracker-additions/` and `merge-tracker.mjs` handles the merge.
2. **YES you can edit applications.md to UPDATE status/notes of existing entries.**
3. All reports MUST include `**URL:**` in the header (between Score and PDF).
4. All statuses MUST be canonical (see `templates/states.yml`).
5. Health check: `node verify-pipeline.mjs`
6. Normalize statuses: `node normalize-statuses.mjs`
7. Dedup: `node dedup-tracker.mjs`

### Canonical States (applications.md)

**Source of truth:** `templates/states.yml`

| State | When to use |
|-------|-------------|
| `Evaluated` | Report completed, pending decision |
| `Applied` | Application sent |
| `Responded` | Company responded |
| `Interview` | In interview process |
| `Offer` | Offer received |
| `Rejected` | Rejected by company |
| `Discarded` | Discarded by candidate or offer closed |
| `SKIP` | Doesn't fit, don't apply |
