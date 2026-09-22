/**
 * Talking to D1 from a plain Node script.
 *
 * The maintenance scripts run outside the Worker, so they reach the database
 * through `wrangler d1 execute` rather than the `DB` binding. `--local` targets
 * the SQLite file under `.wrangler/`; `--remote` targets Cloudflare.
 */

import { spawnSync } from "node:child_process";

export const DATABASE_NAME = "gps";

/** True when the command line asks for the deployed database. */
export function wantsRemote(argv: string[]): boolean {
  return argv.includes("--remote");
}

/** Escapes a value for inline SQL. Everything is stored as text or NULL. */
export function sqlValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : "NULL";
  return `'${value.replace(/'/g, "''")}'`;
}

interface D1Response<Row> {
  results: Row[];
  success: boolean;
}

function runWrangler(args: string[], remote: boolean): string {
  const result = spawnSync(
    "npx",
    ["wrangler", "d1", "execute", DATABASE_NAME, remote ? "--remote" : "--local", ...args, "--json"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );

  if (result.status !== 0) {
    throw new Error(`wrangler d1 execute failed:\n${result.stderr || result.stdout}`);
  }

  return result.stdout;
}

/** Runs one statement and returns its rows. */
export function query<Row = Record<string, unknown>>(sql: string, remote: boolean): Row[] {
  const stdout = runWrangler(["--command", sql], remote);

  // Wrangler prints a banner before the JSON payload.
  const start = stdout.indexOf("[");
  if (start === -1) return [];

  try {
    const payload = JSON.parse(stdout.slice(start)) as D1Response<Row>[];
    return payload.flatMap((entry) => entry.results ?? []);
  } catch {
    return [];
  }
}

/** Runs a statement for its effect. */
export function execute(sql: string, remote: boolean): void {
  runWrangler(["--command", sql], remote);
}

/** Runs every statement in a `.sql` file. */
export function executeFile(path: string, remote: boolean): void {
  runWrangler(["--file", path], remote);
}

/** Where the statements are going, for the script's own output. */
export function targetLabel(remote: boolean): string {
  return remote ? "the deployed Cloudflare database" : "the local development database";
}
