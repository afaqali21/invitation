"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HeartHandshake, Clock } from "lucide-react";
import { INVITATION_CONFIG } from "@/lib/invitation";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
  isRecent: boolean; // within 24 hours of start
}

/**
 * Calculates remaining time targeting the exact event date, time, and timezone.
 * Defaults to Asia/Karachi (UTC+5) for Pakistan engagement.
 */
function getEventTargetEpoch(): number {
  if (INVITATION_CONFIG.targetDateISO) {
    const parsed = new Date(INVITATION_CONFIG.targetDateISO).getTime();
    if (!isNaN(parsed)) return parsed;
  }
  // Fallback: 7-nov-2026 8:00 PM PKT
  return new Date("2026-11-07T20:00:00+05:00").getTime();
}

function calculateTimeLeft(): TimeLeft {
  const target = getEventTargetEpoch();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    const hoursPast = Math.abs(diff) / (1000 * 60 * 60);
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassed: true,
      isRecent: hoursPast < 24, // Started today/within 24 hours
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPassed: false,
    isRecent: false,
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label="Event Countdown"
      className="w-full my-6 sm:my-8 flex flex-col items-center"
    >
      {/* Refined Section Heading */}
      <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
        <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C59A45]/50 to-[#C59A45]" />
        <div className="flex items-center gap-1.5 text-[#8C6D2D]">
          <Clock className="w-3.5 h-3.5 text-[#C59A45]" />
          <h3 className="font-cinzel-luxury text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase text-[#7A5A18] font-medium text-center">
            {INVITATION_CONFIG.countdown.heading}
          </h3>
        </div>
        <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent via-[#C59A45]/50 to-[#C59A45]" />
      </div>

      <AnimatePresence mode="wait">
        {!mounted ? (
          // Elegant placeholder while mounting
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md px-1">
            {["Days", "Hours", "Minutes", "Seconds"].map((u) => (
              <div
                key={u}
                className="bg-[#FFFDF9] border border-[#DFC38A]/40 rounded-2xl p-3 sm:p-4 text-center shadow-sm"
              >
                <div className="font-serif-luxury text-2xl sm:text-3xl text-[#2B231C] font-semibold">
                  00
                </div>
                <div className="font-cinzel-luxury text-[9px] sm:text-[10px] text-[#8C6D2D] uppercase tracking-[0.2em] mt-1">
                  {u}
                </div>
              </div>
            ))}
          </div>
        ) : timeLeft.isPassed ? (
          // Target time reached or passed
          <motion.div
            key="celebration-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] border border-[#DFC38A]/70 shadow-[0_6px_24px_rgba(197,154,69,0.12)] text-center"
          >
            {timeLeft.isRecent ? (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#FAF0DC] border border-[#C59A45]/50 flex items-center justify-center text-[#B38728] mb-2.5 shadow-sm">
                  <Sparkles className="w-5 h-5 text-[#C59A45] animate-pulse" />
                </div>
                <h4 className="font-cinzel-luxury text-base sm:text-lg text-[#6A4D14] tracking-widest uppercase font-semibold">
                  {INVITATION_CONFIG.countdown.celebrationStartedMessage}
                </h4>
                <p className="font-cormorant-luxury italic text-sm sm:text-base text-[#6F5B4B] mt-1">
                  The joyous ceremony is unfolding now.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#FAF0DC] border border-[#C59A45]/50 flex items-center justify-center text-[#B38728] mb-2.5 shadow-sm">
                  <HeartHandshake className="w-5 h-5 text-[#C59A45]" />
                </div>
                <h4 className="font-cinzel-luxury text-base sm:text-lg text-[#6A4D14] tracking-widest uppercase font-semibold">
                  {INVITATION_CONFIG.countdown.celebrationConcludedMessage}
                </h4>
                <p className="font-cormorant-luxury italic text-sm sm:text-base text-[#6F5B4B] mt-1">
                  Our hearts are overflowing with gratitude for your love and presence.
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          // Live Active Countdown Cards (Ivory cards, thin gold borders, subtle shadows)
          <motion.div
            key="active-countdown"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="grid grid-cols-4 gap-2 sm:gap-3.5 px-0.5">
              {timeUnits.map((unit) => {
                const formatted = String(unit.value).padStart(2, "0");
                return (
                  <div
                    key={unit.label}
                    className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] border border-[#DFC38A]/60 rounded-2xl py-3 sm:py-4 px-1.5 sm:px-2 flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(197,154,69,0.08)] hover:shadow-[0_6px_20px_rgba(197,154,69,0.16)] hover:border-[#C59A45] transition-all duration-300 group"
                  >
                    {/* Subtle delicate top highlight */}
                    <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59A45]/40 to-transparent" />
                    
                    <span className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#2B231C] font-semibold tabular-nums leading-none tracking-tight drop-shadow-sm group-hover:scale-105 transition-transform duration-200">
                      {formatted}
                    </span>
                    <span className="font-cinzel-luxury text-[9px] sm:text-[10px] md:text-[11px] text-[#8C6D2D] uppercase tracking-[0.2em] font-medium mt-1.5 sm:mt-2">
                      {unit.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Timezone Indicator */}
            <p className="text-center font-cinzel-luxury text-[9px] sm:text-[10px] text-[#9E834D] tracking-widest uppercase mt-3 opacity-80">
              PKT Timezone (UTC+5) • Rahim Yar Khan
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
