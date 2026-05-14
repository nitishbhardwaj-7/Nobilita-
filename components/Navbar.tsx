"use client";

import React, { useState } from "react";
import NavigationOverlay from "./NavigationOverlay";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 md:py-8 pointer-events-auto">
        <button 
          onClick={() => setIsNavOpen(true)}
          style={{ WebkitTextStroke: "0.5px white" }}
          className="font-michroma font-light text-teal-primary tracking-[0.2em] uppercase text-[clamp(18px,3vw,30px)] transition-opacity hover:opacity-80"
        >
          MENU
        </button>
        <img 
          src="/nobilita/images/NOBILITA_white.png" 
          alt="Porcellana Nobilita" 
          className="h-6 md:h-10 w-auto object-contain"
        />
      </nav>
      
      <NavigationOverlay isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
