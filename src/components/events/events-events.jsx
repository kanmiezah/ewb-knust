import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { client } from "../../sanityClient";
import { MapPin, Clock, Repeat, ArrowUpRight } from "lucide-react";

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

export default function EventsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [heroEvent, setHeroEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to get next occurrence date
  const getNextRecurringDate = (dayOfWeek) => {
    const now = new Date();
    const today = now.getDay();
    const diff = (dayOfWeek + 7 - today) % 7 || 7;
    const nextDate = new Date();
    nextDate.setDate(now.getDate() + diff);
    nextDate.setHours(0, 0, 0, 0);
    return nextDate;
  };

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
        if (!data?.length) {
          setIsLoading(false);
          return;
        }

        const eventsWithNextDate = data.map((ev) => {
          const nextDate = ev.isRecurring
            ? getNextRecurringDate(ev.dayOfWeek)
            : new Date(ev.programDate);
          return { ...ev, nextOccurrence: nextDate };
        });

        eventsWithNextDate.sort((a, b) => a.nextOccurrence - b.nextOccurrence);

        setHeroEvent(eventsWithNextDate[0]);
        setOtherEvents(eventsWithNextDate.slice(1));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const days = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];

  const formatDate = (date) => {
    const d = new Date(date);
    return {
      weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      full: d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32 text-black/50 text-[17px]">
        Loading events...
      </div>
    );
  }

  if (!heroEvent && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <h2 className="text-2xl font-medium text-[#111] mb-2">No upcoming events</h2>
        <p className="text-[17px] text-black/50">Please check back later for exciting EWB programs.</p>
      </div>
    );
  }

  const heroDate = !heroEvent.isRecurring
    ? formatDate(heroEvent.programDate)
    : null;

  return (
    <div className="w-full">
      {/* ================= HERO EVENT FEATURE ================= */}
      <section className="w-full px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8F1838] block mb-10"
          >
            Up Next
          </motion.span>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* TEXT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-[#111] tracking-tight leading-[1.1] mb-5">
                {heroEvent.title}
              </h2>

              {heroEvent.description && (
                <p className="text-lg text-black/50 leading-[1.8] max-w-md mb-8">
                  {heroEvent.description}
                </p>
              )}

              {/* Date info */}
              <div className="text-lg font-semibold text-[#117DBE] mb-6">
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

              {/* Details */}
              <div className="space-y-3.5 text-lg text-black/70 mb-10">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-black/30" />
                  <span>{heroEvent.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-black/30" />
                  <span>{heroEvent.venue}</span>
                </div>
              </div>

              {/* CTA - Link to single event */}
              <Link to={`/events/${heroEvent.slug?.current}`} onClick={() => window.scrollTo(0, 0)} className="inline-flex justify-center items-center gap-2 px-7 py-3.5 sm:py-3 rounded-full bg-[#117DBE] text-white text-[15px] sm:text-[17px] font-semibold hover:bg-[#0D6294] transition-all duration-300 hover:shadow-lg w-full sm:w-max">
                View Event Details
              </Link>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="overflow-hidden rounded-[2rem] h-[300px] sm:h-[400px] md:h-[500px] bg-[#F5F5F3]"
            >
              <img
                src={heroEvent.mainImage?.asset?.url || "https://via.placeholder.com/800"}
                alt={heroEvent.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= OTHER EVENTS GRID ================= */}
      {otherEvents.length > 0 && (
        <section className="bg-[#F5F5F3] py-20 px-6 w-full">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 block mb-3">
                Calendar
              </span>
              <h2 className="text-3xl font-medium text-[#111] tracking-tight">
                More upcoming
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherEvents.map((event) => {
                const date = !event.isRecurring ? formatDate(event.programDate) : null;

                return (
                  <motion.div
                    key={event.slug?.current || event.title}
                    variants={fadeUp}
                  >
                   <Link
                     to={`/events/${event.slug?.current}`}
                     onClick={() => window.scrollTo(0, 0)}
                     className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 block"
                   >
                    {/* IMAGE */}
                    <div className="relative h-48 overflow-hidden bg-[#eee]">
                      <img
                        loading="lazy"
                        src={event.mainImage?.asset?.url || "https://via.placeholder.com/600"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* DATE PILL */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center min-w-14 px-3 py-2 shadow-sm text-center">
                        {event.isRecurring ? (
                          <>
                            <Repeat className="w-4 h-4 text-[#117DBE] mb-1" />
                            <span className="text-sm font-bold text-[#111] leading-none mb-0.5">
                              {days[event.dayOfWeek].substring(0, 3)}
                            </span>
                            <span className="text-[9px] uppercase font-bold text-black/40">
                              {event.recurrenceType === "Weekly" ? "Wk" : "Mo"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] uppercase font-bold text-[#117DBE] block leading-tight">
                              {date.month}
                            </span>
                            <span className="text-lg font-bold text-[#111] leading-none">
                              {date.day}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-medium text-[#111] leading-snug mb-3 group-hover:text-[#117DBE] transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="text-[17px] text-black/50 leading-[1.7] line-clamp-2 mb-6">
                          {event.description}
                        </p>
                      )}

                      <div className="mt-auto space-y-2.5">
                        <div className="flex items-start gap-2.5 text-[12px] text-black/60">
                          <MapPin className="w-3.5 h-3.5 text-black/30 mt-0.5" />
                          <span className="leading-tight">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[12px] text-black/60">
                          <Clock className="w-3.5 h-3.5 text-black/30" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                   </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
