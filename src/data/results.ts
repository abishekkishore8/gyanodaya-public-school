/**
 * Default board results strip shown under the notice board.
 *
 * Seed and fallback only — the live section reads the `results` part of the
 * site document, maintained under Admin → Board results. The names below come
 * from the layout the school supplied; replace them with the toppers of the
 * session being announced, and add a photograph for each.
 */

import type { ResultsContent } from "@/types/site";

export const INITIAL_RESULTS: ResultsContent = {
  intro: "Congratulations to our students on another year of outstanding board results.",

  groups: [
    {
      id: "result-class-x-2026",
      title: "Class (X) Results 2026",
      toppers: [
        { id: "topper-x-1", name: "Arpit Kumar", score: "96.2%", detail: "", imageUrl: "" },
        { id: "topper-x-2", name: "Shristy Raj", score: "96.2%", detail: "", imageUrl: "" },
        { id: "topper-x-3", name: "Akshara Verma", score: "96%", detail: "", imageUrl: "" },
        { id: "topper-x-4", name: "Anuj Kumar", score: "96%", detail: "", imageUrl: "" },
        { id: "topper-x-5", name: "Abhijeet Mahto", score: "96%", detail: "", imageUrl: "" },
      ],
    },
  ],
};
