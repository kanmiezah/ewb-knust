import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import { MapPin, Clock, Repeat } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroEventSection() {
  const [heroEvent, setHeroEvent] = useState(null);

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
          slug { current },
          mainImage { asset->{url} }
        }`
      )
      .then((data) => {
        if (!data?.length) return;

        // Calculate "next occurrence" for recurring events
        const now = new Date();

        const nextEvents = data.map((event) => {
          if (event.isRecurring) {
            const todayDay = now.getDay(); // 0-6
            let daysUntilNext = (event.dayOfWeek - todayDay + 7) % 7; // how many days until next occurrence
            if (daysUntilNext === 0) {
              const eventTime = new Date(`1970-01-01T${event.time}`);
              const nowTime = new Date(
                `1970-01-01T${now.getHours()}:${now.getMinutes()}`
              );
              if (eventTime < nowTime) daysUntilNext = 7; // already passed today
            }
            const nextDate = new Date(now);
            nextDate.setDate(now.getDate() + daysUntilNext);
            event.nextOccurrence = nextDate;
          } else {
            event.nextOccurrence = new Date(event.programDate);
          }
          return event;
        });

        // Sort by nextOccurrence
        nextEvents.sort((a, b) => a.nextOccurrence - b.nextOccurrence);

        setHeroEvent(nextEvents[0]);
      })
      .catch(console.error);
  }, []);

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
      day: d.getDate(),
      full: d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  };

  if (!heroEvent) return null;

  const heroDate = !heroEvent.isRecurring
    ? formatDate(heroEvent.programDate)
    : formatDate(heroEvent.nextOccurrence);

  return (
    <section className="w-full bg-blue-100 px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="inline-block mb-4 text-xs font-semibold uppercase bg-blue-600 text-white px-4 py-1 rounded-full">
            Next Event
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {heroEvent.title}
          </h1>

          {heroEvent.description && (
            <p className="mt-4 text-gray-700 max-w-xl">
              {heroEvent.description}
            </p>
          )}

          <div className="mt-6 text-sm font-medium text-blue-700">
            {heroEvent.isRecurring ? (
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4" />
                <span>
                  {days[heroEvent.dayOfWeek]} • {heroEvent.recurrenceType}
                </span>
              </div>
            ) : (
              <span>
                {heroDate.weekday} — {heroDate.full}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{heroEvent.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{heroEvent.venue}</span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              to="/events"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              View All Events →
            </Link>
          </motion.div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl shadow-lg h-[360px] sm:h-[420px] md:h-[480px]"
        >
          <img
            src={heroEvent.mainImage?.asset?.url}
            alt={heroEvent.title}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
