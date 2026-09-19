interface BackToTopProps {
  /** True once the page has scrolled far enough to reveal the button. */
  visible: boolean;
  /** Scroll depth as a percentage, drawn as the ring around the button. */
  scrollProgress: number;
}

/** Floating button that smooth-scrolls back to the top of the page. */
export default function BackToTop({ visible, scrollProgress }: BackToTopProps) {
  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-16 sm:bottom-20 md:bottom-6 right-4 sm:right-6 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#14452f] text-[#dfb455] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-[#dfb455] group"
    >
      {/* Circular SVG scroll progress indicator */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke="#dfb455"
          strokeWidth="2"
          strokeDasharray={`${scrollProgress}, 100`}
          className="transition-all duration-150"
        />
      </svg>
      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
