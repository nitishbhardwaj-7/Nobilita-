"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CraftsmanshipSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between py-16 px-6 md:px-16 overflow-hidden">
      {/* Background Image - no blur, clear and bright */}
      <img
        src="/nobilita3/images/Links/MEDICI VILLA copy (1).png"
        alt="Italian craftsmanship"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Very light overlay to improve text contrast while keeping the image bright and clear */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full text-center max-w-[1300px] mx-auto"
      >
        <h2 className="font-ivymode text-white font-light text-[clamp(28px,6.5vw,66px)] tracking-[0.15em] uppercase">
          ITALIAN CRAFTSMANSHIP
        </h2>
      </motion.div>

      {/* Center content (Paragraph & Button) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4 max-w-[1300px] mx-auto w-full"
      >
        <p className="font-ivymode mt-24 font-light text-white text-[clamp(18px,2.8vw,36px)] text-center leading-[1.3] max-w-[1250px]">
          In the heart of Modena, where centuries of Italian expertise<br className="hidden md:block" />
          meet innovation, NOBILITA creates porcelain surfaces that <br className="hidden md:block" />
          embody the art of timeless craftsmanship.
        </p>

        <button className="mt-10 md:mt-32 border border-white text-white bg-transparent px-6 py-3 font-michroma text-[clamp(12px,1.5vw,32px)] tracking-[0.25em] transition-all duration-300 hover:bg-white hover:text-black uppercase">
          MADE IN ITALY
        </button>
      </motion.div>

      {/* Bottom Content: CASA NOBILE at the bottom-right */}
      <div className="relative z-10 w-full flex justify-end items-end mt-auto pr-4 pb-2">
        <span className="font-ivymode text-white/90 text-[clamp(12px,1.5vw,18px)] tracking-[0.25em] uppercase">
          CASA NOBILE
        </span>
      </div>
    </section>
  );
}
