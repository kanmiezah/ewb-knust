import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import { Calendar, ArrowUpRight } from "lucide-react";

/* ------------------ Motion ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function BlogSection() {
  const [heroPost, setHeroPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
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
          publishedAt
        }`
      )
      .then((data) => {
        if (data?.length > 0) {
          setHeroPost(data[0]);
          setOtherPosts(data.slice(1));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32 text-black/50 text-[17px]">
        Loading articles...
      </div>
    );
  }

  if (!heroPost && !isLoading) {
    return null;
  }

  return (
    <div className="w-full">
      {/* ================= HERO POST GRID ================= */}
      <section className="w-full px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="group relative overflow-hidden rounded-[2rem] bg-[#F5F5F3] flex flex-col md:flex-row min-h-[450px]"
          >
            {/* Image Side */}
            <div className="w-full md:w-[55%] overflow-hidden relative min-h-[300px]">
              <img
                src={heroPost.mainImage?.asset?.url || "https://via.placeholder.com/800"}
                alt={heroPost.mainImage?.alt || "Blog Post"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-[#8F1838] uppercase">
                  Featured Article
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-black/40">
                  <Calendar size={12} strokeWidth={2.5} />
                  {new Date(heroPost.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-medium text-[#111] leading-[1.15] mb-5 transition-colors group-hover:text-[#117DBE]">
                {heroPost.title}
              </h3>

              {heroPost.description && (
                <p className="text-lg text-black/60 leading-[1.8] mb-8 line-clamp-3">
                  {heroPost.description}
                </p>
              )}

              <Link
                to={`/blog/${heroPost.slug.current}`}
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 mt-auto px-6 py-2.5 rounded-full bg-[#111] text-white text-[17px] font-semibold w-fit hover:bg-[#222] transition-colors"
              >
                Read article <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= OTHER POSTS: Grid ================= */}
      {otherPosts.length > 0 && (
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
                  Archive
               </span>
               <h2 className="text-3xl font-medium text-[#111] tracking-tight">
                  More insights
               </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherPosts.map((post) => (
                <motion.article
                  key={post.slug.current}
                  variants={fadeUp}
                  className="group relative flex flex-col bg-[#F5F5F3] rounded-[2rem] overflow-hidden"
                >
                  <Link
                    to={`/blog/${post.slug.current}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="flex flex-col h-full"
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        loading="lazy"
                        src={post.mainImage?.asset?.url || "https://via.placeholder.com/600"}
                        alt={post.mainImage?.alt || post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-grow p-6">
                      <div className="flex items-center text-[10px] uppercase font-bold tracking-widest text-[#117DBE] mb-3">
                         {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                         })}
                      </div>

                      <h3 className="text-[17px] font-medium text-[#111] leading-snug mb-3 group-hover:text-[#117DBE] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {post.description && (
                        <p className="text-[17px] text-black/50 leading-[1.6] line-clamp-2 flex-grow mb-5">
                          {post.description}
                        </p>
                      )}

                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#111] opacity-60 group-hover:opacity-100 transition-opacity">
                          Read more <ArrowUpRight size={12} strokeWidth={3} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
