"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSpillAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".spill-sec");

      sections.forEach((sec) => {
        const illust = sec.querySelector<HTMLElement>(".spill-illust");
        const heading = sec.querySelector<HTMLElement>("h3");
        const steps = sec.querySelectorAll<HTMLElement>(".spill-text > div");
        const text = sec.querySelector<HTMLElement>(".spill-text");
        const subnote = sec.querySelector<HTMLElement>(".wine-subnote");

        // Detect spill type
        const isOil = !!sec.querySelector("#OilSpillSVG");
        const isCoffee = !!sec.querySelector("#CoffeeSpillSVG");
        const isWine = !!sec.querySelector("#WineSpillSVG");

        // Initial setup for the entire section container
        gsap.set(sec, { opacity: 0, y: 30 });
        if (heading) gsap.set(heading, { opacity: 0, y: 15 });
        if (text) gsap.set(text, { opacity: 0, y: 15 });
        if (steps.length) gsap.set(steps, { opacity: 0, y: 10 });
        if (subnote) gsap.set(subnote, { opacity: 0, y: 15 });

        // Initialize SVG elements for stroke drawing
        const paths = sec.querySelectorAll<SVGPathElement>("path");
        paths.forEach((path) => {
          let length = 0;
          try {
            length = path.getTotalLength();
          } catch (e) {
            length = 250;
          }
          if (!length) length = 250;

          // Exclude steam-lines or custom lines from full white fill initially
          const isSteam = path.classList.contains("coffee-steam-line");
          const isShimmer = path.classList.contains("wine-shimmer-line");

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            stroke: "#ffffff",
            strokeWidth: 0.6,
            fillOpacity: isSteam || isShimmer ? 0 : 0,
            opacity: isSteam || isShimmer ? 0 : 0.8,
          });
        });

        // Main section timeline triggered when entering viewport
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            once: true,
          },
        });

        // 1. Section fade & shift up
        mainTl.to(sec, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });

        // Helper to animate drawing of paths
        const animatePathDraw = (selector: string, duration: number, stagger: number = 0.05) => {
          const targets = sec.querySelectorAll<SVGPathElement>(selector);
          if (!targets.length) return gsap.timeline();

          const tl = gsap.timeline();
          targets.forEach((path, i) => {
            tl.to(path, {
              strokeDashoffset: 0,
              duration: duration,
              ease: "power2.out",
            }, i * stagger);
          });
          return tl;
        };

        // 2. SVG Drawing animations sequence
        if (isOil) {
          // Initial bottle angle before settling
          gsap.set(illust, { rotation: 2, transformOrigin: "center bottom" });

          // Sequence: Bottle outline -> Oil stream -> Puddle spill
          mainTl.add(animatePathDraw(".oil-bottle", 0.8, 0.05), "-=0.8");
          mainTl.add(animatePathDraw(".oil-stream", 0.6, 0.04), "-=0.3");
          mainTl.add(animatePathDraw(".oil-spill", 0.9, 0.08), "-=0.2");
          mainTl.add(animatePathDraw(".oil-spill-ripple", 0.5, 0.05), "-=0.3");

          // Settle bottle rotation
          mainTl.to(illust, { rotation: 0, duration: 1.4, ease: "power3.out" }, "-=1.0");

          // Loop slowly the liquid ripple across spill (6-8s)
          const ripples = sec.querySelectorAll(".oil-spill-ripple");
          if (ripples.length) {
            gsap.to(ripples, {
              y: "+=1.5",
              x: "+=1",
              scale: 1.01,
              duration: 7,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: 0.3,
            });
          }
        }

        if (isCoffee) {
          // Initial mug angle before settling
          gsap.set(illust, { rotation: -1.5, transformOrigin: "center bottom" });

          // Sequence: Mug outline -> Splash paths -> Spill paths
          mainTl.add(animatePathDraw(".coffee-mug", 0.9, 0.06), "-=0.8");
          mainTl.add(animatePathDraw(".coffee-splash", 0.7, 0.04), "-=0.4");
          mainTl.add(animatePathDraw(".coffee-spill", 0.8, 0.05), "-=0.3");

          // Settle mug rotation
          mainTl.to(illust, { rotation: 0, duration: 1.3, ease: "power3.out" }, "-=0.9");

          // Steam loop animation (slow upward movement and low opacity fade)
          const steamLines = sec.querySelectorAll(".coffee-steam-line");
          if (steamLines.length) {
            gsap.set(steamLines, { opacity: 0, y: 5 });
            gsap.to(steamLines, {
              opacity: 0.25,
              y: -8,
              strokeDashoffset: 0,
              duration: 4,
              repeat: -1,
              ease: "sine.inOut",
              stagger: 1.2,
            });
          }

          // Subtle coffee drip flowing downward loop
          const splashes = sec.querySelectorAll(".coffee-splash");
          if (splashes.length) {
            gsap.to(splashes, {
              y: "+=1",
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: 0.1,
            });
          }
        }

        if (isWine) {
          // Initial wine glass angle before settling
          gsap.set(illust, { rotation: 4.5, transformOrigin: "center bottom" });

          // Sequence: Glass outline -> Wine puddle afterward
          mainTl.add(animatePathDraw(".wine-glass", 0.9, 0.05), "-=0.8");
          mainTl.add(animatePathDraw(".wine-spill", 0.8, 0.06), "-=0.3");

          // Settle glass rotation into final resting position (0deg)
          mainTl.to(illust, { rotation: 0, duration: 1.5, ease: "power3.out" }, "-=1.0");

          // Shimmer reflection loop on glass
          const wineShimmer = sec.querySelector(".wine-shimmer-line");
          if (wineShimmer) {
            mainTl.to(wineShimmer, {
              strokeDashoffset: 0,
              opacity: 0.4,
              duration: 0.6,
              ease: "power2.out",
            }, "-=0.4");

            // Loop shimmer shine
            gsap.to(wineShimmer, {
              opacity: 0.15,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }

          // Slow idle ripple on puddle / wave
          const wineSpill = sec.querySelectorAll(".wine-spill");
          if (wineSpill.length) {
            gsap.to(wineSpill, {
              scaleY: 1.015,
              scaleX: 1.008,
              duration: 6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              transformOrigin: "center center",
            });
          }
        }

        // 3. Heading reveal
        if (heading) {
          mainTl.to(heading, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5");
        }

        // 4. Content Text reveal
        if (text) {
          mainTl.to(text, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
        }

        // 5. Steps reveal with 80ms stagger
        if (steps.length) {
          mainTl.to(steps, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.3");
        }

        // 6. Subnote reveal
        if (subnote) {
          mainTl.to(subnote, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");
        }
      });

      // Desktop Hover Interaction
      if (!window.matchMedia("(hover: none)").matches) {
        gsap.utils.toArray<HTMLElement>(".spill-illust").forEach((w) => {
          w.style.willChange = "transform";

          w.addEventListener("mouseenter", () => {
            gsap.to(w, {
              scale: 1.03,
              y: -2,
              duration: 0.5,
              ease: "power3.out",
            });
          });

          w.addEventListener("mouseleave", () => {
            gsap.to(w, {
              scale: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 0.5,
              ease: "power3.out",
            });
          });

          w.addEventListener("mousemove", (e: MouseEvent) => {
            const rect = w.getBoundingClientRect();
            const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
            const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

            // Max tilt 3 degrees
            gsap.to(w, {
              rotateY: normalizedX * 3,
              rotateX: -normalizedY * 3,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);
}
