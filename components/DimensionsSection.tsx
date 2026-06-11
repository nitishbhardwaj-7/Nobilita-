"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DimensionsSection() {
  return (
    <section className="w-full bg-white py-24 flex flex-col items-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-ivymode text-[clamp(28px,5vw,60px)] text-brand-dark tracking-[0.1em] uppercase mb-16 text-center w-full px-4"
      >
        FORMAT & DIMENSIONS
      </motion.h2>

      {/* Specification Grid */}
      <div className="w-full max-w-7xl px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
        {/* Column 1: THICKNESS */}
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <h3 className="font-ivymode tracking-[0.15em] text-brand-charcoal uppercase text-[clamp(20px,2.5vw,24px)]">
            THICKNESS
          </h3>
          <div className="font-michroma font-light text-brand-dark space-y-3 md:space-y-4 uppercase tracking-wider text-[clamp(16px,2vw,22px)]">
            <p>6.5 MM</p>
            <p>12 MM</p>
          </div>
        </div>

        {/* Column 2: DIMENSIONS */}
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <h3 className="font-ivymode tracking-[0.15em] text-brand-charcoal uppercase text-[clamp(20px,2.5vw,24px)]">
            DIMENSIONS
          </h3>
          <div className="font-michroma font-light text-brand-dark space-y-3 md:space-y-4 uppercase tracking-wider text-[clamp(16px,2vw,22px)]">
            <p>1600 X 3200 MM</p>
            <p>1620 X 3240 MM</p>
          </div>
        </div>

        {/* Column 3: FORMAT */}
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <h3 className="font-ivymode tracking-[0.15em] text-brand-charcoal uppercase text-[clamp(20px,2.5vw,24px)]">
            FORMAT
          </h3>
          <div className="font-michroma font-light text-brand-dark space-y-3 md:space-y-4 uppercase tracking-wider text-[clamp(16px,2vw,22px)]">
            <p>RECTIFIED</p>
            <p>GROSS</p>
          </div>
        </div>
      </div>

      {/* Feature Image with Centered Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full px-4 md:px-0 flex justify-center items-center"
      >
        <img
          src="/nobilita3/images/Orobico.jpg"
          alt="Orobico Luxury Interior"
          loading="lazy"
          className="w-full h-auto max-h-[450px] object-cover"
        />
        <button className="absolute border border-white text-white bg-transparent px-10 py-3.5 font-michroma text-[clamp(12px,1.5vw,26px)] tracking-[0.25em] transition-all duration-300 hover:bg-white hover:text-black uppercase">
          TECHNICAL DATA
        </button>
      </motion.div>
    </section>
  );
}
