import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Careers | Gyanodaya Public School, Bagodar",
  description:
    "Teaching and administrative vacancies at Gyanodaya Public School, Bagodar. Apply online with your CV.",
  alternates: { canonical: "/careers" },
};

export default function Page() {
  return <SchoolSite page="careers" />;
}
