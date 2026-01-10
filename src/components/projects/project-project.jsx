import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { client, urlFor } from "../../sanityClient";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, y: -5, transition: { duration: 0.3 } },
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
      <div className="flex items-center justify-center h-screen">
        <Rings
          height="100"
          width="100"
          color="blue"
          ariaLabel="loading-indicator"
        />
      </div>
    );
  }

  return (
    <section className="bg-blue-100 py-16 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {projectData.map((project) => (
          <motion.div
            key={project.slug.current}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative cursor-pointer"
          >
            {/* Image */}
            <div className="h-64 w-full overflow-hidden rounded-t-2xl">
              <motion.img
                src={urlFor(project.mainImage).width(600).height(400).url()}
                alt={project.mainImage?.alt || "Project Image"}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
              {/* Top badges */}
              <div className="flex gap-2 text-xs">
                {project.projectCompleted && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                    {project.projectCompleted}% Complete
                  </span>
                )}
                {project.location && (
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                    {project.location}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900">
                {project.title}
              </h2>

              {/* Description */}
              {project.description && (
                <p className="text-gray-600 text-sm line-clamp-3">
                  {project.description}
                </p>
              )}

              {/* Read More Button */}
              <Link to={`/projects/${project.slug.current}`}>
                <button className="mt-3 inline-flex items-center gap-2 text-blue-500 font-semibold text-sm hover:underline">
                  Read More &rarr;
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
