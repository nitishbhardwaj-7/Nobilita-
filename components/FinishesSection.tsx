"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const finishes = [
  { 
    name: "POLISHED", 
    img: "/nobilita3/images/Links/Onice Bianco 1.jpg", 
    darkText: true,
    desc: "A glossy and reflective surface that enhances depth, adding luxurious look."
  },
  { 
    name: "MATTE", 
    img: "/nobilita3/images/Links/Basaltina face 1.jpg", 
    darkText: false,
    desc: "A non-reflective and refined finish, with added slip resistance."
  },
  { 
    name: "HONED", 
    img: "/nobilita3/images/Links/Statuario Ultimo 1.jpg", 
    darkText: true,
    desc: "A smooth, satin-like finish that balances subtle sheen with modern elegance."
  },
  { 
    name: "STRUCTURED MATTE", 
    img: "/nobilita3/images/Links/White Camouflage Face 1.jpg", 
    darkText: true,
    desc: "Leather-inspired texture with subtle richness and enhanced grip."
  },
  { 
    name: "3D-5D MATTE", 
    img: "/nobilita3/images/Travertino Romano Classico Face 1.jpg", 
    darkText: true,
    desc: "A multi-dimensional finish that brings depth, texture, and realism to stone surfaces."
  },
];

export default function FinishesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-24 flex flex-col items-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-ivymode text-[clamp(32px,5vw,60px)] text-brand-dark/80 tracking-[0.2em] text-center mb-20 uppercase"
      >
        FINISHES
      </motion.h2>

      {/* High-Performance Pure CSS Accordion */}
      <div className="w-full flex flex-col h-[600px] md:h-[900px] gap-2 md:gap-3 overflow-hidden">
        {finishes.map((finish, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={finish.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative w-full overflow-hidden cursor-pointer transition-[flex-grow] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex-grow]"
              style={{ 
                flexGrow: isHovered ? 2.5 : 1,
                flexBasis: 0,
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden"
              }}
            >
              {/* Texture Image with GPU Acceleration */}
              <img 
                src={finish.img} 
                alt={finish.name} 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  willChange: "transform"
                }}
              />
              
              {/* Overlay */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                  finish.darkText 
                    ? (isHovered ? 'bg-black/[0.03]' : 'bg-transparent') 
                    : (isHovered ? 'bg-black/10' : 'bg-black/25')
                }`} 
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 z-10 pointer-events-none">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <span className={`font-michroma text-[clamp(10px,1.2vw,16px)] tracking-widest ${
                    finish.darkText ? 'text-brand-dark/50' : 'text-white/40'
                  }`}>
                    0{i + 1}
                  </span>
                  
                  <h3
                    className={`font-didot font-medium tracking-[0.2em] uppercase text-[clamp(14px,2.2vw,28px)] ${
                      finish.darkText ? 'text-brand-dark/80' : 'text-white'
                    }`}
                    style={{ fontFamily: "var(--font-didot), Georgia, serif" }}
                  >
                    {finish.name}
                  </h3>
                </div>

                {/* Subtitle Transition */}
                <p
        className={`font-ivymode italic max-w-full ml-8 md:ml-[45px] text-[clamp(14px,1.8vw,20px)] transition-all duration-500 ease-out ${
                    finish.darkText ? 'text-brand-charcoal/80' : 'text-white/80'
                  } ${
                    isHovered 
                      ? "opacity-100 max-h-24 mt-4 translate-y-0" 
                      : "opacity-0 max-h-0 mt-0 -translate-y-2 overflow-hidden"
                  }`}
                >
                  {finish.desc}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div 
                className={`absolute bottom-0 left-0 h-0.5 z-20 transition-all duration-500 ease-out ${
                  finish.darkText ? 'bg-brand-dark' : 'bg-white'
                }`}
                style={{ width: isHovered ? "100%" : "0%" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
