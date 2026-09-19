import "server-only";

import { NextResponse } from "next/server";

/** Turns an unknown thrown value into a message safe to return to the client. */
export function describeError(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

/** JSON error response with a `message` field, matching what the client expects. */
export function errorResponse(error: unknown, fallback: string, status = 500) {
  return NextResponse.json({ message: describeError(error, fallback) }, { status });
}
