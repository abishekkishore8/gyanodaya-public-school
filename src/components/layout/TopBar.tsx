import Link from "next/link";

import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { TOP_NAV } from "@/data/navigation";
import { GOLD, GREEN } from "@/lib/theme";

/** Slim utility bar above the main navigation: contact details and the admission CTA. */
export default function TopBar() {
  const { parentsLoginUrl } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  return (
    <div style={{ backgroundColor: GREEN }} className="text-white text-[11px] sm:text-xs tracking-wide relative z-40 border-b border-white/10">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between gap-x-2 min-w-0">
        {/* Left Contact Details */}
        {/* Left Contact & Location Info */}
        <div className="flex items-center gap-x-2.5 sm:gap-x-4 text-gray-200 truncate min-w-0 flex-1">
          <a
            href="tel:+919431377488"
            className="flex items-center gap-1.5 hover:text-[#dfb455] transition-colors group shrink-0"
            aria-label="Call school office"
          >
            <svg className="w-3.5 h-3.5 text-[#dfb455] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium text-[11px] sm:text-xs">+91 94313 77488</span>
          </a>

          <a
            href="mailto:info@gpsbagodar.edu.in"
            className="hidden sm:flex items-center gap-1.5 hover:text-[#dfb455] transition-colors group truncate text-[11px] sm:text-xs"
          >
            <svg className="w-3.5 h-3.5 text-[#dfb455] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">info@gpsbagodar.edu.in</span>
          </a>

          <span className="hidden 2xl:flex items-center gap-1.5 text-gray-300 text-xs">
            <svg className="w-3.5 h-3.5 text-[#dfb455]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Bagodar, Giridih, Jharkhand</span>
          </span>
        </div>

        {/* Right Links & Gold CTA */}
        <div className="flex items-center gap-x-2 sm:gap-x-3 shrink-0">
          {TOP_NAV.map((item) => {
            const className =
              "hover:text-[#dfb455] transition-colors font-medium text-gray-200 text-xs hidden 2xl:inline-block cursor-pointer";

            return item.isExternal ? (
              <a
                key={item.label}
                href={item.label === "Parents Login" ? parentsLoginUrl : item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={() => setAdmissionModalOpen(true)}
            style={{ backgroundColor: GOLD }}
            className="text-white font-semibold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded hover:brightness-110 transition-all shadow-sm tracking-wider uppercase cursor-pointer hover:scale-105 active:scale-95 animate-pulse-glow"
          >
            ADMISSION OPEN
          </button>
        </div>
      </div>
    </div>
  );
}
