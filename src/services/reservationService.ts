export interface ReservationPayload {
  id: string;
  createdAt: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  specialRequest?: string;
  occasion?: string;
  status: 'DEMO_SUBMITTED';
}

export interface ValidationResult {
  valid: boolean;
  errorEn?: string;
  errorBn?: string;
}

const STORAGE_KEY = 'bengal_heritage_demo_reservations_v1';

/**
 * Returns today's local date in YYYY-MM-DD format so past dates cannot be selected.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Validates reservation inputs on the client before submitting.
 * Ensures no past dates, valid restaurant opening time slot, and valid contact details.
 */
export function validateReservationInput(
  input: {
    date: string;
    time: string;
    guests: number;
    name: string;
    phone: string;
    specialRequest?: string;
  },
  validTimeSlots: string[]
): ValidationResult {
  const today = getTodayDateString();

  if (!input.date) {
    return {
      valid: false,
      errorEn: 'Please select a reservation date.',
      errorBn: 'অনুগ্রহ করে বুকিংয়ের একটি তারিখ নির্বাচন করুন।',
    };
  }

  if (input.date < today) {
    return {
      valid: false,
      errorEn: 'Reservation date cannot be in the past. Please choose today or an upcoming date.',
      errorBn: 'অতীতের কোনো তারিখ নির্বাচন করা যাবে না। অনুগ্রহ করে আজ বা পরবর্তী তারিখ বেছে নিন।',
    };
  }

  if (!input.time || !validTimeSlots.includes(input.time)) {
    return {
      valid: false,
      errorEn: 'Please select a valid dining time within restaurant opening hours.',
      errorBn: 'অনুগ্রহ করে রেস্তোরাঁ খোলার সময়ের মধ্যে একটি সময় নির্বাচন করুন।',
    };
  }

  if (!input.guests || input.guests < 1 || input.guests > 20) {
    return {
      valid: false,
      errorEn: 'Please select between 1 and 20 guests.',
      errorBn: 'অনুগ্রহ করে ১ থেকে ২০ জন অতিথির মধ্যে নির্বাচন করুন।',
    };
  }

  const trimmedName = input.name.trim();
  if (trimmedName.length < 2) {
    return {
      valid: false,
      errorEn: 'Please enter your full name (minimum 2 characters).',
      errorBn: 'অনুগ্রহ করে আপনার নাম লিখুন (কমপক্ষে ২টি অক্ষর)।',
    };
  }

  const cleanedPhone = input.phone.replace(/[\s\-()]/g, '');
  if (!/^\+?[0-9]{8,15}$/.test(cleanedPhone)) {
    return {
      valid: false,
      errorEn: 'Please enter a valid 10-digit phone or mobile number.',
      errorBn: 'অনুগ্রহ করে একটি সঠিক ফোন বা মোবাইল নম্বর লিখুন।',
    };
  }

  return { valid: true };
}

/**
 * ============================================================================
 * MODULAR RESERVATION INTEGRATION SERVICE (DEMO MODE)
 * ============================================================================
 * Currently stores reservation requests in localStorage for demonstration.
 * When deploying for a real restaurant client, uncomment or connect any of the
 * integration adapters below:
 *   1. WhatsApp Direct Click-to-Chat / Business API
 *   2. Email Notification (Resend / SendGrid / Nodemailer via /api/reservations)
 *   3. Telegram Bot Webhook for Restaurant Manager
 *   4. Google Sheets AppScript Webhook
 *   5. Firebase Firestore / Custom POS Reservation System
 */
export async function submitReservationRequest(input: {
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  specialRequest?: string;
  occasion?: string;
}): Promise<ReservationPayload> {
  // Simulate brief network latency for realistic interactive feedback
  await new Promise((resolve) => setTimeout(resolve, 350));

  const payload: ReservationPayload = {
    id: `DEMO-BH-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString(),
    date: input.date,
    time: input.time,
    guests: input.guests,
    name: input.name.trim(),
    phone: input.phone.trim(),
    specialRequest: input.specialRequest?.trim() || '',
    occasion: input.occasion || '',
    status: 'DEMO_SUBMITTED',
  };

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: ReservationPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [payload, ...existing].slice(0, 15);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors in restricted private browsing modes
  }

  return payload;
}

export function getSavedDemoReservations(): ReservationPayload[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Generates a formatted WhatsApp message preview so restaurant owners can see
 * how instant WhatsApp table booking notifications work in production.
 */
export function buildWhatsAppPreviewMessage(
  reservation: ReservationPayload,
  restaurantName: string
): string {
  return [
    `*New Table Reservation Request — ${restaurantName} (DEMO)*`,
    `Reference: ${reservation.id}`,
    `Guest Name: ${reservation.name}`,
    `Phone: ${reservation.phone}`,
    `Date: ${reservation.date}`,
    `Time: ${reservation.time}`,
    `Guests: ${reservation.guests}`,
    reservation.specialRequest ? `Notes: ${reservation.specialRequest}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
