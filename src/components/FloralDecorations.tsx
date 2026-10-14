"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloralCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function FloralCorner({
  position,
  className = "",
  size = "md",
  animate = true,
}: FloralCornerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Positioning & rotation classes
  const positionClasses = {
    "top-left": "top-0 left-0 origin-top-left",
    "top-right": "top-0 right-0 origin-top-right -scale-x-100",
    "bottom-left": "bottom-0 left-0 origin-bottom-left -scale-y-100",
    "bottom-right": "bottom-0 right-0 origin-bottom-right -scale-x-100 -scale-y-100",
  };

  const sizeStyles = {
    sm: "w-36 h-36 sm:w-44 sm:h-44",
    md: "w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72",
    lg: "w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88",
  };

  // Subtle floating sway
  const floatingVariants = {
    float: {
      y: shouldReduceMotion || !animate ? 0 : [0, -6, 0, 4, 0],
      rotate: shouldReduceMotion || !animate ? 0 : [0, 1.2, 0, -1, 0],
      transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={floatingVariants}
      animate="float"
      className={`absolute pointer-events-none z-10 select-none ${positionClasses[position]} ${sizeStyles[size]} ${className}`}
    >
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_20px_rgba(197,154,69,0.12)]"
      >
        <defs>
          {/* Champagne Gold Gradient */}
          <linearGradient id="champagneGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAD29D" />
            <stop offset="40%" stopColor="#C59A45" />
            <stop offset="70%" stopColor="#B38728" />
            <stop offset="100%" stopColor="#DFBA73" />
          </linearGradient>

          {/* Delicate Sage Green Gradient */}
          <linearGradient id="sageLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8BCA3" />
            <stop offset="60%" stopColor="#8A9E85" />
            <stop offset="100%" stopColor="#6C8068" />
          </linearGradient>

          {/* Pale Sage Accent */}
          <linearGradient id="paleSageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4D4BF" />
            <stop offset="100%" stopColor="#9EAF99" />
          </linearGradient>

          {/* Ivory White Petal Gradient */}
          <linearGradient id="whitePetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FAF7F2" />
            <stop offset="100%" stopColor="#EFE8DE" />
          </linearGradient>

          {/* Inner Petal Shadow Gradient */}
          <linearGradient id="petalShadowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF4E8" />
            <stop offset="70%" stopColor="#E6DCCF" />
            <stop offset="100%" stopColor="#D5C5B1" />
          </linearGradient>
        </defs>

        {/* ================= SAGE GREEN BOTANICAL FOLIAGE ================= */}
        {/* Main Arch Branch */}
        <path
          d="M0 0 C40 25 110 50 170 30 C210 16 240 5 260 0"
          stroke="url(#champagneGold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M0 0 C25 40 50 110 30 170 C16 210 5 240 0 260"
          stroke="url(#champagneGold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Eucalyptus Leaves - Sage Green */}
        {/* Top Branch Leaves */}
        <path
          d="M75 35 C95 18 120 22 118 42 C115 56 90 52 75 35 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.85"
        />
        <path
          d="M75 35 C95 18 120 22 118 42 C115 56 90 52 75 35 Z"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
          opacity="0.7"
        />

        <path
          d="M130 35 C155 18 178 28 172 48 C166 60 144 52 130 35 Z"
          fill="url(#paleSageGrad)"
          opacity="0.9"
        />
        <path
          d="M130 35 C155 18 178 28 172 48 C166 60 144 52 130 35 Z"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        <path
          d="M185 24 C205 10 225 18 220 34 C216 45 198 38 185 24 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.8"
        />

        {/* Side Branch Leaves */}
        <path
          d="M35 75 C18 95 22 120 42 118 C56 115 52 90 35 75 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.85"
        />
        <path
          d="M35 75 C18 95 22 120 42 118 C56 115 52 90 35 75 Z"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
          opacity="0.7"
        />

        <path
          d="M35 130 C18 155 28 178 48 172 C60 166 52 144 35 130 Z"
          fill="url(#paleSageGrad)"
          opacity="0.9"
        />
        <path
          d="M35 130 C18 155 28 178 48 172 C60 166 52 144 35 130 Z"
          stroke="url(#champagneGold)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        <path
          d="M24 185 C10 205 18 225 34 220 C45 216 38 198 24 185 Z"
          fill="url(#sageLeafGrad)"
          opacity="0.8"
        />

        {/* Delicate Golden Leaf Sprigs */}
        <path
          d="M95 70 C120 50 145 65 135 85 C125 100 105 88 95 70 Z"
          fill="url(#champagneGold)"
          opacity="0.45"
        />
        <path
          d="M70 95 C50 120 65 145 85 135 C100 125 88 105 70 95 Z"
          fill="url(#champagneGold)"
          opacity="0.45"
        />

        {/* Gold Botanical Tendrils & Berries */}
        <path
          d="M40 40 Q90 90 150 70"
          stroke="url(#champagneGold)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1 3"
          opacity="0.75"
        />
        <circle cx="150" cy="70" r="3.2" fill="url(#champagneGold)" />
        <circle cx="165" cy="62" r="2.2" fill="url(#champagneGold)" />
        <circle cx="70" cy="150" r="3.2" fill="url(#champagneGold)" />
        <circle cx="62" cy="165" r="2.2" fill="url(#champagneGold)" />

        {/* ================= SECONDARY BLOSSOM (UPPER RIGHT) ================= */}
        <g transform="translate(110, 20) scale(0.65)">
          <circle cx="30" cy="30" r="28" fill="url(#petalShadowGrad)" opacity="0.6" />
          <path
            d="M30 5 C45 5 55 18 50 32 C45 46 20 48 12 35 C5 22 15 5 30 5 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.7"
          />
          <path
            d="M10 20 C22 10 38 12 42 26 C46 40 30 48 20 42 C8 35 4 28 10 20 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.7"
          />
          <circle cx="30" cy="28" r="4" fill="url(#champagneGold)" opacity="0.85" />
        </g>

        {/* ================= SECONDARY BLOSSOM (LOWER LEFT) ================= */}
        <g transform="translate(20, 110) scale(0.65)">
          <circle cx="30" cy="30" r="28" fill="url(#petalShadowGrad)" opacity="0.6" />
          <path
            d="M30 5 C45 5 55 18 50 32 C45 46 20 48 12 35 C5 22 15 5 30 5 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.7"
          />
          <path
            d="M10 20 C22 10 38 12 42 26 C46 40 30 48 20 42 C8 35 4 28 10 20 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.7"
          />
          <circle cx="30" cy="28" r="4" fill="url(#champagneGold)" opacity="0.85" />
        </g>

        {/* ================= MAIN LUXURY WHITE ROSE / PEONY IN CORNER ================= */}
        <g transform="translate(10, 10)">
          {/* Outer Layer Petals */}
          <path
            d="M50 8 C72 6 88 24 82 46 C76 68 55 76 35 70 C15 64 6 42 16 24 C24 10 38 8 50 8 Z"
            fill="url(#petalShadowGrad)"
            opacity="0.8"
          />

          {/* Layer 1 Large White Petals */}
          <path
            d="M48 14 C70 12 84 28 80 48 C76 66 58 74 40 70 C22 66 14 48 22 30 C28 18 38 14 48 14 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="1"
          />
          <path
            d="M32 20 C54 10 74 20 76 40 C78 60 60 70 42 68 C24 64 16 50 20 34 C24 24 28 20 32 20 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.8"
          />
          <path
            d="M58 24 C72 34 76 54 64 68 C52 82 32 78 24 64 C16 50 24 30 38 22 C48 16 54 18 58 24 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.8"
          />

          {/* Inner Swirl Petals */}
          <path
            d="M42 28 C56 24 66 34 64 46 C62 58 48 62 38 56 C28 50 28 36 36 30 C38 28 40 28 42 28 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.9"
          />
          <path
            d="M38 34 C48 30 56 36 54 44 C52 52 42 54 36 50 C30 46 30 38 34 34 Z"
            fill="url(#petalShadowGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.75"
          />
          <path
            d="M42 38 C48 36 52 40 50 45 C48 50 42 50 39 47 C36 44 38 39 42 38 Z"
            fill="url(#whitePetalGrad)"
            stroke="url(#champagneGold)"
            strokeWidth="0.7"
          />

          {/* Delicate Stamen Dots in Center */}
          <circle cx="44" cy="43" r="1.8" fill="url(#champagneGold)" />
          <circle cx="47" cy="41" r="1.4" fill="url(#champagneGold)" />
          <circle cx="41" cy="45" r="1.4" fill="url(#champagneGold)" />
        </g>
      </svg>
    </motion.div>
  );
}

/**
 * Gold Ornamental Divider for luxury invitation cards
 */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 select-none ${className}`}>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C59A45]/80 to-[#DFBA73]" />
      <svg
        className="w-4 h-4 text-[#C59A45] opacity-90"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
      </svg>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C59A45]/80 to-[#DFBA73]" />
    </div>
  );
}

/**
 * Subtle Floating Petals / Particles
 */
export function FloatingPetals() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "-10%",
            x: `${15 + i * 15}%`,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "110%",
            x: `${15 + i * 15 + (i % 2 === 0 ? 8 : -8)}%`,
            opacity: [0, 0.45, 0.6, 0],
            rotate: [0, 90, 180, 270],
          }}
          transition={{
            duration: 14 + i * 3,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "linear",
          }}
          className="absolute"
        >
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full rounded-tr-none bg-gradient-to-br from-white via-[#FAF4E8] to-[#E9DCB8] opacity-70 blur-[0.4px] shadow-sm transform rotate-45" />
        </motion.div>
      ))}
    </div>
  );
}
