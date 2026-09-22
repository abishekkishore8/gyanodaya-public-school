-- Cloudflare D1 schema for gyanodaya-public-school.
--
-- Apply locally:  npx wrangler d1 execute gps-school-db --local  --file=./schema.sql
-- Apply remotely: npx wrangler d1 execute gps-school-db --remote --file=./schema.sql
--
-- Everything here is idempotent, so it is safe to run again after an edit.

-- The single editable site document, stored as JSON under the key 'main'.
-- Keeping it as one row preserves the read-once / write-whole-document model
-- the client already uses.
CREATE TABLE IF NOT EXISTS site_content (
  key        TEXT PRIMARY KEY,
  data       TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Administrator accounts. Created by `yarn admin:create` or the Users tab,
-- never from environment variables.
CREATE TABLE IF NOT EXISTS admin_users (
  id            TEXT PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL,
  last_login_at TEXT
);

-- Enquiries from the public online forms. Personal data: admin reads only.
CREATE TABLE IF NOT EXISTS form_submissions (
  reference    TEXT PRIMARY KEY,
  type         TEXT NOT NULL,
  title        TEXT NOT NULL,
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  email        TEXT,
  submitted_at TEXT NOT NULL,
  status       TEXT NOT NULL,
  details      TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at
  ON form_submissions (submitted_at DESC);

-- Applications against published vacancies, including the CV link in R2.
CREATE TABLE IF NOT EXISTS job_applications (
  id            TEXT PRIMARY KEY,
  job_id        TEXT NOT NULL,
  job_title     TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL,
  experience    TEXT NOT NULL,
  qualification TEXT NOT NULL,
  notes         TEXT,
  cv_url        TEXT,
  cv_key        TEXT,
  cv_file_name  TEXT,
  submitted_at  TEXT NOT NULL,
  status        TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_job_applications_submitted_at
  ON job_applications (submitted_at DESC);

-- Fixed-window rate limiting for the public endpoints. D1 has no TTL, so
-- expired rows are swept opportunistically by `checkRateLimit`.
CREATE TABLE IF NOT EXISTS rate_limits (
  key        TEXT PRIMARY KEY,
  count      INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_expires_at
  ON rate_limits (expires_at);
