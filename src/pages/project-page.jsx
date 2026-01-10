import React from "react";

import HeroSection from "../components/projects/hero-project";
import Project from "../components/projects/project-project";

import ActionCall from "../components/home/actioncall-home";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <Project />
      <ActionCall />
    </>
  );
}
