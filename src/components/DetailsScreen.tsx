"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, MapPin, Building, ExternalLink, RotateCcw } from "lucide-react";
import Countdown from "./Countdown";
import ScheduleTimeline from "./ScheduleTimeline";
import RSVPForm from "./RSVPForm";
import { FloralCorner, GoldDivider, FloatingPetals } from "./FloralDecorations";
import { INVITATION_CONFIG } from "@/lib/invitation";

interface DetailsScreenProps {
  onBackToEnvelope?: () => void;
}

export default function DetailsScreen({ onBackToEnvelope }: DetailsScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      key="screen-2-details"
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{
        duration: shouldReduceMotion ? 0.4 : 0.9,
        ease: "easeOut",
      }}
      className="relative min-h-screen w-full flex items-center justify-center py-8 sm:py-14 md:py-20 px-3 sm:px-6 bg-[#FAF7F2] text-[#2C241E] overflow-x-hidden selection:bg-[#DFBA73]/30"
    >
      {/* ================= BACKGROUND TEXTURE & AMBIENCE ================= */}
      <div
        className="absolute inset-0 opacity-20 bg-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/images/damask_texture.jpg')",
          backgroundSize: "280px 280px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0%,rgba(250,247,242,0.92)_70%,#F3ECE0_100%)] pointer-events-none" />

      {/* Floating subtle petals */}
      <FloatingPetals />

      {/* Replay / View Envelope Floating Quick Button (Top Corner) */}
      {onBackToEnvelope && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          type="button"
          onClick={onBackToEnvelope}
          className="fixed top-4 right-4 z-40 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/90 backdrop-blur-md border border-[#C59A45]/30 text-[#8C6D2D] hover:text-[#5E481A] hover:bg-[#FFFDF9] text-[11px] font-cinzel-luxury tracking-widest uppercase shadow-sm transition-all duration-200 cursor-pointer"
          title="View Envelope Again"
          aria-label="View Envelope Again"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Envelope</span>
        </motion.button>
      )}

      {/* ================= THE LUXURY INVITATION CARD ================= */}
      <div className="relative w-full max-w-[680px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] rounded-3xl sm:rounded-[32px] border border-[#DFC38A]/60 shadow-[0_25px_80px_rgba(150,120,60,0.18),0_4px_20px_rgba(0,0,0,0.05)] p-6 sm:p-12 md:p-16 overflow-hidden my-auto z-10">
        
        {/* Fine Double Gold Inset Borders */}
        <div className="absolute inset-2.5 sm:inset-4 border border-[#C59A45]/35 rounded-[22px] sm:rounded-[26px] pointer-events-none" />
        <div className="absolute inset-4 sm:inset-6 border border-[#C59A45]/15 rounded-[18px] sm:rounded-[22px] pointer-events-none" />

        {/* ================= CORNER FLORAL DECORATIONS (TOP-LEFT & BOTTOM-RIGHT) ================= */}
        {/* As required: "Add subtle floral decorations in the top-left and bottom-right corners." */}
        <FloralCorner
          position="top-left"
          size="md"
          className="scale-90 sm:scale-100 -top-2 -left-2 sm:top-0 sm:left-0 opacity-90"
        />
        <FloralCorner
          position="bottom-right"
          size="md"
          className="scale-90 sm:scale-100 -bottom-2 -right-2 sm:bottom-0 sm:right-0 opacity-90"
        />

        {/* ================= CARD INNER CONTENT ================= */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-lg mx-auto py-2 sm:py-4">
          
          {/* Header 1: "TOGETHER WITH THEIR FAMILIES" */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="font-cinzel-luxury text-[11px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-[#A37E36] font-semibold block">
              {INVITATION_CONFIG.familyText}
            </span>
          </motion.div>

          {/* Delicate Gold Motif Divider */}
          <GoldDivider className="my-3 sm:my-4 opacity-75" />

          {/* Header 2: "You are warmly invited to the Engagement Ceremony of" */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#5A4838] font-normal leading-relaxed max-w-md mx-auto"
          >
            {INVITATION_CONFIG.invitationText}
          </motion.p>

          {/* Couple's Names: [His Name] & [Her Name] */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="my-5 sm:my-7 flex flex-col items-center justify-center w-full"
          >
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#281F17] leading-tight tracking-wide drop-shadow-sm px-2 text-center">
              <span className="text-gold-gradient inline-block capitalize font-serif-luxury font-medium tracking-normal">
                {INVITATION_CONFIG.groomName}
              </span>
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#C59A45] mx-2 sm:mx-4 font-light italic inline-block align-middle">
                &
              </span>
              <span className="text-gold-gradient inline-block capitalize font-serif-luxury font-medium tracking-normal">
                {INVITATION_CONFIG.brideName}
              </span>
            </h2>

            {INVITATION_CONFIG.secondCouple && (
              <>
                {/* Elegant Royal Gold Center Divider */}
                <div className="flex items-center justify-center gap-3 my-2 sm:my-3 w-full max-w-xs">
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59A45]/40 to-[#C59A45]/70" />
                  <span className="font-serif-luxury italic text-xl sm:text-2xl text-[#C59A45] font-light">
                    &amp;
                  </span>
                  <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C59A45]/40 to-[#C59A45]/70" />
                </div>

                {/* Second Couple: Saud & Wajeeha */}
                <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#281F17] leading-tight tracking-wide drop-shadow-sm px-2 text-center">
                  <span className="text-gold-gradient inline-block capitalize font-serif-luxury font-medium tracking-normal">
                    {INVITATION_CONFIG.secondCouple.groomName}
                  </span>
                  <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#C59A45] mx-2 sm:mx-4 font-light italic inline-block align-middle">
                    &
                  </span>
                  <span className="text-gold-gradient inline-block capitalize font-serif-luxury font-medium tracking-normal">
                    {INVITATION_CONFIG.secondCouple.brideName}
                  </span>
                </h2>
              </>
            )}
          </motion.div>

          {/* Romantic Quote: "Two hearts. One promise. A lifetime together." */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-cormorant-luxury italic text-base sm:text-lg md:text-xl text-[#756251] max-w-md mx-auto px-4"
          >
            “{INVITATION_CONFIG.romanticQuote}”
          </motion.p>

          {/* Gold Divider */}
          <GoldDivider className="my-4 sm:my-5 opacity-75" />

          {/* ================= CLEAN VERTICALLY ALIGNED EVENT DETAILS ================= */}
          {/* Date, Time, Venue, Address with gold Lucide icons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-md my-4 sm:my-5 flex flex-col gap-3 sm:gap-3.5 text-left"
          >
            {/* Detail 1: Date */}
            <div className="flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FAF5EB]/70 border border-[#DFC38A]/35 shadow-[0_2px_8px_rgba(197,154,69,0.06)] hover:bg-[#FAF4E6] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF0DC] border border-[#C59A45]/40 flex items-center justify-center shrink-0 shadow-sm text-[#A37E36]">
                <Calendar className="w-5 h-5 text-[#C59A45]" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-cinzel-luxury text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6D2D] font-medium">
                  Date
                </span>
                <span className="font-serif-luxury text-base sm:text-lg text-[#261E17] font-normal mt-0.5">
                  {INVITATION_CONFIG.date}
                </span>
              </div>
            </div>

            {/* Detail 2: Time */}
            <div className="flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FAF5EB]/70 border border-[#DFC38A]/35 shadow-[0_2px_8px_rgba(197,154,69,0.06)] hover:bg-[#FAF4E6] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF0DC] border border-[#C59A45]/40 flex items-center justify-center shrink-0 shadow-sm text-[#A37E36]">
                <Clock className="w-5 h-5 text-[#C59A45]" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-cinzel-luxury text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6D2D] font-medium">
                  Time
                </span>
                <span className="font-serif-luxury text-base sm:text-lg text-[#261E17] font-normal mt-0.5">
                  {INVITATION_CONFIG.time}
                </span>
              </div>
            </div>

            {/* Detail 3: Venue */}
            <div className="flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#FAF5EB]/70 border border-[#DFC38A]/35 shadow-[0_2px_8px_rgba(197,154,69,0.06)] hover:bg-[#FAF4E6] transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#FAF0DC] border border-[#C59A45]/40 flex items-center justify-center shrink-0 shadow-sm text-[#A37E36]">
                <Building className="w-5 h-5 text-[#C59A45]" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-cinzel-luxury text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8C6D2D] font-medium">
                  Venue
                </span>
                <span className="font-serif-luxury text-base sm:text-lg text-[#261E17] font-normal mt-0.5">
                  {INVITATION_CONFIG.venueName}
                </span>
              </div>
            </div>

           
          </motion.div>

          {/* ================= BORDERED GOLD BUTTON: "View Location" ================= */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-4 sm:mt-5 w-full flex justify-center"
          >
            <a
              id="view-location-btn"
              href="https://maps.app.goo.gl/RPSqnPrcXe5f2GG46"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-shimmer-btn group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#FAF4E8] border-2 border-[#C59A45] hover:border-[#B38728] text-[#7A5A18] hover:text-[#523A0B] hover:bg-[#F6ECD5] font-cinzel-luxury font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_6px_20px_rgba(197,154,69,0.18)] hover:shadow-[0_10px_28px_rgba(197,154,69,0.32)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              aria-label="View Location in Google Maps"
            >
              <MapPin className="w-4 h-4 text-[#C59A45] group-hover:scale-110 transition-transform" />
              <span>View Location</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </motion.div>

          {/* Gold Divider */}
          <GoldDivider className="my-6 sm:my-8 opacity-75" />

          {/* ================= 1. ELEGANT LIVE COUNTDOWN ================= */}
          <Countdown />

          {/* Gold Divider */}
          <GoldDivider className="my-6 sm:my-8 opacity-75" />

          {/* ================= 2. THE CELEBRATION SCHEDULE ================= */}
          <ScheduleTimeline />

          {/* Gold Divider */}
          <GoldDivider className="my-6 sm:my-8 opacity-75" />

          {/* ================= 3. ELEGANT RSVP SECTION ================= */}
          <RSVPForm />

          {/* Gold Divider */}
          <GoldDivider className="my-6 sm:my-8 opacity-75" />

          {/* ================= BOTTOM MESSAGE ================= */}
          {/* “We Look Forward to Celebrating With You” */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="pb-2"
          >
            <p className="font-script-luxury text-2xl sm:text-3xl md:text-4xl text-[#A37E36] tracking-wide">
              {INVITATION_CONFIG.closingText}
            </p>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
