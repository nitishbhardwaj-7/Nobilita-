"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrandIntro() {
  return (
    <section className="w-full min-h-screen bg-[#007190] flex flex-col items-center justify-center px-6 md:px-20 py-16 md:py-24">
      <div className="w-full max-w-7xl">
        {/* Centered Top Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 md:mb-20 text-center"
        >
          <h2 className="font-ivymode text-white text-[clamp(24px,5vw,85px)] tracking-[0.1em] leading-tight uppercase">
            IL GRES IMPERIALE D'ITALIA
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full">
          {/* Left: Text Content and Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center space-y-8 md:space-y-12"
          >
            <p className="font-ivymode text-white leading-[1.4] text-center text-[clamp(18px,2.2vw,32px)]">
              Inspired by the noble floors of Italian palazzi, NOBILITA reinterprets aristocratic craftsmanship for contemporary architecture.
            </p>

            <button className="border border-white/40 text-white bg-transparent px-10 md:px-[50px] py-3 md:py-[18px] font-michroma text-[clamp(12px,1.5vw,18px)] tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-teal-primary uppercase">
              OUR STORY
            </button>
          </motion.div>

          {/* Right: Palazzo SVG and Logo Group */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center space-y-8 md:space-y-12"
          >
            <div className="w-full max-w-[180px] md:max-w-[300px]">
              <img
                src="/nobilita3/images/icon_only_white.png"
                alt="Palazzo Icon"
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full max-w-[180px] md:max-w-[300px]">
              <img
                src="/nobilita3/images/NOBILITA_white.png"
                alt="Porcellana Nobilita"
                loading="lazy"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
