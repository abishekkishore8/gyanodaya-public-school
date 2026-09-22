import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Fee Structure | Gyanodaya Public School, Bagodar",
  description:
    "Fee structure for Gyanodaya Public School, Bagodar — admission, tuition, annual and transport charges by stage, with payment terms.",
  alternates: { canonical: "/fees" },
};

export default function Page() {
  return <SchoolSite page="fees" />;
}
