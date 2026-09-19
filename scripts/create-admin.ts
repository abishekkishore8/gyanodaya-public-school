/**
 * Creates an administrator account in MongoDB.
 *
 *   yarn admin:create                      # prompts for everything
 *   yarn admin:create <username>           # prompts for the password
 *   yarn admin:create <username> <password> [full name]
 *
 * This is the only way to create the first account — credentials are never read
 * from environment variables.
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
const { countUsers, createUser, listUsers, validateUsername } = await import("../src/server/users");

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
  const [argUsername, argPassword, ...nameParts] = process.argv.slice(2);

  const existing = await countUsers();
  if (existing > 0) {
    const users = await listUsers();
    console.log(`\nExisting administrators (${existing}):`);
    for (const user of users) console.log(`  · ${user.username}${user.name !== user.username ? ` (${user.name})` : ""}`);
    console.log("");
  } else {
    console.log("\nNo administrators exist yet — creating the first one.\n");
  }

  const username = argUsername || (await ask("Username: "));
  const usernameError = validateUsername(username);
  if (usernameError) {
    console.error(`✖ ${usernameError}`);
    process.exit(1);
  }

  let password = argPassword;
  if (!password) {
    password = await askHidden("Password (min 10 chars, letters + numbers): ");
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

  const name = nameParts.join(" ").trim();
  const user = await createUser({ username, password, name });

  console.log(`\n✓ Created administrator "${user.username}".`);
  console.log("  Sign in at /admin\n");
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(`\n✖ ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  });
