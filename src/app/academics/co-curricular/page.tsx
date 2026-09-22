import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Co-Curricular Activities | Gyanodaya Public School, Bagodar",
  description:
    "Clubs and activities at Gyanodaya Public School, Bagodar — music, dance, art, debate, robotics, eco club and community service alongside the CBSE curriculum.",
  alternates: { canonical: "/academics/co-curricular" },
};

export default function Page() {
  return <SchoolSite page="co-curricular" />;
}
