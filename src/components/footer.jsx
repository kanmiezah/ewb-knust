import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Logo from "../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#062c46] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left: Logo & Contact */}
        <div>
          <div className="text-sm text-white/80 space-y-3">
            <div>
              <p className="font-medium text-white">Address</p>
              <p>Engineering Building, Main Campus, Sydney NSW</p>
            </div>

            <div>
              <p className="font-medium text-white">Contact</p>
              <p>(+233) 59-582-6411</p>
              <p>ewbknust@gmail.com</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-white/80">
            <Facebook size={18} />
            <Instagram size={18} />
            <Twitter size={18} />
          </div>
        </div>

        {/* Middle Links */}
        <div className="grid grid-cols-1 gap-3 text-sm text-white/80">
          <a href="/about">About us</a>
          <a href="/projects">Our projects</a>
          <a href="/blog">Blog</a>
          <a href="/#">Get involved</a>
          <a href="#">Resources</a>
        </div>

        {/* Right Links */}
        <div className="grid grid-cols-1 gap-3 text-sm text-white/80">
          <a href="/contact">Contact us</a>
          <a href="/#">Donate</a>
          <a href="#">Partners</a>
          <a href="/events">Events</a>
          <a href="#">Gallery</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70">
          <p>© 2025 Engineers Without Borders. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
