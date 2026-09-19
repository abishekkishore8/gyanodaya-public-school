import { useEffect, useState } from "react";

/** Pixels scrolled before the header switches to its condensed state. */
const SCROLLED_THRESHOLD_PX = 40;

/** Tracks page scroll depth for the progress bar and sticky header. */
export function useScrollProgress() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollableHeight = scrollHeight - clientHeight;

      setScrollProgress(scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0);
      setScrolled(scrollTop > SCROLLED_THRESHOLD_PX);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrolled, scrollProgress };
}
