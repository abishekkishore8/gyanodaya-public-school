/**
 * Copies the MongoDB data into Cloudflare D1.
 *
 *   yarn db:migrate-from-mongo            # into the local development database
 *   yarn db:migrate-from-mongo --remote   # into the deployed Cloudflare database
 *
 * Reads `MONGODB_URI` from `.env`. Every statement is an upsert keyed by the
 * record's identifier, so running this twice is safe: the second run overwrites
 * what the first one wrote rather than duplicating it.
 *
 * Administrator passwords come across as-is. They are bcrypt hashes, which the
 * Worker can still verify but which cost far more CPU than PBKDF2 — each
 * account is re-hashed automatically the next time its owner signs in.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { argv } from "node:process";

try {
  process.loadEnvFile(".env");
} catch {
  // No .env file — rely on variables already present in the environment.
}

const { MongoClient } = await import("mongodb");
const { executeFile, sqlValue, targetLabel, wantsRemote } = await import("./lib/d1");

const remote = wantsRemote(argv);
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not set, so there is nothing to migrate from.");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB_NAME || "gps_school_website");

const statements: string[] = [];
const counts: Record<string, number> = {};

/** ISO string from whatever Mongo stored — Date, string, or nothing. */
function iso(value: unknown, fallback = new Date().toISOString()): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) return new Date(value).toISOString();
  return fallback;
}

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

// ------------------------------------------------------------- site content --

const siteDoc = (await db.collection("site_content").findOne({ key: "main" })) as
  | (Record<string, unknown> & { _id?: unknown; key?: string })
  | null;

if (siteDoc) {
  const { _id, key, createdAt, updatedAt, ...content } = siteDoc;
  void _id;
  void key;

  statements.push(
    `INSERT INTO site_content (key, data, created_at, updated_at) VALUES ('main', ${sqlValue(
      JSON.stringify(content),
    )}, ${sqlValue(iso(createdAt))}, ${sqlValue(iso(updatedAt))})
     ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at;`,
  );
  counts.site_content = 1;
}

// --------------------------------------------------------------- admin users --

const users = await db.collection("admin_users").find({}).toArray();

for (const user of users) {
  statements.push(
    `INSERT INTO admin_users (id, username, name, password_hash, created_at, updated_at, last_login_at)
     VALUES (${sqlValue(String(user._id))}, ${sqlValue(text(user.username))}, ${sqlValue(
       text(user.name, text(user.username)),
     )}, ${sqlValue(text(user.passwordHash))}, ${sqlValue(iso(user.createdAt))}, ${sqlValue(
       iso(user.updatedAt),
     )}, ${user.lastLoginAt ? sqlValue(iso(user.lastLoginAt)) : "NULL"})
     ON CONFLICT(id) DO UPDATE SET
       username = excluded.username, name = excluded.name,
       password_hash = excluded.password_hash, updated_at = excluded.updated_at,
       last_login_at = excluded.last_login_at;`,
  );
}
counts.admin_users = users.length;

// ---------------------------------------------------------- form submissions --

const submissions = await db.collection("form_submissions").find({}).toArray();

for (const item of submissions) {
  const reference = text(item.reference) || String(item._id);
  statements.push(
    `INSERT INTO form_submissions (reference, type, title, name, phone, email, submitted_at, status, details)
     VALUES (${sqlValue(reference)}, ${sqlValue(text(item.type, "enquiry"))}, ${sqlValue(
       text(item.title, "Enquiry"),
     )}, ${sqlValue(text(item.name))}, ${sqlValue(text(item.phone))}, ${
      item.email ? sqlValue(text(item.email)) : "NULL"
    }, ${sqlValue(iso(item.submittedAt))}, ${sqlValue(text(item.status, "Pending"))}, ${sqlValue(
      JSON.stringify(item.details ?? {}),
    )})
     ON CONFLICT(reference) DO UPDATE SET status = excluded.status, details = excluded.details;`,
  );
}
counts.form_submissions = submissions.length;

// ---------------------------------------------------------- job applications --

const applications = await db.collection("job_applications").find({}).toArray();

for (const item of applications) {
  statements.push(
    `INSERT INTO job_applications (id, job_id, job_title, full_name, email, phone, experience,
       qualification, notes, cv_url, cv_key, cv_file_name, submitted_at, status)
     VALUES (${sqlValue(String(item._id))}, ${sqlValue(text(item.jobId))}, ${sqlValue(
       text(item.jobTitle, "General application"),
     )}, ${sqlValue(text(item.fullName))}, ${sqlValue(text(item.email))}, ${sqlValue(
       text(item.phone),
     )}, ${sqlValue(text(item.experience))}, ${sqlValue(text(item.qualification))}, ${
      item.notes ? sqlValue(text(item.notes)) : "NULL"
    }, ${item.cvUrl ? sqlValue(text(item.cvUrl)) : "NULL"}, ${
      item.cvKey ? sqlValue(text(item.cvKey)) : "NULL"
    }, ${item.cvFileName ? sqlValue(text(item.cvFileName)) : "NULL"}, ${sqlValue(
      iso(item.submittedAt),
    )}, ${sqlValue(text(item.status, "New"))})
     ON CONFLICT(id) DO UPDATE SET status = excluded.status;`,
  );
}
counts.job_applications = applications.length;

await client.close();

// ----------------------------------------------------------------- execution --

if (statements.length === 0) {
  console.log("Nothing to migrate — MongoDB has no records in the expected collections.");
  process.exit(0);
}

mkdirSync(".wrangler", { recursive: true });
const sqlPath = `.wrangler/migrate-from-mongo.sql`;
writeFileSync(sqlPath, `${statements.join("\n\n")}\n`);

console.log(`Writing ${statements.length} statements to ${targetLabel(remote)}…`);
for (const [table, count] of Object.entries(counts)) {
  console.log(`  ${table.padEnd(18)} ${count}`);
}

executeFile(sqlPath, remote);

console.log("\nDone. Administrator passwords still work; each one is re-hashed on next sign-in.");
