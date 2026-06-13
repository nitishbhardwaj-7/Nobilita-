"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        className="font-ivymode text-[clamp(32px,5vw,60px)] text-[#545759] tracking-[0.2em] text-center mb-20 uppercase"
      >
        FINISHES
      </motion.h2>

      {/* High-Performance Accordion */}
      <div className="w-full flex flex-col h-[600px] md:h-[900px] gap-2 md:gap-3 overflow-hidden">
        {finishes.map((finish, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={finish.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative w-full overflow-hidden cursor-pointer transition-[flex-grow] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[flex-grow]"
              style={{ 
                flexGrow: isHovered ? 2.5 : 1,
                flexBasis: 0,
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden"
              }}
            >
              {/* Texture Image with Framer Motion Ken Burns */}
              <motion.img 
                src={finish.img} 
                alt={finish.name} 
                loading="lazy"
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover origin-center"
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
                <div className="relative">
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <span className={`font-michroma text-[clamp(10px,1.2vw,16px)] tracking-widest ${
                      finish.darkText ? 'text-brand-dark/50' : 'text-white/40'
                    }`}>
                      0{i + 1}
                    </span>
                    
                    <motion.h3
                      animate={{ letterSpacing: isHovered ? "0.28em" : "0.2em" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`font-didot font-medium uppercase text-[clamp(14px,2.2vw,28px)] ${
                        finish.darkText ? 'text-[#545759]' : 'text-white'
                      }`}
                      style={{ fontFamily: "var(--font-didot), Georgia, serif" }}
                    >
                      {finish.name}
                    </motion.h3>
                  </div>

                  {/* Smooth Absolute Overlay Reveal using AnimatePresence (keeps vertical position static) */}
                  <AnimatePresence initial={false}>
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute top-full left-0 font-ivymode italic max-w-full ml-8 md:ml-[45px] text-[clamp(14px,1.8vw,20px)] mt-4 pointer-events-none ${
                          finish.darkText ? 'text-[#545759]' : 'text-white/80'
                        }`}
                      >
                        {finish.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
