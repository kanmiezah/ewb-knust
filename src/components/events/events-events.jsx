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

// Helper to get next occurrence date for recurring events
const getNextRecurringDate = (dayOfWeek) => {
  const now = new Date();
  const today = now.getDay();
  const diff = (dayOfWeek + 7 - today) % 7 || 7; // if today, move to next week
  const nextDate = new Date();
  nextDate.setDate(now.getDate() + diff);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
};

export default function EventsPage() {
  const prefersReducedMotion = useReducedMotion();
  const [heroEvent, setHeroEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);

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

        // Compute next occurrence date for all events
        const eventsWithNextDate = data.map((ev) => {
          const nextDate = ev.isRecurring
            ? getNextRecurringDate(ev.dayOfWeek)
            : new Date(ev.programDate);
          return { ...ev, nextOccurrence: nextDate };
        });

        // Sort by next occurrence
        eventsWithNextDate.sort((a, b) => a.nextOccurrence - b.nextOccurrence);

        setHeroEvent(eventsWithNextDate[0]); // earliest upcoming
        setOtherEvents(eventsWithNextDate.slice(1));
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
    : null;

  return (
    <>
      {/* ================= HERO ================= */}
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
              Next Upcoming Event
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {heroEvent.title}
            </h1>

            {heroEvent.description && (
              <p className="mt-4 text-gray-700 max-w-xl">
                {heroEvent.description}
              </p>
            )}

            {/* DATE / RECURRING */}
            <div className="mt-6 text-sm font-medium text-blue-700">
              {heroEvent.isRecurring ? (
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4" />
                  <span>
                    {days[heroEvent.dayOfWeek]} • {heroEvent.recurrenceType}{" "}
                    (Next:{" "}
                    {heroEvent.nextOccurrence.toLocaleDateString("en-US")})
                  </span>
                </div>
              ) : (
                <span>
                  {heroDate.weekday} — {heroDate.full}
                </span>
              )}
            </div>

            {/* META */}
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
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src={heroEvent.mainImage?.asset?.url}
              alt={heroEvent.title}
              className="h-[280px] w-full object-cover sm:h-[360px] md:h-[440px]"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= OTHER EVENTS ================= */}
      {otherEvents.length > 0 && (
        <section className="bg-[#fffaf2] py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-14 text-center">
              More Upcoming Events
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherEvents.map((event) => {
                const date = !event.isRecurring
                  ? formatDate(event.programDate)
                  : null;

                return (
                  <motion.div
                    key={event.slug.current}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition"
                  >
                    {/* IMAGE */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={event.mainImage?.asset?.url}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* DATE / RECURRING */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow text-sm">
                        {event.isRecurring ? (
                          <div className="flex items-center gap-2 text-blue-600 font-medium">
                            <Repeat className="w-4 h-4" />
                            <span>
                              {days[event.dayOfWeek]} • {event.recurrenceType}{" "}
                              (Next:{" "}
                              {event.nextOccurrence.toLocaleDateString("en-US")}
                              )
                            </span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-xs uppercase text-gray-500">
                              {date.weekday}
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {date.day}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                          {event.description}
                        </p>
                      )}

                      <div className="mt-5 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
