"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MadeInItalyPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Title Character Reveal
      gsap.fromTo(".hero-char",
        { y: "120%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, stagger: 0.05, ease: "expo.out" }
      );

      // Section 1 Paragraphs
      gsap.fromTo(".sec1-paragraph",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" }
      );

      // Section 1 Image Reveal
      const tlImg1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".sec1-img-wrapper",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      tlImg1.fromTo(".sec1-overlay",
        { y: "0%", opacity: 1 },
        { y: "-100%", opacity: 0, duration: 1.5, ease: "power3.inOut" }
      )
        .fromTo(".sec1-img-inner",
          { scale: 1.15 },
          { scale: 1, duration: 2, ease: "power3.out" }, "-=1.4"
        );

      // Section 2 Top Text Paragraphs
      gsap.fromTo(".sec2-paragraph",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".sec2-text-container", start: "top 85%" } }
      );

      // Section 2 Left Image Reveal (Factory)
      const tlImg2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".sec2-img-wrapper-left",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      tlImg2.fromTo(".sec2-overlay-left",
        { y: "0%", opacity: 1 },
        { y: "-100%", opacity: 0, duration: 1.5, ease: "power3.inOut" }
      )
        .fromTo(".sec2-img-inner-left",
          { scale: 1.15 },
          { scale: 1, duration: 2, ease: "power3.out" }, "-=1.4"
        );

      // Section 2 Right Image Reveal (Processing Unit)
      const tlImg3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".sec2-img-wrapper-right",
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      tlImg3.fromTo(".sec2-overlay-right",
        { y: "0%", opacity: 1 },
        { y: "-100%", opacity: 0, duration: 1.5, ease: "power3.inOut" }
      )
        .fromTo(".sec2-img-inner-right",
          { scale: 1.15 },
          { scale: 1, duration: 2, ease: "power3.out" }, "-=1.4"
        );

      // Section 3: Duomo di Milano Curtain Reveal
      gsap.set(".sec3-label-text", { opacity: 0, y: 14, letterSpacing: "0.5em" });

      const sec3Tl = gsap.timeline({
        scrollTrigger: { trigger: ".sec3-container", start: "top 75%", once: true }
      });
      sec3Tl
        .to(".sec3-curtain-left", { xPercent: -100, duration: 1.5, ease: "power4.inOut" })
        .to(".sec3-curtain-right", { xPercent: 100, duration: 1.5, ease: "power4.inOut" }, "<")
        .to(".sec3-label-text", { opacity: 1, y: 0, letterSpacing: "0.20em", duration: 0.9, ease: "power2.out" }, "-=0.3");

      gsap.fromTo(".sec3-img",
        { scale: 1 },
        { scale: 1.22, ease: "none", scrollTrigger: { trigger: ".sec3-container", start: "top bottom", end: "bottom top", scrub: 1.5 } }
      );


      gsap.fromTo(".sec3-paragraph",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".sec3-text-container", start: "top 85%" }
        }
      );

      // Section 4: Colosseum

      gsap.fromTo(".sec4-tag",
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: ".sec4-container", start: "top 60%" } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      {/* Section 1: Made In Italy Intro */}
      <section className="relative w-full flex flex-col justify-center pt-24 md:pt-16 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100 mt-0 md:mt-12">
        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col">
          <div className="w-full text-center">
            <h2 className="font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(24px,4vw,66px)] leading-tight flex flex-wrap justify-center gap-x-[0.4em]">
              {"MADE IN ITALY".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <span key={cIdx} className="inline-block overflow-hidden align-bottom">
                      <span className="hero-char inline-block">{char}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>

          {/* Grid Layout: Text vs Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-stretch mt-12">
            {/* Left Column: Narrative */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8 font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,20px)] tracking-widest leading-[1.8] text-left order-2 md:order-1 h-full py-0 md:py-2">
              <p className="sec1-paragraph">
                In the heart of Italy, where rolling hills meet centuries of craftsmanship, lies Modena, a region shaped by the relentless pursuit of excellence. Home to Ferrari, Acetaia Giusti, and Brioni, Modena has long been a place where mastery is refined through patience, precision, and dedication to craft.
              </p>
              
              <p className="sec1-paragraph">
                The same spirit defines its porcelain industry. Here, innovation and heritage exist side by side, transforming raw materials into surfaces of <span className="text-[#007190] font-normal">exceptional quality and enduring beauty.</span>
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="flex order-1 md:order-2 h-full">
              <div className="sec1-img-wrapper group relative w-full h-full border border-gray-100 overflow-hidden cursor-pointer">
                <div className="sec1-overlay absolute inset-0 bg-white/40 z-10 backdrop-blur-[2px]"></div>
                <img
                  src="/images/made-in-italy/Palazzo_della_civilt%C3%A0_del_lavoro_(EUR,_Rome)_(5904657870).jpg"
                  alt="Palazzo della civiltà del lavoro application"
                  className="sec1-img-inner w-full h-full object-cover block"
                  loading="lazy"
                />
                {/* Overlay Text */}
                <div className="absolute bottom-2 right-2 md:bottom-2 md:right-3 z-10">
                  <span className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(11px,1.4vw,16px)] drop-shadow-md">
                    PALAZZO DELLA CIVILTÀ ITALIANA
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Large Format Slabs */}
      <section className="relative w-full mt-12 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col space-y-12">
          {/* Top Text */}
          <div className="sec2-text-container w-full font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,20px)] tracking-widest leading-[1.8] text-left space-y-6 md:space-y-8">
            <p className="sec2-paragraph">
              Every NOBILITA slab is born from this tradition, crafted with Italian expertise, engineered for performance, and designed to stand the test of time.
            </p>
            <p className="sec2-paragraph">
              More than a surface, it is a <span className="text-[#007190] font-normal">legacy of craftsmanship made for generations to come.</span>
            </p>
          </div>

          {/* Grid Layout: Two Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* Left Image */}
            <div className="sec2-img-wrapper-left group relative w-full h-full border border-gray-100 overflow-hidden cursor-pointer">
              <div className="sec2-overlay-left absolute inset-0 bg-white/40 z-10 backdrop-blur-[2px]"></div>
              <img
                src="/images/made-in-italy/factory-image.jpeg"
                alt="Factory"
                className="sec2-img-inner-left w-full h-full object-cover block"
                loading="lazy"
              />
            </div>
            
            {/* Right Image */}
            <div className="sec2-img-wrapper-right group relative w-full h-full border border-gray-100 overflow-hidden cursor-pointer">
              <div className="sec2-overlay-right absolute inset-0 bg-white/40 z-10 backdrop-blur-[2px]"></div>
              <img
                src="/images/made-in-italy/continua-impianto-hd-2.jpg"
                alt="Large Format Slabs Processing Unit"
                className="sec2-img-inner-right w-full h-full object-cover block"
                loading="lazy"
              />
              {/* Overlay Text */}
              <div className="absolute bottom-2 right-2 md:bottom-2 md:right-3 z-10">
                <span className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(10px,1.2vw,16px)] drop-shadow-md">
                  LARGE FORMAT SLABS PROCESSING UNIT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Duomo di Milano Full-width */}
      <section className="sec3-container relative w-full pb-12 overflow-hidden bg-white">
        <div className="relative w-full mx-auto flex flex-col">
          {/* Top Full-width Image */}
          <div className="w-full relative aspect-[21/9] md:aspect-[2.39/1] overflow-hidden group">
            <video
              src="/images/made-in-italy/duomo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="sec3-img w-full h-full object-cover origin-center"
            />

            {/* Curtain reveal panels */}
            <div className="sec3-curtain-left absolute inset-y-0 left-0 w-1/2 bg-white z-20 pointer-events-none" />
            <div className="sec3-curtain-right absolute inset-y-0 right-0 w-1/2 bg-white z-20 pointer-events-none" />
            {/* Overlay Text */}
            <div className="absolute bottom-2 right-3 md:bottom-2 md:right-3 z-30 flex flex-col items-end">
              <span className="sec3-label-text font-ivymode font-light text-[#545759] uppercase text-[clamp(11px,1.2vw,16px)] inline-block">
                DUOMO DI MILANO
              </span>
            </div>
          </div>
          
          {/* Bottom Text */}
          <div className="sec3-text-container w-full pt-12 max-w-[1600px] mx-auto font-ivymode font-light text-[#545759] text-[clamp(15px,1.5vw,19px)] tracking-widest leading-[1.8] text-left px-6 md:px-12 lg:px-24">
            <p className="sec3-paragraph">
              NOBILITA works at the forefront of large-format surface innovation, with state-of-the-art production systems capable of creating ultra-large slabs in exceptional formats and multiple thicknesses. These advancements have redefined what is possible in contemporary architecture, enabling seamless surfaces, reduced visual fragmentation, and a more monolithic architectural language.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Colosseum Background Parallax Reveal */}
      <section className="sec4-container relative w-full h-screen overflow-hidden">
        <div className="relative w-full h-full mx-auto group overflow-hidden">
          {/* Background Image */}
          <img
            src="/images/made-in-italy/colosseo-2020.jpg"
            alt="Colosseum"
            className="sec4-img w-full h-full object-cover block origin-center"
            loading="lazy"
          />
          
          {/* Top Headline Image Overlay */}
          <div className="absolute top-8 md:top-12 lg:top-16 left-0 right-0 z-10 flex justify-center px-4 w-full pointer-events-none">
            <img
              src="/images/Links/tag grey.png"
              alt="Il Gres Imperiale d'Italia"
              className="sec4-tag w-full max-w-sm md:max-w-2xl lg:max-w-5xl h-auto object-contain drop-shadow-sm opacity-90"
              loading="lazy"
            />
          </div>

          {/* Overlay Text */}
          <div className="absolute bottom-2 right-3 md:bottom-2 md:right-3 lg:right-3 z-10">
            <span className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(11px,1.4vw,16px)] drop-shadow-md">
              COLOSSEUM
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
