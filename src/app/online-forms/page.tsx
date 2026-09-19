import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Online Forms — Admission, Enquiry & Campus Visit | Gyanodaya Public School",
  description:
    "Submit an online admission form, send a general or academic enquiry, book a campus visit or download the prospectus and fee details for Gyanodaya Public School, Bagodar.",
  alternates: { canonical: "/online-forms" },
};

export default function OnlineFormsPage() {
  return <SchoolSite page="online-forms" />;
}
