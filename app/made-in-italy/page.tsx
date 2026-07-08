"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MadeInItalyPage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <section className="relative w-full flex flex-col justify-center pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100 mt-0 md:mt-8">
        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col space-y-8 md:space-y-10">
          {/* Centered Heading */}
          <div className="w-full text-center">
            <h2 className="font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(32px,5vw,56px)] leading-tight">
              MADE IN ITALY
            </h2>
          </div>

          {/* Grid Layout: Text vs Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-stretch">
            
            {/* Left Column: Narrative (6 cols) */}
            <div className="flex flex-col justify-center space-y-4 md:space-y-6 font-ivymode font-light text-[#545759] text-[clamp(18px,1.8vw,24px)] tracking-wide leading-[2] text-left order-2 md:order-1 h-full py-0 md:py-2">
              <p>
                In the heart of Italy, where rolling hills meet centuries of craftsmanship, lies Modena, a region shaped by the relentless pursuit of excellence. Home to Ferrari, Acetaia Giusti, and Brioni, Modena has long been a place where mastery is refined through patience, precision, and dedication to craft.
              </p>
              
              <p>
                The same spirit defines its porcelain industry. Here, innovation and heritage exist side by side, transforming raw materials into surfaces of <span className="text-[#007190] font-normal">exceptional quality and enduring beauty.</span>
              </p>
            </div>

            {/* Right Column: Image (6 cols) */}
            <div className="flex order-1 md:order-2 h-full">
              <div className="relative w-full h-full border border-gray-100 group overflow-hidden">
                <img
                  src="/images/made-in-italy/Palazzo_della_civilt%C3%A0_del_lavoro_(EUR,_Rome)_(5904657870).jpg"
                  alt="Palazzo della civiltà del lavoro application"
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
                {/* Overlay Text */}
                <div className="absolute bottom-2 right-2 md:bottom-3 md:right-4 z-10">
                  <span className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(11px,1.4vw,16px)] drop-shadow-md">
                    PALAZZO DELLA CIVILTÀ ITALIANA
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="relative w-full py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col space-y-12 md:space-y-16">
          {/* Top Text */}
          <div className="w-full font-ivymode font-light text-[#545759] text-[clamp(18px,1.8vw,24px)] tracking-wide leading-[2] text-left space-y-6">
            <p>
              Every NOBILITA slab is born from this tradition, crafted with Italian expertise, engineered for performance, and designed to stand the test of time.
            </p>
            <p>
              More than a surface, it is a <span className="text-[#007190] font-normal">legacy of craftsmanship made for generations to come.</span>
            </p>
          </div>

          {/* Grid Layout: Two Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* Left Image */}
            <div className="relative w-full h-full border border-gray-100 group overflow-hidden">
              <img
                src="/images/made-in-italy/Nuovocorso.jpg"
                alt="Nuovocorso"
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </div>
            
            {/* Right Image */}
            <div className="relative w-full h-full border border-gray-100 group overflow-hidden">
              <img
                src="/images/made-in-italy/CONTINUA+ impianto HD 2.jpg"
                alt="Large Format Slabs Processing Unit"
                className="w-full h-full object-cover block"
                loading="lazy"
              />
              {/* Overlay Text */}
              <div className="absolute bottom-2 right-2 md:bottom-3 md:right-4 z-10">
                <span className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(10px,1.2vw,16px)] drop-shadow-md">
                  LARGE FORMAT SLABS PROCESSING UNIT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full pb-20 overflow-hidden">
        <div className="relative w-full mx-auto flex flex-col space-y-10 md:space-y-14">
          {/* Top Image */}
          <div className="relative w-full group overflow-hidden">
            <img
              src="/images/made-in-italy/whiteimage.jpg"
              alt="Duomo di Milano"
              className="w-full h-auto object-cover block"
              loading="lazy"
            />
            {/* Overlay Text */}
            <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8 lg:right-12 z-10">
              <span className="font-ivymode font-light text-white uppercase tracking-[0.15em] text-[clamp(11px,1.4vw,18px)] drop-shadow-md">
                DUOMO DI MILANO
              </span>
            </div>
          </div>
          
          {/* Bottom Text */}
          <div className="w-full max-w-[1600px] mx-auto font-ivymode font-light text-[#545759] text-[clamp(16px,1.6vw,24px)] tracking-wide leading-[2] text-left px-6 md:px-12 lg:px-24">
            <p>
              NOBILITA works at the forefront of large-format surface innovation, with state-of-the-art production systems capable of creating ultra-large slabs in exceptional formats and multiple thicknesses. These advancements have redefined what is possible in contemporary architecture, enabling seamless surfaces, reduced visual fragmentation, and a more monolithic architectural language.
            </p>
          </div>
        </div>
      </section>

      <section className="relative w-full h-screen overflow-hidden">
        <div className="relative w-full h-full mx-auto group overflow-hidden">
          {/* Background Image */}
          <img
            src="/images/made-in-italy/Colosseo_2020 copy.jpg"
            alt="Colosseum"
            className="w-full h-full object-cover block"
            loading="lazy"
          />
          
          {/* Top Headline Image Overlay */}
          <div className="absolute top-8 md:top-12 lg:top-16 left-0 right-0 z-10 flex justify-center px-4 w-full pointer-events-none">
            <img
              src="/images/Links/tag grey.png"
              alt="Il Gres Imperiale d'Italia"
              className="w-full max-w-sm md:max-w-2xl lg:max-w-5xl h-auto object-contain drop-shadow-sm opacity-90"
              loading="lazy"
            />
          </div>

          {/* Overlay Text */}
          <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8 lg:right-12 z-10">
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
