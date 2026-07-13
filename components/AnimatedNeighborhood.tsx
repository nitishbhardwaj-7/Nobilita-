"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import NobilitaHouseSVG from "./NobilitaHouseSVG";

const HUMANS_POOL = [
  "/images/SubmissionSvgs/OneDrive_1_7-13-2026/man-walking-diagonally-away-cad-blocks-114-pimpmydrawing.svg",
  "/images/SubmissionSvgs/OneDrive_1_7-13-2026/person-walking-dwg-cad-127-pimpmydrawing.svg",
  "/images/SubmissionSvgs/OneDrive_1_7-13-2026/woman-with-sunglasses-walking-her-dog-cad-people-55-pimpmydrawing.svg",
  "/images/SubmissionSvgs/OneDrive_1_7-13-2026/person-walking-and-looking-on-the-phone-people-dwg-219-pimpmydrawing.svg",
  "/images/SubmissionSvgs/OneDrive_1_7-13-2026/kids-running-holding-hands-and-playing-sanaa-people-19-pimpmydrawing.svg",
  "/images/SubmissionSvgs/OneDrive_1_7-13-2026/woman-with-kid-and-stroller-sanaa-people-1-pimpmydrawing.svg",
  "/images/SubmissionSvgs/OneDrive_1_7-13-2026/man-carrying-a-child-cad-blocks-223-pimpmydrawing.svg"
];

export default function AnimatedNeighborhood() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small delay before starting
      const initialDelay = 0.5;

      // Select all human elements
      const humans = gsap.utils.toArray<HTMLElement>(".walker-img");

      const animateWalker = (human: HTMLElement, index: number) => {
        // Dynamically assign a random SVG from the pool on each iteration
        const randomSrc = HUMANS_POOL[Math.floor(Math.random() * HUMANS_POOL.length)];
        human.setAttribute("src", randomSrc);

        const isLeft = Math.random() > 0.5;
        const isEntering = Math.random() > 0.5;

        // Door position
        const doorX = 90;

        // Start and end positions
        const startX = isEntering ? (isLeft ? -150 : 150) : doorX;
        const endX = isEntering ? doorX : (isLeft ? -150 : 150);

        // The scale should be 1.0 when close to the screen edge, and 0.3 when deep at the door.
        const startScale = isEntering ? (0.95 + Math.random() * 0.1) : 0.3;
        const endScale = isEntering ? 0.3 : (0.95 + Math.random() * 0.1);

        // Face the correct direction during travel
        let scaleDirection = 1;
        if (isEntering) {
          scaleDirection = isLeft ? 1 : -1;
        } else {
          scaleDirection = isLeft ? -1 : 1;
        }

        // Reset positions
        gsap.set(human, {
          left: "50%",
          xPercent: -50,
          x: startX,
          y: 0, // Align exactly with the bottom edge
          opacity: 0,
          scale: startScale,
          scaleX: scaleDirection,
          transformOrigin: "bottom center",
          rotation: 0,
        });

        const durationWalk = 4.0 + Math.random() * 2.0;
        const tl = gsap.timeline({
          onComplete: () => {
            const nextDelay = 1.0 + Math.random() * 2.5;
            // Recursively start next animation loop on completion
            gsap.delayedCall(nextDelay, () => animateWalker(human, index));
          }
        });

        if (isEntering) {
          // 1. Enter (zoom out/shrink as they walk towards the door)
          tl.to(human, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          })
            .to(
              human,
              {
                x: endX,
                scale: endScale,
                duration: durationWalk,
                ease: "none",
              },
              "<"
            )
            // Simulate stepping motion: bobbing and slight rotation
            .to(
              human,
              {
                y: "-=4",
                rotation: isLeft ? -3 : 3,
                yoyo: true,
                repeat: Math.floor(durationWalk * 4.5),
                duration: 0.22,
                ease: "sine.inOut",
              },
              "<"
            )
            // Fade out at the door
            .to(
              human,
              {
                opacity: 0,
                duration: 1.0,
                ease: "power2.in",
              },
              `-=${Math.min(1.0, durationWalk * 0.3)}`
            );
        } else {
          // 2. Exit (zoom in/grow as they walk away from the door)
          tl.to(human, {
            opacity: 1,
            duration: 0.8,
            ease: "power1.out",
          })
            .to(
              human,
              {
                x: endX,
                scale: endScale,
                duration: durationWalk,
                ease: "none",
              },
              "<"
            )
            // Simulate stepping motion: bobbing and slight rotation
            .to(
              human,
              {
                y: "-=4",
                rotation: isLeft ? 3 : -3,
                yoyo: true,
                repeat: Math.floor(durationWalk * 4.5),
                duration: 0.22,
                ease: "sine.inOut",
              },
              "<"
            )
            // Fade out as they reach the edge of the container
            .to(
              human,
              {
                opacity: 0,
                duration: 0.8,
                ease: "power1.in",
              },
              "-=0.8"
            );
        }
      };

      // Start initial staggered loops
      humans.forEach((human, i) => {
        const startDelay = initialDelay + i * 2.5;
        gsap.delayedCall(startDelay, () => animateWalker(human, i));
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[200px] md:max-w-[240px] flex items-center justify-center mx-auto overflow-visible"
    >
      {/* The static house in the center */}
      <div className="relative z-10 w-full flex justify-center">
        <NobilitaHouseSVG variant="white" size={240} className="w-full h-auto" animate={true} />
      </div>

      {/* The animated humans (3 active slots maximum) */}
      {[0, 1, 2].map((idx) => (
        <img
          key={idx}
          src={HUMANS_POOL[idx % HUMANS_POOL.length]}
          alt={`Walker ${idx}`}
          className="walker-img absolute bottom-0 w-[30px] md:w-[42px] h-auto object-contain z-20 invert mix-blend-screen opacity-90"
          style={{ opacity: 0 }}
        />
      ))}

      {/* Subtle door mask (optional, just layers behind or fades) */}
      <div className="absolute inset-0 bg-transparent z-30 pointer-events-none" />
    </div>
  );
}
