"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NobilitaHouseSVG from "./NobilitaHouseSVG";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: "OUR STORY", href: "/our-story" },
  { label: "PRODUCTS", href: "/explore-collection" },
  { label: "TECHNICAL RESOURCES", href: "/technical-data" },
  { label: "MADE IN ITALY", href: "/made-in-italy" },
  { label: "CONTACT US", href: "/#contact-us" }
];

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const handleLinkClick = (href: string) => {
    onClose();
    if (href === "/#contact-us") {
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        window.dispatchEvent(new CustomEvent("open-query-form"));
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] bg-[#007190] w-full h-full flex flex-col overflow-y-auto md:overflow-hidden"
        >
          {/* Main Content Area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 w-full h-full relative px-8 py-12 md:px-16 lg:px-24 md:py-16 items-start gap-8 md:gap-12">
            
            {/* Left Column: Back button & Links */}
            <div className="flex flex-col justify-start md:pl-8 lg:pl-16">
              {/* Top: Back Button */}
              <div className="w-full flex justify-start mb-8 md:mb-12">
                <button
                  onClick={onClose}
                  className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-white/60 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-300 focus:outline-none"
                  aria-label="Close menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-white/80 group-hover:text-white transition-transform duration-300 transform group-hover:-translate-x-0.5"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
              </div>

              {/* Center: Links */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col space-y-6 md:space-y-10"
              >
                {menuLinks.map((link) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="font-ivymode font-light text-white uppercase tracking-[0.2em] hover:text-white/70 transition-all duration-300 text-[clamp(22px,3.5vw,36px)] leading-relaxed inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom: Mobile-only Logo */}
              <div className="block md:hidden pt-12 pb-6">
                <div className="w-[180px] mx-auto">
                  <img
                    src="/images/NOBILITA_white.png"
                    alt="Porcellana Nobilita"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: House & Logo (Desktop Only) */}
            <div className="hidden md:flex flex-col items-center justify-start space-y-6 md:space-y-8 h-full">
              {/* House drawing */}
              <div className="w-full flex justify-center items-center">
                <NobilitaHouseSVG 
                  variant="white" 
                  size={360} 
                  animate={isOpen} 
                  className="opacity-90 max-w-full"
                />
              </div>

              {/* Logo block */}
              <div className="w-[240px] lg:w-[280px]">
                <img
                  src="/images/NOBILITA_white.png"
                  alt="Porcellana Nobilita"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
