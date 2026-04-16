import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLinks } from "../constants/nav-links";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Primary nav links for the pill (first 3: Home, About, Projects)
  const pillLinks = NavLinks.slice(0, 3);
  // Overflow links for "More" dropdown (Events, Blog, Contact)
  const overflowLinks = NavLinks.slice(3);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled && !isMobileMenuOpen
          ? "py-3 bg-white/80 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
          : "py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo - Left */}
        <div className="flex-1">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group relative z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src={Logo}
              alt="EWB-KNUST Logo"
              className="h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`text-sm font-bold tracking-wide transition-colors duration-300 hidden sm:inline ${
                scrolled && !isMobileMenuOpen ? "text-[#111]" : "text-white"
              }`}
            >
              EWB-KNUST
            </span>
          </NavLink>
        </div>

        {/* Desktop Navigation - Center Pill */}
        <div className="hidden lg:flex items-center justify-center">
          <div
            className={`px-1.5 py-1 rounded-full flex items-center transition-all duration-500 ${
              scrolled
                ? "bg-[#111]/90 backdrop-blur-md border border-black/5 shadow-lg"
                : "bg-[#111]/70 backdrop-blur-md border border-white/10 shadow-2xl"
            }`}
          >
            {pillLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-[11px] uppercase font-semibold tracking-[0.12em] transition-all duration-300 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* More dropdown trigger */}
            {overflowLinks.length > 0 && (
              <div className="relative group">
                <button className="px-3 py-2 rounded-full text-[11px] uppercase font-semibold tracking-[0.12em] text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-1">
                  More
                  <ChevronDown className="w-3 h-3" />
                </button>
                {/* Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-40 bg-[#111]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  {overflowLinks.map((link) => (
                    <NavLink
                      key={link.id}
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-[11px] uppercase font-semibold tracking-[0.12em] transition-colors ${
                          isActive
                            ? "text-white bg-white/10"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            {/* Join button */}
            <NavLink
              to="/membership"
              className={`ml-1.5 px-4 py-2 rounded-full text-[11px] uppercase font-bold tracking-[0.12em] transition-all duration-300 ${
                scrolled
                  ? "bg-[#111] text-white hover:bg-[#222] shadow-sm"
                  : "bg-white text-[#111] hover:bg-gray-100 shadow-lg"
              }`}
            >
              Join
            </NavLink>
          </div>
        </div>

        {/* Right Section - Socials */}
        <div className="flex-1 hidden lg:flex items-center justify-end gap-4">
          <a
            href="https://www.instagram.com/ewbknust"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${
              scrolled
                ? "text-[#111]/60 hover:text-[#111]"
                : "text-white/60 hover:text-white"
            }`}
            aria-label="Instagram"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://twitter.com/ewbknust"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${
              scrolled
                ? "text-[#111]/60 hover:text-[#111]"
                : "text-white/60 hover:text-white"
            }`}
            aria-label="Twitter"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/ewbknust"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${
              scrolled
                ? "text-[#111]/60 hover:text-[#111]"
                : "text-white/60 hover:text-white"
            }`}
            aria-label="Facebook"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden justify-end flex-1">
          <button
            onClick={toggleMobileMenu}
            className={`relative z-50 focus:outline-none p-2 rounded-xl transition-all duration-300 ${
              isMobileMenuOpen
                ? "bg-white/20 text-white"
                : scrolled
                ? "bg-[#111]/5 text-[#111] hover:bg-[#111]/10"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Solid background */}
            <div className="absolute inset-0 bg-[#117DBE]" />
            {/* Decorative blur circle */}
            <div className="absolute top-1/4 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-[#FCB712]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Content */}
            <div
              ref={menuRef}
              className="relative z-10 flex flex-col h-full pt-24 pb-8 sm:pb-12 px-8 sm:px-10"
            >
              {/* Nav Links */}
              <nav className="flex flex-col gap-0.5 flex-1 justify-center">
                {NavLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-4 py-3 sm:py-4 text-[1.75rem] sm:text-[2rem] font-medium tracking-tight transition-all duration-300 group ${
                          isActive
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active indicator */}
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 shrink-0 ${
                              isActive
                                ? "bg-[#FCB712] scale-100"
                                : "bg-white/20 scale-75 group-hover:scale-100 group-hover:bg-white/40"
                            }`}
                          />
                          <span>{link.name}</span>
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="mt-auto">
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="pt-6 border-t border-white/10"
                >
                  <NavLink
                    to="/membership"
                    className="flex items-center justify-center w-full px-8 py-4 bg-white rounded-2xl text-[#111] font-bold text-[15px] tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join EWB-KNUST
                  </NavLink>
                </motion.div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="mt-6 flex items-center justify-center gap-6"
                >
                  <a href="https://www.instagram.com/ewbknust" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-all" aria-label="Instagram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://twitter.com/ewbknust" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-all" aria-label="Twitter">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.facebook.com/ewbknust" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-all" aria-label="Facebook">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
