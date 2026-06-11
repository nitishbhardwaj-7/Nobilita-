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

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-brand-dark">
      {/* Slideshow Background Images with Smooth Crossfade */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={slideshowImages[currentImageIndex]}
            alt="Luxury Italian tile interior slideshow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Subtle overlays for maximum text legibility */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-between pt-[15vh] pb-[8vh] px-6 md:px-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-between h-full w-full max-w-[1300px] text-center"
        >
          <h1 className="font-ivymode text-white leading-tight tracking-[0.2em] text-[clamp(24px,4.2vw,40px)] uppercase">
            {title || defaultTitle}
          </h1>

          <p className="font-ivymode text-white/95 text-[clamp(16px,2.1vw,36px)] font-light leading-[1.6] max-w-[1300px] whitespace-pre-line tracking-wide my-auto px-4">
            {subtitle || defaultSubtitle}
          </p>

          <Link 
            href="/explore-collection"
            className="w-full max-w-[320px] md:max-w-[620px] mt-auto"
          >
            <button className="border border-white/60 text-white bg-transparent w-full py-4 font-michroma text-[clamp(11px,1.3vw,24px)] tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-brand-dark uppercase whitespace-nowrap">
              {buttonText || defaultButtonText}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
