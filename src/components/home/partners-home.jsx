import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";

export default function PartnersSection() {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const data = await client.fetch(`
          *[_type == "partner"] | order(order asc) {
            _id,
            name,
            "logo": logo.asset->url
          }
        `);
        setPartners(data);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
        setError(true);
      }
    }

    fetchPartners();
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 pt-12 pb-6 sm:pt-16 md:pt-20 md:pb-8">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30">
            Our Partners
          </span>
        </motion.div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            Unable to load partners at this time.
          </p>
        )}

        {/* Empty */}
        {!error && partners.length === 0 && (
          <p className="text-sm text-black/30 text-center">
            No partners available at the moment.
          </p>
        )}

        {/* Logos Container */}
        {!error && partners.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14 lg:gap-20">
            {partners.map((partner, index) => (
              <motion.div
                key={partner._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ scale: 1.08 }}
                className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 md:max-h-16 lg:max-h-20 w-auto object-contain mix-blend-multiply"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
