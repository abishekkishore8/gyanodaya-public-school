import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";
import type { ResultStatItem, ResultTopperItem } from "@/types/site";

/** Sets the part of a title in parentheses — "(X)" — in a filled tag, as on the printed banner. */
function GroupTitle({ title }: { title: string }) {
  const match = title.match(/^(.*?)\(([^)]+)\)(.*)$/);
  if (!match) return <>{title}</>;
  const [, before, highlight, after] = match;
  return (
    <>
      {before}
      <span
        style={{ backgroundColor: GREEN, borderColor: GOLD }}
        className="inline-block mx-1 px-3 py-0.5 text-white border-x-4 align-middle text-[0.8em]"
      >
        {highlight}
      </span>
      {after}
    </>
  );
}

/** Summary tile: large figure, a word under it, and a grey caption strip. */
function StatTile({ stat }: { stat: ResultStatItem }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-gray-300 bg-white text-center shadow-sm">
      <div className="px-2 pt-2 pb-1.5">
        <p style={{ color: GREEN }} className="text-2xl sm:text-3xl font-extrabold leading-none">
          {stat.value}
        </p>
        {stat.label && <p className="mt-1 text-sm sm:text-base font-bold text-gray-700">{stat.label}</p>}
      </div>
      {stat.caption && <p className="bg-gray-300 px-2 py-1 text-xs sm:text-sm font-bold text-gray-800">{stat.caption}</p>}
    </div>
  );
}

/** One student: circular portrait (or their initial) in a ring, label, name and marks. */
function TopperCard({ topper, first }: { topper: ResultTopperItem; first: boolean }) {
  return (
    <article className="group flex w-full flex-col items-center text-center">
      <div className="relative w-full max-w-[170px] aspect-square">
        {/* Ring: brand arc around the lower edge, muted above */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 240deg, ${GREEN} 0deg 240deg, #dcdcdc 240deg 360deg)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-[6px] rounded-full bg-white p-1.5">
          <div className="h-full w-full overflow-hidden rounded-full bg-[#f1f4f1]">
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
                className="grid h-full w-full place-items-center font-serif text-5xl font-bold opacity-25"
                aria-hidden="true"
              >
                {topper.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {first && (
          <span
            style={{ backgroundColor: GOLD }}
            className="absolute top-0 right-1 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full font-serif text-[10px] sm:text-[11px] font-bold italic text-white shadow-md ring-2 ring-white"
          >
            Topper
          </span>
        )}
      </div>

      {/* Label (e.g. State Topper) above the name, then marks — as on the printed banner */}
      {topper.detail && (
        <p style={{ color: GOLD }} className="mt-3 text-[11px] sm:text-xs font-extrabold uppercase tracking-wide">
          {topper.detail}
        </p>
      )}
      <h3
        className={`${topper.detail ? "mt-0.5" : "mt-3"} text-[11px] sm:text-xs font-bold uppercase tracking-wide leading-tight text-gray-700`}
      >
        {topper.name}
      </h3>
      <p className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-0.5">{topper.score}</p>
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
        <div className="mb-8 sm:mb-10">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            OUR ACHIEVERS
          </p>
          {results.intro && <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">{results.intro}</p>}
        </div>

        {groups.map((group) => (
          <div key={group.id} className="mb-12 last:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-gray-600 mb-8 sm:mb-10">
              <GroupTitle title={group.title} />
            </h2>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
              {group.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[320px] mx-auto lg:mx-0 shrink-0">
                  {group.stats.map((stat) => (
                    <StatTile key={stat.id} stat={stat} />
                  ))}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center ${
                    group.stats.length > 0 ? "lg:grid-cols-4" : "lg:grid-cols-5"
                  }`}
                >
                  {group.toppers.map((topper, index) => (
                    <TopperCard key={topper.id} topper={topper} first={index === 0} />
                  ))}
                </div>
                {group.footnote && (
                  <p style={{ color: GOLD }} className="mt-6 text-center text-xs sm:text-sm font-medium">
                    {group.footnote}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
