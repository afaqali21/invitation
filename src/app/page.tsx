"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import OpeningScreen from "@/components/OpeningScreen";
import DetailsScreen from "@/components/DetailsScreen";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [screen, setScreen] = useState<"opening" | "details">("opening");
  const [isOpening, setIsOpening] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);


  const triggerSparkles = () => {
    // Elegant champagne-gold, pearl, and soft sage micro-sparkles
    const count = 45;
    confetti({
      origin: { y: 0.52 },
      colors: ["#DFBA73", "#C59A45", "#F5E2B3", "#FFFFFF", "#FAF6EE", "#9EB299"],
      spread: 70,
      startVelocity: 32,
      particleCount: count,
      decay: 0.92,
      scalar: 0.9,
      ticks: 120,
    });
  };

  const handleOpenInvitation = () => {
    if (isOpening || screen === "details") return;
    setIsOpening(true);
    setShouldPlayMusic(true);

    // Sparkles burst as flap opens and card emerges
    setTimeout(() => {
      triggerSparkles();
    }, 450);

    // Smooth transition from envelope opening to details screen (approx 1.35 seconds)
    setTimeout(() => {
      setScreen("details");
      setIsOpening(false);
    }, 1350);
  };

  const handleBackToEnvelope = () => {
    setIsOpening(false);
    setScreen("opening");
  };

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#2C241E] overflow-x-hidden selection:bg-[#DFBA73]/30">
      {/* Floating Background Music Control */}
      <MusicPlayer triggerPlay={shouldPlayMusic} />

      <AnimatePresence mode="wait">

        {screen === "opening" ? (
          <OpeningScreen
            key="screen-opening"
            isOpening={isOpening}
            onOpen={handleOpenInvitation}
          />
        ) : (
          <DetailsScreen
            key="screen-details"
            onBackToEnvelope={handleBackToEnvelope}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
