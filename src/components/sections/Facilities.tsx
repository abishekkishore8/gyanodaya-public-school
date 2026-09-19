import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD, GREEN } from "@/lib/theme";

/** Grid of campus infrastructure cards. */
export default function Facilities() {
  const { facilitiesList } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();

  return (
    <section id="facilities" className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <p
            style={{ color: GOLD }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
          >
            FACILITIES
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            World-Class Infrastructure
          </h2>
        </div>

        {/* 4 Infrastructure Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {facilitiesList.map((fac) => (
            <div
              key={fac.title}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Photo with Tag */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-200">
                <img
                  src={fac.img}
                  alt={fac.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Tag */}
                <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs font-semibold">
                  {fac.tag}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    style={{ color: GREEN }}
                    className="font-bold text-sm mb-1 font-serif group-hover:text-[#c59a3f] transition-colors"
                  >
                    {fac.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Facilities CTA Button */}
        <div className="text-center">
          <button
            onClick={() => setAdmissionModalOpen(true)}
            style={{ borderColor: "#14452f", color: "#14452f" }}
            className="inline-flex items-center gap-2 border-2 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-sm hover:bg-[#14452f] hover:text-white transition-all uppercase tracking-wider cursor-pointer hover:scale-105"
          >
            <span>VIEW ALL FACILITIES</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
