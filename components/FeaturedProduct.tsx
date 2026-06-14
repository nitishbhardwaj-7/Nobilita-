"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

// Lazy-loaded video component using IntersectionObserver to prevent loading/playing lag
function LazyVideo({ src, poster, className, controls = false, isParentReady = true }: { src: string; poster?: string; className?: string; controls?: boolean; isParentReady?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    setIsLoaded(false);
    hasStartedRef.current = false;
  }, [src]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
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

      if (isParentReady) {
        video.play().then(() => {
          if (!hasStartedRef.current) {
            video.currentTime = 0;
            hasStartedRef.current = true;
          }
        }).catch(() => {
          // Handle autoplay policy block
        });
      } else {
        video.pause();
        hasStartedRef.current = false;
      }
    } else {
      video.pause();
      hasStartedRef.current = false;
    }
  }, [isVisible, src, isParentReady]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {poster && (
        <img
          src={poster}
          alt="Video placeholder"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      <video
        ref={videoRef}
        preload="none"
        loop
        muted
        playsInline
        controls={controls}
        onLoadedData={() => setIsLoaded(true)}
        onPlay={() => setIsLoaded(true)}
        className={`${className} absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out z-10`}
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}

interface SlabConfig {
  leftBg?: string;
  dimensions: string[];
  faces: string[];
  finishes: string[];
  slides: { type: "video" | "image"; src: string; poster?: string; alt?: string }[];
  bookmatchImg?: string;
  availableFaces?: string[];
}

const PRODUCT_CONFIGS: Record<string, SlabConfig> = {
  "Arabescato Vagli": {
    leftBg: "/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg",
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – BOOKMATCH OF 1", "12MM – BOOKMATCH OF 1"],
    finishes: ["6.5MM – POLISHED & HONED", "12MM – POLISHED & HONED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/arbescato vagli bathroom video.mp4", poster: "/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg", alt: "Arabescato Vagli Video" },
      { type: "image", src: "/nobilita3/images/Arbescato Vagli/Arbescato Vagli (2).jpg", alt: "Arabescato Vagli Slab 1" },
      { type: "image", src: "/nobilita3/images/Arbescato Vagli/Arabescato Vagli (2).jpg", alt: "Arabescato Vagli Slab 2" },
      { type: "image", src: "/nobilita3/images/Arbescato Vagli/Arabescato Vagli (4).jpg", alt: "Arabescato Vagli Slab 3" }
    ],
    bookmatchImg: "/nobilita3/images/Arbescato Vagli/Bookmatch.jpg",
    availableFaces: ["/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg"]
  },
  "Calacatta Oyster": {
    leftBg: "/nobilita3/images/Links/Calacatta Oyster Face 1.jpg",
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1  2  3", "12MM – BOOKMATCH OF 2"],
    finishes: ["6.5MM – POLISHED & HONED", "12MM – POLISHED & HONED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/Calacatta Oyster Vid.mp4", poster: "/nobilita3/images/Links/Calacatta Oyster Face 1.jpg", alt: "Calacatta Oyster Video" },
      { type: "image", src: "/nobilita3/images/Calacatta Oyster/Calacatta Oyster1.jpg", alt: "Calacatta Oyster Slab 1" },
      { type: "image", src: "/nobilita3/images/Calacatta Oyster/Calacatta Oyster (2).jpg", alt: "Calacatta Oyster Slab 2" }
    ],
    bookmatchImg: "/nobilita3/images/Calacatta Oyster/Bookmatch.jpg",
    availableFaces: [
      "/nobilita3/images/Links/Calacatta Oyster Face 1.jpg",
      "/nobilita3/images/Links/Calacatta Oyster Face 2.jpg",
      "/nobilita3/images/Links/Calacatta Oyster Face 3.jpg"
    ]
  },
  "Arabescato Fjord": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – MATTE", "12MM – MATTE"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Arbescato Fjord Face 1.jpg", alt: "Arabescato Fjord Video" },
      { type: "image", src: "/nobilita3/images/Links/Arbescato Fjord Face 1.jpg", alt: "Arabescato Fjord Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Arbescato Fjord Face 1.jpg"]
  },
  "Basaltina": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – HONED", "12MM – HONED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Basaltina face 1.jpg", alt: "Basaltina Video" },
      { type: "image", src: "/nobilita3/images/Links/Basaltina face 1.jpg", alt: "Basaltina Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Basaltina face 1.jpg"]
  },
  "Calacatta Borghini": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – BOOKMATCH OF 1"],
    finishes: ["6.5MM – POLISHED", "12MM – POLISHED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Calacatta Borghini 1.jpg", alt: "Calacatta Borghini Video" },
      { type: "image", src: "/nobilita3/images/Links/Calacatta Borghini 1.jpg", alt: "Calacatta Borghini Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Calacatta Borghini 1.jpg"]
  },
  "Calacatta Sponda": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – POLISHED", "12MM – POLISHED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Calacatta Sponda 1.jpg", alt: "Calacatta Sponda Video" },
      { type: "image", src: "/nobilita3/images/Links/Calacatta Sponda 1.jpg", alt: "Calacatta Sponda Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Calacatta Sponda 1.jpg"]
  },
  "Calacatta Vagli Rosa": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – POLISHED", "12MM – POLISHED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Calacatta Vagli Rosa 1.jpg", alt: "Calacatta Vagli Rosa Video" },
      { type: "image", src: "/nobilita3/images/Links/Calacatta Vagli Rosa 1.jpg", alt: "Calacatta Vagli Rosa Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Calacatta Vagli Rosa 1.jpg"]
  },
  "Crystallo Bianco": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – HONED", "12MM – HONED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/crystallo bianco 1.jpg", alt: "Crystallo Bianco Video" },
      { type: "image", src: "/nobilita3/images/Links/crystallo bianco 1.jpg", alt: "Crystallo Bianco Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/crystallo bianco 1.jpg"]
  },
  "Fior Di Melo": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – MATTE", "12MM – MATTE"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Fior Di Melo Face 1.jpg", alt: "Fior Di Melo Video" },
      { type: "image", src: "/nobilita3/images/Links/Fior Di Melo Face 1.jpg", alt: "Fior Di Melo Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Fior Di Melo Face 1.jpg"]
  },
  "Onice Bianco": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – POLISHED", "12MM – POLISHED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Onice Bianco 1.jpg", alt: "Onice Bianco Video" },
      { type: "image", src: "/nobilita3/images/Links/Onice Bianco 1.jpg", alt: "Onice Bianco Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Onice Bianco 1.jpg"]
  },
  "Onice Black & White": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – BOOKMATCH OF 1"],
    finishes: ["6.5MM – 3D-5D MATTE", "12MM – 3D-5D MATTE"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Onice Black & White Face 1_1.jpg", alt: "Onice Black & White Video" },
      { type: "image", src: "/nobilita3/images/Links/Onice Black & White Face 1_1.jpg", alt: "Onice Black & White Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Onice Black & White Face 1_1.jpg"]
  },
  "Paonazzetto Inizio": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – MATTE", "12MM – MATTE"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Paonazzetto Inizio 1.jpg", alt: "Paonazzetto Inizio Video" },
      { type: "image", src: "/nobilita3/images/Links/Paonazzetto Inizio 1.jpg", alt: "Paonazzetto Inizio Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Paonazzetto Inizio 1.jpg"]
  },
  "Statuario Ultimo": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – HONED", "12MM – HONED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Statuario Ultimo 1.jpg", alt: "Statuario Ultimo Video" },
      { type: "image", src: "/nobilita3/images/Links/Statuario Ultimo 1.jpg", alt: "Statuario Ultimo Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Statuario Ultimo 1.jpg"]
  },
  "Travertino CC": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – STRUCTURED MATTE", "12MM – STRUCTURED MATTE"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Travertino CC 1.jpg", alt: "Travertino CC Video" },
      { type: "image", src: "/nobilita3/images/Links/Travertino CC 1.jpg", alt: "Travertino CC Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Travertino CC 1.jpg"]
  },
  "Venatino Betogli": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – POLISHED", "12MM – POLISHED"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/Venatino betogli 1.jpg", alt: "Venatino Betogli Video" },
      { type: "image", src: "/nobilita3/images/Links/Venatino betogli 1.jpg", alt: "Venatino Betogli Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/Venatino betogli 1.jpg"]
  },
  "White Camouflage": {
    dimensions: ["6.5MM x 1600 x 3200 (R)", "12MM x 1620 x 3240 (G)"],
    faces: ["6.5MM – 1 FACE", "12MM – 1 FACE"],
    finishes: ["6.5MM – STRUCTURED MATTE", "12MM – STRUCTURED MATTE"],
    slides: [
      { type: "video", src: "/nobilita3/images/Links/materials.mp4", poster: "/nobilita3/images/Links/White Camouflage Face 1.jpg", alt: "White Camouflage Video" },
      { type: "image", src: "/nobilita3/images/Links/White Camouflage Face 1.jpg", alt: "White Camouflage Slab" }
    ],
    availableFaces: ["/nobilita3/images/Links/White Camouflage Face 1.jpg"]
  }
};

interface FeaturedProductProps {
  activeProduct?: string | null;
  onClose?: () => void;
}

export default function FeaturedProduct({ activeProduct = null, onClose }: FeaturedProductProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const [isOpenDone, setIsOpenDone] = useState(false);

  // Slider States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  // Bookmatch / Face States
  const [showBookmatch, setShowBookmatch] = useState(false);
  const [activeFace, setActiveFace] = useState<number>(1);

  // Get configuration for current active product
  const config = activeProduct ? PRODUCT_CONFIGS[activeProduct] : null;

  // Reset states on product change
  useEffect(() => {
    setCurrentSlide(0);
    setPrevSlideIndex(null);
    setSlideDirection("next");
    setShowBookmatch(false);
    setActiveFace(1);
    setIsOpenDone(false);
  }, [activeProduct]);

  useEffect(() => {
    if (activeProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProduct]);

  useEffect(() => {
    if (!activeProduct) {
      setIsOpenDone(false);
      return;
    }

    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const backBtn = backBtnRef.current;
    const title = titleRef.current;
    const card = cardRef.current;

    let ctx: gsap.Context | null = null;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Set initial states
        gsap.set(overlayRef.current, { opacity: 0 });
        if (leftCol) {
          gsap.set(leftCol, {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            x: -50
          });
        }
        if (rightCol) {
          gsap.set(rightCol, {
            opacity: 0,
            x: 30
          });
        }
        if (backBtn) gsap.set(backBtn, { opacity: 0, scale: 0.8 });
        if (title) gsap.set(title, { opacity: 0, y: 30 });
        if (card) gsap.set(card, { opacity: 0, y: 35 });

        // Entry timeline
        const tl = gsap.timeline({
          onComplete: () => setIsOpenDone(true)
        });
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });

        if (leftCol) {
          tl.to(leftCol, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            x: 0,
            duration: 1.1,
            ease: "power4.inOut"
          }, "-=0.1");
        }

        if (rightCol) {
          tl.to(rightCol, {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out"
          }, leftCol ? "<" : "-=0.1");
        }

        if (backBtn) {
          tl.to(backBtn, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          }, "-=0.6");
        }

        if (title) {
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.5");
        }

        if (card) {
          tl.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.6");
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [activeProduct]);

  const handleClose = () => {
    if (!onClose) return;
    setIsOpenDone(false);

    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const backBtn = backBtnRef.current;
    const title = titleRef.current;
    const card = cardRef.current;

    const tl = gsap.timeline({
      onComplete: onClose
    });

    const exitTargets = [card, title, backBtn].filter(Boolean);
    if (exitTargets.length > 0) {
      tl.to(exitTargets, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in"
      });
    }

    if (leftCol) {
      tl.to(leftCol, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        x: -30,
        duration: 0.8,
        ease: "power4.inOut"
      }, "-=0.2");
    }

    if (rightCol) {
      tl.to(rightCol, {
        opacity: 0,
        x: 20,
        duration: 0.8,
        ease: "power3.in"
      }, leftCol ? "<" : "-=0.2");
    }

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, "-=0.5");
  };

  const nextSlide = () => {
    if (!config) return;
    setSlideDirection("next");
    setPrevSlideIndex(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % config.slides.length);
  };

  const prevSlide = () => {
    if (!config) return;
    setSlideDirection("prev");
    setPrevSlideIndex(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + config.slides.length) % config.slides.length);
  };

  // Slider GSAP Transitions
  useEffect(() => {
    if (prevSlideIndex === null || !slidesContainerRef.current || !config) return;

    const children = slidesContainerRef.current.children;
    const activeChild = children[currentSlide] as HTMLElement;
    const prevChild = children[prevSlideIndex] as HTMLElement;

    if (!activeChild || !prevChild) return;

    // Set z-indices
    Array.from(children).forEach((child, idx) => {
      const el = child as HTMLElement;
      if (idx === currentSlide) {
        el.style.zIndex = "10";
      } else if (idx === prevSlideIndex) {
        el.style.zIndex = "5";
      } else {
        el.style.zIndex = "0";
      }
    });

    // Kill any ongoing tweens
    gsap.killTweensOf([activeChild, prevChild]);

    const isNext = slideDirection === "next";

    // Start states: active slide zooms in/out depending on navigation direction and fades in
    gsap.set(activeChild, {
      x: "0%",
      scale: isNext ? 1.15 : 0.85,
      opacity: 0,
      clipPath: "none",
      webkitClipPath: "none"
    });

    gsap.set(prevChild, {
      x: "0%",
      scale: 1,
      opacity: 1,
      clipPath: "none",
      webkitClipPath: "none"
    });

    // Animate active slide in (soft scale to normal & opacity fade)
    gsap.to(activeChild, {
      scale: 1,
      opacity: 1,
      duration: 1.3,
      ease: "power3.out"
    });

    // Animate prev slide out (soft scale away & opacity fade)
    gsap.to(prevChild, {
      scale: isNext ? 0.88 : 1.12,
      opacity: 0,
      duration: 1.3,
      ease: "power3.out"
    });
  }, [currentSlide, prevSlideIndex, slideDirection, config]);

  if (!activeProduct || !config) {
    return null;
  }

  // Get active face image path
  const activeFaceImg = config.availableFaces && config.availableFaces[activeFace - 1]
    ? config.availableFaces[activeFace - 1]
    : config.slides.find(s => s.type === "image")?.src || "";

  const content = (
    <div className="w-full flex flex-col bg-white">
      <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-brand-dark relative font-ivymode">
        {/* Left Column: Spec Sheet with Slab Background */}
        <div
          ref={leftColRef}
          className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen py-12 px-6 md:p-12 flex flex-col justify-center lg:items-start items-center bg-brand-cream/10 border-b lg:border-b-0 lg:border-r border-brand-dark/10"
          style={{
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            transform: "translateX(-50px)",
          }}
        >
          {/* Slab Background Image */}
          <div className="absolute inset-0">
            <img
              src={config.leftBg || config.slides.find(s => s.type === "image")?.src || ""}
              alt={`${activeProduct} Slab Background`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/10" />
          </div>

          {/* BACK button */}
          <div
            ref={backBtnRef}
            className="fixed top-6 left-6 md:top-12 md:left-12 z-50 pointer-events-auto"
            style={{ opacity: 0, transform: "scale(0.8)" }}
          >
            {onClose ? (
              <button
                onClick={handleClose}
                className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors focus:outline-none shadow-sm"
              >
                BACK
              </button>
            ) : (
              <Link
                href="/"
                className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors shadow-sm"
              >
                BACK
              </Link>
            )}
          </div>

          {/* Title */}
          <div
            ref={titleRef}
            className="relative z-10 w-full text-center lg:text-left mb-8 md:mb-12 mt-6 lg:mt-0 lg:max-w-none"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            <h2 className="font-ivymode text-[36px] md:text-[64px] text-black tracking-[0.05em] uppercase font-light">
              {activeProduct}
            </h2>
          </div>

          {/* Specs Box Card - Solid White, exact sizes & alignments */}
          <div
            ref={cardRef}
            className="relative z-10 bg-white/70 p-6 md:p-8 w-full max-w-[500px] shadow-sm flex flex-col space-y-6 md:space-y-10"
            style={{ opacity: 0, transform: "translateY(35px)" }}
          >
            {/* Dimensions */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Dimensions SVG Icon */}
                <div className="w-12 h-8 flex items-center justify-start text-[#545759] opacity-40">
                  <svg viewBox="2 5 25 18" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-auto">
                    <polyline points="2.34 8.36 23.12 8.36 23.12 22.54" />
                    <polyline points="5.54 11.33 2.34 8.36 5.54 5.39" />
                    <polyline points="26.1 19.35 23.12 22.54 20.15 19.35" />
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  DIMENSIONS
                </h3>
              </div>
              <div className="pl-12 md:pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  {config.dimensions.map((dim, i) => (
                    <React.Fragment key={i}>
                      {dim}
                      {i < config.dimensions.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>

            {/* Faces */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Faces SVG Icon */}
                <div className="w-12 h-8 flex items-center justify-start text-[#545759]">
                  <svg viewBox="2 9 24.5 11" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-auto">
                    <rect x="20.92" y="9.34" width="5.02" height="9.89" />
                    <rect x="11.66" y="9.34" width="5.02" height="9.89" />
                    <rect x="2.41" y="9.34" width="5.02" height="9.89" />
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  FACES
                </h3>
              </div>
              <div className="pl-12 md:pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  {config.faces.map((face, i) => (
                    <React.Fragment key={i}>
                      {face}
                      {i < config.faces.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>

            {/* Finishes */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-5">
                {/* Custom Finishes SVG Icon */}
                <div className="w-12 h-8 flex items-center justify-start text-[#545759]">
                  <svg viewBox="2 10.8 24.5 7" fill="none" className="w-10 h-auto">
                    <defs>
                      <clipPath id="clippath-icon">
                        <rect x="2.16" y="10.82" width="24.03" height="6.7" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#clippath-icon)">
                      <path stroke="currentColor" strokeWidth="0.4" strokeLinejoin="round" d="M10,11.93L.92,2.86M10,13.45L-.59,2.86M10,14.96L-2.1,2.86M10,16.47L-3.61,2.86M10,17.98L-5.13,2.86M10,19.5L-6.64,2.86M10,21.01L-8.15,2.86M10,22.52L-9.66,2.86M10,24.03L-11.18,2.86M28.15,11.93L19.07,2.86M28.15,13.45L17.56,2.86M28.15,14.96L16.05,2.86M28.15,16.47L14.54,2.86M28.15,17.98L13.02,2.86M28.15,19.5L11.51,2.86M28.15,21.01L10,2.86M28.15,22.52L8.49,2.86M28.15,24.03L6.97,2.86M26.64,24.03L6.97,4.37M25.12,24.03L6.97,5.88M23.61,24.03L6.97,7.4M22.1,24.03L6.97,8.91M20.59,24.03L6.97,10.42M19.07,24.03L6.97,11.93M17.56,24.03L6.97,13.45M16.05,24.03L6.97,14.96M14.54,24.03l-7.56-7.56" />
                    </g>
                  </svg>
                </div>
                <h3 className="font-ivymode text-[18px] md:text-[20px] text-black tracking-[0.05em] uppercase font-light">
                  FINISHES
                </h3>
              </div>
              <div className="pl-12 md:pl-16 mt-2">
                <p className="font-michroma text-black uppercase tracking-[0.1em] leading-[1.8] text-[12px] md:text-[14px]">
                  {config.finishes.map((finish, i) => (
                    <React.Fragment key={i}>
                      {finish}
                      {i < config.finishes.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Slider (Video & Images) */}
        <div
          ref={rightColRef}
          className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-screen bg-black flex items-center justify-center overflow-hidden group"
          style={{
            opacity: 0,
            transform: "translateX(30px)",
          }}
        >
          {/* Slides Container */}
          <div ref={slidesContainerRef} className="w-full h-full relative">
            {config.slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              const isPrev = idx === prevSlideIndex;

              let zIndex = "z-0";
              let opacity = 0;

              if (isActive) {
                zIndex = "z-10";
                opacity = 1;
              } else if (isPrev) {
                zIndex = "z-5";
                opacity = 1;
              } else {
                zIndex = "z-0";
                opacity = 0;
              }

              return (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full ${zIndex}`}
                  style={{
                    opacity,
                    willChange: "transform, opacity",
                  }}
                >
                  {slide.type === "video" ? (
                    (isActive || isPrev) ? (
                      <LazyVideo
                        src={slide.src}
                        poster={slide.poster}
                        className="w-full h-full object-cover"
                        isParentReady={isOpenDone && isActive}
                      />
                    ) : null
                  ) : (
                    <img
                      src={slide.src}
                      alt={slide.alt || `${activeProduct} slide ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Browse All Applications overlay text & slider buttons */}
          {config.slides.length > 1 && (
            <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 md:space-x-8 drop-shadow-md">
              {/* Left Arrow Button */}
              <button
                onClick={prevSlide}
                className="text-white/70 hover:text-white transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 p-2 hover:scale-110 flex items-center justify-center"
                aria-label="Previous Slide"
              >
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 md:w-12 h-auto">
                  <path d="M40 6H2M2 6L7 1M2 6L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <span className="font-michroma text-white tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm uppercase whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded backdrop-blur-sm pointer-events-none">
                BROWSE ALL APPLICATIONS
              </span>

              {/* Right Arrow Button */}
              <button
                onClick={nextSlide}
                className="text-white/70 hover:text-white transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 p-2 hover:scale-110 flex items-center justify-center"
                aria-label="Next Slide"
              >
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 md:w-12 h-auto">
                  <path d="M0 6H38M38 6L33 1M38 6L33 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Face / Bookmatch Section */}
      <section className="w-full bg-white flex flex-col justify-center items-center py-10 md:py-20 px-4 md:px-16">
        <div className={`relative w-full overflow-hidden bg-brand-cream/5 shadow-sm border border-brand-dark/5 flex items-center justify-center transition-all duration-500 ${
          showBookmatch ? "max-w-[1100px] aspect-[1920/1872]" : "max-w-[1100px] aspect-[2/1]"
        }`}>
          {showBookmatch && config.bookmatchImg ? (
            <img
              src={config.bookmatchImg}
              alt={`${activeProduct} Bookmatch`}
              className="w-full h-full object-contain block transition-all duration-700 ease-in-out z-10"
            />
          ) : (
            <img
              src={activeFaceImg}
              alt={`${activeProduct} Face ${activeFace}`}
              className="absolute w-1/2 aspect-[1/2] rotate-90 object-cover origin-center block transition-all duration-700 ease-in-out z-10"
            />
          )}

          {/* Label in top-left */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-transparent px-3 py-1 z-20 hidden md:block">
            {showBookmatch ? "BOOKMATCH" : `FACE ${activeFace}`}
          </div>

          {/* Face switcher in top-right */}
          {config.availableFaces && config.availableFaces.length > 1 && (
            <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center space-x-2 md:space-x-3 z-20 hidden md:flex">
              {config.availableFaces.map((f, idx) => {
                const faceNum = idx + 1;
                return (
                  <button
                    key={faceNum}
                    onClick={() => {
                      setActiveFace(faceNum);
                      setShowBookmatch(false);
                    }}
                    className={`border px-3 py-1.5 font-michroma text-[9px] md:text-[11px] tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none ${
                      activeFace === faceNum && !showBookmatch
                        ? "border-brand-dark bg-brand-dark text-white"
                        : "border-brand-dark/30 bg-white/85 text-[#545759] hover:border-brand-dark/60 hover:text-brand-dark"
                    }`}
                  >
                    FACE {faceNum}
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW BOOKMATCH button in bottom-center */}
          {config.bookmatchImg && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 z-20 hidden md:block">
              <button
                onClick={() => setShowBookmatch(!showBookmatch)}
                className="border border-brand-dark/60 bg-transparent hover:bg-brand-dark hover:text-white transition-all px-6 py-2.5 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase focus:outline-none"
              >
                {showBookmatch ? `VIEW FACE ${activeFace}` : "VIEW BOOKMATCH"}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-[1100px] mt-6 gap-4 md:hidden px-2">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="font-michroma text-[10px] tracking-[0.2em] text-brand-dark uppercase">
              {showBookmatch ? "BOOKMATCH" : `FACE ${activeFace}`}
            </div>
            {config.availableFaces && config.availableFaces.length > 1 && (
              <div className="flex items-center space-x-2 ml-4">
                {config.availableFaces.map((f, idx) => {
                  const faceNum = idx + 1;
                  return (
                    <button
                      key={faceNum}
                      onClick={() => {
                        setActiveFace(faceNum);
                        setShowBookmatch(false);
                      }}
                      className={`border px-2.5 py-1 font-michroma text-[9px] tracking-[0.1em] uppercase transition-all duration-300 focus:outline-none ${
                        activeFace === faceNum && !showBookmatch
                          ? "border-brand-dark bg-brand-dark text-white"
                          : "border-brand-dark/30 bg-white/85 text-[#545759] hover:border-brand-dark/60 hover:text-brand-dark"
                      }`}
                    >
                      {faceNum}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {config.bookmatchImg && (
            <button
              onClick={() => setShowBookmatch(!showBookmatch)}
              className="border border-brand-dark/60 bg-transparent hover:bg-brand-dark hover:text-white transition-all px-6 py-2.5 font-michroma text-[10px] tracking-[0.2em] text-brand-dark uppercase focus:outline-none w-full sm:w-auto text-center"
            >
              {showBookmatch ? `VIEW FACE ${activeFace}` : "VIEW BOOKMATCH"}
            </button>
          )}
        </div>
      </section>
    </div>
  );

  if (activeProduct) {
    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[150] overflow-y-auto bg-white"
        style={{ opacity: 0 }}
      >
        <div className="relative w-full min-h-screen bg-white">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
