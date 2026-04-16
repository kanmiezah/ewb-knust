import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, MapPin, Clock, Calendar, Repeat, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function SingleEvent() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSingleEvent() {
      try {
        const data = await client.fetch(
          `*[_type == "event" && slug.current == $slug][0]{
            title,
            description,
            body,
            programDate,
            time,
            venue,
            isRecurring,
            recurrenceType,
            dayOfWeek,
            mainImage { asset->{url}, alt }
          }`,
          { slug }
        );
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSingleEvent();
  }, [slug]);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: event?.title || "EWB-KNUST Event",
      text: event?.description || "Check out this upcoming event!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const portableTextComponents = useMemo(
    () => ({
      block: {
        h1: ({ children }) => (
          <h1 className="text-3xl md:text-4xl font-medium text-[#111] mt-12 mb-6 leading-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl md:text-3xl font-medium text-[#111] mt-10 mb-5 leading-snug">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl md:text-2xl font-medium text-[#111] mt-8 mb-4">
            {children}
          </h3>
        ),
        normal: ({ children }) => (
          <p className="text-lg md:text-xl text-black/70 leading-[1.8] mb-6 font-light font-sans">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#8F1838] pl-6 my-8 text-xl md:text-2xl italic text-[#111] bg-[#F5F5F3] p-6 rounded-r-[1rem]">
            {children}
          </blockquote>
        ),
      },
      marks: {
        strong: ({ children }) => (
          <strong className="font-semibold text-[#111]">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-[#111]">{children}</em>,
        link: ({ children, value }) => (
          <a
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#117DBE] hover:text-[#0D6294] underline underline-offset-4 decoration-[#117DBE]/30 transition-colors"
          >
            {children}
          </a>
        ),
      },
      list: {
        bullet: ({ children }) => (
          <ul className="list-disc list-outside pl-6 my-6 text-lg md:text-xl text-black/70 space-y-3 font-light">
            {children}
          </ul>
        ),
        number: ({ children }) => (
          <ol className="list-decimal list-outside pl-6 my-6 text-lg md:text-xl text-black/70 space-y-3 font-light">
            {children}
          </ol>
        ),
      },
      listItem: {
        bullet: ({ children }) => <li className="pl-2">{children}</li>,
        number: ({ children }) => <li className="pl-2">{children}</li>,
      },
    }),
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] animate-pulse flex items-center justify-center">
        <span className="text-[17px] text-black/50">Loading event details...</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
        <h2 className="text-2xl font-medium text-[#111] mb-2">Event Not Found</h2>
        <p className="text-sm text-black/50 mb-8">The event you are looking for does not exist or has passed.</p>
        <Link to="/events" className="px-6 py-3.5 sm:py-3 bg-[#111] text-white text-[15px] sm:text-[17px] font-semibold rounded-full hover:bg-[#222] transition w-full sm:w-max text-center">
          Return to Events
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-[#8F1838] w-full min-h-screen">
      <Helmet>
        <title>{event.title ? `${event.title} — EWB-KNUST Events` : "Event — EWB-KNUST"}</title>
        <meta name="description" content={event.description || `Details for ${event.title || "this event"} hosted by Engineers Without Borders KNUST.`} />
      </Helmet>

      {/* Immersive Hero Header */}
      <header className="relative w-full pt-32 pb-48 md:pt-36 md:pb-64 overflow-hidden flex flex-col items-center justify-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
           {event.mainImage?.asset?.url && (
             <img
               src={event.mainImage.asset.url}
               alt={event.mainImage.alt || event.title || "Event Image"}
               className="w-full h-full object-cover grayscale-[30%] opacity-30 mix-blend-overlay"
             />
           )}
           <div className="absolute inset-0 bg-[#8F1838]/60 mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#8F1838] via-transparent to-transparent opacity-90" />
        </div>
        
        {/* Title Overlay */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center gap-2 mb-6">
              {event.isRecurring ? (
                 <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                   <Repeat className="w-3 h-3" />
                   Recurring • {event.recurrenceType}
                 </span>
              ) : (
                 <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                   <Calendar className="w-3 h-3" />
                   Upcoming Event
                 </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[4rem] font-medium text-white leading-[1.1] tracking-tight mb-6">
              {event.title || "Untitled Event"}
            </h1>
            {event.description && (
              <h2 className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
                {event.description}
              </h2>
            )}
          </motion.div>
        </div>
      </header>

      {/* Overlapping Content Container */}
      <main className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 md:px-0 -mt-24 lg:-mt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-12 md:p-16 w-full mb-12"
        >
          {/* Top Back Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-black/[0.06] mb-10">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-black/40 hover:text-[#8F1838] transition-colors"
            >
              <ArrowLeft size={16} />
              All Events
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F5F3] rounded-full text-[12px] font-bold tracking-widest uppercase text-black/50 hover:text-[#8F1838] hover:bg-[#8F1838]/10 transition-all"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>

          {/* Event Meta Grid */}
          <div className="bg-[#F5F5F3] rounded-[1.5rem] p-5 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12">
             <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-black/40 block mb-2">
                  Date
                </span>
                <div className="text-[15px] font-medium text-[#111] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8F1838]" />
                  {event.isRecurring 
                    ? `${days[event.dayOfWeek]}s • ${event.recurrenceType}`
                    : formatDate(event.programDate)
                  }
                </div>
             </div>
             
             <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-black/40 block mb-2">
                  Time
                </span>
                <div className="text-[15px] font-medium text-[#111] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8F1838]" />
                  {event.time}
                </div>
             </div>

             <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-black/40 block mb-2">
                  Location
                </span>
                <div className="text-[15px] font-medium text-[#111] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8F1838]" />
                  {event.venue}
                </div>
             </div>
          </div>

          {/* Event Flyer Image */}
          {event.mainImage?.asset?.url && (
            <div className="w-full aspect-video md:aspect-[21/9] rounded-[1.5rem] overflow-hidden bg-[#eee] mb-12 shadow-lg relative group">
               <img
                 src={event.mainImage.asset.url}
                 alt={event.mainImage.alt || event.title}
                 className="w-full h-full object-cover"
               />
            </div>
          )}

          {/* PortableText Body */}
          {event.body ? (
            <div className="text-[#111]">
              <PortableText
                value={event.body}
                components={portableTextComponents}
              />
            </div>
          ) : null}
        </motion.div>
      </main>
    </article>
  );
}
