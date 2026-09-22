import { GREEN } from "@/lib/theme";
import type { ContentCardItem } from "@/types/site";

/** Card anchor id, so navigation sub-items can deep-link to one card. */
export function cardAnchorId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Photo cards used by the facilities, co-curricular and sports sections: one
 * picture, a floating tag, a title and a short description.
 */
export default function ContentCardGrid({
  items,
  columns = 3,
}: {
  items: ContentCardItem[];
  /** Cards per row on large screens. */
  columns?: 3 | 4;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ${
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {items.map((item) => (
        <article
          key={item.id}
          id={cardAnchorId(item.title)}
          // `scroll-mt` clears the sticky header when linked to directly.
          className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 scroll-mt-28"
        >
          <div className="relative h-44 sm:h-52 overflow-hidden bg-gray-200">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {item.tag && (
              <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs font-semibold">
                {item.tag}
              </span>
            )}
          </div>

          <div className="p-4 sm:p-5 flex flex-col grow">
            <h3
              style={{ color: GREEN }}
              className="font-serif font-bold text-sm sm:text-base mb-1.5 group-hover:text-[#c59a3f] transition-colors"
            >
              {item.title}
            </h3>
            <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
