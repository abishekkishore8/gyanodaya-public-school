import type { ReactNode } from "react";

import { useSiteContent } from "@/context/SiteContentContext";
import { GOLD, GREEN } from "@/lib/theme";
import type { DisclosureDocumentItem, DisclosureFieldItem, DisclosureResultItem } from "@/types/site";

/** Lettered block heading, as the CBSE proforma numbers them. */
function Block({ letter, title, children }: { letter: string; title: string; children: ReactNode }) {
  return (
    <section className="mb-8 sm:mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span
          style={{ backgroundColor: GREEN }}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0"
        >
          {letter}
        </span>
        <h2 style={{ color: GREEN }} className="font-serif text-lg sm:text-xl md:text-2xl font-bold">
          {title}
        </h2>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">{children}</div>
    </section>
  );
}

/** Two-column label/value table. */
function InfoTable({ rows }: { rows: DisclosureFieldItem[] }) {
  return (
    <table className="w-full text-left text-xs sm:text-sm">
      <tbody className="divide-y divide-gray-100">
        {rows.map((row) => (
          <tr key={row.id} className="align-top even:bg-[#f9faf9]">
            <th scope="row" className="w-1/2 px-3 sm:px-5 py-3 font-semibold text-gray-700">
              {row.label}
            </th>
            <td className="px-3 sm:px-5 py-3 text-gray-600">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Document list: a link once the scan is published, otherwise where to get it. */
function DocumentTable({ documents }: { documents: DisclosureDocumentItem[] }) {
  return (
    <table className="w-full text-left text-xs sm:text-sm">
      <tbody className="divide-y divide-gray-100">
        {documents.map((doc) => (
          <tr key={doc.id} className="align-top even:bg-[#f9faf9]">
            <th scope="row" className="px-3 sm:px-5 py-3 font-semibold text-gray-700">
              {doc.label}
            </th>
            <td className="px-3 sm:px-5 py-3 whitespace-nowrap text-right">
              {doc.url ? (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: GREEN }}
                  className="font-semibold underline underline-offset-2 hover:text-[#c59a3f] transition-colors"
                >
                  View ↗
                </a>
              ) : (
                <span className="text-gray-400">Available at the school office</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Board result table for one class. */
function ResultTable({ title, rows }: { title: string; rows: DisclosureResultItem[] }) {
  return (
    <div>
      <p
        style={{ backgroundColor: GREEN }}
        className="px-3 sm:px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-white"
      >
        {title}
      </p>
      <table className="w-full text-left text-xs sm:text-sm">
        <thead>
          <tr className="bg-[#f4f8f5] text-gray-700">
            <th scope="col" className="px-3 sm:px-5 py-2.5 font-semibold">Year</th>
            <th scope="col" className="px-3 sm:px-5 py-2.5 font-semibold">Registered</th>
            <th scope="col" className="px-3 sm:px-5 py-2.5 font-semibold">Passed</th>
            <th scope="col" className="px-3 sm:px-5 py-2.5 font-semibold">Pass %</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.id} className="even:bg-[#f9faf9] text-gray-600">
              <td className="px-3 sm:px-5 py-3 font-semibold text-gray-700">{row.year}</td>
              <td className="px-3 sm:px-5 py-3">{row.registered}</td>
              <td className="px-3 sm:px-5 py-3">{row.passed}</td>
              <td className="px-3 sm:px-5 py-3">{row.passPercentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * CBSE mandatory public disclosure, in the order the proforma prescribes.
 *
 * Every figure comes from the site document, so the school maintains this page
 * under Admin → Mandatory disclosure.
 */
export default function MandatoryDisclosure() {
  const { disclosure } = useSiteContent();

  return (
    <section id="mandatory-disclosure" className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8">

        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <p style={{ color: GOLD }} className="text-xs font-bold uppercase tracking-[0.2em] mb-1">
            CBSE AFFILIATION BYE-LAWS · APPENDIX IX
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Mandatory Public Disclosure
          </h1>
          {disclosure.intro && (
            <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {disclosure.intro}
            </p>
          )}
          {disclosure.updatedOn && (
            <p className="mt-2 text-[11px] text-gray-400">Last updated: {disclosure.updatedOn}</p>
          )}
        </div>

        <Block letter="A" title="General Information">
          <InfoTable rows={disclosure.general} />
        </Block>

        <Block letter="B" title="Documents and Information">
          <DocumentTable documents={disclosure.documents} />
        </Block>

        <Block letter="C" title="Result and Academics">
          <DocumentTable documents={disclosure.resultAcademics} />
        </Block>

        <div className="mb-8 sm:mb-10 grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <ResultTable title="Result — Class X" rows={disclosure.classXResults} />
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <ResultTable title="Result — Class XII" rows={disclosure.classXiiResults} />
          </div>
        </div>

        <Block letter="D" title="Staff (Teaching)">
          <InfoTable rows={disclosure.staff} />
        </Block>

        <Block letter="E" title="School Infrastructure">
          <InfoTable rows={disclosure.infrastructure} />
        </Block>

        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-5">
          {disclosure.declaration} For any clarification, write to{" "}
          <a
            href={`mailto:${disclosure.contactEmail}`}
            className="font-semibold text-[#14452f] underline underline-offset-2"
          >
            {disclosure.contactEmail}
          </a>{" "}
          or call{" "}
          <a
            href={`tel:${disclosure.contactPhone.replace(/\s+/g, "")}`}
            className="font-semibold text-[#14452f] underline underline-offset-2"
          >
            {disclosure.contactPhone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
