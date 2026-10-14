"use client";

import React from "react";
import { motion } from "framer-motion";

interface WaxSealHeartsProps {
  onClick?: () => void;
  isOpening?: boolean;
  className?: string;
  size?: number; // pixel diameter
}

export default function WaxSealHearts({
  onClick,
  isOpening = false,
  className = "",
  size = 88,
}: WaxSealHeartsProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={isOpening}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      animate={
        isOpening
          ? {
              scale: [1, 1.15, 0.6],
              opacity: [1, 1, 0],
              rotate: [0, 8, -12],
            }
          : { scale: 1, opacity: 1 }
      }
      transition={{ duration: isOpening ? 0.9 : 0.3, ease: "easeInOut" }}
      aria-label="Gold wax seal with interlocking hearts"
      className={`relative rounded-full cursor-pointer focus:outline-none select-none transition-shadow ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Pulsing Gold Glow behind wax seal */}
      <motion.div
        animate={
          !isOpening
            ? {
                scale: [1, 1.22, 1],
                opacity: [0.35, 0.7, 0.35],
              }
            : { scale: 1.5, opacity: 0 }
        }
        transition={{
          repeat: isOpening ? 0 : Infinity,
          duration: 2.8,
          ease: "easeInOut",
        }}
        className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-[#DFBA73]/50 via-[#F5E2B3]/60 to-[#C59A45]/50 blur-md pointer-events-none"
      />

      {/* Wax Seal Outer Irregular Melted Edge */}
      <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-br from-[#F7E7C4] via-[#C59A45] to-[#8C6418] shadow-[0_12px_30px_rgba(110,80,20,0.4),0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center">
        {/* Beveled Wax Ridge */}
        <div className="w-full h-full rounded-full p-[2.5px] bg-gradient-to-br from-[#DFBA73] via-[#AA7F28] to-[#6E4E10] shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
          {/* Inner Guilloche Coin Rim */}
          <div className="w-full h-full rounded-full p-[2px] bg-gradient-to-br from-[#FAF0D4] via-[#D4AF37] to-[#99732B] flex items-center justify-center border border-[#FFF8E7]/50 shadow-inner">
            {/* Stamp Medallion Surface */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#CFA44B] via-[#B88A2E] to-[#7D5A12] flex items-center justify-center overflow-hidden shadow-[inset_0_2px_5px_rgba(0,0,0,0.35)]">
              {/* Glossy Curved Highlight */}
              <div className="absolute -top-3 -left-3 w-3/4 h-3/4 bg-gradient-to-br from-white/35 to-transparent rounded-full blur-[2px] pointer-events-none" />

              {/* Dotted Inner Engraved Circle */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#FFF8E7]/40 pointer-events-none" />

              {/* Interlocking Hearts Vector Engraving */}
              <svg
                viewBox="0 0 64 64"
                className="w-3/5 h-3/5 text-[#FFF9E6] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.6)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Heart */}
                <path
                  d="M26 18C20.5 18 16 22.5 16 28C16 36 26 44 26 44"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26 18C28.2 18 30.2 19 31.6 20.6"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Right Heart Interlocking */}
                <path
                  d="M38 18C43.5 18 48 22.5 48 28C48 36 38 44 38 44"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M38 18C35.8 18 33.8 19 32.4 20.6"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Interlocking intersection weave */}
                <path
                  d="M26 44C29 46.5 32 49 32 49C32 49 35 46.5 38 44"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Center Tiny Diamond Accent */}
                <polygon
                  points="32,27 34,30 32,33 30,30"
                  fill="currentColor"
                  opacity="0.9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
