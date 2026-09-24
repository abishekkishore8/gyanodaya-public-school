import Link from "next/link";
import type { ReactNode } from "react";

import SchoolLogo from "@/components/common/SchoolLogo";
import { useSiteContent } from "@/context/SiteContentContext";
import { telHref } from "@/data/contact";
import { FOOTER_ADMISSION_LINKS, FOOTER_QUICK_LINKS } from "@/data/navigation";
import { SCHOOL_TAGLINE, SCHOOL_TAGLINE_LETTERS, SCHOOL_WORDMARK, SCHOOL_WORDMARK_LETTERS } from "@/data/site";

const FACEBOOK_URL = "https://www.facebook.com/GPSBagodar/";
const WHATSAPP_URL = "https://wa.me/919431377488";

/** Column heading with a short gold rule under it. */
function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="font-serif text-sm sm:text-base font-bold text-white mb-4">
      {children}
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-[#c59a3f]" aria-hidden="true" />
    </h4>
  );
}

/** One contact line: a gold outline icon beside its text. */
function ContactLine({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/5 text-[#dfb455] ring-1 ring-white/10">
        {icon}
      </span>
      <span className="min-w-0 pt-1 leading-relaxed">{children}</span>
    </li>
  );
}

const linkClass = "text-gray-300 hover:text-[#dfb455] transition-colors";

/** Site footer: admissions call to action, links, contact details and the legal line. */
export default function Footer() {
  const { parentsLoginUrl, contact } = useSiteContent();

  return (
    <footer style={{ backgroundColor: "#0e3322" }} className="text-white border-t border-black/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Main columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 pt-12 pb-12 sm:pt-16 sm:pb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5" aria-label="Gyanodaya Public School, home">
              <div className="rounded-full bg-white/95 p-1 ring-1 ring-white/10 shadow-sm shrink-0">
                <SchoolLogo className="w-12 h-12 sm:w-14 sm:h-14" />
              </div>
              <div className="flex flex-col">
                <span
                  aria-label={SCHOOL_WORDMARK}
                  className="flex w-full justify-between font-wordmark font-bold text-lg sm:text-xl leading-none text-white"
                >
                  {SCHOOL_WORDMARK_LETTERS.map((letter, index) => (
                    <span key={index} aria-hidden="true">
                      {letter}
                    </span>
                  ))}
                </span>
                {/* Spread across the width of the name above, so both lines end flush. */}
                <span
                  aria-label={SCHOOL_TAGLINE}
                  className="flex w-full justify-between text-[11px] sm:text-xs text-gray-300 font-semibold leading-tight mt-1"
                >
                  {SCHOOL_TAGLINE_LETTERS.map((letter, index) => (
                    <span key={index} aria-hidden="true">
                      {letter}
                    </span>
                  ))}
                </span>
              </div>
            </Link>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Nurturing young minds with strong values, academic distinction, digital intelligence, and holistic
              character building in Bagodar, Giridih, Jharkhand.
            </p>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#dfb455]/30 bg-white/5 px-3 py-1 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#dfb455]">
              Affiliated to CBSE, New Delhi
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gyanodaya Public School on Facebook"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-gray-300 hover:border-[#dfb455] hover:text-[#dfb455] hover:bg-white/5 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.25-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
                </svg>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message the school on WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-gray-300 hover:border-[#dfb455] hover:text-[#dfb455] hover:bg-white/5 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-2">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Admissions */}
          <nav aria-label="Admissions" className="lg:col-span-3">
            <ColumnHeading>Admissions</ColumnHeading>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {FOOTER_ADMISSION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={parentsLoginUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Parents Login ↗
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div id="contact" className="col-span-2 lg:col-span-3">
            <ColumnHeading>Get in Touch</ColumnHeading>
            <ul className="space-y-3 text-xs sm:text-[13px] text-gray-300">
              <ContactLine
                icon={
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              >
                {contact.address}
              </ContactLine>
              <ContactLine
                icon={
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              >
                <a href={telHref(contact.phone)} className="hover:text-[#dfb455] transition-colors">
                  {contact.phone}
                </a>
                {contact.altPhone && (
                  <>
                    {" · "}
                    <a href={telHref(contact.altPhone)} className="hover:text-[#dfb455] transition-colors">
                      {contact.altPhone}
                    </a>
                  </>
                )}
              </ContactLine>
              <ContactLine
                icon={
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              >
                <a href={`mailto:${contact.email}`} className="break-all hover:text-[#dfb455] transition-colors">
                  {contact.email}
                </a>
              </ContactLine>
              {contact.officeHours && (
                <ContactLine
                  icon={
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  {contact.officeHours}
                </ContactLine>
              )}
            </ul>
          </div>
        </div>

        {/* Legal line */}
        <div className="flex flex-col items-center gap-2 border-t border-white/10 py-6 text-[11px] sm:text-xs text-gray-400 sm:flex-row sm:justify-between">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Gyanodaya Public School (GPS), Bagodar. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Designed and developed with
            <svg className="h-3.5 w-3.5 text-[#dfb455]" viewBox="0 0 24 24" fill="currentColor" aria-label="love">
              <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4.5 6 4.5c2 0 3.3 1 4 2.2.7-1.2 2-2.2 4-2.2 3.7 0 5.6 3.9 4 7.2C19.5 16.4 12 21 12 21z" />
            </svg>
            by
            <a
              href="https://www.vyntrox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#dfb455] hover:text-white transition-colors"
            >
              Vyntrox
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
