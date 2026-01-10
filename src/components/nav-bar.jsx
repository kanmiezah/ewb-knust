import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NavLinks } from "../constants/nav-links";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

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

  return (
    <nav className="bg-[#0a3d5c] text-white py-4 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <img
            src={Logo}
            alt="EWB Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {NavLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-300 font-semibold transition-colors duration-200"
                    : "hover:text-blue-300 transition-colors duration-200"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              to="/join"
              className="block bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md transition-colors duration-200"
            >
              Join
            </NavLink>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden mt-4 bg-[#0d4a6e] rounded-lg p-4 absolute left-6 right-6 shadow-lg z-50"
        >
          <ul className="flex flex-col gap-4">
            {NavLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-300 font-semibold block transition-colors duration-200"
                      : "hover:text-blue-300 block transition-colors duration-200"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/membership"
                className="block bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md text-center transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
