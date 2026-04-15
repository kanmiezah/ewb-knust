import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ArrowUpRight, CheckCircle, Loader2, RotateCcw } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSubmitStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");

    const params = new URLSearchParams();
    params.append("entry.2005620554", formData.name);
    params.append("entry.1045781291", formData.email);
    params.append("entry.1166974658", formData.phone);
    params.append("entry.839337160", formData.message);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSc8eQIYRSFW1gUIWc4WUiv9AGmR1jw2Khp_5w9M7VRYIGJBag/formResponse",
        {
          method: "POST",
          body: params,
          mode: "no-cors",
        }
      );
      setSubmitStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("error");
    }
  };

  // Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  return (
    <section className="bg-white py-20 md:py-28 px-6 w-full">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* LEFT: INFO */}
          <motion.div variants={fadeUp} className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-5">
              Contact Detail
            </span>
            <h2 className="text-3xl md:text-[2.8rem] font-medium text-[#111] mb-6 tracking-tight leading-tight">
              We're here to <br className="hidden md:block" /> empower communities
            </h2>
            <p className="text-[17px] leading-[1.8] text-black/50 font-light mb-12 max-w-sm">
              Whether you want to collaborate, volunteer, or ask a question, our team is ready to connect and make a meaningful impact together.
            </p>

            {/* CONTACT DETAILS */}
            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#117DBE] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Mail size={18} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#117DBE] mb-1">
                    E-mail
                  </span>
                  <a
                    href="mailto:info@ewbknust.com"
                    className="text-[17px] text-[#111] font-medium hover:text-[#117DBE] transition-colors"
                  >
                    info@ewbknust.com
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-[#117DBE] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Phone size={18} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#117DBE] mb-1">
                    Phone
                  </span>
                  <a
                    href="tel:+233595826411"
                    className="text-[17px] text-[#111] font-medium hover:text-[#117DBE] transition-colors"
                  >
                    +233 (0) 59 582 6411
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div variants={fadeUp} className="bg-[#F5F5F3] rounded-[2rem] p-8 md:p-10 shadow-sm">
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#117DBE]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#117DBE]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-medium text-[#111] mb-3 tracking-tight">
                    Message sent!
                  </h3>
                  <p className="text-[15px] text-black/50 leading-[1.7] max-w-sm mx-auto mb-8">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#111] text-[14px] font-semibold hover:bg-[#eee] transition-all shadow-sm"
                  >
                    <RotateCcw size={13} />
                    Send another
                  </button>
                </motion.div>

              ) : submitStatus === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8F1838]/10 flex items-center justify-center mx-auto mb-6">
                    <RotateCcw className="w-8 h-8 text-[#8F1838]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-medium text-[#111] mb-3 tracking-tight">
                    Couldn't send
                  </h3>
                  <p className="text-[15px] text-black/50 leading-[1.7] max-w-sm mx-auto mb-8">
                    Please check your connection and try again.
                  </p>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111] text-white text-[14px] font-semibold hover:bg-[#222] transition-all"
                  >
                    <RotateCcw size={13} />
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
                  <h3 className="text-xl font-medium text-[#111] mb-8">Send a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                      { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
                      { label: "Phone", name: "phone", type: "tel", placeholder: "Your phone number" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-[11px] font-bold tracking-widest text-black/50 uppercase mb-2 ml-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required
                          disabled={submitStatus === "loading"}
                          className="w-full px-5 py-3.5 bg-white border border-transparent rounded-[1rem] focus:outline-none focus:border-[#117DBE] focus:ring-1 focus:ring-[#117DBE] transition-all text-lg text-[#111] placeholder:text-black/30 disabled:opacity-50"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-[11px] font-bold tracking-widest text-black/50 uppercase mb-2 ml-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        required
                        disabled={submitStatus === "loading"}
                        placeholder="How can we help?"
                        className="w-full px-5 py-3.5 bg-white border border-transparent rounded-[1rem] focus:outline-none focus:border-[#117DBE] focus:ring-1 focus:ring-[#117DBE] transition-all text-lg text-[#111] placeholder:text-black/30 resize-none disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="w-full mt-4 bg-[#111] hover:bg-[#222] text-white px-6 py-4 rounded-full flex items-center justify-center gap-2 text-[17px] font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {submitStatus === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Form
                          <ArrowUpRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* MAP */}
        <motion.div
          className="mt-20 overflow-hidden rounded-[2rem] bg-[#F5F5F3]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            title="KNUST Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31702.157405647667!2d-1.595732258073867!3d6.675433672447844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb946c39956a09%3A0x67868ca2b098015f!2sKwame%20Nkrumah%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sgh!4v1733419547540"
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full outline-none border-none grayscale-[20%]"
          />
        </motion.div>
      </div>
    </section>
  );
}
