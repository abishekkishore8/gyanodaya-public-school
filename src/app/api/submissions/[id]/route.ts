import { NextResponse } from "next/server";

import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";
import { deleteSubmission, setSubmissionStatus } from "@/server/submissions";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/** Updates an enquiry's review status. */
export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    if (!(await setSubmissionStatus(id, String(body?.status || "")))) {
      return NextResponse.json({ message: "Unknown submission or status." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error, "Failed to update the submission.");
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;

    if (!(await deleteSubmission(id))) {
      return NextResponse.json({ message: "Unknown submission." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error, "Failed to delete the submission.");
  }
}
