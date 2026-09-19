import { useState, type FormEvent } from "react";

import SchoolLogo from "@/components/common/SchoolLogo";
import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { submitFormSubmission } from "@/lib/api";
import { createReferenceId, formatSubmittedAt, readField } from "@/lib/submissions";
import { GOLD, GREEN } from "@/lib/theme";
import type { FormSubmissionItem } from "@/types/site";

const SUBMIT_DELAY_MS = 1200;

const EMPTY_ENQUIRY = {
  studentName: "",
  grade: "Grade 1 - 5",
  parentName: "",
  phone: "",
  email: "",
};

/** Short admission enquiry captured from the site-wide "Enquire" buttons. */
export default function AdmissionEnquiryModal() {
  const { academicSession } = useSiteContent();
  const { showToast } = useToast();
  const { admissionModalOpen, setAdmissionModalOpen } = useUi();

  const [enquiryForm, setEnquiryForm] = useState(EMPTY_ENQUIRY);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEnquirySubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const submitted = {
      ...enquiryForm,
      studentName: readField(formData, "studentName", enquiryForm.studentName),
      grade: readField(formData, "grade", enquiryForm.grade),
      parentName: readField(formData, "parentName", enquiryForm.parentName),
      phone: readField(formData, "phone", enquiryForm.phone),
      email: readField(formData, "email", enquiryForm.email),
    };

    if (!submitted.studentName || !submitted.parentName || !submitted.phone) {
      showToast("⚠️ Please provide student name, parent name, and phone number.");
      return;
    }

    setEnquiryForm(submitted);
    setFormSubmitted(true);

    window.setTimeout(() => {
      const refId = createReferenceId("admissionEnquiry");

      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "admission",
        title: `Admission Enquiry (${submitted.grade})`,
        name: submitted.studentName,
        phone: submitted.phone,
        email: submitted.email || undefined,
        submittedAt: formatSubmittedAt(),
        status: "Pending",
        details: {
          "Student Name": submitted.studentName,
          "Grade Applying For": submitted.grade,
          "Parent / Guardian Name": submitted.parentName,
          "Phone Number": submitted.phone,
          "Email Address": submitted.email || "Not provided",
          "Session": academicSession,
          "Source": "Admission Enquiry Modal",
        },
      };

      void submitFormSubmission(newSubmission)
        .then(() => showToast(`🎉 Admission enquiry ${refId} submitted successfully!`))
        .catch(() => showToast("⚠️ Admission enquiry failed. Please call the school office."));

      setFormSubmitted(false);
      setAdmissionModalOpen(false);
      setEnquiryForm(EMPTY_ENQUIRY);
      showToast("🎉 Thank you! Your admission enquiry has been submitted. Our counselor will contact you shortly.");
    }, SUBMIT_DELAY_MS);
  };

  if (!admissionModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in-up"
      onClick={() => setAdmissionModalOpen(false)}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 sm:p-8 relative border border-gray-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAdmissionModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <SchoolLogo className="w-10 h-10" />
          <div>
            <h3 style={{ color: GREEN }} className="font-serif font-bold text-lg sm:text-2xl">
              Admission Enquiry
            </h3>
              <p className="text-gray-500 text-xs">
                Academic Session {academicSession} • Nursery to Class XII
            </p>
          </div>
        </div>

        {formSubmitted ? (
          <div className="py-8 text-center animate-scale-in">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h4 className="font-serif font-bold text-xl text-gray-900 mb-1">
              Enquiry Submitted!
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              Our admissions counselor will call you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleEnquirySubmit} className="space-y-3 sm:space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Student's Full Name *
              </label>
              <input
                type="text"
                name="studentName"
                required
                placeholder="Enter student's name"
                value={enquiryForm.studentName}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, studentName: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Grade Applying For *
                </label>
                <select
                  name="grade"
                  value={enquiryForm.grade}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, grade: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] bg-white"
                >
                  <option>Pre-Primary (Nursery - UKG)</option>
                  <option>Grade 1 - 5 (Primary)</option>
                  <option>Grade 6 - 8 (Middle)</option>
                  <option>Grade 9 - 10 (Secondary)</option>
                  <option>Grade 11 - 12 (Senior Secondary)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  name="parentName"
                  required
                  placeholder="Enter parent's name"
                  value={enquiryForm.parentName}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, parentName: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="parent@example.com"
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#14452f]"
                />
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: GOLD }}
              className="w-full text-white font-bold py-3 rounded text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-md mt-4 cursor-pointer"
            >
              Submit Admission Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
