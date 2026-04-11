# Mode: portfolio — Portfolio Site Generation & Deploy

Generate a polished static HTML portfolio website from the user's career-ops data and deploy it to GitHub Pages.

## Full Pipeline

1. Read `cv.md` as source of truth for experience, education, skills
2. Read `config/profile.yml` for name, email, LinkedIn, GitHub, portfolio URL, headline, superpowers, proof points
3. Read `article-digest.md` for detailed proof points and case studies (optional — skip gracefully if missing)
4. Scan `reports/` for top evaluation highlights (optional — use highest-scored reports as case study material)
5. **Template selection** — present the candidate with template options and let them pick:

   | Template | Vibe |
   |----------|------|
   | `ink` | Warm editorial — magazine feature energy |
   | `terminal` | Dark + technical — late-night shipping session |
   | `volt` | Bold + modern — product launch page energy |
   | `folio` | Warm + personal — the site a thoughtful person would make by hand |
   | `grid` | Data-forward — Bloomberg terminal meets personal site |
   | `statement` | Thesis-driven — one bold claim, then the proof |
   | `caps` | Bold confidence — all-caps headlines, high impact |
   | `bare` | Ultra-minimal — just the words, nothing else |

   Read `DESIGN.md` for full template specs (fonts, colors, layout, mood). The selected template name gets passed to the generator: `node generate-portfolio.mjs --template={name}`.

   If the candidate can't decide, recommend `ink` for non-technical roles and `terminal` for engineering/builder roles.

6. Generate portfolio using the selected template: `node generate-portfolio.mjs --template={name}`
7. Check if `gh` CLI is installed: `which gh`
8. **If gh exists:**
   a. Check if portfolio repo exists: `gh repo view portfolio 2>/dev/null`
   b. If not, create it: `gh repo create portfolio --public --confirm`
   c. Deploy: `npx gh-pages -d dist`
   d. Derive the GitHub Pages URL: `https://{username}.github.io/portfolio`
9. **If gh is NOT installed:**
   a. Save HTML and inform the user: "Your portfolio is ready at `dist/index.html`"
   b. Suggest manual deployment options: GitHub Pages, Netlify Drop, Vercel, Cloudflare Pages
10. After successful deploy: update `config/profile.yml` → `candidate.portfolio_url` with the live GitHub Pages URL
11. Report the live URL back to the user

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
