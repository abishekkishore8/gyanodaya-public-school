import Link from "next/link";

import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { telHref } from "@/data/contact";
import { GOLD, GREEN } from "@/lib/theme";

/** School address, phone, email and office hours, with a map and a way in. */
export default function Contact() {
  const { contact } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  const details = [
    {
      label: "Address",
      value: contact.address,
      href: undefined,
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ),
    },
    {
      label: "Phone",
      value: [contact.phone, contact.altPhone].filter(Boolean).join(" · "),
      href: telHref(contact.phone),
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
    },
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
    },
    {
      label: "Office hours",
      value: contact.officeHours,
      href: undefined,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
  ].filter((detail) => detail.value);

  return (
    <section id="contact-us" className="py-12 sm:py-16 bg-white scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            WE ARE HERE TO HELP
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Call the school office, write to us, or come and see the campus for yourself. Admission enquiries are
            answered the same working day.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Details */}
          <div className="space-y-4">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex gap-4 rounded-2xl border border-gray-200/80 bg-[#f9faf9] p-4 sm:p-5"
              >
                <span
                  style={{ backgroundColor: GREEN }}
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {detail.icon}
                  </svg>
                </span>

                <div className="min-w-0">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-gray-400">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      style={{ color: GREEN }}
                      className="text-xs sm:text-sm font-semibold hover:text-[#c59a3f] transition-colors break-words"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => setAdmissionModalOpen(true)}
                style={{ backgroundColor: GREEN }}
                className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-sm hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer shadow"
              >
                <span>Admission enquiry</span>
              </button>
              <Link
                href="/online-forms#visit"
                className="inline-flex items-center gap-2 border-2 border-[#14452f] text-[#14452f] text-xs sm:text-sm font-semibold px-5 py-3 rounded-sm hover:bg-[#14452f] hover:text-white transition-all uppercase tracking-wider"
              >
                <span>Book a campus visit</span>
              </Link>
            </div>
          </div>

          {/* Map */}
          {contact.mapEmbedUrl && (
            <div className="overflow-hidden rounded-2xl border border-gray-200/80 shadow-lg">
              <iframe
                src={contact.mapEmbedUrl}
                title="School location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[320px] sm:h-[460px] border-0"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
