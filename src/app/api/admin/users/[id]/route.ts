import { NextResponse } from "next/server";

import { validatePasswordStrength } from "@/server/auth";
import { errorResponse } from "@/server/responses";
import { clearSessionCookie, requireAdmin } from "@/server/session";
import { deleteUser, setUserPassword } from "@/server/users";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/** Changes an administrator's password. Requires an existing session. */
export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const password = String(body?.password || "");

    const passwordError = validatePasswordStrength(password);
    if (passwordError) return NextResponse.json({ message: passwordError }, { status: 400 });

    if (!(await setUserPassword(id, password))) {
      return NextResponse.json({ message: "Unknown administrator." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error, "Failed to update the password.");
  }
}

/** Deletes an administrator. The last remaining account cannot be removed. */
export async function DELETE(_request: Request, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const result = await deleteUser(id);

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    // Deleting your own account ends your session immediately.
    const response = NextResponse.json({ ok: true });
    return id === auth.id ? clearSessionCookie(response) : response;
  } catch (error) {
    return errorResponse(error, "Failed to delete the administrator.");
  }
}
