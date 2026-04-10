---
name: speedrun
description: AI job search for startup talent -- evaluate offers, generate CVs, scan portals, build portfolio, join the talent network
user_invocable: true
args: mode
argument-hint: "[scan | deep | pdf | oferta | ofertas | apply | batch | tracker | pipeline | contacto | training | project | interview-prep | portfolio | talent-network | patterns | update]"
---

# speedrun -- Router

## Mode Routing

Determine the mode from `{{mode}}`:

| Input | Mode |
|-------|------|
| (empty / no args) | `discovery` -- Show command menu |
| JD text or URL (no sub-command) | **`auto-pipeline`** |
| `oferta` | `oferta` |
| `ofertas` | `ofertas` |
| `contacto` | `contacto` |
| `deep` | `deep` |
| `pdf` | `pdf` |
| `training` | `training` |
| `project` | `project` |
| `tracker` | `tracker` |
| `pipeline` | `pipeline` |
| `apply` | `apply` |
| `scan` | `scan` |
| `batch` | `batch` |
| `patterns` | `patterns` |
| `portfolio` | `portfolio` |
| `talent-network` | `talent-network` |

**Auto-pipeline detection:** If `{{mode}}` is not a known sub-command AND contains JD text (keywords: "responsibilities", "requirements", "qualifications", "about the role", "we're looking for", company name + role) or a URL to a JD, execute `auto-pipeline`.

If `{{mode}}` is not a sub-command AND doesn't look like a JD, show discovery.

---

## Discovery Mode (no arguments)

Show this menu:

```
speedrun -- Startup Career Command Center

Available commands:
  /speedrun {JD}            → AUTO-PIPELINE: evaluate + report + PDF + tracker (paste text or URL)
  /speedrun pipeline        → Process pending URLs from inbox (data/pipeline.md)
  /speedrun oferta          → Evaluation only A-F (no auto PDF)
  /speedrun ofertas         → Compare and rank multiple offers
  /speedrun contacto        → LinkedIn power move: find contacts + draft message
  /speedrun deep            → Deep research prompt about company
  /speedrun pdf             → PDF only, ATS-optimized CV
  /speedrun training        → Evaluate course/cert against North Star
  /speedrun project         → Evaluate portfolio project idea
  /speedrun tracker         → Application status overview
  /speedrun apply           → Live application assistant (reads form + generates answers)
  /speedrun scan            → Scan hundreds of startup career pages
  /speedrun batch           → Batch processing with parallel workers
  /speedrun patterns        → Analyze rejection patterns and improve targeting
  /speedrun portfolio       → Generate & deploy your portfolio site (GitHub Pages)
  /speedrun talent-network  → Join the a16z speedrun talent network

Inbox: add URLs to data/pipeline.md → /speedrun pipeline
Or paste a JD directly to run the full pipeline.
```

---

## Context Loading by Mode

After determining the mode, load the necessary files before executing:

### Modes that require `_shared.md` + their mode file:
Read `modes/_shared.md` + `modes/{mode}.md`

Applies to: `auto-pipeline`, `oferta`, `ofertas`, `pdf`, `contacto`, `apply`, `pipeline`, `scan`, `batch`

### Standalone modes (only their mode file):
Read `modes/{mode}.md`

Applies to: `tracker`, `deep`, `training`, `project`, `patterns`, `portfolio`, `talent-network`

### Modes delegated to subagent:
For `scan`, `apply` (with Playwright), and `pipeline` (3+ URLs): launch as Agent with the content of `_shared.md` + `modes/{mode}.md` injected into the subagent prompt.

```
Agent(
  subagent_type="general-purpose",
  prompt="[content of modes/_shared.md]\n\n[content of modes/{mode}.md]\n\n[invocation-specific data]",
  description="speedrun {mode}"
)
```

Execute the instructions from the loaded mode file.
