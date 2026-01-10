import React from "react";
import { motion } from "framer-motion";

import Img1 from "../../assets/images/img (1).jpg";
import Img2 from "../../assets/images/img (2).jpg";
import Img3 from "../../assets/images/img (3).jpg";

export default function WhatWeDoSection() {
  return (
    <section className="bg-white px-6 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-sm font-medium text-gray-500">Focus</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          What we do
        </h2>
        <p className="text-gray-500 mt-4">
          We work on projects that matter to people
        </p>
      </motion.div>

      {/* Cards */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1 – Half width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 bg-gray-100 rounded-2xl overflow-hidden flex"
        >
          {/* Text */}
          <div className="w-1/2 p-8">
            <p className="text-xs font-medium text-gray-500">Community</p>
            <h3 className="text-xl font-semibold text-gray-900 mt-2">
              Community projects that serve
            </h3>
            <p className="text-gray-600 mt-3">
              Local partnerships drive our work forward
            </p>
            <button className="mt-6 text-sm font-medium text-gray-900 flex items-center gap-1">
              View <span>→</span>
            </button>
          </div>

          {/* Image */}
          <div className="w-1/2 relative overflow-hidden">
            <img
              src={Img1}
              alt="Community Project"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Card 2 – Quarter width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
        >
          <div className="p-6 flex-1">
            <p className="text-xs font-medium text-gray-500">Growth</p>
            <h3 className="text-xl font-semibold text-gray-900 mt-2">
              Professional development matters
            </h3>
            <p className="text-gray-600 mt-3">
              Members gain skills through real experience
            </p>
            <button className="mt-6 text-sm font-medium text-gray-900 flex items-center gap-1">
              Learn <span>→</span>
            </button>
          </div>

          {/* Image */}
          <div className="h-40 relative overflow-hidden">
            <img
              src={Img2}
              alt="Professional Development"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Card 3 – Quarter width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
        >
          <div className="p-6 flex-1">
            <p className="text-xs font-medium text-gray-500">Impact</p>
            <h3 className="text-xl font-semibold text-gray-900 mt-2">
              Global reach, local action
            </h3>
            <p className="text-gray-600 mt-3">
              Our work extends across continents
            </p>
            <button className="mt-6 text-sm font-medium text-gray-900 flex items-center gap-1">
              Discover <span>→</span>
            </button>
          </div>

          {/* Image */}
          <div className="h-40 relative overflow-hidden">
            <img
              src={Img3}
              alt="Global Impact"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
