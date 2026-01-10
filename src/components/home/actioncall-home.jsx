import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import ActionImg from "../../assets/images/img (5).jpg"; // 👈 replace with your image path

export default function ActionCall() {
  return (
    <section className="w-full bg-slate-900 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 md:grid-cols-2"
        >
          {/* Left content */}
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Build something that matters
            </h1>

            <p className="mb-8 max-w-md text-sm text-slate-300">
              Join Engineers Without Borders and put your skills to work on
              projects that change lives.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-4"
            >
              <Link to="/membership" onClick={() => window.scrollTo(0, 0)}>
                <button className="rounded-full bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-100">
                  Join
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right image */}
          <div className="relative hidden md:block">
            <img
              src={ActionImg}
              alt="EWB community project"
              className="h-full w-full object-cover"
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-l from-slate-900/90 via-slate-900/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
