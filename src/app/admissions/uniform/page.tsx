import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "School Uniform | Gyanodaya Public School, Bagodar",
  description:
    "The prescribed school uniform at Gyanodaya Public School, Bagodar — summer, winter and sports uniform, with where to buy and how it is worn.",
  alternates: { canonical: "/admissions/uniform" },
};

export default function Page() {
  return <SchoolSite page="uniform" />;
}
