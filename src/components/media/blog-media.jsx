import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { client } from "../../sanityClient";
import { Heart, MessageCircle, Share2 } from "lucide-react";

/* ------------------ Motion ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogPage() {
  const prefersReducedMotion = useReducedMotion();
  const [heroPost, setHeroPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [error, setError] = useState(null);

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
        setOtherPosts(data.slice(1)); // rest of the posts
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load posts. Please try again.");
      });
  }, []);

  if (!heroPost) return null;

  return (
    <>
      {/* ================= HERO POST ================= */}
      <section className="w-full bg-blue-100 px-6 py-20">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
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
              Published on:{" "}
              {new Date(heroPost.publishedAt).toLocaleDateString()}
            </p>

            <Link
              to={`/blog/${heroPost.slug.current}`}
              className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Read Full Article
            </Link>
          </motion.div>

          {/* IMAGE */}
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
        </div>
      </section>

      {/* ================= OTHER POSTS ================= */}
      {otherPosts.length > 0 && (
        <section className="bg-stone-100 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-14 text-center">
              More Posts
            </h2>

            {error && (
              <div className="text-center text-red-500 mb-8">
                <p>{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherPosts.map((post) => (
                <motion.article
                  key={post.slug.current}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <Link
                    to={`/blog/${post.slug.current}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {/* IMAGE */}
                    <div className="h-56 overflow-hidden">
                      <img
                        src={
                          post.mainImage?.asset?.url ||
                          "https://via.placeholder.com/400x300"
                        }
                        alt={post.mainImage?.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {post.title}
                      </h3>

                      {post.subHeading && (
                        <p className="text-sm text-gray-500 mb-2">
                          {post.subHeading}
                        </p>
                      )}

                      {post.description && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                          {post.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600 group-hover:underline">
                          Read more →
                        </span>

                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
