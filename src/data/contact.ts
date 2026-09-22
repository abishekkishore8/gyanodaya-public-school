/**
 * Default school contact details, used by the top bar, the footer and the
 * contact page. Seed and fallback only — the live values come from the
 * `contact` part of the site document, maintained under Admin → Site settings.
 */

import type { ContactContent } from "@/types/site";

export const INITIAL_CONTACT: ContactContent = {
  phone: "+91 94313 77488",
  altPhone: "",
  email: "info@gpsbagodar.edu.in",
  address: "Bagodar, Giridih District – 825322, Jharkhand, India",
  officeHours: "Monday to Saturday, 8:00 am – 3:00 pm",
  mapEmbedUrl: "https://www.google.com/maps?q=Bagodar,%20Giridih,%20Jharkhand&output=embed",
};

/** `tel:` form of a displayed phone number. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
