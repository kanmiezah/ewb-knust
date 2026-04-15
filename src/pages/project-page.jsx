import React from "react";
import { Helmet } from "react-helmet-async";

import HeroSection from "../components/projects/hero-project";
import Project from "../components/projects/project-project";
import ActionCall from "../components/home/actioncall-home";

export default function ProjectPage() {
  return (
    <div className="bg-[#117DBE]">
      <Helmet>
        <title>Our Projects — EWB-KNUST</title>
        <meta name="description" content="Explore the engineering projects by EWB-KNUST — from kitchen stoves and clinics to water tracking and irrigation systems empowering communities in Ghana." />
      </Helmet>
      <HeroSection />
      
      {/* Overlapping white card wrapper */}
      <div className="relative z-20 -mt-16 md:-mt-24 w-full bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <Project />
        <ActionCall />
      </div>
    </div>
  );
}
