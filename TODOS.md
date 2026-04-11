# TODOS

## Supply chain hardening for auto-updater

**What:** Pin updates to signed tags or commit hashes instead of raw `git checkout FETCH_HEAD`.

**Why:** `update-system.mjs` fetches from the canonical GitHub repo and checks out system files (including CLAUDE.md and all .mjs scripts) without signature verification. A compromised main branch would overwrite the AI's instructions and executable code.

**Pros:** Closes the unsigned remote code update channel.

**Cons:** Adds complexity to the update flow. Requires a tag signing workflow.

**Context:** Currently acceptable because Jordan is the sole committer. Becomes critical when the repo moves to an a16z org with multiple contributors or gains significant adoption. The user-layer protection already prevents overwriting candidate data, but the system layer (CLAUDE.md, scripts) IS the attack surface.

**Depends on:** Repo ownership decision (justma16ze vs a16z org).

---

## Geocoding fallback for continent mapping

**What:** Add a free geocoding API call (or broader lookup table) when the hardcoded CONTINENT_MAP in `submit-to-network.mjs` returns null.

**Why:** International candidates with alternate city spellings ("Bengaluru" vs "bangalore"), uncommon cities, or "Remote" as location get null continent values, requiring manual cleanup in Gem.

**Pros:** Better data quality for non-US candidates.

**Cons:** Adds a network dependency to the submission flow.

**Context:** The current 137-entry map covers US cities well (primary audience). The state abbreviation fallback is solid. Revisit when null continent values appear in Gem data from real candidates.

**Depends on:** Real candidate submissions showing the gap.

---

## Document ~/.speedrun-talent/ in README

**What:** Add a "Data Storage" section to README noting that signal data is stored in `~/.speedrun-talent/candidate-signals.jsonl` outside the project directory.

**Why:** Privacy-conscious job seekers should know where their data lives. Uninstalling the project directory (`rm -rf speedrun-career-ops`) leaves orphaned signal files in the home directory with no mention of their existence.

**Pros:** Transparency. Easy cleanup instructions for uninstall.

**Cons:** None.

**Context:** The data is non-sensitive (signal flags like "high_velocity", "builder", "domain_depth"). But undisclosed home directory writes feel wrong for a tool aimed at candidates who may be cautious about their job search activity being tracked.

**Depends on:** Nothing.
