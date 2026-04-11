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
- `modes/_shared.md`, `modes/evaluate.md`, all other modes
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
| Asks to evaluate offer | `evaluate` |
| Asks to compare offers | `compare` |
| Wants LinkedIn outreach | `outreach` |
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

### First Run — Onboarding (MANDATORY GATE)

**Before doing ANYTHING else — before ANY mode, including portfolio, scan, or discovery — check if the user is set up.**

#### Step 0: Dependencies (silent, automatic)

Before checking profile data, silently verify that all tools are working. Fix anything missing — do NOT ask the user to install things manually. You are the installer.

Run these checks and auto-fix:

1. **Node modules**: If `node_modules/` doesn't exist, run `npm install`.
2. **Playwright Chromium**: Run `node -e "import('playwright').then(p => require('fs').existsSync(p.chromium.executablePath()) ? process.exit(0) : process.exit(1))"`. If it fails, run `npx playwright install chromium`.
3. **Go** (for dashboard TUI): Run `which go`. If missing, detect the platform and package manager (`brew`, `apt`, `dnf`, `pacman`, `winget`, `choco`, etc.) and install Go. If no package manager is found, download the binary from the Go website for the correct OS/arch. Then run `cd dashboard && go build -o ../career-dashboard .` to build the dashboard.
4. **GitHub CLI** (for portfolio deploy): Run `which gh`. If missing, install via the available package manager. This is optional — if install fails, skip it and note that portfolio deploy to GitHub Pages won't work.
5. **Directories**: Ensure `data/`, `output/`, `reports/`, `jds/`, `batch/logs/`, `batch/tracker-additions/` exist. Create any that are missing.

**Rules for dependency installation:**
- NEVER ask the user which package manager to use. Detect it.
- NEVER print raw install commands and tell the user to run them. Run them yourself.
- If an install fails, try an alternative method. Only skip a dependency after exhausting options.
- Keep output minimal. One line per dependency: "Installing Go..." → "Go installed." or "Go: already installed."
- Optional dependencies (Go, gh) should not block onboarding if they fail. Core dependencies (Node modules, Playwright) should.

---

#### Step 0.5: Profile checks

Run these checks silently:
1. Does `config/profile.yml` exist? (NOT just `config/profile.example.yml`)
2. Does `cv.md` exist?
3. If `config/profile.yml` exists, does it contain example placeholder data? (Check: does `full_name` equal `"Jane Smith"` or does `email` equal `"jane@example.com"`?)

**If ANY check fails, BLOCK the requested mode and enter onboarding.**

---

#### How onboarding works

**This is an interactive, menu-driven experience — not a Q&A chat.** Use `EnterPlanMode` and `AskUserQuestion` at every decision point. The user should see structured choices they can select, not paragraphs they have to respond to with free text.

**AskUserQuestion format (MANDATORY for every decision point):**

```
Via AskUserQuestion, ask:

> [Context in 1-2 sentences]
>
> [Plain-English explanation of what you need]

Options:
- A) [Option 1] (recommended if applicable)
- B) [Option 2]
- C) [Option 3]
```

**NEVER print a paragraph and wait for free text when you could present options.** If there are reasonable choices, present them. If you genuinely need free-text input (like a resume paste), say exactly what format you want.

---

#### Step 1: Get their resume (ONE input)

Via AskUserQuestion, ask:

> Let's get you set up. I just need one thing to start — your background in any format. I'll extract everything else.

Options:
- A) Paste my resume text
- B) Drop a LinkedIn PDF (File → Save as PDF from your profile)
- C) Share my LinkedIn URL
- D) Just tell you about my experience

**STOP.** Wait for their input. Process whatever they provide → extract name, email, location, company, work history, education, skills, projects → create `cv.md` immediately → write `config/profile.yml` with extracted data.

---

#### Step 2: Confirm profile

After processing, **enter plan mode** and show a plan:

```
Profile Setup
  [x] Import background
  [ ] Review profile
  [ ] Target roles
  [ ] Standout achievements
  [ ] Logistics & preferences
  [ ] Portfolio
  [ ] Talent network
  [ ] Ready
```

Then present what you extracted. Via AskUserQuestion:

> Here's what I pulled from your background:
>
> **[Name]** — [Title] at [Company], [City]
> **[X] years** across [N] roles. Skills: [top 5].
> **[Email]** / **[LinkedIn]** [show if found, note if missing]

Options:
- A) Looks right, keep going
- B) I need to fix something

If B → ask what to fix. If email/LinkedIn missing, follow up for just those.

---

#### Step 3: Confirm target roles

Read cv.md. Infer 3-5 target roles from their trajectory. Via AskUserQuestion:

> Based on your background, here's what I'd target:
>
> 1. **[Role A]** — [why: X years directly in this]
> 2. **[Role B]** — [why: specific experience maps here]
> 3. **[Role C]** — [why: stretch but viable because of skill]
>
> RECOMMENDATION: These cover your core strengths + one stretch.

Options:
- A) These are right (recommended)
- B) I'd adjust the list
- C) I'm targeting something completely different

If B or C → incorporate their corrections. Update `config/profile.yml` → `target_roles`.

---

#### Step 4: Standout achievements

**This is the most important step.** Read cv.md. Surface their 3-5 strongest signals yourself. Via AskUserQuestion:

> Here's what stands out to me from your background:
>
> - **[Achievement 1]** — [why it's impressive in 1 sentence]
> - **[Achievement 2]** — [why it matters for startups]
> - **[Pattern/trajectory]** — [what it signals]
>
> These are the things that would make a hiring manager say "wait, really?"

Options:
- A) Those are the right things to lead with
- B) You're missing something big — let me tell you
- C) I'd reorder / reframe these

If B → they'll add something. Push for specifics: "Can you quantify that?" Store with metrics.

Then follow up with a second AskUserQuestion:

> A few more things that help candidates stand out. Which of these apply to you?

Options:
- A) I've built something from 0→1 (product, team, company)
- B) I'm building something right now (side project, open source, startup idea)
- C) Both
- D) Neither — but I have other things to highlight

If A/B/C → follow up for details. Store in `narrative` and `talent_network.current_project`.

**If they mentioned building something (B or C above)**, ask for the rich version:

> Tell me more about what you're building — what's the problem, what have you shipped so far, what's the hardest part?

Store the detailed answer in `narrative.current_project_detail` (this powers the Projects section of their portfolio AND shows hiring teams builder energy). The short version stays in `talent_network.current_project`.

Then:

> What's driving this search? What made you decide "now is the time"?

Options:
- A) Let me tell you
- B) Skip — I'd rather not say

If A → store in `narrative.motivation`. This shapes the About page of their portfolio AND helps calibrate which roles feel right. Frame it to the candidate: "This helps me write your About page and match you to the right roles."

Then one more:

> What's your polarity — what energizes you vs. drains you?

Options:
- A) Let me describe it
- B) Skip this for now

Store in `modes/_profile.md`. Create `article-digest.md` with all proof points collected.

---

#### Step 5: Logistics & preferences

Via AskUserQuestion:

> Are you considering founding a company?

Options:
- A) Yes, actively thinking about it
- B) Maybe someday
- C) No, purely looking to join

Store in `talent_network.considering_founding`.

Via AskUserQuestion:

> Are you a full-time student?

Options:
- A) Yes
- B) No

If A → ask graduation date and work arrangement preferences.

Then capture search preferences. These personalize their scan results AND help calibrate role recommendations.

Via AskUserQuestion:

> What stage of company are you drawn to? This helps me filter scan results to the right type.

Options:
- A) Pre-seed / Seed — earliest stage, building from zero
- B) Series A — found product-market fit, scaling the team
- C) Series B — scaling the org, adding leadership layers
- D) Growth / Late stage — established company, big problems
- E) No preference — I'll evaluate case by case

Store in `preferences.stage_preference`.

Via AskUserQuestion:

> Of the companies in the a16z network, are there any that excite you most? I can prioritize those in your scan results.

Options:
- A) Yes, let me name a few
- B) I don't know enough yet — surprise me
- C) Skip this for now

If A → ask them to list companies with brief reasons why. Store as array of `{name, reason}` in `preferences.company_rankings`. This personalizes their search AND reveals preference signals.

Via AskUserQuestion:

> Any deal-breakers I should know about? Things that would make you immediately pass on a role — so I don't waste your time surfacing them.

Options:
- A) Yes — here are my hard no's
- B) Nothing specific, I'm pretty open

If A → store as array in `preferences.deal_breakers`. These auto-filter scan results and evaluation warnings.

**DESIGN PRINCIPLE for all preference questions:** Every question must have a clear value-to-candidate reason. The product feels like it's FOR the candidate (job search + portfolio), not FOR a16z (talent intake). Frame each question in terms of how it helps THEIR search.

---

#### Step 6: Portfolio

Check if they have a personal site. Via AskUserQuestion:

> You [have / don't have] a personal site. I can generate a portfolio from everything you just told me — 4 pages, deploys free to GitHub Pages in 30 seconds.

Options:
- A) Build it (recommended)
- B) Skip — I already have a site
- C) Skip — I'll do this later

If A → run portfolio mode. If B → ask for URL, store it.

---

#### Step 7: Talent network

**Check:** Is the user @a16z.com or do they work at a16z/speedrun? → Skip this step entirely.

Via AskUserQuestion:

> Last thing. The a16z speedrun talent network connects candidates directly to hiring teams at hundreds of startups — warm intros, not job boards. I have everything I need to submit you right now.

Options:
- A) Add me to the talent network (recommended)
- B) Not right now

If A → run talent-network mode (auto-submit both Typeforms). If B → "No problem. `/speedrun talent-network` anytime."

---

#### Step 8: Ready

Silently set up remaining infrastructure:
- Copy `templates/portals.example.yml` → `portals.yml` if missing
- Customize keyword filters for their target roles
- Create `data/applications.md` tracker
- Copy `modes/_profile.template.md` → `modes/_profile.md`

Present final summary and **exit plan mode**:

> You're set up:
> - **Profile:** [name], targeting [roles]
> - **CV:** [summary]
> - **Scanner:** 500+ startups pre-loaded
> [- **Portfolio:** URL]
> [- **Talent Network:** submitted]

Via AskUserQuestion:

> What do you want to do first?

Options:
- A) Scan for roles at hundreds of startups
- B) Paste a specific job URL to evaluate
- C) Show me all commands

---

#### Onboarding behavior rules

- **Use AskUserQuestion with Options at EVERY decision point.** Never print a paragraph and wait for free text when structured choices exist.
- **ONE input to start.** Resume/LinkedIn. Extract everything from that.
- **Present, don't ask.** Show what you inferred with options to confirm/edit. Never show blank fields.
- **Build files as you go.** Write cv.md after Step 1. Update profile.yml after each step. Create article-digest.md in Step 4.
- **React to their choices.** After each selection, do work — surface insights, identify signals, write files. Show progress in the plan.
- **STOP after each AskUserQuestion.** Wait for their response before proceeding. Never batch multiple questions.
- **Accept free text when offered.** If the user types something instead of picking an option, parse it and move on.
- **After every evaluation (post-onboarding), learn.** If the user says "this score is too high" or "you missed that I have experience in X", update `modes/_profile.md` or `config/profile.yml`.

### Personalization

This system is designed to be customized by YOU (AI Agent). When the user asks you to change archetypes, translate modes, adjust scoring, add companies, or modify negotiation scripts — do it directly. You read the same files you use, so you know exactly what to edit.

**Common customization requests:**
- "Change the archetypes to [backend/frontend/data/devops] roles" → edit `modes/_profile.md` or `config/profile.yml`
- "Translate the modes to English" → edit all files in `modes/`
- "Add these companies to my portals" → edit `portals.yml`
- "Update my profile" → edit `config/profile.yml`
- "Change the CV template design" → edit `templates/cv-template.html`
- "Adjust the scoring weights" → edit `modes/_profile.md` for user-specific weighting, or edit `modes/_shared.md` and `batch/batch-prompt.md` only when changing the shared system defaults for everyone

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

When a candidate opts in, run `node submit-to-network.mjs`. It reads local files (`cv.md`, `config/profile.yml`, `article-digest.md`, `modes/_profile.md`), builds a candidate profile, and submits it to the Gem API via a Cloudflare Worker relay at `speedrun-submit.jmazer.workers.dev/submit`.

**Data flow:** `submit-to-network.mjs` → Cloudflare Worker (`worker/submit-relay.js`) → Gem API → talent network project

**What gets sent:** Name, email, LinkedIn, location, title, company, craft area, portfolio links, accomplishments, current project, work preferences, founding/student status. UTM attribution: `utm_source=speedrun-career-ops`.

**Dry run:** `node submit-to-network.mjs --dry-run` prints the payload without submitting.

**Duplicate handling:** If the candidate already exists in Gem, the relay adds them to the project and attaches an updated note. No data is overwritten.

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

## Design System
Always read DESIGN.md before making any visual or UI decisions for portfolio generation.
All font choices, colors, spacing, and aesthetic direction for each template are defined there.
Do not deviate from template specs without explicit user approval.
When generating portfolios, the candidate picks a template name (ink, terminal, volt, folio, grid, statement, caps, bare) and the generator applies that template's complete design.
In QA mode, flag any generated portfolio that doesn't match its DESIGN.md template spec.
