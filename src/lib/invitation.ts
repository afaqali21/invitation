/**
 * =========================================================================
 * LUXURY DIGITAL ENGAGEMENT INVITATION CONFIGURATION
 * =========================================================================
 * Edit the couple's names, event date, time, venue, address, schedule,
 * and RSVP settings in this single configuration object.
 */

export interface ScheduleEvent {
  time: string;
  title: string;
  description?: string;
  icon?: "Clock" | "Smile" | "Heart" | "Camera" | "Utensils" | "Sparkles";
}

export interface EngagementInvitationConfig {
  // Couple Information
  groomName: string;
  brideName: string;
  secondCouple?: {
    groomName: string;
    brideName: string;
  };

  // Screen 1: Opening Invitation
  openingSubheading: string;
  openingHeading: string;
  openButtonText: string;

  // Screen 2: Engagement Ceremony Details
  familyText: string;
  invitationText: string;
  romanticQuote: string;

  // Event Schedule & Venue
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;

  // Event Timezone & Exact Target for Countdown (PKT / UTC+5 for Pakistan)
  timezone: string;
  targetDateISO: string;

  // 1. Countdown Section Configuration
  countdown: {
    heading: string;
    celebrationStartedMessage: string;
    celebrationConcludedMessage: string;
  };

  // 2. Schedule Section Configuration (All entries editable here)
  schedule: ScheduleEvent[];

  // 3. RSVP Section Configuration
  rsvp: {
    heading: string;
    subheading: string;
    deadline: string;
    maxGuests: number;
    acceptLabel: string;
    declineLabel: string;
    buttonText: string;
  };

  // Background Ambient Music
  music: {
    audioSrc: string;
    title: string;
    autoplayOnOpen: boolean;
    startTime?: number;
    endTime?: number;
  };

  // Closing Note
  closingText: string;

  // SEO & Social Preview
  metaTitle: string;
  metaDescription: string;
}

export const INVITATION_CONFIG: EngagementInvitationConfig = {
  // --- COUPLE NAMES ---
  groomName: "Afaq",
  brideName: "Aman",
  secondCouple: {
    groomName: "Saud",
    brideName: "Wajeeha",
  },

  // --- SCREEN 1: OPENING INVITATION TEXT ---
  openingSubheading: "Two Hearts, One Beautiful Journey",
  openingHeading: "You're Invited to Our Engagement",
  openButtonText: "Open Invitation",

  // --- SCREEN 2: INVITATION HEADER & QUOTE ---
  familyText: "TOGETHER WITH THEIR FAMILIES",
  invitationText: "You are warmly invited to the Engagement Ceremony of",
  romanticQuote: "Two hearts. One promise. A lifetime together.",

  // --- EVENT DETAILS ---
  date: "7-nov-2026",
  time: "8:00 PM",
  venueName: "Shah House",
  venueAddress: "Shah House By pass road Rahim yar khan",

  // Configurable Google Maps link or query (opens when visitor clicks "View Location")
  googleMapsUrl: "https://maps.google.com/?q=[Venue+Name]+[Full+Venue+Address]",

  // Event Timezone & ISO string for calculation (Asia/Karachi UTC+5)
  timezone: "Asia/Karachi",
  targetDateISO: "2026-11-07T20:00:00+05:00",

  // --- 1. COUNTDOWN SECTION CONFIG ---
  countdown: {
    heading: "Counting Down to Our Special Day",
    celebrationStartedMessage: "The Celebration Is Here!",
    celebrationConcludedMessage: "Thank You for Celebrating With Us!",
  },

  // --- 2. THE CELEBRATION SCHEDULE ---
  // Editable placeholder events as requested:
  schedule: [
    {
      time: "07:00 PM",
      title: "Guest Arrival",
      description: "Warm welcome, floral greetings, and welcome refreshments",
      icon: "Clock",
    },
    {
      time: "07:30 PM",
      title: "Welcome & Greetings",
      description: "Families unite to share warmth and affectionate blessings",
      icon: "Smile",
    },
    {
      time: "08:00 PM",
      title: "Ring Ceremony",
      description: "The sacred exchange of rings marking our lifelong promise",
      icon: "Heart",
    },
    {
      time: "08:30 PM",
      title: "Family Photography",
      description: "Preserving heartfelt moments and portraits with loved ones",
      icon: "Camera",
    },
    {
      time: "09:00 PM",
      title: "Dinner & Celebration",
      description: "A sumptuous banquet with music and joyous festivities",
      icon: "Utensils",
    },
  ],

  // --- 3. RSVP SECTION CONFIG ---
  rsvp: {
    heading: "Will You Join Us?",
    subheading:
      "Your presence would make our special day even more memorable. Kindly let us know if you can join us.",
    deadline: "[RSVP Deadline]",
    maxGuests: 5,
    acceptLabel: "Joyfully Accept",
    declineLabel: "Regretfully Decline",
    buttonText: "Confirm RSVP",
  },

  // --- BACKGROUND MUSIC ---
  music: {
    audioSrc: "/music/river-flows-in-you.mp3",
    title: "River Flows in You - Piano (Yiruma)",
    autoplayOnOpen: true,
  },

  // --- CLOSING MESSAGE ---
  closingText: "We Look Forward to Celebrating With You",

  // --- META DETAILS ---
  metaTitle: "Engagement Invitation | Afaq & Aman & Saud & Wajeeha",
  metaDescription:
    "You are warmly invited to celebrate our Engagement Ceremony. Join us for an evening of love, promise, and celebration.",
};

// ============================================================================
// BACKWARD COMPATIBILITY ADAPTER (for components consuming INVITATION_DATA)
// ============================================================================

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  aspect?: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export const INVITATION_DATA = {
  groom: {
    name: INVITATION_CONFIG.groomName,
    fullName: INVITATION_CONFIG.groomName,
  },
  bride: {
    name: INVITATION_CONFIG.brideName,
    fullName: INVITATION_CONFIG.brideName,
  },
  secondCouple: INVITATION_CONFIG.secondCouple,
  eventTitle: "Engagement Ceremony",
  familyInvitationText: INVITATION_CONFIG.familyText,
  invitationStatement: INVITATION_CONFIG.invitationText,
  date: INVITATION_CONFIG.date,
  dayOfWeek: "Saturday",
  time: INVITATION_CONFIG.time,
  timezone: INVITATION_CONFIG.timezone,
  targetDateISO: INVITATION_CONFIG.targetDateISO,
  venue: {
    name: INVITATION_CONFIG.venueName,
    address: INVITATION_CONFIG.venueAddress,
    city: "Rahim Yar Khan",
    googleMapsUrl: INVITATION_CONFIG.googleMapsUrl,
  },
  coupleMessage: {
    headline: INVITATION_CONFIG.romanticQuote,
    quote: INVITATION_CONFIG.romanticQuote,
  },
  schedule: INVITATION_CONFIG.schedule,
  timeline: INVITATION_CONFIG.schedule,
  rsvp: INVITATION_CONFIG.rsvp,
  music: INVITATION_CONFIG.music,
  closingText: INVITATION_CONFIG.closingText,
  meta: {
    title: INVITATION_CONFIG.metaTitle,
    description: INVITATION_CONFIG.metaDescription,
  },
};
