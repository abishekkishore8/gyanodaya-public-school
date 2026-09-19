import { useState, type FormEvent } from "react";

import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { GREEN } from "@/lib/theme";
import { submitFormSubmission } from "@/lib/api";
import { createReferenceId, formatSubmittedAt, readField } from "@/lib/submissions";
import type { FormSubmissionItem } from "@/types/site";

const SUBMIT_DELAY_MS = 700;

/** General and academic enquiry form. */
export default function EnquiryForm() {
  
  const { showToast } = useToast();
  const { setSubmissionReceipt } = useUi();

  const [generalEnquiryForm, setGeneralEnquiryForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "Fee Structure & Payment Schedule",
    grade: "Class VI",
    message: "",
    contactMode: "Phone Call",
    bestTime: "Morning (9:00 AM – 12:00 PM)",
  });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);

  const handleGeneralEnquirySubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const submitted = {
      ...generalEnquiryForm,
      fullName: readField(formData, "fullName", generalEnquiryForm.fullName),
      phone: readField(formData, "phone", generalEnquiryForm.phone),
      email: readField(formData, "email", generalEnquiryForm.email),
      subject: readField(formData, "subject", generalEnquiryForm.subject),
      contactMode: readField(formData, "contactMode", generalEnquiryForm.contactMode),
      message: readField(formData, "message", generalEnquiryForm.message),
    };

    if (!submitted.fullName || !submitted.phone || !submitted.message) {
      showToast("⚠️ Please provide full name, contact number, and your message.");
      return;
    }

    setGeneralEnquiryForm(submitted);
    setEnquirySubmitting(true);

    window.setTimeout(() => {
      const refId = createReferenceId("enquiry");
      const submittedAt = formatSubmittedAt();

      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "enquiry",
        title: submitted.subject,
        name: submitted.fullName,
        phone: submitted.phone,
        email: submitted.email || undefined,
        submittedAt,
        status: "Pending",
        details: {
          "Inquirer Name": submitted.fullName,
          "Subject Topic": submitted.subject,
          "Grade of Interest": submitted.grade,
          "Contact Number": submitted.phone,
          "Email Address": submitted.email || "Not provided",
          "Message": submitted.message,
          "Preferred Contact Mode": submitted.contactMode,
          "Best Time to Connect": submitted.bestTime,
        },
      };

      setEnquirySubmitting(false);
      setSubmissionReceipt({
        id: refId,
        type: "General & Academic Enquiry",
        title: submitted.subject,
        applicantName: submitted.fullName,
        phone: submitted.phone,
        date: submittedAt,
        keyDetails: [
          { label: "Enquiry ID", value: refId },
          { label: "Enquiry Topic", value: submitted.subject },
          { label: "Preferred Mode", value: submitted.contactMode },
          { label: "Preferred Time", value: submitted.bestTime },
          { label: "Expected Response", value: "Within 2 to 4 working hours by GPS helpdesk" },
        ],
      });

      void submitFormSubmission(newSubmission)
        .then(() => showToast(`✅ Enquiry ${refId} received! Helpdesk will connect with you.`))
        .catch(() => showToast("⚠️ Enquiry submission failed. Please call the school office."));
    }, SUBMIT_DELAY_MS);
  };

  return (
    <form onSubmit={handleGeneralEnquirySubmit} className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
          General & Academic Enquiry
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Have questions about fee structure, bus routes, syllabus, or facilities? Submit your query and our team will get back to you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={generalEnquiryForm.fullName}
            onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, fullName: e.target.value })}
            placeholder="Your Full Name"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Contact Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={generalEnquiryForm.phone}
            onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, phone: e.target.value })}
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
            value={generalEnquiryForm.email}
            onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, email: e.target.value })}
            placeholder="email@domain.com"
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Enquiry Subject / Category *
          </label>
          <select
            name="subject"
            value={generalEnquiryForm.subject}
            onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, subject: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          >
            <option value="Fee Structure & Payment Schedule">Fee Structure & Payment Schedule</option>
            <option value="Admission Eligibility & Guidelines">Admission Eligibility & Guidelines</option>
            <option value="School Bus Routes & Transport Details">School Bus Routes & Transport Details</option>
            <option value="Hostel & Boarding Facilities">Hostel & Boarding Facilities</option>
            <option value="Academic Curriculum & Board Affiliation">Academic Curriculum & Board Affiliation</option>
            <option value="Sports & Extra-Curricular Facilities">Sports & Extra-Curricular Facilities</option>
            <option value="Transfer Certificate (TC) & Bonafide">Transfer Certificate (TC) & Bonafide</option>
            <option value="Other Questions / Feedback">Other Questions / Feedback</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Preferred Contact Mode
          </label>
          <select
            name="contactMode"
            value={generalEnquiryForm.contactMode}
            onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, contactMode: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          >
            <option value="Phone Call">Phone Call</option>
            <option value="WhatsApp Message">WhatsApp Message</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div className="sm:col-span-2 md:col-span-3">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Your Message / Specific Question *
          </label>
          <textarea
            required
            name="message"
            rows={4}
            value={generalEnquiryForm.message}
            onChange={(e) => setGeneralEnquiryForm({ ...generalEnquiryForm, message: e.target.value })}
            placeholder="Please describe your query in detail..."
            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={enquirySubmitting}
        style={{ backgroundColor: GREEN }}
        className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
      >
        {enquirySubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Submitting Enquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Enquiry & Request Callback ↗</span>
          </>
        )}
      </button>
    </form>
  );
}
