import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Img1 from "../../assets/images/img (4).jpg";

/* ------------------ Motion ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function AboutAndEngagementSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-full bg-blue-100 px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* ================= ABOUT ================= */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-4"
        >
          <h2 className="text-3xl font-semibold tracking-wide text-gray-900 sm:text-4xl">
            PROJECTS
          </h2>
        </motion.header>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl"
        >
          <img
            src={Img1}
            alt="hero project img"
            className="h-[220px] w-full object-cover sm:h-[300px] md:h-[380px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
