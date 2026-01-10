import React, { useState } from "react";

export default function FormPage() {
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [campusResidence, setCampusResidence] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSddbpHxC7GV1caA1bdTUrdEElLjZKE2bUuHLVSF3UwfWNjcAg/viewform?usp=pp_url
      &entry.768985514=${encodeURIComponent(surname)}
      &entry.692787792=${encodeURIComponent(otherNames)}
      &entry.1544278846=${encodeURIComponent(dob)}
      &entry.476705980=${encodeURIComponent(age)}
      &entry.1488099661=${encodeURIComponent(email)}
      &entry.1619320725=${encodeURIComponent(phoneNumber)}
      &entry.547921972=${encodeURIComponent(college)}
      &entry.1899443147=${encodeURIComponent(program)}
      &entry.581633642=${encodeURIComponent(academicLevel)}
      &entry.1795880254=${encodeURIComponent(campusResidence)}`;

    window.location.href = formUrl;
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Membership Registration
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Join Engineers Without Borders – KNUST and be part of impactful
            engineering projects that transform lives.
          </p>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About Engineers Without Borders – KNUST
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Engineers Without Borders KNUST builds a better world through
              engineering projects that empower communities to meet their basic
              human needs. Our highly skilled volunteers work closely with
              communities to develop appropriate and sustainable infrastructure
              solutions.
            </p>

            <p>
              Invest your time where it will have the most impact. By lending
              your passion and expertise, you help us build strong, sustainable
              communities around the world.
            </p>

            <p>
              Currently, the Engineers Without Borders KNUST chapter is
              undertaking four major projects: <strong>Kitchen Stove</strong>,{" "}
              <strong>Clinic</strong>, <strong>Water</strong>, and{" "}
              <strong>RWC/Irrigation</strong>. These initiatives are aimed at
              bringing smiles to the people of Ullo in the Upper West Region of
              Ghana.
            </p>

            <p>
              Joining EWB-KNUST exposes you to numerous opportunities and
              privileges while giving you a platform to practically apply your
              engineering principles.
            </p>
          </div>

          {/* Payment Info */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Membership Dues & Payment
            </h3>

            <p className="text-gray-700 mb-4">
              Membership dues are <strong>GH₵25.00 per semester</strong>. A
              minimum of <strong>20% (GH₵5.00)</strong> is required to complete
              your registration, with the remaining balance payable later.
            </p>

            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>
                Send payment to <strong>059-582-6411</strong> (EWB-KNUST).
              </li>
              <li>
                Reference your payment with your <strong>name</strong> or the
                keyword <strong>“Membership”</strong>.
              </li>
              <li>Confirm your payment by calling:</li>
            </ol>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>📞 059 582 6411 – Office Line</p>
              <p>📞 055 952 9184</p>
              <p>📞 020 418 3541</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              ["Surname", surname, setSurname, "text"],
              ["Other Names", otherNames, setOtherNames, "text"],
              ["Date of Birth", dob, setDob, "date"],
              ["Age", age, setAge, "number"],
              ["Email", email, setEmail, "email"],
              ["Phone Number", phoneNumber, setPhoneNumber, "tel"],
            ].map(([label, value, setter, type]) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            ))}

            {/* College */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College <span className="text-red-500">*</span>
              </label>
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select College</option>
                <option value="Engineering">Engineering</option>
                <option value="Sciences">Science</option>
                <option value="Arts">Art & Built Environment</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Health Sciences">Health Sciences</option>
                <option value="Humanities">Humanities</option>
              </select>
            </div>

            {/* Program */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Academic Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Level <span className="text-red-500">*</span>
              </label>
              <select
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select Level</option>
                <option value="100">First Year</option>
                <option value="200">Second Year</option>
                <option value="300">Third Year</option>
                <option value="400">Fourth Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            {/* Campus Residence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campus Residence <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={campusResidence}
                onChange={(e) => setCampusResidence(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center mt-10">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white
                           px-12 py-4 rounded-full font-semibold
                           shadow-lg hover:shadow-xl transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
