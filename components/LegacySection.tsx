"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LegacySection() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left Image (Trevi Fountain) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
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
        {/* Caption */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
          <p className="font-michroma tracking-[0.20em] text-[clamp(11px,1.2vw,8px)] text-white uppercase">
            TREVI FOUNTAIN
          </p>
        </div>
      </motion.div>

      {/* Center Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full md:w-1/3 min-h-[50vh] md:h-screen bg-white flex flex-col items-center justify-start relative px-6"
      >
        <div className="flex flex-col items-center justify-start w-full max-w-none px-4">
          {/* Palazzo architectural sketch */}
          <img 
            src="/nobilita3/images/Links/DP801729.png" 
            alt="Palazzo architectural sketch" 
            loading="lazy"
            className="w-[105%] md:w-[200%] lg:w-[200%] max-w-none h-auto object-contain"
          />
          {/* NOBILITA Logo Black */}
          <img 
            src="/nobilita3/images/Links/NOBILITA Logo BLACK.png"
            alt="Nobilita Logo"
            loading="lazy"
            className="h-10 md:h-20 lg:h-24 w-auto object-contain mb-4"
          />
          {/* tag grey.png ("Il Gres Imperiale d'Italia") */}
          <img 
            src="/nobilita3/images/Links/tag%20grey.png"
            alt="Il Gres Imperiale d'Italia"
            loading="lazy"
            className="w-[75%] md:w-[80%] lg:w-[85%] max-w-[320px] h-auto object-contain mt-1"
          />
        </div>
      </motion.div>

      {/* Right Image (Palazzo della Civiltà Italiana) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
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
        {/* Caption */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10">
          <p className="font-michroma tracking-[0.15em] text-[clamp(11px,1.2vw,8px)] text-white uppercase">
            PALAZZO DELLA CIVILTÀ ITALIANA
          </p>
        </div>
      </motion.div>
    </section>
  );
}
