import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, MapPin, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function SingleProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchSingleProject() {
    try {
      const data = await client.fetch(
        `*[_type == "project" && slug.current == $slug]{
          title,
          location,
          body,
          projectCompleted,
          mainImage {
            asset->{
              url
            }
          },
          galleryImages[] {
            asset->{
              url
            }
          }
        }`,
        { slug }
      );
      setProject(data[0]);
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleProject();
  }, [slug]);

  const portableTextComponents = useMemo(
    () => ({
      block: {
        h1: ({ children }) => (
          <h1 className="text-3xl md:text-4xl font-medium text-[#111] mt-12 mb-6 leading-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl md:text-3xl font-medium text-[#111] mt-10 mb-5 leading-snug">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl md:text-2xl font-medium text-[#111] mt-8 mb-4">
            {children}
          </h3>
        ),
        normal: ({ children }) => (
          <p className="text-lg md:text-xl text-black/70 leading-[1.8] mb-6 font-light font-sans">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#117DBE] pl-6 my-8 text-xl md:text-2xl italic text-[#111] bg-[#F5F5F3] p-6 rounded-r-[1rem]">
            {children}
          </blockquote>
        ),
      },
      marks: {
        strong: ({ children }) => (
          <strong className="font-semibold text-[#111]">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-[#111]">{children}</em>,
        link: ({ children, value }) => (
          <a
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#117DBE] hover:text-[#0D6294] underline underline-offset-4 decoration-[#117DBE]/30 transition-colors"
          >
            {children}
          </a>
        ),
      },
      list: {
        bullet: ({ children }) => (
          <ul className="list-disc list-outside pl-6 my-6 text-lg md:text-xl text-black/70 space-y-3 font-light">
            {children}
          </ul>
        ),
        number: ({ children }) => (
          <ol className="list-decimal list-outside pl-6 my-6 text-lg md:text-xl text-black/70 space-y-3 font-light">
            {children}
          </ol>
        ),
      },
      listItem: {
        bullet: ({ children }) => <li className="pl-2">{children}</li>,
        number: ({ children }) => <li className="pl-2">{children}</li>,
      },
    }),
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] animate-pulse flex items-center justify-center">
        <span className="text-[17px] text-black/50">Loading project...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
        <h2 className="text-2xl font-medium text-[#111] mb-2">Project Not Found</h2>
        <p className="text-sm text-black/50 mb-8">The project you are looking for does not exist.</p>
        <Link to="/projects" className="px-6 py-3 bg-[#111] text-white text-[17px] font-semibold rounded-full hover:bg-[#222] transition">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-[#117DBE] w-full min-h-screen">
      <Helmet>
        <title>{project.title ? `${project.title} — EWB-KNUST Projects` : "Project — EWB-KNUST"}</title>
        <meta name="description" content={`Learn about the ${project.title || "EWB-KNUST"} project${project.location ? ` in ${project.location}` : ""}. Engineers Without Borders KNUST community engineering initiative.`} />
      </Helmet>
      {/* Immersive Hero Header */}
      <header className="relative w-full pt-32 pb-48 md:pt-36 md:pb-64 overflow-hidden flex flex-col items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
           <img
             src={project.mainImage?.asset?.url || "https://via.placeholder.com/1600x900"}
             alt={project.title || "Project Image"}
             className="w-full h-full object-cover grayscale-[30%] opacity-40 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-[#117DBE]/60 mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#117DBE] via-transparent to-transparent opacity-90" />
        </div>
        
        {/* Title Overlay */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {project.projectCompleted !== undefined && (
              <div className="flex justify-center gap-2 mb-6">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                  <Target className="w-3 h-3" />
                  {project.projectCompleted}% Complete
                </span>
              </div>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-medium text-white leading-[1.1] tracking-tight mb-6">
              {project.title || "Untitled Project"}
            </h1>
            {project.location && (
              <h2 className="flex items-center justify-center gap-2 text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
                <MapPin className="w-5 h-5" />
                {project.location}
              </h2>
            )}
          </motion.div>
        </div>
      </header>

      {/* Overlapping Content Container */}
      <main className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 md:px-0 -mt-24 lg:-mt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-12 md:p-16 w-full mb-12"
        >
          {/* Top Back Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-black/[0.06] mb-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-black/40 hover:text-[#117DBE] transition-colors"
            >
              <ArrowLeft size={16} />
              All Projects
            </Link>
          </div>

          {/* PortableText Body */}
          {project.body ? (
            <div className="text-[#111]">
              <PortableText
                value={project.body}
                components={portableTextComponents}
              />
            </div>
          ) : (
            <p className="text-black/40 italic text-lg">No content available for this project.</p>
          )}
        </motion.div>

        {/* Gallery Section */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.7 }}
             className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-12 w-full"
          >
             <h2 className="text-2xl font-medium text-[#111] mb-8">Project Gallery</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {project.galleryImages.map((image, index) => (
                 <div
                   key={index}
                   className="overflow-hidden rounded-[1rem] bg-[#F5F5F3] relative aspect-square group"
                 >
                   <img
                     src={image.asset.url}
                     alt={`Gallery Image ${index + 1}`}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     loading="lazy"
                   />
                 </div>
               ))}
             </div>
          </motion.div>
        )}
      </main>
    </article>
  );
}
