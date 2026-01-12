import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  HeartPulse,
  Droplets,
  GraduationCap,
  Factory,
  Wheat,
  Building2,
  ShowerHead,
} from "lucide-react";

import Img1 from "../../assets/images/2.jpg";

/* ------------------ Data ------------------ */
const engagements = [
  { title: "Health", icon: HeartPulse },
  { title: "Sanitation", icon: ShowerHead },
  { title: "Clean Water", icon: Droplets },
  { title: "Education", icon: GraduationCap },
  { title: "Processing", icon: Factory },
  { title: "Agriculture", icon: Wheat },
  { title: "Infrastructure", icon: Building2 },
];

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
            ABOUT US
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
            alt="hero about img"
            className="h-[300px] w-full object-cover sm:h-[300px] md:h-[380px]"
          />
        </motion.div>

        {/* About Text (evenly split columns) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          <motion.p
            variants={fadeUp}
            className="text-xl leading-relaxed text-gray-800"
          >
            Engineers Without Borders KNUST is a student-led organization
            committed to improving lives through sustainable, community-driven
            engineering solutions.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-xl leading-relaxed text-gray-800"
          >
            We bring together engineers, students, and volunteers who
            collaborate with communities to design and implement practical
            solutions in water, sanitation, energy, education, and
            infrastructure. Every project is guided by sustainability, local
            participation, and long-term impact.
          </motion.p>
        </motion.div>

        {/* ================= ENGAGEMENT ================= */}
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xl sm:text-2xl font-semibold text-gray-700"
        >
          Our work spans key areas critical to community development:
        </motion.h3>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            grid gap-6
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-7
          "
        >
          {engagements.map(({ title, icon: Icon }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={
                prefersReducedMotion ? undefined : { y: -6, scale: 1.04 }
              }
              className="
                bg-white/70 backdrop-blur
                rounded-2xl
                shadow-sm hover:shadow-md
                transition-shadow
                flex flex-col items-center justify-center
                py-8 px-4 text-center
              "
            >
              <Icon className="w-10 h-10 text-blue-500 mb-4" />
              <p className="text-sm sm:text-base font-medium text-gray-700">
                {title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
