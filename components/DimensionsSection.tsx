"use client";

import React from "react";
import { motion } from "framer-motion";

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function DimensionsSection() {
  return (
    <section className="w-full bg-white py-24 flex flex-col items-center">
      {/* Title - slide up reveal */}
      <div className="w-full px-4 mb-16 text-center overflow-hidden py-1">
        <h2 className="font-ivymode text-[clamp(28px,5vw,60px)] text-[#545759] tracking-[0.1em] uppercase inline-block">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            FORMAT & DIMENSIONS
          </motion.span>
        </h2>
      </div>

      {/* Specification Grid with stagger */}
      <motion.div 
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-7xl px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
      >
        {/* Column 1: THICKNESS */}
        <motion.div variants={childVariants} className="flex flex-col items-center text-center space-y-6 md:space-y-6">
          <h3
            className="font-didot tracking-[0.15em] font-semibold text-[#545759] uppercase text-[clamp(20px,2.5vw,28px)]"
            style={{ fontFamily: "var(--font-didot), Georgia, serif" }}
          >
            THICKNESS
          </h3>
          <div className="font-michroma font-light text-[#545759] space-y-3 md:space-y-4 uppercase tracking-wider text-[clamp(16px,2vw,22px)]">
            <p>6.5 MM</p>
            <p>12 MM</p>
          </div>
        </motion.div>

        {/* Column 2: DIMENSIONS */}
        <motion.div variants={childVariants} className="flex flex-col items-center text-center space-y-6 md:space-y-6">
          <h3
            className="font-didot tracking-[0.15em] font-semibold text-brand-dark/70  uppercase text-[clamp(20px,2.5vw,28px)]"
            style={{ fontFamily: "var(--font-didot), Georgia, serif" }}
          >
            DIMENSIONS
          </h3>
          <div className="font-michroma font-light text-brand-dark/70 space-y-3 md:space-y-4 uppercase tracking-wider text-[clamp(16px,2vw,22px)]">
            <p>1600 X 3200 MM</p>
            <p>1620 X 3240 MM</p>
          </div>
        </motion.div>

        {/* Column 3: FORMAT */}
        <motion.div variants={childVariants} className="flex flex-col items-center text-center space-y-6 md:space-y-6">
          <h3
            className="font-didot tracking-[0.15em] font-semibold text-brand-dark/70  uppercase text-[clamp(20px,2.5vw,28px)]"
            style={{ fontFamily: "var(--font-didot), Georgia, serif" }}
          >
            FORMAT
          </h3>
          <div className="font-michroma font-light text-brand-dark/70 space-y-3 md:space-y-4 uppercase tracking-wider text-[clamp(16px,2vw,22px)]">
            <p>RECTIFIED</p>
            <p>GROSS</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Feature Image with Centered Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full px-4 md:px-0 flex justify-center items-center overflow-hidden"
      >
        <img
          src="/nobilita3/images/Orobico.jpg"
          alt="Orobico Luxury Interior"
          loading="lazy"
          className="w-full h-auto max-h-[450px] object-cover"
        />
        <motion.button 
          whileTap={{ scale: 0.96 }}
          className="absolute border border-white text-white bg-transparent px-10 py-3.5 font-michroma text-[clamp(12px,1.5vw,26px)] tracking-[0.25em] transition-colors duration-2000 uppercase group overflow-hidden"
        >
          <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            TECHNICAL DATA
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
