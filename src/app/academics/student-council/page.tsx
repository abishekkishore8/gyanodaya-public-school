import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Student Council | Gyanodaya Public School, Bagodar",
  description:
    "The student council of Gyanodaya Public School, Bagodar — head boy, head girl, sports captain, cultural secretary and house captains.",
  alternates: { canonical: "/academics/student-council" },
};

export default function Page() {
  return <SchoolSite page="student-council" />;
}
