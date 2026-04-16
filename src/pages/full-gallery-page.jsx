import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../sanityClient";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function FullGalleryPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery" && defined(image.asset)]{
          _id,
          title,
          description,
          image
        }`
      )
      .then((data) => {
        setProjects(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] animate-pulse flex items-center justify-center">
        <span className="text-[13px] text-black/50">Loading gallery...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#117DBE]">
      <Helmet>
        <title>Photo Gallery — EWB-KNUST</title>
        <meta name="description" content="Browse photos from Engineers Without Borders KNUST events, projects, and community initiatives. See our team in action across Ghana." />
      </Helmet>
      {/* Immersive Hero */}
      <div className="pt-28 pb-36 sm:pt-32 sm:pb-40 md:pt-36 md:pb-56 overflow-hidden relative w-full text-center px-6">
         <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 block mb-5 relative z-10">
            EWB-KNUST in Action
         </span>
         <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-medium text-white tracking-tight leading-[1.08] relative z-10">
            Full Gallery
         </h1>
         <div className="absolute inset-0 bg-gradient-to-br from-[#1A95E0]/40 via-transparent to-[#0D6294]/30 pointer-events-none" />
      </div>

      {/* Main Wrapper */}
      <div className="relative z-20 -mt-16 md:-mt-24 w-full bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] overflow-hidden min-h-screen">
        <section className="w-full px-6 py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-black/[0.06] mb-12">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-black/40 hover:text-[#117DBE] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to About
              </Link>
              <div className="text-[14px] text-black/50 font-medium tracking-wide">
                Showing {projects.length} photos
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-20 text-[15px] text-black/50">
                No images found in the gallery.
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5"
              >
                {projects.map((project) => (
                  <motion.div
                    variants={fadeUp}
                    key={project._id}
                    className="group relative overflow-hidden rounded-2xl bg-[#F5F5F3] break-inside-avoid shadow-sm"
                  >
                    <img
                      src={urlFor(project.image).width(800).url()}
                      alt={project.title || "Gallery image"}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#071c2f]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-6 backdrop-blur-sm">
                      <p className="text-white text-[15px] sm:text-[17px] font-medium leading-relaxed sm:leading-snug">
                        {project.description || project.title || "Gallery Image"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
