"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./Navbar";

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  bgImage?: string;
}

const slideshowImages = [
  {
    src: "/nobilita3/images/NewImages/Arabescato%20Fjord.jpg",
    name: "ARABESCATO FJORD",
    textColor: "black"
  },
  {
    src: "/nobilita3/images/NewImages/Calacatta%20Oyster%20application.jpg",
    name: "CALACATTA OYSTER",
    textColor: "black"
  },
  {
    src: "/nobilita3/images/NewImages/Ferro%20Industriale%20(3).jpg",
    name: "FERRO INDUSTRIALE",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/Gris%20Di%20Savoie%20(2).jpg",
    name: "GRIS DI SAVOIE",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/Piasentina%20Application.jpg",
    name: "PIASENTINA",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/Travetino%20Vein%20Cut%20Application%203.jpg",
    name: "TRAVERTINO VEIN CUT",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/Verde%20Apli%20Application.jpg",
    name: "VERDE ALPI",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/Verde%20profondo%20application%20new.jpg",
    name: "VERDE PROFONDO",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/silver%20root.jpg",
    name: "SILVER ROOT",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/Calacatta%20BorghinI.png",
    name: "CALACATTA BORGHINI",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/La%20Quadrifoglio%20%281%29%20copy%20%281%29.jpg",
    name: "LA QUADRIFOGLIO",
    textColor: "white"
  },
  {
    src: "/nobilita3/images/NewImages/Fior%20Di%20Melo.jpg",
    name: "FIOR DI MELO",
    textColor: "black"
  },
  {
    src: "/nobilita3/images/NewImages/taj%20mahal.jpg",
    name: "TAJ MAHAL",
    textColor: "black"
  }
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
  const [{ current, prev }, setImageIndices] = useState({ current: 0, prev: null as number | null });

  useEffect(() => {
    slideshowImages.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndices((state) => ({
        current: (state.current + 1) % slideshowImages.length,
        prev: state.current
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const defaultTitle = "EXPLORE THE COLLECTION";
  const defaultSubtitle = "At NOBILITA, we believe that true luxury is not about trends, it is timeless\ndesign, enduring quality, and a deep respect for architectural legacy. Our\nporcelain tiles are not just surfaces; they are foundations for homes,\nbusinesses, and landmarks that will stand for generations.";
  const defaultButtonText = "VIEW ALL SLABS";

  const headline = title || defaultTitle;
  const words = headline.split(" ");

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-brand-dark">
      {/* Stacked image layers — GSAP crossfades between them */}
      <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
        {slideshowImages.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 w-full h-full transition-opacity duration-[1400ms] ease-in-out"
            style={{
              opacity: i === current || i === prev ? 1 : 0,
              zIndex: i === current ? 2 : (i === prev ? 1 : 0),
            }}
          >
            <img
              src={slide.src}
              alt={`${slide.name} slab application interior`}
              className="absolute inset-0 w-full h-full object-cover object-bottom max-w-none"
            />
            {/* Name label lives inside the layer — fades with the image automatically */}
            <div className="absolute bottom-[4vh] left-6 md:left-12 z-20 pointer-events-none select-none">
              <span
                className="font-ivymode tracking-[0.20em] text-[clamp(11px,1.2vw,16px)] uppercase font-light"
                style={{ color: slide.textColor === "white" ? "#ffffff" : "#000000" }}
              >
                {slide.name}
              </span>
            </div>
          </div>
        ))}

        {/* Subtle premium overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
      </div>

      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-between pt-[10vh] pb-[10vh] px-6 md:px-12 z-10">
        <div className="flex flex-col items-center justify-between h-full w-full max-w-[1300px] text-center">
          {/* Word-by-word reveal heading */}
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

          {/* Line-by-line, word-by-word cascading reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-ivymode text-white/95 text-[clamp(13px,4vw,18px)] md:text-[clamp(16px,2vw,32px)] font-light leading-[1.3] md:leading-[1.1] w-full max-w-[1150px] tracking-wide my-auto px-4 pt-10 flex flex-col items-center"
          >
            {(subtitle || defaultSubtitle).split("\n").map((line, lineIdx) => {
              const lines = (subtitle || defaultSubtitle).split("\n");
              const isLastLine = lineIdx === lines.length - 1;
              return (
                <span
                  key={lineIdx}
                  className={`w-full flex flex-wrap md:flex-nowrap justify-center gap-x-[0.35em] ${isLastLine ? "" : "md:justify-between md:gap-x-0"} py-0.5`}
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

          {/* CTA Button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={buttonVariants}
            className="w-full mt-auto mb-5 flex justify-center"
          >
            <Link href="/explore-collection">
              <motion.button
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden border border-white text-white bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group"
              >
                <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                <motion.span
                  variants={buttonTextVariants}
                  className="relative z-10 block transition-colors duration-500 group-hover:text-black"
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
