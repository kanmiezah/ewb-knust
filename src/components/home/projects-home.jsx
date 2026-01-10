import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import { MapPin } from "lucide-react";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
          className="text-red-500 font-medium"
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
          className="text-neutral-500"
        >
          No projects available at the moment.
        </motion.p>
      </section>
    );
  }

  /* ---------- UI ---------- */
  return (
    <section className="w-full py-24 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center text-neutral-600"
      >
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Our Projects
        </span>
        <h2 className="text-3xl font-bold text-neutral-900">
          Our Popular Projects
        </h2>
        <p className="mt-2 text-md">Discover impactful community initiatives</p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.slice(0, 3).map(({ title, location, slug, mainImage }) => (
          <motion.article key={slug.current} variants={cardVariants}>
            <Link to={`/projects/${slug.current}`} onClick={scrollToTop}>
              <div className="group relative mx-auto h-96 w-72 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={
                    mainImage?.asset?.url ?? "https://via.placeholder.com/300"
                  }
                  alt={mainImage?.alt ?? title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:blur-sm"
                />

                <div className="absolute inset-0 flex items-end bg-black/0 transition group-hover:bg-black/60">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-semibold">{title}</h3>

                    <p className="mt-1 flex items-center text-sm text-white/90">
                      <MapPin size={18} className="mr-1" />
                      {location}
                    </p>

                    <span className="mt-4 inline-block rounded-full bg-blue-500 px-4 py-1 text-xs font-medium transition hover:bg-blue-600">
                      View Project
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          View All Projects →
        </Link>
      </motion.div>
    </section>
  );
}
