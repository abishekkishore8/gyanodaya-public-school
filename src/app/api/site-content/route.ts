import { NextResponse } from "next/server";

import type { SiteContentDocument } from "@/types/site";

import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";
import { readSiteContent, writeSiteContent } from "@/server/site-content";

/** Always hit the database; this content changes whenever an admin saves. */
export const dynamic = "force-dynamic";

/** Returns the content that drives every section of the public site. */
export async function GET() {
  try {
    return NextResponse.json(await readSiteContent());
  } catch (error) {
    return errorResponse(error, "Failed to load site content.");
  }
}

/**
 * Replaces the site content. Sent by the admin dashboard after every edit.
 * Requires a signed-in administrator.
 */
export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const payload = (await request.json().catch(() => ({}))) as Partial<SiteContentDocument>;
    return NextResponse.json(await writeSiteContent(payload));
  } catch (error) {
    return errorResponse(error, "Failed to save site content.");
  }
}
