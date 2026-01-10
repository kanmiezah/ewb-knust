import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Img1 from "../../assets/images/1.jpg";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#071c2f] p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-md overflow-hidden border border-white/20"
      >
        {/* Left Content */}
        <div className="bg-[#072844] p-8 md:p-12 flex flex-col justify-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white text-4xl md:text-5xl font-bold leading-tight"
          >
            Engineers <br />
            without <br />
            borders builds <br />
            tomorrow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-white/70 mt-6 max-w-md text-sm md:text-base"
          >
            We are students committed to solving real problems. Through projects
            and partnerships, we create lasting change in communities that need
            it most.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex items-center gap-4"
          >
            <Link to="/membership" onClick={() => window.scrollTo(0, 0)}>
              <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-100">
                Join
              </button>
            </Link>
            <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
              <button className="flex items-center gap-1 text-sm font-medium text-white transition hover:underline">
                More <span aria-hidden>→</span>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative w-full h-full min-h-[300px]"
        >
          <motion.img
            src={Img1}
            alt="Engineers Without Borders Project"
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
