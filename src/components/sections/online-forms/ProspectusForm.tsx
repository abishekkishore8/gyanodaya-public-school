import { useState, type FormEvent } from "react";

import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { GREEN } from "@/lib/theme";
import { submitFormSubmission } from "@/lib/api";
import { createReferenceId, formatSubmittedAt, readField } from "@/lib/submissions";
import type { FormSubmissionItem } from "@/types/site";

const SUBMIT_DELAY_MS = 600;

/** Prospectus and fee-chart request form. */
export default function ProspectusForm() {
  
  const { showToast } = useToast();
  const { setAdmissionModalOpen } = useUi();

  const [prospectusForm, setProspectusForm] = useState({
    parentName: "",
    phone: "",
    email: "",
    grade: "Class I – V (Primary)",
  });
  const [prospectusSubmitting, setProspectusSubmitting] = useState(false);

  const handleProspectusSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const submitted = {
      ...prospectusForm,
      parentName: readField(formData, "parentName", prospectusForm.parentName),
      phone: readField(formData, "phone", prospectusForm.phone),
      email: readField(formData, "email", prospectusForm.email),
      grade: readField(formData, "grade", prospectusForm.grade),
    };

    if (!submitted.parentName || !submitted.phone) {
      showToast("Please provide parent name and contact number.");
      return;
    }

    setProspectusForm(submitted);
    setProspectusSubmitting(true);

    window.setTimeout(() => {
      const refId = createReferenceId("prospectus");

      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "prospectus",
        title: `Prospectus & Fee Chart Request (${submitted.grade})`,
        name: submitted.parentName,
        phone: submitted.phone,
        email: submitted.email || undefined,
        submittedAt: formatSubmittedAt(),
        status: "Approved",
        details: {
          "Parent Name": submitted.parentName,
          "Phone / WhatsApp": submitted.phone,
          "Email": submitted.email || "Not provided",
          "Target Wing / Class": submitted.grade,
        },
      };

      setProspectusSubmitting(false);

      void submitFormSubmission(newSubmission)
        .then(() => showToast("Prospectus details recorded! Opening admission details..."))
        .catch(() => showToast("Prospectus request failed. Please call the school office."));
      setAdmissionModalOpen(true);
    }, SUBMIT_DELAY_MS);
  };

  return (
    <form onSubmit={handleProspectusSubmit} className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
          Instant Prospectus & Fee Brochure Request
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Download the comprehensive GPS Bagodar School Prospectus (2025–26) containing curriculum highlights, fee slabs, transport routes, and code of conduct.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Parent / Guardian Name *
          </label>
          <input
            type="text"
            name="parentName"
            required
            value={prospectusForm.parentName}
            onChange={(e) => setProspectusForm({ ...prospectusForm, parentName: e.target.value })}
            placeholder="Your Name"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Mobile / WhatsApp Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={prospectusForm.phone}
            onChange={(e) => setProspectusForm({ ...prospectusForm, phone: e.target.value })}
            placeholder="+91 94313 XXXXX"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={prospectusForm.email}
            onChange={(e) => setProspectusForm({ ...prospectusForm, email: e.target.value })}
            placeholder="your.email@gmail.com"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Target Class / Wing
          </label>
          <select
            name="grade"
            value={prospectusForm.grade}
            onChange={(e) => setProspectusForm({ ...prospectusForm, grade: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          >
            <option value="Pre-Primary (Nursery - UKG)">Pre-Primary (Nursery - UKG)</option>
            <option value="Class I – V (Primary)">Class I – V (Primary)</option>
            <option value="Class VI – VIII (Middle Wing)">Class VI – VIII (Middle Wing)</option>
            <option value="Class IX – X (Secondary)">Class IX – X (Secondary)</option>
            <option value="Class XI – XII (Senior Secondary Science/Commerce/Arts)">Class XI – XII (Senior Secondary)</option>
          </select>
        </div>
      </div>

      {/* Features summary */}
      <div className="bg-[#f0faf5] p-4 rounded-xl border border-[#14452f]/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#14452f]">
        <span className="font-semibold">Fee Breakdown</span>
        <span className="font-semibold">Bus Route Map</span>
        <span className="font-semibold">Scholarship Slabs</span>
        <span className="font-semibold">STEM Labs Info</span>
      </div>

      <button
        type="submit"
        disabled={prospectusSubmitting}
        style={{ backgroundColor: GREEN }}
        className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
      >
        {prospectusSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating Brochure...</span>
          </>
        ) : (
          <>
            <span>Download GPS Prospectus & Fee Brochure (PDF)</span>
          </>
        )}
      </button>
    </form>
  );
}
