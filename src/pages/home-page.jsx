import React from "react";

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
    <>
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <ImpactStatsSection />
      <PartnersSection />
      <Project />
      <ActionCall />
      <Events />
      <Blog />
    </>
  );
}
