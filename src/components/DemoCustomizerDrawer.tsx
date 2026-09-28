import React, { useState } from 'react';
import { Sliders, X, RotateCcw, Check } from 'lucide-react';
import {
  DEFAULT_RESTAURANT_CONFIG,
  Language,
  RestaurantConfig,
} from '../config/restaurantConfig';

interface DemoCustomizerDrawerProps {
  config: RestaurantConfig;
  onUpdateConfig: (updated: RestaurantConfig) => void;
  lang: Language;
}

export const DemoCustomizerDrawer: React.FC<DemoCustomizerDrawerProps> = ({
  config,
  onUpdateConfig,
  lang,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFieldChange = (field: keyof RestaurantConfig, value: string) => {
    onUpdateConfig({
      ...config,
      [field]: value,
    });
  };

  const handleAddressChange = (value: string) => {
    onUpdateConfig({
      ...config,
      address: {
        ...config.address,
        en: value,
      },
    });
  };

  const handleSpecialPriceChange = (price: number) => {
    onUpdateConfig({
      ...config,
      todaysSpecial: {
        ...config.todaysSpecial,
        demoPrice: Number.isNaN(price) ? 0 : price,
      },
    });
  };

  const handleReset = () => {
    onUpdateConfig(DEFAULT_RESTAURANT_CONFIG);
  };

  return (
    <>
      {/* Discreet Floating Client Presentation Trigger (Bottom Left on Desktop) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 left-4 z-40 inline-flex items-center gap-2 bg-[#140D0B]/90 hover:bg-[#7A1C1C] text-[#FAF7F2] border border-[#C59B27]/60 px-3.5 py-2.5 text-xs font-medium shadow-xl backdrop-blur-md transition-all cursor-pointer"
        title="Live Client Brand Customizer (For Freelancer Pitch)"
      >
        <Sliders className="w-3.5 h-3.5 text-[#E6C665]" />
        <span>
          {lang === 'bn' ? 'ডেমো কাস্টমাইজার' : 'Customize Demo Brand'}
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Live Client Brand Customizer"
          className="fixed inset-0 z-50 flex justify-end bg-[#140D0B]/70 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#FAF7F2] text-[#1C1311] h-full overflow-y-auto shadow-2xl border-l-2 border-[#C59B27] p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-5">
              <div className="flex items-start justify-between border-b border-[#7A1C1C]/15 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A1C1C] font-bold">
                    Freelancer Presentation Tool
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#1C1311]">
                    Live Client Customizer
                  </h3>
                  <p className="text-xs text-[#5C4942] mt-0.5">
                    Type a prospective restaurant owner’s brand name, phone, or address below to preview their restaurant live during a meeting.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-[#F3EDE2] hover:bg-[#7A1C1C] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#7A1C1C] mb-1">
                    Restaurant Name (English)
                  </label>
                  <input
                    type="text"
                    value={config.restaurantName}
                    onChange={(e) => handleFieldChange('restaurantName', e.target.value)}
                    className="w-full bg-[#F3EDE2] border border-[#7A1C1C]/25 px-3 py-2 text-sm text-[#1C1311]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#7A1C1C] mb-1">
                    Restaurant Name (Bengali / বাংলা)
                  </label>
                  <input
                    type="text"
                    value={config.restaurantNameBengali}
                    onChange={(e) => handleFieldChange('restaurantNameBengali', e.target.value)}
                    className="w-full bg-[#F3EDE2] border border-[#7A1C1C]/25 px-3 py-2 text-sm text-[#1C1311]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#7A1C1C] mb-1">
                    English Tagline
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => handleFieldChange('tagline', e.target.value)}
                    className="w-full bg-[#F3EDE2] border border-[#7A1C1C]/25 px-3 py-2 text-sm text-[#1C1311]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#7A1C1C] mb-1">
                    Demo Phone Number
                  </label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    className="w-full bg-[#F3EDE2] border border-[#7A1C1C]/25 px-3 py-2 text-sm text-[#1C1311]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#7A1C1C] mb-1">
                    Demo Address (English)
                  </label>
                  <textarea
                    rows={2}
                    value={config.address.en}
                    onChange={(e) => handleAddressChange(e.target.value)}
                    className="w-full bg-[#F3EDE2] border border-[#7A1C1C]/25 px-3 py-2 text-sm text-[#1C1311]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#7A1C1C] mb-1">
                    Today’s Special Demo Price (₹)
                  </label>
                  <input
                    type="number"
                    value={config.todaysSpecial.demoPrice}
                    onChange={(e) => handleSpecialPriceChange( parseInt(e.target.value, 10) )}
                    className="w-full bg-[#F3EDE2] border border-[#7A1C1C]/25 px-3 py-2 text-sm text-[#1C1311]"
                  />
                </div>

                <div className="bg-[#F3EDE2] border-l-2 border-[#C59B27] p-3 text-[11px] text-[#5C4942]">
                  All menu items, gallery photos, hours, and translations are centralized in{' '}
                  <code className="font-mono text-[#7A1C1C]">src/config/restaurantConfig.ts</code>{' '}
                  for rapid production handoff.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#7A1C1C]/15 flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-[#7A1C1C]/30 py-2.5 text-xs font-medium text-[#1C1311] hover:bg-[#F3EDE2] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#7A1C1C] text-[#FAF7F2] py-2.5 text-xs font-medium cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Preview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
