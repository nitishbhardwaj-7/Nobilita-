"use client";

import React, { useState, useEffect, useRef } from "react";
import NavigationOverlay from "./NavigationOverlay";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMouseNearTop = useRef(false);

  const resetHideTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // Hide only if we are scrolled down and mouse is not at the top
      if (window.scrollY > 50 && !isMouseNearTop.current) {
        setIsVisible(false);
      }
    }, 2500);
  };

  const showNavbar = () => {
    setIsVisible(true);
    resetHideTimeout();
  };

  // Scroll event handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        showNavbar();
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        showNavbar();
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide immediately
        setIsVisible(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial trigger to hide after landing if no scroll/hover occurs
    resetHideTimeout();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lastScrollY]);

  // Mouse move event handling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If mouse is within 80px of the top of the viewport
      if (e.clientY <= 80) {
        isMouseNearTop.current = true;
        setIsVisible(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      } else {
        if (isMouseNearTop.current) {
          isMouseNearTop.current = false;
          resetHideTimeout();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Scrollable / Hoverable Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[10000] flex items-center justify-between px-6 md:px-12 py-3 md:py-4 bg-[#007190] shadow-md transition-transform duration-500 ease-in-out transform ${isVisible || isNavOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Animated Hamburger / Close Icon */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="relative w-8 h-8 focus:outline-none z-[10000] transition-opacity hover:opacity-80 flex items-center justify-center"
          aria-label="Toggle navigation menu"
        >
          <span 
            className="absolute block h-[1px] w-7 bg-white transition-all duration-300 ease-in-out"
            style={{
              transform: isNavOpen ? "translateY(0px) rotate(45deg)" : "translateY(-6px) rotate(0deg)"
            }}
          />
          <span 
            className="absolute block h-[1px] w-7 bg-white transition-all duration-300 ease-in-out"
            style={{
              transform: isNavOpen ? "scaleX(0)" : "scaleX(1)",
              opacity: isNavOpen ? 0 : 1
            }}
          />
          <span 
            className="absolute block h-[1px] w-7 bg-white transition-all duration-300 ease-in-out"
            style={{
              transform: isNavOpen ? "translateY(0px) rotate(-45deg)" : "translateY(6px) rotate(0deg)"
            }}
          />
        </button>

        {/* Logo */}
        <img
          src="/nobilita3/images/NOBILITA_white.png"
          alt="Porcellana Nobilita"
          loading="lazy"
          className="h-10 md:h-12 w-auto object-contain"
        />
      </nav>

      {/* Navigation Overlay */}
      <NavigationOverlay isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
