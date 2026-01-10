import React from "react";
import { motion } from "framer-motion";

/* ------------------ Data ------------------ */
const objectives = [
  {
    id: 1,
    icon: "🌍",
    title: "Community Empowerment",
    description:
      "Actively seek opportunities to engage in projects that build the capacities and empower the most underserved communities in Ghana to meet their basic human needs.",
  },
  {
    id: 2,
    icon: "📚",
    title: "Knowledge Sharing",
    description:
      "Provide students with technical and cultural knowledge to effectively approach and solve world problems on a community-based level.",
  },
  {
    id: 3,
    icon: "⚙️",
    title: "Engineering Skills",
    description:
      "Develop skill set in engineering students to prepare them to be of service to humanity.",
  },
  {
    id: 4,
    icon: "🤝",
    title: "Integrity & Responsibility",
    description:
      "Cultivate a sense of volunteerism, integrity, and responsibility in KNUST students.",
  },
  {
    id: 5,
    icon: "🌐",
    title: "Building Relationships",
    description:
      "Develop and foster relationships between EWB-Ghana KNUST, professional mentors, and disadvantaged communities.",
  },
];

/* ------------------ Motion Variants ------------------ */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ------------------ Reusable Card ------------------ */
const ObjectiveCard = ({ icon, title, description }) => (
  <motion.div
    variants={card}
    whileHover={{ y: -6, scale: 1.03 }}
    className="
      bg-pink-100 rounded-xl
      border border-transparent
      hover:border-blue-500
      hover:shadow-md
      transition-all
      p-6
      flex flex-col items-center
      text-center
    "
  >
    <span className="text-4xl mb-3">{icon}</span>
    <h3 className="text-base md:text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm leading-relaxed">{description}</p>
  </motion.div>
);

/* ------------------ Component ------------------ */
export default function MissionAndObjectives() {
  return (
    <section className="w-full py-20 bg-white text-neutral-700">
      <div className="mx-auto max-w-6xl px-4 space-y-20">
        {/* ================= MISSION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            mx-auto max-w-3xl
            bg-pink-100 rounded-xl
            border border-transparent
            hover:border-blue-500
            hover:shadow-lg
            transition-all
            p-8 text-center
          "
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">OUR MISSION</h2>
          <p className="text-sm md:text-base leading-relaxed">
            The mission of EWB-KNUST shall be to work with disadvantaged
            communities in Ghana to improve their quality of life through
            education and the implementation of practical, environmental and
            economically sustainable engineering projects.
          </p>
        </motion.div>

        {/* ================= OBJECTIVES ================= */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">OUR OBJECTIVES</h2>
            <p className="mt-2 text-sm md:text-base text-neutral-600">
              Our Strategic Priorities are:
            </p>
          </div>

          {/* ---------- FIRST ROW (2 ITEMS) ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {objectives.slice(0, 2).map((item) => (
              <ObjectiveCard key={item.id} {...item} />
            ))}
          </motion.div>

          {/* ---------- SECOND ROW (3 ITEMS) ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {objectives.slice(2).map((item) => (
              <ObjectiveCard key={item.id} {...item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
