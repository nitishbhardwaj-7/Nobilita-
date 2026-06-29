"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const technicalImages = [
  { src: "/nobilita3/images/Links/Statuario Ultimo 1.jpg", name: "STATUARIO ULTIMO", textColor: "black" },
  { src: "/nobilita3/images/Links/Arbescato Fjord Face 1.jpg", name: "ARABESCATO FJORD", textColor: "black" },
  { src: "/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg", name: "ARABESCATO VAGLI", textColor: "black" },
  { src: "/nobilita3/images/Links/Calacatta Oyster Face 1.jpg", name: "CALACATTA OYSTER", textColor: "black" },
  { src: "/nobilita3/images/Links/Onice Black & White Face 1_1.jpg", name: "ONICE BLACK AND WHITE", textColor: "black" },
  { src: "/nobilita3/images/Links/Calacatta Sponda 1.jpg", name: "CALCATTA SPONDA", textColor: "black" },
  { src: "/nobilita3/images/Links/crystallo bianco 1.jpg", name: "CYSTALLO BIANCO", textColor: "black" },
  { src: "/nobilita3/images/Links/Fior Di Melo Face 1.jpg", name: "FIOR DI MELO", textColor: "black" },
  { src: "/nobilita3/images/Links/Onice Bianco 1.jpg", name: "ONICE BIANCO", textColor: "black" },
  { src: "/nobilita3/images/Links/Travertino CC 1.jpg", name: "TRAVERTINO ROMANO", textColor: "black" }
];export default function TechnicalDataSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    technicalImages.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  // Change image every 10 seconds (matches hero timing)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % technicalImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // GSAP cross‑fade between layers
  useEffect(() => {
    const prev = prevIndexRef.current;
    const next = currentImageIndex;
    if (prev === next) return;
    const prevLayer = layersRef.current[prev];
    const nextLayer = layersRef.current[next];
    if (!prevLayer || !nextLayer) return;
    gsap.set(nextLayer, { zIndex: 2, opacity: 0 });
    gsap.set(prevLayer, { zIndex: 1 });
    gsap.to(nextLayer, {
      opacity: 1,
      duration: 1.4,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(prevLayer, { opacity: 0, zIndex: 0 });
        gsap.set(nextLayer, { zIndex: 1 });
        prevIndexRef.current = next;
      }
    });
  }, [currentImageIndex]);

  return (
    <section className="relative w-full min-h-[60vh] overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 w-full h-full bg-black overflow-hidden flex justify-center items-center">
        {technicalImages.map((slide, i) => (
          <div
            key={slide.src}
            ref={(el) => { layersRef.current[i] = el; }}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
          >
            <img
              src={slide.src}
              alt={`${slide.name} technical view`}
              className="absolute inset-0 w-full h-full object-cover object-bottom max-w-none"
            />
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
{/* Subtle overlay for readability */}
<div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />
<div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-48 px-6">
  <a href="#" target="_blank" rel="noopener noreferrer"
    className="relative overflow-hidden border border-[#545759] text-[#545759] bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group min-w-[280px] md:min-w-[340px] text-center">
    <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
    <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
      CATALOGUE
    </span>
  </a>
  <button onClick={() => { alert("Thank you for subscribing our newsletter!"); }}
    className="relative overflow-hidden border border-[#545759] text-[#545759] bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group min-w-[280px] md:min-w-[340px] text-center focus:outline-none">
    <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
    <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
      NEWSLETTER
    </span>
  </button>
</div>
</div>
    </section>
  );
}
