import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { AdminUser } from "@/types/admin";

import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken, verifySessionToken } from "./auth";
import { findUserById } from "./users";

/** Reads the signed session cookie and resolves the account it belongs to. */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const payload = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!payload) return null;

  // Re-check against the database so a deleted account cannot keep using a
  // token that has not expired yet.
  return findUserById(payload.sub);
}

/** Attaches a fresh session cookie to `response`. */
export async function attachSessionCookie(response: NextResponse, user: { id: string; username: string }) {
  response.cookies.set(SESSION_COOKIE, await createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

/** Expires the session cookie on `response`. */
export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

/**
 * Guard for admin-only route handlers.
 *
 * Returns the signed-in account, or a 401 response to return as-is:
 *
 * ```ts
 * const auth = await requireAdmin();
 * if (auth instanceof NextResponse) return auth;
 * ```
 */
export async function requireAdmin(): Promise<AdminUser | NextResponse> {
  const admin = await getCurrentAdmin();
  if (admin) return admin;

  return NextResponse.json({ message: "Administrator sign-in required." }, { status: 401 });
}
