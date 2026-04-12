# Mode: portfolio — Portfolio Site Generation & Deploy

Generate a polished static HTML portfolio website from the user's career-ops data and deploy it to GitHub Pages.

## Full Pipeline

### Step 0: Data Completeness Audit (MANDATORY before generation)

Before generating ANYTHING, audit the candidate's data for portfolio readiness. A thin profile produces a thin portfolio that nobody would share. The whole point is output quality.

Read `cv.md` and `config/profile.yml`. For each experience entry, check:

**Red flags (MUST fix before generating):**
- Any role with 2+ years tenure and fewer than 3 bullet points → ask the candidate to expand
- Current role with fewer than 3 bullet points → always ask, this is the most important entry
- No `narrative.home_bio` field → write one from the conversation (conversational paragraph with inline links)
- No headline in profile.yml → ask for one

**Yellow flags (recommend fixing):**
- Missing `narrative.motivation` → ask "what's driving this search?"
- Missing `narrative.current_project_detail` → ask "what are you building?"
- Fewer than 3 superpowers → ask "what are you best at?"
- No education section → ask if they want to include it

**How to fill gaps:**
Don't ask the candidate to "update cv.md." Have a CONVERSATION. Ask them about the role:
- "You've been at [company] for [N years] as [role]. What are the 3-5 things you're most proud of there?"
- "What did the team/org look like when you started vs now?"
- "What's the biggest problem you solved?"

Then YOU update cv.md with their answers, formatted as bullet points under the right role.

For home_bio: write a conversational paragraph about the person based on everything you know. Include inline HTML links to their LinkedIn, current company, projects, etc. Store in `narrative.home_bio` in profile.yml. Show it to them for approval before proceeding.

**Only proceed to Step 1 when all red flags are resolved.**

### Step 1: Read source data

1. Read `cv.md` as source of truth for experience, education, skills
2. Read `config/profile.yml` for name, email, LinkedIn, GitHub, portfolio URL, headline, superpowers, proof points
3. Read `article-digest.md` for detailed proof points and case studies (optional — skip gracefully if missing)
4. Scan `reports/` for top evaluation highlights (optional — use highest-scored reports as case study material)

### Step 2: Template selection (three-door concierge)

**The system has 20 styles x 8 layouts = 160 combinations.** Don't dump that on the candidate. Let them choose how deep they want to go.

Ask the candidate:

> "How do you want to pick your portfolio template?"
>
> - A) **Quick pick** — I'll suggest 3 based on your profile. Fastest way to a great site. (recommended)
> - B) **Browse by vibe** — Pick a mood, see what matches.
> - C) **See everything** — Full gallery of all options with filters.

---

#### Path A: Quick pick (concierge) — v1, build this

Based on `candidate.type` and `candidate.positioning` (from profile.yml), select 3 combos using the table below. Each combo is a style + layout pair passed to `combine-portfolio.mjs`.

**Recommendation table:**

| Candidate type | Positioning / signal | Combo 1 | Combo 2 | Combo 3 |
|----------------|---------------------|---------|---------|---------|
| Student | academic-forward | garden-multipage | ink-multipage | almanac-multipage |
| Student | builder-forward | press-cards | void-scroll | ember-centered |
| Student | appear experienced | slate-sidebar | volt-multipage | bare-multipage |
| Experienced | technical | terminal-multipage | void-scroll | grid-multipage |
| Experienced | operator/leader | ink-spread | garden-multipage | statement-multipage |
| Experienced | creative | press-cards | coral-bands | gradient-centered |
| Early career | lead with experience | volt-multipage | folio-multipage | bare-multipage |
| Early career | lead with projects | press-cards | ember-centered | void-scroll |

**How to determine positioning/signal for experienced and early career candidates (no explicit positioning step):**
- Check `target_roles` and `narrative.superpowers` in profile.yml
- If superpowers/roles mention engineering, architecture, systems, infrastructure, data → **technical**
- If superpowers/roles mention management, operations, strategy, leadership, growth → **operator/leader**
- If superpowers/roles mention design, brand, creative, content, UX → **creative**
- If ambiguous → default to **technical** (most common in the speedrun funnel)
- For early career, use their positioning choice from Step 6 of onboarding ("lead with experience" vs "lead with projects")

**Generation steps:**

1. Parse the combo name. Format is `STYLE-LAYOUT` (e.g., `garden-multipage` → `--style=garden --layout=multipage`).

2. Generate all 3 combos into separate output directories:
   ```bash
   node combine-portfolio.mjs --style=garden --layout=multipage --output=dist-preview/garden-multipage
   node combine-portfolio.mjs --style=ink --layout=multipage --output=dist-preview/ink-multipage
   node combine-portfolio.mjs --style=almanac --layout=multipage --output=dist-preview/almanac-multipage
   ```

3. Launch the visual template picker (ONE URL, not three):
   ```bash
   node serve-picker.mjs COMBO1 COMBO2 COMBO3
   ```
   This opens a gallery page at http://localhost:3849 showing all 3 templates side by side as live previews. Each has a "Pick this one" button. The user clicks their favorite directly in the browser.

4. Open the picker in Chrome:
   ```bash
   open http://localhost:3849
   ```
   Tell the candidate: "I've opened a gallery with your 3 templates. Click 'Pick this one' on your favorite, then come back here."

5. Wait for the selection. The picker writes the choice to `/tmp/speedrun-template-choice.txt`. Read it:
   ```bash
   # Poll for the file (it's created when the user clicks)
   while [ ! -f /tmp/speedrun-template-choice.txt ]; do sleep 1; done
   cat /tmp/speedrun-template-choice.txt
   ```
   
   If the file contains "more": generate 3 new combos from a different vibe, restart from step 2.
   If the file contains a combo name: that's their choice. Proceed.

6. After selection: store the style and layout in profile.yml, generate the final version into `dist/`, and proceed to Step 2.5.

6. **If "show me more":** Pick 3 more combos from a DIFFERENT vibe category than the original 3. Use the vibe mapping below to find the next category. Generate those 3 the same way and present again.

   **Vibe category rotation for "show me more":**
   - If original was from Warm & Editorial → show from Bold & Confident
   - If original was from Bold & Confident → show from Dark & Technical
   - If original was from Dark & Technical → show from Clean & Minimal
   - If original was from Clean & Minimal → show from Warm & Editorial
   - If original was from Playful & Creative → show from Professional & Structured
   - If original was from Professional & Structured → show from Playful & Creative

   **"Show me more" combo picks by vibe category:**

   | Vibe category | Combo 1 | Combo 2 | Combo 3 |
   |---------------|---------|---------|---------|
   | Dark & Technical | terminal-multipage | void-scroll | tactical-multipage |
   | Warm & Editorial | ink-spread | garden-multipage | prose-centered |
   | Bold & Confident | volt-multipage | caps-multipage | ember-centered |
   | Clean & Minimal | bare-multipage | folio-multipage | lab-multipage |
   | Playful & Creative | coral-bands | almanac-multipage | press-cards |
   | Professional & Structured | grid-multipage | statement-multipage | slate-sidebar |

   Generate and serve exactly like the initial 3. If the candidate says "show me more" again, rotate to the next vibe category. After exhausting all 6 categories, tell the candidate they've seen the full range and ask them to pick.

---

#### Path B: Browse by vibe — v2, document only (do not build the full UX yet)

6 vibe categories. Candidate picks a mood, sees all matching combos rendered as thumbnails.

| Vibe | Styles in this category |
|------|------------------------|
| Dark & Technical | terminal, void, tactical, slate |
| Warm & Editorial | ink, garden, blush, prose, almanac |
| Bold & Confident | volt, caps, press, gradient, ember |
| Clean & Minimal | bare, folio, lab, dusk |
| Playful & Creative | coral, almanac, press |
| Professional & Structured | grid, statement, slate |

**v2 flow (not yet built):**
1. Show the 6 vibe names with 1 thumbnail each as preview
2. Candidate picks a vibe
3. Show all layouts in that vibe (each style x all 8 layouts = ~32 thumbnails per vibe, but filter to ~8 best combos)
4. Candidate clicks to preview with their real data on localhost
5. Thumbnails are pre-rendered via `node combine-portfolio.mjs --all --thumbnails` (headless browser, ~5 min for 160)

**Note:** Some styles appear in multiple vibes (almanac is both Warm & Editorial and Playful & Creative; press is both Bold & Confident and Playful & Creative; slate is both Dark & Technical and Professional & Structured). Deduplicate in the UI.

**v1 workaround:** If a candidate picks Path B today, ask them which vibe sounds closest, then generate 3 combos from that vibe category using the "show me more" table above. Same generation/preview flow as Path A.

---

#### Path C: See everything — v2, document only (do not build)

Full gallery of all 160 combos with filter chips and search.

**v2 flow (not yet built):**
1. Grid of pre-rendered thumbnails for all 160 combos
2. Filter chips: Dark/Light, Single page/Multi page, Minimal/Bold, Project-heavy/Experience-heavy
3. Search by name (e.g., "press" or "cards")
4. Click any thumbnail → generate with real data on localhost
5. Gallery served at `http://localhost:3850` (existing combo viewer)

**v1 workaround:** If a candidate picks Path C today, run `node combine-portfolio.mjs --list-styles` and `node combine-portfolio.mjs --list-layouts`, show the candidate the full list of 20 styles and 8 layouts, ask them to pick a style and a layout, generate that single combo, and preview it. Offer to iterate.

---

#### Template combo reference (style x layout)

For reference, here are all valid style-layout combos. Each combo is generated via `node combine-portfolio.mjs --style=STYLE --layout=LAYOUT`.

**20 styles:** almanac, bare, blush, caps, coral, dusk, ember, folio, garden, gradient, grid, ink, lab, press, prose, statement, tactical, terminal, void, volt

**8 layouts:** bands, cards, centered, multipage, scroll, sidebar, sidebar-right, spread

**Style vibes (for describing to candidates):**
| Style | Vibe description |
|-------|-----------------|
| ink | Warm editorial with proof sidebar — magazine feature energy |
| terminal | Dark + gold + stars — late-night shipping session |
| lab | Eggshell timeline — research lab aesthetic |
| volt | Sharp high-contrast — product launch page energy |
| folio | Warm cream, two-column — made by hand energy |
| grid | Bloomberg terminal — dense, data-forward |
| statement | Your headline IS the hero — thesis-driven |
| caps | ALL-CAPS confidence — direct and bold |
| bare | Anti-design — just the words, nothing else |
| garden | Warm linen, massive serif — editorial magazine |
| ember | Hot pink headlines — instantly recognizable |
| blush | Italian warmth — centered serif, yellow accent |
| prose | Large italic serif name — literary confidence |
| coral | Coral bg framing white column — maker-culture zine |
| almanac | Table-of-contents nav — archival, book-like |
| void | Near-black + radial glow — hacker minimal |
| dusk | Warm cream, sage labels — warm palette |
| gradient | Pastel blue, stacked outline/filled serif — graphic design |
| press | Neo-brutalist — offset shadows, coral/yellow blocks |
| tactical | Military/defense — monospace, olive, command-and-control |

Read `DESIGN.md` for full template specs.

### Step 2.5: Template-aware content collection (NEW)

After the candidate picks a template, check what content modules that layout benefits from. Ask targeted follow-up questions to fill gaps.

**Content modules and which templates use them:**

| Module | Templates that benefit | Onboarding question |
|--------|----------------------|---------------------|
| `projects` (detailed) | deck, spread, band, ink, grid, slate | "This layout has a project spotlight section. Tell me about 1-2 things you shipped. What was the problem? What did you build? What happened?" |
| `testimonials` | letter, spread, garden, statement | "Got any quotes from managers or teammates? Something like 'Jordan built X from scratch' — even a Slack message or performance review line works." |
| `values` | letter, statement, spread | "What are 3-5 principles that guide how you work? Not buzzwords — real things like 'distribution is a product problem.'" |
| `now` | dusk, field, garden | "What are you working on right now? 2-3 sentences about your current focus." |
| `talks` | ink, garden, spread | "Any conference talks, published articles, or podcast appearances?" |
| `tools` | grid, dusk, field, deck | "What's your daily toolkit? Not just 'Python' — more like 'Python for data pipelines, dbt for transforms.'" |
| `gallery` | deck, press, gradient | "Do you have screenshots, diagrams, or visual samples of your work? Link me to any hosted images." |
| `reading` | prose, garden, almanac | "Any books that shaped how you think about your work?" |

**Rules:**
- Only ask for modules the selected template actually renders. Don't collect data that won't be used.
- Ask through conversation, not a checklist. "Tell me about a project" not "Fill in: problem, solution, outcome."
- Store answers in `config/profile.yml` under `preferences.projects`, `preferences.testimonials`, etc.
- 2-3 modules max per template. Don't overwhelm the candidate.
- If a candidate has no projects/testimonials/etc., the template renders fine without them — it just looks thinner.

### Step 3: Generate

3. Generate portfolio using the selected template: `node generate-portfolio.mjs --template={name}`
4. **Open the generated pages in the browser** and review them WITH the candidate. If anything looks thin, wrong, or duplicated — fix the source data (cv.md, profile.yml) and regenerate. Do NOT deploy garbage.

### Step 4: Deploy

5. Check if `gh` CLI is installed: `which gh`
6. **If gh exists:**
   a. Get GitHub username: `gh api user -q .login`
   b. Check if portfolio repo exists: `gh repo view portfolio 2>/dev/null`
   c. If not, create it: `gh repo create portfolio --public --confirm`
   d. Deploy: `npx gh-pages -d dist`
   e. Derive the GitHub Pages URL: `https://{username}.github.io/portfolio`
7. **If gh is NOT installed:**
   a. Save HTML and inform the user: "Your portfolio is ready at `dist/index.html`"
   b. Suggest manual deployment options: GitHub Pages, Netlify Drop, Vercel, Cloudflare Pages
8. After successful deploy: update `config/profile.yml` → `candidate.portfolio_url` with the live GitHub Pages URL

### Step 4.5: GitHub Profile README (optional but recommended)

After deploying the portfolio, offer to update the candidate's GitHub profile README (the special `username/username` repo that shows on their GitHub profile page).

Generate a README.md that includes:
- Their name and headline
- A short version of their bio (2-3 sentences, markdown not HTML)
- A prominent link to their portfolio
- Links to LinkedIn, email, etc.
- A "made by [your-personal-readme](https://github.com/justma16ze/your-personal-readme)" attribution

```bash
# Check if the profile repo exists
gh repo view {username}/{username} 2>/dev/null
# If not, create it
gh repo create {username} --public --confirm
# Clone, write README, push
```

Via AskUserQuestion:
> "Want me to also update your GitHub profile? It's the page people see when they visit github.com/{username}. I'll add your bio and a link to your portfolio."
> - A) Yes, update my profile (recommended)
> - B) Skip

### Step 4.6: Open the live portfolio

After deploy, ALWAYS open the live portfolio and the user's GitHub profile in Chrome so they can see it:

```bash
open "https://{username}.github.io/portfolio"
open "https://github.com/{username}"
```

9. Report the live URL back to the user

## HTML Generation

Generate a single `dist/index.html` file. **No external dependencies** — all CSS is inlined in a `<style>` block. No JavaScript required.

### Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{NAME}} — {{HEADLINE}}</title>
  <!-- Open Graph meta tags for link previews -->
  <meta property="og:title" content="{{NAME}} — {{HEADLINE}}">
  <meta property="og:description" content="{{SUMMARY_SHORT}}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{PORTFOLIO_URL}}">
  <style>/* all CSS inlined here */</style>
</head>
<body>
  <header><!-- Hero --></header>
  <main>
    <section id="about"><!-- About --></section>
    <section id="experience"><!-- Experience --></section>
    <section id="projects"><!-- Projects & Case Studies --></section>
    <section id="skills"><!-- Skills --></section>
    <section id="education"><!-- Education --></section>
  </main>
  <footer><!-- Contact + attribution --></footer>
</body>
</html>
```

### Sections

1. **Hero** — name (from `profile.yml` → `candidate.full_name`), professional headline (`candidate.headline` or infer from cv.md), location (`candidate.location`)
2. **About** — professional summary extracted from the top of `cv.md` (the Summary or About section). Keep it 2-4 sentences.
3. **Experience** — work history from `cv.md`, reverse chronological. Each entry: company name, role title, date range, bullet-point descriptions. Limit to most recent 4-5 roles.
4. **Projects & Case Studies** — proof points from `article-digest.md`. If `reports/` has evaluations scored 4.0+, extract the candidate's strongest proof points used in those reports. Each project card: title, description, key metric/outcome, tech used.
5. **Skills** — technical areas from `cv.md` Skills section + `profile.yml` superpowers. Render as tags/badges in a responsive grid.
6. **Education** — degrees, schools, dates from `cv.md` Education section.
7. **Contact** — LinkedIn URL, GitHub URL, email (all from `profile.yml`). Render as icon links in the footer.

### Footer Attribution

Include at the bottom of the page:

```html
<p class="attribution">Built with <a href="https://github.com/santifer/career-ops">Speedrun Career Ops</a></p>
```

## Style Guidelines

### CSS Custom Properties (theming)

```css
:root {
  --color-bg: #0f172a;
  --color-surface: #1e293b;
  --color-text: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-accent: #38bdf8;
  --color-accent-secondary: #a78bfa;
  --color-border: #334155;
  --font-heading: system-ui, -apple-system, sans-serif;
  --font-body: system-ui, -apple-system, sans-serif;
  --radius: 8px;
  --max-width: 900px;
}
```

Use CSS custom properties throughout so the user can easily retheme by changing a few values.

### Responsive Design (mobile-first)

- Base styles target mobile (single column, stacked layout)
- `@media (min-width: 768px)` for tablet (2-column skills grid)
- `@media (min-width: 1024px)` for desktop (wider max-width, more spacing)
- All font sizes use `clamp()` for fluid typography
- Images and containers use `max-width: 100%`

### Layout Rules

- Single-column centered layout (`max-width: var(--max-width); margin: 0 auto`)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`
- Skills section: CSS Grid with `auto-fill` for responsive tag layout
- Experience entries: clear visual hierarchy with company/role/date
- Adequate whitespace between sections (`padding: 4rem 1.5rem`)

### Animations (CSS only, no JS)

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

section {
  animation: fadeInUp 0.6s ease-out both;
}

section:nth-child(2) { animation-delay: 0.1s; }
section:nth-child(3) { animation-delay: 0.2s; }
section:nth-child(4) { animation-delay: 0.3s; }
section:nth-child(5) { animation-delay: 0.4s; }
```

Use `prefers-reduced-motion` media query to disable animations for accessibility:

```css
@media (prefers-reduced-motion: reduce) {
  section { animation: none; }
}
```

### Print Styles

```css
@media print {
  body { background: white; color: black; }
  header { break-after: avoid; }
  section { break-inside: avoid; }
  a { color: inherit; text-decoration: underline; }
  a[href]::after { content: " (" attr(href) ")"; font-size: 0.8em; }
  .attribution { display: none; }
}
```

This allows the portfolio to be exported as a clean PDF directly from the browser.

### Additional Requirements

- **ATS/recruiter friendly**: clean semantic HTML, text is selectable, no content hidden in images or SVGs
- **Fast loading**: zero external requests — no Google Fonts, no CDN, no analytics. Everything inlined.
- **Accessible**: proper heading hierarchy (h1 → h2 → h3), sufficient color contrast (WCAG AA), focus-visible styles on links
- **Open Graph tags**: `og:title`, `og:description`, `og:type`, `og:url` for rich link previews when shared on LinkedIn/Twitter/Slack

## Data Mapping

| HTML Section | Primary Source | Fallback |
|---|---|---|
| Hero name | `profile.yml` → `candidate.full_name` | First H1 in `cv.md` |
| Hero headline | `profile.yml` → `candidate.headline` | First line of cv.md Summary |
| Hero location | `profile.yml` → `candidate.location` | — |
| About | `cv.md` → Summary/About section | First paragraph of `cv.md` |
| Experience | `cv.md` → Work Experience section | — |
| Projects | `article-digest.md` → proof points | `reports/` top highlights |
| Skills | `cv.md` → Skills section | `profile.yml` → `candidate.superpowers` |
| Education | `cv.md` → Education section | — |
| Contact links | `profile.yml` → `candidate.linkedin`, `candidate.github`, `candidate.email` | — |
| OG URL | `profile.yml` → `candidate.portfolio_url` | Generated GitHub Pages URL |

## Error Handling

- If `cv.md` is missing → abort and trigger onboarding (see CLAUDE.md Step 1)
- If `config/profile.yml` is missing → abort and trigger onboarding (see CLAUDE.md Step 2)
- If `article-digest.md` is missing → skip Projects section or use only `reports/` highlights
- If `reports/` is empty → skip Projects section entirely (About + Experience + Skills + Education is sufficient)
- If `gh` is not installed → still generate the HTML, skip deploy, tell user how to deploy manually
- If `gh repo create` fails (repo exists) → continue with deploy
- If `npx gh-pages` fails → show error, suggest manual push to `gh-pages` branch

## Post-generation

1. Update `config/profile.yml` → `candidate.portfolio_url` with the live URL
2. If the user is tracked in `data/applications.md`, the portfolio URL is now available for Typeform auto-submit (Form 1 field 7, Form 2 field 4)
3. Suggest: "Your portfolio is live. Want me to update your CV header to include the portfolio link?"
