/**
 * Creates an administrator account in D1.
 *
 *   yarn admin:create                                  # local database, prompts
 *   yarn admin:create --remote                         # deployed database, prompts
 *   yarn admin:create <username> <password> [full name] [--remote]
 *
 * This is the only way to create the first account — credentials are never read
 * from environment variables.
 */

import { createInterface } from "node:readline/promises";
import { argv, stdin, stdout } from "node:process";

const { hashPbkdf2, validatePasswordStrength } = await import("../src/lib/password");
const { execute, query, sqlValue, targetLabel, wantsRemote } = await import("./lib/d1");

const remote = wantsRemote(argv);
const positional = argv.slice(2).filter((arg) => !arg.startsWith("--"));

/** Usernames are stored and compared lowercase. */
function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

function validateUsername(username: string): string | null {
  const normalized = normalizeUsername(username);
  if (normalized.length < 3) return "Username must be at least 3 characters long.";
  if (!/^[a-z0-9._-]+$/.test(normalized)) {
    return "Username may only contain letters, numbers, dots, underscores and hyphens.";
  }
  return null;
}

const rl = createInterface({ input: stdin, output: stdout });

async function ask(question: string, existing?: string): Promise<string> {
  if (existing) return existing;
  return (await rl.question(question)).trim();
}

try {
  console.log(`Creating an administrator in ${targetLabel(remote)}.\n`);

  const existing = query<{ username: string }>("SELECT username FROM admin_users", remote);
  if (existing.length > 0) {
    console.log(`Existing accounts: ${existing.map((row) => row.username).join(", ")}\n`);
  }

  const username = normalizeUsername(await ask("Username: ", positional[0]));
  const usernameError = validateUsername(username);
  if (usernameError) throw new Error(usernameError);

  if (existing.some((row) => row.username === username)) {
    throw new Error(`An administrator named "${username}" already exists.`);
  }

  const password = await ask("Password: ", positional[1]);
  const passwordError = validatePasswordStrength(password);
  if (passwordError) throw new Error(passwordError);

  const name = (await ask(`Full name [${username}]: `, positional[2])) || username;

  const now = new Date().toISOString();
  execute(
    `INSERT INTO admin_users (id, username, name, password_hash, created_at, updated_at)
     VALUES (${sqlValue(crypto.randomUUID())}, ${sqlValue(username)}, ${sqlValue(name)}, ${sqlValue(
       await hashPbkdf2(password),
     )}, ${sqlValue(now)}, ${sqlValue(now)})`,
    remote,
  );

  console.log(`\n✅ Administrator "${username}" created. Sign in at /admin/login.`);
} catch (error) {
  console.error(`\n❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
} finally {
  rl.close();
}
