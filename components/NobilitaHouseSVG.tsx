"use client";

import React, { useEffect, useState, useRef } from "react";

interface NobilitaHouseSVGProps {
  variant?: "white" | "sepia";
  size?: number;
  className?: string;
  animate?: boolean;
}

const VB_X = 50;
const VB_Y = 11;
const VB_W = 183;
const VB_H = 262;
const ASPECT = VB_H / VB_W;

/** Split a compound SVG path "d" into individual sub-paths at each M command */
function splitSubPaths(d: string): string[] {
  // Split on every uppercase M (absolute moveTo) that starts a new sub-path
  const parts = d.split(/(?=M)/);
  return parts.filter((p) => p.trim().length > 0);
}

export default function NobilitaHouseSVG({
  size = 223,
  variant = "white",
  className = "",
  animate = false,
}: NobilitaHouseSVGProps) {
  const [subPaths, setSubPaths] = useState<string[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  // Step 1: Fetch SVG → parse paths → split into individual sub-paths
  useEffect(() => {
    // Try the basePath path first (since assets are served there in Next.js config)
    fetch("/nobilita3/images/svg/NOBILITA%20House.svg")
      .then((res) => {
        if (!res.ok) {
          // If that fails, try fetching from the absolute root path as fallback
          return fetch("/images/svg/NOBILITA%20House.svg").then((r) => {
            if (!r.ok) throw new Error("Fallback fetch failed");
            return r.text();
          });
        }
        return res.text();
      })
      .then((svgText) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const pathEls = doc.querySelectorAll("path");
        const allSubs: string[] = [];
        pathEls.forEach((p) => {
          const d = p.getAttribute("d");
          if (d) {
            splitSubPaths(d).forEach((sub) => allSubs.push(sub));
          }
        });
        setSubPaths(allSubs);
      })
      .catch((err) => {
        console.error("Error loading NobilitaHouseSVG:", err);
      });
  }, []);

  // Step 2: Animate each sub-path via direct DOM manipulation
  useEffect(() => {
    if (subPaths.length === 0 || !animate) return;

    const els = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (els.length === 0) return;

    // Phase A: Hide all paths (dashoffset = full length)
    els.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
      el.style.opacity = "1";
      el.style.transition = "none";
    });

    // Phase B: After paint, trigger staggered drawing
    const timer = setTimeout(() => {
      const total = els.length;
      els.forEach((el, i) => {
        const delay = (i / total) * 2.0; // stagger over 2 seconds
        el.style.transition = `stroke-dashoffset 1.2s ease-in-out ${delay}s`;
        el.style.strokeDashoffset = "0";
      });
    }, 60);

    return () => clearTimeout(timer);
  }, [subPaths, animate]);

  const strokeColor = variant === "white" ? "#ffffff" : "#8b7355";
  const svgWidth = size;
  const svgHeight = Math.round(size * ASPECT);

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {subPaths.map((d, i) => (
        <path
          key={i}
          ref={(el) => { pathRefs.current[i] = el; }}
          d={d}
          stroke={strokeColor}
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={animate ? { opacity: 0 } : undefined}
        />
      ))}
    </svg>
  );
}
