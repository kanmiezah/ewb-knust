import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer() {
  return (
    <footer className="bg-[#111] pt-20 pb-8 text-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#117DBE] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
          
          {/* Brand Column (Span 4) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 flex flex-col items-start">
            <Link to="/" onClick={scrollToTop} className="mb-8 flex items-center gap-2.5">
              <img src={Logo} alt="EWB Logo" className="h-10 w-auto opacity-90" />
              <span className="font-bold tracking-widest uppercase text-sm">EWB-KNUST</span>
            </Link>
            
            <p className="text-[17px] text-white/50 leading-[1.8] max-w-sm mb-8">
              Engineers Without Borders — KNUST. Driving sustainable solutions through engineering innovation and community partnership in Ghana and beyond.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/ewbknust" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://twitter.com/ewbknust" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.facebook.com/ewbknust" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Columns (Span 2 each) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <span className="text-[11px] font-bold tracking-widest text-[#117DBE] uppercase mb-1">Company</span>
            <Link to="/about" onClick={scrollToTop} className="text-[17px] text-white/50 hover:text-white transition-colors">About Us</Link>
            <Link to="/projects" onClick={scrollToTop} className="text-[17px] text-white/50 hover:text-white transition-colors">Projects</Link>
            <Link to="/blog" onClick={scrollToTop} className="text-[17px] text-white/50 hover:text-white transition-colors">Journal</Link>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <span className="text-[11px] font-bold tracking-widest text-[#117DBE] uppercase mb-1">Engage</span>
            <Link to="/membership" onClick={scrollToTop} className="text-[17px] text-white/50 hover:text-white transition-colors">Get Involved</Link>
            <Link to="/events" onClick={scrollToTop} className="text-[17px] text-white/50 hover:text-white transition-colors">Events</Link>
            <Link to="/contact" onClick={scrollToTop} className="text-[17px] text-white/50 hover:text-white transition-colors">Contact</Link>
          </div>

          {/* Contact Details (Span 4) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 flex flex-col gap-6">
            <span className="text-[11px] font-bold tracking-widest text-[#117DBE] uppercase mb-1">Contact Info</span>
            
            <div>
              <p className="text-[17px] text-white font-medium mb-1">Location</p>
              <p className="text-[17px] text-white/50 leading-[1.6]">Engineering Building, KNUST<br/>Kumasi, Ghana</p>
            </div>
            
            <div>
              <p className="text-[17px] text-white font-medium mb-1">Get in touch</p>
              <a href="mailto:ewbknust@gmail.com" className="text-[17px] text-white/50 hover:text-white transition-colors block mb-1">ewbknust@gmail.com</a>
              <a href="tel:+233595826411" className="text-[17px] text-white/50 hover:text-white transition-colors block">(+233) 59-582-6411</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/40 tracking-wider">
            © {new Date().getFullYear()} ENGINEERS WITHOUT BORDERS – KNUST.
          </p>
          <div className="flex items-center gap-6 text-[11px] text-white/40 tracking-wider">
            <span className="hover:text-white/70 transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white/70 transition-colors cursor-pointer">TERMS OF SERVICE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
