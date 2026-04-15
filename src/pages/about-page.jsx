import React from "react";
import { Helmet } from "react-helmet-async";

import HeroSection from "../components/about/hero-about";
import AboutUs from "../components/about/about-about";
import Team from "../components/about/team-about";
import Gallery from "../components/about/gallery-about";
import ActionCall from "../components/home/actioncall-home";

export default function AboutPage() {
  return (
    <div className="bg-[#117DBE]">
      <Helmet>
        <title>About Us — EWB-KNUST</title>
        <meta name="description" content="Learn about Engineers Without Borders KNUST — our mission, our team, and the impact we make through sustainable engineering projects in underserved communities across Ghana." />
      </Helmet>
      <HeroSection />
      
      {/* Overlapping white card wrapper */}
      <div className="relative z-20 -mt-16 md:-mt-24 w-full bg-white rounded-t-[3rem] md:rounded-t-[4rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
        <AboutUs />
        <Team />
        <Gallery />
        <ActionCall />
      </div>
    </div>
  );
}
