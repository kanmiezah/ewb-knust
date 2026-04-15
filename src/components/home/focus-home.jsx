import React from "react";
import { motion } from "framer-motion";

import Img1 from "../../assets/images/img (1).jpg";
import Img2 from "../../assets/images/img (2).jpg";
import Img3 from "../../assets/images/img (3).jpg";

const services = [
  {
    title: "Plan",
    subtitle: "Community projects that serve people and create lasting impact.",
    description:
      "Every initiative begins with understanding the core challenge. We collaborate closely with communities to map out sustainable solutions, combining innovative engineering with local resources to ensure long-term viability and growth.",
    image: Img1,
    imageAlt: "Planning session with community",
  },
  {
    title: "Design",
    subtitle: "Professional development and engineering excellence.",
    description:
      "Our designs prioritize functionality and aesthetics without sacrificing durability. Using industry-standard concepts, our engineering teams ensure that every structure is optimized for safety, usability, and environmental integration.",
    image: Img2,
    imageAlt: "Engineering design phase",
  },
  {
    title: "Build",
    subtitle: "Turning blueprints into reality through hands-on construction.",
    description:
      "With communities at the centre, our teams deploy field-tested methods to construct reliable infrastructure. From water systems to sanitation facilities, every build reflects our commitment to quality and sustainability.",
    image: Img3,
    imageAlt: "Community construction project",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="px-6 py-16 md:py-28 w-full bg-[#F4F9FD]">
      <div className="max-w-5xl mx-auto">
        {/* Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30">
            Our Services
          </span>
        </motion.div>

        {/* Service Rows */}
        <div className="flex flex-col gap-28 md:gap-36">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={service.title}
                className={`flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-12 md:gap-16 lg:gap-20`}
              >
                {/* Text side */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="w-full md:w-1/2"
                >
                  <h2 className="text-4xl md:text-[2.8rem] font-medium text-[#111] mb-5 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-lg font-medium text-[#111]/75 mb-5 leading-snug">
                    {service.subtitle}
                  </p>
                  <p className="text-[17px] text-black/40 leading-[1.8] max-w-md">
                    {service.description}
                  </p>
                </motion.div>

                {/* Image side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="w-full md:w-[40%] lg:w-[42%] relative group lg:mx-auto"
                >
                  <div className="w-full aspect-video md:aspect-square lg:aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#eee] shadow-sm">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
