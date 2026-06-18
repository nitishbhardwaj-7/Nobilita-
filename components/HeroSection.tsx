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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const wordVariants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const paragraphWordVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      delay: customDelay
    }
  })
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.45 }
  }
};

const buttonTextVariants = {
  hidden: { letterSpacing: "0.48em", opacity: 0 },
  visible: {
    letterSpacing: "0.3em",
    opacity: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }
  }
};

export default function HeroSection({ title, subtitle, buttonText, bgImage }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 7000); // Change image every 6.5 seconds
    return () => clearInterval(timer);
  }, []);

  const defaultTitle = "EXPLORE THE COLLECTION";
  const defaultSubtitle = "At NOBILITA, we believe that true luxury is not about trends, it is timeless\ndesign, enduring quality, and a deep respect for architectural legacy. Our\nporcelain tiles are not just surfaces; they are foundations for homes,\nbusinesses, and landmarks that will stand for generations.";
  const defaultButtonText = "VIEW ALL SLABS";

  const headline = title || defaultTitle;
  const words = headline.split(" ");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-brand-dark mb-24">
      {/* Slideshow Background Images with Smooth Crossfade and Zoom-out (Ken Burns) */}
      <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ opacity: 0 }}
            transition={{
              x: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
              opacity: { delay: 1.5, duration: 0.1 }
            }}
            className="absolute inset-0 w-full h-full overflow-hidden z-0"
          >
            <motion.img
              src={slideshowImages[currentImageIndex]}
              alt="Luxury Italian tile interior slideshow"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-bottom opacity-100 max-w-none"
            />
          </motion.div>
        </AnimatePresence>
        {/* Subtle premium dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20 pointer-events-none z-10" />
      </div>

      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-between pt-[15vh] pb-[8vh] px-6 md:px-12 z-10">
        <div className="flex flex-col items-center justify-between h-full w-full max-w-[1300px] text-center">
          {/* Word-by-word reveal heading triggered by parent viewport */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="font-ivymode text-white leading-tight tracking-[0.1em] text-[clamp(24px,4.2vw,48px)] uppercase flex flex-wrap justify-center gap-x-[0.4em]"
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
                <motion.span
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Line-by-line, word-by-word cascading reveal triggered by parent viewport */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-ivymode text-white/95 text-[clamp(16px,2.1vw,52px)] font-light leading-[1.1] w-full max-w-[1150px] tracking-wide my-auto px-4 pt-10 flex flex-col items-center"
          >
            {(subtitle || defaultSubtitle).split("\n").map((line, lineIdx) => {
              const lines = (subtitle || defaultSubtitle).split("\n");
              const isLastLine = lineIdx === lines.length - 1;
              return (
                <span
                  key={lineIdx}
                  className={`w-full flex flex-wrap justify-center gap-x-[0.35em] ${isLastLine ? "" : "md:justify-between md:gap-x-0"} py-0.5`}
                >
                  {line.split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-block overflow-hidden py-0.5">
                      <motion.span
                        custom={0.15 + (lineIdx * 5 + wordIdx) * 0.008}
                        variants={paragraphWordVariants}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              );
            })}
          </motion.div>

          {/* Staggered entrance CTA triggered by parent viewport */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={buttonVariants}
            className="w-full max-w-[320px] md:max-w-[620px] mt-auto mb-10"
          >
            <Link href="/explore-collection" className="block">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden border border-white/80 text-white w-full py-4 font-michroma text-[clamp(11px,1.3vw,30px)] tracking-[0.3em] transition-colors duration-500 uppercase whitespace-nowrap group"
              >
                <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                <motion.span
                  variants={buttonTextVariants}
                  className="relative z-10 block transition-colors duration-500 group-hover:text-brand-dark"
                >
                  {buttonText || defaultButtonText}
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
