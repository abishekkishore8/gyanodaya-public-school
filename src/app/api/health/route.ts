import { NextResponse } from "next/server";

import { getDb } from "@/server/db";
import { describeError } from "@/server/responses";

export const dynamic = "force-dynamic";

/** Readiness probe: confirms the database is reachable. */
export async function GET() {
  try {
    const db = await getDb();
    await db.prepare("SELECT 1").first();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: describeError(error, "Database connection failed") },
      { status: 500 },
    );
  }
}
