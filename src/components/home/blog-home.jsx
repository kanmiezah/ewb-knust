import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { client } from "../../sanityClient";
import { ArrowUpRight } from "lucide-react";

export default function BlogSection() {
  const prefersReducedMotion = useReducedMotion();
  const [heroPost, setHeroPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc){
          title,
          subHeading,
          description,
          slug { current },
          mainImage { asset->{url}, alt },
          publishedAt,
          categories[]->{title}
        }`
      )
      .then((data) => {
        if (data?.length > 0) {
          setHeroPost(data[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || (!heroPost && !isLoading)) return null;

  return (
    <section className="w-full px-6 py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Label */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
           <div>
             <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/30 block mb-4">
               Our Journal
             </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-[#111] tracking-tight leading-none">
               Latest from the field
             </h2>
           </div>
           
           <Link
             to="/blog"
             onClick={() => window.scrollTo(0, 0)}
             className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111] hover:bg-[#222] text-white text-[14px] font-semibold transition-all duration-300 w-max hover:scale-105 shadow-md"
           >
             View all articles <ArrowUpRight className="w-4 h-4" />
           </Link>
        </motion.div>

        {/* Ultra-Clean Bento Layout */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
           className="w-full bg-[#F5F5F3] p-4 sm:p-5 md:p-6 rounded-[2.5rem] md:rounded-[3rem] flex flex-col md:flex-row gap-6 md:gap-10 shadow-sm"
        >
           
           {/* Image Frame (Flexible but dominant) */}
           <div className="w-full md:w-[55%] h-[280px] sm:h-[350px] md:h-auto md:min-h-[500px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative group">
             <Link to={`/blog/${heroPost.slug.current}`} className="block w-full h-full">
               <img
                 src={heroPost.mainImage?.asset?.url || "https://via.placeholder.com/1200x800"}
                 alt={heroPost.mainImage?.alt || "Featured Article"}
                 className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-[#117DBE]/0 group-hover:bg-[#117DBE]/10 mix-blend-multiply transition-colors duration-500" />
               
               {/* Hover floating "Read" badge */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <span className="bg-white/90 backdrop-blur-md text-[#111] font-bold text-[13px] uppercase tracking-widest px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Read Story
                  </span>
               </div>
             </Link>
           </div>

           {/* Content Block */}
            <div className="w-full md:w-[45%] flex flex-col justify-center px-2 sm:px-6 py-6 sm:py-8 md:pl-2 md:pr-10">
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 {heroPost.categories?.length > 0 ? (
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#117DBE] bg-white px-3 py-1.5 rounded-full shadow-sm">
                      {heroPost.categories[0].title}
                    </span>
                 ) : (
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#117DBE] bg-white px-3 py-1.5 rounded-full shadow-sm">
                      Featured
                    </span>
                 )}
                 <span className="w-1 h-1 rounded-full bg-black/20" />
                 {heroPost.publishedAt && (
                   <span className="text-[14px] font-medium text-black/40">
                     {new Date(heroPost.publishedAt).toLocaleDateString("en-US", {
                       month: "long", day: "numeric", year: "numeric"
                     })}
                   </span>
                 )}
              </div>

              <Link to={`/blog/${heroPost.slug.current}`}>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.8rem] font-medium text-[#111] leading-[1.1] mb-6 tracking-tight hover:text-[#117DBE] transition-colors">
                  {heroPost.title}
                </h3>
              </Link>

              {heroPost.subHeading && (
                <p className="text-[20px] font-medium text-[#111]/70 leading-snug mb-4">
                  {heroPost.subHeading}
                </p>
              )}

              {heroPost.description && (
                <p className="text-[17px] text-black/50 leading-[1.7] mb-10 line-clamp-3">
                  {heroPost.description}
                </p>
              )}

              <Link
                to={`/blog/${heroPost.slug.current}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group flex flex-col items-start gap-1 w-max mt-auto"
              >
                 <span className="text-[15px] font-bold uppercase tracking-widest text-[#111] flex items-center gap-2 transition-colors">
                   Read Full Story
                   <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                 </span>
                 <div className="w-0 h-px bg-[#111] transition-all duration-500 group-hover:w-full mt-1" />
              </Link>

           </div>

        </motion.div>
      </div>
    </section>
  );
}
