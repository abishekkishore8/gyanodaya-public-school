import { NextResponse } from "next/server";

import { MAX_UPLOAD_BYTES } from "@/server/config";
import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";
import { uploadImage } from "@/server/storage";

export const dynamic = "force-dynamic";

/**
 * Stores an image in R2 and returns its public URL.
 *
 * Expects `multipart/form-data` with an `image` field. Requires a signed-in
 * administrator.
 */
export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ message: "No image file uploaded." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "Only image uploads are allowed." }, { status: 415 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      const limitMb = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));
      return NextResponse.json({ message: `Image must be ${limitMb} MB or smaller.` }, { status: 413 });
    }

    return NextResponse.json(await uploadImage(file));
  } catch (error) {
    return errorResponse(error, "Image upload failed.");
  }
}
