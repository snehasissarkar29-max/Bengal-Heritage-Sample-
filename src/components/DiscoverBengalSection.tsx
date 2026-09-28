import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { DiscoverStep, Language } from '../config/restaurantConfig';
import { AlpanaDivider } from './BengaliMotifs';

interface DiscoverBengalSectionProps {
  steps: DiscoverStep[];
  lang: Language;
  onExploreMenu: () => void;
}

export const DiscoverBengalSection: React.FC<DiscoverBengalSectionProps> = ({
  steps,
  lang,
  onExploreMenu,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <section
      aria-label={
        lang === 'bn' ? 'বাংলার স্বাদের সন্ধানে' : 'Discover the Flavours of Bengal'
      }
      className="relative py-24 md:py-32 bg-[#140D0B] text-[#FAF7F2] overflow-hidden"
    >
      {/* Dynamic Background Image Cross-Fade */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {steps.map((step, index) => (
          <img
            key={step.id}
            src={step.image}
            alt=""
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
              index === activeStepIndex
                ? 'opacity-30 scale-100'
                : 'opacity-0 scale-105'
            }`}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(20, 13, 11, 0.92) 0%, rgba(20, 13, 11, 0.76) 50%, rgba(20, 13, 11, 0.96) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E6C665] mb-3">
            <Compass className="w-4 h-4 text-[#C59B27]" />
            <span>
              {lang === 'bn'
                ? 'ইন্টারেক্টিভ রন্ধন যাত্রা · ডেমো ফিচার'
                : 'Interactive Culinary Journey · Demo Feature'}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#FAF7F2] mb-4">
            {lang === 'bn'
              ? 'বাংলার স্বাদের সন্ধানে (Discover the Flavours of Bengal)'
              : 'Discover the Flavours of Bengal'}
          </h2>
          <p className="text-sm sm:text-base text-[#FAF7F2]/75">
            {lang === 'bn'
              ? 'ইলিশ থেকে সর্ষে, গোবিন্দভোগ চাল থেকে মাটির ভাঁড়ের মিষ্টি—প্রতিটি ধাপে ক্লিক করে বাংলার রসনাবিলাসের গল্প জানুন।'
              : 'Follow the four pillars of Kolkata gastronomy—click each stage below to explore the provenance, aroma, and craft behind our kitchen.'}
          </p>
          <AlpanaDivider dark className="mt-6" />
        </div>

        {/* Interactive Horizontal Journey Stepper: Hilsa -> Mustard -> Rice -> Sweets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {steps.map((step, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`group relative text-left p-4 sm:p-5 border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#7A1C1C]/80 border-[#C59B27] shadow-xl'
                    : 'bg-[#211613]/80 border-[#FAF7F2]/15 hover:border-[#C59B27]/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] mb-2">
                  <span
                    className={`font-mono font-semibold ${
                      isSelected ? 'text-[#E6C665]' : 'text-[#FAF7F2]/50'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className="text-[#C59B27]/60 hidden lg:inline">→</span>
                  )}
                </div>
                <div className="font-display text-xl sm:text-2xl font-semibold text-[#FAF7F2] mb-1">
                  {lang === 'bn' ? step.titleBn : step.titleEn}
                </div>
                <div className="text-xs text-[#FAF7F2]/70 line-clamp-1">
                  {lang === 'bn' ? step.subtitleBn : step.subtitleEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Split Showcase */}
        <div
          key={currentStep.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#211613]/90 border border-[#C59B27]/35 p-6 sm:p-10 shadow-2xl transition-all duration-500"
        >
          {/* Left Visual Frame */}
          <div className="lg:col-span-6 relative overflow-hidden border border-[#C59B27]/30 aspect-[16/11] bg-[#140D0B]">
            <img
              src={currentStep.image}
              alt={lang === 'bn' ? currentStep.titleBn : currentStep.titleEn}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-[#140D0B]/85 border border-[#C59B27]/50 px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-[#E6C665]">
              {lang === 'bn'
                ? `অধ্যায় ${currentStep.stepNumber}`
                : `Chapter ${currentStep.stepNumber}`}
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#E6C665] mb-2">
                {lang === 'bn' ? currentStep.originNoteBn : currentStep.originNoteEn}
              </p>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF7F2] mb-2">
                {lang === 'bn' ? currentStep.titleBn : currentStep.titleEn}
              </h3>
              <p className="font-display text-xl text-[#E6C665]/90 italic">
                {lang === 'bn' ? currentStep.subtitleBn : currentStep.subtitleEn}
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#FAF7F2]/85 leading-relaxed">
              {lang === 'bn' ? currentStep.descriptionBn : currentStep.descriptionEn}
            </p>

            <div className="bg-[#140D0B]/70 border-l-2 border-[#C59B27] p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6C665] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {lang === 'bn'
                    ? 'মেনুতে আমাদের বিশেষ পরিবেশনা'
                    : 'Featured on Our Demo Menu'}
                </span>
              </div>
              <p className="font-display text-xl text-[#FAF7F2]">
                {lang === 'bn'
                  ? currentStep.signatureDishBn
                  : currentStep.signatureDishEn}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2.5 bg-[#C59B27] hover:bg-[#d6ad36] text-[#140D0B] px-6 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                <span>
                  {lang === 'bn' ? 'সম্পূর্ণ মেনুতে দেখুন' : 'Explore in Menu'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Select step ${i + 1}`}
                    onClick={() => setActiveStepIndex(i)}
                    className={`h-2 transition-all duration-300 cursor-pointer ${
                      i === activeStepIndex
                        ? 'w-8 bg-[#C59B27]'
                        : 'w-2 bg-[#FAF7F2]/30 hover:bg-[#FAF7F2]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
