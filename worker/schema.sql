-- Followup data from talent network submissions
-- Mirrors Typeform 2 fields + metadata for later migration to Postgres
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  name TEXT,
  linkedin TEXT,
  accomplishments TEXT,
  current_project TEXT,
  polarity TEXT,
  work_links TEXT,
  craft TEXT,
  continent TEXT,
  location TEXT,
  title TEXT,
  company TEXT,
  considering_founding BOOLEAN DEFAULT FALSE,
  is_student BOOLEAN DEFAULT FALSE,
  gem_candidate_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  is_existing BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

-- Expanded candidate signals — rich profile data that Gem doesn't support yet
-- Applied via: wrangler d1 execute speedrun-signals --file=worker/schema.sql
CREATE TABLE IF NOT EXISTS candidate_signals (
  id TEXT PRIMARY KEY,                        -- SHA-256 hash of candidate email
  email TEXT NOT NULL,
  full_name TEXT,
  motivation TEXT,                            -- narrative.motivation
  current_project_detail TEXT,                -- narrative.current_project_detail
  company_rankings TEXT,                      -- JSON stringified preferences.company_rankings
  stage_preference TEXT,                      -- preferences.stage_preference
  deal_breakers TEXT,                         -- JSON stringified preferences.deal_breakers
  work_style TEXT,                            -- preferences.work_style
  template_chosen TEXT,                       -- which portfolio template they picked
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),  -- ISO 8601
  raw_payload TEXT                            -- full JSON for future-proofing
);

CREATE INDEX IF NOT EXISTS idx_candidate_signals_email ON candidate_signals(email);
