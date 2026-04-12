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

## Templates (13 current, extensible to 30+)

### 01 — INK (Warm Editorial)
- **Mood:** A beautifully typeset magazine feature about an interesting person
- **Aesthetic:** Warm editorial serif with proof sidebar
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
- **Aesthetic:** Terminal-inspired dark interface with gold accents
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
- **Aesthetic:** High-contrast product launch page energy
- **Display/Body:** Cabinet Grotesk (Fontshare)
- **Background:** `#fefefe` (near-white)
- **Text:** `#0a0a0a` (near-black)
- **Accent:** `#e11d48` (rose) — used on links, divider, metrics
- **Layout:** Bold hero with large name (44px, weight 800), short red divider below, projects with rose-accented underlines
- **Tech tags:** Plain text, `#aaa` color
- **Border:** `#eee` (light)

### 04 — FOLIO (Warm + Text-Forward)
- **Mood:** The kind of personal site a thoughtful person would make by hand
- **Aesthetic:** Warm text-forward, handcrafted personal site energy
- **Display:** Instrument Serif (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- **Background:** `#f8f5f0` (warm cream)
- **Text:** `#222`
- **Accent:** `#2563eb` (blue) — links, metrics
- **Layout:** Two-column (bio + projects left, skills sidebar right). Generous paragraphs. Readable.
- **Border:** `#ddd5c8` (warm separator)

### 05 — GRID (Data-Forward)
- **Mood:** Bloomberg terminal meets personal site. Dense, information-rich, utilitarian.
- **Aesthetic:** Data-heavy dashboard, engineering efficiency
- **Display/Body:** General Sans (Fontshare)
- **Data:** JetBrains Mono (Google Fonts)
- **Background:** `#f5f5f4` (stone) with `#171717` dark data bar at top
- **Text:** `#171717`
- **Accent:** `#16a34a` (green) — data metrics
- **Layout:** Dark header bar with name + stats, then tabular project data. Compact, dense.
- **Border:** `#d4d4d4`

### 06 — STATEMENT (Serif Statement)
- **Mood:** Your hero text IS the design. Statement-driven, confident.
- **Aesthetic:** Statement-driven serif confidence
- **Display:** Instrument Serif (Google Fonts)
- **Body:** Source Sans 3 (Google Fonts)
- **Background:** `#fff`
- **Text:** `#1a1a1a`
- **Accent:** `#d4a040` (warm gold) — experience dates, metrics
- **Layout:** Large serif statement as hero (not a name, a thesis), then clean experience table (company | role | dates), then projects
- **Border:** `#eee` / `#f0f0f0`

### 07 — CAPS (Bold Confidence)
- **Mood:** ALL-CAPS statement. Direct. Confident. You know who this person is immediately.
- **Aesthetic:** Bold all-caps confidence
- **Display/Body:** General Sans (Fontshare)
- **Background:** `#fff`
- **Text:** `#111`
- **Accent:** `#0d9488` (dark teal) — links, metrics
- **Layout:** Large ALL-CAPS hero text, then readable body. Nav and labels in uppercase. Projects with bold underlined titles.
- **Border:** `#eee`

### 08 — BARE (Ultra-Minimal)
- **Mood:** The anti-design design. Almost no styling. Text does everything.
- **Aesthetic:** Ultra-minimal, text-only
- **Display/Body:** System font stack (-apple-system, BlinkMacSystemFont, sans-serif)
- **Background:** `#fff`
- **Text:** `#111`
- **Accent:** `#2563eb` (blue) — all links
- **Layout:** Narrow single column (max-width 600px), no decoration, minimal hierarchy. Experience as compact entries, projects as bullet lists.
- **Border:** None (or minimal)

### 09 — GARDEN (Digital Garden)
- **Mood:** Warm linen/cream background, massive serif headline, editorial magazine restraint. Type does all the work.
- **Display:** Lora (Google Fonts) — warm transitional serif, 96px hero
- **Body:** Source Sans 3 (Google Fonts)
- **Background:** `#f3f0eb` (warm linen)
- **Text:** `#353534` (warm near-black)
- **Headline:** `#1a1a1a` (darker for contrast), first word bold 700
- **Accent:** `#7b3b5e` (muted plum) — links
- **Muted:** `#9a9590` (warm gray) — dates, expand toggles
- **Layout:** Single column (760px), massive serif headline hero (96px), spare whitespace, hairline warm separators between experience groups. No timeline dots, no decoration.
- **Signature:** First word of headline is bold. Em-dash separators. Strengths list with en-dash prefix.
- **Border:** `#ddd7cf` (warm separator)

### 11 — CORAL (Warm Maker-Culture Zine)
- **Mood:** Bold, warm, zine-energy personal site. One color dominates. Maker culture, not corporate.
- **Display:** Playfair Display 900 (Google Fonts) — bold serif hero in coral
- **Body:** Source Serif 4 (Google Fonts) — warm editorial serif
- **Nav/Meta:** Source Sans 3 (Google Fonts)
- **Background:** `#ff6b4a` (coral) on html, `#fff` on body column
- **Text:** `#1a1a1a` (ink), `#333` (body), `#555` (secondary)
- **Accent:** `#ff6b4a` (coral) — hero name, nav site name, bullet markers, hover states
- **Link:** `#c0402a` (darker coral) — readable on white
- **Muted:** `#999` (dates, footer), `#666` (headline)
- **Layout:** Centered white column (640px max-width) on coral background with subtle shadow. Single column, serif body, bold serif headings.
- **Signature:** Coral background bleeds on sides. Hero name is 52px bold coral serif. Em-dash prefixes on strengths list in coral. No timeline dots.
- **Border:** `#e8e0da` (warm separator), `#f0ebe6` (entry dividers)

### 12 — VOID (Hacker-Minimal)
- **Mood:** Near-black void, monospace throughout, one subtle radial glow. "Builder not designer" energy. Dark and atmospheric.
- **Display/Body:** JetBrains Mono (Google Fonts)
- **Background:** `#050505` (near-black) with subtle CSS `radial-gradient` glow (faint cyan/green, `rgba(0,210,180,0.045)`)
- **Text:** `#888` (muted gray)
- **Name:** `#ccc` (slightly brighter)
- **Accent:** None explicit — links are `#999` with `#333` underlines, hover to `#ccc`
- **Muted:** `#444`-`#555` (dates, nav inactive, section headings)
- **Layout:** Single column (620px), sparse link list, generous vertical padding (80px top). No decoration, no timeline, no pills. Experience entries separated by hairline dark borders.
- **Signature:** Lowercase section headings with letter-spacing. Dash-prefix bullet lists. Radial glow fixed behind content.
- **Border:** `#1a1a1a` (near-invisible dark separator)
- **Print:** Inverts to white background with dark text, hides nav/footer

### 13 — ALMANAC (Table of Contents / Archival)
- **Mood:** A book's table of contents. Quiet, archival, confident. The kind of portfolio a rare-books librarian would admire.
- **Display:** Playfair Display SC (Google Fonts) -- small caps, weight 900, 56px
- **Body:** EB Garamond (Google Fonts) -- elegant serif, 16px
- **Background:** `#f4f0e8` (warm parchment)
- **Text:** `#2a2520` (dark warm brown)
- **Muted:** `#6b6054` (medium brown, subtitle/numerals), `#8a7f71` (dates/footer)
- **Accent:** None -- monochromatic. Color comes from typography weight and style.
- **Leaders/borders:** `#c4b9a8` (dotted leaders), `#d6cfc2` (section/entry borders, all dotted)
- **Layout:** Centered name at top (ornate small caps), italic subtitle, almanac-style navigation with dotted leaders and Roman numerals (I, II, III, IV). Content below in single column (620px).
- **Signature:** Dotted leaders between nav labels and Roman numeral page numbers. Dotted section borders, dotted entry separators -- the entire visual language is built on dots. Section headings in Playfair Display SC uppercase with dotted underline.
- **Border:** `#d6cfc2` (dotted throughout)

### — DUSK (Warm Solarized)
- **Mood:** Warm, technically confident. Cream paper, dark brown ink, copper accents.
- **Display:** Unbounded 800 (Google Fonts) -- geometric display, 36px hero
- **Body:** Geist / system sans-serif (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Code/Meta:** JetBrains Mono (Google Fonts) -- section labels, dates, location
- **Background:** `#fdf6e3` (warm cream)
- **Text:** `#3b2010` (dark brown), `#5c4a3a` (body secondary)
- **Accent:** `#d16d3e` (copper/rust) -- timeline dots, active nav, hero metric badges
- **Links:** `#268bd2` (bright blue)
- **Section labels:** `#77934d` (sage green) -- monospace, uppercase, 11px
- **Muted:** `#a08060` (warm tan) -- dates, footer, location, details toggle
- **Layout:** Two-column CSS grid (100px label | 1fr content) with border-top dividers. Timeline with vertical 2px line + copper dot markers. Hero with Unbounded name, system sans headline, monospace location + contact links.
- **Signature:** Section labels in sage green JetBrains Mono on the left column. Copper timeline dots. En-dash date spans. "more/less" toggle in monospace.
- **Border:** `#e0d5c1` (warm separator), `#efe6d5` (lighter entry dividers)
- **Density:** Comfortable
- **Print:** Hides nav/footer, grid narrows to 80px label column

### — EMBER (Blog-Forward Hot Pink)
- **Mood:** Bold, instantly recognizable, blog-forward pink aesthetic
- **Display:** Montserrat Black (weight 900, Google Fonts)
- **Body:** Merriweather (Google Fonts)
- **UI/Nav:** System sans-serif (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Background:** `#fff` (pristine white)
- **Text:** `#222` (ink)
- **Accent:** `#d23669` (hot pink) — headlines, links, active nav
- **Dark mode:** `--bg: rgb(40,44,53)`, `--text: rgba(255,255,255,0.88)`, `--link: #ffa7c4`
- **Layout:** 672px centered single column, blog-style entries with hot pink Montserrat headlines, gray sans-serif dates, serif body text. Generous vertical spacing (48px between sections).
- **Experience:** Company names in hot pink Montserrat Black, bold role title + date on same line, sub-roles separated by thin gray borders
- **Border:** `#eee` (minimal)
- **Density:** Comfortable

### — SLATE (Dark Developer Portfolio)
- **Mood:** THE canonical engineer portfolio. Dark, focused, confident.
- **Display/Body:** Inter (Google Fonts) -- 400/500/600/700
- **Background:** `#0f172a` (dark slate)
- **Text:** `#94a3b8` (slate gray body), `#e2e8f0` (light gray headings), `#cbd5e1` (medium for headline)
- **Accent:** `#5eead4` (teal) -- hover states, tech tags, link underlines
- **Muted:** `#64748b` (dim slate) -- dates, inactive nav, social links
- **Layout:** Two-column: sticky left sidebar (400px, name 46px bold, headline, tagline, nav with horizontal line indicators, social links at bottom) + scrolling right content. Max-width 1100px.
- **Experience:** Grid cards (140px date column + body). Role as title, company below. Multi-role entries grouped with sub-role borders. Cards highlight on hover with subtle background + teal title shift.
- **Tags:** Rectangular (`border-radius: 3px`), teal text on teal/10% background. No pills.
- **Signature:** Nav links have expanding horizontal lines on hover/active (32px -> 64px). Cards get subtle border + inset shadow on hover. Strengths list items have left border that turns teal on hover.
- **Mobile (<=660px):** Sidebar stacks on top, nav links go horizontal, section labels become sticky headers with frosted glass background, cards go single-column.
- **Border:** `#1e293b` (dark separator for footer, strengths)
- **Print:** White background, dark text, sidebar hidden, section labels shown
- **Density:** Comfortable

### — GRADIENT (Pastel Gradient + Stacked Typography)
- **Mood:** Graphic-design-forward, bold, confident. Massive stacked name in alternating filled/hollow letterforms on a dreamy pastel gradient. The name IS the hero.
- **Display:** Playfair Display (Google Fonts) -- 400 (outline), 900 (filled hero), italic for flourish
- **Body:** Source Sans 3 (Google Fonts) -- 300/400/600
- **Background:** `linear-gradient(155deg, #b4dced, #c2e4f2, #d0ecf7, #e2f2fa, #f2f8fc, #fff)` (pastel blue-to-white, hero only), `#fff` (content)
- **Text:** `#1a1a1a` (ink), `#333` (body), `#555` (secondary)
- **Muted:** `#888`-`#999` (dates, light-outline row, footer)
- **Accent:** None explicit -- monochromatic. Impact comes from type scale contrast.
- **Layout:** Centered 700px column. Hero section with gradient background containing three stacked name rows: outline (`-webkit-text-stroke: 1.2px`, 68px), filled (900 weight, 86px), light-outline (1px stroke `#aaa`, 62px). Clean white content area below with Playfair Display serif headings. Experience groups with hairline separators.
- **Signature:** Three-row stacked name using `-webkit-text-stroke` for hollow/outline letterforms. Dramatic size contrast between filled (largest) and outline rows. Gradient hero only on home page; inner pages are white.
- **Border:** `#e5e5e5` (heading underlines), `#eee` (experience group separators), `#f0f0f0` (sub-entry dividers)
- **Print:** Gradient hidden, text-stroke preserved in black
- **Density:** Comfortable

### — BLUSH (Warm Blush-Cream Editorial)
- **Mood:** Warm, restrained, Italian-typographic. A personal site that feels handmade and unhurried.
- **Display:** Playfair Display (Google Fonts) -- 400/700, italic
- **Body:** Source Serif 4 (Google Fonts) -- 400/600, italic
- **Background:** `#fdf3e7` (warm blush-cream)
- **Text:** `#3d2f1e` (dark warm brown)
- **Body text:** `#4a3a28` (medium warm brown)
- **Muted:** `#6b5744` (nav links, roles), `#8a7560` (dates, footer, details)
- **Accent:** `#FFF7B1` (soft yellow) -- h2 highlight underline, nav active highlight, `::selection`, project metrics. Single accent only.
- **Brighter accent:** `#FFEE50` (reserved)
- **Link underline:** `#c9b99a` (warm gold-tan), darkens on hover to `#3d2f1e`
- **Layout:** Centered single column (640px), generous `rlh` spacing, fluid `clamp()` type from 14px to 18px. No timeline dots, no decoration. Entries separated by warm hairlines.
- **Signature:** CSS `@layer` architecture (reset, base, layout, components, responsive, print). Yellow gradient highlight behind h2 headings and active nav items. Uppercase tracked nav labels. Playfair Display for headings and site name, Source Serif 4 for body.
- **Border:** `#e6d5c3` (warm separator for nav, entries, footer), `#efe3d5` / `#f0e6d8` (lighter for strengths list, sub-entries)
- **Print:** Hides nav/footer, white background, full-width
- **Density:** Comfortable

### -- TACTICAL (Military/Defense Tech)
- **Mood:** Command-and-control briefing. Dark, structured, authoritative.
- **Display:** Barlow Condensed (Google Fonts) -- 600/700, uppercase, letter-spacing 1-3px
- **Body:** Barlow (Google Fonts) -- 400/500/600
- **Data/Mono:** Share Tech Mono (Google Fonts) -- labels, dates, nav, footer
- **Background:** `#0a0a0a` (near-black) with `2px solid #8faa6e` top accent bar
- **Text:** `#d4d4d4` (light gray body), `#e0e0e0`/`#e8e8e8` (headings/hero), `#b0b0b0` (bio)
- **Accent:** `#8faa6e` (muted olive green) -- section headings, role titles, links, active nav, top bar
- **Muted:** `#505050` (meta labels, dates, expand), `#3a3a3a` (comment-style prefixes `//` and `>`)
- **Layout:** 660px centered column. Hero with condensed uppercase name, meta grid (LOCATION / DESIGNATION / COMMS / INTEL), bio below. Military-labeled nav (Home, Missions, Service, Dossier). Section headings prefixed with `//`.
- **Experience:** Company names in bold condensed uppercase, monospace dates right-aligned, role titles in olive green, bullets prefixed with `>` in monospace. Expand/collapse in uppercase mono `[+] EXPAND`.
- **Signature:** `//` prefix on all section headings (code-comment style). Labels like DESIGNATION, COMMS, INTEL for metadata. "Service Record" for experience, "Mission Log" for projects, "Dossier" for about, "Core Capabilities" for strengths, "Secure Channel" for contact.
- **Border:** `#1a1a1a` (dark separator for entries, meta bar, footer)
- **Print:** White background, dark text, green accent bar hidden, separator borders become `#ddd`
- **Density:** Compact

### -- MONO (Single-Page Void Scroll)
- **Mood:** Everything on one page. Near-black void, monospace throughout, one subtle radial glow. Scroll-through portfolio with anchor nav.
- **Display/Body:** JetBrains Mono (Google Fonts)
- **Background:** `#050505` (near-black) with subtle CSS `radial-gradient` glow (faint cyan/green, `rgba(0,210,180,0.045)`)
- **Text:** `#888` (muted gray)
- **Name:** `#ccc` (slightly brighter), 28px bold hero
- **Accent:** None explicit -- links are `#999` with `#333` underlines, hover to `#ccc`
- **Muted:** `#444`-`#555` (dates, nav inactive, section headings)
- **Layout:** Single page (620px), all sections stacked vertically: Hero, About, Experience, Skills, Contact, Footer. Sticky top nav with anchor links (#about, #experience, #skills, #contact). Frosted-glass nav background with backdrop-filter blur.
- **Experience:** Company names in `#aaa` weight 500, monospace dates right-aligned. Multi-role entries grouped with hairline dark sub-entry borders. Dash-prefix bullets. Expand/collapse for long entries.
- **Signature:** Single-page scroll with anchor navigation. Sticky nav with frosted glass effect. Lowercase section headings with letter-spacing. `scroll-behavior: smooth` on html. Skills as comma-separated plain text. No pills.
- **Border:** `#1a1a1a` (near-invisible dark separator)
- **Print:** Inverts to white background with dark text, hides nav/footer
- **Density:** Comfortable

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
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
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
  - Comfortable: Ink, Folio, Statement, Caps, Almanac, Slate
  - Compact: Terminal, Grid, Bare, Tactical
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
| 2026-04-11 | Template 13: ALMANAC (archival/book) | Dotted leaders + Roman numerals nav, Playfair Display SC name, EB Garamond body, parchment bg. Zero color accent -- monochromatic. |
| 2026-04-11 | Template: SLATE (dark developer) | Two-column sticky sidebar layout, dark slate bg, teal accent, Inter font, card hover effects. First dark two-column template. |
| 2026-04-11 | Template: TACTICAL (military/defense tech) | Dark bg, olive-green accent, Barlow Condensed + Share Tech Mono, military terminology (Service Record, Dossier, Mission Log), `//` section prefixes, `>` bullet prefixes, top accent bar. |
