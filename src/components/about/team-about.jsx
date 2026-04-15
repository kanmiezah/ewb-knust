import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import { ArrowUpRight } from "lucide-react";

/* ---------------- Motion Variants ---------------- */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Team() {
  const [teamData, setTeam] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "team"] | order(order asc) {
          name,
          position,
          bio,
          slug { current },
          profileImage {
            asset -> { url }
          }
        }`
      )
      .then(setTeam)
      .catch((err) => console.error("Error fetching team data:", err));
  }, []);

  return (
    <section className="py-20 px-6 w-full">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* -------- Header -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-3">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-[#111] tracking-tight">
            Meet the team
          </h2>
        </motion.div>

        {/* -------- Grid -------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Intro Card */}
          <motion.div
            variants={cardVariants}
            className="p-8 rounded-[2rem] bg-[#F5F5F3] flex flex-col justify-center min-h-[300px]"
          >
            <h3 className="text-xl font-medium text-[#111] mb-4">Our Team</h3>
            <p className="text-[17px] text-black/50 leading-[1.7]">
              Dedicated individuals passionate about holistic engineering solutions. Meet
              the diverse team driving innovation and shaping the future of
              sustainable development.
            </p>
          </motion.div>

          {/* Team Members */}
          {teamData.map((member) => (
            <motion.div
              key={member.slug?.current || member.name}
              variants={cardVariants}
              className="relative aspect-[3/4] overflow-hidden rounded-[2rem] group bg-[#eee]"
            >
              <img
                src={
                  member.profileImage?.asset?.url ||
                  "https://via.placeholder.com/400"
                }
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Seamless Bottom Gradient Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h4 className="text-white font-medium text-lg leading-tight mb-1">
                  {member.name}
                </h4>
                <p className="text-[#FCB712] text-[11px] font-bold uppercase tracking-widest">
                  {member.position || "Role not specified"}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Join Div (CTA) */}
          <motion.div
            variants={cardVariants}
            className="p-8 rounded-[2rem] bg-[#117DBE] flex flex-col justify-center text-center items-center min-h-[300px] group"
          >
            <h3 className="text-xl font-medium text-white mb-4">
              Join the Team
            </h3>
            <p className="text-[17px] text-white/70 leading-[1.7] mb-8">
              Embark on a transformative journey with us. Become part of the ecosystem shaping the future.
            </p>
            <Link
              to="/membership"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#117DBE] group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
            >
              <ArrowUpRight strokeWidth={2.5} size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
