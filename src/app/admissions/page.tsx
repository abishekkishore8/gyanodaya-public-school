import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Admissions 2025–26 | Gyanodaya Public School, Bagodar",
  description:
    "Admission criteria, fee guidelines and frequently asked questions for Gyanodaya Public School, Bagodar. Apply online for Nursery to Class XII for the 2025–26 session.",
  alternates: { canonical: "/admissions" },
};

export default function AdmissionsPage() {
  return <SchoolSite page="admissions" />;
}
