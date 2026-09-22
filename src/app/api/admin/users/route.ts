import { NextResponse } from "next/server";

import { validatePasswordStrength } from "@/server/auth";
import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";
import { createUser, listUsers, validateUsername } from "@/server/users";

export const dynamic = "force-dynamic";

/** Lists administrator accounts. Requires an existing session. */
export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    return NextResponse.json({ users: await listUsers() });
  } catch (error) {
    return errorResponse(error, "Failed to load administrators.");
  }
}

/** Creates an administrator account. Requires an existing session. */
export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const username = String(body?.username || "");
    const password = String(body?.password || "");
    const name = String(body?.name || "");

    const usernameError = validateUsername(username);
    if (usernameError) return NextResponse.json({ message: usernameError }, { status: 400 });

    const passwordError = validatePasswordStrength(password);
    if (passwordError) return NextResponse.json({ message: passwordError }, { status: 400 });

    return NextResponse.json({ user: await createUser({ username, password, name }) }, { status: 201 });
  } catch (error) {
    // A duplicate username is the caller's mistake, not a server fault.
    const message = error instanceof Error ? error.message : "Failed to create administrator.";
    const status = message.includes("already exists") ? 409 : 500;
    return NextResponse.json({ message }, { status });
  }
}
