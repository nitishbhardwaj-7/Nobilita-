"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "./Navbar";

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  bgImage?: string;
}

const slideshowImages = [
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/1.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/2.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/3.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/4.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/5.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/6.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/7.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/8.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/9.jpg",
  "/nobilita3/images/Application%20images%20used%20for%20EXPLORE%20THE%20COLLECTION%20video/10.jpg",
];

export default function HeroSection({ title, subtitle, buttonText, bgImage }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4500); // Change image every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  const defaultTitle = "EXPLORE THE COLLECTION";
  const defaultSubtitle = "At NOBILITA, we believe that true luxury is not about trends, it is timeless\ndesign, enduring quality, and a deep respect for architectural legacy. Our\nporcelain tiles are not just surfaces; they are foundations for homes,\nbusinesses, and landmarks that will stand for generations.";
  const defaultButtonText = "VIEW ALL SLABS";

  const headline = title || defaultTitle;
  const words = headline.split(" ");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-brand-dark">
      {/* Slideshow Background Images with Smooth Crossfade and Zoom-out (Ken Burns) */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={slideshowImages[currentImageIndex]}
            alt="Luxury Italian tile interior slideshow"
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0 }}
            transition={{ 
              clipPath: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
              opacity: { delay: 1.5, duration: 0.1 }
            }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
          />
        </AnimatePresence>
      </div>

      {/* Subtle overlays for maximum text legibility */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-between pt-[15vh] pb-[8vh] px-6 md:px-12 z-10">
        <div className="flex flex-col items-center justify-between h-full w-full max-w-[1300px] text-center">
          {/* Word-by-word reveal heading */}
          <h1 className="font-ivymode text-white leading-tight tracking-[0.2em] text-[clamp(24px,4.2vw,40px)] uppercase flex flex-wrap justify-center gap-x-[0.4em]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1.2 + i * 0.07 // delay starts after loader ends
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Fade in body text */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
            className="font-ivymode text-white/95 text-[clamp(16px,2.1vw,36px)] font-light leading-[1.6] max-w-[1300px] whitespace-pre-line tracking-wide my-auto px-4"
          >
            {subtitle || defaultSubtitle}
          </motion.p>

          {/* Staggered entrance for CTA with hover scaleX fill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 2.0 }}
            className="w-full max-w-[320px] md:max-w-[620px] mt-auto"
          >
            <Link href="/explore-collection" className="block">
              <motion.button 
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden border border-white/60 text-white bg-transparent w-full py-4 font-michroma text-[clamp(11px,1.3vw,24px)] tracking-[0.3em] transition-colors duration-500 uppercase whitespace-nowrap group"
              >
                <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark">
                  {buttonText || defaultButtonText}
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
