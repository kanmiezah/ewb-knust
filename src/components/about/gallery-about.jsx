import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Gallery() {
  const [allProjects, setAllProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        // Initial shuffle so it's fresh each page load
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setAllProjects(shuffled);
        
        // Load first 8
        const initialDisplay = [];
        for (let i = 0; i < Math.min(8, shuffled.length); i++) {
           initialDisplay.push(shuffled[i]);
        }
        setDisplayProjects(initialDisplay);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Interval hook to refresh gallery with sequentially different pictures
  useEffect(() => {
    if (allProjects.length === 0) return;
    
    // Only cycle if we have more than 8 pictures, otherwise there are no "different" pictures to show
    if (allProjects.length <= 8) return; 

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 8) % allProjects.length;
        
        const nextDisplay = [];
        for (let i = 0; i < 8; i++) {
           nextDisplay.push(allProjects[(nextIndex + i) % allProjects.length]);
        }
        
        setDisplayProjects(nextDisplay);
        return nextIndex;
      });
    }, 8000); // refresh every 8 seconds

    return () => clearInterval(intervalId);
  }, [allProjects]);

  if (loading) {
    return null;
  }

  return (
    <section className="w-full px-6 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-3">
              Gallery Preview
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-[#111] tracking-tight">
              Our EWB family
            </h2>
          </div>
          
          <Link
             to="/gallery"
             onClick={() => window.scrollTo(0, 0)}
             className="inline-flex mx-auto md:mx-0 items-center gap-2 px-6 py-3 rounded-full bg-[#111] hover:bg-[#222] text-white text-[14px] font-semibold transition-all duration-300 w-max shadow-md hover:-translate-y-0.5"
          >
             View Full Gallery <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project, index) => {
              // Preset shapes to ensure the grid outline never shifts during refresh
              const shapes = [
                "aspect-[3/4]",
                "aspect-square",
                "aspect-[4/3]",
                "aspect-square",
                "aspect-[4/3]",
                "aspect-[3/4]",
                "aspect-square",
                "aspect-square",
              ];
              const gridShape = shapes[index % shapes.length];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  key={project._id}
                  className={`group relative overflow-hidden rounded-[1.5rem] bg-[#F5F5F3] break-inside-avoid shadow-sm ${gridShape}`}
                >
                  {/* Image */}
                  <img
                    src={urlFor(project.image).width(600).url()}
                    alt={project.title || "Gallery image"}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#117DBE]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-6">
                    <p className="text-white text-[15px] sm:text-[17px] font-medium leading-relaxed sm:leading-snug">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
