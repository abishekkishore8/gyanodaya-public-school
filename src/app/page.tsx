import type { Metadata } from "next";

import SchoolSite from "@/components/SchoolSite";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The home page keeps every section on one scrolling view; the navigation
 * entries also exist as standalone routes (`/about`, `/academics`, …).
 */
export default function HomePage() {
  return <SchoolSite page="home" />;
}
