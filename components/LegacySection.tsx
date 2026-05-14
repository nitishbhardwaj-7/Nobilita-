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
        className="w-full md:w-1/3 h-[50vh] md:h-[100vh]"
      >
        <img 
          src="/nobilita/images/Trevi-Fountain-Large.jpeg" 
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
        className="w-full md:w-1/3 h-[50vh] md:h-[100vh] bg-white flex flex-col items-center justify-center"
      >
        <img 
          src="/nobilita/images/DP801729.png" 
          alt="Palazzo" 
          loading="lazy"
          className="w-full h-auto mb-12 md:mb-[180px] object-contain scale-[1.3] md:scale-[1.8]"
        />
        <p className="font-gurmukhi font-light font-normal text-brand-charcoal text-center text-[clamp(24px,4vw,36px)] uppercase tracking-[0.1em]">
          Designed for legacy
        </p>
      </motion.div>
      
      {/* Right Image */}
      <motion.div 
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/3 h-[50vh] md:h-[100vh]"
      >
        <img 
          src="/nobilita/images/rightlegacy.jpg" 
          alt="Roman arches" 
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
