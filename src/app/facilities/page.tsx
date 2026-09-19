import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Campus & Facilities | Gyanodaya Public School, Bagodar",
  description:
    "Smart classrooms, Physics, Chemistry, Biology and Robotics laboratories, a 10,000-volume digital library and GPS-tracked bus transport with CCTV at Gyanodaya Public School, Bagodar.",
  alternates: { canonical: "/facilities" },
};

export default function FacilitiesPage() {
  return <SchoolSite page="facilities" />;
}
