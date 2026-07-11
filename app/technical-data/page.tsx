"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TechnicalDataPage() {
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
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-start pt-24 md:pt-28 pb-20 px-6 text-center">
          <h1 className="font-ivymode font-light text-black uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,52px)] leading-tight mb-2">
            ENGINEERED FOR PERFORMANCE
          </h1>
          <p
            className="font-ivymode font-light text-black text-[clamp(16px,1.6vw,22px)] tracking-wide leading-[1.8] max-w-[1150px] w-[92%] mx-auto text-justify"
            style={{ textAlignLast: "center" }}
          >
            Every NOBILITA surface is engineered for exceptional performance from specification to installation. Designed by architects and engineers, it combines technical precision with refined aesthetics, ensuring premium quality, consistency and reliability. NOBILITA offers outstanding durability, dimensional stability, stain resistance, and long-term performance.
          </p>
        </div>
      </section>

      {/* 2. Characteristics, User Guide & Technical Specifications Section */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#007190] text-white">
        <div className="max-w-[1600px] mx-auto flex flex-col space-y-28">

          {/* A. Characteristics Grid */}
          <div className="space-y-16">
            <div>
              <h2 className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,52px)] leading-tight">
                CHARACTERISTICS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 md:gap-x-24 lg:gap-x-32 gap-y-12">
              {/* Left Column (5 items) */}
              <div className="space-y-10 md:space-y-12">
                {/* WATER PROOF */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
                      <path d="M12 18a3 3 0 0 0 3-3" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      WATER PROOF
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Highly resistant to water damage, due to an ultra-low absorption rate.
                    </p>
                  </div>
                </div>

                {/* SCRATCH RESISTANT */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M6 3h12l4 6-10 12L2 9z" />
                      <path d="M11 3 8 9l4 12 4-12-3-6" />
                      <path d="M2 9h20" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      SCRATCH RESISTANT
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Engineered with a tough surface strength to withstand scratches and abrasions.
                    </p>
                  </div>
                </div>

                {/* HEAT & FROST RESISTANT */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
                      <path d="M12 9h.01M12 6h.01M12 12h.01" strokeWidth="2" />
                      <circle cx="17" cy="5" r="1" />
                      <path d="M6 6c.5-.5 1-.5 1.5 0s1 .5 1.5 0" />
                      <path d="M6 10c.5-.5 1-.5 1.5 0s1 .5 1.5 0" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      HEAT & FROST RESISTANT
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      NOBILITA does not burn, emit smoke, or release toxic substances when exposed to fire.
                    </p>
                  </div>
                </div>

                {/* EASY TO MAINTAIN */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M2 20h20" />
                      <path d="M20 16L12 8l-4 4-4-4" />
                      <path d="M18 6l1.5 1.5L21 6l-1.5-1.5z" fill="currentColor" />
                      <path d="M5 5l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      EASY TO MAINTAIN
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Compatible with all types of cleaning agents, including bleach and ammonia.
                    </p>
                  </div>
                </div>

                {/* HYGIENIC & FOOD SAFE */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M21.2 12.8a10 10 0 0 1-8.4 8.4m8.4-8.4L12.8 4.4a10 10 0 0 0-8.4 8.4m16.8 0H4.4" />
                      <circle cx="10" cy="10" r="0.6" fill="currentColor" />
                      <circle cx="14" cy="14" r="0.6" fill="currentColor" />
                      <circle cx="11" cy="15" r="0.6" fill="currentColor" />
                      <circle cx="15" cy="11" r="0.6" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      HYGIENIC & FOOD SAFE
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Non-toxic and free from harmful emissions, 100% food safe, NSF Certified.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column (4 items) */}
              <div className="space-y-10 md:space-y-12">
                {/* UV RESISTANT */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <circle cx="12" cy="11.5" r="2.5" />
                      <path d="M12 7.5V6M12 17v-1.5M7.5 11.5H6m12 0h-1.5M8.8 8.3l-1.1-1.1m8.6 8.6l-1.1-1.1m0-8.6l1.1-1.1M7.7 15.8l1.1-1.1" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      UV RESISTANT
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Composed of 100% natural materials, ensuring colors remain vibrant even with prolonged exposure to sunlight and extreme weather.
                    </p>
                  </div>
                </div>

                {/* ECO FRIENDLY */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M2 22c1.25-6.7 4-11.6 9-16.6C16.5.4 22 2 22 2s-1.6 5.5-8.4 11C8.6 18 3.7 20.75 2 22z" />
                      <path d="M12 10c-2 2-4 3.5-7 4.5" />
                      <path d="M14 8c-2 2-3.5 4-4.5 7" />
                      <path d="M2 22l6-6" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      ECO FRIENDLY
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Contains no substances harmful to the environment.
                    </p>
                  </div>
                </div>

                {/* RECYCLABLE */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M7 11H2V6" />
                      <path d="M20 18v-5h-5" />
                      <path d="M2 13a10 10 0 0 1 16.5-7.5L20 7" />
                      <path d="M22 11a10 10 0 0 1-16.5 7.5L4 17" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      RECYCLABLE
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Each slab incorporates between 52% - 98% recycled content and is fully reusable and recyclable.
                    </p>
                  </div>
                </div>

                {/* HIGH FLEXURAL STRENGTH */}
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
                      <path d="M12 3v13M12 16l-4-4M12 16l4-4" />
                      <path d="M4 20c4 2 12 2 16 0" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-michroma text-sm md:text-[15px] tracking-[0.15em] uppercase font-light text-white">
                      HIGH FLEXURAL STRENGTH
                    </h3>
                    <p className="font-ivymode font-light text-white/90 text-sm md:text-[16px] leading-[1.8] tracking-[0.03em]">
                      Designed to withstand heavy loads and pressure without bending or cracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B. User Guide Section */}
          <div className="space-y-16 pt-16">
            <div className="space-y-8">
              <h2 className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,52px)] leading-tight">
                USER GUIDE
              </h2>
              <div className="font-ivymode font-light text-white/90 text-[clamp(16px,1.7vw,21px)] tracking-widest leading-[1.8] max-w-6xl space-y-6">
                <p>
                  The lasting beauty and performance of a surface depend on proper care and maintenance. To help you preserve the exceptional qualities of NOBILITA porcelain surfaces, we have created a collection of maintenance guidelines.
                </p>
                <p>
                  Explore our easy-to-follow care instructions and cleaning recommendations. Whether for residential or commercial applications, these guidelines ensure your NOBILITA surfaces continue to perform and look their best for generations to come.
                </p>
              </div>
            </div>

            {/* B1. Oil Spills Subsection */}
            <div className="space-y-10 pt-4">
              <h3 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(22px,3vw,36px)] leading-tight">
                OIL SPILLS
              </h3>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                {/* Left Side: Spilling Bottle Illustration */}
                <div className="flex-shrink-0 flex items-center justify-center py-6">
                  <svg viewBox="0 0 150 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-48 md:w-56 h-auto text-white/80">
                    <g transform="rotate(15 45 25)">
                      <path d="M15 15h50v20H15z" rx="2" />
                      <path d="M65 18c3 0 5 2 5 5v4c0 3-2 5-5 5" />
                      <path d="M70 23h12v4H70" />
                      <path d="M82 21.5h2v7h-2z" />
                      <path d="M22 18h36v14H22z" strokeWidth="0.8" strokeDasharray="3 2" />
                    </g>
                    <path d="M84 35c8 1 12 5 22 5s14-2 24-1 12 3 16 2" />
                    <path d="M83 38c6 2 14 6 22 6s18-3 26-2" />
                    <path d="M100 42c15 0 25-1 38-1s12 1 8 2-25 1-38 1-15-1-8-2" fill="currentColor" fillOpacity="0.15" />
                    <circle cx="92" cy="40" r="0.8" fill="currentColor" />
                    <circle cx="106" cy="44" r="0.6" fill="currentColor" />
                    <circle cx="118" cy="41" r="0.8" fill="currentColor" />
                  </svg>
                </div>

                {/* Right Side: Step-by-Step Instructions */}
                <div className="flex-1 space-y-6 font-ivymode font-light text-white/90 text-[clamp(15px,1.6vw,19px)] leading-[1.8] tracking-widest">
                  <div className="flex items-start gap-4">
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
            <div className="space-y-10 pt-4">
              <h3 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(22px,3vw,36px)] leading-tight">
                COFFEE SPILLS
              </h3>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                {/* Left Side: Spilling Coffee Cup Illustration */}
                <div className="flex-shrink-0 flex items-center justify-center py-6">
                  <svg viewBox="0 0 150 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-48 md:w-56 h-auto text-white/80">
                    <g transform="rotate(-30 45 25)">
                      <path d="M20 15h30c4 0 8 4 8 8v12c0 8-6 14-14 14H26c-8 0-14-6-14-14V23c0-4 4-8 8-8z" />
                      <path d="M12 23c-5 0-9 4-9 9s4 9 9 9" />
                    </g>
                    <path d="M68 25c10-4 16 0 24 2s14-5 22-2 12 6 18 3" />
                    <path d="M66 29c8-2 15 2 24 1s16-3 24 0" />
                    <path d="M80 34c10 0 18-2 26 0" />
                    <circle cx="85" cy="23" r="0.8" fill="currentColor" />
                    <circle cx="98" cy="32" r="0.6" fill="currentColor" />
                    <circle cx="112" cy="27" r="0.7" fill="currentColor" />
                    <path d="M50 10q-3-3 0-6t3-3" strokeWidth="0.8" opacity="0.6" />
                    <path d="M56 12q-3-3 0-6t3-3" strokeWidth="0.8" opacity="0.6" />
                  </svg>
                </div>

                {/* Right Side: Step-by-Step Instructions */}
                <div className="flex-1 space-y-6 font-ivymode font-light text-white/90 text-[clamp(15px,1.6vw,19px)] leading-[1.8] tracking-widest">
                  <div className="flex items-start gap-4">
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
            <div className="space-y-10 pt-4">
              <h3 className="font-ivymode font-light text-white uppercase tracking-[0.10em] text-[clamp(22px,3vw,36px)] leading-tight">
                WINE SPILLS
              </h3>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
                {/* Left Side: Spilling Wine Glass Illustration */}
                <div className="flex-shrink-0 flex items-center justify-center py-6">
                  <svg viewBox="0 0 150 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-48 md:w-56 h-auto text-white/80">
                    <path d="M20 22c0 8 0 8 0 16" />
                    <path d="M20 30h25" />
                    <path d="M45 30c0-8 6-12 14-12h16v24H59c-8 0-14-4-14-12z" />
                    <path d="M75 18v24" strokeWidth="0.8" opacity="0.6" />
                    <path d="M76 28c8-1 14 3 22 3s16-4 24-2 12 3 16 2" />
                    <path d="M76 32c6 1 12 4 20 4s18-2 26-1" />
                    <path d="M90 35c15 0 25-1 38-1s12 1 8 2-25 1-38 1-15-1-8-2" fill="currentColor" fillOpacity="0.15" />
                    <circle cx="84" cy="33" r="0.8" fill="currentColor" />
                    <circle cx="98" cy="38" r="0.6" fill="currentColor" />
                    <circle cx="110" cy="34" r="0.7" fill="currentColor" />
                  </svg>
                </div>

                {/* Right Side: Step-by-Step Instructions */}
                <div className="flex-1 space-y-8 font-ivymode font-light text-white/90 text-[clamp(15px,1.6vw,19px)] leading-[1.8] tracking-widest">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
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
                  <div className="pt-6 space-y-4">
                    <h4 className="font-semibold text-white tracking-[0.05em] text-[16px] md:text-[18px]">
                      For dried or stubborn stains:
                    </h4>
                    <div className="space-y-3 pl-2">
                      <div className="flex items-start gap-4">
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
          <div className="space-y-12 pt-16">
            <div className="text-center">
              <h2 className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,36px)] leading-tight">
                TECHNICAL SPECIFICATIONS FOR PROFESSIONALS
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-32 max-w-4xl mx-auto w-full pt-8">
              {/* DOWNLOAD ITALIAN */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-datasheet-form"));
                }}
                className="relative overflow-hidden border border-white/50 w-full md:w-[40%] py-10 flex flex-col items-center justify-center space-y-2 bg-transparent transition-colors duration-500 group focus:outline-none"
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
                className="relative overflow-hidden border border-white/50 w-full md:w-[40%] py-10 flex flex-col items-center justify-center space-y-2 bg-transparent transition-colors duration-500 group focus:outline-none"
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
