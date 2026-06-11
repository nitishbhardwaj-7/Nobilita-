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
          <p className="font-ivymode font-extralight text-white leading-snug text-center text-[clamp(16px,2vw,18px)] tracking-widest">
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
          <button className="border border-white text-white bg-transparent px-12 py-3.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-all duration-500 hover:bg-white hover:text-[#007190] uppercase">
            {buttonText || "OUR STORY"}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
