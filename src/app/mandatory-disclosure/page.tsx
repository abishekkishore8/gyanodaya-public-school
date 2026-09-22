import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure | Gyanodaya Public School, Bagodar",
  description:
    "CBSE mandatory public disclosure for Gyanodaya Public School, Bagodar — general information, affiliation documents, results, staff details and school infrastructure.",
  alternates: { canonical: "/mandatory-disclosure" },
};

export default function MandatoryDisclosurePage() {
  return <SchoolSite page="mandatory-disclosure" />;
}
