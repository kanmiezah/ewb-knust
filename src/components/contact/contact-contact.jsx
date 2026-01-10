import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSc8eQIYRSFW1gUIWc4WUiv9AGmR1jw2Khp_5w9M7VRYIGJBag/viewform?usp=pp_url" +
      `&entry.2005620554=${encodeURIComponent(formData.name)}` +
      `&entry.1045781291=${encodeURIComponent(formData.email)}` +
      `&entry.1166974658=${encodeURIComponent(formData.phone)}` +
      `&entry.839337160=${encodeURIComponent(formData.message)}`;

    window.location.href = formUrl;
  };

  // Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className="min-h-screen bg-blue-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="p-8 md:p-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT: INFO */}
            <motion.div variants={fadeUp} className="space-y-10">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                  Connect With Us
                </p>

                <h1 className="text-5xl md:text-6xl text-gray-900 leading-tight mb-6">
                  WE’RE HERE TO
                  <span className="block font-bold">EMPOWER</span>
                  <span className="block">COMMUNITIES</span>
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed">
                  — we’re here to collaborate, guide, and make a meaningful
                  impact together.
                </p>
              </div>

              {/* CONTACT DETAILS */}
              <motion.div variants={staggerContainer} className="space-y-6">
                <motion.div
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">E-mail</p>
                    <a
                      href="mailto:info@ewbknust.com"
                      className="text-gray-900 text-lg font-medium hover:text-blue-600 transition"
                    >
                      info@ewbknust.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="bg-blue-500 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone number</p>
                    <a
                      href="tel:+233595826411"
                      className="text-gray-900 text-lg font-medium hover:text-blue-600 transition"
                    >
                      +233 (0) 59 582 6411
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* RIGHT: FORM */}
            <motion.div
              variants={fadeUp}
              className="bg-gray-50 rounded-2xl p-8 shadow-md"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone", type: "tel" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    required
                    placeholder="Type your message"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition"
                >
                  Get in touch
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* MAP */}
        <motion.div
          className="px-6 my-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            title="KNUST Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31702.157405647667!2d-1.595732258073867!3d6.675433672447844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb946c39956a09%3A0x67868ca2b098015f!2sKwame%20Nkrumah%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sgh!4v1733419547540"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl border"
          />
        </motion.div>
      </div>
    </section>
  );
}
