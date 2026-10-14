"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Heart,
  Send,
  RotateCcw,
} from "lucide-react";
import { INVITATION_CONFIG } from "@/lib/invitation";

type AttendanceChoice = "accept" | "decline" | "";

export default function RSVPForm() {
  const { rsvp } = INVITATION_CONFIG;

  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState<AttendanceChoice>("");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    name: string;
    attending: AttendanceChoice;
    isUpdate: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validations
    const trimmedName = guestName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!attending) {
      setErrorMessage("Please select whether you can attend.");
      return;
    }

    if (attending === "accept" && (guestCount < 1 || guestCount > rsvp.maxGuests)) {
      setErrorMessage(`Please select between 1 and ${rsvp.maxGuests} guests.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestName: trimmedName,
          attending,
          guestCount: attending === "accept" ? guestCount : 0,
          message: message.trim() || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Could not record RSVP. Please try again.");
      }

      // ONLY show success when the record is physically confirmed by the backend
      setSuccessData({
        name: trimmedName,
        attending,
        isUpdate: Boolean(data.isUpdate),
      });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(
        error.message ||
          "Unable to connect to the RSVP service. Please verify your connection or try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setGuestName("");
    setAttending("");
    setGuestCount(1);
    setMessage("");
    setErrorMessage(null);
    setSuccessData(null);
  };

  return (
    <section
      aria-label="RSVP Invitation Section"
      className="w-full my-8 sm:my-10 flex flex-col items-center"
    >
      {/* Container Card */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] border border-[#DFC38A]/60 rounded-3xl p-5 sm:p-8 shadow-[0_8px_30px_rgba(197,154,69,0.1)] text-left">
        
        {/* Subtle inner gold frame */}
        <div className="absolute inset-2 border border-[#C59A45]/20 rounded-[20px] pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center mb-6">
          <div className="inline-flex items-center justify-center gap-1.5 mb-1.5">
            <Heart className="w-3.5 h-3.5 text-[#C59A45] fill-[#C59A45]/20" />
            <span className="font-cinzel-luxury text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#8C6D2D] font-semibold">
              R. S. V. P.
            </span>
            <Heart className="w-3.5 h-3.5 text-[#C59A45] fill-[#C59A45]/20" />
          </div>

          <h3 className="font-cinzel-luxury text-lg sm:text-xl md:text-2xl text-[#281F17] font-semibold tracking-wide">
            {rsvp.heading}
          </h3>

          <p className="font-serif-luxury text-xs sm:text-sm text-[#5A4838] max-w-sm mx-auto mt-2 leading-relaxed">
            “{rsvp.subheading}”
          </p>

          {/* Editable RSVP Deadline Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DC]/80 border border-[#C59A45]/30 text-[#8C6D2D] font-cinzel-luxury text-[10px] sm:text-[11px] tracking-wider uppercase mt-3 shadow-xs">
            <Calendar className="w-3 h-3 text-[#C59A45]" />
            <span>Kindly Respond by {rsvp.deadline}</span>
          </div>
        </div>

        {/* ================= CONDITIONAL CONTENT: FORM OR SUCCESS ================= */}
        <AnimatePresence mode="wait">
          {successData ? (
            /* Graceful Success State */
            <motion.div
              key="rsvp-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#C59A45]/40 shadow-sm text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF0DC] border border-[#C59A45]/40 flex items-center justify-center text-[#B38728] mb-3 shadow-xs">
                <CheckCircle2 className="w-6 h-6 text-[#A37E36]" />
              </div>

              <h4 className="font-cinzel-luxury text-base sm:text-lg text-[#281F17] font-semibold tracking-wide">
                {successData.isUpdate ? "RSVP Updated With Grace" : "Thank You, " + successData.name}
              </h4>

              <p className="font-serif-luxury text-sm text-[#5A4838] mt-2 max-w-sm leading-relaxed">
                {successData.attending === "accept"
                  ? "We are delighted and truly honored that you will celebrate this milestone with us."
                  : "Thank you for letting us know. You will be dearly missed on our special day."}
              </p>

              <div className="mt-4 pt-3 border-t border-[#DFC38A]/30 w-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-cinzel-luxury tracking-widest uppercase text-[#8C6D2D] hover:text-[#5E481A] transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-[#FAF0DC]/50"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Update or Submit Another</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* RSVP Form */
            <motion.form
              key="rsvp-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex flex-col space-y-4"
              noValidate
            >
              {/* Error Message Alert */}
              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFF5F5] border border-[#E8B4B4] text-[#8C2E2E] text-xs leading-relaxed"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#B83B3B] mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Field 1: Guest Name */}
              <div>
                <label
                  htmlFor="guest-name"
                  className="block font-cinzel-luxury text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#7A5A18] font-medium mb-1.5"
                >
                  Your Full Name <span className="text-[#A84242]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A37E36]">
                    <User className="w-4 h-4 text-[#C59A45]" />
                  </div>
                  <input
                    id="guest-name"
                    name="guestName"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g., Mr. & Mrs. Tariq Khan"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFC38A]/70 text-[#281F17] placeholder:text-[#9E8B7C] text-sm focus:outline-none focus:border-[#C59A45] focus:ring-2 focus:ring-[#C59A45]/20 transition-all shadow-xs"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Field 2: Attendance Options */}
              <div>
                <span className="block font-cinzel-luxury text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#7A5A18] font-medium mb-1.5">
                  Attendance <span className="text-[#A84242]">*</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Joyfully Accept */}
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      attending === "accept"
                        ? "bg-[#FAF2DE] border-[#C59A45] shadow-[0_2px_8px_rgba(197,154,69,0.18)]"
                        : "bg-[#FAF7F2] border-[#DFC38A]/60 hover:border-[#C59A45]/80 hover:bg-[#FAF4E6]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="accept"
                      checked={attending === "accept"}
                      onChange={() => setAttending("accept")}
                      className="accent-[#C59A45] w-4 h-4 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <div className="flex flex-col">
                      <span className="font-cinzel-luxury text-xs text-[#281F17] font-semibold tracking-wider">
                        {rsvp.acceptLabel}
                      </span>
                      <span className="text-[11px] text-[#6F5B4B] font-cormorant-luxury italic">
                        Will gladly attend
                      </span>
                    </div>
                  </label>

                  {/* Regretfully Decline */}
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      attending === "decline"
                        ? "bg-[#FAF2DE] border-[#C59A45] shadow-[0_2px_8px_rgba(197,154,69,0.18)]"
                        : "bg-[#FAF7F2] border-[#DFC38A]/60 hover:border-[#C59A45]/80 hover:bg-[#FAF4E6]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="decline"
                      checked={attending === "decline"}
                      onChange={() => setAttending("decline")}
                      className="accent-[#C59A45] w-4 h-4 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <div className="flex flex-col">
                      <span className="font-cinzel-luxury text-xs text-[#281F17] font-semibold tracking-wider">
                        {rsvp.declineLabel}
                      </span>
                      <span className="text-[11px] text-[#6F5B4B] font-cormorant-luxury italic">
                        Sending warm wishes
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Field 3: Number of Guests (Only active when accepting) */}
              {attending === "accept" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="guest-count"
                    className="block font-cinzel-luxury text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#7A5A18] font-medium mb-1.5"
                  >
                    Number of Guests (Max {rsvp.maxGuests})
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A37E36]">
                      <Users className="w-4 h-4 text-[#C59A45]" />
                    </div>
                    <select
                      id="guest-count"
                      name="guestCount"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFC38A]/70 text-[#281F17] text-sm focus:outline-none focus:border-[#C59A45] focus:ring-2 focus:ring-[#C59A45]/20 transition-all shadow-xs appearance-none cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Field 4: Optional Message Field */}
              <div>
                <label
                  htmlFor="guest-message"
                  className="block font-cinzel-luxury text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#7A5A18] font-medium mb-1.5"
                >
                  Message or Wishes (Optional)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-[#A37E36]">
                    <MessageSquare className="w-4 h-4 text-[#C59A45]" />
                  </div>
                  <textarea
                    id="guest-message"
                    name="message"
                    rows={3}
                    maxLength={500}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your prayers, heartfelt congratulations, or dietary notes..."
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFC38A]/70 text-[#281F17] placeholder:text-[#9E8B7C] text-sm focus:outline-none focus:border-[#C59A45] focus:ring-2 focus:ring-[#C59A45]/20 transition-all shadow-xs resize-none"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Submit Button: Gold "Confirm RSVP" button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-shimmer-btn w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C59A45] to-[#B88628] text-white font-cinzel-luxury font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_6px_20px_rgba(197,154,69,0.28)] hover:shadow-[0_8px_24px_rgba(197,154,69,0.4)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white/90" />
                      <span>{rsvp.buttonText}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Subtle privacy assurance */}
              <p className="text-center font-cormorant-luxury text-xs text-[#7F6E60] italic pt-1">
                Your response is stored securely and kept strictly private.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
