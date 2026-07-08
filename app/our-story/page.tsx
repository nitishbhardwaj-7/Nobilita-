"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NobilitaHouseSVG from "@/components/NobilitaHouseSVG";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      {/* Main Content / First Section */}
      <section className="w-full min-h-screen max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 pt-28 md:pt-36 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        
        {/* Left Column: House SVG & Logo (4 cols on desktop) */}
        <div className="md:col-span-4 flex flex-col items-center justify-start space-y-3 md:space-y-4">
          {/* House Sketch */}
          <div className="w-full flex justify-center items-center">
            <NobilitaHouseSVG 
              variant="dark" 
              size={280} 
              animate={true} 
              className="opacity-90 max-w-full"
            />
          </div>

          {/* Logo Block */}
          <div className="w-[170px] md:w-[250px]">
            <img
              src="/images/Links/NOBILITA Logo BLACK.png"
              alt="Porcellana Nobilita"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Column: Story Text (8 cols on desktop) */}
        <div className="md:col-span-8 flex flex-col justify-start space-y-6 md:space-y-8">
          <h1 className="font-ivymode font-light text-[#545759] uppercase tracking-[0.15em] text-[clamp(28px,4.5vw,52px)] leading-tight">
            OUR STORY
          </h1>

          <div className="font-ivymode font-light text-[#545759] text-[clamp(18px,1.8vw,22px)] tracking-widest leading-[1.9] space-y-10">
            <p>
              In the grand halls of Renaissance palaces and Baroque villas,
              architecture was never just about building. It was an expression of
              culture, craftsmanship, and an enduring pursuit of beauty.
            </p>
            
            <p>
              The world&apos;s greatest cities were shaped by spaces that celebrated
              proportion, artistry, and material excellence.
            </p>
            
            <p>
              Among their defining features was the{" "}
              <span className="text-[#007190] font-normal">
                Piano Nobile – the noble floor.
              </span>{" "}
              Elevated above the bustle of the streets, it was the heart of the home,
              where marble, light, and masterful detailing came together to create
              spaces of remarkable elegance.
            </p>
          </div>
        </div>

      </section>

      {/* Section 2: Piano Nobile, Reimagined */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center py-20 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100">
        {/* Background Marble Slab */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Links/Arbescato Fjord Face 1.jpg"
            alt="Arabescato Fjord background"
            className="w-full h-full object-cover opacity-100"
          />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-12">
          {/* Centered Heading */}
          <div className="w-full text-center">
            <h2 className="font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(28px,4.5vw,52px)] leading-tight">
              PIANO NOBILE, REIMAGINED
            </h2>
          </div>

          {/* Grid Layout: Text vs Image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left Column: Narrative (7 cols) */}
            <div className="md:col-span-7 flex flex-col space-y-6 md:space-y-8 font-ivymode font-light text-[#545759] text-[clamp(16px,1.6vw,22px)] tracking-widest leading-[1.8]">
              <p>
                NOBILITA takes its name from this tradition.
              </p>
              
              <p>
                NOBILITA represents a philosophy rather than a status. It is a
                belief that exceptional materials, thoughtful design, and skilled
                craftsmanship have the power to elevate everyday spaces into
                something{" "}
                <span className="text-[#007190] font-normal">
                  extraordinary
                </span>
                .
              </p>
              
              <p>
                Today, that philosophy guides everything we do.
              </p>
            </div>

            {/* Right Column: Verde Profondo Image (5 cols) */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[400px] shadow-lg border border-white/20">
                <img
                  src="/images/Our story/Verde profondo application.jpg"
                  alt="Verde Profondo application"
                  className="w-full h-auto object-contain block transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Arabescato Vagli Bookmatch Section */}
      <section className="w-full flex flex-col bg-white">
        {/* Top Full-width Image */}
        <div className="w-full relative aspect-[21/9] md:aspect-[2.39/1] overflow-hidden group">
          <img
            src="/images/Our story/Arbescato Vagli BM.jpg"
            alt="Arabescato Vagli Bookmatch bathroom application"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay Text */}
          <div className="absolute bottom-4 right-8 md:bottom-6 md:right-16 z-10">
            <span className="font-ivymode font-light text-[#545759] uppercase tracking-[0.05em] text-[clamp(12px,1.4vw,18px)]">
              ARBESCATO VAGLI
            </span>
          </div>
        </div>

        {/* Bottom Narrative Text */}
        <div className="w-full max-w-[1440px] mx-auto bg-white py-16 md:py-16 px-6 md:px-12 lg:px-24 flex flex-col">
          <div className="w-full">
            <p className="font-ivymode font-light text-[#545759] text-[clamp(16px,1.6vw,22px)] tracking-widest leading-[1.8]">
              At NOBILITA, we work closely with architects, designers, and discerning clients to create architectural experiences. Through careful selection, expert craftsmanship, and a deep understanding of design, we help create spaces that feel timeless rather than trend-driven.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Next Generation Porcelain */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center py-20 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-gray-100">
        {/* Background Marble Slab */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Links/Fior Di Melo Face 1.jpg"
            alt="Fior Di Melo background"
            className="w-full h-full object-cover opacity-100"
          />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-12">
          {/* Centered Heading */}
          <div className="w-full text-center">
            <h2 className="font-ivymode font-light text-[#545759] uppercase tracking-[0.18em] text-[clamp(28px,4.5vw,52px)] leading-tight">
              NEXT GENERATION PORCELAIN
            </h2>
          </div>

          {/* Grid Layout: Image vs Text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left Column: Image (5 cols) */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[400px] shadow-lg border border-white/20">
                <img
                  src="/images/Our story/Ferro Industriale (2).jpg"
                  alt="Ferro Industriale application"
                  className="w-full h-auto object-contain block transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Narrative (7 cols) */}
            <div className="md:col-span-7 flex flex-col space-y-6 md:space-y-8 font-ivymode font-light text-[#545759] text-[clamp(16px,1.6vw,22px)] tracking-widest leading-[1.8]">
              <p>
                Our inspiration comes from the great interiors of the past, but
                our vision is firmly contemporary: bringing the beauty, depth,
                and sophistication of natural stone into modern spaces through
                advanced porcelain surfaces.
              </p>
              
              <p>
                Because true luxury is not defined by excess.
              </p>
              
              <p>
                It is defined by <span className="text-[#007190] font-normal">beauty that endures.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
