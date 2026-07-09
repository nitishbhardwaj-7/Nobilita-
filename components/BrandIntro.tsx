"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import NavigationOverlay from "./NavigationOverlay";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  image?: string;
  isLoaderActive?: boolean;
}

export default function BrandIntro({ title, subtitle, buttonText, image, isLoaderActive = false }: Props) {
  const defaultSubtitle = "Inspired by Italy's noble heritage and Baroque architecture, NOBILITA porcelain is crafted in Modena, Italy, home to Ferrari, Acetaia Giusti, and Brioni. A collection where timeless Italian elegance meets advanced porcelain technology.";
  const sectionRef = useRef<HTMLElement>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const paragraphText = subtitle || defaultSubtitle;
  const words = paragraphText.split(" ");

  useEffect(() => {
    if (isLoaderActive) return;

    const section = sectionRef.current;
    if (!section) return;

    let cleanupBtn: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.8, // Delay slightly for loader exit animation to complete
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });

      tl.to(".brand-menu-btn-wrapper", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      })
        .to(".brand-tag-wrapper", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.6")
        .to(".brand-tag-subtext", {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out"
        }, "-=0.6")
        .to(".brand-logo", {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.8")
        .to(".brand-desc-word", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power3.out"
        }, "-=0.8")
        .to(".brand-btn-wrapper", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6");

      const btn = section.querySelector<HTMLElement>(".brand-story-btn");
      if (btn) {
        const onMouseDown = () => { gsap.to(btn, { scale: 0.96, duration: 0.15, ease: "power2.out" }); };
        const onMouseUp = () => { gsap.to(btn, { scale: 1.0, duration: 0.25, ease: "power2.out" }); };
        const onMouseLeave = () => { gsap.to(btn, { scale: 1.0, duration: 0.25, ease: "power2.out" }); };

        btn.addEventListener("mousedown", onMouseDown);
        btn.addEventListener("mouseup", onMouseUp);
        btn.addEventListener("mouseleave", onMouseLeave);

        cleanupBtn = () => {
          btn.removeEventListener("mousedown", onMouseDown);
          btn.removeEventListener("mouseup", onMouseUp);
          btn.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    });

    return () => {
      ctx.revert();
      if (cleanupBtn) cleanupBtn();
    };
  }, [paragraphText, isLoaderActive]);

  return (
    <section
      ref={sectionRef}
      className="brand-intro-section relative w-full min-h-screen bg-[#007190] flex flex-col items-center justify-center px-6 md:px-20 py-16 md:py-24"
    >
      {/* Menu Icon on Top Left */}
      <div className="brand-menu-btn-wrapper absolute top-6 left-6 md:top-8 md:left-12 z-[10000] opacity-0">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="relative w-10 h-10 focus:outline-none transition-opacity hover:opacity-80 flex items-center justify-center"
          aria-label="Toggle navigation menu"
        >
          <span
            className="absolute block h-[1px] w-12 bg-white/80 transition-all duration-300 ease-in-out"
            style={{
              transform: isNavOpen ? "translateY(0px) rotate(45deg)" : "translateY(-6px) rotate(0deg)"
            }}
          />
          <span
            className="absolute block h-[1px] w-12 bg-white/80 transition-all duration-300 ease-in-out"
            style={{
              transform: isNavOpen ? "scaleX(0)" : "scaleX(1)",
              opacity: isNavOpen ? 0 : 1
            }}
          />
          <span
            className="absolute block h-[1px] w-12 bg-white/80 transition-all duration-300 ease-in-out"
            style={{
              transform: isNavOpen ? "translateY(0px) rotate(-45deg)" : "translateY(6px) rotate(0deg)"
            }}
          />
        </button>
      </div>

      {/* Navigation Overlay */}
      <NavigationOverlay isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <div className="w-full max-w-5xl flex flex-col items-center text-center space-y-10 md:space-y-14">

        {/* Top Header Image (tag.png) */}
        <div className="brand-tag-wrapper w-full max-w-[480px] md:max-w-[850px] flex flex-col items-center opacity-0 translate-y-8">
          <img
            src="/images/Links/tag.png"
            alt="Il Gres Imperiale d'Italia"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
          <span className="brand-tag-subtext font-michroma text-white/50 text-[clamp(12px,1.8vw,24px)] tracking-[0.2em] block opacity-0">
            The Imperial Stone of Italy
          </span>
        </div>

        {/* Middle Logo (NOBILITA_white.png) */}
        <div className="brand-logo-wrapper w-full max-w-[300px] md:max-w-[500px] overflow-hidden py-1">
          <img
            src={image || "/images/NOBILITA_white.png"}
            alt="Porcellana Nobilita"
            loading="lazy"
            className="brand-logo w-full h-auto object-contain translate-y-full opacity-0"
          />
        </div>

        {/* Bottom Paragraph Description */}
        <div className="w-full max-w-[850px]">
          <p className="font-ivymode font-extralight text-white text-justify [text-align-last:center] text-[clamp(16px,2vw,18px)] tracking-widest leading-[32px] w-full mt-2">
            {words.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-block overflow-hidden align-bottom">
                  <span className="brand-desc-word inline-block translate-y-full opacity-0">
                    {word}
                  </span>
                </span>
                {" "}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Button: OUR STORY */}
        <div className="brand-btn-wrapper opacity-0 translate-y-6">
          <Link href="/our-story">
            <button
              className="brand-story-btn relative overflow-hidden border border-white text-white bg-transparent px-8 py-2.5 font-michroma text-[clamp(12px,1.5vw,20px)] tracking-[0.25em] transition-colors duration-500 uppercase group"
            >
              <span className="absolute -inset-[1px] bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#007190]">
                {buttonText || "OUR STORY"}
              </span>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
