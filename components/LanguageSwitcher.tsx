"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher({ isVisible }: { isVisible: boolean }) {
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-[10001]"
        >
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="flex items-center px-3 py-2 bg-[#007190]/80 backdrop-blur-md border border-white/20 rounded-sm font-ivymode text-sm tracking-widest hover:bg-[#007190] transition-all shadow-lg"
          >
            <span className={`transition-all duration-300 ${isEnglish ? "text-white font-bold" : "text-white/60"}`}>
              ENG
            </span>
            <span className="text-white/40 mx-2">/</span>
            <span className={`transition-all duration-300 ${!isEnglish ? "text-white font-bold" : "text-white/60"}`}>
              ITA
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
