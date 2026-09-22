import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Sports & Games | Gyanodaya Public School, Bagodar",
  description:
    "Sports at Gyanodaya Public School, Bagodar — cricket, football, athletics, indoor games, yoga and traditional games, coached through the year.",
  alternates: { canonical: "/academics/sports" },
};

export default function Page() {
  return <SchoolSite page="sports" />;
}
