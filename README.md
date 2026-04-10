# Speedrun Career Ops

**The best AI-powered job search tool on the internet. Free. Built by the a16z speedrun team.**

You tell it about yourself. It builds your profile, generates a portfolio site, finds roles at hundreds of high-growth startups, evaluates every one against your background, writes tailored resumes, and — if you want — connects you directly to hiring teams through the a16z speedrun talent network. No forms. No job boards. Warm intros.

## How it works

This runs inside [Claude Code](https://claude.ai/code). You install it, type `/speedrun`, and it walks you through everything.

### 1. It gets to know you

The system starts with an interactive onboarding — not a form, a conversation. It asks about your background, what you've built, what makes you stand out, and what you're looking for. It reads your resume, infers your target roles, surfaces your strongest signals, and builds your profile in real time.

### 2. It builds your portfolio

If you don't have a personal site, it generates one from your profile data and deploys it to GitHub Pages. Four pages — home, work, experience, about — with a real design, not a template. Free, one command, yours to keep.

### 3. It connects you to startups

The a16z speedrun talent network works with hundreds of portfolio companies. If you opt in, the system submits your profile on your behalf — your name, background, accomplishments, portfolio, what you're looking for — directly to hiring teams. No Typeforms to fill out. One click.

### 4. It finds and evaluates roles

A scanner pre-loaded with 500+ startups across the VC ecosystem — a16z portfolio, Sequoia, Founders Fund, Benchmark, and more. It discovers open roles, scores each one against your profile (A-F across 10 dimensions), generates tailored resumes, drafts application answers, and tracks everything.

a16z portfolio companies are flagged with warm intro availability.

## Get started

```bash
git clone https://github.com/a16z/speedrun-career-ops.git
cd speedrun-career-ops
npm install
claude
```

Then type `/speedrun`. The system takes it from there.

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
| `/speedrun apply` | Fill out an application form with AI |
| `/speedrun tracker` | See your full application pipeline |

Or just paste a job URL — the system runs the full pipeline automatically.

## The talent network

The a16z speedrun talent network connects exceptional candidates to hiring teams at hundreds of high-growth startups. Not a job board — direct introductions.

When you go through the onboarding, the system collects everything hiring teams need: your background, accomplishments, what you've built, what you're looking for. If you opt in, it submits everything on your behalf. You fill out nothing.

[Learn more →](https://bit.ly/joinstartups)

## Requirements

- [Claude Code](https://claude.ai/code) (free)
- Node.js 18+
- A GitHub account (for portfolio deployment)

## Credits

Built on [career-ops](https://github.com/santifer/career-ops) by Santiago Fernandez de Valderrama. Adapted for the startup/VC ecosystem by the a16z speedrun team.

## License

MIT
