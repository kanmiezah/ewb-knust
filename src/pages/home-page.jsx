import React from "react";
import { Helmet } from "react-helmet-async";

import HeroSection from "../components/home/hero-home";
import AboutSection from "../components/home/about-home";
import WhatWeDoSection from "../components/home/focus-home";
import ImpactStatsSection from "../components/home/impact-home";
import PartnersSection from "../components/home/partners-home";
import ActionCall from "../components/home/actioncall-home";
import Project from "../components/home/projects-home";
import Events from "../components/home/events-home";
import Blog from "../components/home/blog-home";

export default function HomePage() {
  return (
    <div className="bg-[#117DBE]">
      <Helmet>
        <title>Engineers Without Borders — KNUST Chapter</title>
        <meta name="description" content="Engineers Without Borders KNUST builds a better world through engineering projects that empower communities. Join our mission to create sustainable solutions for underserved communities in Ghana." />
        <meta name="keywords" content="EWB, KNUST, Engineers Without Borders, Ghana, volunteer engineering, community development, sustainable engineering" />
        <link rel="canonical" href="https://ewbknust.com" />
      </Helmet>
      <HeroSection />
      
      {/* Overlapping white card wrapper */}
      <div className="relative z-20 -mt-16 md:-mt-24 w-full bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <PartnersSection />
        <AboutSection />
        <ImpactStatsSection />
        <WhatWeDoSection />
        <Project />
        <ActionCall />
        <Events />
        <Blog />
      </div>
    </div>
  );
}
