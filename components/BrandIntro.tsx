"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  image?: string;
}

export default function BrandIntro({ title, subtitle, buttonText, image }: Props) {
  const defaultSubtitle = "Inspired by Italy's noble heritage and Baroque architecture, NOBILITA porcelain is crafted in Modena, Italy, home to Ferrari, Acetaia Giusti, and Brioni. A collection where timeless Italian elegance meets advanced porcelain technology.";

  return (
    <section className="w-full min-h-screen bg-[#007190] flex flex-col items-center justify-center px-6 md:px-20 py-16 md:py-24">
      <div className="w-full max-w-5xl flex flex-col items-center text-center space-y-10 md:space-y-14">

        {/* Top Header Image (tag.png) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[480px] md:max-w-[850px] flex flex-col items-center"
        >
          <img
            src="/nobilita3/images/Links/tag.png"
            alt="Il Gres Imperiale d'Italia"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
          <span className="font-michroma text-white/50 text-[clamp(12px,1.8vw,24px)] tracking-[0.2em]">
            The Imperial Stone of Italy
          </span>
        </motion.div>

        {/* Middle Logo (NOBILITA_white.png) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[300px] md:max-w-[500px]"
        >
          <img
            src={image || "/nobilita3/images/NOBILITA_white.png"}
            alt="Porcellana Nobilita"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Bottom Paragraph Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-[850px]"
        >
          <p className="font-ivymode font-extralight text-white leading-loose text-center text-[clamp(16px,2vw,18px)] tracking-widest leading-loose">
            {subtitle || defaultSubtitle}
          </p>
        </motion.div>

        {/* Button: OUR STORY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden border border-white text-white bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group"
          >
            <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#007190]">
              {buttonText || "OUR STORY"}
            </span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
