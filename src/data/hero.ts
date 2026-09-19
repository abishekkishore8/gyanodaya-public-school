/** Hero carousel slides. Images are overridable from the admin image manager. */

export interface HeroSlide {
  img: string;
  tag: string;
  headline: string;
  subtitle: string;
}

// Demo high-resolution school & campus photography
export const HERO_SLIDES: HeroSlide[] = [
  {
    img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1920&h=1080&fit=crop&auto=format",
    tag: "CBSE AFFILIATED INSTITUTION",
    headline: "Inspiring Excellence, Building Futures",
    subtitle: "At Gyanodaya Public School, Bagodar, we nurture young minds with strong values, modern learning and boundless opportunities.",
  },
  {
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop&auto=format",
    tag: "NURTURING GLOBAL LEADERS",
    headline: "Empowering Leaders of Tomorrow",
    subtitle: "Comprehensive CBSE curriculum with world-class faculty, modern infrastructure and holistic character building.",
  },
  {
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop&auto=format",
    tag: "WORLD-CLASS INFRASTRUCTURE",
    headline: "A Legacy of Academic Distinction",
    subtitle: "Fostering curiosity, creativity, and critical thinking from foundational kindergarten years to senior secondary.",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop&auto=format",
    tag: "HOLISTIC DEVELOPMENT",
    headline: "Where Potential Meets Purpose",
    subtitle: "State-of-the-art laboratories, digital smart classrooms, and vibrant sports & cultural opportunities.",
  },
];
