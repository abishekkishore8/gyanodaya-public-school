import { useState } from "react";

import { FAQS } from "@/data/faqs";
import { GOLD, GREEN } from "@/lib/theme";

/** Accordion of frequently asked admission and campus questions. */
export default function Faqs() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-14 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-[900px] mx-auto px-4 sm:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <p
            style={{ color: GOLD }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
          >
            HAVE QUESTIONS?
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#14452f]"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50/70 hover:bg-gray-100 flex items-center justify-between gap-3 sm:gap-4 font-semibold text-xs sm:text-base text-gray-800 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    style={{ color: GREEN }}
                    className={`text-lg font-bold transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-slide-down">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
