import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Board Results | Gyanodaya Public School, Bagodar",
  description:
    "Board examination results and toppers at Gyanodaya Public School, Bagodar.",
  alternates: { canonical: "/results" },
};

export default function Page() {
  return <SchoolSite page="results" />;
}
