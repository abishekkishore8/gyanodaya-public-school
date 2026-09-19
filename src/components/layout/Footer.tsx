import Link from "next/link";
import { useState, type FormEvent } from "react";

import SchoolLogo from "@/components/common/SchoolLogo";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { FOOTER_QUICK_LINKS } from "@/data/navigation";
import { SCHOOL_WORDMARK, SCHOOL_WORDMARK_LETTERS } from "@/data/site";

/** Site footer: contact details, quick links and the newsletter signup. */
export default function Footer() {
  const { parentsLoginUrl } = useSiteContent();
  const { showToast } = useToast();
  const { setAdmissionModalOpen } = useUi();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!newsletterEmail) return;
    showToast("✨ Subscribed successfully to the Gyanodaya Public School newsletter!");
    setNewsletterEmail("");
  };

  return (
    <footer style={{ backgroundColor: "#0e3322" }} className="text-white pt-12 sm:pt-16 pb-8 border-t border-black/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#dfb455]">
                Mandatory Disclosure
              </p>
              <h4 className="mt-1 font-serif text-lg sm:text-xl font-bold text-white">
                School Information & Public Disclosure
              </h4>
            </div>
            <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-gray-300">
              Gyanodaya Public School, Bagodar publishes its mandatory disclosure, admission information, fee details, academic policies, and statutory school information for parents and guardians. For the latest verified records, please contact the school office or request the current disclosure set from the administrative desk.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-8 mb-10 sm:mb-12">

          {/* Column 1: School Brand & Description (2 cols on lg) */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
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
                {/* Sets the lockup width; the name above stretches to it — see Navbar.tsx. */}
                <span className="text-[9.5px] sm:text-[10px] text-gray-300 font-semibold tracking-[0.06em] -mr-[0.06em] uppercase leading-tight mt-0.5">
                  PUBLIC SCHOOL • BAGODAR
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Nurturing young minds with strong values, academic distinction, digital intelligence, and holistic character building in Bagodar, Giridih, Jharkhand.
            </p>

            {/* Social Media Circular Outline Icons */}
            <div className="flex items-center gap-3">
              {[
                { name: "Facebook", icon: "f", url: "https://www.facebook.com/GPSBagodar/" },
                { name: "Instagram", icon: "📷", url: "#" },
                { name: "YouTube", icon: "▶", url: "#" },
                { name: "LinkedIn", icon: "in", url: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  onClick={(e) => {
                    if (!social.url.startsWith("http")) {
                      e.preventDefault();
                      showToast(`Opening GPS Bagodar ${social.name} page...`);
                    }
                  }}
                  className="w-8 h-8 rounded-full border border-gray-400/50 hover:border-[#dfb455] text-gray-300 hover:text-[#dfb455] flex items-center justify-center text-xs font-semibold transition-all hover:scale-110 hover:bg-white/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#dfb455] transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              INFORMATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              {/* `opensEnquiry` entries have no page of their own yet, so they ask instead. */}
              {[
                { label: "Fee Structure", href: "/admissions#faqs" },
                { label: "Admission Process", href: "/admissions" },
                { label: "School Calendar", href: "#", opensEnquiry: true },
                { label: "News & Events", href: "/notice-board#announcements" },
                { label: "Career & Jobs", href: "/notice-board#recruitment" },
                { label: "Parents Login", href: parentsLoginUrl, isExternal: true },
              ].map((info) => {
                const className =
                  "hover:text-[#dfb455] transition-colors inline-block hover:translate-x-1 duration-200 cursor-pointer";

                return (
                  <li key={info.label}>
                    {info.isExternal || info.opensEnquiry ? (
                      <a
                        href={info.href}
                        target={info.isExternal ? "_blank" : undefined}
                        rel={info.isExternal ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (info.opensEnquiry) {
                            e.preventDefault();
                            setAdmissionModalOpen(true);
                          }
                        }}
                        className={className}
                      >
                        {info.label}
                      </a>
                    ) : (
                      <Link href={info.href} className={className}>
                        {info.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact Us & Newsletter */}
          <div id="contact" className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              CONTACT US
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300 mb-6">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#dfb455] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Bagodar, Giridih District – 825322, Jharkhand, India</span>
              </p>

              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#dfb455] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919431377488" className="hover:text-[#dfb455] transition-colors">
                  +91 94313 77488
                </a>
              </p>

              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#dfb455] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@gpsbagodar.edu.in" className="hover:text-[#dfb455] transition-colors">
                  info@gpsbagodar.edu.in
                </a>
              </p>
            </div>

            {/* Newsletter subscription */}
            <h4 className="text-white font-serif font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2">
              NEWSLETTER
            </h4>
            <p className="text-gray-300 text-xs mb-2.5">
              Subscribe for school circulars &amp; notices.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1.5">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-white/10 border border-gray-600 rounded px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#dfb455]"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-[#c59a3f] hover:bg-[#dfb455] text-white p-2 rounded transition-colors shrink-0 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright and Legal links */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-gray-400 text-center sm:text-left">
          <p>© 2025 Gyanodaya Public School (GPS), Bagodar. Affiliated to CBSE, New Delhi.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-gray-200 transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#terms" className="hover:text-gray-200 transition-colors">
              Terms &amp; Conditions
            </a>
          </div>
        </div>

        <div className="pt-4 text-center text-[11px] sm:text-xs text-white/70">
          <p>
            Designed and Developed with ❤️{" "}
            <a
              href="https://www.vyntrox.com/"
              target="_blank"
              rel="noreferrer"
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
