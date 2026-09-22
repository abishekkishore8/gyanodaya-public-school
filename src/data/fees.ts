/**
 * Default fee structure. Seed and fallback only — the live page reads the
 * `fees` part of the site document, maintained under Admin → Fee structure.
 *
 * Amounts are left blank on purpose: only the school can state its fees, and a
 * wrong figure on this page is worse than an empty one.
 */

import type { FeesContent } from "@/types/site";

/** Placeholder for an amount the school has not published yet. */
const PENDING = "—";

export const INITIAL_FEES: FeesContent = {
  intro:
    "The fees below apply to the current academic session. The school office confirms the exact amount for a class at the time of admission and issues a receipt for every payment.",

  groups: [
    {
      id: "fees-pre-primary",
      title: "Pre-Primary",
      subtitle: "Nursery to UKG",
      rows: [
        { id: "pp-admission", label: "Admission fee (one time)", amount: PENDING, note: "" },
        { id: "pp-tuition", label: "Tuition fee", amount: PENDING, note: "" },
        { id: "pp-annual", label: "Annual charges", amount: PENDING, note: "" },
        { id: "pp-transport", label: "Transport (optional)", amount: PENDING, note: "By distance slab" },
      ],
    },
    {
      id: "fees-primary",
      title: "Primary Wing",
      subtitle: "Classes I to V",
      rows: [
        { id: "pr-admission", label: "Admission fee (one time)", amount: PENDING, note: "" },
        { id: "pr-tuition", label: "Tuition fee", amount: PENDING, note: "" },
        { id: "pr-annual", label: "Annual charges", amount: PENDING, note: "" },
        { id: "pr-transport", label: "Transport (optional)", amount: PENDING, note: "By distance slab" },
      ],
    },
    {
      id: "fees-middle-senior",
      title: "Middle & Senior",
      subtitle: "Classes VI to XII",
      rows: [
        { id: "ms-admission", label: "Admission fee (one time)", amount: PENDING, note: "" },
        { id: "ms-tuition", label: "Tuition fee", amount: PENDING, note: "" },
        { id: "ms-annual", label: "Annual charges", amount: PENDING, note: "" },
        { id: "ms-lab", label: "Laboratory & practical", amount: PENDING, note: "Classes IX to XII" },
        { id: "ms-transport", label: "Transport (optional)", amount: PENDING, note: "By distance slab" },
      ],
    },
  ],

  notes: [
    { id: "fee-note-term", text: "Fees are payable by the due date announced for each term." },
    { id: "fee-note-receipt", text: "Every payment is receipted; please keep receipts for the full session." },
    { id: "fee-note-refund", text: "The admission fee is one time and is not refundable or transferable." },
    { id: "fee-note-office", text: "For sibling concessions, scholarships or any clarification, contact the school office." },
  ],
};
