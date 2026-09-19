import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "About Us | Gyanodaya Public School, Bagodar",
  description:
    "The story, vision and values of Gyanodaya Public School, Bagodar — a CBSE co-educational school in Giridih, Jharkhand educating students from Nursery to Class XII.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <SchoolSite page="about" />;
}
