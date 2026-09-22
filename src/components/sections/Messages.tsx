import { useEffect, useState } from "react";

import { useSiteContent } from "@/context/SiteContentContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { GOLD, GOLD_TEXT, GREEN } from "@/lib/theme";
import type { AboutMessageItem } from "@/types/site";

/** The curved edge that lifts the card copy into the portrait. */
function CardWave() {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="currentColor"
      className="absolute inset-x-0 -bottom-px h-8 sm:h-10 w-full text-white"
    >
      <path d="M0,60 C220,118 430,14 720,44 C980,70 1230,120 1440,68 L1440,120 L0,120 Z" />
    </svg>
  );
}

/** The full message, opened from a card's "View More". */
function MessageModal({ message, onClose }: { message: AboutMessageItem; onClose: () => void }) {
  useBodyScrollLock(true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[125] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-scale-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative border-2 border-[#14452f]/20 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close message"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* Portrait & Heading */}
        <div className="flex items-center gap-4 pb-5 border-b-2 border-[#14452f]/20 mb-5 pr-8">
          <img
            src={message.imageUrl}
            alt={message.name ? `${message.name}, ${message.designation}` : message.designation}
            loading="lazy"
            decoding="async"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-top shrink-0 border-2 border-[#dfb455]/60"
          />
          <div>
            <h3 style={{ color: GREEN }} className="font-serif font-bold text-lg sm:text-2xl leading-tight">
              {message.title}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-500 mt-0.5">
              {message.name ? `${message.name} · ${message.designation}` : message.designation}
            </p>
          </div>
        </div>

        {message.quote && (
          <p className="font-serif italic text-sm sm:text-base text-[#14452f] text-center mb-4">
            &ldquo;{message.quote}&rdquo;
          </p>
        )}

        {/* Message Body */}
        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#f9faf9] p-4 sm:p-5 rounded-xl border border-gray-200/80">
          {message.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-5 pt-4 border-t border-gray-200 text-right">
          <div className="font-serif font-bold text-sm text-[#14452f]">{message.designation}</div>
          <div className="text-[10.5px] text-gray-500">Bagodar, Giridih District, Jharkhand</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Leadership message cards, directly under the hero.
 *
 * The messages themselves are maintained under Admin → About us, which is also
 * where the About page renders them in full.
 */
export default function Messages() {
  const { about } = useSiteContent();
  const [openMessageId, setOpenMessageId] = useState<string | null>(null);

  const openMessage = about.messages.find((message) => message.id === openMessageId);

  if (about.messages.length === 0) return null;

  return (
    <section id="messages" className="py-12 sm:py-16 bg-[#f7faf8]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            FROM OUR LEADERSHIP
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Messages
          </h2>
        </div>

        {/* Message Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {about.messages.map((message) => (
            <article
              key={message.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200/70 flex flex-col hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Portrait with the curved edge */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
                <img
                  src={message.imageUrl}
                  alt={message.name ? `${message.name}, ${message.designation}` : message.designation}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <CardWave />
              </div>

              {/* Title, Excerpt & View More */}
              <div className="px-5 sm:px-6 pb-6 pt-1 flex flex-col grow text-center">
                <h3 style={{ color: GREEN }} className="font-serif text-lg sm:text-xl font-bold mb-3">
                  {message.title}
                </h3>

                {message.quote && (
                  <p className="font-serif italic text-xs sm:text-sm font-semibold text-gray-800 mb-2">
                    &ldquo;{message.quote}&rdquo;
                  </p>
                )}

                <p className="italic text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-4">
                  {message.excerpt}
                </p>

                <button
                  onClick={() => setOpenMessageId(message.id)}
                  style={{ color: GOLD_TEXT }}
                  className="mt-auto pt-5 mx-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold italic hover:brightness-90 transition cursor-pointer"
                >
                  <span>View More</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {openMessage && <MessageModal message={openMessage} onClose={() => setOpenMessageId(null)} />}
    </section>
  );
}
