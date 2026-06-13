"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

// Lazy-loaded video component using IntersectionObserver to prevent loading/playing lag
function LazyVideo({ src, poster, className, controls = false, isParentReady = true }: { src: string; poster?: string; className?: string; controls?: boolean; isParentReady?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

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

    if (isVisible && isParentReady) {
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
        className={`${className} absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out z-10`}
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </div>
  );
}

interface FeaturedProductProps {
  activeProduct?: string | null;
  onClose?: () => void;
}

export default function FeaturedProduct({ activeProduct = null, onClose }: FeaturedProductProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Arabescato Vagli separate refs
  const vagliLeftColRef = useRef<HTMLDivElement>(null);
  const vagliRightColRef = useRef<HTMLDivElement>(null);
  const vagliTitleRef = useRef<HTMLDivElement>(null);
  const vagliCardRef = useRef<HTMLDivElement>(null);
  const vagliBackBtnRef = useRef<HTMLDivElement>(null);

  // Calacatta Oyster separate refs
  const oysterLeftColRef = useRef<HTMLDivElement>(null);
  const oysterRightColRef = useRef<HTMLDivElement>(null);
  const oysterTitleRef = useRef<HTMLDivElement>(null);
  const oysterCardRef = useRef<HTMLDivElement>(null);
  const oysterBackBtnRef = useRef<HTMLDivElement>(null);

  const [isOpenDone, setIsOpenDone] = useState(false);
  const vagliSlidesContainerRef = useRef<HTMLDivElement>(null);
  const oysterSlidesContainerRef = useRef<HTMLDivElement>(null);

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

    const isVagli = activeProduct === "Arabescato Vagli";
    const leftCol = isVagli ? vagliLeftColRef.current : oysterLeftColRef.current;
    const rightCol = isVagli ? vagliRightColRef.current : oysterRightColRef.current;
    const backBtn = isVagli ? vagliBackBtnRef.current : oysterBackBtnRef.current;
    const title = isVagli ? vagliTitleRef.current : oysterTitleRef.current;
    const card = isVagli ? vagliCardRef.current : oysterCardRef.current;

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

    const isVagli = activeProduct === "Arabescato Vagli";
    const leftCol = isVagli ? vagliLeftColRef.current : oysterLeftColRef.current;
    const rightCol = isVagli ? vagliRightColRef.current : oysterRightColRef.current;
    const backBtn = isVagli ? vagliBackBtnRef.current : oysterBackBtnRef.current;
    const title = isVagli ? vagliTitleRef.current : oysterTitleRef.current;
    const card = isVagli ? vagliCardRef.current : oysterCardRef.current;

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
  const [showVagliBookmatch, setShowVagliBookmatch] = useState(false);
  const [showOysterBookmatch, setShowOysterBookmatch] = useState(false);
  const [activeOysterFace, setActiveOysterFace] = useState<number>(1);

  // Calacatta Oyster Slider States
  const [currentOysterSlide, setCurrentOysterSlide] = useState(0);
  const [prevOysterSlideIndex, setPrevOysterSlideIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  // Arabescato Vagli Slider States
  const [currentVagliSlide, setCurrentVagliSlide] = useState(0);
  const [prevVagliSlideIndex, setPrevVagliSlideIndex] = useState<number | null>(null);
  const [vagliSlideDirection, setVagliSlideDirection] = useState<"next" | "prev">("next");

  const vagliSlides = [
    { type: "video", src: "/nobilita3/images/Links/arbescato vagli bathroom video.mp4", poster: "/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg", alt: "Arabescato Vagli Video" },
    { type: "image", src: "/nobilita3/images/Arbescato Vagli/Arbescato Vagli (2).jpg", alt: "Arabescato Vagli Slab 1" },
    { type: "image", src: "/nobilita3/images/Arbescato Vagli/Arabescato Vagli (2).jpg", alt: "Arabescato Vagli Slab 2" },
    { type: "image", src: "/nobilita3/images/Arbescato Vagli/Arabescato Vagli (4).jpg", alt: "Arabescato Vagli Slab 3" },
    { type: "image", src: "/nobilita3/images/Arbescato Vagli/Bookmatch.jpg", alt: "Arabescato Vagli Bookmatch" },
  ];

  const nextVagliSlide = () => {
    setVagliSlideDirection("next");
    setPrevVagliSlideIndex(currentVagliSlide);
    setCurrentVagliSlide((prev) => (prev + 1) % vagliSlides.length);
  };

  const prevVagliSlide = () => {
    setVagliSlideDirection("prev");
    setPrevVagliSlideIndex(currentVagliSlide);
    setCurrentVagliSlide((prev) => (prev - 1 + vagliSlides.length) % vagliSlides.length);
  };

  const oysterSlides = [
    { type: "video", src: "/nobilita3/images/Links/Calacatta Oyster Vid.mp4", poster: "/nobilita3/images/Links/Calacatta Oyster Face 1.jpg", alt: "Calacatta Oyster Video" },
    { type: "image", src: "/nobilita3/images/Calacatta Oyster/Calacatta Oyster1.jpg", alt: "Calacatta Oyster Slab 1" },
    { type: "image", src: "/nobilita3/images/Calacatta Oyster/Calacatta Oyster (2).jpg", alt: "Calacatta Oyster Slab 2" },
    { type: "image", src: "/nobilita3/images/Calacatta Oyster/Bookmatch.jpg", alt: "Calacatta Oyster Bookmatch" },
  ];

  const nextOysterSlide = () => {
    setSlideDirection("next");
    setPrevOysterSlideIndex(currentOysterSlide);
    setCurrentOysterSlide((prev) => (prev + 1) % oysterSlides.length);
  };

  const prevOysterSlide = () => {
    setSlideDirection("prev");
    setPrevOysterSlideIndex(currentOysterSlide);
    setCurrentOysterSlide((prev) => (prev - 1 + oysterSlides.length) % oysterSlides.length);
  };

  // Arabescato Vagli Slider GSAP Transitions
  useEffect(() => {
    if (prevVagliSlideIndex === null || !vagliSlidesContainerRef.current) return;

    const children = vagliSlidesContainerRef.current.children;
    const activeChild = children[currentVagliSlide] as HTMLElement;
    const prevChild = children[prevVagliSlideIndex] as HTMLElement;

    if (!activeChild || !prevChild) return;

    // Set z-indices
    Array.from(children).forEach((child, idx) => {
      const el = child as HTMLElement;
      if (idx === currentVagliSlide) {
        el.style.zIndex = "10";
      } else if (idx === prevVagliSlideIndex) {
        el.style.zIndex = "5";
      } else {
        el.style.zIndex = "0";
      }
    });

    // Kill any ongoing tweens
    gsap.killTweensOf([activeChild, prevChild]);

    const isNext = vagliSlideDirection === "next";

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
  }, [currentVagliSlide, prevVagliSlideIndex, vagliSlideDirection]);

  // Calacatta Oyster Slider GSAP Transitions
  useEffect(() => {
    if (prevOysterSlideIndex === null || !oysterSlidesContainerRef.current) return;

    const children = oysterSlidesContainerRef.current.children;
    const activeChild = children[currentOysterSlide] as HTMLElement;
    const prevChild = children[prevOysterSlideIndex] as HTMLElement;

    if (!activeChild || !prevChild) return;

    // Set z-indices
    Array.from(children).forEach((child, idx) => {
      const el = child as HTMLElement;
      if (idx === currentOysterSlide) {
        el.style.zIndex = "10";
      } else if (idx === prevOysterSlideIndex) {
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
  }, [currentOysterSlide, prevOysterSlideIndex, slideDirection]);

  if (!activeProduct || (activeProduct !== "Arabescato Vagli" && activeProduct !== "Calacatta Oyster")) {
    return null;
  }

  const showVagli = !activeProduct || activeProduct === "Arabescato Vagli";
  const showOyster = !activeProduct || activeProduct === "Calacatta Oyster";

  const content = (
    <div className="w-full flex flex-col bg-white">
      {showVagli && (
        <>
          {/* 1. ARABESCATO VAGLI */}
          <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-brand-dark relative font-ivymode">
            {/* Left Column: Spec Sheet with Slab Background */}
            <div
              ref={vagliLeftColRef}
              className="relative w-full lg:w-1/2 min-h-screen p-6 md:p-12 flex flex-col justify-center lg:items-start items-center bg-brand-cream/10 border-r border-brand-dark/10"
              style={{
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                transform: "translateX(-50px)",
              }}
            >
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
              <div
                ref={vagliBackBtnRef}
                className="absolute top-6 left-6 md:top-12 md:left-12 z-20"
                style={{ opacity: 0, transform: "scale(0.8)" }}
              >
                {onClose ? (
                  <button
                    onClick={handleClose}
                    className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors focus:outline-none"
                  >
                    BACK
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors"
                  >
                    BACK
                  </Link>
                )}
              </div>

              {/* Title */}
              <div
                ref={vagliTitleRef}
                className="relative z-10 w-full text-center lg:text-left mb-8 md:mb-12 mt-16 lg:mt-0 lg:max-w-none"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <h2 className="font-ivymode text-[36px] md:text-[64px] text-black tracking-[0.05em] uppercase font-light">
                  ARABESCATO VAGLI
                </h2>
              </div>

              {/* Specs Box Card - Solid White, exact sizes & alignments */}
              <div
                ref={vagliCardRef}
                className="relative z-10 bg-white/70 p-8 w-full max-w-[500px] shadow-sm flex flex-col space-y-10"
                style={{ opacity: 0, transform: "translateY(35px)" }}
              >

                {/* Dimensions */}
                <div className="flex flex-col">
                  <div className="flex items-center space-x-5">
                    {/* Custom Dimensions SVG Icon */}
                    <div className="w-12 h-8 flex items-center justify-start text-brand-dark/70 opacity-40">
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
                    <div className="w-12 h-8 flex items-center justify-start text-brand-dark/70">
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
                    <div className="w-12 h-8 flex items-center justify-start text-brand-dark/70">
                      <svg viewBox="2 10.8 24.5 7" fill="none" className="w-10 h-auto">
                        <defs>
                          <clipPath id="clippath-vagli-icon">
                            <rect x="2.16" y="10.82" width="24.03" height="6.7" />
                          </clipPath>
                        </defs>
                        <g clipPath="url(#clippath-vagli-icon)">
                          <path stroke="currentColor" strokeWidth="0.4" strokeLinejoin="round" d="M10,11.93L.92,2.86M10,13.45L-.59,2.86M10,14.96L-2.1,2.86M10,16.47L-3.61,2.86M10,17.98L-5.13,2.86M10,19.5L-6.64,2.86M10,21.01L-8.15,2.86M10,22.52L-9.66,2.86M10,24.03L-11.18,2.86M28.15,11.93L19.07,2.86M28.15,13.45L17.56,2.86M28.15,14.96L16.05,2.86M28.15,16.47L14.54,2.86M28.15,17.98L13.02,2.86M28.15,19.5L11.51,2.86M28.15,21.01L10,2.86M28.15,22.52L8.49,2.86M28.15,24.03L6.97,2.86M26.64,24.03L6.97,4.37M25.12,24.03L6.97,5.88M23.61,24.03L6.97,7.4M22.1,24.03L6.97,8.91M20.59,24.03L6.97,10.42M19.07,24.03L6.97,11.93M17.56,24.03L6.97,13.45M16.05,24.03L6.97,14.96M14.54,24.03l-7.56-7.56" />
                        </g>
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

            {/* Right Column: Slider (Video & Images) */}
            <div
              ref={vagliRightColRef}
              className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-screen bg-black flex items-center justify-center overflow-hidden group"
              style={{
                opacity: 0,
                transform: "translateX(30px)",
              }}
            >
              {/* Slides Container */}
              <div ref={vagliSlidesContainerRef} className="w-full h-full relative">
                {vagliSlides.map((slide, idx) => {
                  const isActive = idx === currentVagliSlide;
                  const isPrev = idx === prevVagliSlideIndex;

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
                        // Keep video loaded only when active or previous (to keep playing during transition)
                        (isActive || isPrev) ? (
                          <LazyVideo
                            src={slide.src}
                            poster={slide.poster}
                            className="w-full h-full object-cover"
                          />
                        ) : null
                      ) : (
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Browse All Applications overlay text & slider buttons */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4 md:space-x-8 drop-shadow-md">
                {/* Left Arrow Button */}
                <button
                  onClick={prevVagliSlide}
                  className="text-white/70 hover:text-white transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 p-2 hover:scale-110 flex items-center justify-center"
                  aria-label="Previous Slide"
                >
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 md:w-12 h-auto">
                    <path d="M40 6H2M2 6L7 1M2 6L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <span className="font-michroma text-white tracking-[0.2em] text-xs md:text-sm uppercase whitespace-nowrap px-4 py-2 rounded backdrop-blur-sm pointer-events-none">
                  BROWSE ALL APPLICATIONS
                </span>

                {/* Right Arrow Button */}
                <button
                  onClick={nextVagliSlide}
                  className="text-white/70 hover:text-white transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 p-2 hover:scale-110 flex items-center justify-center"
                  aria-label="Next Slide"
                >
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 md:w-12 h-auto">
                    <path d="M0 6H38M38 6L33 1M38 6L33 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <section className="w-full bg-white flex flex-col justify-center items-center py-20 px-6 md:px-16">
            <div className={`relative w-full max-w-[1100px] overflow-hidden bg-brand-cream/5 shadow-sm border border-brand-dark/5 flex items-center justify-center transition-all duration-500 ${
              showVagliBookmatch ? "aspect-[1920/1872]" : "aspect-[2/1]"
            }`}>
              {showVagliBookmatch ? (
                <img
                  src="/nobilita3/images/Arbescato Vagli/Bookmatch.jpg"
                  alt="Arabescato Vagli Bookmatch"
                  className="w-full h-full object-contain block transition-all duration-700 ease-in-out z-10"
                />
              ) : (
                <img
                  src="/nobilita3/images/Links/Arabescato Vagli Face 1_1.jpg"
                  alt="Arabescato Vagli Face 1"
                  className="absolute w-[50%] h-[200%] rotate-90 object-cover origin-center block transition-all duration-700 ease-in-out z-10"
                />
              )}
              {/* Label in top-left */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-transparent px-3 py-1 z-20">
                {showVagliBookmatch ? "BOOKMATCH" : "FACE 1"}
              </div>

              {/* VIEW BOOKMATCH button in bottom-center */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 z-20">
                <button
                  onClick={() => setShowVagliBookmatch(!showVagliBookmatch)}
                  className="border border-brand-dark/60 bg-transparent hover:bg-brand-dark hover:text-white transition-all px-6 py-2.5 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase focus:outline-none"
                >
                  {showVagliBookmatch ? "VIEW FACE 1" : "VIEW BOOKMATCH"}
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {showOyster && (
        <>
          {/* 3. CALACATTA OYSTER */}
          <section className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-brand-dark relative font-ivymode">
            {/* Left Column: Spec Sheet with Slab Background */}
            <div
              ref={oysterLeftColRef}
              className="relative w-full lg:w-1/2 min-h-screen p-6 md:p-12 flex flex-col justify-center lg:items-start items-center bg-brand-cream/10 border-r border-brand-dark/10"
              style={{
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                transform: "translateX(-50px)",
              }}
            >
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
              <div
                ref={oysterBackBtnRef}
                className="absolute top-6 left-6 md:top-12 md:left-12 z-20"
                style={{ opacity: 0, transform: "scale(0.8)" }}
              >
                {onClose ? (
                  <button
                    onClick={handleClose}
                    className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors focus:outline-none"
                  >
                    BACK
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="border border-brand-dark/40 px-4 py-1.5 font-michroma text-[9px] tracking-[0.2em] text-brand-dark uppercase bg-white/85 hover:bg-brand-dark hover:text-white transition-colors"
                  >
                    BACK
                  </Link>
                )}
              </div>

              {/* Title */}
              <div
                ref={oysterTitleRef}
                className="relative z-10 w-full text-center lg:text-left mb-8 md:mb-12 mt-16 lg:mt-0 lg:max-w-none"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <h2 className="font-ivymode text-[36px] md:text-[64px] text-black tracking-[0.05em] uppercase font-light">
                  CALACATTA OYSTER
                </h2>
              </div>

              {/* Specs Box Card - Solid White, exact sizes & alignments */}
              <div
                ref={oysterCardRef}
                className="relative z-10 bg-white/70 p-8 w-full max-w-[550px] shadow-sm flex flex-col space-y-10"
                style={{ opacity: 0, transform: "translateY(35px)" }}
              >

                {/* Dimensions */}
                <div className="flex flex-col">
                  <div className="flex items-center space-x-5">
                    {/* Custom Dimensions SVG Icon */}
                    <div className="w-12 h-8 flex items-center justify-start text-brand-dark/70">
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
                    <div className="w-12 h-8 flex items-center justify-start text-brand-dark/70">
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
                    <div className="w-12 h-8 flex items-center justify-start text-brand-dark/70">
                      <svg viewBox="2 10.8 24.5 7" fill="none" className="w-10 h-auto">
                        <defs>
                          <clipPath id="clippath-oyster-icon">
                            <rect x="2.16" y="10.82" width="24.03" height="6.7" />
                          </clipPath>
                        </defs>
                        <g clipPath="url(#clippath-oyster-icon)">
                          <path stroke="currentColor" strokeWidth="0.4" strokeLinejoin="round" d="M10,11.93L.92,2.86M10,13.45L-.59,2.86M10,14.96L-2.1,2.86M10,16.47L-3.61,2.86M10,17.98L-5.13,2.86M10,19.5L-6.64,2.86M10,21.01L-8.15,2.86M10,22.52L-9.66,2.86M10,24.03L-11.18,2.86M28.15,11.93L19.07,2.86M28.15,13.45L17.56,2.86M28.15,14.96L16.05,2.86M28.15,16.47L14.54,2.86M28.15,17.98L13.02,2.86M28.15,19.5L11.51,2.86M28.15,21.01L10,2.86M28.15,22.52L8.49,2.86M28.15,24.03L6.97,2.86M26.64,24.03L6.97,4.37M25.12,24.03L6.97,5.88M23.61,24.03L6.97,7.4M22.1,24.03L6.97,8.91M20.59,24.03L6.97,10.42M19.07,24.03L6.97,11.93M17.56,24.03L6.97,13.45M16.05,24.03L6.97,14.96M14.54,24.03l-7.56-7.56" />
                        </g>
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

            {/* Right Column: Slider (Video & Images) */}
            <div
              ref={oysterRightColRef}
              className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-screen bg-black flex items-center justify-center overflow-hidden group"
              style={{
                opacity: 0,
                transform: "translateX(30px)",
              }}
            >
              {/* Slides Container */}
              <div ref={oysterSlidesContainerRef} className="w-full h-full relative">
                {oysterSlides.map((slide, idx) => {
                  const isActive = idx === currentOysterSlide;
                  const isPrev = idx === prevOysterSlideIndex;

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
                        // Keep video loaded only when active or previous (to keep playing during transition)
                        (isActive || isPrev) ? (
                          <LazyVideo
                            src={slide.src}
                            poster={slide.poster}
                            className="w-full h-full object-cover"
                          />
                        ) : null
                      ) : (
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Browse All Applications overlay text & slider buttons */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4 md:space-x-8 drop-shadow-md">
                {/* Left Arrow Button */}
                <button
                  onClick={prevOysterSlide}
                  className="text-white/70 hover:text-white transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 p-2 hover:scale-110 flex items-center justify-center"
                  aria-label="Previous Slide"
                >
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 md:w-12 h-auto">
                    <path d="M40 6H2M2 6L7 1M2 6L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <span className="font-michroma text-white tracking-[0.2em] text-xs md:text-lg uppercase whitespace-nowrap px-4 py-2 rounded backdrop-blur-sm pointer-events-none">
                  BROWSE ALL APPLICATIONS
                </span>

                {/* Right Arrow Button */}
                <button
                  onClick={nextOysterSlide}
                  className="text-white/70 hover:text-white transition-all duration-300 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 p-2 hover:scale-110 flex items-center justify-center"
                  aria-label="Next Slide"
                >
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 md:w-12 h-auto">
                    <path d="M0 6H38M38 6L33 1M38 6L33 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <section className="w-full bg-white flex flex-col justify-center items-center py-20 px-6 md:px-16">
            <div className={`relative w-full max-w-[1100px] overflow-hidden bg-brand-cream/5 shadow-sm border border-brand-dark/5 flex items-center justify-center transition-all duration-500 ${
              showOysterBookmatch ? "aspect-[1920/1880]" : "aspect-[2/1]"
            }`}>
              {showOysterBookmatch ? (
                <img
                  src="/nobilita3/images/Calacatta Oyster/Bookmatch.jpg"
                  alt="Calacatta Oyster Bookmatch"
                  className="w-full h-full object-contain block transition-all duration-700 ease-in-out z-10"
                />
              ) : (
                <img
                  src={`/nobilita3/images/Links/Calacatta Oyster Face ${activeOysterFace}.jpg`}
                  alt={`Calacatta Oyster Face ${activeOysterFace}`}
                  className="absolute w-[50%] h-[200%] rotate-90 object-cover origin-center block transition-all duration-700 ease-in-out z-10"
                />
              )}

              {/* Label in top-left */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase bg-transparent px-3 py-1 z-20">
                {showOysterBookmatch ? "BOOKMATCH" : `FACE ${activeOysterFace}`}
              </div>

              {/* Face switcher in top-right */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center space-x-2 md:space-x-3 z-20">
                {[1, 2, 3].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setActiveOysterFace(f);
                      setShowOysterBookmatch(false);
                    }}
                    className={`border px-3 py-1.5 font-michroma text-[9px] md:text-[11px] tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none ${
                      activeOysterFace === f && !showOysterBookmatch
                        ? "border-brand-dark bg-brand-dark text-white"
                        : "border-brand-dark/30 bg-white/85 text-brand-dark/70 hover:border-brand-dark/60 hover:text-brand-dark"
                    }`}
                  >
                    FACE {f}
                  </button>
                ))}
              </div>

              {/* VIEW BOOKMATCH button in bottom-center */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 z-20">
                <button
                  onClick={() => setShowOysterBookmatch(!showOysterBookmatch)}
                  className="border border-brand-dark/60 bg-transparent hover:bg-brand-dark hover:text-white transition-all px-6 py-2.5 font-michroma text-[10px] md:text-xs tracking-[0.2em] text-brand-dark uppercase focus:outline-none"
                >
                  {showOysterBookmatch ? `VIEW FACE ${activeOysterFace}` : "VIEW BOOKMATCH"}
                </button>
              </div>
            </div>
          </section>
        </>
      )}
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
