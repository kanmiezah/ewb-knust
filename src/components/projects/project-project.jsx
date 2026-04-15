import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";
import { MapPin, ArrowUpRight } from "lucide-react";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Project() {
  const [projectData, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProject() {
    try {
      const data = await client.fetch(`*[_type == "project"]{
        title,
        location,
        description,
        projectCompleted,
        slug { current },
        mainImage { asset -> { url }, alt }
      }`);
      setProject(data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProject();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-black/50 text-[17px]">
        Loading projects...
      </div>
    );
  }

  return (
    <section className="bg-white py-20 px-6 w-full">
      <div className="max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-14"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-3">
            Projects Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-[#111] tracking-tight">
            Our initiatives
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {projectData.map((project) => (
            <motion.article key={project.slug.current} variants={cardVariants}>
              <Link to={`/projects/${project.slug.current}`} onClick={scrollToTop}>
                <div className="group relative overflow-hidden rounded-[2rem] bg-[#F5F5F3] aspect-[4/5] md:aspect-[3/4]">
                  {/* Image */}
                  <img
                    src={project.mainImage ? urlFor(project.mainImage).width(600).height(800).url() : "https://via.placeholder.com/600x800"}
                    alt={project.mainImage?.alt || project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Top Badges */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    {project.projectCompleted && (
                      <span className="bg-[#117DBE]/90 backdrop-blur-sm shadow-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                        {project.projectCompleted}% Complete
                      </span>
                    )}
                  </div>

                  {/* Arrow indicator top right */}
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                    <h3 className="text-xl font-medium text-white mb-2 leading-snug">
                      {project.title}
                    </h3>
                    
                    {project.location && (
                      <p className="flex items-center gap-1.5 text-[12px] font-medium text-white/70 mb-3">
                        <MapPin size={14} />
                        {project.location}
                      </p>
                    )}

                    {project.description && (
                      <p className="text-white/60 text-[17px] line-clamp-2 leading-[1.6]">
                        {project.description}
                      </p>
                    )}
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
