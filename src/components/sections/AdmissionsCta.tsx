import SchoolLogo from "@/components/common/SchoolLogo";
import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD, GOLD_TEXT, GREEN } from "@/lib/theme";

/** Full-width green banner inviting visitors to start an admission enquiry. */
export default function AdmissionsCta() {
  const { academicSession, home } = useSiteContent();
  const cta = home.cta;
  const { setAdmissionModalOpen } = useUi();

  return (
    <section id="admissions" style={{ backgroundColor: GREEN }} className="py-8 sm:py-11 border-t border-b border-[#1b583c] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10 text-center md:text-left">

        {/* Left: Crest Icon + Text */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          {/* School Emblem Logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/20 shadow-inner animate-float">
            <div className="w-full h-full rounded-full bg-white/95 flex items-center justify-center p-1.5">
              <SchoolLogo className="w-12 h-12 sm:w-15 sm:h-15" />
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="flex flex-col md:flex-row items-center gap-y-1 gap-x-6">
            <h3
              style={{ color: GOLD_TEXT }}
              className="font-serif text-lg sm:text-2xl font-bold tracking-tight"
            >
              {cta.title}
              <br className="sm:hidden" /> {academicSession}
            </h3>

            {/* Vertical divider on medium screens */}
            <div className="hidden md:block w-px h-10 bg-white/20" />

            <p className="text-white/80 text-xs sm:text-sm font-light">
              {cta.subtitle}
            </p>
          </div>
        </div>

        {/* Right Gold Enquire Now Button */}
        <button
          onClick={() => setAdmissionModalOpen(true)}
          style={{ backgroundColor: GOLD }}
          className="w-full sm:w-auto text-white font-semibold text-xs sm:text-sm px-6 sm:px-7 py-3 rounded-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all uppercase tracking-wider shadow-xl shrink-0 cursor-pointer hover:scale-105 active:scale-95 animate-pulse-glow"
        >
          <span>{cta.buttonLabel}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
