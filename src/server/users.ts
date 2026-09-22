import "server-only";

import type { AdminUser } from "@/types/admin";

import { hashPassword, isLegacyHash, verifyPassword } from "./auth";
import { getDb, newRowId, nowIso } from "./db";

/**
 * Administrator accounts, stored in the D1 table `admin_users`.
 *
 * Accounts are created with the `yarn admin:create` script or from the Users tab
 * of the admin panel — never from environment variables.
 */

interface AdminUserRow {
  id: string;
  username: string;
  name: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

/** Usernames are stored and compared lowercase. */
function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

/** Strips the password hash before a record leaves the server. */
function toPublicUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    username: row.username,
    name: row.name,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at ?? undefined,
  };
}

/** Rejects usernames that would be awkward or ambiguous to log in with. */
export function validateUsername(username: string): string | null {
  const normalized = normalizeUsername(username);
  if (normalized.length < 3) return "Username must be at least 3 characters long.";
  if (!/^[a-z0-9._-]+$/.test(normalized)) {
    return "Username may only contain letters, numbers, dots, underscores and hyphens.";
  }
  return null;
}

async function findRowByUsername(username: string): Promise<AdminUserRow | null> {
  const db = await getDb();
  return db
    .prepare("SELECT * FROM admin_users WHERE username = ?")
    .bind(normalizeUsername(username))
    .first<AdminUserRow>();
}

/** Number of administrator accounts that exist. */
export async function countUsers(): Promise<number> {
  const db = await getDb();
  const row = await db.prepare("SELECT COUNT(*) AS total FROM admin_users").first<{ total: number }>();
  return row?.total ?? 0;
}

/** All administrator accounts, newest last. */
export async function listUsers(): Promise<AdminUser[]> {
  const db = await getDb();
  const { results } = await db
    .prepare("SELECT * FROM admin_users ORDER BY created_at ASC")
    .all<AdminUserRow>();

  return results.map(toPublicUser);
}

/** Creates an account. Throws if the username is already taken. */
export async function createUser(input: {
  username: string;
  password: string;
  name?: string;
}): Promise<AdminUser> {
  const username = normalizeUsername(input.username);

  if (await findRowByUsername(username)) {
    throw new Error(`An administrator named "${username}" already exists.`);
  }

  const now = nowIso();
  const row: AdminUserRow = {
    id: newRowId(),
    username,
    name: input.name?.trim() || username,
    password_hash: await hashPassword(input.password),
    created_at: now,
    updated_at: now,
    last_login_at: null,
  };

  const db = await getDb();
  await db
    .prepare(
      `INSERT INTO admin_users (id, username, name, password_hash, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(row.id, row.username, row.name, row.password_hash, row.created_at, row.updated_at)
    .run();

  return toPublicUser(row);
}

/** Replaces an account's password. */
export async function setUserPassword(userId: string, password: string): Promise<boolean> {
  const db = await getDb();
  const result = await db
    .prepare("UPDATE admin_users SET password_hash = ?, updated_at = ? WHERE id = ?")
    .bind(await hashPassword(password), nowIso(), userId)
    .run();

  return (result.meta.changes ?? 0) > 0;
}

/**
 * Deletes an account.
 *
 * Refuses to remove the last remaining administrator, which would lock everyone
 * out of the panel permanently.
 */
export async function deleteUser(userId: string): Promise<{ ok: boolean; message?: string }> {
  if (!userId) return { ok: false, message: "Unknown administrator." };

  if ((await countUsers()) <= 1) {
    return { ok: false, message: "Cannot delete the last administrator account." };
  }

  const db = await getDb();
  const result = await db.prepare("DELETE FROM admin_users WHERE id = ?").bind(userId).run();

  return (result.meta.changes ?? 0) > 0 ? { ok: true } : { ok: false, message: "Unknown administrator." };
}

/**
 * Checks credentials and records the login.
 *
 * Returns `null` for both an unknown username and a wrong password so the
 * response cannot be used to discover which accounts exist.
 */
export async function authenticate(username: string, password: string): Promise<AdminUser | null> {
  const row = await findRowByUsername(username);

  if (!row || !(await verifyPassword(password, row.password_hash))) {
    return null;
  }

  const lastLoginAt = nowIso();
  const db = await getDb();

  // The password is in hand and known good, so this is the only moment a
  // bcrypt account can be moved to PBKDF2 without asking its owner to reset.
  if (isLegacyHash(row.password_hash)) {
    await db
      .prepare("UPDATE admin_users SET password_hash = ?, last_login_at = ?, updated_at = ? WHERE id = ?")
      .bind(await hashPassword(password), lastLoginAt, lastLoginAt, row.id)
      .run();
  } else {
    await db
      .prepare("UPDATE admin_users SET last_login_at = ?, updated_at = ? WHERE id = ?")
      .bind(lastLoginAt, lastLoginAt, row.id)
      .run();
  }

  return toPublicUser({ ...row, last_login_at: lastLoginAt });
}

/** Looks up an account by its login name, for the password-reset script. */
export async function findUserByUsername(username: string): Promise<AdminUser | null> {
  const row = await findRowByUsername(username);
  return row ? toPublicUser(row) : null;
}

/** Looks up an account by id, for validating a session against current state. */
export async function findUserById(userId: string): Promise<AdminUser | null> {
  if (!userId) return null;

  const db = await getDb();
  const row = await db.prepare("SELECT * FROM admin_users WHERE id = ?").bind(userId).first<AdminUserRow>();
  return row ? toPublicUser(row) : null;
}
