"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LegacySection() {
  return (
    <section className="w-full min-h-[100vh] flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left Image */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/3 h-[30vh] md:h-[100vh]"
      >
        <img
          src="/nobilita3/images/Trevi-Fountain-Large.jpeg"
          alt="Trevi Fountain"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Center Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-full md:w-1/3 min-h-[40vh] md:h-[100vh] bg-white flex flex-col items-center justify-center relative z-10 py-12 md:py-0"
      >
        <div className="flex flex-col items-center w-[130%] md:w-[180%] max-w-none">
          <img 
            src="/nobilita3/images/DP801729.png" 
            alt="Palazzo" 
            loading="lazy"
            className="w-full h-auto mb-4 md:mb-4 lg:mb-4 object-contain"
          />
          <p className="font-ivymode font-normal text-brand-charcoal text-center text-[clamp(20px,2.2vw,40px)] tracking-[0.1em] max-w-[75%] leading-tight">
            Designed for legacy
          </p>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/3 h-[30vh] md:h-[100vh]"
      >
        <img
          src="/nobilita3/images/rightlegacy.jpg"
          alt="Roman arches"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
