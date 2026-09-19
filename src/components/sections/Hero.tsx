import { useState } from "react";

import { useSiteContent } from "@/context/SiteContentContext";
import { useUi } from "@/context/UiContext";
import { HERO_SLIDES } from "@/data/hero";
import { SLIDE_INTERVAL_MS, useHeroSlider } from "@/hooks/useHeroSlider";
import { GOLD, GOLD_TEXT } from "@/lib/theme";

/**
 * Splits a headline into its first clause and the remainder, so the remainder can
 * take the gold accent. Headlines without a comma are rendered as-is.
 */
function splitHeadline(headline: string) {
  const separator = headline.indexOf(", ");
  if (separator === -1) return { lead: headline, rest: "" };
  return { lead: headline.slice(0, separator), rest: headline.slice(separator + 2) };
}

/** Full-bleed auto-advancing hero carousel. Pauses while the pointer is over it. */
export default function Hero() {
  const { heroSlides } = useSiteContent();
  const { setAdmissionModalOpen } = useUi();
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const { activeSlide: safeActiveSlide } = useHeroSlider(heroSlides.length, isHoveringHero);

  const currentHeroSlide = heroSlides[safeActiveSlide] || HERO_SLIDES[0];
  const { lead, rest } = splitHeadline(currentHeroSlide.headline);
  const [restFirstWord, ...restTail] = rest.split(" ");

  return (
    <section
      id="home"
      onMouseEnter={() => setIsHoveringHero(true)}
      onMouseLeave={() => setIsHoveringHero(false)}
      className="relative w-full overflow-hidden bg-[#0d2e20] h-[76vh] min-h-[460px] sm:min-h-[520px] md:min-h-[600px] max-h-[720px]"
    >
      {/* Countdown progress bar on top — restarts on every slide change, pauses on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          key={safeActiveSlide}
          className="h-full bg-[#dfb455] animate-hero-progress"
          style={{
            animationDuration: `${SLIDE_INTERVAL_MS}ms`,
            animationPlayState: isHoveringHero ? "paused" : "running",
          }}
        />
      </div>

      {/* Dynamic Hero Slide Images with Smooth Crossfade */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            safeActiveSlide === idx ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-105"
          }`}
          style={{ transition: "opacity 1s ease-in-out, transform 8s ease-out" }}
        >
          <img
            src={slide.img}
            alt={slide.alt}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Readability overlay: bottom-up on phones (text is full width), left-to-right from sm up */}
      <div className="absolute inset-0 z-10 pointer-events-none sm:hidden bg-linear-to-t from-[#0c2619]/95 via-[#0c2619]/80 to-[#0c2619]/35" />
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
        style={{
          background: "linear-gradient(90deg, rgba(12,38,25,0.95) 0%, rgba(12,38,25,0.85) 45%, rgba(12,38,25,0.45) 75%, rgba(12,38,25,0.2) 100%)",
        }}
      />

      {/*
        The copy sits in an absolutely positioned layer using the site container
        (`max-w-[1240px] px-4 sm:px-8`), so it lines up with the sections below and stays
        centred on the image. The layer ignores pointer events; the copy takes them back.
      */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full max-w-[1240px] mx-auto px-4 sm:px-8 flex items-center">
            <div key={safeActiveSlide} className="max-w-xl animate-fade-in-up pointer-events-auto">

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#dfb455] text-[9.5px] sm:text-xs font-semibold tracking-wider uppercase mb-2.5 sm:mb-4">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#dfb455] animate-ping" />
                <span>{currentHeroSlide.tag}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold text-white leading-[1.18] sm:leading-[1.15] mb-2.5 sm:mb-4 drop-shadow-md text-balance">
                {rest ? (
                  <>
                    {lead},
                    <br />
                    {restFirstWord} <span style={{ color: GOLD_TEXT }}>{restTail.join(" ")}</span>
                  </>
                ) : (
                  lead
                )}
              </h1>

              {/* Sub-headline */}
              <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-7 max-w-md font-light line-clamp-3 sm:line-clamp-4">
                {currentHeroSlide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
                <button
                  onClick={() => setAdmissionModalOpen(true)}
                  style={{ backgroundColor: GOLD }}
                  className="text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3.5 rounded flex items-center justify-center gap-1.5 sm:gap-2 hover:brightness-110 transition-all shadow-lg uppercase tracking-wider cursor-pointer hover:scale-105 active:scale-95 animate-pulse-glow"
                >
                  <span>ADMISSION OPEN</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
