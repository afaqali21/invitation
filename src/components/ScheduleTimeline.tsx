"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Smile,
  Heart,
  Camera,
  Utensils,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { INVITATION_CONFIG, ScheduleEvent } from "@/lib/invitation";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  Smile,
  Heart,
  Camera,
  Utensils,
  Sparkles,
};

export default function ScheduleTimeline() {
  const events: ScheduleEvent[] = INVITATION_CONFIG.schedule || [];

  return (
    <section
      aria-label="Celebration Schedule"
      className="w-full my-6 sm:my-8 flex flex-col items-center"
    >
      {/* Refined Section Heading */}
      <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
        <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C59A45]/50 to-[#C59A45]" />
        <div className="flex items-center gap-1.5 text-[#8C6D2D]">
          <CalendarDays className="w-3.5 h-3.5 text-[#C59A45]" />
          <h3 className="font-cinzel-luxury text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase text-[#7A5A18] font-medium text-center">
            The Celebration Schedule
          </h3>
        </div>
        <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent via-[#C59A45]/50 to-[#C59A45]" />
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-xl mx-auto px-2 sm:px-4">
        {/* Mobile Vertical Connecting Line (left-aligned) */}
        <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#C59A45]/10 via-[#C59A45]/40 to-[#C59A45]/10 sm:hidden pointer-events-none" />

        {/* Desktop Central Spine Connecting Line (centered) */}
        <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#C59A45]/10 via-[#C59A45]/40 to-[#C59A45]/10 pointer-events-none" />

        <div className="flex flex-col space-y-4 sm:space-y-6">
          {events.map((event, index) => {
            const IconComponent =
              (event.icon && iconMap[event.icon]) || Sparkles;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={`${event.title}-${index}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex items-start sm:items-center w-full"
              >
                {/* ================= MOBILE LAYOUT (clean vertical) ================= */}
                <div className="flex sm:hidden items-start gap-3.5 w-full">
                  {/* Gold Icon Node */}
                  <div className="relative z-10 w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#C59A45] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(197,154,69,0.18)] text-[#A37E36]">
                    <IconComponent className="w-4 h-4 text-[#B38728]" />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] border border-[#DFC38A]/50 rounded-2xl p-3.5 shadow-[0_2px_10px_rgba(197,154,69,0.06)] hover:border-[#C59A45] transition-colors">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF0DC]/80 border border-[#C59A45]/30 text-[#8C6D2D] font-cinzel-luxury text-[10px] tracking-[0.18em] uppercase font-semibold">
                      <Clock className="w-2.5 h-2.5 text-[#C59A45]" />
                      <span>{event.time}</span>
                    </div>
                    <h4 className="font-serif-luxury text-base text-[#281F17] font-medium mt-1.5">
                      {event.title}
                    </h4>
                    {event.description && (
                      <p className="font-cormorant-luxury text-xs text-[#6F5B4B] italic mt-0.5 leading-snug">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= DESKTOP BALANCED LAYOUT ================= */}
                <div className="hidden sm:grid sm:grid-cols-2 sm:gap-8 w-full items-center">
                  {/* Left Column */}
                  <div className={`flex ${isEven ? "justify-end text-right" : "justify-end opacity-0 pointer-events-none"}`}>
                    {isEven && (
                      <div className="w-full max-w-[240px] bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] border border-[#DFC38A]/50 rounded-2xl p-3.5 shadow-[0_2px_10px_rgba(197,154,69,0.06)] hover:border-[#C59A45] transition-all hover:shadow-[0_4px_16px_rgba(197,154,69,0.12)]">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF0DC]/80 border border-[#C59A45]/30 text-[#8C6D2D] font-cinzel-luxury text-[10px] tracking-[0.18em] uppercase font-semibold">
                          <Clock className="w-2.5 h-2.5 text-[#C59A45]" />
                          <span>{event.time}</span>
                        </div>
                        <h4 className="font-serif-luxury text-base text-[#281F17] font-medium mt-1.5">
                          {event.title}
                        </h4>
                        {event.description && (
                          <p className="font-cormorant-luxury text-xs text-[#6F5B4B] italic mt-0.5 leading-snug">
                            {event.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Centered Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#C59A45] flex items-center justify-center shadow-[0_2px_8px_rgba(197,154,69,0.22)] text-[#A37E36] group-hover:scale-105 transition-transform">
                    <IconComponent className="w-4 h-4 text-[#B38728]" />
                  </div>

                  {/* Right Column */}
                  <div className={`flex ${!isEven ? "justify-start text-left" : "justify-start opacity-0 pointer-events-none"}`}>
                    {!isEven && (
                      <div className="w-full max-w-[240px] bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] border border-[#DFC38A]/50 rounded-2xl p-3.5 shadow-[0_2px_10px_rgba(197,154,69,0.06)] hover:border-[#C59A45] transition-all hover:shadow-[0_4px_16px_rgba(197,154,69,0.12)]">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF0DC]/80 border border-[#C59A45]/30 text-[#8C6D2D] font-cinzel-luxury text-[10px] tracking-[0.18em] uppercase font-semibold">
                          <Clock className="w-2.5 h-2.5 text-[#C59A45]" />
                          <span>{event.time}</span>
                        </div>
                        <h4 className="font-serif-luxury text-base text-[#281F17] font-medium mt-1.5">
                          {event.title}
                        </h4>
                        {event.description && (
                          <p className="font-cormorant-luxury text-xs text-[#6F5B4B] italic mt-0.5 leading-snug">
                            {event.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
