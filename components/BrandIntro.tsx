"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrandIntro() {
  return (
    <section className="w-full h-screen bg-teal-primary flex flex-col justify-center px-10 md:px-20 py-8 md:py-12 overflow-hidden">
      {/* Centered Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-6 md:mb-8 text-center"
      >
        <h2 className="font-gurmukhi font-light text-white text-[clamp(24px,5vw,80px)] tracking-[0.1em] leading-tight uppercase">
          IL GRES IMPERIALE D'ITALIA
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center max-w-7xl mx-auto w-full">
        {/* Left: Text Content and Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-6 md:space-y-10"
        >
          <p className="font-gurmukhi font-light text-white leading-[1.4] max-w-xl text-center text-[clamp(16px,2vw,28px)]">
            Inspired by the noble floors of Italian palazzi, NOBILITA reinterprets aristocratic craftsmanship for contemporary architecture.
          </p>
          
          <button className="border text-center border-white/40 text-white bg-transparent px-8 md:px-[40px] py-2 md:py-[14px] font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-teal-primary uppercase">
            OUR STORY
          </button>
        </motion.div>

        {/* Right: Palazzo SVG and Logo Group */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center justify-center space-y-6 md:space-y-10"
        >
          <div className="w-full max-w-[350px]">
            <img 
              src="/nobilita/images/icon_only_white.png" 
              alt="Palazzo Icon" 
              loading="lazy"
              className="w-full h-[250px] md:h-[350px] object-contain"
            />
          </div>
          <img 
            src="/nobilita/images/NOBILITA_white.png" 
            alt="Porcellana Nobilita" 
            loading="lazy"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
