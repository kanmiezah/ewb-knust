import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import { MapPin, ArrowUpRight } from "lucide-react";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      const data = await client.fetch(`
        *[_type == "project"]{
          title,
          location,
          slug { current },
          mainImage {
            asset->{ url },
            alt
          }
        }
      `);

      setProjects(data || []);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load projects at the moment. Please check back later."
      );
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /* ---------- Error / Empty States ---------- */
  if (error) {
    return (
      <section className="py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500/80 font-medium text-sm"
        >
          {error}
        </motion.p>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-black/30 text-sm"
        >
          No projects available at the moment.
        </motion.p>
      </section>
    );
  }

  /* ---------- UI ---------- */
  return (
    <section className="w-full px-6 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-3">
              Our Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#111] tracking-tight">
              Making an impact
            </h2>
          </div>
          <Link
            to="/projects"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[17px] font-semibold text-[#111]/60 hover:text-[#111] transition-colors"
          >
            View all projects <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.slice(0, 3).map(({ title, location, slug, mainImage }) => (
            <motion.article key={slug.current} variants={cardVariants}>
              <Link to={`/projects/${slug.current}`} onClick={scrollToTop}>
                <div className="group relative overflow-hidden rounded-2xl bg-[#F5F5F3] aspect-[3/4]">
                  <img
                    src={
                      mainImage?.asset?.url ?? "https://via.placeholder.com/400"
                    }
                    alt={mainImage?.alt ?? title}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-semibold text-white mb-1.5 leading-snug">
                      {title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-[17px] text-white/70">
                      <MapPin size={13} />
                      {location}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
