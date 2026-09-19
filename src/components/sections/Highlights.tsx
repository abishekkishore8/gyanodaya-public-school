import { HIGHLIGHT_CARDS } from "@/data/highlights";
import { GREEN } from "@/lib/theme";

/** Five-up strip of school highlights directly under the hero. */
export default function Highlights() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 my-10 sm:my-14">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 overflow-hidden">
        {HIGHLIGHT_CARDS.map((card, cIdx) => (
          <div
            key={card.title}
            className={`p-4 sm:p-5 md:p-6 flex flex-col items-center text-center group hover:bg-[#f9fbf9] transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
              cIdx === 4 ? "col-span-2 sm:col-span-1 border-t sm:border-t-0" : ""
            }`}
          >
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
              {card.icon}
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
