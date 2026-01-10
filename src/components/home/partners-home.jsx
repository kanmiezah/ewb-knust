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
    <section className="w-full bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
            Our Partners
          </span>
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            We work with the best partners
          </h2>
        </motion.div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">
            Unable to load partners at this time.
          </p>
        )}

        {/* Empty */}
        {!error && partners.length === 0 && (
          <p className="text-sm text-gray-500">
            No partners available at the moment.
          </p>
        )}

        {/* Logos */}
        {!error && partners.length > 0 && (
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="flex h-20 items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
