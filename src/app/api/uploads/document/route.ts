import { NextResponse } from "next/server";

import { MAX_UPLOAD_BYTES } from "@/server/config";
import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";
import { uploadDocument } from "@/server/storage";

export const dynamic = "force-dynamic";

/** Document types the school publishes: PDFs, office files and scans. */
const ALLOWED_DOCUMENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);

const ALLOWED_DOCUMENT_EXTENSIONS = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"];

/**
 * Stores a document in R2 and returns its public URL.
 *
 * Expects `multipart/form-data` with a `file` field. Requires a signed-in
 * administrator.
 */
export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { message: "No file uploaded." },
        {
          status: 400,
        },
      );
    }

    const hasAllowedExtension = ALLOWED_DOCUMENT_EXTENSIONS.some((extension) =>
      file.name.toLowerCase().endsWith(extension),
    );
    if (!file.type.startsWith("image/") && !ALLOWED_DOCUMENT_TYPES.has(file.type) && !hasAllowedExtension) {
      return NextResponse.json({ message: "Upload a PDF, Word, Excel, PowerPoint or image file." }, { status: 415 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      const limitMb = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));
      return NextResponse.json({ message: `File must be ${limitMb} MB or smaller.` }, { status: 413 });
    }

    return NextResponse.json(await uploadDocument(file));
  } catch (error) {
    return errorResponse(error, "File upload failed.");
  }
}
