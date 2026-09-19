import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Playfair_Display } from "next/font/google";

import { SITE_URL } from "@/data/site";

import "./globals.css";

/** Body typeface. Exposed as `--font-inter` and mapped to `font-sans`. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

/** Display typeface for headings. Mapped to `font-serif`. */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/** Logo wordmark typeface. Inscriptional capitals; mapped to `font-wordmark`. */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const LOGO_URL =
  "https://pub-74c5e2ce3a764141b0133fe743720d83.r2.dev/website-assets/1789412778814-gps_logo-removebg-preview.png";
const SOCIAL_IMAGE_URL =
  "https://pub-8f6d4f4f1d2b4c7abf4f0f0f0f0f0f0f.r2.dev/1789412778814-gps_logo-removebg-preview.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gyanodaya Public School (GPS) Bagodar - Awakening of Knowledge | CBSE Affiliated",
  description:
    "Gyanodaya Public School (GPS) in Bagodar, Giridih, Jharkhand is a premier CBSE-affiliated co-educational school offering holistic education from Nursery to Class XII.",
  keywords: [
    "Gyanodaya Public School",
    "GPS Bagodar",
    "CBSE School Bagodar",
    "Best school in Bagodar",
    "Giridih Jharkhand School",
    "School admission Bagodar",
  ],
  icons: { icon: LOGO_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Gyanodaya Public School (GPS) Bagodar - Awakening of Knowledge",
    description:
      "Nurturing young minds with values, modern learning, science laboratories, smart classrooms, and GPS-enabled safe transport in Bagodar, Giridih.",
    images: [SOCIAL_IMAGE_URL],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gyanodaya Public School (GPS) Bagodar",
    description:
      "Premier CBSE school in Bagodar, Giridih, Jharkhand offering Nursery to Class XII quality education.",
    images: [SOCIAL_IMAGE_URL],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14452f",
};

/** Search-engine structured data describing the school. */
const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Gyanodaya Public School",
  alternateName: "GPS Bagodar",
  url: SITE_URL,
  logo: LOGO_URL,
  description: "Premier CBSE co-educational institution in Bagodar, Giridih, Jharkhand.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road, Bagodar",
    addressLocality: "Bagodar",
    addressRegion: "Jharkhand",
    postalCode: "825322",
    addressCountry: "IN",
  },
  telephone: "+91-94313-77488",
  email: "info@gpsbagodar.edu.in",
  sameAs: ["https://www.facebook.com/GPSBagodar/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${cinzel.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // Static, author-controlled data — not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
