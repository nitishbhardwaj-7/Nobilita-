import React from "react";

interface PalazzoSVGProps {
  variant?: "white" | "sepia";
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function PalazzoSVG({ variant = "white", size = 300, className = "", animate = false }: PalazzoSVGProps) {
  const strokeColor = variant === "white" ? "#ffffff" : "#8b7355";
  
  return (
    <svg 
      width={size} 
      height={(size / 300) * 380} 
      viewBox="0 0 300 380" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g stroke={strokeColor} strokeWidth="1.5" className={animate ? "palazzo-path animate" : "palazzo-path"} pathLength="1">
        {/* Roof */}
        <path d="M20 120 L150 40 L280 120 Z" />
        <path d="M50 100 L250 100" strokeWidth="0.5" />
        <path d="M70 85 L230 85" strokeWidth="0.5" />
        <path d="M90 70 L210 70" strokeWidth="0.5" />
        
        {/* Top Floor Windows */}
        <rect x="70" y="140" width="30" height="40" />
        <rect x="135" y="140" width="30" height="40" />
        <rect x="200" y="140" width="30" height="40" />
        
        {/* Middle Floor Arched Windows */}
        <path d="M70 240 L70 220 A 15 15 0 0 1 100 220 L100 240 Z" />
        <path d="M135 240 L135 220 A 15 15 0 0 1 165 220 L165 240 Z" />
        <path d="M200 240 L200 220 A 15 15 0 0 1 230 220 L230 240 Z" />
        
        {/* Ground Floor */}
        <rect x="70" y="280" width="30" height="40" />
        <rect x="200" y="280" width="30" height="40" />
        
        {/* Door */}
        <path d="M130 320 L130 270 L170 270 L170 320" />
        <path d="M120 320 L120 270" />
        <path d="M180 320 L180 270" />
        <path d="M110 270 L190 270 L150 255 Z" />
        
        {/* Brick Lines Ground Floor */}
        <path d="M40 260 L260 260" strokeWidth="0.5" />
        <path d="M40 280 L70 280 M100 280 L120 280 M180 280 L200 280 M230 280 L260 280" strokeWidth="0.5" />
        <path d="M40 300 L70 300 M100 300 L120 300 M180 300 L200 300 M230 300 L260 300" strokeWidth="0.5" />
        <path d="M40 320 L260 320" strokeWidth="1.5" />
        
        {/* Building Outline */}
        <path d="M40 120 L40 320" />
        <path d="M260 120 L260 320" />
      </g>
    </svg>
  );
}
