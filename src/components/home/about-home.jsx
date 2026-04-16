import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Img1 from "../../assets/images/1.jpg";

export default function AboutSection() {
  return (
    <section className="w-full px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 rounded-[2rem] overflow-hidden bg-[#111] min-h-[420px]"
        >
          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 md:px-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-6"
            >
              About EWB
            </motion.span>

            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight mb-5">
              Engineers{" "}
              <br className="hidden md:block" />
              without borders{" "}
              <br className="hidden md:block" />
              builds tomorrow
            </h2>

            <p className="text-white/50 text-base leading-[1.8] max-w-md mb-10">
              We are students committed to solving real problems. Through
              projects and partnerships, we create lasting change in communities
              that need it most.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
              <Link to="/membership" onClick={() => window.scrollTo(0, 0)} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto rounded-full bg-white px-6 py-3.5 sm:py-2.5 text-[17px] font-semibold text-[#111] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Join
                </button>
              </Link>
              <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="text-white/60 hover:text-white text-[17px] font-medium transition-colors flex items-center justify-center gap-1.5 py-2"
              >
                Learn more <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full h-72 sm:h-80 md:h-full min-h-[280px] sm:min-h-[320px]"
          >
            <img
              src={Img1}
              alt="Engineers Without Borders Project"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Edge blends for both mobile (top) and desktop (left) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/30 to-transparent hidden md:block w-1/2" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#111]/30 to-transparent md:hidden h-1/2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
