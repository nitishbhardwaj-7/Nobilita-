"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show indicator only after scrolling down 150px
      setIsVisible(scrollY > 150);

      // Check if user is near the bottom (within 80px of the page bottom)
      setIsAtBottom(scrollY + windowHeight >= documentHeight - 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // We shift:
  // - Text moves down by 28px in the 'up' state.
  // - Arrow moves up by 72px and rotates 180 degrees.
  const textVariants = {
    down: { y: 0, rotate: 180 },
    up: { y: 28, rotate: 180 },
  };

  const arrowVariants = {
    down: { y: 0, rotate: 0 },
    up: { y: -72, rotate: 180 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-12 right-6 md:right-10 z-[999] cursor-pointer select-none group h-24 flex items-center justify-center w-10"
        >
          <div className="flex flex-col items-center relative">
            {/* Scroll Text */}
            <motion.span
              variants={textVariants}
              animate={isAtBottom ? "up" : "down"}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="font-ivymode text-[13px] md:text-[15px] tracking-[0.25em] text-black font-light select-none ml-[-4.5px]"
              style={{ writingMode: "vertical-rl" }}
            >
              scroll
            </motion.span>

            {/* Spacer between elements in default state */}
            <div className="h-2" />

            {/* Animated Chevron Container */}
            <motion.div
              variants={arrowVariants}
              animate={isAtBottom ? "up" : "down"}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="text-[#007190] flex flex-col items-center -space-y-2.5"
            >
              {/* Chevron 1 (Top) */}
              <motion.div
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, 3, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                  delay: 0
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>

              {/* Chevron 2 (Bottom) */}
              <motion.div
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, 3, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                  delay: 0.35
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
