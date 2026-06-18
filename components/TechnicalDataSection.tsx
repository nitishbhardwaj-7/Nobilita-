"use client";

import React, { useEffect, useRef } from "react";

export default function TechnicalDataSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 } // Trigger as soon as 1% is visible
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="technical-data" className="w-full min-h-screen relative flex justify-center items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/nobilita3/images/Links/materials.mp4"
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none select-none"
        />
      </div>

      {/* Buttons Container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 px-6">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="border border-brand-dark/80 px-8 py-4 font-michroma text-[11px] md:text-[16px] tracking-[0.15em] text-[#545759] uppercase hover:bg-brand-dark hover:text-white transition-all duration-300 min-w-[280px] md:min-w-[340px] text-center"
        >
          DOWNLOAD CATALOG
        </a>
        <button
          onClick={() => {
            alert("Thank you for subscribing to our newsletter!");
          }}
          className="border border-brand-dark/80 px-8 py-4 font-michroma text-[11px] md:text-[16px] tracking-[0.15em] text-[#545759] uppercase hover:bg-brand-dark hover:text-white transition-all duration-300 min-w-[280px] md:min-w-[340px] text-center focus:outline-none"
        >
          SUBSCRIBE TO NEWSLETTER
        </button>
      </div>
    </section>
  );
}
