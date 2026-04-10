# Speedrun Career Ops

**AI-powered job search for startup talent — built by the a16z speedrun team.**

Find, evaluate, and land roles at hundreds of high-growth startups across the venture ecosystem. Powered by Claude Code.

---

## What is this?

An AI job search pipeline that turns Claude Code into your personal career command center. Instead of tracking applications in a spreadsheet, you get an intelligent system that:

- **Scans** hundreds of startup career pages (a16z portfolio, Sequoia, Founders Fund, and more)
- **Evaluates** every role with A-F scoring across 10 weighted dimensions
- **Generates** ATS-optimized CVs tailored to each specific job
- **Builds** a personal portfolio site deployed to GitHub Pages
- **Connects** you directly to hiring teams via the a16z speedrun talent network
- **Tracks** your full pipeline in a git-friendly markdown tracker

> **This is NOT for spamming companies.** This is a quality filter — it helps you find the few roles that deserve your time among hundreds. The system strongly discourages applying to anything below 4.0/5.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/a16z/speedrun-career-ops.git
cd speedrun-career-ops

# Install dependencies
npm install

# Start Claude Code and run the onboarding
claude
# Then type: /speedrun
```

The system will guide you through setup: importing your CV, configuring your profile, and customizing the job scanner for your target roles.

## Commands

| Command | What it does |
|---------|-------------|
| `/speedrun {JD}` | Paste a job description or URL — full auto-pipeline |
| `/speedrun scan` | Scan hundreds of startup career pages for new roles |
| `/speedrun oferta` | Evaluate a single role (A-F scoring) |
| `/speedrun ofertas` | Compare and rank multiple offers |
| `/speedrun pdf` | Generate an ATS-optimized CV |
| `/speedrun portfolio` | Build and deploy your portfolio to GitHub Pages |
| `/speedrun talent-network` | Join the a16z speedrun talent network |
| `/speedrun deep` | Deep company research |
| `/speedrun apply` | Live application assistant |
| `/speedrun tracker` | Application status overview |
| `/speedrun batch` | Parallel batch processing |
| `/speedrun patterns` | Analyze rejection patterns and improve targeting |

## The Talent Network

When you're ready, the system can auto-submit your profile to the a16z speedrun talent network — connecting you directly to hiring teams at hundreds of startups. No forms to fill out. We use the data you've already provided (name, email, LinkedIn, CV, portfolio) and submit on your behalf with one click.

[Join the talent network →](https://bit.ly/joinstartups)

## Portfolio Generation

Build a polished personal portfolio site from your career-ops data and deploy it to GitHub Pages for free:

```
/speedrun portfolio
```

Generates a responsive static site from your `cv.md`, `config/profile.yml`, and `article-digest.md` — deployed to `{username}.github.io/portfolio` in one command.

## Startup-Focused Job Discovery

The portal scanner is pre-configured with hundreds of venture-backed startups organized by portfolio:

- **a16z portfolio** — primary scan target
- **Speedrun network** — companies that hire through the talent network
- **Other top VC portfolios** — Sequoia, Founders Fund, Benchmark, and more

a16z portfolio companies are badged in evaluation reports with warm intro availability.

## Dashboard

A terminal UI for managing your pipeline:

```bash
cd dashboard && go run main.go -path ..
```

## Based on Career-Ops

This project is a fork of the open-source [career-ops](https://github.com/santifer/career-ops) system. We've adapted it for the venture/startup ecosystem and integrated it with the a16z speedrun talent network.

## License

MIT — see [LICENSE](LICENSE)
