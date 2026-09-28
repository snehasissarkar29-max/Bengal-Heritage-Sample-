import React, { useMemo, useState } from 'react';
import { Search, X, Sparkles, Clock, Flame, Info, Utensils } from 'lucide-react';
import { Language, MenuCategoryKey, MenuItem } from '../config/restaurantConfig';
import { AlpanaDivider } from './BengaliMotifs';

interface InteractiveMenuSectionProps {
  items: MenuItem[];
  lang: Language;
  selectedItem: MenuItem | null;
  onSelectItem: (item: MenuItem | null) => void;
  onBookWithDish: (dishName: string) => void;
}

const CATEGORY_TABS: Array<{
  key: 'all' | MenuCategoryKey;
  labelBn: string;
  labelEn: string;
}> = [
  { key: 'all', labelBn: 'সব পদ', labelEn: 'All Courses' },
  { key: 'vegetarian', labelBn: 'নিরামিষ', labelEn: 'Vegetarian' },
  { key: 'fish', labelBn: 'মাছ', labelEn: 'Fish' },
  { key: 'meat', labelBn: 'মাংস', labelEn: 'Meat' },
  { key: 'rice', labelBn: 'ভাত ও বিরিয়ানি', labelEn: 'Rice & Biryani' },
  { key: 'desserts', labelBn: 'মিষ্টি', labelEn: 'Desserts' },
  { key: 'drinks', labelBn: 'পানীয়', labelEn: 'Drinks' },
];

export const DietaryDot: React.FC<{ isVeg: boolean; lang: Language }> = ({ isVeg, lang }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-xs font-medium ${
      isVeg ? 'text-[#2D6A4F]' : 'text-[#9B2226]'
    }`}
    title={
      isVeg
        ? lang === 'bn'
          ? 'নিরামিষ (Vegetarian)'
          : 'Vegetarian'
        : lang === 'bn'
        ? 'আমিষ (Non-Vegetarian)'
        : 'Non-Vegetarian'
    }
  >
    <span
      className={`w-3.5 h-3.5 border flex items-center justify-center ${
        isVeg ? 'border-[#2D6A4F]' : 'border-[#9B2226]'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isVeg ? 'bg-[#2D6A4F]' : 'bg-[#9B2226]'
        }`}
      />
    </span>
    <span>
      {isVeg
        ? lang === 'bn'
          ? 'নিরামিষ'
          : 'Veg'
        : lang === 'bn'
        ? 'আমিষ'
        : 'Non-Veg'}
    </span>
  </span>
);

export const InteractiveMenuSection: React.FC<InteractiveMenuSectionProps> = ({
  items,
  lang,
  selectedItem,
  onSelectItem,
  onBookWithDish,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | MenuCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (vegOnly && !item.isVeg) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchEn = item.nameEn.toLowerCase().includes(q);
        const matchBn = item.nameBn.toLowerCase().includes(q);
        const matchDesc =
          item.shortDesc.en.toLowerCase().includes(q) ||
          item.shortDesc.bn.toLowerCase().includes(q);
        const matchIng = item.ingredients.en.some((i) => i.toLowerCase().includes(q));
        return matchEn || matchBn || matchDesc || matchIng;
      }
      return true;
    });
  }, [items, activeCategory, vegOnly, searchQuery]);

  return (
    <section
      id="menu"
      className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#7A1C1C]/10 relative"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-[#7A1C1C] font-semibold mb-2">
            {lang === 'bn'
              ? 'আমাদের রাজকীয় খাদ্যতালিকা · ডেমো মেনু'
              : 'Interactive Culinary Index · Demo Menu'}
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1311] mb-4">
            {lang === 'bn' ? 'আহারে কলকাতার মেনু' : 'A Curated Bengali Feast'}
          </h2>
          <p className="text-sm sm:text-base text-[#5C4942] leading-relaxed">
            {lang === 'bn'
              ? 'প্রতিটি পদের ওপর ক্লিক করে উপাদান, রন্ধনপ্রণালী ও বিস্তারিত তথ্য দেখুন। (প্রদর্শিত সমস্ত পদ ও মূল্য ডেমো ওয়েবসাইটের উদাহরণ মাত্র)'
              : 'Select any course below to inspect heirloom ingredients, preparation notes, and dietary details. All dishes and prices shown are sample demo content.'}
          </p>
          <AlpanaDivider className="mt-6" />
        </div>

        {/* Category Tabs & Search Filter Bar */}
        <div className="bg-[#F3EDE2] border border-[#7A1C1C]/15 p-4 sm:p-6 mb-10">
          {/* Category Ledger Bar */}
          <div
            role="tablist"
            aria-label={lang === 'bn' ? 'মেনু বিভাগ' : 'Menu Categories'}
            className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-[#7A1C1C]/15 no-scrollbar"
          >
            {CATEGORY_TABS.map((tab) => {
              const isSelected = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`shrink-0 px-4 py-2.5 text-left transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#7A1C1C] text-[#FAF7F2] border-[#7A1C1C] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#1C1311] border-[#7A1C1C]/15 hover:border-[#7A1C1C]/45'
                  }`}
                >
                  <div className="text-sm font-semibold leading-tight">
                    {lang === 'bn' ? tab.labelBn : tab.labelEn}
                  </div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      isSelected ? 'text-[#E6C665]' : 'text-[#5C4942]'
                    }`}
                  >
                    {lang === 'bn' ? tab.labelEn : tab.labelBn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#5C4942] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'পদ বা উপাদান খুঁজুন (যেমন: ইলিশ, পোলাও, দই)...'
                    : 'Search dishes or ingredients (e.g. Ilish, Mutton, Posto)...'
                }
                className="w-full bg-[#FAF7F2] border border-[#7A1C1C]/20 pl-10 pr-9 py-2.5 text-sm text-[#1C1311] placeholder:text-[#8A756D] focus:outline-none focus:border-[#7A1C1C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C4942] hover:text-[#1C1311] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <label className="inline-flex items-center gap-2.5 text-sm text-[#1C1311] font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#2D6A4F] cursor-pointer"
                />
                <span>
                  {lang === 'bn' ? 'শুধুমাত্র নিরামিষ (Veg Only)' : 'Vegetarian Only (নিরামিষ)'}
                </span>
              </label>

              <span className="text-xs text-[#5C4942] border-l border-[#7A1C1C]/20 pl-4 tabular-nums">
                {lang === 'bn'
                  ? `${filteredItems.length}টি ডেমো পদ`
                  : `Showing ${filteredItems.length} Demo Dishes`}
              </span>
            </div>
          </div>
        </div>

        {/* Dish Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#F3EDE2]/60 border border-[#7A1C1C]/15 p-12 text-center">
            <p className="font-display text-2xl text-[#1C1311] mb-2">
              {lang === 'bn'
                ? 'এই অনুসন্ধানে কোনো পদ পাওয়া যায়নি'
                : 'No matching dishes found in this filter'}
            </p>
            <p className="text-sm text-[#5C4942] mb-5">
              {lang === 'bn'
                ? 'অনুগ্রহ করে অন্য কোনো বিভাগ নির্বাচন করুন বা অনুসন্ধান পরিবর্তন করুন।'
                : 'Try clearing the search query or switching from Vegetarian-only mode.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setVegOnly(false);
              }}
              className="px-5 py-2.5 bg-[#7A1C1C] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              {lang === 'bn' ? 'সব পদ দেখুন' : 'Reset Menu Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredItems.map((dish) => (
              <article
                key={dish.id}
                onClick={() => onSelectItem(dish)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectItem(dish);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${dish.nameEn} (${dish.nameBn}) - View dish details`}
                className="group bg-[#F3EDE2]/70 hover:bg-[#F3EDE2] border border-[#7A1C1C]/15 hover:border-[#C59B27] transition-all duration-300 flex flex-col sm:flex-row overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]"
              >
                {/* Dish Thumbnail */}
                <div className="sm:w-44 md:w-48 h-48 sm:h-auto shrink-0 relative overflow-hidden bg-[#140D0B]">
                  <img
                    src={dish.image}
                    alt={`${dish.nameEn} - ${dish.nameBn}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {dish.isSignature && (
                    <span className="absolute top-2.5 left-2.5 bg-[#140D0B]/85 text-[#E6C665] border border-[#C59B27]/50 px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium">
                      {lang === 'bn' ? 'বিশেষ পদ' : 'Signature'}
                    </span>
                  )}
                </div>

                {/* Dish Details (4 clean data points: Dietary/Title, Bilingual Name, Short Desc, Demo Price) */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <DietaryDot isVeg={dish.isVeg} lang={lang} />
                      <div className="text-right">
                        <span className="font-display text-xl font-bold text-[#7A1C1C] tabular-nums">
                          ₹{dish.demoPrice}
                        </span>
                        <span className="block text-[10px] uppercase tracking-wider text-[#8A756D]">
                          {lang === 'bn' ? 'ডেমো মূল্য' : 'Demo Price'}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1C1311] group-hover:text-[#7A1C1C] transition-colors leading-snug">
                      {lang === 'bn' ? dish.nameBn : dish.nameEn}
                    </h3>
                    <p className="text-xs font-medium text-[#8A756D] mb-2.5">
                      {lang === 'bn' ? dish.nameEn : dish.nameBn}
                    </p>

                    <p className="text-sm text-[#5C4942] line-clamp-2 leading-relaxed">
                      {dish.shortDesc[lang]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#7A1C1C]/10 flex items-center justify-between text-xs text-[#7A1C1C] font-medium">
                    <span>
                      {lang === 'bn'
                        ? 'উপাদান ও বিবরণ দেখুন'
                        : 'Click for ingredients & story'}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Dish Detail Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#140D0B]/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => onSelectItem(null)}
        >
          <div
            className="bg-[#FAF7F2] border-2 border-[#C59B27]/60 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full bg-[#140D0B]">
              <img
                src={selectedItem.image}
                alt={selectedItem.nameEn}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(20, 13, 11, 0.85) 0%, rgba(20, 13, 11, 0.2) 60%)',
                }}
              />

              <button
                type="button"
                onClick={() => onSelectItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-10 h-10 bg-[#140D0B]/80 hover:bg-[#7A1C1C] text-[#FAF7F2] border border-[#FAF7F2]/30 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4 text-[#FAF7F2]">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#FAF7F2] px-2.5 py-1 mb-2">
                    <DietaryDot isVeg={selectedItem.isVeg} lang={lang} />
                  </div>
                  <h3
                    id="dish-modal-title"
                    className="font-display text-2xl sm:text-3xl font-semibold leading-tight"
                  >
                    {selectedItem.nameBn}
                  </h3>
                  <p className="text-sm text-[#E6C665]">{selectedItem.nameEn}</p>
                </div>

                <div className="text-right shrink-0 bg-[#140D0B]/85 border border-[#C59B27]/50 px-3.5 py-2">
                  <span className="font-display text-2xl font-bold text-[#E6C665] tabular-nums">
                    ₹{selectedItem.demoPrice}
                  </span>
                  <span className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/75">
                    {lang === 'bn' ? 'ডেমো মূল্য' : 'Demo Price'}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Culinary Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#F3EDE2] p-3.5 border border-[#7A1C1C]/15 text-xs">
                <div className="flex items-center gap-2 text-[#1C1311]">
                  <Flame className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase text-[#8A756D]">
                      {lang === 'bn' ? 'স্বাদের ধরন' : 'Flavour Profile'}
                    </span>
                    <span className="font-medium">{selectedItem.spiceLevel[lang]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#1C1311]">
                  <Clock className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase text-[#8A756D]">
                      {lang === 'bn' ? 'প্রস্তুতির সময়' : 'Preparation'}
                    </span>
                    <span className="font-medium">
                      ~{selectedItem.prepTimeMins} {lang === 'bn' ? 'মিনিট' : 'Mins'}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-[#1C1311]">
                  <Sparkles className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase text-[#8A756D]">
                      {lang === 'bn' ? 'ডেমো স্ট্যাটাস' : 'Content Status'}
                    </span>
                    <span className="font-medium">
                      {lang === 'bn' ? 'নমুনা মেনু পদ' : 'Sample Demo Dish'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Culinary Description */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#7A1C1C] font-semibold mb-2">
                  {lang === 'bn' ? 'রন্ধন শৈলী ও বিবরণ' : 'Culinary Notes'}
                </h4>
                <p className="text-sm sm:text-base text-[#1C1311] leading-relaxed">
                  {selectedItem.fullDesc[lang]}
                </p>
              </div>

              {/* Key Ingredients */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.18em] text-[#7A1C1C] font-semibold mb-2.5">
                  {lang === 'bn' ? 'প্রধান উপাদানসমূহ (ডেমো)' : 'Key Ingredients (Demo Info)'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients[lang].map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#F3EDE2] border border-[#7A1C1C]/20 text-xs font-medium text-[#1C1311]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dietary Information */}
              <div className="bg-[#F3EDE2]/70 border-l-2 border-[#7A1C1C] p-3.5 flex items-start gap-2.5 text-xs text-[#5C4942]">
                <Info className="w-4 h-4 text-[#7A1C1C] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1311] block mb-0.5">
                    {lang === 'bn' ? 'ডায়েটারি ও অ্যালার্জি তথ্য:' : 'Dietary & Allergen Note:'}
                  </strong>
                  {selectedItem.dietaryNotes[lang]}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#7A1C1C]/15">
                <p className="text-[11px] text-[#8A756D]">
                  {lang === 'bn'
                    ? '* ডেমো ওয়েবসাইট: আসল রেস্তোরাঁর জন্য মেনু ও মূল্য সহজেই পরিবর্তনযোগ্য।'
                    : '* Demo Concept: Menu items & prices are easily customizable for client deployment.'}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    const dishTitle = `${selectedItem.nameEn} (${selectedItem.nameBn})`;
                    onSelectItem(null);
                    onBookWithDish(dishTitle);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#7A1C1C] hover:bg-[#5E1414] text-[#FAF7F2] px-5 py-3 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer shrink-0"
                >
                  <Utensils className="w-3.5 h-3.5 text-[#E6C665]" />
                  <span>
                    {lang === 'bn'
                      ? 'এই পদের জন্য টেবিল বুক করুন'
                      : 'Book a Table for This Dish'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
