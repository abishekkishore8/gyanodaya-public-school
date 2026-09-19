import { useEffect, useState, type FormEvent } from "react";

import { useSiteContent } from "@/context/SiteContentContext";
import { useToast } from "@/context/ToastContext";
import { useUi } from "@/context/UiContext";
import { GOLD } from "@/lib/theme";
import { submitFormSubmission } from "@/lib/api";
import { createReferenceId, formatSubmittedAt, readField, streamSuffixFor } from "@/lib/submissions";
import type { FormSubmissionItem } from "@/types/site";

const SUBMIT_DELAY_MS = 800;

/** Full online admission application. */
export default function AdmissionForm() {
  const { academicSession } = useSiteContent();
  const { showToast } = useToast();
  const { setSubmissionReceipt } = useUi();

  const [admissionForm, setAdmissionForm] = useState({
    studentName: "",
    dob: "",
    gender: "Male",
    grade: "Class I",
    stream: "Science (PCM)",
    session: academicSession,
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    phone: "",
    email: "",
    address: "",
    city: "Bagodar, Giridih",
    prevSchool: "",
    prevPercentage: "",
    needTransport: "Yes",
    needHostel: "No",
    remarks: "",
    agreed: true,
  });
  const [admissionSubmitting, setAdmissionSubmitting] = useState(false);

  // The admin can change the active session while the form is on screen.
  useEffect(() => {
    setAdmissionForm((prev) => ({ ...prev, session: academicSession }));
  }, [academicSession]);

  const handleOnlineAdmissionSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const submitted = {
      ...admissionForm,
      studentName: readField(formData, "studentName", admissionForm.studentName),
      dob: readField(formData, "dob", admissionForm.dob),
      gender: readField(formData, "gender", admissionForm.gender),
      grade: readField(formData, "grade", admissionForm.grade),
      stream: readField(formData, "stream", admissionForm.stream),
      fatherName: readField(formData, "fatherName", admissionForm.fatherName),
      fatherOccupation: readField(formData, "fatherOccupation", admissionForm.fatherOccupation),
      motherName: readField(formData, "motherName", admissionForm.motherName),
      phone: readField(formData, "phone", admissionForm.phone),
      email: readField(formData, "email", admissionForm.email),
      address: readField(formData, "address", admissionForm.address),
      city: readField(formData, "city", admissionForm.city),
      prevSchool: readField(formData, "prevSchool", admissionForm.prevSchool),
      prevPercentage: readField(formData, "prevPercentage", admissionForm.prevPercentage),
      needTransport: readField(formData, "needTransport", admissionForm.needTransport),
      agreed: Boolean(formData.get("agreed")),
    };

    if (!submitted.studentName || !submitted.phone || !submitted.fatherName) {
      showToast("⚠️ Please fill in student name, primary phone, and father/guardian name.");
      return;
    }

    setAdmissionForm(submitted);
    setAdmissionSubmitting(true);

    window.setTimeout(() => {
      const refId = createReferenceId("admission");
      const streamSuffix = streamSuffixFor(submitted.grade, submitted.stream);
      const submittedAt = formatSubmittedAt();

      const newSubmission: FormSubmissionItem = {
        id: refId,
        type: "admission",
        title: `${submitted.grade}${streamSuffix} Admission Application`,
        name: submitted.studentName,
        phone: submitted.phone,
        email: submitted.email || undefined,
        submittedAt,
        status: "Pending",
        details: {
          "Student Name": submitted.studentName,
          "Applying For": `${submitted.grade}${streamSuffix}`,
          "Gender": submitted.gender,
          "Date of Birth": submitted.dob || "Not specified",
          "Session": submitted.session,
          "Father/Guardian": `${submitted.fatherName} (${submitted.fatherOccupation || "Not specified"})`,
          "Mother Name": submitted.motherName || "Not specified",
          "Phone / WhatsApp": submitted.phone,
          "Email": submitted.email || "Not specified",
          "Residential Address": `${submitted.address}, ${submitted.city}`,
          "Previous School": submitted.prevSchool
            ? `${submitted.prevSchool} (Marks: ${submitted.prevPercentage || "N/A"})`
            : "New Admission / Pre-Primary",
          "School Bus Transport": submitted.needTransport,
          "Hostel Facility": submitted.needHostel,
          "Remarks / Talents": submitted.remarks.trim() || "None",
        },
      };

      setAdmissionSubmitting(false);
      setSubmissionReceipt({
        id: refId,
        type: "Online Admission Application",
        title: `Application for ${submitted.grade}${streamSuffix}`,
        applicantName: submitted.studentName,
        phone: submitted.phone,
        date: submittedAt,
        keyDetails: [
          { label: "Reference Number", value: refId },
          { label: "Target Class / Stream", value: `${submitted.grade}${streamSuffix}` },
          { label: "Parent / Contact", value: `${submitted.fatherName} (${submitted.phone})` },
          { label: "School Transport", value: submitted.needTransport },
          { label: "Next Step", value: "Counselor callback & campus document verification within 24h" },
        ],
      });

      void submitFormSubmission(newSubmission)
        .then(() => showToast(`🎉 Admission application ${refId} submitted successfully!`))
        .catch(() => showToast("⚠️ Admission submission failed. Please call the school office."));
    }, SUBMIT_DELAY_MS);
  };

  return (
    <form onSubmit={handleOnlineAdmissionSubmit} className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#14452f]">
          Student Online Registration (Session {admissionForm.session})
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Apply online for Pre-Primary (Nursery, LKG, UKG), Primary, Middle, Secondary, and Senior Secondary (Science, Commerce, Arts).
        </p>
      </div>

      {/* Section: Student Profile */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          1. Student Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              name="studentName"
              required
              value={admissionForm.studentName}
              onChange={(e) => setAdmissionForm({ ...admissionForm, studentName: e.target.value })}
              placeholder="e.g. Aryan Kumar Sharma"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Gender *
            </label>
            <select
              name="gender"
              value={admissionForm.gender}
              onChange={(e) => setAdmissionForm({ ...admissionForm, gender: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={admissionForm.dob}
              onChange={(e) => setAdmissionForm({ ...admissionForm, dob: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Class Applying For *
            </label>
            <select
              name="grade"
              value={admissionForm.grade}
              onChange={(e) => setAdmissionForm({ ...admissionForm, grade: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            >
              <option value="Nursery">Nursery (Play Group)</option>
              <option value="LKG">LKG (Lower Kindergarten)</option>
              <option value="UKG">UKG (Upper Kindergarten)</option>
              <option value="Class I">Class I</option>
              <option value="Class II">Class II</option>
              <option value="Class III">Class III</option>
              <option value="Class IV">Class IV</option>
              <option value="Class V">Class V</option>
              <option value="Class VI">Class VI</option>
              <option value="Class VII">Class VII</option>
              <option value="Class VIII">Class VIII</option>
              <option value="Class IX">Class IX</option>
              <option value="Class X">Class X</option>
              <option value="Class XI (Senior Secondary)">Class XI (Senior Secondary)</option>
              <option value="Class XII">Class XII</option>
            </select>
          </div>

          {(admissionForm.grade.includes("XI") || admissionForm.grade.includes("XII")) && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Stream Preference
              </label>
              <select
                name="stream"
                value={admissionForm.stream}
                onChange={(e) => setAdmissionForm({ ...admissionForm, stream: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
              >
                <option value="Science (PCM + CS/PE)">Science (PCM + CS/PE)</option>
                <option value="Science (PCB + Biotech/PE)">Science (PCB + Biotech/PE)</option>
                <option value="Commerce (Accounts, Eco, BST, Math/IP)">Commerce (Accounts, Eco, BST, Math/IP)</option>
                <option value="Humanities / Arts (Hist, Pol Sci, Geog, Eco)">Humanities / Arts (Hist, Pol Sci, Geog, Eco)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Section: Parent Information */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          2. Parent / Guardian Contact Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Father / Guardian Name *
            </label>
            <input
              type="text"
              name="fatherName"
              required
              value={admissionForm.fatherName}
              onChange={(e) => setAdmissionForm({ ...admissionForm, fatherName: e.target.value })}
              placeholder="e.g. Ramesh Chandra Sharma"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Father Occupation
            </label>
            <input
              type="text"
              name="fatherOccupation"
              value={admissionForm.fatherOccupation}
              onChange={(e) => setAdmissionForm({ ...admissionForm, fatherOccupation: e.target.value })}
              placeholder="e.g. Business / Govt Service"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Mother Name
            </label>
            <input
              type="text"
              name="motherName"
              value={admissionForm.motherName}
              onChange={(e) => setAdmissionForm({ ...admissionForm, motherName: e.target.value })}
              placeholder="e.g. Meena Devi"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Primary Mobile / WhatsApp Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={admissionForm.phone}
              onChange={(e) => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
              placeholder="e.g. +91 94313 77488"
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
              value={admissionForm.email}
              onChange={(e) => setAdmissionForm({ ...admissionForm, email: e.target.value })}
              placeholder="e.g. parent@gmail.com"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              City / Block / District
            </label>
            <input
              type="text"
              name="city"
              value={admissionForm.city}
              onChange={(e) => setAdmissionForm({ ...admissionForm, city: e.target.value })}
              placeholder="e.g. Bagodar, Giridih"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Residential Address / Village
            </label>
            <input
              type="text"
              name="address"
              value={admissionForm.address}
              onChange={(e) => setAdmissionForm({ ...admissionForm, address: e.target.value })}
              placeholder="e.g. GT Road, Near SBI Bagodar Branch, Bagodar"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Section: Academic Background & Facilities */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          3. Facilities & Previous School
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Previous School Attended (if any)
            </label>
            <input
              type="text"
              name="prevSchool"
              value={admissionForm.prevSchool}
              onChange={(e) => setAdmissionForm({ ...admissionForm, prevSchool: e.target.value })}
              placeholder="e.g. St. Joseph Convent School"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Previous Grade / %
            </label>
            <input
              type="text"
              name="prevPercentage"
              value={admissionForm.prevPercentage}
              onChange={(e) => setAdmissionForm({ ...admissionForm, prevPercentage: e.target.value })}
              placeholder="e.g. 88.5% or Grade A"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              School Bus Transport?
            </label>
            <select
              name="needTransport"
              value={admissionForm.needTransport}
              onChange={(e) => setAdmissionForm({ ...admissionForm, needTransport: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#14452f] focus:bg-white"
            >
              <option value="Yes">Yes (Bus Route Required)</option>
              <option value="No">No (Self Conveyance)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Declaration Checkbox */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-start gap-2.5">
        <input
          type="checkbox"
          id="admission-agreed"
          name="agreed"
          required
          checked={admissionForm.agreed}
          onChange={(e) => setAdmissionForm({ ...admissionForm, agreed: e.target.checked })}
          className="mt-0.5 rounded text-[#14452f] focus:ring-[#14452f] cursor-pointer"
        />
        <label htmlFor="admission-agreed" className="cursor-pointer">
          I hereby declare that all information submitted in this application is true and complete to the best of my knowledge. I agree to comply with the rules and admission policies of Gyanodaya Public School (GPS), Bagodar.
        </label>
      </div>

      <button
        type="submit"
        disabled={admissionSubmitting}
        style={{ backgroundColor: GOLD }}
        className="w-full text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
      >
        {admissionSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Submitting Registration...</span>
          </>
        ) : (
          <>
            <span>Submit Online Admission Application ↗</span>
          </>
        )}
      </button>
    </form>
  );
}
