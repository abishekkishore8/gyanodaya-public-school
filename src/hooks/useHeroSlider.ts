import { useEffect, useState } from "react";

/** How long each hero slide stays on screen. Drives the hero countdown bar too. */
export const SLIDE_INTERVAL_MS = 3000;

/**
 * Auto-advancing carousel index. Advancing pauses while `paused` is true, and
 * the index is clamped whenever the number of slides shrinks.
 */
export function useHeroSlider(slideCount: number, paused: boolean) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (paused || slideCount <= 1) return;

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slideCount, paused]);

  useEffect(() => {
    if (slideCount === 0 || activeSlide >= slideCount) setActiveSlide(0);
  }, [activeSlide, slideCount]);

  const safeActiveSlide = slideCount === 0 ? 0 : Math.min(activeSlide, slideCount - 1);

  return { activeSlide: safeActiveSlide, setActiveSlide };
}
