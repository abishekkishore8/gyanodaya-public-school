import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { GOLD } from "@/lib/theme";

/** Student life photo grid; each tile opens the lightbox. */
export default function Gallery() {
  const { galleryItems } = useSiteContent();
  const { openLightbox } = useUi();

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-[#f9faf9] border-t border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Header with View Gallery Button */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <p
              style={{ color: GOLD }}
              className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
            >
              STUDENT LIFE
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Learning Beyond Classrooms
            </h2>
          </div>

          <button
            onClick={() => openLightbox(0)}
            style={{ borderColor: "#14452f", color: "#14452f" }}
            className="border-2 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-sm hover:bg-[#14452f] hover:text-white transition-all inline-flex items-center gap-2 uppercase tracking-wider cursor-pointer hover:scale-105"
          >
            <span>OPEN FULL GALLERY</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* 6 Gallery Photos Grid with Clean Responsive Breakpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="relative h-40 sm:h-44 md:h-48 rounded-lg overflow-hidden shadow-sm group cursor-pointer bg-gray-200"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-2.5 sm:p-3 text-white pointer-events-none">
                <span className="text-[9px] sm:text-[10px] text-[#dfb455] font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1">
                  {item.title}
                </span>
                <div className="mt-1 flex items-center gap-1 text-[9.5px] sm:text-[10px] text-white/80">
                  <span>Click to zoom</span>
                  <span>🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
