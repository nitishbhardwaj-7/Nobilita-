"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
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
            {/* Palazzo Icon */}
            <img 
              src="/nobilita/images/icon_only_white.png" 
              alt="Palazzo Icon" 
              className="h-[320px] w-auto object-contain"
            />
            
            {/* Programmatic Logo Group */}
            <div className={`mt-4 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
              <img 
                src="/nobilita/images/NOBILITA_white.png" 
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
