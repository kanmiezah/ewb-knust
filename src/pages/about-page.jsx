import React from "react";

import HeroSection from "../components/about/hero-about";
import AboutUs from "../components/about/about-about";
import Team from "../components/about/team-about";
import Gallery from "../components/about/gallery-about";
import ActionCall from "../components/home/actioncall-home";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Team />
      <Gallery />
      <ActionCall />
    </>
  );
}
