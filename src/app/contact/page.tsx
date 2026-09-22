import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  title: "Contact Us | Gyanodaya Public School, Bagodar",
  description:
    "Contact Gyanodaya Public School, Bagodar — address, phone, email, office hours and campus location on the map.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <SchoolSite page="contact" />;
}
