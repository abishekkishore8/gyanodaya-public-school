/**
 * Resets an administrator's password in D1.
 *
 *   yarn admin:password                                # local database, prompts
 *   yarn admin:password --remote                       # deployed database, prompts
 *   yarn admin:password <username> <new password> [--remote]
 *
 * The new password is stored as a PBKDF2 hash, which is what the Worker can
 * verify within its CPU budget — use this once after the move from MongoDB to
 * replace an account's old bcrypt hash.
 */

import { createInterface } from "node:readline/promises";
import { argv, stdin, stdout } from "node:process";

const { hashPbkdf2, validatePasswordStrength } = await import("../src/lib/password");
const { execute, query, sqlValue, targetLabel, wantsRemote } = await import("./lib/d1");

const remote = wantsRemote(argv);
const positional = argv.slice(2).filter((arg) => !arg.startsWith("--"));

const rl = createInterface({ input: stdin, output: stdout });

async function ask(question: string, existing?: string): Promise<string> {
  if (existing) return existing;
  return (await rl.question(question)).trim();
}

try {
  console.log(`Resetting a password in ${targetLabel(remote)}.\n`);

  const accounts = query<{ id: string; username: string }>(
    "SELECT id, username FROM admin_users ORDER BY username",
    remote,
  );

  if (accounts.length === 0) {
    throw new Error("There are no administrator accounts yet. Run `yarn admin:create` first.");
  }

  console.log(`Accounts: ${accounts.map((row) => row.username).join(", ")}\n`);

  const username = (await ask("Username: ", positional[0])).toLowerCase();
  const account = accounts.find((row) => row.username === username);
  if (!account) throw new Error(`No administrator named "${username}".`);

  const password = await ask("New password: ", positional[1]);
  const passwordError = validatePasswordStrength(password);
  if (passwordError) throw new Error(passwordError);

  execute(
    `UPDATE admin_users
     SET password_hash = ${sqlValue(await hashPbkdf2(password))},
         updated_at = ${sqlValue(new Date().toISOString())}
     WHERE id = ${sqlValue(account.id)}`,
    remote,
  );

  console.log(`\n✅ Password updated for "${username}".`);
} catch (error) {
  console.error(`\n❌ ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
} finally {
  rl.close();
}
