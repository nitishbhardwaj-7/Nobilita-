"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LegacySection() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left Image (Trevi Fountain) with slow opacity + scale-down entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative w-full md:w-1/3 h-[50vh] md:h-screen overflow-hidden"
      >
        <img
          src="/nobilita3/images/Links/Trevi-Fountain-Large.jpeg"
          alt="Trevi Fountain"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Shadow Overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Caption with slide-up heading reveal */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10 overflow-hidden py-1">
          <motion.p 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="font-michroma tracking-[0.20em] text-[clamp(11px,1.2vw,8px)] text-white uppercase inline-block"
          >
            TREVI FOUNTAIN
          </motion.p>
        </div>
      </motion.div>

      {/* Center Content */}
      <div className="w-full md:w-1/3 min-h-[50vh] md:h-screen bg-white flex flex-col items-center justify-start relative px-6">
        <div className="flex flex-col items-center justify-start w-full max-w-none px-4">
          {/* Palazzo architectural sketch with horizontal translation reveal */}
          <motion.img 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            src="/nobilita3/images/Links/DP801729.png" 
            alt="Palazzo architectural sketch" 
            loading="lazy"
            className="w-[105%] md:w-[200%] lg:w-[200%] max-w-none h-auto object-contain"
          />
          {/* NOBILITA Logo Black with delay */}
          <motion.img 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            src="/nobilita3/images/Links/NOBILITA Logo BLACK.png"
            alt="Nobilita Logo"
            loading="lazy"
            className="h-10 md:h-20 lg:h-24 w-auto object-contain mb-4"
          />
          {/* tag grey.png with delay */}
          <motion.img 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            src="/nobilita3/images/Links/tag%20grey.png"
            alt="Il Gres Imperiale d'Italia"
            loading="lazy"
            className="w-[75%] md:w-[80%] lg:w-[85%] max-w-[320px] h-auto object-contain mt-1"
          />
        </div>
      </div>

      {/* Right Image (Palazzo della Civiltà Italiana) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative w-full md:w-1/3 h-[50vh] md:h-screen overflow-hidden"
      >
        <img
          src="/nobilita3/images/rightlegacy.jpg"
          alt="Palazzo della Civiltà Italiana"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Shadow Overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Caption with slide-up heading reveal */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10 overflow-hidden py-1">
          <motion.p 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="font-michroma tracking-[0.15em] text-[clamp(11px,1.2vw,8px)] text-white uppercase inline-block"
          >
            PALAZZO DELLA CIVILTÀ ITALIANA
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
