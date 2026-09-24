import { useState } from "react";

import { useHashTab } from "@/hooks/useHashTab";
import { GOLD } from "@/lib/theme";

import AdmissionForm from "./AdmissionForm";
import CampusVisitForm from "./CampusVisitForm";
import EnquiryForm from "./EnquiryForm";
import ProspectusForm from "./ProspectusForm";

type OnlineFormTab = "admission" | "enquiry" | "visit" | "prospectus";

const FORM_TABS: { id: OnlineFormTab; label: string }[] = [
  { id: "admission", label: "Admission Form" },
  { id: "enquiry", label: "General Enquiry" },
  { id: "visit", label: "Campus Visit" },
  { id: "prospectus", label: "Prospectus" },
];

/** Tab ids, for deep-linking from the navigation (`/online-forms#enquiry`). */
const FORM_TAB_IDS: readonly OnlineFormTab[] = FORM_TABS.map((tab) => tab.id);

/** Tabbed portal hosting the four public online forms alongside contact details. */
export default function OnlineForms() {
  const [activeFormTab, setActiveFormTab] = useState<OnlineFormTab>("admission");

  // `/online-forms#enquiry` and friends open straight onto that form.
  useHashTab(FORM_TAB_IDS, setActiveFormTab);

  return (
    <section id="online-forms" className="py-16 sm:py-24 bg-gradient-to-b from-[#f8faf8] via-[#f3f7f4] to-white border-t border-gray-200 relative overflow-hidden">
      {/* Background Subtle Institutional Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#14452f_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span
            style={{ color: GOLD }}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] inline-block mb-2 bg-[#dfb455]/10 px-3 py-1 rounded-full border border-[#dfb455]/30"
          >
            ADMISSIONS, ENQUIRIES & CAMPUS VISITS
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mt-1">
            Online Application & Service Forms
          </h2>
          <div className="w-16 h-1 bg-[#14452f] mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            Complete your student registration, schedule a guided campus tour, or submit an academic enquiry directly to the school administrative cell.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Quick Info & Document Checklist (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Helpline & Hours Card */}
            <div className="bg-[#14452f] text-white p-6 rounded-2xl shadow-xl border-2 border-[#dfb455]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#dfb455]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="mb-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#dfb455]">
                    Admission Helpline
                  </h3>
                  <p className="text-xs text-gray-300">Direct Support & Desk Assistance</p>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-white/15 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Calling Line:</span>
                  <a href="tel:+919431377488" className="font-bold text-white hover:text-[#dfb455]">
                    +91 94313 77488
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">WhatsApp Desk:</span>
                  <a href="https://wa.me/919431377488" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 hover:underline">
                    +91 94313 77488
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Email:</span>
                  <span className="font-mono text-gray-200 truncate">admissions@gpsbagodar.edu.in</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Desk Hours:</span>
                  <span className="font-medium text-white">Mon–Sat: 8:00 AM – 3:30 PM</span>
                </div>
              </div>
            </div>

            {/* Documents Checklist Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md">
              <div className="mb-4 text-[#14452f]">
                <h4 className="font-serif font-bold text-sm uppercase tracking-wider">
                  Required Documents Checklist
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-600">
                {[
                  "Original Municipal / Panchayat Birth Certificate",
                  "4 Recent Passport-size Photographs of Student",
                  "2 Passport-size Photographs of Parents / Guardian",
                  "Previous Year Report Card / Marks Sheet (Class II+)",
                  "Original Transfer Certificate (TC) from recognized school",
                  "Copy of Student & Parents Aadhaar Card",
                  "Blood Group & Medical Fitness Certificate",
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campus Location Card */}
            <div className="bg-[#f0faf5] p-5 rounded-2xl border border-[#14452f]/20">
              <div>
                <div className="text-xs">
                  <h5 className="font-bold text-[#14452f] mb-1">GPS Bagodar Campus</h5>
                  <p className="text-gray-600 leading-relaxed">
                    National Highway 19 (Grand Trunk Road), Bagodar, Dist: Giridih, Jharkhand – 825322
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Tabbed Interactive Form Portal (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden">
            {/* Form Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-100/90 p-1.5 border-b border-gray-200">
              {FORM_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFormTab(tab.id)}
                  className={`py-3 px-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                    activeFormTab === tab.id
                      ? "bg-white text-[#14452f] shadow-md border border-gray-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Form Content Body */}
            <div className="p-6 sm:p-8">
              {activeFormTab === "admission" && <AdmissionForm />}
              {activeFormTab === "enquiry" && <EnquiryForm />}
              {activeFormTab === "visit" && <CampusVisitForm />}
              {activeFormTab === "prospectus" && <ProspectusForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
