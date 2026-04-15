import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";

import NavBar from "./components/nav-bar";
import Footer from "./components/footer";

/* ---------- Lazy-loaded pages for code splitting ---------- */
const HomePage = lazy(() => import("./pages/home-page"));
const AboutPage = lazy(() => import("./pages/about-page"));
const ProjectPage = lazy(() => import("./pages/project-page"));
const SingleProject = lazy(() => import("./pages/singleproject"));
const Blog = lazy(() => import("./pages/media-page"));
const ContactPage = lazy(() => import("./pages/contact-page"));
const SingleBlogPage = lazy(() => import("./pages/singleblog-page"));
const EventsPage = lazy(() => import("./pages/events-page"));
const SingleEventPage = lazy(() => import("./pages/singleevent-page"));
const Membership = lazy(() => import("./pages/membership-page"));
const FullGalleryPage = lazy(() => import("./pages/full-gallery-page"));

/* ---------- Loading Fallback ---------- */
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#117DBE]" />
    </div>
  );
}

/* ---------- 404 Page ---------- */
function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold text-[#111] mb-4">404</h1>
      <p className="text-xl text-black/50 mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#111] text-white font-semibold hover:bg-[#222] transition-all duration-300 hover:shadow-lg"
      >
        ← Back to Home
      </Link>
    </section>
  );
}

/* ---------- Scroll to top on route change ---------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ---------- App ---------- */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:slug" element={<SingleProject />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog/:slug" element={<SingleBlogPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<SingleEventPage />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/gallery" element={<FullGalleryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
