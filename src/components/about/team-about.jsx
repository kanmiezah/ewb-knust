import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";

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
    <section className="bg-stone-100 py-20 px-6 text-neutral-700">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* -------- Header -------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-2">Our Team</h2>
          <p className="text-gray-500">
            Dedicated individuals passionate about holistic well-being.
          </p>
        </motion.div>

        {/* -------- Grid -------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Intro Card */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">Our Team</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dedicated individuals passionate about holistic well-being. Meet
              the diverse team driving innovation and shaping the future of
              wellness.
            </p>
          </motion.div>

          {/* Team Members (NOT LINKS) */}
          {teamData.map((member) => (
            <motion.div
              key={member.slug?.current || member.name}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative h-96 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={
                  member.profileImage?.asset?.url ||
                  "https://via.placeholder.com/300"
                }
                alt={member.name}
                className="h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-x-0 bottom-0 m-5 rounded-lg bg-black/40 backdrop-blur-md p-4">
                <h4 className="text-white font-semibold text-base">
                  {member.name}
                </h4>
                <p className="text-white/90 text-sm">
                  {member.position || "Role not specified"}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Join Card (STILL A LINK) */}
          <motion.div
            variants={cardVariants}
            className="bg-blue-100 p-6 rounded-xl shadow-sm flex flex-col justify-center text-center"
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Join the Team
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Embark on a transformative journey with us. Join the team shaping
              the future of wellness innovation.
            </p>
            <Link
              to="/membership"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
                Join Now
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
