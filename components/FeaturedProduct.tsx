"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FeaturedProduct() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Background Image */}
      <img 
        src="/nobilita/images/Calacatta Oyster Application 1.jpg" 
        alt="Calacatta Oyster porcelain tile" 
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
      />
      
      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-20">
        
        {/* Top Content: Title and Specs */}
        <div className="mt-8 md:mt-20">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-gurmukhi font-light text-brand-dark text-[clamp(28px,6vw,85px)] tracking-[0.1em] uppercase mb-6 md:mb-12"
          >
            CALACATTA  OYSTER
          </motion.h2>

          {/* Floating Specs Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-md p-5 md:p-10 w-full max-w-[450px] shadow-2xl border border-white/50"
          >
            <div className="space-y-4 md:space-y-8">
              {/* Dimensions */}
              <div className="flex space-x-4">
                <div className="w-1.5 h-6 bg-teal-primary/40 mt-1" />
                <div className="space-y-0.5 md:space-y-2">
                  <h3 className="font-michroma text-[9px] md:text-[11px] tracking-[0.2em] text-brand-grey-mid uppercase">DIMENSIONS</h3>
                  <p className="font-gurmukhi font-light text-brand-dark uppercase tracking-wider text-[clamp(11px,1.5vw,14px)]">
                    6.5MM x 1600 x 3200 (R)<br />
                    12MM x 1620 x 3240 (G)
                  </p>
                </div>
              </div>

              {/* Faces */}
              <div className="flex space-x-4">
                <div className="w-1.5 h-6 bg-teal-primary/40 mt-1" />
                <div className="space-y-0.5 md:space-y-2">
                  <h3 className="font-michroma text-[9px] md:text-[11px] tracking-[0.2em] text-brand-grey-mid uppercase">FACES</h3>
                  <p className="font-gurmukhi font-light text-brand-dark uppercase tracking-wider text-[clamp(11px,1.5vw,14px)]">
                    6.5MM — 1  2  3<br />
                    12MM — BOOKMATCH OF 2
                  </p>
                </div>
              </div>

              {/* Finishes */}
              <div className="flex space-x-4">
                <div className="w-1.5 h-6 bg-teal-primary mt-1" />
                <div className="space-y-0.5 md:space-y-2">
                  <h3 className="font-michroma text-[9px] md:text-[11px] tracking-[0.2em] text-brand-grey-mid uppercase">FINISHES</h3>
                  <p className="font-gurmukhi font-light text-brand-dark uppercase tracking-wider text-[clamp(11px,1.5vw,14px)]">
                    6.5MM — POLISHED & HONED<br />
                    12MM — POLISHED & HONED
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <div className="w-full flex items-center justify-between border-t border-brand-dark/10 pt-6">
          <div className="flex items-center space-x-8">
            <button className="text-brand-dark hover:opacity-50 transition-opacity">
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          
          <h4 className="font-michroma tracking-[0.2em] text-brand-dark md:text-white uppercase text-center flex-1 text-[clamp(10px,1.5vw,18px)]">
            BROWSE FEATURED PRODUCTS
          </h4>

          <div className="flex items-center space-x-8 text-right">
            <button className="text-brand-dark hover:opacity-50 transition-opacity">
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6H39M39 6L34 1M39 6L34 11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
