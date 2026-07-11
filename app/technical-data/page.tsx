"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechnicalDataPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(".hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );
      
      gsap.fromTo(".hero-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.4 }
      );

      // 2. Characteristics Title Reveal
      gsap.fromTo(".char-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".char-title",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Characteristics Items Reveal (staggered)
      gsap.fromTo(".char-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".char-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 3. User Guide Title Reveal
      gsap.fromTo(".ug-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ug-title",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".ug-desc",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ug-title",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Spill Subsections Reveal (each gets its own ScrollTrigger trigger)
      gsap.utils.toArray<HTMLElement>(".spill-sec").forEach((sec) => {
        const illust = sec.querySelector(".spill-illust");
        const text = sec.querySelector(".spill-text");
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(illust,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
        .fromTo(text,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1.0"
        );
      });

      // 4. Technical Specs Reveal
      gsap.fromTo(".specs-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".specs-title",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".specs-btn",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".specs-title",
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <video
            src="/images/technical data/engineered for perfomace.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top opacity-100"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-start pt-24 md:pt-16 px-6 mt-0 md:mt-12 text-center">
          <h1 className="hero-title font-ivymode font-light text-black uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,52px)] leading-tight">
            ENGINEERED FOR PERFORMANCE
          </h1>
          <p
            className="hero-desc font-ivymode font-light text-black text-[clamp(16px,1.6vw,22px)] tracking-wide max-w-[1150px] w-[92%] mx-auto mt-6 text-justify"
            style={{ textAlignLast: "center" }}
          >
            Every NOBILITA surface is engineered for exceptional performance from specification to installation. Designed by architects and engineers, it combines technical precision with refined aesthetics, ensuring premium quality, consistency and reliability. NOBILITA offers outstanding durability, dimensional stability, stain resistance, and long-term performance.
          </p>
        </div>
      </section>

      {/* 2. Characteristics, User Guide & Technical Specifications Section */}
      <section className="relative w-full py-20 md:py-12 px-6 md:px-12 lg:px-24 bg-[#007190] text-white">
        <div className="max-w-[1600px] mx-auto flex flex-col">

          {/* A. Characteristics Grid */}
          <div className="space-y-12">
            <div>
              <h2 className="char-title font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,52px)] leading-tight">
                CHARACTERISTICS
              </h2>
            </div>

            <div className="char-grid grid grid-cols-1 md:grid-cols-2 gap-x-16 md:gap-x-24 lg:gap-x-32 gap-y-12">
              {/* Left Column (5 items) */}
              <div className="space-y-10 md:space-y-12">
                {/* WATER PROOF */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-01.svg"
                      alt="Water Proof"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      WATER PROOF
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Highly resistant to water damage, due to an ultra-low absorption rate.
                    </p>
                  </div>
                </div>

                {/* SCRATCH RESISTANT */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-03.svg"
                      alt="Scratch Resistant"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      SCRATCH RESISTANT
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Engineered with a tough surface strength to withstand scratches and abrasions.
                    </p>
                  </div>
                </div>

                {/* HEAT & FROST RESISTANT */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-05.svg"
                      alt="Heat & Frost Resistant"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      HEAT & FROST RESISTANT
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      NOBILITA does not burn, emit smoke, or release toxic substances when exposed to fire.
                    </p>
                  </div>
                </div>

                {/* EASY TO MAINTAIN */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-08.svg"
                      alt="Easy to Maintain"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      EASY TO MAINTAIN
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Compatible with all types of cleaning agents, including bleach and ammonia.
                    </p>
                  </div>
                </div>

                {/* HYGIENIC & FOOD SAFE */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-10.svg"
                      alt="Hygienic & Food Safe"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      HYGIENIC & FOOD SAFE
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Non-toxic and free from harmful emissions, 100% food safe, NSF Certified.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column (4 items) */}
              <div className="space-y-10 md:space-y-12">
                {/* UV RESISTANT */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-06.svg"
                      alt="UV Resistant"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      UV RESISTANT
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Composed of 100% natural materials, ensuring colors remain vibrant even with prolonged exposure to sunlight and extreme weather.
                    </p>
                  </div>
                </div>

                {/* ECO FRIENDLY */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-04.svg"
                      alt="Eco Friendly"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      ECO FRIENDLY
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Contains no substances harmful to the environment.
                    </p>
                  </div>
                </div>

                {/* RECYCLABLE */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-07.svg"
                      alt="Recyclable"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      RECYCLABLE
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Each slab incorporates between 52% - 98% recycled content and is fully reusable and recyclable.
                    </p>
                  </div>
                </div>

                {/* HIGH FLEXURAL STRENGTH */}
                <div className="char-item flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                    <img
                      src="/images/technical data/SVGs/SVGs/icons-09.svg"
                      alt="High Flexural Strength"
                      className="w-full h-full object-contain scale-[2.2]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      HIGH FLEXURAL STRENGTH
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] tracking-[0.03em]">
                      Designed to withstand heavy loads and pressure without bending or cracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B. User Guide Section */}
          <div className="pt-12">
            <div className="space-y-12">
              <h2 className="ug-title font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,52px)] leading-tight">
                USER GUIDE
              </h2>
              <div className="font-ivymode font-light text-white/90 text-[clamp(16px,1.7vw,21px)] tracking-widest max-w-6xl space-y-12">
                <p className="ug-desc">
                  The lasting beauty and performance of a surface depend on proper care and maintenance. To help you preserve the exceptional qualities of NOBILITA porcelain surfaces, we have created a collection of maintenance guidelines.
                </p>
                <p className="ug-desc">
                  Explore our easy-to-follow care instructions and cleaning recommendations. Whether for residential or commercial applications, these guidelines ensure your NOBILITA surfaces continue to perform and look their best for generations to come.
                </p>
              </div>
            </div>

            {/* B1. Oil Spills Subsection */}
            <div className="spill-sec space-y-12 pt-12">
              <h3 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(22px,3vw,36px)] leading-tight">
                OIL SPILLS
              </h3>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                {/* Left Side: Spilling Bottle Illustration */}
                <div className="spill-illust flex-shrink-0 w-64 md:w-80 h-auto flex items-center justify-center py-6">
                  <img
                    src="/images/technical data/SVGs/SVGs/icons-11.svg"
                    alt="Oil Spills"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right Side: Step-by-Step Instructions */}
                <div className="spill-text flex-1 space-y-2 font-ivymode font-light text-white/90 text-[clamp(15px,1.6vw,19px)] tracking-widest">
                  <div className="flex items-start gap-5">
                    <span className="font-normal text-[#cce3eb]">1.</span>
                    <p>Apply the cleaning product and leave for 5 minutes.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-normal text-[#cce3eb]">2.</span>
                    <p>Rub with a scouring pad (use a magic sponge for Polished and Honed finishes).</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-normal text-[#cce3eb]">3.</span>
                    <p>If the stain remains, reapply the product and leave for up to 5 more minutes (do not exceed five minutes on Polished finishes).</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-normal text-[#cce3eb]">4.</span>
                    <p>Rub again using a scouring pad and wipe with a damp cloth and dry thoroughly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* B2. Coffee Spills Subsection */}
            <div className="spill-sec space-y-12 pt-12">
              <h3 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(22px,3vw,36px)] leading-tight">
                COFFEE SPILLS
              </h3>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                {/* Left Side: Spilling Coffee Cup Illustration */}
                <div className="spill-illust flex-shrink-0 w-64 md:w-80 h-auto flex items-center justify-center py-6">
                  <img
                    src="/images/technical data/SVGs/SVGs/icons-12.svg"
                    alt="Coffee Spills"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right Side: Step-by-Step Instructions */}
                <div className="spill-text flex-1 space-y-2 font-ivymode font-light text-white/90 text-[clamp(15px,1.6vw,19px)] tracking-widest">
                  <div className="flex items-start gap-5">
                    <span className="font-normal text-[#cce3eb]">1.</span>
                    <p>Remove any excess liquid immediately.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-normal text-[#cce3eb]">2.</span>
                    <p>Apply a suitable cleaning product and leave for 3–5 minutes.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-normal text-[#cce3eb]">3.</span>
                    <p>Rub with a non-abrasive scouring pad (use a magic sponge for Polished and Honed finishes).</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-normal text-[#cce3eb]">4.</span>
                    <p>Wipe with a damp cloth to remove any residue.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="font-normal text-[#cce3eb]">5.</span>
                    <p>Dry thoroughly with a clean, soft cloth or paper towel.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* B3. Wine Spills Subsection */}
            <div className="spill-sec space-y-12 pt-12">
              <h3 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(22px,3vw,36px)] leading-tight">
                WINE SPILLS
              </h3>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                {/* Left Side: Spilling Wine Glass Illustration */}
                <div className="spill-illust flex-shrink-0 w-64 md:w-80 h-auto flex items-center justify-center py-6">
                  <img
                    src="/images/technical data/SVGs/SVGs/icons-13.svg"
                    alt="Wine Spills"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right Side: Step-by-Step Instructions */}
                <div className="spill-text flex-1 space-y-2 font-ivymode font-light text-white/90 text-[clamp(15px,1.6vw,19px)] tracking-widest">
                  <div className="space-y-2">
                    <div className="flex items-start gap-5">
                      <span className="font-normal text-[#cce3eb]">1.</span>
                      <p>Rinse the affected area with warm water.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="font-normal text-[#cce3eb]">2.</span>
                      <p>Apply a pH-neutral cleaner and allow it to act for a few minutes.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="font-normal text-[#cce3eb]">3.</span>
                      <p>Gently clean the surface using a soft sponge or non-abrasive pad.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="font-normal text-[#cce3eb]">4.</span>
                      <p>Wipe away any residue with a damp cloth and dry the surface completely.</p>
                    </div>
                  </div>

                  {/* Dried or Stubborn Stains Subnote */}
                  <div className="pt-24 space-y-2">
                    <h4 className="font-semibold text-white tracking-[0.05em] text-[16px] md:text-[18px]">
                      For dried or stubborn stains:
                    </h4>
                    <div className="space-y-3 pl-2">
                      <div className="flex items-start gap-5">
                        <span className="font-normal text-[#cce3eb]">1.</span>
                        <p>Reapply the cleaner and leave for up to 5 minutes.</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="font-normal text-[#cce3eb]">2.</span>
                        <p>Gently rub the area and rinse thoroughly before drying.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* C. Technical Specifications Section */}
          <div className="space-y-12 flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="specs-title font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,36px)] leading-tight">
                TECHNICAL SPECIFICATIONS FOR PROFESSIONALS
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-32 max-w-4xl mx-auto w-full">
              {/* DOWNLOAD ITALIAN */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-datasheet-form"));
                }}
                className="specs-btn relative overflow-hidden border border-white/50 w-full md:w-[40%] py-10 flex flex-col items-center justify-center space-y-2 bg-transparent transition-colors duration-500 group focus:outline-none"
              >
                <span className="absolute -inset-[1px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                <span className="relative z-10 font-michroma text-white text-base md:text-lg tracking-[0.2em] transition-colors duration-500 group-hover:text-[#007190]">DOWNLOAD</span>
                <span className="relative z-10 font-michroma text-white text-base md:text-lg tracking-[0.2em] transition-colors duration-500 group-hover:text-[#007190]">ITALIAN</span>
              </button>

              {/* DOWNLOAD ENGLISH */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-datasheet-form"));
                }}
                className="specs-btn relative overflow-hidden border border-white/50 w-full md:w-[40%] py-10 flex flex-col items-center justify-center space-y-2 bg-transparent transition-colors duration-500 group focus:outline-none"
              >
                <span className="absolute -inset-[1px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                <span className="relative z-10 font-michroma text-white text-base md:text-lg tracking-[0.2em] transition-colors duration-500 group-hover:text-[#007190]">DOWNLOAD</span>
                <span className="relative z-10 font-michroma text-white text-base md:text-lg tracking-[0.2em] transition-colors duration-500 group-hover:text-[#007190]">ENGLISH</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
