import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Img1 from "../../assets/images/2.jpg";

export default function HeroAboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-[#117DBE] pt-32 pb-40 md:pt-36 md:pb-56 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A95E0]/40 via-transparent to-[#0D6294]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between relative h-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-xl md:w-1/2 pt-16 pb-20 md:py-10"
        >
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/60 block mb-5">
            About Us
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[2.8rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.5rem] font-medium text-white tracking-tight leading-[1.08]"
          >
            Empowering <br />
            communities, <br />
            inspiring change.
          </motion.h1>
        </motion.div>

        {/* Right Image Container */}
        <div className="absolute right-0 bottom-0 w-[85%] h-[50%] md:w-[50%] md:h-[110%] pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: "easeOut" }}
            className="relative w-full h-full rounded-tl-[3rem] md:rounded-tl-[4rem] overflow-hidden shadow-2xl"
          >
            <img
              src={Img1}
              alt="EWB-KNUST Volunteers"
              className="w-full h-full object-cover object-center grayscale-[15%]"
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
