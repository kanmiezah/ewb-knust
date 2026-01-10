import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { client } from "../../sanityClient";

/* ------------------ Motion ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroBlogPost() {
  const prefersReducedMotion = useReducedMotion();
  const [heroPost, setHeroPost] = useState(null);

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
        if (!data?.length) return;
        setHeroPost(data[0]); // latest post as hero
      })
      .catch((err) => console.error(err));
  }, []);

  if (!heroPost) return null;

  return (
    <section className="w-full bg-blue-100 px-6 py-20">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* IMAGE LEFT */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden h-64 sm:h-80 md:h-96 flex justify-center items-center rounded-2xl shadow-lg bg-white"
        >
          <img
            src={heroPost.mainImage?.asset?.url}
            alt={heroPost.mainImage?.alt || heroPost.title}
            className="object-contain h-full w-full"
          />
        </motion.div>

        {/* TEXT RIGHT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="inline-block mb-4 text-xs font-semibold uppercase bg-blue-600 text-white px-4 py-1 rounded-full">
            Latest Post
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {heroPost.title}
          </h1>

          {heroPost.subHeading && (
            <p className="mt-4 text-gray-700">{heroPost.subHeading}</p>
          )}

          {heroPost.description && (
            <p className="mt-4 text-gray-700 line-clamp-4">
              {heroPost.description}
            </p>
          )}

          <p className="mt-6 text-sm text-gray-500">
            Published on: {new Date(heroPost.publishedAt).toLocaleDateString()}
          </p>

          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              to="/blog"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              View All Blog Posts →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
