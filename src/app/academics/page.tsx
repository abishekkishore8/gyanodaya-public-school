import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Academics & CBSE Curriculum | Gyanodaya Public School, Bagodar",
  description:
    "CBSE curriculum at Gyanodaya Public School, Bagodar — pre-primary foundation years, primary wing, middle school and senior secondary streams, with STEM labs and a 1:20 mentor ratio.",
  alternates: { canonical: "/academics" },
};

export default function AcademicsPage() {
  return <SchoolSite page="academics" />;
}
