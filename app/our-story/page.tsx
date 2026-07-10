"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NobilitaHouseSVG from "@/components/NobilitaHouseSVG";

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const wordVariants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
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

export default function OurStoryPage() {
  const handleImageEnter = (selector: string) => {
    gsap.to(selector, { scale: 1.08, duration: 0.8, ease: "power2.out", overwrite: "auto" });
  };

  const handleImageLeave = (selector: string) => {
    gsap.to(selector, { scale: 1.18, duration: 1.2, ease: "power3.out", overwrite: "auto" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Section (On Load)
      const tlHero = gsap.timeline({ delay: 0.3 });
      tlHero.from(".hero-house", { opacity: 0, y: 40, duration: 1.5, ease: "power3.out" })
        .from(".hero-logo", { opacity: 0, scale: 0.95, duration: 1.2, ease: "power3.out" }, "-=1");

      // 2. Section 2
      gsap.fromTo(".sec2-bg",
        { scale: 1.08 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".sec2-container", start: "top bottom", end: "bottom top", scrub: true } }
      );

      gsap.fromTo(".sec2-char",
        { y: "120%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, stagger: 0.03, ease: "expo.out", scrollTrigger: { trigger: ".sec2-title", start: "top 85%" } }
      );

      gsap.fromTo(".sec2-line",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".sec2-text", start: "top 80%" } }
      );

      gsap.fromTo(".sec2-highlight",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.6, scrollTrigger: { trigger: ".sec2-text", start: "top 80%" } }
      );

      const tlImg = gsap.timeline({
        scrollTrigger: {
          trigger: ".sec2-container",
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });
      tlImg.fromTo(".sec2-overlay",
        { y: "0%", opacity: 1 },
        { y: "-100%", opacity: 0, duration: 1.5, ease: "power3.inOut" }
      )
        .fromTo(".sec2-img-inner",
          { scale: 1.28 },
          { scale: 1.18, duration: 2, ease: "power3.out" }, "-=1.4"
        );

      // 3. Section 3 — luxury curtain reveal + shine sweep + label
      gsap.set(".sec3-label-text", { opacity: 0, y: 14, letterSpacing: "0.5em" });

      const sec3Tl = gsap.timeline({
        scrollTrigger: { trigger: ".sec3-container", start: "top 75%", once: true }
      });
      sec3Tl
        .to(".sec3-curtain-left", { xPercent: -100, duration: 1.5, ease: "power4.inOut" })
        .to(".sec3-curtain-right", { xPercent: 100, duration: 1.5, ease: "power4.inOut" }, "<")
        .to(".sec3-shine", { xPercent: 250, duration: 1.3, ease: "power2.inOut" }, "-=0.9")
        .to(".sec3-label-text", { opacity: 1, y: 0, letterSpacing: "0.20em", duration: 0.9, ease: "power2.out" }, "-=0.7");

      gsap.from(".sec3-img", {
        scale: 1.22,
        scrollTrigger: { trigger: ".sec3-container", start: "top bottom", end: "bottom top", scrub: 1.5 }
      });
      gsap.from(".sec3-text p", {
        opacity: 0, y: 30, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".sec3-text", start: "top 85%" }
      });

      // 4. Section 4
      gsap.fromTo(".sec4-bg",
        { scale: 1.08 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".sec4-container", start: "top bottom", end: "bottom top", scrub: true } }
      );

      gsap.fromTo(".sec4-char",
        { y: "120%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, stagger: 0.03, ease: "expo.out", scrollTrigger: { trigger: ".sec4-title", start: "top 85%" } }
      );

      gsap.fromTo(".sec4-line",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".sec4-text", start: "top 80%" } }
      );

      gsap.fromTo(".sec4-highlight",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.6, scrollTrigger: { trigger: ".sec4-text", start: "top 80%" } }
      );

      const tlImg4 = gsap.timeline({
        scrollTrigger: {
          trigger: ".sec4-container",
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });
      tlImg4.fromTo(".sec4-overlay",
        { y: "0%", opacity: 1 },
        { y: "-100%", opacity: 0, duration: 1.5, ease: "power3.inOut" }
      )
        .fromTo(".sec4-img-inner",
          { scale: 1.28 },
          { scale: 1.18, duration: 2, ease: "power3.out" }, "-=1.4"
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden relative">
      <Navbar />

      {/* Back Button Arrow */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50">
        <Link
          href="/"
          className="group flex items-center justify-center w-11 h-11 rounded-full border border-brand-dark/40 hover:border-brand-dark hover:bg-brand-dark text-brand-dark hover:text-white transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm shadow-sm"
          aria-label="Go back to home"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 transition-transform duration-300 transform group-hover:-translate-x-0.5"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>
      </div>

      {/* Main Content / First Section */}
      <section className="w-full flex items-center pt-[60px] pb-[60px] relative">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row md:items-stretch gap-10 md:gap-16 lg:gap-28">
          {/* Left Column: House SVG & Logo */}
          <div className="shrink-0 flex flex-col items-center justify-between gap-10">
            {/* House Sketch */}
            <div className="hero-house flex justify-center">
              <NobilitaHouseSVG
                variant="dark"
                size={240}
                animate={true}
                className="opacity-90 max-w-full mt-[15px]"
              />
            </div>

            {/* Logo Block */}
            <div className="hero-logo w-[150px] md:w-[220px]">
              <img
                src="/images/Links/NOBILITA Logo BLACK.png"
                alt="Porcellana Nobilita"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="hero-title font-ivymode font-light text-[#545759] uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,66px)] leading-tight flex flex-wrap gap-x-[0.4em]"
            >
              {["OUR", "STORY"].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.3, delayChildren: 0.6 } }
              }}
              className="hero-text font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,20px)] tracking-widest leading-[1.7] space-y-6 mt-10 md:mt-12"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}>
                In the grand halls of Renaissance palaces and Baroque villas, architecture was never just about building. It was an expression of culture, craftsmanship, and an enduring pursuit of beauty.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}>
                The world's greatest cities were shaped by spaces that celebrated proportion, artistry, and material excellence.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}>
                Among their defining features was the <span className="text-[#007190] font-normal">Piano Nobile – the noble floor. <br/> </span> Elevated above the bustle of the streets, it was the heart of the home, where marble, light, and masterful detailing came together to create spaces of remarkable elegance.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Piano Nobile, Reimagined */}
      <section className="sec2-container relative w-full pt-10 pb-16 md:pt-[60px] md:pb-[80px] px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100 flex flex-col">
        {/* Background Marble Slab */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/Links/Arbescato Fjord Face 1.jpg"
            alt="Arabescato Fjord background"
            className="sec2-bg w-full h-full object-cover opacity-100 origin-center scale-[1.05]"
          />
        </div>

        {/* Centered Heading */}
        <div className="w-full z-10 shrink-0">
          <h2 className="sec2-title font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(28px,4.5vw,66px)] leading-tight flex flex-wrap justify-center gap-x-[0.4em]">
            {"PIANO NOBILE, REIMAGINED".split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className="inline-block overflow-hidden align-bottom">
                    <span className="sec2-char inline-block">{char}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="w-full max-w-[1440px] mx-auto z-10 md:mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center w-full">
            {/* Left Column: Narrative (7 cols) */}
            <div className="sec2-text md:col-span-7 flex flex-col space-y-6 md:space-y-8 font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,19px)] tracking-widest leading-[1.8]">
              <div className="overflow-hidden py-1">
                <p className="sec2-line">
                  NOBILITA takes its name from this tradition.
                </p>
              </div>

              <div className="overflow-hidden py-1">
                <p className="sec2-line">
                  NOBILITA represents a philosophy rather than a status. It is a
                  belief that exceptional materials, thoughtful design, and skilled
                  craftsmanship have the power to elevate everyday spaces into
                  something{" "}
                  <span className="sec2-highlight inline-block text-[#007190] font-normal">
                    extraordinary
                  </span>
                  .
                </p>
              </div>

              <div className="overflow-hidden py-1">
                <p className="sec2-line">
                  Today, that philosophy guides everything we do.
                </p>
              </div>
            </div>

            {/* Right Column: Verde Profondo Image (5 cols) */}
            <div className="md:col-span-5 flex justify-end items-center">
              <div 
                className="sec2-img-wrapper group relative w-full max-w-[400px] shadow-lg border border-white/20 overflow-hidden cursor-pointer"
                onMouseEnter={() => handleImageEnter(".sec2-img-inner")}
                onMouseLeave={() => handleImageLeave(".sec2-img-inner")}
              >
                <div className="sec2-overlay absolute inset-0 bg-white/40 z-10 backdrop-blur-[2px]"></div>
                <img
                  src="/images/Our story/Verde profondo application.jpg"
                  alt="Verde Profondo application"
                  className="sec2-img-inner w-full h-auto object-contain block transform-gpu scale-[1.18]"
                  loading="lazy"
                />
                {/* Top Hover Button Overlay (Explore Full Collection) */}
                <div className="absolute inset-0 z-20 flex items-start justify-center pt-3 md:pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] pointer-events-none">
                  <Link href="/explore-collection" className="pointer-events-auto">
                    <button className="relative overflow-hidden border border-white text-white bg-transparent px-6 py-2.5 font-michroma text-[10px] md:text-[11px] tracking-widest uppercase group/btn shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-[1500ms]">
                      <span className="absolute -inset-[1px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover/btn:scale-x-100" />
                      <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-[#545759] flex items-center gap-2">
                        EXPLORE FULL COLLECTION
                      </span>
                    </button>
                  </Link>
                </div>
                {/* Bottom Right Text */}
                <div className="absolute bottom-2 right-2 md:bottom-2 md:right-3 z-20 pointer-events-none">
                  <span className="font-ivymode font-light text-white uppercase tracking-[0.20em] text-[clamp(11px,1.2vw,16px)] drop-shadow-lg">
                    VERDE PROFONDO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Arabescato Vagli Bookmatch Section */}
      <section className="sec3-container w-full flex flex-col bg-white">
        {/* Top Full-width Image */}
        <div className="w-full relative aspect-[21/9] md:aspect-[2.39/1] overflow-hidden group">
          <img
            src="/images/Our story/Arbescato Vagli BM.jpg"
            alt="Arabescato Vagli Bookmatch bathroom application"
            className="sec3-img w-full h-full object-cover origin-center scale-[1.1]"
            loading="lazy"
          />
          {/* Diagonal shine sweep */}
          <div
            className="sec3-shine absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.55) 50%, transparent 58%)",
              transform: "translateX(-150%)",
            }}
          />
          {/* Curtain reveal panels */}
          <div className="sec3-curtain-left absolute inset-y-0 left-0 w-1/2 bg-white z-20 pointer-events-none" />
          <div className="sec3-curtain-right absolute inset-y-0 right-0 w-1/2 bg-white z-20 pointer-events-none" />
          {/* Overlay Text */}
          <div className="absolute bottom-2 right-3 md:bottom-2 md:right-3 z-30 flex flex-col items-end">
            <span className="sec3-label-text font-ivymode font-light text-[#545759] uppercase text-[clamp(11px,1.2vw,16px)] inline-block">
              ARBESCATO VAGLI
            </span>
          </div>
        </div>

        {/* Bottom Narrative Text */}
        <div className="sec3-text w-full max-w-[1440px] mx-auto bg-white px-6 md:px-12 lg:px-24 pt-[60px] pb-[60px]">
          <div className="w-full">
            <p className="font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,19px)] tracking-widest leading-[1.8]">
              At NOBILITA, we work closely with architects, designers, and discerning clients to create architectural experiences. Through careful selection, expert craftsmanship, and a deep understanding of design, we help create spaces that feel timeless rather than trend-driven.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Next Generation Porcelain */}
      <section className="sec4-container relative w-full pt-10 pb-16 md:pt-[60px] md:pb-[80px] px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100 flex flex-col">
        {/* Background Marble Slab */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/Links/Fior Di Melo Face 1.jpg"
            alt="Fior Di Melo background"
            className="sec4-bg w-full h-full object-cover opacity-100 origin-center scale-[1.08]"
          />
        </div>

        {/* Centered Heading */}
        <div className="w-full z-10 shrink-0">
          <h2 className="sec4-title font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(28px,4.5vw,66px)] leading-tight flex flex-wrap justify-center gap-x-[0.4em]">
            {"NEXT GENERATION PORCELAIN".split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className="inline-block overflow-hidden align-bottom">
                    <span className="sec4-char inline-block">{char}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="w-full max-w-[1440px] mx-auto z-10 md:mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center w-full">
            {/* Left Column: Image (5 cols) */}
            <div className="md:col-span-5 flex justify-start items-center">
              <div 
                className="sec4-img-wrapper group relative w-full max-w-[400px] shadow-lg border border-white/20 overflow-hidden cursor-pointer"
                onMouseEnter={() => handleImageEnter(".sec4-img-inner")}
                onMouseLeave={() => handleImageLeave(".sec4-img-inner")}
              >
                <div className="sec4-overlay absolute inset-0 bg-white/40 z-10 backdrop-blur-[2px]"></div>
                <img
                  src="/images/Our story/Ferro Industriale (2).jpg"
                  alt="Ferro Industriale application"
                  className="sec4-img-inner w-full h-auto object-contain block transform-gpu scale-[1.18]"
                  loading="lazy"
                />
                {/* Top Hover Button Overlay (Explore Full Collection) */}
                <div className="absolute inset-0 z-20 flex items-start justify-center pt-3 md:pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] pointer-events-none">
                  <Link href="/explore-collection" className="pointer-events-auto">
                    <button className="relative overflow-hidden border border-white text-white bg-transparent px-6 py-2.5 font-michroma text-[10px] md:text-[11px] tracking-widest uppercase group/btn shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-[1500ms]">
                      <span className="absolute -inset-[1px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover/btn:scale-x-100" />
                      <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-[#545759] flex items-center gap-2">
                        EXPLORE FULL COLLECTION
                      </span>
                    </button>
                  </Link>
                </div>
                {/* Bottom Right Text */}
                <div className="absolute bottom-2 left-2 md:bottom-2 md:left-3 z-20 pointer-events-none">
                  <span className="font-ivymode font-light text-white uppercase tracking-[0.20em] text-[clamp(11px,1.2vw,16px)] drop-shadow-lg">
                    FERRO INDUSTRIALE
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative (7 cols) */}
            <div className="sec4-text md:col-span-7 flex flex-col space-y-6 md:space-y-8 font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,19px)] tracking-widest leading-[1.8]">
              <div className="overflow-hidden py-1">
                <p className="sec4-line">
                  Our inspiration comes from the great interiors of the past, but
                  our vision is firmly contemporary: bringing the beauty, depth,
                  and sophistication of natural stone into modern spaces through
                  advanced porcelain surfaces.
                </p>
              </div>

              <div className="overflow-hidden py-1">
                <p className="sec4-line">
                  Because true luxury is not defined by excess.
                </p>
              </div>

              <div className="overflow-hidden py-1">
                <p className="sec4-line">
                  It is defined by{" "}
                  <span className="sec4-highlight inline-block text-[#007190] font-normal">
                    beauty that endures.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
