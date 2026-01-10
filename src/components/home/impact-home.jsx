import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import { Link } from "react-router-dom";

/* ---------- Fallback Data ---------- */
const fallbackStats = [
  {
    title: "Members strong",
    value: "200+",
    description: "Students building solutions across multiple disciplines",
  },
  {
    title: "Projects",
    value: "10",
    description: "Real work delivering results to communities worldwide",
  },
  {
    title: "Communities reached",
    value: "5",
    description: "Our impact spans continents and continues to grow",
  },
];

export default function ImpactStatsSection() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await client.fetch(`
          *[_type == "impactStats"] | order(order asc) {
            title,
            value,
            description
          }
        `);

        // Use Sanity data ONLY if it exists
        if (data && data.length > 0) {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch impact stats:", error);
        // fallbackStats already in use
      }
    }

    fetchStats();
  }, []);

  return (
    <section className="w-full bg-blue-100 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <span className="mb-2 block text-sm font-medium text-gray-600">
            Impact
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Numbers that show our reach
          </h2>
          <p className="text-gray-700">
            We measure success by the communities we serve and the engineers we
            develop. Every number here represents real change.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-blue-200 bg-blue-100 p-8 shadow-sm"
            >
              <h3 className="mb-6 text-sm font-medium text-gray-800">
                {stat.title}
              </h3>
              <div className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                {stat.value}
              </div>
              <p className="text-sm text-gray-700">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center gap-4"
        >
          <Link to="/membership" onClick={() => window.scrollTo(0, 0)}>
            <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-100">
              Join
            </button>
          </Link>

          <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-900 transition hover:underline">
              More <span aria-hidden>→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
