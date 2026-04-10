# Customization Guide

## Profile (config/profile.yml)

This is the single source of truth for your identity. All modes read from here.

Key sections:
- **candidate**: Name, email, phone, location, LinkedIn, portfolio, GitHub
- **target_roles**: Your North Star roles and archetypes
- **narrative**: Your headline, exit story, superpowers, proof points
- **compensation**: Target range, minimum, currency
- **location**: Country, timezone, visa status, on-site availability
- **talent_network**: Founding status, student status, current project (for auto-submit)

## Target Roles (modes/_profile.md)

Your personal customizations go in `modes/_profile.md` (never auto-updated). This file overrides system defaults in `_shared.md`.

The archetype table determines how offers are scored and CVs are framed. Edit to match YOUR career targets:

```markdown
| Archetype | Thematic axes | What they buy |
|-----------|---------------|---------------|
| **Your Role 1** | key skills | what they need |
| **Your Role 2** | key skills | what they need |
```

Also update the "Adaptive Framing" table to map YOUR specific projects to each archetype.

## Portals (portals.yml)

Copy from `templates/portals.example.yml` and customize:

1. **title_filter.positive**: Keywords matching your target roles
2. **title_filter.negative**: Tech stacks or domains to exclude
3. **search_queries**: WebSearch queries for startup job boards
4. **tracked_companies**: Organized by VC tier:
   - `tier: a16z` — a16z portfolio companies (warm intros available)
   - `tier: speedrun` — speedrun network companies
   - `tier: other_vc` — other VC portfolios

### Adding companies

Add entries under `tracked_companies`:

```yaml
  - name: "NewCo"
    careers_url: "https://jobs.lever.co/newco"
    tier: a16z           # or speedrun, other_vc
    enabled: true
```

### Refreshing the company list

Run the scraper to pull the latest companies from a16z's sites:

```bash
npm run scrape -- --source=both
```

This outputs `portcos.yml` which you can merge into your `portals.yml`.

## CV Template (templates/cv-template.html)

The HTML template uses these design tokens:
- **Fonts**: Space Grotesk (headings) + DM Sans (body) — self-hosted in `fonts/`
- **Colors**: Cyan primary (`hsl(187,74%,32%)`) + Purple accent (`hsl(270,70%,45%)`)
- **Layout**: Single-column, ATS-optimized

To customize fonts/colors, edit the CSS in the template. Update font files in `fonts/` if switching fonts.

## Portfolio Site

The portfolio generator (`generate-portfolio.mjs`) creates a static HTML site from your data. Customize:

- **Theme**: `--theme=dark` or `--theme=light`
- **Design**: Edit the CSS custom properties in the generated HTML, or modify `generate-portfolio.mjs` directly
- **Sections**: The generator includes Hero, About, Experience, Projects, Skills, Education, Contact. Sections are omitted if the source data is missing.

## Negotiation Scripts (modes/_profile.md)

The negotiation section provides frameworks for salary discussions. Store your customizations in `modes/_profile.md`:
- Target ranges
- Geographic arbitrage strategy
- Pushback responses

## Hooks (Optional)

The system can integrate with external tools via Claude Code hooks. Example:

```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "node track-signals.mjs --check"
      }]
    }]
  }
}
```

Save hooks in `.claude/settings.json`.

## States (templates/states.yml)

The canonical states rarely need changing. If you add new states, update:
1. `templates/states.yml`
2. `normalize-statuses.mjs` (alias mappings)
3. `modes/_shared.md` (any references)
