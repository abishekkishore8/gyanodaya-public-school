/**
 * Default CBSE Mandatory Public Disclosure.
 *
 * The headings follow Appendix IX of the CBSE Affiliation Bye-Laws, which fixes
 * both their wording and their order. Values the school has not supplied yet are
 * `PENDING` so the page shows an obvious blank rather than a wrong figure — an
 * administrator fills them in under Admin → Mandatory disclosure, which is what
 * the live page reads. This module is only the seed and the fallback.
 */

import type { DisclosureContent } from "@/types/site";

/** Placeholder for a field the school still has to supply. */
export const PENDING = "—";

export const INITIAL_DISCLOSURE: DisclosureContent = {
  intro:
    "Gyanodaya Public School, Bagodar publishes the following information in the format prescribed by the Central Board of Secondary Education. Certified copies of every document listed below may be inspected at the school office during working hours.",
  updatedOn: "",

  // A — GENERAL INFORMATION
  general: [
    { id: "general-name", label: "Name of the school", value: "Gyanodaya Public School, Bagodar" },
    { id: "general-affiliation", label: "Affiliation number", value: PENDING },
    { id: "general-code", label: "School code", value: PENDING },
    {
      id: "general-address",
      label: "Complete address with pin code",
      value: "Bagodar, Giridih District – 825322, Jharkhand, India",
    },
    { id: "general-principal", label: "Principal name & qualification", value: PENDING },
    { id: "general-email", label: "School email id", value: "info@gpsbagodar.edu.in" },
    { id: "general-phone", label: "Contact details (landline/mobile)", value: "+91 94313 77488" },
  ],

  // B — DOCUMENTS AND INFORMATION
  documents: [
    { id: "doc-affiliation", label: "Copies of affiliation/upgradation letter and recent extension of affiliation, if any", url: "" },
    { id: "doc-trust", label: "Copies of societies/trust/company registration/renewal certificate, as applicable", url: "" },
    { id: "doc-noc", label: "Copy of no objection certificate (NOC) issued, if applicable, by the state government", url: "" },
    { id: "doc-rte", label: "Copies of recognition certificate under RTE Act, 2009, and its renewal if applicable", url: "" },
    { id: "doc-building", label: "Copy of valid building safety certificate as per the national building code", url: "" },
    { id: "doc-fire", label: "Copy of valid fire safety certificate issued by the competent authority", url: "" },
    {
      id: "doc-deo",
      label:
        "Copy of the DEO certificate submitted by the school for affiliation/upgradation/extension of affiliation or self certification by school",
      url: "",
    },
    { id: "doc-water", label: "Copies of valid water, health and sanitation certificates", url: "" },
  ],

  // C — RESULT AND ACADEMICS
  resultAcademics: [
    { id: "result-fee", label: "Fee structure of the school", url: "" },
    { id: "result-calendar", label: "Annual academic calendar", url: "" },
    { id: "result-smc", label: "List of school management committee (SMC)", url: "" },
    { id: "result-pta", label: "List of parents teachers association (PTA) members", url: "" },
    { id: "result-board", label: "Last three-year result of the board examination as per applicability", url: "" },
  ],

  classXResults: [
    { id: "x-2024", year: "2024–25", registered: PENDING, passed: PENDING, passPercentage: PENDING },
    { id: "x-2023", year: "2023–24", registered: PENDING, passed: PENDING, passPercentage: PENDING },
    { id: "x-2022", year: "2022–23", registered: PENDING, passed: PENDING, passPercentage: PENDING },
  ],

  classXiiResults: [
    { id: "xii-2024", year: "2024–25", registered: PENDING, passed: PENDING, passPercentage: PENDING },
    { id: "xii-2023", year: "2023–24", registered: PENDING, passed: PENDING, passPercentage: PENDING },
    { id: "xii-2022", year: "2022–23", registered: PENDING, passed: PENDING, passPercentage: PENDING },
  ],

  // D — STAFF (TEACHING)
  staff: [
    { id: "staff-principal", label: "Principal", value: PENDING },
    { id: "staff-total", label: "Total number of teachers", value: PENDING },
    { id: "staff-pgt", label: "PGT", value: PENDING },
    { id: "staff-tgt", label: "TGT", value: PENDING },
    { id: "staff-prt", label: "PRT", value: PENDING },
    { id: "staff-ratio", label: "Teachers section ratio", value: PENDING },
    { id: "staff-special-educator", label: "Details of special educator", value: PENDING },
    { id: "staff-counsellor", label: "Details of counsellor and wellness teacher", value: PENDING },
  ],

  // E — SCHOOL INFRASTRUCTURE
  infrastructure: [
    { id: "infra-campus", label: "Total campus area of the school (in square metres)", value: PENDING },
    { id: "infra-classrooms", label: "Number and size of the classrooms (in sq metres)", value: PENDING },
    {
      id: "infra-labs",
      label: "Number and size of laboratories including computer labs (in sq metres)",
      value: PENDING,
    },
    { id: "infra-internet", label: "Internet facility", value: "Yes" },
    { id: "infra-girls-toilets", label: "Number of girls toilets", value: PENDING },
    { id: "infra-boys-toilets", label: "Number of boys toilets", value: PENDING },
    {
      id: "infra-video",
      label: "Link of YouTube video of the inspection of school covering the infrastructure",
      value: PENDING,
    },
  ],

  declaration:
    "The school declares that the information published above is true to the best of its knowledge.",
  contactEmail: "info@gpsbagodar.edu.in",
  contactPhone: "+91 94313 77488",
};
