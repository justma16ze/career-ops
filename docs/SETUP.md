# Setup Guide

## Prerequisites

- [Claude Code](https://claude.ai/code) installed and configured
- Node.js 18+ (for PDF generation and utility scripts)
- (Optional) `gh` CLI for portfolio deployment to GitHub Pages
- (Optional) Go 1.21+ for the dashboard TUI

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/a16z/speedrun-career-ops.git
cd speedrun-career-ops
npm install
npx playwright install chromium   # Required for PDF generation + portal scanning
```

### 2. Configure your profile

```bash
cp config/profile.example.yml config/profile.yml
```

Edit `config/profile.yml` with your personal details: name, email, LinkedIn, target roles, narrative, proof points.

### 3. Add your CV

Create `cv.md` in the project root with your full CV in markdown format. This is the source of truth for all evaluations and PDFs.

(Optional) Create `article-digest.md` with proof points from your portfolio projects/articles.

### 4. Configure portals

```bash
cp templates/portals.example.yml portals.yml
```

The default portals config is pre-loaded with hundreds of startup career pages organized by VC portfolio:
- **Tier 1:** a16z portfolio companies
- **Tier 2:** speedrun network companies
- **Tier 3:** other top VC portfolios (Sequoia, Founders Fund, etc.)

Edit `portals.yml` to customize `title_filter.positive` with keywords matching your target roles.

### 5. (Optional) Set up talent network submission

```bash
cp config/secrets.example.yml config/secrets.yml
```

Add your Typeform API token to `config/secrets.yml` to enable auto-submission to the a16z speedrun talent network. Without it, `/speedrun talent-network` will open the form in your browser instead.

### 6. Start using

Open Claude Code in this directory:

```bash
claude
```

Then type `/speedrun` to see all commands, or paste a job URL to run the full evaluation pipeline.

## Commands

| Action | Command |
|--------|---------|
| See all commands | `/speedrun` |
| Evaluate an offer | Paste a URL or JD text |
| Search startup career pages | `/speedrun scan` |
| Process pending URLs | `/speedrun pipeline` |
| Generate ATS-optimized CV | `/speedrun pdf` |
| Build your portfolio site | `/speedrun portfolio` |
| Join the talent network | `/speedrun talent-network` |
| Batch evaluate | `/speedrun batch` |
| Check tracker status | `/speedrun tracker` |
| Fill application form | `/speedrun apply` |
| Analyze rejection patterns | `/speedrun patterns` |

## npm Scripts

| Script | What it does |
|--------|-------------|
| `npm run portfolio` | Generate portfolio HTML |
| `npm run deploy` | Deploy portfolio to GitHub Pages |
| `npm run signals` | Check your talent signal score |
| `npm run join` | Submit to talent network |
| `npm run join:dry` | Preview submission (no actual submit) |
| `npm run scan` | Scan portals for new roles |
| `npm run scrape` | Scrape a16z portfolio company list |
| `npm run doctor` | Verify setup |

## Verify Setup

```bash
npm run doctor              # Full setup validation
node cv-sync-check.mjs      # Check configuration
node verify-pipeline.mjs    # Check pipeline integrity
```

## Build Dashboard (Optional)

```bash
cd dashboard
go build -o speedrun-dashboard .
./speedrun-dashboard --path ..  # Opens TUI pipeline viewer
```
