import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";
import type { ResultTopperItem } from "@/types/site";

/** One student: photograph (or their initial), name and marks. */
function TopperCard({ topper }: { topper: ResultTopperItem }) {
  return (
    <article className="group flex flex-col items-center text-center">
      <div className="relative w-full aspect-4/5 overflow-hidden rounded-2xl border border-gray-200/80 bg-[#f1f4f1] shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {topper.imageUrl ? (
          <img
            src={topper.imageUrl}
            alt={topper.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <span
            style={{ color: GREEN }}
            className="grid h-full w-full place-items-center font-serif text-5xl sm:text-6xl font-bold opacity-25"
            aria-hidden="true"
          >
            {topper.name.charAt(0)}
          </span>
        )}

      </div>

      {/* Name, then marks — as on the printed results banner */}
      <h3
        style={{ color: GREEN }}
        className="mt-3 font-serif text-sm sm:text-base font-bold uppercase tracking-wide leading-tight"
      >
        {topper.name}
      </h3>
      <p style={{ color: GOLD }} className="font-serif text-base sm:text-lg font-bold mt-0.5">
        {topper.score}
      </p>
      {topper.detail && <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{topper.detail}</p>}
    </article>
  );
}

/** Board result toppers, announced under the notice board on the home page. */
export default function Results() {
  const { results } = useSiteContent();

  const groups = results.groups.filter((group) => group.toppers.length > 0);
  if (groups.length === 0) return null;

  return (
    <section id="results" className="py-12 sm:py-16 bg-[#eeeeee] scroll-mt-28">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            OUR ACHIEVERS
          </p>
          {results.intro && (
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {results.intro}
            </p>
          )}
        </div>

        {groups.map((group) => (
          <div key={group.id} className="mb-10 last:mb-0">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
              {group.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {group.toppers.map((topper) => (
                <TopperCard key={topper.id} topper={topper} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
