import { useEffect } from "react";

/** Width at which the inline navigation takes over; mirrors `nav-full` in globals.css. */
const FULL_NAV_QUERY = "(min-width: 1400px)";

/**
 * Dismisses the navigation drawer when it should no longer be open: on Escape,
 * and as soon as the viewport is wide enough for the inline navigation. Without
 * the second case a drawer left open while the window grows is hidden by CSS
 * but keeps the body scroll locked, freezing the page with no way back.
 */
export function useNavDrawerDismiss(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;

    const fullNav = window.matchMedia(FULL_NAV_QUERY);
    const closeWhenInlineNavFits = () => {
      if (fullNav.matches) close();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    closeWhenInlineNavFits();
    fullNav.addEventListener("change", closeWhenInlineNavFits);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      fullNav.removeEventListener("change", closeWhenInlineNavFits);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, close]);
}
