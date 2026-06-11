"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PalazzoSVG from "@/components/PalazzoSVG";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  const [showContent, setShowContent] = useState(false);
  const [isDrawingFinished, setIsDrawingFinished] = useState(false);

  useEffect(() => {
    // Show additional content (logo group, load bar) after 500ms
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Crossfade from SVG line drawing to hand-drawn PNG after 2.35 seconds of drawing
    const finishTimer = setTimeout(() => {
      setIsDrawingFinished(true);
    }, 2350);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-teal-primary flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center justify-center">
            {/* Palazzo Icon Container for Crossfade */}
            <div className="relative h-[320px] w-[253px] flex items-center justify-center">
              {/* Staggered Line Drawing SVG */}
              <div 
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: isDrawingFinished ? 0 : 1 }}
              >
                <PalazzoSVG 
                  variant="white" 
                  size={320} 
                  animate={true} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Detailed Hand-drawn PNG Image */}
              <div 
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: isDrawingFinished ? 1 : 0 }}
              >
                <img 
                  src="/nobilita3/images/icon_only_white.png" 
                  alt="Detailed Palazzo Icon" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Programmatic Logo Group */}
            <div className={`mt-4 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
              <img 
                src="/nobilita3/images/NOBILITA_white.png" 
                alt="Porcellana Nobilita" 
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Sharp-edged Loading Bar */}
            <div className="mt-16 w-[300px] h-[10px] bg-white/20 overflow-hidden relative">
              {showContent && (
                <div className="absolute top-0 left-0 h-full bg-white loading-bar-fill" />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
