import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { client } from "../../sanityClient";
import { MapPin, Clock, Repeat } from "lucide-react";

/* ------------------ Motion ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function NextEventHero() {
  const prefersReducedMotion = useReducedMotion();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "event" && (programDate >= now() || isRecurring == true)]{
          title,
          description,
          programDate,
          time,
          venue,
          isRecurring,
          recurrenceType,
          dayOfWeek,
          mainImage { asset->{url} }
        } | order(programDate asc)[0]`
      )
      .then(setEvent)
      .catch(console.error);
  }, []);

  if (!event) return null;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatDate = (date) => {
    const d = new Date(date);
    return {
      weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
      date: d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  };

  const date = !event.isRecurring ? formatDate(event.programDate) : null;

  return (
    <section className="w-full bg-blue-100 px-6 py-20">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* ================= TEXT ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="inline-block mb-4 text-xs font-semibold tracking-wide uppercase bg-blue-600 text-white px-4 py-1 rounded-full">
            Next Upcoming Event
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {event.title}
          </h1>

          {event.description && (
            <p className="mt-4 text-gray-700 max-w-xl">{event.description}</p>
          )}

          {/* DATE / RECURRING */}
          <div className="mt-6 text-sm font-medium text-blue-700">
            {event.isRecurring ? (
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4" />
                <span>
                  {days[event.dayOfWeek]} •{" "}
                  {event.recurrenceType.charAt(0).toUpperCase() +
                    event.recurrenceType.slice(1)}
                </span>
              </div>
            ) : (
              <span>
                {date.weekday} — {date.date}
              </span>
            )}
          </div>

          {/* META */}
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
          </div>
        </motion.div>

        {/* ================= IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            src={event.mainImage?.asset?.url}
            alt={event.title}
            className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
