"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { INVITATION_CONFIG } from "@/lib/invitation";

interface MusicPlayerProps {
  audioSrc?: string;
  triggerPlay?: boolean;
  startTime?: number;
  endTime?: number;
}

export default function MusicPlayer({
  audioSrc = INVITATION_CONFIG.music.audioSrc,
  triggerPlay = false,
  startTime = INVITATION_CONFIG.music.startTime ?? 0,
  endTime = INVITATION_CONFIG.music.endTime,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Set initial volume & setup audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const playAudio = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      if (
        startTime > 0 &&
        (audioRef.current.currentTime < startTime ||
          (endTime !== undefined && audioRef.current.currentTime >= endTime))
      ) {
        audioRef.current.currentTime = startTime;
      }
      await audioRef.current.play();
      setIsPlaying(true);
      setIsAvailable(true);
    } catch (err) {
      console.log("Audio autoplay prevented or file loading:", err);
      setIsPlaying(false);
    }
  }, [startTime, endTime]);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // When triggerPlay changes to true (e.g. envelope opened), attempt to start playback
  useEffect(() => {
    if (triggerPlay && !isPlaying) {
      playAudio();
    }
  }, [triggerPlay, playAudio, isPlaying]);

  const toggleMusic = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && startTime > 0 && audioRef.current.currentTime < startTime) {
      audioRef.current.currentTime = startTime;
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    if (endTime !== undefined && audioRef.current.currentTime >= endTime) {
      audioRef.current.currentTime = startTime;
    }
  };

  return (
    <>
      {/* Hidden background audio element */}
      <audio
        key={audioSrc}
        ref={audioRef}
        preload="auto"
        loop
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onError={() => {
          setIsAvailable(false);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={audioSrc} type="audio/mpeg" />
      </audio>

      {/* Floating Champagne-Gold Music Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          type="button"
          onClick={toggleMusic}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/90 backdrop-blur-md border border-[#C59A45]/35 hover:border-[#C59A45] text-[#8C6D2D] hover:text-[#5E481A] text-[11px] font-cinzel-luxury tracking-widest uppercase shadow-[0_2px_12px_rgba(197,154,69,0.12)] hover:shadow-[0_4px_16px_rgba(197,154,69,0.22)] transition-all duration-300 cursor-pointer"
          title={isPlaying ? "Mute Background Music" : "Play Romantic Music"}
          aria-label={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? (
            <>
              {/* Subtle animated sound wave bars */}
              <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-[1px]">
                <span className="w-[2px] bg-[#C59A45] rounded-full animate-[musicBar_0.8s_ease-in-out_infinite] h-3" />
                <span className="w-[2px] bg-[#C59A45] rounded-full animate-[musicBar_0.8s_ease-in-out_0.2s_infinite] h-2" />
                <span className="w-[2px] bg-[#C59A45] rounded-full animate-[musicBar_0.8s_ease-in-out_0.4s_infinite] h-3.5" />
              </div>
              <Volume2 className="w-3.5 h-3.5 text-[#C59A45]" />
              <span className="hidden sm:inline">Music</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#A37E36]/70 group-hover:text-[#A37E36]" />
              <span className="hidden sm:inline">Music</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
