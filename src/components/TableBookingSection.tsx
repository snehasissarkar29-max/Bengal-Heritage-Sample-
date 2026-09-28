import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  Info,
} from 'lucide-react';
import { Language, RestaurantConfig } from '../config/restaurantConfig';
import {
  getTodayDateString,
  validateReservationInput,
  submitReservationRequest,
  ReservationPayload,
  buildWhatsAppPreviewMessage,
} from '../services/reservationService';
import { AlpanaDivider } from './BengaliMotifs';

interface TableBookingSectionProps {
  config: RestaurantConfig;
  lang: Language;
  prefilledNote: string;
  prefilledGuests?: number;
}

export const TableBookingSection: React.FC<TableBookingSectionProps> = ({
  config,
  lang,
  prefilledNote,
  prefilledGuests,
}) => {
  const todayStr = getTodayDateString();

  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState(config.openingHours.validTimeSlots[6] || '07:30 PM (Dinner)');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationPayload | null>(
    null
  );

  useEffect(() => {
    if (prefilledNote) {
      setSpecialRequest(prefilledNote);
    }
  }, [prefilledNote]);

  useEffect(() => {
    if (prefilledGuests && prefilledGuests >= 1 && prefilledGuests <= 16) {
      setGuests(prefilledGuests);
    }
  }, [prefilledGuests]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = validateReservationInput(
      {
        date,
        time,
        guests,
        name,
        phone,
        specialRequest,
      },
      config.openingHours.validTimeSlots
    );

    if (!validation.valid) {
      setErrorMsg(lang === 'bn' ? validation.errorBn || null : validation.errorEn || null);
      return;
    }

    setIsSubmitting(true);
    try {
      const saved = await submitReservationRequest({
        date,
        time,
        guests,
        name,
        phone,
        specialRequest,
      });
      setConfirmedReservation(saved);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="book-table"
      className="py-20 md:py-28 bg-[#140D0B] text-[#FAF7F2] relative overflow-hidden border-t border-[#C59B27]/25"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-[#E6C665] font-semibold mb-2">
            {lang === 'bn'
              ? 'আসন সংরক্ষণ অনুরোধ · ডেমো সিস্টেম'
              : 'Table Reservation Concierge · Demo System'}
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#FAF7F2] mb-3">
            {lang === 'bn' ? 'টেবিল বুক করুন' : 'Book Your Table'}
          </h2>
          <p className="font-display text-xl text-[#E6C665] italic mb-3">
            {lang === 'bn' ? 'Book Your Table at Bengal Heritage' : 'টেবিল বুক করুন — আহারে কলকাতা'}
          </p>
          <p className="text-sm sm:text-base text-[#FAF7F2]/75">
            {lang === 'bn'
              ? 'আপনার পছন্দের তারিখ, সময় ও অতিথি সংখ্যা নির্বাচন করুন। এটি একটি ডেমো বুকিং সিস্টেম—সাবমিট করার পর কনফার্মেশন মডালটি দেখুন।'
              : 'Select your preferred dining date, lunch or dinner seating, and party size. This is an interactive DEMO booking system built to connect seamlessly with WhatsApp, Email, or POS.'}
          </p>
          <AlpanaDivider dark className="mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 Columns: Interactive Booking Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 bg-[#211613] border border-[#C59B27]/35 p-6 sm:p-10 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[#FAF7F2]/15 pb-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#FAF7F2]">
                  {lang === 'bn'
                    ? 'আপনার ভোজের বিবরণ দিন'
                    : 'Reservation Request Details'}
                </h3>
                <p className="text-xs text-[#FAF7F2]/65">
                  {lang === 'bn'
                    ? 'সমস্ত তথ্য ডেমো প্রদর্শনের জন্য ব্রাউজারে সংরক্ষিত হয়'
                    : 'All fields are validated in real-time (Demo Mode)'}
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#7A1C1C] border border-[#C59B27]/40 text-[11px] uppercase tracking-wider text-[#E6C665] font-medium">
                {lang === 'bn' ? 'ডেমো ফর্ম' : 'Demo Form'}
              </span>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="bg-[#7A1C1C]/40 border border-[#E6C665] p-4 flex items-start gap-3 text-sm text-[#FAF7F2]"
              >
                <AlertCircle className="w-5 h-5 text-[#E6C665] shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-xs uppercase tracking-wider text-[#E6C665] mb-2 font-medium"
                >
                  {lang === 'bn' ? 'তারিখ (Date) *' : 'Date *'}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#C59B27] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="booking-date"
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-[#140D0B] border border-[#FAF7F2]/25 focus:border-[#C59B27] pl-10 pr-3 py-3 text-sm text-[#FAF7F2] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="booking-time"
                  className="block text-xs uppercase tracking-wider text-[#E6C665] mb-2 font-medium"
                >
                  {lang === 'bn' ? 'সময় (Time) *' : 'Time *'}
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#C59B27] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="booking-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full bg-[#140D0B] border border-[#FAF7F2]/25 focus:border-[#C59B27] pl-10 pr-4 py-3 text-sm text-[#FAF7F2] focus:outline-none"
                  >
                    {config.openingHours.validTimeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#140D0B] text-[#FAF7F2]">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label
                  htmlFor="booking-guests"
                  className="block text-xs uppercase tracking-wider text-[#E6C665] mb-2 font-medium"
                >
                  {lang === 'bn' ? 'অতিথি সংখ্যা (Guests) *' : 'Number of Guests *'}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#C59B27] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="booking-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#140D0B] border border-[#FAF7F2]/25 focus:border-[#C59B27] pl-10 pr-4 py-3 text-sm text-[#FAF7F2] focus:outline-none tabular-nums"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16].map((num) => (
                      <option key={num} value={num} className="bg-[#140D0B] text-[#FAF7F2]">
                        {num} {lang === 'bn' ? 'জন অতিথি' : num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-xs uppercase tracking-wider text-[#E6C665] mb-2 font-medium"
                >
                  {lang === 'bn' ? 'আপনার নাম (Name) *' : 'Your Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#C59B27] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="booking-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={
                      lang === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your full name'
                    }
                    required
                    className="w-full bg-[#140D0B] border border-[#FAF7F2]/25 focus:border-[#C59B27] pl-10 pr-4 py-3 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-xs uppercase tracking-wider text-[#E6C665] mb-2 font-medium"
                >
                  {lang === 'bn' ? 'ফোন নম্বর (Phone Number) *' : 'Phone Number *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#C59B27] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={
                      lang === 'bn' ? '+91 98000 00000' : 'e.g. +91 98300 00000'
                    }
                    required
                    className="w-full bg-[#140D0B] border border-[#FAF7F2]/25 focus:border-[#C59B27] pl-10 pr-4 py-3 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus:outline-none tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label
                htmlFor="booking-request"
                className="block text-xs uppercase tracking-wider text-[#E6C665] mb-2 font-medium"
              >
                {lang === 'bn'
                  ? 'বিশেষ অনুরোধ (Special Request — ঐচ্ছিক)'
                  : 'Special Request (Optional)'}
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-[#C59B27] absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  id="booking-request"
                  rows={3}
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'জন্মদিন, জানালার পাশের টেবিল, অথবা বিশেষ কোনো পদের অনুরোধ...'
                      : 'e.g. Courtyard corner table, anniversary celebration, dietary preferences...'
                  }
                  className="w-full bg-[#140D0B] border border-[#FAF7F2]/25 focus:border-[#C59B27] pl-10 pr-4 py-3 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7A1C1C] hover:bg-[#912222] text-[#FAF7F2] border border-[#C59B27] py-4 px-6 text-base font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#E6C665]" />
                <span>
                  {isSubmitting
                    ? lang === 'bn'
                      ? 'পাঠানো হচ্ছে...'
                      : 'Submitting Request...'
                    : lang === 'bn'
                    ? 'টেবিল বুক করুন (Book Your Table)'
                    : 'টেবিল বুক করুন · Book Your Table'}
                </span>
              </button>
              <p className="text-[11px] text-[#FAF7F2]/60 mt-3 text-center">
                {lang === 'bn'
                  ? '* এটি একটি ডেমো বুকিং অনুরোধ সিস্টেম। কোনো আসল টেবিল বুক করা হচ্ছে না।'
                  : '* DEMO NOTICE: This submits a simulated reservation request. No real table is reserved.'}
              </p>
            </div>
          </form>

          {/* Right 5 Columns: Dining Hours & Backend Integration Architecture Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#211613]/80 border border-[#FAF7F2]/15 p-6 sm:p-8 space-y-5">
              <h3 className="font-display text-2xl font-semibold text-[#E6C665]">
                {lang === 'bn'
                  ? 'ভোজের সময়সূচী (ডেমো)'
                  : 'Dining Hours & Seating Policy (Demo)'}
              </h3>

              <div className="space-y-3 text-sm text-[#FAF7F2]/85">
                <div className="pb-3 border-b border-[#FAF7F2]/10">
                  <p className="text-xs uppercase tracking-widest text-[#E6C665] mb-1">
                    {lang === 'bn' ? 'মধ্যাহ্নভোজ (Lunch)' : 'Afternoon Lunch Seating'}
                  </p>
                  <p className="font-medium">{config.openingHours.lunchLabel[lang]}</p>
                </div>

                <div className="pb-3 border-b border-[#FAF7F2]/10">
                  <p className="text-xs uppercase tracking-widest text-[#E6C665] mb-1">
                    {lang === 'bn' ? 'নৈশভোজ (Dinner)' : 'Evening Courtyard Dinner'}
                  </p>
                  <p className="font-medium">{config.openingHours.dinnerLabel[lang]}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#E6C665] mb-1">
                    {lang === 'bn' ? 'সাপ্তাহিক খোলা দিন' : 'Weekly Schedule'}
                  </p>
                  <p className="text-[#FAF7F2]/75">{config.openingHours.daysLabel[lang]}</p>
                </div>
              </div>
            </div>

            {/* Developer / Restaurant Owner Integration Note */}
            <div className="bg-[#1B120F] border border-[#C59B27]/35 p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6C665] font-semibold">
                <Info className="w-4 h-4 text-[#C59B27]" />
                <span>
                  {lang === 'bn'
                    ? 'রেস্তোরাঁ মালিকদের জন্য প্রযুক্তিগত নোট'
                    : 'Ready for Live Restaurant Integration'}
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                {lang === 'bn'
                  ? 'এই ডেমো বুকিং সিস্টেমটি এমনভাবে তৈরি করা হয়েছে যাতে আসল রেস্তোরাঁর ক্ষেত্রে প্রতিটি বুকিং সরাসরি WhatsApp, ইমেইল, Google Sheets, Telegram বা আপনার রেস্তোরাঁর ড্যাশবোর্ডে পৌঁছে যায়।'
                  : 'For your live restaurant deployment, this reservation module connects directly to your preferred workflow without changing the interface:'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'WhatsApp Instant Alert',
                  'Email Confirmation',
                  'Google Sheets Log',
                  'Telegram Bot',
                  'Firebase / POS',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#211613] border border-[#FAF7F2]/15 text-[11px] text-[#E6C665]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {confirmedReservation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#140D0B]/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setConfirmedReservation(null)}
        >
          <div
            className="bg-[#FAF7F2] text-[#1C1311] border-2 border-[#C59B27] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setConfirmedReservation(null)}
              aria-label="Close confirmation"
              className="absolute top-4 right-4 w-9 h-9 bg-[#F3EDE2] hover:bg-[#7A1C1C] hover:text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#2D6A4F]/15 border border-[#2D6A4F] text-[#2D6A4F] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3
                id="booking-confirm-title"
                className="font-display text-3xl sm:text-4xl font-bold text-[#7A1C1C] mb-1"
              >
                ধন্যবাদ!
              </h3>
              <p className="font-display text-xl font-semibold text-[#1C1311]">
                Your reservation request has been received.
              </p>
              <p className="text-xs text-[#5C4942] mt-1">
                {lang === 'bn'
                  ? 'আপনার বুকিং অনুরোধটি সফলভাবে গৃহীত হয়েছে।'
                  : 'Reference ID: ' + confirmedReservation.id}
              </p>
            </div>

            {/* Summary Ledger */}
            <div className="bg-[#F3EDE2] border border-[#7A1C1C]/20 p-4 sm:p-5 space-y-3 text-sm mb-5">
              <div className="flex justify-between border-b border-[#7A1C1C]/10 pb-2">
                <span className="text-[#5C4942]">
                  {lang === 'bn' ? 'অতিথির নাম (Name):' : 'Customer Name:'}
                </span>
                <span className="font-semibold text-[#1C1311]">
                  {confirmedReservation.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#7A1C1C]/10 pb-2">
                <span className="text-[#5C4942]">
                  {lang === 'bn' ? 'তারিখ (Selected Date):' : 'Selected Date:'}
                </span>
                <span className="font-semibold text-[#1C1311] tabular-nums">
                  {confirmedReservation.date}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#7A1C1C]/10 pb-2">
                <span className="text-[#5C4942]">
                  {lang === 'bn' ? 'সময় (Selected Time):' : 'Selected Time:'}
                </span>
                <span className="font-semibold text-[#1C1311] tabular-nums">
                  {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C4942]">
                  {lang === 'bn' ? 'অতিথি সংখ্যা (Guests):' : 'Number of Guests:'}
                </span>
                <span className="font-semibold text-[#1C1311] tabular-nums">
                  {confirmedReservation.guests}{' '}
                  {lang === 'bn' ? 'জন' : confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              {confirmedReservation.specialRequest && (
                <div className="pt-2 border-t border-[#7A1C1C]/10 text-xs">
                  <span className="text-[#5C4942] block mb-0.5">
                    {lang === 'bn' ? 'বিশেষ অনুরোধ:' : 'Special Request:'}
                  </span>
                  <span className="text-[#1C1311] italic">
                    “{confirmedReservation.specialRequest}”
                  </span>
                </div>
              )}
            </div>

            {/* Mandatory Demo Disclaimer Message */}
            <div className="bg-[#7A1C1C]/10 border-l-4 border-[#7A1C1C] p-4 mb-6 text-xs sm:text-sm text-[#1C1311] leading-relaxed">
              <p className="font-semibold mb-1">
                Your request has been submitted. The restaurant will contact you to confirm availability.
              </p>
              <p className="text-xs text-[#5C4942]">
                {lang === 'bn'
                  ? 'আপনার অনুরোধটি জমা দেওয়া হয়েছে। আসন খালি থাকা সাপেক্ষে রেস্তোরাঁ আপনার সাথে যোগাযোগ করে বুকিং নিশ্চিত করবে। (এটি একটি ডেমো প্রদর্শনী—কোনো আসল টেবিল বুক করা হয়নি)'
                  : '(DEMO NOTICE: Because this is a demonstration website, no real restaurant table has been reserved.)'}
              </p>
            </div>

            {/* Optional WhatsApp Payload Preview for Restaurant Owners */}
            <details className="mb-5 text-xs bg-[#F3EDE2]/60 border border-[#7A1C1C]/15 p-3">
              <summary className="font-medium text-[#7A1C1C] cursor-pointer">
                {lang === 'bn'
                  ? 'ডেভেলপার প্রিভিউ: রেস্তোরাঁ মালিকের কাছে কীভাবে বার্তা যাবে দেখুন'
                  : 'Client Preview: See formatted WhatsApp / Backend payload'}
              </summary>
              <pre className="mt-2 p-2.5 bg-[#140D0B] text-[#E6C665] text-[11px] overflow-x-auto whitespace-pre-wrap font-mono">
                {buildWhatsAppPreviewMessage(confirmedReservation, config.restaurantName)}
              </pre>
            </details>

            <button
              type="button"
              onClick={() => setConfirmedReservation(null)}
              className="w-full bg-[#7A1C1C] hover:bg-[#5E1414] text-[#FAF7F2] py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'বন্ধ করুন (Close)' : 'Done · Return to Website'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
