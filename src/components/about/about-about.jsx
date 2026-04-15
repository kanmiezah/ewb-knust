import React from "react";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Droplets,
  GraduationCap,
  Factory,
  Wheat,
  Building2,
  ShowerHead,
} from "lucide-react";

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

const objectives = [
  {
    id: 1,
    title: "Community Empowerment",
    description:
      "Actively seek opportunities to engage in projects that build the capacities and empower the most underserved communities in Ghana to meet their basic human needs.",
  },
  {
    id: 2,
    title: "Knowledge Sharing",
    description:
      "Provide students with technical and cultural knowledge to effectively approach and solve world problems on a community-based level.",
  },
  {
    id: 3,
    title: "Engineering Skills",
    description:
      "Develop skill set in engineering students to prepare them to be of service to humanity.",
  },
  {
    id: 4,
    title: "Integrity & Responsibility",
    description:
      "Cultivate a sense of volunteerism, integrity, and responsibility in KNUST students.",
  },
  {
    id: 5,
    title: "Building Relationships",
    description:
      "Develop and foster relationships between EWB-Ghana KNUST, professional mentors, and disadvantaged communities.",
  },
];

/* ------------------ Motion Variants ------------------ */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutContent() {
  return (
    <section className="w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl space-y-20 md:space-y-32">
        
        {/* ================= MISSION GRID ================= */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#117DBE] block mb-5">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-[2.8rem] font-medium text-[#111] mb-6 tracking-tight leading-tight">
              Engineering for <br className="hidden md:block"/> a better world
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <p className="text-[17px] leading-[1.8] text-black/60 font-light mb-6">
              Engineers Without Borders KNUST is a student-led organization committed to improving lives through sustainable, community-driven engineering solutions. We bring together engineers, students, and volunteers who collaborate with communities to design and implement practical solutions.
            </p>
            <p className="text-[17px] leading-[1.8] text-black/60 font-light">
              The mission of EWB-KNUST is to work with disadvantaged communities in Ghana to improve their quality of life through education and the implementation of practical, environmentally and economically sustainable engineering projects.
            </p>
          </motion.div>
        </div>

        {/* ================= AREAS OF ENGAGEMENT ================= */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-3">
              Practice Areas
            </span>
            <h3 className="text-2xl font-medium text-[#111]">
              Our areas of engagement
            </h3>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            {engagements.map(({ title, icon: Icon }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="bg-[#F5F5F3] hover:bg-[#117DBE] group transition-colors duration-300 rounded-[1.25rem] py-6 px-6 flex items-center gap-4 flex-grow basis-[calc(50%-1rem)] sm:basis-auto"
              >
                <div className="bg-white/90 rounded-full p-2.5 text-[#117DBE] group-hover:text-[#117DBE] shadow-sm">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-[#111] group-hover:text-white transition-colors">
                  {title}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= OBJECTIVES ================= */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-3">
              Core Focus
            </span>
            <h3 className="text-2xl font-medium text-[#111]">
              Strategic objectives
            </h3>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {objectives.map((obj, i) => (
              <motion.div
                key={obj.id}
                variants={fadeUp}
                className="bg-[#F5F5F3] p-8 md:p-10 rounded-[2rem] flex flex-col group min-h-[250px]"
              >
                <div className="text-[11px] font-bold tracking-widest text-[#117DBE] mb-5">
                  0{i + 1}
                </div>
                <h4 className="text-lg font-medium text-[#111] leading-tight mb-4 group-hover:text-[#8F1838] transition-colors">
                  {obj.title}
                </h4>
                <p className="text-[17px] leading-[1.7] text-black/50">
                  {obj.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
