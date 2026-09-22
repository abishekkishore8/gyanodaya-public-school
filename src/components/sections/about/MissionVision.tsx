import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";

/** Vision and mission statements, with the commitments that follow from them. */
export default function MissionVision() {
  const { about } = useSiteContent();

  return (
    <section id="mission-vision" className="py-12 sm:py-16 bg-[#f7faf8] scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            WHAT WE STAND FOR
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Mission &amp; Vision
          </h2>
        </div>

        {/* The Two Statements */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 mb-8 sm:mb-10">
          {[
            { label: "Our Vision", text: about.vision },
            { label: "Our Mission", text: about.mission },
          ].map((statement) => (
            <div
              key={statement.label}
              className="relative rounded-2xl bg-white border border-gray-200/80 shadow-lg p-6 sm:p-8 overflow-hidden"
            >
              <span style={{ backgroundColor: GOLD }} className="absolute inset-y-0 left-0 w-1.5" />
              <h3 style={{ color: GREEN }} className="font-serif text-xl sm:text-2xl font-bold mb-3">
                {statement.label}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{statement.text}</p>
            </div>
          ))}
        </div>

        {/* Commitments */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {about.missionPoints.map((point) => (
            <div
              key={point.id}
              className="rounded-xl bg-white border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h4 style={{ color: GREEN }} className="font-semibold text-sm sm:text-base mb-1.5">
                {point.title}
              </h4>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
