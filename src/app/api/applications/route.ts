import { NextResponse } from "next/server";

import { createApplication, listApplications } from "@/server/applications";
import { checkRateLimit, clientIdentifier, tooManyRequests } from "@/server/rate-limit";
import { errorResponse } from "@/server/responses";
import { requireAdmin } from "@/server/session";
import { uploadCv } from "@/server/storage";

export const dynamic = "force-dynamic";

/** Largest CV accepted, in bytes. */
const MAX_CV_BYTES = 5 * 1024 * 1024;

/** CV formats the school accepts. */
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

/** Lists every application. Admin only. */
export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    return NextResponse.json({ applications: await listApplications() });
  } catch (error) {
    return errorResponse(error, "Failed to load applications.");
  }
}

function readField(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value : "";
}

/**
 * Records a job application from the public careers form, uploading the CV to
 * R2 when one is attached.
 *
 * Public by necessity — candidates are not signed in. The CV is restricted by
 * type and size, the stored record is always created with status "New", and the
 * endpoint is rate limited so the R2 bucket cannot be filled by a script.
 */
export async function POST(request: Request) {
  const limit = await checkRateLimit("applications", clientIdentifier(request), 5, 60 * 60 * 1000);
  if (!limit.allowed) {
    return tooManyRequests(limit.retryAfter, "Too many applications sent. Please try again later.");
  }

  try {
    const form = await request.formData();

    const fullName = readField(form, "fullName").trim();
    const phone = readField(form, "phone").trim();

    if (!fullName || !phone) {
      return NextResponse.json({ message: "Full name and phone number are required." }, { status: 400 });
    }

    let cvUrl: string | undefined;
    let cvFileName: string | undefined;
    let cvKey: string | undefined;

    const cv = form.get("cv");
    if (cv instanceof File && cv.size > 0) {
      const hasAllowedExtension = ALLOWED_CV_EXTENSIONS.some((extension) =>
        cv.name.toLowerCase().endsWith(extension),
      );

      if (!ALLOWED_CV_TYPES.has(cv.type) && !hasAllowedExtension) {
        return NextResponse.json({ message: "Attach your CV as a PDF or Word document." }, { status: 415 });
      }

      if (cv.size > MAX_CV_BYTES) {
        return NextResponse.json(
          { message: `Your CV must be ${Math.round(MAX_CV_BYTES / (1024 * 1024))} MB or smaller.` },
          { status: 413 },
        );
      }

      const uploaded = await uploadCv(cv);
      cvUrl = uploaded.url;
      cvFileName = cv.name;
      cvKey = uploaded.key;
    }

    const application = await createApplication({
      jobId: readField(form, "jobId"),
      jobTitle: readField(form, "jobTitle"),
      fullName,
      email: readField(form, "email"),
      phone,
      experience: readField(form, "experience"),
      qualification: readField(form, "qualification"),
      notes: readField(form, "notes"),
      cvUrl,
      cvFileName,
      cvKey,
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Could not submit your application.", 400);
  }
}
