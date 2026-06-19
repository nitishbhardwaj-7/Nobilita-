"use client";

import React, { useEffect, useRef } from "react";
import { NOBILITA_HOUSE_PATHS } from "./nobilitaHousePaths";

interface NobilitaHouseSVGProps {
  variant?: "white" | "sepia";
  size?: number;
  className?: string;
  animate?: boolean;
  onAnimationComplete?: () => void;
}

const VB_X = 50;
const VB_Y = 11;
const VB_W = 183;
const VB_H = 262;
const ASPECT = VB_H / VB_W;

export default function NobilitaHouseSVG({
  size = 223,
  variant = "white",
  className = "",
  animate = false,
  onAnimationComplete,
}: NobilitaHouseSVGProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  // Step 2: Animate each sub-path via direct DOM manipulation
  useEffect(() => {
    if (!animate) {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
      return;
    }

    const els = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (els.length === 0) {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
      return;
    }

    // Phase A: Hide all paths (dashoffset = full length)
    els.forEach((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
      el.style.opacity = "1";
      el.style.transition = "none";
    });

    // Phase B: After paint, trigger staggered drawing
    const startTimer = setTimeout(() => {
      const total = els.length;
      els.forEach((el, i) => {
        const delay = (i / total) * 2.0; // stagger over 2 seconds
        el.style.transition = `stroke-dashoffset 1.2s ease-in-out ${delay}s`;
        el.style.strokeDashoffset = "0";
      });
    }, 60);

    // Call onAnimationComplete when the transition completes
    // Total animation time is 2.0s stagger + 1.2s transition = 3.2s + 60ms start delay = 3260ms
    const completeTimer = setTimeout(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 3260);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [animate, onAnimationComplete]);

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
      {NOBILITA_HOUSE_PATHS.map((d, i) => (
        <path
          key={i}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
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
