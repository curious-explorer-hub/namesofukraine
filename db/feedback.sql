-- Messages from the feedback form (functions/api/feedback.ts, decision D19), in the D1 database
-- namesofukraine-feedback. Apply once: npx wrangler d1 execute namesofukraine-feedback --remote --file=db/feedback.sql
-- Contains personal data (emails): never export it into this repository.
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  created TEXT NOT NULL, -- ISO 8601, UTC
  lang TEXT NOT NULL, -- uk | en
  type TEXT NOT NULL, -- src/lib/feedback.ts FEEDBACK_TYPES
  profile TEXT,
  about TEXT,
  message TEXT NOT NULL,
  sources TEXT,
  email TEXT
);
CREATE INDEX IF NOT EXISTS feedback_created ON feedback (created);
