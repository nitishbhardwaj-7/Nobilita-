"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Lazy-loaded video component using IntersectionObserver to prevent loading/playing lag
function LazyVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } // Trigger when at least 5% of the video container is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      if (!video.src || video.src === "") {
        video.src = src;
        video.load();
      }
      video.play().catch(() => {
        // Handle browser autoplay policy block gracefully
      });
    } else {
      video.pause();
    }
  }, [isVisible, src]);

  return (
    <video
      ref={videoRef}
      preload="none"
      loop
      muted
      playsInline
      controls
      className={className}
    />
  );
}

export default function FeaturedProduct() {
  const [showVagliBookmatch, setShowVagliBookmatch] = useState(false);
  const [showOysterBookmatch, setShowOysterBookmatch] = useState(false);

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. ARABESCATO VAGLI */}
      <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-brand-dark relative font-ivymode">
        {/* Left Column: Spec Sheet with Slab Background */}
        <div className="relative w-full lg:w-1/2 min-h-screen p-6 md:p-12 flex flex-col justify-center items-center bg-brand-cream/10 border-r border-brand-dark/10">
          {/* Slab Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg" 
              alt="Arabescato Vagli Slab" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>

          {/* BACK button */}
          <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20">
            <Link 
              href="/" 
              className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors"
            >
              BACK
            </Link>
          </div>

          {/* Title */}
          <div className="relative z-10 w-full text-center mb-8 md:mb-12 mt-16 lg:mt-0">
            <h2 className="font-ivymode text-[36px] md:text-[64px] text-black tracking-[0.05em] uppercase font-light">
              ARABESCATO VAGLI
            </h2>
          </div>

          {/* Specs Box Card - Solid White, exact sizes & alignments */}
          <div className="relative z-10 bg-white p-8 w-full max-w-[550px] shadow-sm flex flex-col space-y-10">
            
            {/* Dimensions */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Dimensions SVG Icon */}
                <div className="w-10 h-6 flex items-center justify-center text-brand-dark/40">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 6V16M25 16L21 12M25 16L29 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25 6H10M10 6L14 2M10 6L14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  DIMENSIONS
                </h3>
              </div>
              <div className="pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  6.5MM x 1600 x 3200 (R)<br />
                  12MM x 1620 x 3240 (G)
                </p>
              </div>
            </div>

            {/* Faces */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Faces SVG Icon */}
                <div className="w-10 h-6 flex items-center justify-center text-brand-dark/40">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="6" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="17" y="4" width="6" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="28" y="4" width="6" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  FACES
                </h3>
              </div>
              <div className="pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  6.5MM – BOOKMATCH OF 1<br />
                  12MM – BOOKMATCH OF 1
                </p>
              </div>
            </div>

            {/* Finishes */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Finishes SVG Icon */}
                <div className="w-10 h-6 flex items-center justify-center text-brand-dark/40">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="9" width="28" height="6" fill="url(#stripes-vagli)" />
                    <defs>
                      <pattern id="stripes-vagli" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                    </defs>
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  FINISHES
                </h3>
              </div>
              <div className="pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  6.5MM – POLISHED & HONED<br />
                  12MM – POLISHED & HONED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lazy Video Player */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen bg-black flex items-center justify-center overflow-hidden">
          <LazyVideo 
            src="/nobilita3/images/Links/arbescato vagli bathroom video.mp4"
            className="w-full h-full object-cover"
          />

          {/* Browse All Applications overlay text */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none drop-shadow-md">
            <span className="font-michroma text-white tracking-[0.2em] text-xs md:text-xl uppercase whitespace-nowrap px-4 py-2 rounded backdrop-blur-sm">
              BROWSE ALL APPLICATIONS
            </span>
          </div>
        </div>
      </section>

      {/* 2. ARABESCATO VAGLI FACE 1 & BOOKMATCH PRESECTION */}
      <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center py-12 px-6 md:px-16">
        <div className="relative w-full max-w-[1400px] aspect-[16/9] md:aspect-[2.1/1] overflow-hidden bg-brand-cream/5 shadow-sm border border-brand-dark/5">
          <img 
            src={showVagliBookmatch ? "/nobilita3/images/Arbescato Vagli/Bookmatch.jpg" : "/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg"} 
            alt="Arabescato Vagli slab preview" 
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          {/* Label in top-left */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-white/70 backdrop-blur-sm px-3 py-1">
            {showVagliBookmatch ? "BOOKMATCH" : "FACE 1"}
          </div>

          {/* VIEW BOOKMATCH button in bottom-center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 z-10">
            <button 
              onClick={() => setShowVagliBookmatch(!showVagliBookmatch)}
              className="border border-brand-dark/60 bg-white/85 hover:bg-brand-dark hover:text-white transition-all px-6 py-2.5 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase backdrop-blur-sm focus:outline-none"
            >
              {showVagliBookmatch ? "VIEW FACE 1" : "VIEW BOOKMATCH"}
            </button>
          </div>
        </div>
      </section>

      {/* 3. CALACATTA OYSTER */}
      <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-brand-dark relative font-ivymode">
        {/* Left Column: Spec Sheet with Slab Background */}
        <div className="relative w-full lg:w-1/2 min-h-screen p-6 md:p-12 flex flex-col justify-center items-center bg-brand-cream/10 border-r border-brand-dark/10">
          {/* Slab Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/nobilita3/images/Links/Calacatta Oyster Face 1.jpg" 
              alt="Calacatta Oyster Slab" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>

          {/* BACK button */}
          <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20">
            <Link 
              href="/" 
              className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors"
            >
              BACK
            </Link>
          </div>

          {/* Title */}
          <div className="relative z-10 w-full text-center mb-8 md:mb-12 mt-16 lg:mt-0">
            <h2 className="font-ivymode text-[36px] md:text-[64px] text-black tracking-[0.05em] uppercase font-light">
              CALACATTA OYSTER
            </h2>
          </div>

          {/* Specs Box Card - Solid White, exact sizes & alignments */}
          <div className="relative z-10 bg-white p-8 w-full max-w-[550px] shadow-sm flex flex-col space-y-10">
            
            {/* Dimensions */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Dimensions SVG Icon */}
                <div className="w-10 h-6 flex items-center justify-center text-brand-dark/40">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 6V16M25 16L21 12M25 16L29 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25 6H10M10 6L14 2M10 6L14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  DIMENSIONS
                </h3>
              </div>
              <div className="pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  6.5MM x 1600 x 3200 (R)<br />
                  12MM x 1620 x 3240 (G)
                </p>
              </div>
            </div>

            {/* Faces */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Faces SVG Icon */}
                <div className="w-10 h-6 flex items-center justify-center text-brand-dark/40">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="6" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="17" y="4" width="6" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="28" y="4" width="6" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  FACES
                </h3>
              </div>
              <div className="pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  6.5MM – 1  2  3<br />
                  12MM – BOOKMATCH OF 2
                </p>
              </div>
            </div>

            {/* Finishes */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Finishes SVG Icon */}
                <div className="w-10 h-6 flex items-center justify-center text-brand-dark/40">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="9" width="28" height="6" fill="url(#stripes-oyster)" />
                    <defs>
                      <pattern id="stripes-oyster" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                    </defs>
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  FINISHES
                </h3>
              </div>
              <div className="pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  6.5MM – POLISHED & HONED<br />
                  12MM – POLISHED & HONED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lazy Video Player */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-screen bg-black flex items-center justify-center overflow-hidden">
          <LazyVideo 
            src="/nobilita3/images/Links/Calacatta Oyster Vid.mp4"
            className="w-full h-full object-cover"
          />

          {/* Browse All Applications overlay text */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none drop-shadow-md">
            <span className="font-michroma text-white tracking-[0.2em] text-xs md:text-xl uppercase whitespace-nowrap px-4 py-2 rounded backdrop-blur-sm">
              BROWSE ALL APPLICATIONS
            </span>
          </div>
        </div>
      </section>

      {/* 4. CALACATTA OYSTER FACES & BOOKMATCH PREVIEW SECTION */}
      <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center py-12 px-6 md:px-16">
        {showOysterBookmatch ? (
          /* Bookmatch View */
          <div className="relative w-full max-w-[1400px] aspect-[16/9] md:aspect-[2.1/1] overflow-hidden bg-brand-cream/5 shadow-sm border border-brand-dark/5">
            <img 
              src="/nobilita3/images/Calacatta Oyster/Bookmatch.jpg" 
              alt="Calacatta Oyster Bookmatch" 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
            {/* Label in top-left */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-white/70 backdrop-blur-sm px-3 py-1">
              BOOKMATCH
            </div>

            {/* VIEW FACES button in bottom-center */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 z-10">
              <button 
                onClick={() => setShowOysterBookmatch(false)}
                className="border border-brand-dark/60 bg-white/85 hover:bg-brand-dark hover:text-white transition-all px-6 py-2.5 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase backdrop-blur-sm focus:outline-none"
              >
                VIEW FACES
              </button>
            </div>
          </div>
        ) : (
          /* Three Slabs / Faces View */
          <div className="w-full max-w-[1400px] flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
              {/* Face 1 */}
              <div className="relative aspect-[9/16] md:aspect-[1/2] w-full overflow-hidden bg-brand-cream/5 border border-brand-dark/5 shadow-sm">
                <img 
                  src="/nobilita3/images/Links/Calacatta Oyster Face 1.jpg" 
                  alt="Calacatta Oyster Face 1" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-white/75 backdrop-blur-sm px-3 py-1">
                  FACE 1
                </div>
              </div>

              {/* Face 2 with VIEW BOOKMATCH button */}
              <div className="relative aspect-[9/16] md:aspect-[1/2] w-full overflow-hidden bg-brand-cream/5 border border-brand-dark/5 shadow-sm">
                <img 
                  src="/nobilita3/images/Links/Calacatta Oyster Face 2.jpg" 
                  alt="Calacatta Oyster Face 2" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-white/75 backdrop-blur-sm px-3 py-1">
                  FACE 2
                </div>
                
                {/* VIEW BOOKMATCH button centered at the bottom of Face 2 */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] flex justify-center">
                  <button 
                    onClick={() => setShowOysterBookmatch(true)}
                    className="border border-brand-dark/60 bg-white/85 hover:bg-brand-dark hover:text-white transition-all px-4 py-2.5 font-michroma text-[9px] md:text-[11px] tracking-[0.2em] text-brand-dark uppercase backdrop-blur-sm focus:outline-none whitespace-nowrap shadow-md"
                  >
                    VIEW BOOKMATCH
                  </button>
                </div>
              </div>

              {/* Face 3 */}
              <div className="relative aspect-[9/16] md:aspect-[1/2] w-full overflow-hidden bg-brand-cream/5 border border-brand-dark/5 shadow-sm">
                <img 
                  src="/nobilita3/images/Links/Calacatta Oyster Face 3.jpg" 
                  alt="Calacatta Oyster Face 3" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-1/2 -translate-x-1/2 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-white/75 backdrop-blur-sm px-3 py-1">
                  FACE 3
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
