"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MailOpen, Sparkles } from "lucide-react";
import Envelope from "./Envelope";
import { FloralCorner, FloatingPetals } from "./FloralDecorations";
import { INVITATION_CONFIG } from "@/lib/invitation";

interface OpeningScreenProps {
  isOpening: boolean;
  onOpen: () => void;
}

export default function OpeningScreen({ isOpening, onOpen }: OpeningScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      key="screen-1-opening"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 1.02,
        transition: {
          duration: shouldReduceMotion ? 0.4 : 0.85,
          ease: "easeInOut",
        },
      }}
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-8 sm:py-12 px-4 bg-[#FAF7F2] text-[#2C241E] overflow-hidden select-none"
    >
      {/* ================= BACKGROUND TEXTURE & AMBIENT GLOW ================= */}
      {/* Ivory Paper Fiber Texture / Subtle Damask */}
      <div
        className="absolute inset-0 opacity-25 bg-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/images/damask_texture.jpg')",
          backgroundSize: "260px 260px",
        }}
      />

      {/* Gentle Radial Warm Illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,rgba(250,247,242,0.92)_65%,#F3EDE1_100%)] pointer-events-none" />

      {/* Subtle Floating Petals */}
      <FloatingPetals />

      {/* ================= 4 CORNERS DELICATE FLORAL & GOLD DECORATIONS ================= */}
      <FloralCorner position="top-left" size="lg" />
      <FloralCorner position="top-right" size="lg" />
      <FloralCorner position="bottom-left" size="lg" />
      <FloralCorner position="bottom-right" size="lg" />

      {/* ================= TOP SECTION: ELEGANT TEXT ABOVE ENVELOPE ================= */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-20 text-center max-w-xl mx-auto pt-2 sm:pt-4"
      >
        <span className="font-script-luxury text-2xl sm:text-3xl md:text-4xl text-[#A37E36] tracking-wide block drop-shadow-sm">
          {INVITATION_CONFIG.openingSubheading}
        </span>
        <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C59A45]/50 to-transparent mx-auto mt-2" />
      </motion.div>

      {/* ================= CENTER SECTION: CLOSED ENVELOPE WITH WAX SEAL ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative z-20 my-auto py-6 sm:py-8 flex items-center justify-center w-full"
      >
        <Envelope isOpening={isOpening} onOpen={onOpen} />
      </motion.div>

      {/* ================= BOTTOM SECTION: HEADING & CHAMPAGNE-GOLD BUTTON ================= */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
        className="relative z-20 text-center max-w-xl mx-auto pb-4 sm:pb-6 flex flex-col items-center gap-4 sm:gap-5"
      >
        {/* Heading below the envelope */}
        <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#2B231C] font-normal tracking-wide">
          {INVITATION_CONFIG.openingHeading}
        </h1>

        {/* Champagne-Gold Button: "Open Invitation" */}
        <div className="relative group">
          {/* Gentle Button Glow Aura */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#F5E2B3] to-[#C59A45] opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500 animate-pulse" />

          <button
            type="button"
            id="open-invitation-btn"
            onClick={onOpen}
            disabled={isOpening}
            className="gold-shimmer-btn relative inline-flex items-center justify-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C59A45] to-[#B38728] text-[#1A140E] font-medium text-xs sm:text-sm tracking-[0.22em] uppercase font-cinzel-luxury shadow-[0_10px_25px_rgba(184,134,40,0.35)] hover:shadow-[0_14px_35px_rgba(184,134,40,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer focus:outline-none"
            aria-label="Open Invitation"
          >
            <Sparkles className="w-4 h-4 text-[#FFF9E6]" />
            <span className="font-semibold text-[#1F1710] tracking-[0.2em]">
              {isOpening ? "Opening..." : INVITATION_CONFIG.openButtonText}
            </span>
            <MailOpen className="w-4 h-4 text-[#1F1710] opacity-80" />
          </button>
        </div>

        {/* Subtle helper note */}
        <p className="text-[11px] sm:text-xs text-[#8C7A6B] font-light tracking-widest uppercase font-cinzel-luxury">
          Tap button or wax seal to unveil
        </p>
      </motion.div>
    </motion.section>
  );
}
