import { NextResponse } from "next/server";

import { deleteApplication, setApplicationStatus } from "@/server/applications";
import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/** Updates an application's hiring status. */
export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    if (!(await setApplicationStatus(id, String(body?.status || "")))) {
      return NextResponse.json({ message: "Unknown application or status." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error, "Failed to update the application.");
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;

    if (!(await deleteApplication(id))) {
      return NextResponse.json({ message: "Unknown application." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error, "Failed to delete the application.");
  }
}
