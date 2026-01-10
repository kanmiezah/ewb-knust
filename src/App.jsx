import React from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/nav-bar";
import HomePage from "./pages/home-page";
import AboutPage from "./pages/about-page";
import ProjectPage from "./pages/project-page";
import SingleProject from "./pages/signleproject";
import Blog from "./pages/media-page";
import ContactPage from "./pages/contact-page/";
import SingleBlogPage from "./pages/singleblog-page";
import EventsPage from "./pages/events-page";
import Footer from "./components/footer";
import Membership from "./pages/membership-page";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:slug" element={<SingleProject />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog/:slug" element={<SingleBlogPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/membership" element={<Membership />} />
      </Routes>
      <Footer />
    </>
  );
}
