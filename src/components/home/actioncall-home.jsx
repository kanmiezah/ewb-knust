import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ActionImg from "../../assets/images/img (5).jpg";

export default function ActionCall() {
  return (
    <section className="w-full px-6 py-10 md:py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative grid overflow-hidden rounded-[2rem] bg-[#117DBE] md:grid-cols-2 min-h-[380px]"
        >
          {/* Left content */}
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 md:px-14 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-5">
              Get Involved
            </span>
            <h2 className="mb-4 text-3xl font-medium leading-tight text-white sm:text-4xl tracking-tight">
              Build something{" "}
              <br className="hidden sm:block" />
              that matters
            </h2>

            <p className="mb-10 max-w-sm text-base text-white/60 leading-[1.8]">
              Join Engineers Without Borders and put your skills to work on
              projects that change lives. Every hand counts.
            </p>

            <div className="flex items-center gap-4">
              <Link to="/membership" onClick={() => window.scrollTo(0, 0)}>
                <button className="rounded-full bg-white px-7 py-3 text-[17px] font-semibold text-[#111] transition-all duration-300 hover:shadow-lg hover:scale-[1.03]">
                  Join EWB-KNUST
                </button>
              </Link>
              <Link
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
                className="text-white/60 hover:text-white text-[17px] font-medium transition-colors flex items-center gap-1.5"
              >
                Contact us <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="relative hidden md:block">
            <img
              src={ActionImg}
              alt="EWB community project"
              className="h-full w-full object-cover"
            />
            {/* Blend edge border */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#117DBE] via-[#117DBE]/40 to-transparent w-[40%]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
