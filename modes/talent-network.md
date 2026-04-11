# Mode: talent-network — Join the a16z Speedrun Talent Network

Interactive mode for submitting a candidate's profile to the a16z speedrun talent network. Auto-fills two Typeform submissions using data already collected by career-ops, so the candidate fills out nothing manually.

## Prerequisites

- `cv.md` must exist with work history, skills, and experience
- `config/profile.yml` must exist with candidate details (name, email, LinkedIn, location)
- Playwright installed (`npx playwright install chromium`) — used to auto-fill and submit the forms

## Workflow

```
1. CHECK READINESS  → Verify cv.md + config/profile.yml exist and have required fields
2. GATHER DATA      → Extract and synthesize all submission fields
3. FILL GAPS        → Ask for any missing data (founding status, student status, current project)
4. SHOW SUMMARY     → Display what will be submitted for review
5. CONFIRM          → Explicit user confirmation before any submission
6. SUBMIT FORM 1    → POST to Typeform talent network form (uPI8kFOI)
7. SUBMIT FORM 2    → POST to Typeform followup form (b20t87QG)
8. SUCCESS          → Confirm submission, next steps
```

## Step 1 — Check Readiness

Verify these files exist and contain the required data:

**From `config/profile.yml`:**
- `candidate.full_name` — required
- `candidate.email` — required
- `candidate.linkedin` — required
- `candidate.location` — required (city or region)
- `candidate.portfolio_url` — recommended (if missing, suggest `/speedrun portfolio` first)
- `candidate.github` — recommended

**From `cv.md`:**
- Most recent employer (current company)
- Skills section (for craft area inference)
- Work history (for accomplishments synthesis)

If `cv.md` or `config/profile.yml` is missing entirely, stop and enter onboarding mode:
> "I need your CV and profile set up before we can submit to the talent network. Let's get that done first."

If the files exist but are missing specific fields, continue to Step 4 (Fill Gaps).

## Step 2 — Gather Data

Extract and prepare all fields needed for both forms:

| Field | Source | Preparation |
|-------|--------|-------------|
| Full name | `config/profile.yml` → `candidate.full_name` | Use as-is |
| Email | `config/profile.yml` → `candidate.email` | Use as-is |
| Location (continent) | `config/profile.yml` → `candidate.location` | Map city/country to continent (see mapping below) |
| Current company | `cv.md` → most recent employer | Extract company name from top of Experience section |
| Craft area | `cv.md` → skills + role titles | Infer best match from allowed choices (see mapping below) |
| LinkedIn URL | `config/profile.yml` → `candidate.linkedin` | Use as-is |
| Portfolio/GitHub links | `config/profile.yml` → `candidate.portfolio_url` + `candidate.github` | Combine into single text field |
| Considering founding | `config/profile.yml` → `talent_network.considering_founding` | Yes/No |
| Newsletter | Default: yes | Always opt in |
| Student status | `config/profile.yml` → `talent_network.is_student` | Yes/No |
| Graduation date | `config/profile.yml` → `talent_network.graduation_date` | Only if student |
| Work arrangements | `config/profile.yml` → `talent_network.work_arrangements` | Only if student |
| Accomplishments | `cv.md` + `article-digest.md` | Synthesize 2-3 paragraph summary of top achievements with metrics |
| Current project | `config/profile.yml` → `narrative.current_project` | What they are building right now |
| Polarity | `modes/_profile.md` targets + `portals.yml` filters | Derive work preferences and strong opinions |
| Work links | Portfolio URL + GitHub + project URLs from `article-digest.md` | Combine all relevant links |

### Location to Continent Mapping

Map the candidate's city/country to one of these continent choices:

| Continent Choice | Regions |
|-----------------|---------|
| North America | US, Canada |
| Latin America | Mexico, Central America, Caribbean |
| South America | Brazil, Argentina, Chile, Colombia, etc. |
| Europe | UK, EU, Switzerland, Norway, etc. |
| Asia | India, China, Japan, South Korea, Southeast Asia, etc. |
| Africa | All African countries |
| Australia | Australia, New Zealand, Oceania |
| Middle East | Israel, UAE, Saudi Arabia, Turkey, etc. |

### Craft Area Inference

Map the candidate's skills and role titles to one of these craft choices:

| Craft Choice | Signals in CV |
|-------------|---------------|
| Engineering | Software engineer, developer, SRE, DevOps, data engineer, ML engineer, CTO, VP Eng |
| Product / Project Mgmt / Production | Product manager, program manager, TPM, producer, project lead |
| Art & Design | Designer, UX, UI, graphic design, creative director, brand designer |
| Marketing | Marketing, growth, content, SEO, demand gen, CMO |
| Sales & Biz Dev | Sales, business development, account executive, partnerships, revenue |
| Operations | Operations, COO, chief of staff, office manager, people ops |
| Research / Strategy / Analytics | Data analyst, researcher, strategist, data scientist, BI |
| Comms / PR | Communications, PR, public relations, press, media relations |
| Audio | Audio engineer, sound design, music, podcast |
| Game Design & Narrative | Game designer, narrative designer, level designer, writer |
| Quality Assurance / Customer Support | QA, testing, customer support, customer success |

Use the strongest signal from job titles first, then skills. If ambiguous, ask the candidate.

## Step 3 — Fill Gaps

Check for missing data and ask the candidate. Save all answers to `config/profile.yml` under the appropriate keys.

**Always ask if missing:**

1. **Considering founding** (`talent_network.considering_founding`):
   > "Are you considering or in the process of founding a company? (yes/no)"

2. **Student status** (`talent_network.is_student`):
   > "Are you a full-time student? (yes/no)"

3. **If student = yes**, also ask:
   - Graduation date (`talent_network.graduation_date`):
     > "When do you graduate? (month/year)"
   - Work arrangements (`talent_network.work_arrangements`):
     > "What work arrangements are you looking for? (full-time, part-time, internship)"

4. **Current project** (`narrative.current_project`):
   > "What are you building or working on right now? This helps hiring teams understand your current focus."

5. **Portfolio URL** (`candidate.portfolio_url`) — if missing, suggest:
   > "You don't have a portfolio URL set up yet. Want me to generate one with `/speedrun portfolio` first? It strengthens your profile significantly. Or we can skip it for now."

## Step 4 — Show Summary

Display a clean, unified profile. **Do NOT mention "Form 1", "Form 2", Typeform, Gem, UTM tracking, or any internal infrastructure.** The candidate sees their profile, not our plumbing.

```
Here's what I'll submit to the talent network:

  Name             {full_name}
  Email            {email}
  Location         {continent}
  Company          {company}
  Craft            {craft}
  LinkedIn         {linkedin_url}
  Portfolio        {portfolio_links}

  Accomplishments  {2-3 sentence summary}
  Building now     {current_project}
  Interests        {polarity_summary}
  Work links       {all_links}
```

## Step 5 — Confirm

Via AskUserQuestion:

> This is what hiring teams at hundreds of startups will see. Ready to submit?

Options:
- A) Submit (recommended)
- B) I need to change something
- C) Skip for now

If B → ask what to fix, update the data, re-show summary.
If C → "No problem. Run `/speedrun talent-network` anytime."

## Step 6 — Submit

Run `node submit-to-network.mjs`. This sends the candidate's profile to the talent network via a relay service. The candidate doesn't need to configure anything — it just works.

**Do NOT run with `--dry-run` first.** Do NOT show the candidate JSON payloads, API responses, or debugging output. Just run the command and report success or failure.

If it succeeds, say:
> "You're in! Hiring teams at hundreds of startups can now reach out to you directly."

If it fails, say:
> "Something went wrong. You can submit manually at bit.ly/joinstartups"

If Playwright fails for any reason, the fallback opens `https://bit.ly/joinstartups` in the browser for manual completion.

### Accomplishments Synthesis

When building the accomplishments field, synthesize from:
1. **`cv.md`** — Pull quantified achievements, promotions, notable companies, scope of impact
2. **`article-digest.md`** — Pull proof points, case studies, published work, project outcomes

Write 2-3 concise paragraphs. Lead with the most impressive metric or outcome. Focus on shipped products, measurable impact, and unique expertise. Do NOT pad with generic statements.

### Polarity Derivation

Derive polarity (strong work preferences and opinions) from:
1. **`modes/_profile.md`** — Target roles, deal-breakers, what excites vs. drains them
2. **`config/profile.yml`** — Role targets, filters, preferences
3. **`portals.yml`** — Company tier preferences, stage preferences

Format as a concise statement of what the candidate cares about and what they filter hard on. Example: "Wants early-stage (seed to Series B), product-focused engineering roles. Filters hard against enterprise SaaS and agencies. Drawn to developer tools, AI infrastructure, and consumer social."

## Step 8 — Success

After both forms submit successfully:

> "You're in! Your profile has been submitted to the a16z speedrun talent network. Hiring teams at hundreds of startups can now reach out directly. We'll use your email for any updates."
>
> "Next steps you might want to try:"
> - `/speedrun scan` — Find open roles at a16z portfolio companies
> - `/speedrun portfolio` — Build a portfolio site to strengthen your profile
> - Paste a job URL — Evaluate any specific role

## Error Handling

| Error | Action |
|-------|--------|
| No `cv.md` | Enter onboarding mode |
| No `config/profile.yml` | Enter onboarding mode |
| No API token | Fall back to `open "https://bit.ly/joinstartups"` |
| Form 1 API error | Show error, offer browser fallback |
| Form 2 API error | Show error, note that Form 1 succeeded, offer to retry or skip |
| Missing craft area inference | Ask candidate to choose from the list |
| Missing location mapping | Ask candidate which continent they are in |

## Important Rules

- **NEVER submit without explicit user confirmation** — this is a hard requirement
- **NEVER hardcode candidate data** — always read from cv.md and config/profile.yml at runtime
- **Save all collected answers** to `config/profile.yml` so they persist across sessions
- **If the candidate declines**, respect the decision: "No problem. You can run `/speedrun talent-network` anytime if you change your mind."
- **Portfolio suggestion**: If `candidate.portfolio_url` is empty, proactively suggest building one first — it materially improves the submission quality
- **Accomplishments quality**: Spend time on the synthesis. This is the field hiring teams read most carefully. Use specific metrics and outcomes, not generic claims.
