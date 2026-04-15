import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { client } from "../../sanityClient";

/* ---------- Count-up Animation Hook ---------- */
function useCountUp(end, duration = 2000, startOnView = false, isInView = true) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericEnd = parseInt(end.replace(/\D/g, ""), 10);
    if (isNaN(numericEnd)) {
      setCount(end);
      return;
    }

    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericEnd));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  // Preserve the suffix (e.g., "+")
  const suffix = end.replace(/[0-9]/g, "");
  return typeof count === "number" ? `${count}${suffix}` : count;
}

/* ---------- Individual Stat Card ---------- */
function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animatedValue = useCountUp(stat.value, 1800, true, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative rounded-[2rem] bg-[#0D6294]/50 p-9 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[300px] group hover:bg-[#0D6294]/80 transition-colors duration-500 backdrop-blur-md border border-white/5"
    >
      {/* Accent top line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-white/10" />

      <div>
        <div className="text-[3.2rem] md:text-[3.5rem] font-medium text-white tracking-tight leading-none mb-2">
          {animatedValue}
        </div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCB712] mb-5">
          {stat.title}
        </h3>
      </div>

      <p className="text-[17px] leading-[1.7] text-white/70 font-normal">
        {stat.description}
      </p>
    </motion.div>
  );
}

/* ---------- Fallback Data ---------- */
const fallbackStats = [
  {
    title: "Members strong",
    value: "200+",
    description: "Students building solutions across multiple disciplines",
  },
  {
    title: "Projects",
    value: "10+",
    description: "Real work delivering results to communities worldwide",
  },
  {
    title: "Communities reached",
    value: "5+",
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
    <section className="w-full px-6 py-20 md:py-28 bg-[#117DBE] border-t border-b border-[#0D6294]">
      <div className="mx-auto max-w-5xl">
        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
