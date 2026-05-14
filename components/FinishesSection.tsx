"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const finishes = [
  { name: "MATTE", img: "/nobilita/images/Pure Onix 1.jpg" },
  { name: "HONED", img: "/nobilita/images/Travertino Romano Classico Face 1.jpg" },
  { name: "POLISHED", img: "/nobilita/images/Calacatta Sponda 1_1.jpg" },
  { name: "STRUCTURED", img: "/nobilita/images/White Camouflage Face 1 (1).jpg" },
  { name: "3D / 5D", img: "/nobilita/images/Gris Di Savoie Face 3.jpg" },
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
        className="font-gurmukhi font-light text-[clamp(32px,5vw,60px)] text-brand-dark tracking-[0.2em] text-center mb-20 uppercase"
      >
        FINISHES
      </motion.h2>

      {/* Optimized Flex Accordion */}
      <div className="w-full flex flex-col h-[500px] md:h-[800px] border-y border-brand-dark/5">
        {finishes.map((finish, i) => (
          <motion.div
            key={finish.name}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ 
              flex: hoveredIndex === i ? 2.5 : 1
            }}
            transition={{ 
              duration: 0.7, 
              ease: [0.23, 1, 0.32, 1] 
            }}
            className="relative w-full overflow-hidden cursor-pointer border-b border-brand-dark/5 will-change-[flex]"
          >
            {/* Texture Image with GPU Acceleration */}
            <motion.img 
              src={finish.img} 
              alt={finish.name} 
              loading="lazy"
              animate={{ 
                scale: hoveredIndex === i ? 1.05 : 1,
              }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full object-cover transform-gpu"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${hoveredIndex === i ? 'bg-black/10' : 'bg-black/30'}`} />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 z-10 pointer-events-none">
              <div className="flex items-center space-x-4 md:space-x-6">
                <span className="font-michroma text-[10px] text-white/40 tracking-widest">
                  0{i + 1}
                </span>
                
                <h3 className="font-montserrat font-light text-white tracking-[0.5em] uppercase text-[clamp(12px,2vw,22px)]">
                  {finish.name}
                </h3>
              </div>

              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-4 font-cormorant italic text-white/80 max-w-md ml-8 md:ml-[45px] text-[clamp(14px,2vw,22px)]"
                  >
                    Architectural surface with refined tactile qualities.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Accent Line */}
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-white z-20"
              animate={{ width: hoveredIndex === i ? "100%" : "0%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
