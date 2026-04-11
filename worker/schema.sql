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
