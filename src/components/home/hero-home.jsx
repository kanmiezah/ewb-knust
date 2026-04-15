import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImg from "../../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#117DBE] pt-32 pb-40 md:pt-36 md:pb-56 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A95E0]/40 via-transparent to-[#0D6294]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start justify-between relative">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-xl md:w-1/2 pt-8 pb-16 md:py-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[2.8rem] sm:text-5xl md:text-[4.2rem] lg:text-7xl font-medium text-white tracking-tight leading-[1.08]"
          >
            Impacting lives,{" "}
            <br className="hidden sm:block" />
            changing{" "}
            <br className="hidden sm:block" />
            communities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-7 text-white/75 text-[17px] max-w-sm font-light leading-[1.7] tracking-wide"
          >
            Engineers Without Borders — KNUST. Driving sustainable solutions
            through engineering innovation and community partnership.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
              <button className="rounded-full bg-white px-6 py-2.5 text-[17px] font-semibold text-[#111] shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.03]">
                Learn more
              </button>
            </Link>
            <Link
              to="/projects"
              onClick={() => window.scrollTo(0, 0)}
              className="text-white/80 hover:text-white text-[17px] font-medium transition-colors flex items-center gap-1.5"
            >
              Our projects <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image Container */}
        <div className="absolute right-0 bottom-0 w-[90%] h-[55%] md:w-[52%] md:h-[115%] pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: "easeOut" }}
            className="relative w-full h-full rounded-tl-[3rem] md:rounded-tl-[4rem] overflow-hidden shadow-2xl"
          >
            <img
              src={HeroImg}
              alt="EWB-KNUST community project"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Soft left edge blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#117DBE]/60 via-[#117DBE]/20 to-transparent w-1/3" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
