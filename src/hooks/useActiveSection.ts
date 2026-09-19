import { useEffect, useState } from "react";

/**
 * Reports which in-page section currently sits under the header so the
 * navigation can highlight it.
 *
 * `sectionIds` must be a stable reference (a module-level constant) — the
 * observer is rebuilt whenever it changes.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    // Only count a section once it reaches the band just below the header; of
    // the sections crossing it, the highest one is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries.filter((entry) => entry.isIntersecting);
        if (onScreen.length === 0) return;

        const topmost = onScreen.reduce((highest, entry) =>
          entry.boundingClientRect.top < highest.boundingClientRect.top ? entry : highest,
        );
        setActiveSection(topmost.target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
