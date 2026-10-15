"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import WaxSealHearts from "./WaxSealHearts";
import { INVITATION_CONFIG } from "@/lib/invitation";

interface EnvelopeProps {
  isOpening: boolean;
  onOpen: () => void;
}

export default function Envelope({ isOpening, onOpen }: EnvelopeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ perspective: 1400 }}
    >
      {/* Ambient Warm Golden Glow behind envelope */}
      <motion.div
        animate={
          !isOpening
            ? {
                scale: [0.98, 1.05, 0.98],
                opacity: [0.3, 0.55, 0.3],
              }
            : { scale: 1.25, opacity: 0.8 }
        }
        transition={{
          repeat: isOpening ? 0 : Infinity,
          duration: 3.5,
          ease: "easeInOut",
        }}
        className="absolute w-[360px] sm:w-[480px] h-[260px] sm:h-[340px] rounded-3xl bg-gradient-to-br from-[#DFBA73]/35 via-[#F5E2B3]/25 to-transparent blur-3xl pointer-events-none"
      />

      {/* ================= ENVELOPE SHELL ================= */}
      <div className="relative w-[320px] sm:w-[420px] md:w-[460px] h-[210px] sm:h-[265px] md:h-[285px] rounded-2xl shadow-[0_20px_60px_rgba(140,110,60,0.22),0_4px_16px_rgba(0,0,0,0.06)] bg-[#F8F3E9] border border-[#DFC38A]/50">
        
        {/* ================= INSIDE LINING / BACK BASE ================= */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#EFE5D4] via-[#F6EEE1] to-[#FAF5EB] overflow-hidden">
          {/* Subtle gold damask / linen texture watermark */}
          <div
            className="absolute inset-0 opacity-15 bg-repeat pointer-events-none"
            style={{
              backgroundImage: "url('/images/damask_texture.jpg')",
              backgroundSize: "180px 180px",
            }}
          />
          {/* Fine gold border inset */}
          <div className="absolute inset-2 border border-[#C59A45]/20 rounded-xl pointer-events-none" />
        </div>

        {/* ================= EMERGING INVITATION CARD ================= */}
        <motion.div
          initial={{ y: 0, opacity: 0.85 }}
          animate={
            isOpening
              ? {
                  y: shouldReduceMotion ? 0 : -110,
                  opacity: 1,
                  scale: shouldReduceMotion ? 1 : 1.03,
                }
              : { y: 0, opacity: 0.85 }
          }
          transition={{
            duration: shouldReduceMotion ? 0.3 : 1.1,
            ease: [0.22, 1, 0.36, 1],
            delay: shouldReduceMotion ? 0 : 0.35,
          }}
          className="absolute left-4 right-4 sm:left-6 sm:right-6 top-3 bottom-3 rounded-xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] border border-[#C59A45]/45 shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-4 sm:p-5 flex flex-col items-center justify-start text-center overflow-hidden z-10"
        >
          {/* Card Gold Trim Border */}
          <div className="absolute inset-1.5 border border-[#C59A45]/30 rounded-lg pointer-events-none" />
          
          {/* Peeking Card Top Content */}
          <span className="font-cinzel-luxury text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[#A37E36] font-medium pt-1">
            Engagement Ceremony
          </span>
          <div className="flex flex-col items-center justify-center my-0.5">
            <h4 className="font-serif-luxury text-base sm:text-lg text-[#2B231C] leading-tight font-medium tracking-wide">
              {INVITATION_CONFIG.groomName} & {INVITATION_CONFIG.brideName}
            </h4>
            {INVITATION_CONFIG.secondCouple && (
              <>
                <span className="font-serif-luxury text-[10px] text-[#C59A45] italic my-0.5">&</span>
                <h4 className="font-serif-luxury text-base sm:text-lg text-[#2B231C] leading-tight font-medium tracking-wide">
                  {INVITATION_CONFIG.secondCouple.groomName} & {INVITATION_CONFIG.secondCouple.brideName}
                </h4>
              </>
            )}
          </div>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C59A45]/60 to-transparent my-1" />
          <span className="font-cormorant-luxury italic text-[11px] sm:text-xs text-[#6F5B49] opacity-90">
            {INVITATION_CONFIG.date}
          </span>
        </motion.div>

        {/* ================= FRONT POCKET (LEFT & RIGHT & BOTTOM FOLDS) ================= */}
        {/* Left Flap Triangle */}
        <div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl"
        >
          <div
            className="absolute inset-0 bg-[#F4ECDC]/90"
            style={{
              clipPath: "polygon(0 0, 50% 55%, 0 100%)",
              boxShadow: "inset 2px 0 10px rgba(0,0,0,0.03)",
            }}
          />
        </div>

        {/* Right Flap Triangle */}
        <div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl"
        >
          <div
            className="absolute inset-0 bg-[#F2E8D7]/90"
            style={{
              clipPath: "polygon(100% 0, 50% 55%, 100% 100%)",
              boxShadow: "inset -2px 0 10px rgba(0,0,0,0.03)",
            }}
          />
        </div>

        {/* Bottom Flap Triangle */}
        <div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl"
        >
          <div
            className="absolute inset-0 bg-[#EFE4D2] shadow-[0_-4px_15px_rgba(0,0,0,0.04)]"
            style={{
              clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
            }}
          />
          {/* Delicate gold piping on bottom V fold */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full text-[#DFC38A]/60"
          >
            <line
              x1="0"
              y1="100"
              x2="50"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="100"
              y1="100"
              x2="50"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* ================= TOP FLAP (OPENS UPWARD IN 3D) ================= */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={
            isOpening
              ? {
                  rotateX: shouldReduceMotion ? 0 : 180,
                  zIndex: 5, // flips behind the emerging card
                }
              : { rotateX: 0, zIndex: 30 }
          }
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.85,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-x-0 top-0 h-full rounded-t-2xl pointer-events-none z-30"
        >
          {/* Top Flap Outer Face (Visible when closed) */}
          <div
            className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-[#F7F0E3] via-[#F2E8D7] to-[#E9DCB8] shadow-[0_8px_20px_rgba(0,0,0,0.08)] pointer-events-auto"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 58%)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Fine gold border along flap edges */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full text-[#C59A45]/70"
            >
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="58"
                stroke="currentColor"
                strokeWidth="0.9"
              />
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="58"
                stroke="currentColor"
                strokeWidth="0.9"
              />
            </svg>
          </div>

          {/* Top Flap Back Face (Visible when folded open upwards) */}
          <div
            className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-[#EFE5D4] to-[#F5ECE0]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 58%)",
              transform: "rotateY(180deg) rotateZ(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* ================= GOLD WAX SEAL AT FLAP VERTEX ================= */}
        <div
          className="absolute z-40 top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <WaxSealHearts
            onClick={onOpen}
            isOpening={isOpening}
            size={76}
          />
        </div>
      </div>
    </div>
  );
}
