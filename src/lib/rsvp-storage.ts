import fs from "fs/promises";
import path from "path";
import { INVITATION_CONFIG } from "./invitation";

export interface RsvpRecord {
  id: string;
  guestName: string;
  attending: "accept" | "decline";
  guestCount: number;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaveRsvpInput {
  guestName: string;
  attending: "accept" | "decline";
  guestCount?: number;
  message?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const RSVPS_FILE = path.join(DATA_DIR, "rsvps.json");

/**
 * Ensures the data directory exists and returns existing RSVP records.
 */
async function loadAllRecords(): Promise<RsvpRecord[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(RSVPS_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed as RsvpRecord[];
    }
    return [];
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === "ENOENT") {
      // File does not exist yet; initialize empty array
      await fs.writeFile(RSVPS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    console.error("Failed to read RSVPs file:", err);
    throw new Error("Unable to access RSVP storage.");
  }
}

/**
 * Atomically writes records to disk.
 */
async function writeAllRecords(records: RsvpRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tempFile = path.join(DATA_DIR, `rsvps_${Date.now()}_temp.json`);
  const data = JSON.stringify(records, null, 2);

  // Write to temporary file first then rename for atomic persistence
  await fs.writeFile(tempFile, data, "utf-8");
  try {
    await fs.rename(tempFile, RSVPS_FILE);
  } catch {
    // Fallback if atomic rename is restricted on some Windows filesystems
    await fs.writeFile(RSVPS_FILE, data, "utf-8");
    await fs.unlink(tempFile).catch(() => {});
  }
}

/**
 * Validates and saves an RSVP submission into the private database store.
 * Prevents duplicate records by matching on normalized guest name and updating gracefully.
 */
export async function saveRsvp(
  input: SaveRsvpInput
): Promise<{ success: boolean; record: RsvpRecord; isUpdate: boolean }> {
  const trimmedName = (input.guestName || "").trim();
  if (!trimmedName || trimmedName.length < 2) {
    throw new Error("Please provide your full name (at least 2 characters).");
  }

  if (trimmedName.length > 100) {
    throw new Error("Name is too long (maximum 100 characters).");
  }

  if (input.attending !== "accept" && input.attending !== "decline") {
    throw new Error("Please select whether you can attend.");
  }

  const maxAllowed = INVITATION_CONFIG.rsvp.maxGuests || 5;
  let parsedGuests = 1;

  if (input.attending === "accept") {
    parsedGuests = Number(input.guestCount) || 1;
    if (parsedGuests < 1 || parsedGuests > maxAllowed) {
      throw new Error(`Guest count must be between 1 and ${maxAllowed}.`);
    }
  } else {
    parsedGuests = 0;
  }

  const cleanMessage = (input.message || "").trim();
  if (cleanMessage.length > 500) {
    throw new Error("Message must be 500 characters or fewer.");
  }

  const records = await loadAllRecords();
  const normalizedNewName = trimmedName.toLowerCase();

  const existingIndex = records.findIndex(
    (r) => r.guestName.trim().toLowerCase() === normalizedNewName
  );

  const nowIso = new Date().toISOString();
  let savedRecord: RsvpRecord;
  let isUpdate = false;

  if (existingIndex >= 0) {
    // Graceful update of duplicate submission to avoid duplicate seats
    isUpdate = true;
    savedRecord = {
      ...records[existingIndex],
      guestName: trimmedName,
      attending: input.attending,
      guestCount: parsedGuests,
      message: cleanMessage || undefined,
      updatedAt: nowIso,
    };
    records[existingIndex] = savedRecord;
  } else {
    // New submission
    savedRecord = {
      id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      guestName: trimmedName,
      attending: input.attending,
      guestCount: parsedGuests,
      message: cleanMessage || undefined,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    records.push(savedRecord);
  }

  await writeAllRecords(records);

  return {
    success: true,
    record: savedRecord,
    isUpdate,
  };
}
