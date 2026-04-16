import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { client } from "../../sanityClient";
import { MapPin, Clock, Repeat, ArrowRight } from "lucide-react";

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

        const now = new Date();

        const nextEvents = data.map((event) => {
          if (event.isRecurring) {
            const todayDay = now.getDay();
            let daysUntilNext = (event.dayOfWeek - todayDay + 7) % 7;
            if (daysUntilNext === 0) {
              const eventTime = new Date(`1970-01-01T${event.time}`);
              const nowTime = new Date(
                `1970-01-01T${now.getHours()}:${now.getMinutes()}`
              );
              if (eventTime < nowTime) daysUntilNext = 7;
            }
            const nextDate = new Date(now);
            nextDate.setDate(now.getDate() + daysUntilNext);
            event.nextOccurrence = nextDate;
          } else {
            event.nextOccurrence = new Date(event.programDate);
          }
          return event;
        });

        nextEvents.sort((a, b) => a.nextOccurrence - b.nextOccurrence);
        setHeroEvent(nextEvents[0]);
      })
      .catch(console.error);
  }, []);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formatDate = (date) => {
    const d = new Date(date);
    return {
      weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
      day: d.getDate(),
      full: d.toLocaleDateString("en-US", {
        month: "short",
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
    <section className="w-full px-6 py-20 md:py-32 bg-[#F0F7FB]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Label */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12 sm:mb-16"
        >
           <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#117DBE] bg-[#117DBE]/10 px-4 py-2 rounded-full inline-block">
             Upcoming Action
           </span>
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-[#111] mt-6 tracking-tight">
             Join our next mission
           </h2>
        </motion.div>

        {/* Immersive Poster Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl"
        >
          {/* Background Image */}
          <img
            src={heroEvent.mainImage?.asset?.url || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"}
            alt={heroEvent.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-[#071c2f]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
          
          {/* Content Wrapper */}
          <div className="absolute inset-0 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-end">
            
            {/* Top Right Date Badge */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 hidden sm:flex flex-col items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
               <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                 {heroDate.weekday.substring(0, 3)}
               </span>
               <span className="text-3xl font-medium text-white leading-none mt-1">
                 {heroDate.day}
               </span>
            </div>

            <div className="max-w-3xl relative z-20">
              {/* Event Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 {heroEvent.isRecurring && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8F1838] rounded-full text-[11px] font-bold text-white uppercase tracking-widest shadow-lg">
                      <Repeat className="w-3.5 h-3.5" />
                      Recurring
                    </span>
                 )}
                 <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold text-white uppercase tracking-widest border border-white/10">
                   {heroDate.full}
                 </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-[4rem] font-medium text-white tracking-tight leading-[1.05] mb-4 sm:mb-6 drop-shadow-sm transition-colors group-hover:text-white">
                {heroEvent.title}
              </h3>

              {/* Meta Info */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[15px] sm:text-[17px] text-white/80 font-medium mb-8">
                 <div className="flex items-center gap-2.5">
                   <Clock className="w-5 h-5 text-[#FCB712]" />
                   <span>{heroEvent.time}</span>
                 </div>
                 <div className="flex items-center gap-2.5">
                   <MapPin className="w-5 h-5 text-[#FCB712]" />
                   <span>{heroEvent.venue}</span>
                 </div>
              </div>

              {/* Description */}
              {heroEvent.description && (
                <p className="text-[17px] text-white/70 leading-[1.7] max-w-2xl mb-10 line-clamp-2 md:line-clamp-3">
                  {heroEvent.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 w-full">
                 <Link
                    to={`/events/${heroEvent.slug?.current}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex w-full sm:w-auto justify-center px-8 py-4 bg-white text-[#111] rounded-full text-[15px] font-bold tracking-wide hover:bg-[#F5F5F3] hover:scale-105 transition-all duration-300 shadow-xl"
                 >
                    Get Details
                 </Link>
                 <Link
                    to="/contact"
                    onClick={() => window.scrollTo(0, 0)}
                    className="group flex flex-row items-center justify-center w-full sm:w-auto gap-2 py-2 text-white/80 hover:text-white text-[15px] font-medium transition-colors"
                 >
                    Have questions?
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
