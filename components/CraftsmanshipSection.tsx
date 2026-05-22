"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CraftsmanshipSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-4">
      <img
        src="/nobilita3/images/The+old+town+of+Castelvetro.jpg"
        alt="Italian craftsmanship texture"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full text-center"
      >
        <h2 className="font-ivymode text-white font-light text-[clamp(24px,7vw,98px)] tracking-[0.1em] uppercase">
          ITALIAN CRAFTSMANSHIP
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center px-6 mt-12 md:mt-24"
      >
        <p className="font-cormorant font-light text-white text-[clamp(18px,3vw,54px)] text-left max-w-[1300px] leading-none">
          In the heart of Modena, where centuries of Italian expertise<br className="hidden md:block" />
          meet innovation, NOBILITA creates porcelain surfaces that <br className="hidden md:block" />
          embody the art of timeless crafmanship.
        </p>

        <button className="mt-12 md:mt-20 border border-white/80 text-white bg-transparent px-8 py-3 font-michroma text-[clamp(14px,2vw,28px)] tracking-[0.25em] transition-colors hover:bg-white hover:text-black uppercase">
          MADE IN ITALY
        </button>
      </motion.div>
    </section>
  );
}
