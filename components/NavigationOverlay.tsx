"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  "About",
  "Products",
  "Technical Resources",
  "Made in Italy",
  "Contact Us"
];

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-teal-primary flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center space-y-4 md:space-y-8 px-6 text-center">
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                onClick={onClose}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
                className="font-cormorant font-light text-white tracking-[0.05em] hover:text-white/70 transition-colors text-[clamp(32px,8vw,72px)] leading-tight"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
