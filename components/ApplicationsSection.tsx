"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const applications = [
  { name: "INTERIOR WALLS",  image: "/nobilita3/images/Calacatta Oyster Application 1.jpg", row: 1 },
  { name: "INTERIOR FLOORS", image: "/nobilita3/images/ccc.jpg",                            row: 1 },
  { name: "COUNTERTOPS",     image: "/nobilita3/images/mmm.jpg",                            row: 1 },
  { name: "EXTERIOR WALLS",  image: "/nobilita3/images/15.jpg",                             row: 2 },
  { name: "EXTERIOR FLOORS", image: "/nobilita3/images/4.jpg",                              row: 2 },
  { name: "FURNITURE",       image: "/nobilita3/images/Arabescato Fjord (2).jpg",           row: 2 },
];

const DARK_LABEL = ["EXTERIOR WALLS", "EXTERIOR FLOORS", "FURNITURE"];

export default function ApplicationsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const row1Ref     = useRef<HTMLDivElement>(null);
  const row2Ref     = useRef<HTMLDivElement>(null);
  const tileRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      const row1    = row1Ref.current;
      const row2    = row2Ref.current;

      if (!heading || !row1 || !row2) return;

      // ── 1. HEADING — letter-spacing compress ──────────────────────────────
      gsap.set(heading, { opacity: 0, letterSpacing: "0.5em" });
      gsap.to(heading, {
        opacity: 1,
        letterSpacing: "0.1em",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      // ── 2. ROW 1 TILES — clip wipe bottom→top, staggered ─────────────────
      const row1Tiles = row1.querySelectorAll<HTMLElement>(".app-tile");
      gsap.set(row1Tiles, { clipPath: "inset(0 0 100% 0)" });
      gsap.to(row1Tiles, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.1,
        ease: "power3.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: row1,
          start: "top 82%",
          once: true,
        },
      });

      // ── 2. ROW 2 TILES — same, fires slightly later ───────────────────────
      const row2Tiles = row2.querySelectorAll<HTMLElement>(".app-tile");
      gsap.set(row2Tiles, { clipPath: "inset(0 0 100% 0)" });
      gsap.to(row2Tiles, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.1,
        ease: "power3.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: row2,
          start: "top 85%",
          once: true,
        },
      });

      // ── 3. LABELS — slide up after tiles reveal ───────────────────────────
      const allLabels = document.querySelectorAll<HTMLElement>(".tile-label");
      gsap.set(allLabels, { opacity: 0, y: 10 });
      gsap.to(allLabels, {
        opacity: 0.85,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: { each: 0.1, from: "start" },
        delay: 0.6,
        scrollTrigger: {
          trigger: row1,
          start: "top 75%",
          once: true,
        },
      });

      // ── 4 & 5. HOVER — image parallax + label letter-spacing ─────────────
      tileRefs.current.forEach((tile) => {
        if (!tile) return;
        const img   = tile.querySelector<HTMLElement>(".tile-img");
        const label = tile.querySelector<HTMLElement>(".tile-label");
        if (!img || !label) return;

        tile.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = tile.getBoundingClientRect();
          const x = ((e.clientX - rect.left)  / rect.width  - 0.5) * -12;
          const y = ((e.clientY - rect.top)    / rect.height - 0.5) * -12;
          gsap.to(img, { x, y, duration: 0.8, ease: "power2.out", overwrite: "auto" });
        });

        tile.addEventListener("mouseenter", () => {
          gsap.to(label, { letterSpacing: "0.18em", opacity: 1, duration: 0.5, ease: "power2.out" });
        });

        tile.addEventListener("mouseleave", () => {
          gsap.to(img,   { x: 0, y: 0, duration: 1.2, ease: "power3.out", overwrite: "auto" });
          gsap.to(label, { letterSpacing: "0.1em", opacity: 0.85, duration: 0.5, ease: "power2.out" });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const row1Apps = applications.filter(a => a.row === 1);
  const row2Apps = applications.filter(a => a.row === 2);

  const renderTile = (app: typeof applications[0], globalIdx: number) => (
    <div
      key={app.name}
      ref={el => { tileRefs.current[globalIdx] = el; }}
      className="app-tile group relative overflow-hidden cursor-pointer h-[250px] md:h-[300px] lg:h-[360px]"
    >
      {/* ── Image — same as original, overflow:hidden handles parallax clipping */}
      <img
        src={app.image}
        alt={app.name}
        className="tile-img absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.92)",
          transition: "filter 0.7s ease",
          willChange: "transform",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(1.0)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.92)"; }}
      />
      {/* ── Overlay — same as original */}
      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-white/10 pointer-events-none" />
      {/* ── Label */}
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center pointer-events-none">
        <span
          className={`tile-label font-didot font-medium text-[clamp(16px,4vw,28px)] uppercase relative z-10 ${
            DARK_LABEL.includes(app.name) ? "text-brand-dark" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-didot), Georgia, serif", letterSpacing: "0.1em", opacity: 0 }}
        >
          {app.name}
        </span>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="applications-section w-full min-h-[100vh] bg-white flex flex-col pb-10"
    >
      {/* ── HEADING */}
      <h2
        ref={headingRef}
        className="applications-heading font-ivymode font-light text-brand-dark/80 text-[clamp(32px,8vw,60px)] text-center mt-[70px] mb-[40px] uppercase"
        style={{ opacity: 0, letterSpacing: "0.5em" }}
      >
        APPLICATIONS
      </h2>

      {/* ── GRID */}
      <div className="applications-grid flex-1 w-full px-4 md:px-10 flex flex-col gap-3">
        {/* Row 1 — grid gives equal widths */}
        <div
          ref={row1Ref}
          className="app-tile-row-1 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {row1Apps.map((app, i) => renderTile(app, i))}
        </div>

        {/* Row 2 */}
        <div
          ref={row2Ref}
          className="app-tile-row-2 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {row2Apps.map((app, i) => renderTile(app, i + 3))}
        </div>
      </div>
    </section>
  );
}
