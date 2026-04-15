import React from "react";
import { Helmet } from "react-helmet-async";

import ContactSection from "../components/contact/contact-contact";
import ActionCall from "../components/home/actioncall-home";

export default function ContactPage() {
  return (
    <div className="bg-[#117DBE]">
      <Helmet>
        <title>Contact Us — EWB-KNUST</title>
        <meta name="description" content="Get in touch with Engineers Without Borders KNUST. Reach out to collaborate, volunteer, or learn more about our engineering projects for community development." />
      </Helmet>
      <div className="pt-32 pb-40 md:pt-36 md:pb-56 overflow-hidden relative w-full text-center px-6">
         <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/60 block mb-5 relative z-10">
            Reach Out
         </span>
         <h1 className="text-[2.8rem] sm:text-5xl md:text-[4rem] font-medium text-white tracking-tight leading-[1.08] relative z-10">
            Let's connect.
         </h1>
         {/* Subtle gradient overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#1A95E0]/40 via-transparent to-[#0D6294]/30 pointer-events-none" />
      </div>

      {/* Overlapping white card wrapper */}
      <div className="relative z-20 -mt-16 md:-mt-24 w-full bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <ContactSection />
        <ActionCall />
      </div>
    </div>
  );
}
