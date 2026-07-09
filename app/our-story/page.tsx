"use client";

import React, { useEffect } from "react";
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

      const tlImg = gsap.timeline({ scrollTrigger: { trigger: ".sec2-img-wrapper", start: "top 80%" } });
      tlImg.fromTo(".sec2-img-wrapper", 
        { clipPath: "inset(20% 0% 20% 0%)" }, 
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }
      )
      .fromTo(".sec2-overlay", 
        { y: "0%", opacity: 1 }, 
        { y: "-100%", opacity: 0, duration: 1.5, ease: "power3.inOut" }, "-=1.4"
      )
      .fromTo(".sec2-img-inner", 
        { scale: 1.15 }, 
        { scale: 1, duration: 2, ease: "power3.out" }, "-=1.8"
      );

      gsap.to(".sec2-img-inner", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".sec2-img-wrapper", start: "top bottom", end: "bottom top", scrub: true }
      });

      // 3. Section 3
      gsap.from(".sec3-img", {
        scale: 1.1,
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

      const tlImg4 = gsap.timeline({ scrollTrigger: { trigger: ".sec4-img-wrapper", start: "top 80%" } });
      tlImg4.fromTo(".sec4-img-wrapper", 
        { clipPath: "inset(20% 0% 20% 0%)" }, 
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" }
      )
      .fromTo(".sec4-overlay", 
        { y: "0%", opacity: 1 }, 
        { y: "-100%", opacity: 0, duration: 1.5, ease: "power3.inOut" }, "-=1.4"
      )
      .fromTo(".sec4-img-inner", 
        { scale: 1.15 }, 
        { scale: 1, duration: 2, ease: "power3.out" }, "-=1.8"
      );

      gsap.to(".sec4-img-inner", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".sec4-img-wrapper", start: "top bottom", end: "bottom top", scrub: true }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      {/* Main Content / First Section */}
      <section className="w-full h-screen max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start content-center">

        {/* Left Column: House SVG & Logo (4 cols on desktop) */}
        <div className="md:col-span-4 flex flex-col items-center justify-start w-full pt-2 md:pt-4">
          {/* House Sketch */}
          <div className="hero-house w-full flex justify-center items-center mb-4 md:mb-6">
            <NobilitaHouseSVG
              variant="dark"
              size={240}
              animate={true}
              className="opacity-90 max-w-full"
            />
          </div>

          {/* Logo Block */}
          <div className="hero-logo w-[150px] md:w-[200px]">
            <img
              src="/images/Links/NOBILITA Logo BLACK.png"
              alt="Porcellana Nobilita"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Column: Story Text (8 cols on desktop) */}
        <div className="md:col-span-8 flex flex-col justify-start space-y-6 md:space-y-8">
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="hero-title font-ivymode font-light text-[#545759] uppercase tracking-[0.15em] text-[clamp(24px,4vw,44px)] leading-tight flex flex-wrap gap-x-[0.4em]"
          >
            {["OUR", "STORY"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1">
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
            className="hero-text font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,19px)] tracking-widest leading-[1.9] space-y-10"
          >
            {(() => {
              let wordCount = 0;
              const paragraphs = [
                [{ text: "In the grand halls of Renaissance palaces and Baroque villas, architecture was never just about building. It was an expression of culture, craftsmanship, and an enduring pursuit of beauty." }],
                [{ text: "The world's greatest cities were shaped by spaces that celebrated proportion, artistry, and material excellence." }],
                [
                  { text: "Among their defining features was the" },
                  { text: "Piano Nobile – the noble floor.", highlight: true },
                  { text: "Elevated above the bustle of the streets, it was the heart of the home, where marble, light, and masterful detailing came together to create spaces of remarkable elegance." }
                ]
              ];

              return paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="w-full flex flex-wrap gap-x-[0.35em]">
                  {p.map((segment, sIdx) => 
                    segment.text.split(" ").filter(w => w !== "").map((word, wIdx) => {
                      const currentIdx = wordCount++;
                      return (
                        <span key={`${sIdx}-${wIdx}`} className="inline-block overflow-hidden align-bottom">
                          <motion.span
                            custom={0.4 + currentIdx * 0.015}
                            variants={paragraphWordVariants}
                            className={`inline-block ${segment.highlight ? "text-[#007190] font-normal" : ""}`}
                          >
                            {word}
                          </motion.span>
                        </span>
                      );
                    })
                  )}
                </p>
              ));
            })()}
          </motion.div>
        </div>

      </section>

      {/* Section 2: Piano Nobile, Reimagined */}
      <section className="sec2-container relative w-full h-screen grid grid-rows-[1fr_auto_1fr] px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100">
        {/* Background Marble Slab */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/Links/Arbescato Fjord Face 1.jpg"
            alt="Arabescato Fjord background"
            className="sec2-bg w-full h-full object-cover opacity-100 origin-center scale-[1.05]"
          />
        </div>

        {/* Top spacer for vertical centering */}
        <div />

        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto">
          {/* Centered Heading */}
          <div className="w-full text-center mb-12 md:mb-12">
            <h2 className="sec2-title font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(24px,4vw,44px)] leading-tight flex flex-wrap justify-center gap-x-[0.4em]">
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

          {/* Grid Layout: Text vs Image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
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
              <div className="sec2-img-wrapper relative w-full max-w-[380px] shadow-lg border border-white/20 overflow-hidden" style={{ clipPath: "inset(20% 0% 20% 0%)" }}>
                <div className="sec2-overlay absolute inset-0 bg-white/40 z-10 backdrop-blur-[2px]"></div>
                <img
                  src="/images/Our story/Verde profondo application.jpg"
                  alt="Verde Profondo application"
                  className="sec2-img-inner w-full h-auto object-contain block scale-[1.15]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer for vertical centering */}
        <div />
        
        {/* Gradient fade to white at the bottom for smooth section transition */}
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-white/90 to-transparent z-[5] pointer-events-none"></div>
      </section>

      {/* Section 3: Arabescato Vagli Bookmatch Section */}
      <section className="sec3-container w-full flex flex-col bg-white">
        {/* Top Full-width Image */}
        <div className="w-full relative aspect-[21/9] md:aspect-[2.39/1] overflow-hidden group">
          {/* Gradient fade from white at the top for smooth section transition */}
          <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-white/90 to-transparent z-[5] pointer-events-none"></div>
          <img
            src="/images/Our story/Arbescato Vagli BM.jpg"
            alt="Arabescato Vagli Bookmatch bathroom application"
            className="sec3-img w-full h-full object-cover origin-center scale-[1.1]"
            loading="lazy"
          />
          {/* Overlay Text */}
          <div className="absolute bottom-2 right-4 md:bottom-3 md:right-8 z-10">
            <span className="font-ivymode font-light text-[#545759] uppercase tracking-[0.05em] text-[clamp(12px,1.4vw,18px)]">
              ARBESCATO VAGLI
            </span>
          </div>
        </div>

        {/* Bottom Narrative Text */}
        <div className="sec3-text w-full max-w-[1440px] mx-auto bg-white p-8 md:p-16 lg:p-16 flex flex-col">
          <div className="w-full">
            <p className="font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,19px)] tracking-widest leading-[1.8]">
              At NOBILITA, we work closely with architects, designers, and discerning clients to create architectural experiences. Through careful selection, expert craftsmanship, and a deep understanding of design, we help create spaces that feel timeless rather than trend-driven.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Next Generation Porcelain */}
      <section className="sec4-container relative w-full h-screen grid grid-rows-[1fr_auto_1fr] px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100">
        {/* Background Marble Slab */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/Links/Fior Di Melo Face 1.jpg"
            alt="Fior Di Melo background"
            className="sec4-bg w-full h-full object-cover opacity-100 origin-center scale-[1.08]"
          />
        </div>

        {/* Top spacer for vertical centering */}
        <div />

        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto">
          {/* Centered Heading */}
          <div className="w-full text-center mb-12 md:mb-12">
            <h2 className="sec4-title font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(24px,4vw,44px)] leading-tight flex flex-wrap justify-center gap-x-[0.4em]">
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

          {/* Grid Layout: Image vs Text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left Column: Image (5 cols) */}
            <div className="md:col-span-5 flex justify-start items-center">
              <div className="sec4-img-wrapper relative w-full max-w-[380px] shadow-lg border border-white/20 overflow-hidden" style={{ clipPath: "inset(20% 0% 20% 0%)" }}>
                <div className="sec4-overlay absolute inset-0 bg-white/40 z-10 backdrop-blur-[2px]"></div>
                <img
                  src="/images/Our story/Ferro Industriale (2).jpg"
                  alt="Ferro Industriale application"
                  className="sec4-img-inner w-full h-auto object-contain block scale-[1.15]"
                  loading="lazy"
                />
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

        {/* Bottom spacer for vertical centering */}
        <div />
      </section>

      <Footer />
    </div>
  );
}
