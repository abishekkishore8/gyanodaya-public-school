import { useEffect } from "react";

/**
 * Selects the tab named by the URL hash, so a navigation sub-item can deep-link
 * into a tabbed section — `/academics#primary` opens the Primary Wing tab.
 *
 * `tabIds` must be a stable reference (a module-level constant); `select` is
 * expected to be a `useState` setter, which React keeps stable.
 */
export function useHashTab<T extends string>(tabIds: readonly T[], select: (id: T) => void) {
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if ((tabIds as readonly string[]).includes(hash)) select(hash as T);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [tabIds, select]);
}
