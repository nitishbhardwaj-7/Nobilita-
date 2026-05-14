"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-brand-dark">
      <img 
        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80" 
        alt="Luxury Italian tile interior" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-[10vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="font-gurmukhi font-light text-white text-center leading-[1.1] tracking-[0.05em] text-[clamp(32px,8vw,90px)] uppercase">
            DISCOVER THE<br />LEGACY
          </h1>
          
          <p className="font-gurmukhi font-light text-white/90 text-center max-w-4xl mt-12 md:mt-32 text-[clamp(16px,2.5vw,32px)]">
            Timeless Italian surfaces crafted for the modern era
          </p>
          
          <button className="mt-12 border border-white/40 text-white bg-transparent px-8 md:px-[40px] py-3 md:py-[12px] font-michroma text-[clamp(14px,2vw,22px)] tracking-[0.2em] transition-all duration-500 hover:bg-white hover:text-brand-dark uppercase">
            EXPLORE THE COLLECTION
          </button>
        </motion.div>
      </div>
    </section>
  );
}
