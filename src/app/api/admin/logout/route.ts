import { NextResponse } from "next/server";

import { clearSessionCookie } from "@/server/session";

export const dynamic = "force-dynamic";

/** Signs the current administrator out by expiring the session cookie. */
export async function POST() {
  return clearSessionCookie(NextResponse.json({ ok: true }));
}
