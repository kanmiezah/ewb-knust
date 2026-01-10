import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImg from "../../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <motion.img
        src={HeroImg}
        alt="EWB KNUST community project"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1444]/95 via-[#0a213a]/80 to-[#0a213a]/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-7xl font-extrabold leading-tight"
          >
            Welcome to <br />
            <span className="text-blue-400">EWB – KNUST</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 text-lg md:text-2xl text-white/90"
          >
            Impacting lives. Changing communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
              <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-100">
                More
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
