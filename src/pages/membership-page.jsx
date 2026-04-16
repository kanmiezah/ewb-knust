import React, { useState } from "react";
import { ArrowUpRight, CheckCircle, Loader2, RotateCcw } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import ActionCall from "../components/home/actioncall-home";

export default function MembershipPage() {
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

  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | loading | success | error

  const resetForm = () => {
    setSurname(""); setOtherNames(""); setDob(""); setAge("");
    setEmail(""); setPhoneNumber(""); setCollege(""); setProgram("");
    setAcademicLevel(""); setCampusResidence("");
    setSubmitStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");

    const formData = new URLSearchParams();
    formData.append("entry.768985514", surname);
    formData.append("entry.692787792", otherNames);
    formData.append("entry.1544278846", dob);
    formData.append("entry.476705980", age);
    formData.append("entry.1488099661", email);
    formData.append("entry.1619320725", phoneNumber);
    formData.append("entry.547921972", college);
    formData.append("entry.1899443147", program);
    formData.append("entry.581633642", academicLevel);
    formData.append("entry.1795880254", campusResidence);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSddbpHxC7GV1caA1bdTUrdEElLjZKE2bUuHLVSF3UwfWNjcAg/formResponse",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );
      setSubmitStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="bg-[#117DBE]">
      <Helmet>
        <title>Join EWB-KNUST — Membership</title>
        <meta name="description" content="Join Engineers Without Borders KNUST and be part of a team building sustainable engineering solutions for communities in Ghana. Register and pay your dues online." />
      </Helmet>
      <div className="pt-28 pb-36 sm:pt-32 sm:pb-40 md:pt-36 md:pb-56 overflow-hidden relative w-full text-center px-6">
         <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/60 block mb-5 relative z-10">
            Get Involved
         </span>
         <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] font-medium text-white tracking-tight leading-[1.08] relative z-10">
            Join the team.
         </h1>
         {/* Subtle gradient overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#1A95E0]/40 via-transparent to-[#0D6294]/30 pointer-events-none" />
      </div>

      {/* Overlapping white card wrapper */}
      <div className="relative z-20 -mt-16 md:-mt-24 w-full bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <section className="py-20 md:py-28 px-6 w-full">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* About Section */}
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#117DBE] uppercase mb-4 block">
                  Why Join Us
                </span>
                <h2 className="text-3xl font-medium text-[#111] leading-tight mb-6">
                  Build a better <br className="hidden md:block"/> world with us.
                </h2>
                <div className="space-y-4 text-lg text-black/60 leading-[1.8] font-light">
                  <p>
                    Engineers Without Borders KNUST builds a better world through
                    engineering projects that empower communities to meet their basic
                    human needs. 
                  </p>
                  <p>
                    Currently, the EWB-KNUST chapter is
                    undertaking major projects including Kitchen Stoves,
                    Clinics, Water tracking, and Irrigation. These initiatives are aimed at
                    bringing smiles to the people of Ullo in the Upper West Region.
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-[#F5F5F3] rounded-[2rem] p-8 md:p-10 shadow-sm flex flex-col justify-center">
                <h3 className="text-xl font-medium text-[#111] mb-4">
                  Dues & Payment
                </h3>
                <p className="text-[17px] leading-[1.7] text-black/60 mb-6">
                  Membership dues are <strong>GH₵25.00 per semester</strong>. A
                  minimum of <strong>GH₵5.00</strong> is required to complete
                  registration.
                </p>

                <ul className="space-y-3 text-[17px] text-black/60 leading-[1.6] mb-6 pl-4 border-l-2 border-[#117DBE]/20">
                  <li>Send payment to <strong>059-582-6411</strong></li>
                  <li>Reference your <strong>name</strong> or <strong>“Membership”</strong></li>
                </ul>

                <span className="text-[11px] font-bold uppercase tracking-widest text-[#117DBE] block">
                  Call to confirm: 055 952 9184
                </span>
              </div>
            </div>

            {/* Form Line Separator */}
            <div className="w-full h-px bg-black/[0.06]" />

            {/* Form Section */}
            <div>
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center py-16 md:py-24"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#117DBE]/10 flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="w-10 h-10 text-[#117DBE]" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-medium text-[#111] mb-4 tracking-tight">
                      Application received!
                    </h2>
                    <p className="text-lg text-black/50 leading-[1.7] max-w-md mx-auto mb-10">
                      Thank you for joining EWB-KNUST. Your registration details have been submitted successfully. We'll be in touch soon.
                    </p>
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F5F3] text-[#111] text-[15px] font-semibold hover:bg-[#eee] transition-all"
                    >
                      <RotateCcw size={14} />
                      Submit another
                    </button>
                  </motion.div>

                ) : submitStatus === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-16 md:py-24"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#8F1838]/10 flex items-center justify-center mx-auto mb-8">
                      <RotateCcw className="w-10 h-10 text-[#8F1838]" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-medium text-[#111] mb-4 tracking-tight">
                      Something went wrong
                    </h2>
                    <p className="text-lg text-black/50 leading-[1.7] max-w-md mx-auto mb-10">
                      We couldn't submit your application. Please check your internet connection and try again.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#111] text-white text-[15px] font-semibold hover:bg-[#222] transition-all"
                    >
                      <RotateCcw size={14} />
                      Try again
                    </button>
                  </motion.div>

                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-10 text-center">
                      <h2 className="text-2xl font-medium text-[#111] mb-2">Member Registration</h2>
                      <p className="text-[17px] text-black/50">Fill out the form below to officially join EWB-KNUST.</p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7"
                    >
                      {[
                        { label: "Surname", value: surname, setter: setSurname, type: "text" },
                        { label: "Other Names", value: otherNames, setter: setOtherNames, type: "text" },
                        { label: "Email Address", value: email, setter: setEmail, type: "email" },
                        { label: "Phone Number", value: phoneNumber, setter: setPhoneNumber, type: "tel" },
                        { label: "Date of Birth", value: dob, setter: setDob, type: "date" },
                        { label: "Age", value: age, setter: setAge, type: "number" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="block text-[11px] font-bold tracking-widest text-black/50 uppercase mb-2 ml-1">
                            {field.label} <span className="text-[#8F1838]">*</span>
                          </label>
                          <input
                            type={field.type}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            required
                            disabled={submitStatus === "loading"}
                            className="w-full px-5 py-3.5 bg-[#F5F5F3] border border-transparent rounded-[1rem] focus:outline-none focus:border-[#117DBE] focus:ring-1 focus:ring-[#117DBE] transition-all text-lg text-[#111] disabled:opacity-50"
                          />
                        </div>
                      ))}

                      {/* College */}
                      <div>
                        <label className="block text-[11px] font-bold tracking-widest text-black/50 uppercase mb-2 ml-1">
                          College <span className="text-[#8F1838]">*</span>
                        </label>
                        <select
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          required
                          disabled={submitStatus === "loading"}
                          className="w-full px-5 py-3.5 bg-[#F5F5F3] border border-transparent rounded-[1rem] focus:outline-none focus:border-[#117DBE] focus:ring-1 focus:ring-[#117DBE] transition-all text-lg text-[#111] disabled:opacity-50"
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

                      {/* Academic Level */}
                      <div>
                        <label className="block text-[11px] font-bold tracking-widest text-black/50 uppercase mb-2 ml-1">
                          Academic Level <span className="text-[#8F1838]">*</span>
                        </label>
                        <select
                          value={academicLevel}
                          onChange={(e) => setAcademicLevel(e.target.value)}
                          required
                          disabled={submitStatus === "loading"}
                          className="w-full px-5 py-3.5 bg-[#F5F5F3] border border-transparent rounded-[1rem] focus:outline-none focus:border-[#117DBE] focus:ring-1 focus:ring-[#117DBE] transition-all text-lg text-[#111] disabled:opacity-50"
                        >
                          <option value="">Select Level</option>
                          <option value="100">First Year</option>
                          <option value="200">Second Year</option>
                          <option value="300">Third Year</option>
                          <option value="400">Fourth Year</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div>

                      {/* Program */}
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-bold tracking-widest text-black/50 uppercase mb-2 ml-1">
                          Program <span className="text-[#8F1838]">*</span>
                        </label>
                        <input
                          type="text"
                          value={program}
                          onChange={(e) => setProgram(e.target.value)}
                          required
                          disabled={submitStatus === "loading"}
                          className="w-full px-5 py-3.5 bg-[#F5F5F3] border border-transparent rounded-[1rem] focus:outline-none focus:border-[#117DBE] focus:ring-1 focus:ring-[#117DBE] transition-all text-lg text-[#111] disabled:opacity-50"
                        />
                      </div>

                      {/* Campus Residence */}
                      <div className="md:col-span-2">
                        <label className="block text-[11px] font-bold tracking-widest text-black/50 uppercase mb-2 ml-1">
                          Campus Residence <span className="text-[#8F1838]">*</span>
                        </label>
                        <input
                          type="text"
                          value={campusResidence}
                          onChange={(e) => setCampusResidence(e.target.value)}
                          required
                          disabled={submitStatus === "loading"}
                          className="w-full px-5 py-3.5 bg-[#F5F5F3] border border-transparent rounded-[1rem] focus:outline-none focus:border-[#117DBE] focus:ring-1 focus:ring-[#117DBE] transition-all text-lg text-[#111] disabled:opacity-50"
                        />
                      </div>

                      {/* Submit */}
                      <div className="md:col-span-2 flex justify-center mt-6">
                        <button
                          type="submit"
                          disabled={submitStatus === "loading"}
                          className="bg-[#111] hover:bg-[#222] text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 text-[17px] font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                          {submitStatus === "loading" ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <ArrowUpRight size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <ActionCall />
      </div>
    </div>
  );
}
