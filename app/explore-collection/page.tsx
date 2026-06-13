"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const FeaturedProduct = dynamic(() => import("@/components/FeaturedProduct"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 bg-white flex items-center justify-center font-michroma text-[9px] md:text-xs text-brand-dark/40 tracking-[0.2em] uppercase">
      Loading Exhibition...
    </div>
  )
});

// Comprehensive catalog of Nobilita luxury Italian porcelain slabs
const slabs = [
  {
    name: "Arabescato Vagli",
    img: "/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg",
    color: "White",
    finish: "Polished"
  },
  {
    name: "Arabescato Fjord",
    img: "/nobilita3/images/Links/Arbescato Fjord Face 1.jpg",
    color: "White",
    finish: "Matte"
  },
  {
    name: "Basaltina",
    img: "/nobilita3/images/Links/Basaltina face 1.jpg",
    color: "Dark",
    finish: "Honed"
  },
  {
    name: "Calacatta Borghini",
    img: "/nobilita3/images/Links/Calacatta Borghini 1.jpg",
    color: "Gold",
    finish: "Polished"
  },
  {
    name: "Calacatta Oyster",
    img: "/nobilita3/images/Links/Calacatta Oyster Face 1.jpg",
    color: "Gold",
    finish: "3D-5D Matte"
  },
  {
    name: "Calacatta Sponda",
    img: "/nobilita3/images/Links/Calacatta Sponda 1.jpg",
    color: "White",
    finish: "Polished"
  },
  {
    name: "Calacatta Vagli Rosa",
    img: "/nobilita3/images/Links/Calacatta Vagli Rosa 1.jpg",
    color: "White",
    finish: "Polished"
  },
  {
    name: "Crystallo Bianco",
    img: "/nobilita3/images/Links/crystallo bianco 1.jpg",
    color: "White",
    finish: "Honed"
  },
  {
    name: "Fior Di Melo",
    img: "/nobilita3/images/Links/Fior Di Melo Face 1.jpg",
    color: "White",
    finish: "Matte"
  },
  {
    name: "Onice Bianco",
    img: "/nobilita3/images/Links/Onice Bianco 1.jpg",
    color: "White",
    finish: "Polished"
  },
  {
    name: "Onice Black & White",
    img: "/nobilita3/images/Links/Onice Black & White Face 1_1.jpg",
    color: "Dark",
    finish: "3D-5D Matte"
  },
  {
    name: "Paonazzetto Inizio",
    img: "/nobilita3/images/Links/Paonazzetto Inizio 1.jpg",
    color: "White",
    finish: "Matte"
  },
  {
    name: "Statuario Ultimo",
    img: "/nobilita3/images/Links/Statuario Ultimo 1.jpg",
    color: "White",
    finish: "Honed"
  },
  {
    name: "Travertino CC",
    img: "/nobilita3/images/Links/Travertino CC 1.jpg",
    color: "Gold",
    finish: "Structured Matte"
  },
  {
    name: "Venatino Betogli",
    img: "/nobilita3/images/Links/Venatino betogli 1.jpg",
    color: "White",
    finish: "Polished"
  },
  {
    name: "White Camouflage",
    img: "/nobilita3/images/Links/White Camouflage Face 1.jpg",
    color: "Gray",
    finish: "Structured Matte"
  }
];

const colors = ["White", "Gold", "Gray", "Dark"];
const finishes = ["Polished", "Matte", "Honed", "Structured Matte", "3D-5D Matte"];

interface SlabDetailModalProps {
  slab: typeof slabs[0];
  onClose: () => void;
}

function SlabDetailModal({ slab, onClose }: SlabDetailModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const item1Ref = useRef<HTMLParagraphElement>(null);
  const item2Ref = useRef<HTMLHeadingElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);
  const item4Ref = useRef<HTMLDivElement>(null);
  const item5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── SET INITIAL STATES ──
      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(containerRef.current, { 
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        opacity: 0,
        x: -50
      });
      gsap.set(imageRef.current, { scale: 1.15, opacity: 0 });
      gsap.set([item1Ref.current, item2Ref.current, item3Ref.current, item4Ref.current, item5Ref.current], {
        opacity: 0,
        y: 30
      });

      // ── RUN ENTRY TIMELINE ──
      const tl = gsap.timeline();
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(containerRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power4.inOut"
      }, "-=0.3")
      .to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "power2.out"
      }, "-=0.6")
      .to([item1Ref.current, item2Ref.current, item3Ref.current, item4Ref.current, item5Ref.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out"
      }, "-=1.1");
    });

    return () => ctx.revert();
  }, [slab]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });

    tl.to([item5Ref.current, item4Ref.current, item3Ref.current, item2Ref.current, item1Ref.current], {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in"
    })
    .to(imageRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.3")
    .to(containerRef.current, {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: "power4.inOut"
    }, "-=0.4")
    .to(backdropRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "-=0.6");
  };

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
    >
      {/* Close Trigger */}
      <div 
        className="absolute inset-0 cursor-zoom-out" 
        onClick={handleClose} 
      />

      <div 
        ref={containerRef}
        className="relative bg-brand-dark text-white w-full max-w-6xl aspect-[16/9] md:aspect-auto md:min-h-[75vh] flex flex-col md:flex-row border border-white/10 z-10 shadow-2xl overflow-hidden"
      >
        {/* Left Column: Huge Slab Face Image */}
        <div className="relative w-full md:w-[65%] h-[50vh] md:h-[75vh] overflow-hidden bg-black/40">
          <img 
            ref={imageRef}
            src={slab.img}
            alt={slab.name}
            className="w-full h-full object-contain md:object-cover"
          />
        </div>

        {/* Right Column: Spec / Details Info Panel with Stagger Reveal */}
        <div className="w-full md:w-[35%] p-6 md:p-10 flex flex-col justify-between bg-brand-charcoal relative">
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white font-michroma text-xs tracking-wider uppercase focus:outline-none"
          >
            ✕ CLOSE
          </button>

          <div className="space-y-6 pt-6">
            <p 
              ref={item1Ref}
              className="font-michroma text-[10px] tracking-[0.3em] text-[#007190] uppercase"
            >
              COLLECTION ITEM
            </p>
            
            <h2 
              ref={item2Ref}
              className="font-ivymode text-[28px] md:text-[38px] leading-tight tracking-[0.05em] uppercase"
            >
              {slab.name}
            </h2>

            <div 
              ref={item3Ref}
              className="h-[2px] w-12 bg-white/20" 
            />

            <div 
              ref={item4Ref}
              className="space-y-4 font-montserrat text-sm text-white/80 font-light"
            >
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase tracking-widest text-[10px]">Origin</span>
                <span>Italy</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase tracking-widest text-[10px]">Type</span>
                <span>Imperial Porcelain</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase tracking-widest text-[10px]">Color Category</span>
                <span>{slab.color}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase tracking-widest text-[10px]">Finish Option</span>
                <span>{slab.finish}</span>
              </div>
            </div>
          </div>

          <div 
            ref={item5Ref}
            className="pt-8 space-y-4"
          >
            <Link 
              href="#contact-us"
              onClick={handleClose}
              className="block w-full"
            >
              <button 
                className="relative overflow-hidden border border-white/40 bg-transparent w-full py-4 text-[10px] tracking-[0.2em] font-michroma uppercase transition-colors duration-500 group"
              >
                <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-dark">
                  INQUIRE ABOUT SLAB
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExploreCollection() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [finishDropdownOpen, setFinishDropdownOpen] = useState(false);
  
  // Grid column count state: 2, 3, 4, or 5 columns
  const [columns, setColumns] = useState(4);
  
  // Selected slab for fullscreen detail modal
  const [activeSlab, setActiveSlab] = useState<typeof slabs[0] | null>(null);

  // Reset all active filters
  const handleReset = () => {
    setSelectedColor(null);
    setSelectedFinish(null);
    setColorDropdownOpen(false);
    setFinishDropdownOpen(false);
  };

  // Filter slabs based on selection
  const filteredSlabs = useMemo(() => {
    return slabs.filter((slab) => {
      const matchColor = !selectedColor || slab.color === selectedColor;
      const matchFinish = !selectedFinish || slab.finish === selectedFinish;
      return matchColor && matchFinish;
    });
  }, [selectedColor, selectedFinish]);

  // Tailwind Grid Columns classes map
  const gridColsClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
  }[columns as 2 | 3 | 4 | 5] || "grid-cols-2 md:grid-cols-4";

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between overflow-x-hidden font-ivymode relative">
      {/* Global Scroll Navbar */}
      <Navbar />

      {/* Explore Collection Header Banner */}
      <div id="explore-hero" className="w-full bg-[#007190] pt-28 pb-12 px-6 flex flex-col items-center justify-center text-center relative">
        <Link 
          href="/" 
          className="absolute top-28 left-6 md:left-12 group flex items-center border border-white/20 hover:border-white/60 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm px-5 py-2 text-white/80 hover:text-white transition-all duration-300 font-montserrat text-[10px] tracking-[0.25em] uppercase"
        >
          <span className="relative pb-px">
            HOME
          </span>
        </Link>
        
        <h1 className="font-ivymode text-white text-[clamp(24px,4.5vw,48px)] tracking-[0.10em] uppercase leading-tight mb-12">
          EXPLORE THE COLLECTION
        </h1>
        
        <img 
          src="/nobilita3/images/NOBILITA_white.png" 
          alt="Porcellana Nobilita" 
          className="h-10 md:h-36 w-auto object-contain"
        />
      </div>

      {/* Filters & Grid Adjustment Row */}
      <div className="w-full px-6 md:px-12 py-5 border-b border-brand-dark/10 bg-white flex items-center justify-between sticky top-[64px] md:top-[76px] z-30 shadow-sm">
        {/* Left Side: Filter Options */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Color Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setColorDropdownOpen(!colorDropdownOpen);
                setFinishDropdownOpen(false);
              }}
              className={`font-michroma text-[11px] md:text-lg tracking-[0.15em] hover:text-brand-dark transition-colors uppercase flex items-center gap-2 select-none relative pb-1 ${
                selectedColor ? "text-[#007190] border-b border-[#007190]" : "text-brand-dark/70"
              }`}
            >
              <span>COLOR {selectedColor ? `(${selectedColor})` : ""}</span>
              <span className={`inline-block transition-transform duration-200 ${colorDropdownOpen ? "rotate-180" : "rotate-0"}`}>∨</span>
            </button>
            
            <AnimatePresence>
              {colorDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 w-48 bg-white border border-brand-dark/10 shadow-xl z-40 py-2"
                >
                  {colors.map((color, idx) => (
                    <motion.button
                      key={color}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => {
                        setSelectedColor(color);
                        setColorDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-michroma tracking-wider hover:bg-brand-cream/30 transition-colors uppercase ${
                        selectedColor === color ? "text-[#007190] font-semibold" : "text-brand-dark/70"
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Finish Filter */}
          <div className="relative">
            <button 
              onClick={() => {
                setFinishDropdownOpen(!finishDropdownOpen);
                setColorDropdownOpen(false);
              }}
              className={`font-michroma text-[11px] md:text-lg tracking-[0.15em] hover:text-brand-dark transition-colors uppercase flex items-center gap-2 select-none relative pb-1 ${
                selectedFinish ? "text-[#007190] border-b border-[#007190]" : "text-brand-dark/70"
              }`}
            >
              <span>FINISH {selectedFinish ? `(${selectedFinish})` : ""}</span>
              <span className={`inline-block transition-transform duration-200 ${finishDropdownOpen ? "rotate-180" : "rotate-0"}`}>∨</span>
            </button>
            
            <AnimatePresence>
              {finishDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 w-56 bg-white border border-brand-dark/10 shadow-xl z-40 py-2"
                >
                  {finishes.map((finish, idx) => (
                    <motion.button
                      key={finish}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => {
                        setSelectedFinish(finish);
                        setFinishDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-michroma tracking-wider hover:bg-brand-cream/30 transition-colors uppercase ${
                        selectedFinish === finish ? "text-[#007190] font-semibold" : "text-brand-dark/70"
                      }`}
                    >
                      {finish}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reset Filter Button */}
          {(selectedColor || selectedFinish) && (
            <button 
              onClick={handleReset}
              className="font-michroma text-[11px] md:text-lg tracking-[0.15em] text-red-600 hover:text-red-700 transition-colors uppercase select-none"
            >
              RESET
            </button>
          )}
        </div>

        {/* Right Side: Grid Columns Stack Selector */}
        <div className="flex flex-col  select-none rounded bg-white shadow-sm">
          <button 
            onClick={() => setColumns(c => Math.min(c + 1, 5))} 
            className="px-3 py-1.5 text-[15px] font-semibold hover:bg-brand-dark/5 transition-colors focus:outline-none"
            aria-label="Increase columns"
          >
            +
          </button>
          <button 
            onClick={() => setColumns(c => Math.max(c - 1, 2))} 
            className="px-3 py-1.5 text-[15px] font-semibold hover:bg-brand-dark/5 transition-colors focus:outline-none"
            aria-label="Decrease columns"
          >
            -
          </button>
        </div>
      </div>

      {/* Slabs Grid Section */}
      <div className="flex-1 w-full p-3 md:p-6 bg-white">
        <div className={`grid ${gridColsClass} gap-3 md:gap-4`}>
          <AnimatePresence>
            {filteredSlabs.map((slab, index) => {
              const isDarkSlab = slab.color === "Dark";
              return (
                <motion.div
                  key={slab.name}
                  initial={{ y: 15 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "20px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: (index % 4) * 0.03 }}
                  onClick={() => setActiveSlab(slab)}
                  className="relative aspect-[4/3] group overflow-hidden border border-brand-dark/5 cursor-pointer bg-brand-cream/10"
                >
                  {/* Slab Image Wrapper with overflow-hidden */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={slab.img}
                      alt={slab.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transform-gpu transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08]"
                      style={{
                        transform: "translate3d(0,0,0)",
                        backfaceVisibility: "hidden",
                        willChange: "transform"
                      }}
                    />
                    
                    {/* Wipe Reveal Mask (Right to Left) */}
                    <motion.div 
                      initial={{ x: "0%" }}
                      whileInView={{ x: "-100%" }}
                      viewport={{ once: true, margin: "20px" }}
                      transition={{ 
                        duration: 0.9, 
                        ease: [0.76, 0, 0.24, 1],
                        delay: (index % 4) * 0.05 
                      }}
                      className="absolute inset-0 bg-white z-20 pointer-events-none"
                    />
                  </div>

                  {/* Content Overlay - Name & Premium Icon (No background overlay, no gold line) */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-20 flex items-end justify-between pointer-events-none select-none">
                    {/* Slab Name */}
                    <div className="overflow-hidden flex-1 mr-4">
                      <h3 className={`font-ivymode ${isDarkSlab ? 'text-white' : 'text-brand-dark'} text-[16px] md:text-[22px] tracking-[0.06em] uppercase transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)]`}>
                        {slab.name}
                      </h3>
                    </div>

                    {/* Premium Icon (Diagonal Arrow) reveal */}
                    <div className="overflow-hidden flex-shrink-0">
                      <div className={`${isDarkSlab ? 'text-white/90' : 'text-brand-dark/90'} transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-[100ms]`}>
                        <svg 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1.2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredSlabs.length === 0 && (
          <div className="w-full py-24 text-center">
            <p className="font-ivymode text-brand-dark/50 text-xl tracking-wider uppercase">
              No Slabs Match the Selected Filters.
            </p>
            <button 
              onClick={handleReset}
              className="mt-4 border border-brand-dark/40 px-6 py-2.5 font-michroma text-[10px] tracking-widest uppercase hover:bg-brand-dark hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <FeaturedProduct 
        activeProduct={activeSlab?.name || null} 
        onClose={() => setActiveSlab(null)} 
      />
      <Footer />

      {/* Slabs Detail Lightbox / Modal */}
      {activeSlab && activeSlab.name !== "Arabescato Vagli" && activeSlab.name !== "Calacatta Oyster" && (
        <SlabDetailModal 
          slab={activeSlab} 
          onClose={() => setActiveSlab(null)} 
        />
      )}
    </div>
  );
}
