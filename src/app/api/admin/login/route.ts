import { NextResponse } from "next/server";

import { checkRateLimit, clientIdentifier, tooManyRequests } from "@/server/rate-limit";
import { errorResponse } from "@/server/responses";
import { attachSessionCookie } from "@/server/session";
import { authenticate, countUsers } from "@/server/users";

export const dynamic = "force-dynamic";

/**
 * Signs an administrator in and sets an httpOnly session cookie.
 *
 * Accounts live in the `admin_users` collection; create the first one with
 * `yarn admin:create`. Attempts are rate limited per client to slow down
 * password guessing.
 */
export async function POST(request: Request) {
  const limit = await checkRateLimit("admin-login", clientIdentifier(request), 10, 15 * 60 * 1000);
  if (!limit.allowed) {
    return tooManyRequests(limit.retryAfter, "Too many sign-in attempts. Please wait and try again.");
  }

  try {
    const body = await request.json().catch(() => ({}));
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");

    if (!username || !password) {
      return NextResponse.json({ message: "Enter a username and password." }, { status: 400 });
    }

    const user = await authenticate(username, password);

    if (!user) {
      // Point the very first operator at the setup script rather than leaving
      // them guessing why no password works.
      if ((await countUsers()) === 0) {
        return NextResponse.json(
          { message: "No administrator accounts exist yet. Run `yarn admin:create` to create one." },
          { status: 401 },
        );
      }

      return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
    }

    return await attachSessionCookie(NextResponse.json({ user }), user);
  } catch (error) {
    return errorResponse(error, "Sign-in failed.");
  }
}
