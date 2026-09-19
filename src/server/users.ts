import "server-only";

import { ObjectId, type Collection } from "mongodb";

import type { AdminUser } from "@/types/admin";

import { hashPassword, isLegacyHash, verifyPassword } from "./auth";
import { getDb } from "./db";

/**
 * Administrator accounts, stored in the `admin_users` collection.
 *
 * Accounts are created with the `yarn admin:create` script or from the Users tab
 * of the admin panel — never from environment variables.
 */

const COLLECTION = "admin_users";

interface AdminUserRecord {
  _id: ObjectId;
  username: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

async function getCollection(): Promise<Collection<AdminUserRecord>> {
  const db = await getDb();
  const collection = db.collection<AdminUserRecord>(COLLECTION);
  // Usernames are the login identifier, so they must be unique.
  await collection.createIndex({ username: 1 }, { unique: true });
  return collection;
}

/** Usernames are stored and compared lowercase. */
function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

/** Strips the password hash before a record leaves the server. */
function toPublicUser(record: AdminUserRecord): AdminUser {
  return {
    id: record._id.toHexString(),
    username: record.username,
    name: record.name,
    createdAt: record.createdAt.toISOString(),
    lastLoginAt: record.lastLoginAt?.toISOString(),
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

/** Number of administrator accounts that exist. */
export async function countUsers(): Promise<number> {
  const collection = await getCollection();
  return collection.countDocuments();
}

/** All administrator accounts, newest last. */
export async function listUsers(): Promise<AdminUser[]> {
  const collection = await getCollection();
  const records = await collection.find({}).sort({ createdAt: 1 }).toArray();
  return records.map(toPublicUser);
}

/** Creates an account. Throws if the username is already taken. */
export async function createUser(input: {
  username: string;
  password: string;
  name?: string;
}): Promise<AdminUser> {
  const username = normalizeUsername(input.username);
  const collection = await getCollection();

  if (await collection.findOne({ username })) {
    throw new Error(`An administrator named "${username}" already exists.`);
  }

  const now = new Date();
  const record: AdminUserRecord = {
    _id: new ObjectId(),
    username,
    name: input.name?.trim() || username,
    passwordHash: await hashPassword(input.password),
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(record);
  return toPublicUser(record);
}

/** Replaces an account's password. */
export async function setUserPassword(userId: string, password: string): Promise<boolean> {
  if (!ObjectId.isValid(userId)) return false;

  const collection = await getCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { passwordHash: await hashPassword(password), updatedAt: new Date() } },
  );

  return result.matchedCount > 0;
}

/**
 * Deletes an account.
 *
 * Refuses to remove the last remaining administrator, which would lock everyone
 * out of the panel permanently.
 */
export async function deleteUser(userId: string): Promise<{ ok: boolean; message?: string }> {
  if (!ObjectId.isValid(userId)) return { ok: false, message: "Unknown administrator." };

  const collection = await getCollection();
  if ((await collection.countDocuments()) <= 1) {
    return { ok: false, message: "Cannot delete the last administrator account." };
  }

  const result = await collection.deleteOne({ _id: new ObjectId(userId) });
  return result.deletedCount > 0 ? { ok: true } : { ok: false, message: "Unknown administrator." };
}

/**
 * Checks credentials and records the login.
 *
 * Returns `null` for both an unknown username and a wrong password so the
 * response cannot be used to discover which accounts exist.
 */
export async function authenticate(username: string, password: string): Promise<AdminUser | null> {
  const collection = await getCollection();
  const record = await collection.findOne({ username: normalizeUsername(username) });

  if (!record || !(await verifyPassword(password, record.passwordHash))) {
    return null;
  }

  const lastLoginAt = new Date();
  const update: Partial<AdminUserRecord> = { lastLoginAt, updatedAt: lastLoginAt };

  // The password is in hand and known good, so this is the only moment a
  // pre-bcrypt account can be upgraded without asking its owner to reset.
  if (isLegacyHash(record.passwordHash)) {
    update.passwordHash = await hashPassword(password);
  }

  await collection.updateOne({ _id: record._id }, { $set: update });

  return toPublicUser({ ...record, lastLoginAt });
}

/** Looks up an account by its login name, for the password-reset script. */
export async function findUserByUsername(username: string): Promise<AdminUser | null> {
  const collection = await getCollection();
  const record = await collection.findOne({ username: normalizeUsername(username) });
  return record ? toPublicUser(record) : null;
}

/** Looks up an account by id, for validating a session against current state. */
export async function findUserById(userId: string): Promise<AdminUser | null> {
  if (!ObjectId.isValid(userId)) return null;

  const collection = await getCollection();
  const record = await collection.findOne({ _id: new ObjectId(userId) });
  return record ? toPublicUser(record) : null;
}
