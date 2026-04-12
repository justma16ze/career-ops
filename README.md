# Speedrun Career Ops

**The best AI-powered job search tool on the internet. Free. Built by the a16z speedrun team.**

You tell it about yourself. It builds your profile, generates a portfolio site, finds roles at hundreds of high-growth startups, evaluates every one against your background, writes tailored resumes, preps you for interviews, and — if you want — connects you directly to hiring teams through the a16z speedrun talent network. No forms. No job boards. Warm intros.

## How it works

This runs inside [Claude Code](https://claude.ai/code). You install it, type `/speedrun`, and it walks you through everything.

### 1. It gets to know you

Interactive onboarding — not a form, a conversation. It reads your resume, infers your target roles, surfaces your strongest signals, and builds your profile in real time.

### 2. It finds roles for you

A scanner pre-loaded with 500+ startups across the VC ecosystem — a16z portfolio, Sequoia, Founders Fund, Benchmark, and more. It discovers open roles, scores each one against your profile, generates tailored resumes, and tracks everything.

### 3. It preps you for interviews

Full interview prep for any role: company research, round-by-round breakdown, question categories, and STAR stories mapped from your experience. Stories accumulate across evaluations so you get better every time.

### 4. It builds your portfolio

No personal site? It generates one from your profile and deploys it to GitHub Pages. Responsive, polished, yours to keep.

### 5. It connects you to startups

The a16z speedrun talent network works with hundreds of portfolio companies. If you opt in, the system submits your profile on your behalf — directly to hiring teams. One click. You fill out nothing.

### 6. It helps you negotiate

When you get an offer, it evaluates against market data, provides a negotiation strategy, and helps you compare multiple offers side by side.

## Get started

```bash
git clone https://github.com/justma16ze/career-ops.git
cd speedrun-career-ops
npm install
claude
```

Then type `/speedrun`. The system handles everything from there — including installing any tools you need.

## What you can do

| Command | What happens |
|---------|-------------|
| `/speedrun` | Start here — onboarding or command menu |
| `/speedrun scan` | Discover roles at hundreds of startups |
| `/speedrun evaluate` | Score a specific role against your profile |
| `/speedrun portfolio` | Build and deploy your personal site |
| `/speedrun talent-network` | Join the talent network (one click) |
| `/speedrun pdf` | Generate a tailored resume for a role |
| `/speedrun compare` | Rank multiple offers side by side |
| `/speedrun outreach` | Find contacts + draft a LinkedIn message |
| `/speedrun deep` | Deep-dive research on a company |
| `/speedrun interview-prep` | Full interview prep for a specific company |
| `/speedrun apply` | Fill out an application form with AI |
| `/speedrun tracker` | See your full application pipeline |
| `/speedrun patterns` | Analyze rejection patterns and improve targeting |

Or just paste a job URL — the system runs the full pipeline automatically.

## Dashboard

An interactive terminal dashboard for your pipeline. Filter by status, sort by score, preview reports inline, update statuses. Built with [Bubble Tea](https://github.com/charmbracelet/bubbletea).

## The talent network

The a16z speedrun talent network connects exceptional candidates to hiring teams at hundreds of high-growth startups. Not a job board — direct introductions.

[Learn more →](https://bit.ly/joinstartups)

## Requirements

- [Claude Code](https://claude.ai/code)
- Node.js 18+

Everything else is installed automatically.

## Credits

Built on [career-ops](https://github.com/santifer/career-ops) by Santiago Fernandez de Valderrama. Adapted for the startup/VC ecosystem by the a16z speedrun team.

## License

MIT
