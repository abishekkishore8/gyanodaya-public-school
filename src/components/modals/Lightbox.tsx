import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { useLightboxKeyboard } from "@/hooks/useLightboxKeyboard";

/** Full-screen gallery viewer with keyboard and on-screen navigation. */
export default function Lightbox() {
  const { galleryItems } = useSiteContent();
  const { lightboxIndex, closeLightbox, showNextLightboxImage, showPreviousLightboxImage } = useUi();

  useLightboxKeyboard(lightboxIndex !== null, {
    onClose: closeLightbox,
    onNext: showNextLightboxImage,
    onPrevious: showPreviousLightboxImage,
  });

  if (lightboxIndex === null || !galleryItems[lightboxIndex]) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-scale-in"
      onClick={() => closeLightbox()}
    >
      {/* Close button */}
      <button
        onClick={() => closeLightbox()}
        className="absolute top-4 sm:top-5 right-4 sm:right-5 text-white/80 hover:text-white text-2xl sm:text-3xl font-bold p-2 z-50 cursor-pointer"
      >
        ✕
      </button>

      {/* Previous Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          showPreviousLightboxImage();
        }}
        aria-label="Previous photo"
        className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={galleryItems[lightboxIndex].img}
          alt={galleryItems[lightboxIndex].title}
          className="max-h-[68vh] sm:max-h-[72vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        <div className="mt-3 sm:mt-4 text-center text-white px-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#dfb455] bg-white/10 px-3 py-0.5 sm:py-1 rounded-full">
            {galleryItems[lightboxIndex].category}
          </span>
          <h4 className="font-serif text-base sm:text-xl font-bold mt-1.5 sm:mt-2">
            {galleryItems[lightboxIndex].title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-md">
            {galleryItems[lightboxIndex].desc}
          </p>
          <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
            {lightboxIndex + 1} of {galleryItems.length}
          </p>
        </div>
      </div>

      {/* Next Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          showNextLightboxImage();
        }}
        aria-label="Next photo"
        className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer z-50"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
