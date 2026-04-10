---
name: speedrun
description: AI job search for startup talent -- evaluate offers, generate CVs, scan portals, build portfolio, join the talent network
user_invocable: true
args: mode
argument-hint: "[scan | evaluate | compare | outreach | deep | pdf | apply | batch | tracker | pipeline | training | project | interview-prep | portfolio | talent-network | patterns]"
---

# speedrun -- Router

## MANDATORY: Onboarding Gate

**Before routing to ANY mode, check if the user is set up.**

Run these checks silently:
1. Does `config/profile.yml` exist? (NOT just `config/profile.example.yml`)
2. Does `cv.md` exist?
3. If `config/profile.yml` exists, does it still contain the example placeholder `full_name: "Jane Smith"` or `email: "jane@example.com"`?

**If ANY check fails, STOP. Do NOT proceed to the requested mode.** Instead, enter `onboarding` mode:

> "Before we can do anything, I need to get to know you. Let's set up your profile — it'll take about 5 minutes."

Then follow the onboarding flow in CLAUDE.md. **Only after onboarding is complete** should you route to the originally requested mode.

This applies to EVERY mode including `portfolio`, `scan`, `discovery`, etc. No exceptions.

---

## Mode Routing

After onboarding gate passes, determine the mode from `{{mode}}`:

| Input | Mode |
|-------|------|
| (empty / no args) | `discovery` -- Show command menu |
| JD text or URL (no sub-command) | **`auto-pipeline`** |
| `evaluate` or `oferta` | `oferta` |
| `compare` or `ofertas` | `ofertas` |
| `outreach` or `contacto` | `contacto` |
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
speedrun — Startup Career Command Center

  /speedrun {JD}            Paste a job description or URL to evaluate it
  /speedrun scan            Scan hundreds of startup career pages for new roles
  /speedrun evaluate        Evaluate a single role (A-F scoring)
  /speedrun compare         Compare and rank multiple offers
  /speedrun pdf             Generate an ATS-optimized CV
  /speedrun portfolio       Build and deploy your portfolio site
  /speedrun talent-network  Join the a16z speedrun talent network
  /speedrun outreach        LinkedIn: find contacts + draft message
  /speedrun deep            Deep company research
  /speedrun apply           Live application assistant
  /speedrun tracker         Application status overview
  /speedrun batch           Batch processing with parallel workers
  /speedrun patterns        Analyze rejection patterns
  /speedrun training        Evaluate a course/cert
  /speedrun project         Evaluate a portfolio project idea

Or paste a job URL directly to run the full pipeline.
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
