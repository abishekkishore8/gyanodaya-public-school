/**
 * Resets an administrator's password in MongoDB.
 *
 *   yarn admin:password                      # lists accounts, then prompts
 *   yarn admin:password <username>           # prompts for the new password
 *   yarn admin:password <username> <password>
 *
 * Use this when nobody can sign in. With a working session, the Administrators
 * tab of the panel does the same thing without touching a terminal.
 *
 * Passing the password as an argument leaves it in your shell history — prefer
 * the prompt, which does not echo what you type.
 */

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

// Load .env before anything reads process.env (the Next.js runtime does this
// for us, but a standalone script has to do it itself).
try {
  process.loadEnvFile(".env");
} catch {
  // No .env file — rely on variables already present in the environment.
}

const { validatePasswordStrength } = await import("../src/server/auth");
const { findUserByUsername, listUsers, setUserPassword } = await import("../src/server/users");

/** Reads a line, hiding what is typed (for passwords). */
async function askHidden(prompt: string): Promise<string> {
  const rl = createInterface({ input: stdin, output: stdout, terminal: true });

  // `readline` echoes input, so silence the output stream while typing.
  const originalWrite = stdout.write.bind(stdout);
  let muted = false;
  (stdout as NodeJS.WriteStream).write = ((chunk: string | Uint8Array, ...rest: unknown[]) => {
    if (muted) return true;
    return (originalWrite as (c: string | Uint8Array, ...r: unknown[]) => boolean)(chunk, ...rest);
  }) as typeof stdout.write;

  originalWrite(prompt);
  muted = true;
  const answer = await rl.question("");
  muted = false;
  (stdout as NodeJS.WriteStream).write = originalWrite;
  originalWrite("\n");
  rl.close();

  return answer;
}

async function ask(prompt: string): Promise<string> {
  const rl = createInterface({ input: stdin, output: stdout });
  const answer = await rl.question(prompt);
  rl.close();
  return answer;
}

async function main() {
  const [argUsername, argPassword] = process.argv.slice(2);

  const users = await listUsers();
  if (users.length === 0) {
    console.error("\n✖ No administrator accounts exist yet. Run `yarn admin:create` instead.\n");
    process.exit(1);
  }

  if (!argUsername) {
    console.log(`\nAdministrators (${users.length}):`);
    for (const user of users) {
      const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "never signed in";
      console.log(`  · ${user.username}${user.name !== user.username ? ` (${user.name})` : ""} — ${lastLogin}`);
    }
    console.log("");
  }

  const username = argUsername || (await ask("Username to reset: "));
  const user = await findUserByUsername(username);
  if (!user) {
    console.error(`\n✖ No administrator named "${username.trim().toLowerCase()}".\n`);
    process.exit(1);
  }

  let password = argPassword;
  if (!password) {
    password = await askHidden(`New password for "${user.username}" (min 10 chars, letters + numbers): `);
    const confirmation = await askHidden("Confirm password: ");
    if (password !== confirmation) {
      console.error("✖ Passwords do not match.");
      process.exit(1);
    }
  }

  const passwordError = validatePasswordStrength(password);
  if (passwordError) {
    console.error(`✖ ${passwordError}`);
    process.exit(1);
  }

  if (!(await setUserPassword(user.id, password))) {
    console.error("\n✖ Could not update the password — the account may have just been deleted.\n");
    process.exit(1);
  }

  console.log(`\n✓ Password reset for "${user.username}".`);
  console.log("  Existing sessions stay valid until they expire; sign out elsewhere to end them now.");
  console.log("  Sign in at /admin\n");
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(`\n✖ ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  });
