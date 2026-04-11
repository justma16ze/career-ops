# Design System — Speedrun Career Ops Portfolio Templates

## Product Context
- **What this is:** AI-generated portfolio websites for engineers and builders
- **Who it's for:** Engineers transitioning from big tech to startups, builders looking for startup roles
- **Output:** Static HTML deployed to GitHub Pages (no framework, no build step, zero JS except Terminal cursor blink)
- **Distribution:** Every portfolio has a "made by speedrun" footer linked to the GitHub repo. Portfolio quality IS the growth engine.

## Design Philosophy

**Zero customization per template.** Each template is a complete, opinionated design. The candidate picks a template, not individual elements. This constraint is the quality guarantee — every output looks good because no one can break the design.

**Text-first.** These are not visual portfolios. The content IS the design. Typography, spacing, and color do the work. No decorative elements, no stock images, no blobs.

**No AI slop.** No pill-shaped elements. No purple gradients. No scroll-triggered animations. No 3-column icon grids. No centered-everything layouts. No decorative border-radius on everything. If it looks like an AI generated it, it's wrong.

**Multi-page structure.** Every template generates: Home (hero + summary), Work (projects), Experience (resume), About (interests, open to, contact).

**"made by speedrun" footer.** Simple text, thin separator line above, linked to the GitHub repo. Not a badge, not a pill. Colophon energy, not ad energy.

## Templates (8 current, extensible to 30+)

### 01 — INK (Warm Editorial)
- **Mood:** A beautifully typeset magazine feature about an interesting person
- **Inspired by:** Editorial design, Jessie Dong's portfolio
- **Display:** Instrument Serif (Google Fonts)
- **Body:** Source Sans 3 (Google Fonts)
- **Metadata:** IBM Plex Mono (Google Fonts)
- **Background:** `#faf6f0` (parchment)
- **Text:** `#1a1a1a` (ink)
- **Accent:** `#c1553d` (warm red) — used on proof metrics, links
- **Layout:** Two-column hero (name + thesis left, proof metrics right), editorial sections with hairline rules
- **Border:** `#d8d0c4` (warm separator)

### 02 — TERMINAL (Claude Code Energy)
- **Mood:** Late-night shipping session in the terminal. Dark + gold + stars.
- **Inspired by:** a16z@talent candidate matcher, Claude Code interface
- **Display/Body:** JetBrains Mono (Google Fonts)
- **Section labels:** General Sans (Fontshare)
- **Background:** `#0d0d0d` (near-black) with subtle CSS star/particle effect
- **Text:** `#d4d4d4` (light gray)
- **Accent:** `#e8c473` (warm gold)
- **Layout:** Single column, monospace grid. Projects as "ship log" entries with timestamps and impact deltas
- **Special:** Only template with animation (cursor blink via CSS @keyframes). Terminal prompt hero: `> username_`
- **Border:** `#222` (subtle dark separator)

### 03 — VOLT (Sharp + Bold)
- **Mood:** Product launch page energy. Sharp, high-contrast.
- **Inspired by:** Modern design, high-contrast product sites
- **Display/Body:** Cabinet Grotesk (Fontshare)
- **Background:** `#fefefe` (near-white)
- **Text:** `#0a0a0a` (near-black)
- **Accent:** `#e11d48` (rose) — used on links, divider, metrics
- **Layout:** Bold hero with large name (44px, weight 800), short red divider below, projects with rose-accented underlines
- **Tech tags:** Plain text, `#aaa` color
- **Border:** `#eee` (light)

### 04 — FOLIO (Warm + Text-Forward)
- **Mood:** The kind of personal site a thoughtful person would make by hand
- **Inspired by:** pflo.org, Jessie Dong, Carlo Schreiber
- **Display:** Instrument Serif (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- **Background:** `#f8f5f0` (warm cream)
- **Text:** `#222`
- **Accent:** `#2563eb` (blue) — links, metrics
- **Layout:** Two-column (bio + projects left, skills sidebar right). Generous paragraphs. Readable.
- **Border:** `#ddd5c8` (warm separator)

### 05 — GRID (Data-Forward)
- **Mood:** Bloomberg terminal meets personal site. Dense, information-rich, utilitarian.
- **Inspired by:** Data-heavy dashboards, engineering efficiency
- **Display/Body:** General Sans (Fontshare)
- **Data:** JetBrains Mono (Google Fonts)
- **Background:** `#f5f5f4` (stone) with `#171717` dark data bar at top
- **Text:** `#171717`
- **Accent:** `#16a34a` (green) — data metrics
- **Layout:** Dark header bar with name + stats, then tabular project data. Compact, dense.
- **Border:** `#d4d4d4`

### 06 — STATEMENT (Serif Statement)
- **Mood:** Your hero text IS the design. Statement-driven, confident.
- **Inspired by:** Bradley Ziffer
- **Display:** Instrument Serif (Google Fonts)
- **Body:** Source Sans 3 (Google Fonts)
- **Background:** `#fff`
- **Text:** `#1a1a1a`
- **Accent:** `#d4a040` (warm gold) — experience dates, metrics
- **Layout:** Large serif statement as hero (not a name, a thesis), then clean experience table (company | role | dates), then projects
- **Border:** `#eee` / `#f0f0f0`

### 07 — CAPS (Bold Confidence)
- **Mood:** ALL-CAPS statement. Direct. Confident. You know who this person is immediately.
- **Inspired by:** Karina Sirqueira
- **Display/Body:** General Sans (Fontshare)
- **Background:** `#fff`
- **Text:** `#111`
- **Accent:** `#0d9488` (dark teal) — links, metrics
- **Layout:** Large ALL-CAPS hero text, then readable body. Nav and labels in uppercase. Projects with bold underlined titles.
- **Border:** `#eee`

### 08 — BARE (Ultra-Minimal)
- **Mood:** The anti-design design. Almost no styling. Text does everything.
- **Inspired by:** Max Lee, Lawrence Zhao
- **Display/Body:** System font stack (-apple-system, BlinkMacSystemFont, sans-serif)
- **Background:** `#fff`
- **Text:** `#111`
- **Accent:** `#2563eb` (blue) — all links
- **Layout:** Narrow single column (max-width 600px), no decoration, minimal hierarchy. Experience as compact entries, projects as bullet lists.
- **Border:** None (or minimal)

## Shared Rules (all templates)

### Typography
- All fonts loaded from Google Fonts or Fontshare (free, CDN)
- No overused fonts as primary: Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Montserrat, Poppins
- Monospace accents (IBM Plex Mono or JetBrains Mono) for technical metadata

### Tags & Labels
- Plain text with thin underlines or borders (1px, no radius)
- NEVER pill-shaped. NEVER rounded buttons for tags.
- Comma-separated text is fine for skills lists

### Footer Signature
```html
<footer>made by <a href="https://github.com/a16z/speedrun-career-ops">speedrun</a></footer>
```
- Thin hairline separator above (`border-top: 1px solid [template-border-color]`)
- Small type (11-12px)
- Muted color (matches template's quietest text color)
- Link goes to GitHub repo

### Motion
- No scroll-triggered animations on any template
- No parallax, no intersection observer effects
- TERMINAL only: cursor blink via CSS `@keyframes`, subtle typewriter on hero name
- Hover states: underline color change or opacity shift. Nothing more.

### Responsive
- All templates collapse to single column on mobile (< 700px)
- Font sizes scale down appropriately
- Nav wraps gracefully
- Tested at: 320px, 375px, 768px, 1024px, 1440px

### Spacing
- Base unit: 8px
- Density varies per template:
  - Comfortable: Ink, Folio, Statement, Caps
  - Compact: Terminal, Grid, Bare
- Scale: xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48)

## How to Add New Templates

Adding a template takes ~15 minutes with Claude Code:

1. **Pick a reference site.** Show it to Claude. Describe what you like about it.
2. **Name the template.** Short, evocative. One word.
3. **Claude extracts the design DNA:** font stack, color palette, layout approach, spacing density, accent color, any signature elements.
4. **Claude writes the CSS.** Each template is a self-contained CSS block scoped by a class name (`.template-name`).
5. **Claude adds the HTML generation function** to `generate-portfolio.mjs` following the existing pattern.
6. **Update this file** with the new template's spec.
7. **Add to preview page** at `/tmp/speedrun-design-preview.html` for visual validation.

Template architecture: each template is a CSS class that contains ALL styling. Templates share no CSS. This means templates can't break each other, and adding/removing templates is a clean operation.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-11 | Initial design system: 8 templates | Created by /design-consultation based on competitive research + 9 reference sites from Jordan |
| 2026-04-11 | No pills anywhere | Jordan identified pill-shaped elements as AI slop |
| 2026-04-11 | No animations except Terminal | Scroll animations read as AI slop; Terminal cursor blink fits the aesthetic |
| 2026-04-11 | "made by speedrun" footer linked to GitHub | Not a brand stamp. A maker's mark. Linked to open source repo. |
| 2026-04-11 | Zero customization per template | Apple model: constraint IS the quality guarantee |
| 2026-04-11 | 8 templates now, designed for 30+ | Extensible architecture, each template is self-contained CSS |
