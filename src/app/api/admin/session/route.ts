import { NextResponse } from "next/server";

import { getCurrentAdmin } from "@/server/session";

export const dynamic = "force-dynamic";

/** Returns the signed-in administrator, or `null` when there is no session. */
export async function GET() {
  return NextResponse.json({ user: await getCurrentAdmin() });
}
