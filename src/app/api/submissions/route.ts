import { NextResponse } from "next/server";

import { checkRateLimit, clientIdentifier, tooManyRequests } from "@/server/rate-limit";
import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";
import { createSubmission, listSubmissions } from "@/server/submissions";

export const dynamic = "force-dynamic";

/** Lists every enquiry. Admin only — these records carry personal data. */
export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    return NextResponse.json({ submissions: await listSubmissions() });
  } catch (error) {
    return errorResponse(error, "Failed to load submissions.");
  }
}

/**
 * Records an enquiry from one of the public online forms.
 *
 * Public by necessity: the people filling these in are not signed in. The
 * payload is validated and truncated server-side, the status is always forced
 * to "Pending" regardless of what was sent, and the endpoint is rate limited.
 */
export async function POST(request: Request) {
  const limit = await checkRateLimit("submissions", clientIdentifier(request), 10, 10 * 60 * 1000);
  if (!limit.allowed) {
    return tooManyRequests(limit.retryAfter, "Too many enquiries sent. Please try again shortly.");
  }

  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ submission: await createSubmission(body) }, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Could not record your enquiry.", 400);
  }
}
