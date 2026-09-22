import HighlightIcon from "@/components/icons/HighlightIcon";
import { useSiteContent } from "@/context/SiteContentContext";
import { GREEN } from "@/lib/theme";

/**
 * Five-up strip of school highlights.
 *
 * With `overlap` the strip is pulled up over the bottom of the hero, which is
 * how the home page uses it; on its own (the about page) it keeps normal
 * spacing above.
 */
export default function Highlights({ overlap = false }: { overlap?: boolean }) {
  const { home } = useSiteContent();
  const cards = home.highlights;

  if (cards.length === 0) return null;

  return (
    <div
      className={`relative z-30 max-w-[1240px] mx-auto px-4 sm:px-6 mb-10 sm:mb-14 ${
        overlap ? "-mt-12 sm:-mt-16" : "mt-10 sm:mt-14"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 overflow-hidden">
        {cards.map((card, cIdx) => (
          <div
            key={card.id}
            className={`p-4 sm:p-5 md:p-6 flex flex-col items-center text-center group hover:bg-[#f9fbf9] transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
              cIdx === 4 && cards.length === 5 ? "col-span-2 sm:col-span-1 border-t sm:border-t-0" : ""
            }`}
          >
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
              <HighlightIcon icon={card.icon} />
            </div>
            <h2
              style={{ color: GREEN }}
              className="font-semibold text-xs sm:text-sm leading-snug mb-1 group-hover:text-[#c59a3f] transition-colors"
            >
              {card.title}
            </h2>
            <p className="text-gray-500 text-[10.5px] sm:text-xs leading-relaxed max-w-[170px]">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
