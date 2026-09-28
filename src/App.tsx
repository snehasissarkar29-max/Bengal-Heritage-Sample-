import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  CalendarCheck,
  UtensilsCrossed,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Quote,
  Maximize2,
  Navigation,
  Globe,
} from 'lucide-react';
import {
  DEFAULT_RESTAURANT_CONFIG,
  GalleryItem,
  Language,
  MenuItem,
  RestaurantConfig,
} from './config/restaurantConfig';
import { HeroVideoSystem } from './components/HeroVideoSystem';
import { InteractiveMenuSection } from './components/InteractiveMenuSection';
import { DiscoverBengalSection } from './components/DiscoverBengalSection';
import { TableBookingSection } from './components/TableBookingSection';
import { DemoCustomizerDrawer } from './components/DemoCustomizerDrawer';
import {
  AlpanaCornerOrnament,
  AlpanaDivider,
  KolkataSkylineIllustration,
} from './components/BengaliMotifs';

const LANG_SESSION_KEY = 'bengal_heritage_demo_lang_v1';

export default function App() {
  const [config, setConfig] = useState<RestaurantConfig>(DEFAULT_RESTAURANT_CONFIG);

  // Language state: default English, remembered in sessionStorage during current session
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = sessionStorage.getItem(LANG_SESSION_KEY);
      if (saved === 'bn' || saved === 'en') return saved;
    } catch {
      // Ignore storage error
    }
    return 'en';
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Menu Modal State
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  // Gallery Filter & Lightbox State
  const [galleryCategory, setGalleryCategory] = useState<
    'all' | 'food' | 'interior' | 'people' | 'culture'
  >('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Demo Review Carousel State
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Booking Prefill State (from Experience cards or Menu modal)
  const [bookingPrefillNote, setBookingPrefillNote] = useState('');
  const [bookingPrefillGuests, setBookingPrefillGuests] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    try {
      sessionStorage.setItem(LANG_SESSION_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage error
    }
  }, [lang]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDishById = (menuItemId: string) => {
    const found = config.menuItems.find((m) => m.id === menuItemId);
    if (found) {
      setSelectedMenuItem(found);
    } else {
      scrollToSection('menu');
    }
  };

  const handleBookWithContext = (note: string, guestsCount?: number) => {
    setBookingPrefillNote(note);
    if (guestsCount) {
      setBookingPrefillGuests(guestsCount);
    }
    scrollToSection('book-table');
  };

  const filteredGallery = config.galleryImages.filter(
    (img) => galleryCategory === 'all' || img.category === galleryCategory
  );

  const navItems: Array<{ id: string; labelEn: string; labelBn: string }> = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'our-story', labelEn: 'Our Story', labelBn: 'আমাদের গল্প' },
    { id: 'menu', labelEn: 'Menu', labelBn: 'মেনু' },
    { id: 'experience', labelEn: 'Experience', labelBn: 'অভিজ্ঞতা' },
    { id: 'gallery', labelEn: 'Gallery', labelBn: 'গ্যালারি' },
    { id: 'reviews', labelEn: 'Reviews', labelBn: 'মতামত' },
    { id: 'book-table', labelEn: 'Book a Table', labelBn: 'টেবিল বুকিং' },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  const currentReview = config.reviews[activeReviewIdx] || config.reviews[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1311] overflow-x-hidden pb-16 md:pb-0">
      {/* Sticky Header Wrapper (Demo Notice Bar + Main Navigation) */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        {/* Top Demo Disclosure Banner */}
        <div className="bg-[#7A1C1C] text-[#FAF7F2] border-b border-[#C59B27]/35 px-4 py-1.5 text-[11px] sm:text-xs">
          <div className="mx-auto max-w-[1360px] flex items-center justify-between gap-4">
            <p className="truncate font-medium">
              <span className="inline-block bg-[#C59B27] text-[#140D0B] font-bold px-1.5 py-0.2 mr-2 uppercase tracking-wider text-[10px]">
                DEMO
              </span>
              {config.demoBannerText[lang]}
            </p>
            <a
              href="#book-table"
              className="hidden md:inline-flex items-center gap-1 text-[#E6C665] hover:underline shrink-0 font-medium"
            >
              <span>{lang === 'bn' ? 'ডেমো বুকিং টেস্ট করুন' : 'Test Demo Booking'}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Main Sticky Navigation Bar */}
        <nav
          aria-label={lang === 'bn' ? 'প্রধান নেভিগেশন' : 'Main Navigation'}
          className={`transition-all duration-300 border-b ${
            isScrolled
              ? 'bg-[#140D0B]/95 backdrop-blur-md border-[#C59B27]/30 py-2.5 shadow-xl'
              : 'bg-[#140D0B]/75 backdrop-blur-sm border-[#FAF7F2]/10 py-4'
          }`}
        >
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
            {/* Brand Logo / Name */}
            <a
              href="#home"
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 border border-[#C59B27] bg-[#7A1C1C]/80 flex items-center justify-center text-[#E6C665] font-display text-xl font-bold shrink-0">
                আ
              </div>
              <div>
                <span className="block font-display text-xl sm:text-2xl font-semibold text-[#FAF7F2] leading-none tracking-wide group-hover:text-[#E6C665] transition-colors">
                  {lang === 'bn' ? config.restaurantNameBengali : config.restaurantName}
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E6C665]/85 mt-1">
                  {lang === 'bn' ? config.restaurantName : config.restaurantNameBengali} · DEMO
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-xs uppercase tracking-[0.15em] text-[#FAF7F2]/85 hover:text-[#E6C665] transition-colors font-medium py-1"
                >
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </a>
              ))}
            </div>

            {/* Right Controls: Bilingual Switcher + Book a Table CTA + Mobile Menu Trigger */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Bilingual Language Switcher: বাংলা | English */}
              <div
                role="group"
                aria-label="Language Switcher"
                className="inline-flex items-center border border-[#C59B27]/55 bg-[#211613] p-0.5 text-xs"
              >
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  aria-pressed={lang === 'bn'}
                  className={`px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                    lang === 'bn'
                      ? 'bg-[#C59B27] text-[#140D0B] font-semibold'
                      : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2]'
                  }`}
                >
                  বাংলা
                </button>
                <span className="text-[#FAF7F2]/25 select-none">|</span>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  aria-pressed={lang === 'en'}
                  className={`px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#C59B27] text-[#140D0B] font-semibold'
                      : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2]'
                  }`}
                >
                  English
                </button>
              </div>

              {/* Prominent Book a Table Button */}
              <button
                type="button"
                onClick={() => scrollToSection('book-table')}
                className="hidden sm:inline-flex items-center gap-2 bg-[#7A1C1C] hover:bg-[#942222] text-[#FAF7F2] border border-[#C59B27]/60 px-4 py-2 text-xs uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#E6C665]" />
                <span>{lang === 'bn' ? 'টেবিল বুক করুন' : 'Book a Table'}</span>
              </button>

              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                className="xl:hidden w-10 h-10 border border-[#C59B27]/40 bg-[#211613] text-[#FAF7F2] flex items-center justify-center cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Slide-Out Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="xl:hidden bg-[#140D0B] border-t border-[#C59B27]/30 px-6 py-6 space-y-5 shadow-2xl">
              <div className="grid grid-cols-2 gap-2.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-left px-3.5 py-3 bg-[#211613] border border-[#FAF7F2]/10 hover:border-[#C59B27] text-[#FAF7F2] text-sm font-medium cursor-pointer"
                  >
                    <span className="block">{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                    <span className="block text-[11px] text-[#E6C665]/75">
                      {lang === 'bn' ? item.labelEn : item.labelBn}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#FAF7F2]/15 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('book-table')}
                  className="w-full bg-[#7A1C1C] text-[#FAF7F2] border border-[#C59B27] py-3.5 text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 text-[#E6C665]" />
                  <span>
                    {lang === 'bn'
                      ? 'টেবিল বুক করুন (Book a Table)'
                      : 'Book a Table (টেবিল বুক করুন)'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* =====================================================================
          SECTION 2: FULLSCREEN CINEMATIC HERO
      ===================================================================== */}
      <main>
        <HeroVideoSystem
          scenes={config.heroVideos}
          lang={lang}
          restaurantNameEn={config.restaurantName}
          restaurantNameBn={config.restaurantNameBengali}
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('book-table')}
        />

        {/* =====================================================================
            SECTION 5: RESTAURANT STORY ("একটি গল্প, এক স্বাদ" / "A Story. A Flavour.")
        ===================================================================== */}
        <section
          id="our-story"
          className="py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Narrative Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#7A1C1C] font-semibold">
                  <span>
                    {lang === 'bn'
                      ? config.storyContent.kickerBn
                      : config.storyContent.kickerEn}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1C1311] leading-tight mb-2">
                    {lang === 'bn'
                      ? config.storyContent.headingBn
                      : config.storyContent.headingEn}
                  </h2>
                  <p className="font-display text-2xl text-[#7A1C1C] italic">
                    {lang === 'bn'
                      ? config.storyContent.headingEn
                      : config.storyContent.headingBn}
                  </p>
                </div>

                <p className="text-base sm:text-lg text-[#1C1311]/90 leading-relaxed">
                  {config.storyContent.leadParagraph[lang]}
                </p>

                <p className="text-sm sm:text-base text-[#5C4942] leading-relaxed">
                  {config.storyContent.secondParagraph[lang]}
                </p>

                <div className="bg-[#F3EDE2] border-l-4 border-[#7A1C1C] p-4 text-xs text-[#5C4942] italic">
                  {config.storyContent.demoDisclaimer[lang]}
                </div>
              </div>

              {/* Right Dual Image Composition with Bengali Alpana Corner Ornaments */}
              <div className="lg:col-span-6 relative">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-7 relative border border-[#7A1C1C]/25 p-2 bg-[#F3EDE2] shadow-lg">
                    <AlpanaCornerOrnament className="absolute -top-2 -left-2 text-[#7A1C1C] w-8 h-8" />
                    <img
                      src={config.storyContent.primaryImage}
                      alt={
                        lang === 'bn'
                          ? 'ঐতিহ্যবাহী বাঙালি কাঁসার থালি (ডেমো)'
                          : 'Royal Bengali Kansa Thali (Demo)'
                      }
                      loading="lazy"
                      className="w-full h-72 sm:h-96 object-cover"
                    />
                    <p className="text-[11px] text-[#5C4942] mt-2 text-center font-medium">
                      {lang === 'bn'
                        ? 'কাঁসার থালায় সাবেকি বাঙালি ভোজ (ডেমো চিত্র)'
                        : 'Heirloom Kansa Bronze Service (Demo Visual)'}
                    </p>
                  </div>

                  <div className="col-span-5 space-y-4">
                    <div className="relative border border-[#C59B27]/40 p-2 bg-[#140D0B] text-[#FAF7F2] shadow-xl">
                      <img
                        src={config.storyContent.secondaryImage}
                        alt={
                          lang === 'bn'
                            ? 'কলকাতা হেরিটেজ ডাইনিং রুম (ডেমো)'
                            : 'Kolkata Heritage Dining Courtyard (Demo)'
                        }
                        loading="lazy"
                        className="w-full h-52 sm:h-64 object-cover"
                      />
                      <p className="text-[11px] text-[#E6C665] mt-2 text-center">
                        {lang === 'bn' ? 'জমিদারি অন্দরমহল (ডেমো)' : 'Courtyard Ambience (Demo)'}
                      </p>
                    </div>

                    <div className="bg-[#7A1C1C] text-[#FAF7F2] p-4 border border-[#C59B27]/40">
                      <p className="font-display text-xl italic text-[#E6C665] mb-1">
                        “অতিথি দেবো ভব”
                      </p>
                      <p className="text-xs text-[#FAF7F2]/85 leading-relaxed">
                        {lang === 'bn'
                          ? 'কলকাতার আন্তরিক আতিথেয়তা ও সাবেকি রান্নার স্বাদ।'
                          : 'Warm Kolkata hospitality where every guest is welcomed like family.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural Timeline: Kolkata -> Family Recipes -> Bengali Cuisine -> Modern Dining */}
            <div className="mt-16 pt-12 border-t border-[#7A1C1C]/15">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {config.storyContent.timeline.map((item) => (
                  <div
                    key={item.stage}
                    className="bg-[#F3EDE2] border border-[#7A1C1C]/15 p-6 relative group hover:border-[#7A1C1C] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#7A1C1C] font-bold">
                        {item.stage}
                      </span>
                      <span className="w-8 h-px bg-[#C59B27]" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#1C1311] mb-1">
                      {lang === 'bn' ? item.titleBn : item.titleEn}
                    </h3>
                    <p className="text-xs font-medium text-[#7A1C1C] mb-2">
                      {lang === 'bn' ? item.titleEn : item.titleBn}
                    </p>
                    <p className="text-sm text-[#5C4942] leading-relaxed">
                      {lang === 'bn' ? item.descBn : item.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: BENGALI CULTURE SECTION ("কলকাতার স্বাদ" / "The Soul of Bengal")
        ===================================================================== */}
        <section className="py-20 md:py-28 bg-[#F3EDE2] border-t border-[#7A1C1C]/15 relative">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7A1C1C] font-semibold mb-2">
                {lang === 'bn'
                  ? 'বাঙালি রন্ধন সংস্কৃতির চার স্তম্ভ'
                  : 'Four Pillars of Bengali Gastronomy'}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1C1311] mb-2">
                {lang === 'bn' ? 'কলকাতার স্বাদ' : 'The Soul of Bengal'}
              </h2>
              <p className="font-display text-2xl text-[#7A1C1C] italic">
                {lang === 'bn' ? 'The Soul of Bengal' : 'কলকাতার স্বাদ'}
              </p>
              <AlpanaDivider className="mt-5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.soulOfBengal.map((pillar) => (
                <article
                  key={pillar.id}
                  className="group bg-[#FAF7F2] border border-[#7A1C1C]/20 hover:border-[#7A1C1C] transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-xl"
                >
                  {/* Image Header */}
                  <div className="h-52 overflow-hidden relative bg-[#140D0B]">
                    <img
                      src={pillar.image}
                      alt={`${pillar.titleEn} - ${pillar.titleBn}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(20, 13, 11, 0.78) 0%, transparent 65%)',
                      }}
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-[#FAF7F2]">
                      <span className="font-display text-3xl font-bold text-[#E6C665]">
                        {pillar.titleBn}
                      </span>
                      <span className="font-display text-xl font-semibold">
                        {pillar.titleEn}
                      </span>
                    </div>
                  </div>

                  {/* Card Body with subtle Patachitra-inspired double border accent */}
                  <div className="p-6 flex-1 flex flex-col justify-between border-t-2 border-double border-[#C59B27]/50">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#7A1C1C] font-semibold mb-2">
                        {pillar.transliteration}
                      </p>
                      <p className="text-sm text-[#1C1311] leading-relaxed mb-4">
                        {pillar.description[lang]}
                      </p>
                    </div>
                    <p className="text-xs text-[#5C4942] italic pt-3 border-t border-[#7A1C1C]/10">
                      {pillar.culinaryDetail[lang]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 8: SIGNATURE DISHES ("আমাদের বিশেষ" / "Our Signatures")
        ===================================================================== */}
        <section className="py-20 md:py-28 bg-[#140D0B] text-[#FAF7F2] relative">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#E6C665] font-semibold mb-2">
                  {lang === 'bn'
                    ? 'শেফের নির্বাচিত সিগনেচার পদ · ডেমো মেনু'
                    : 'Chef’s Crown Jewels · Demo Menu Content'}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FAF7F2]">
                  {lang === 'bn' ? 'আমাদের বিশেষ (Our Signatures)' : 'Our Signatures · আমাদের বিশেষ'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('menu')}
                className="self-start md:self-end inline-flex items-center gap-2 border border-[#C59B27]/60 text-[#E6C665] hover:bg-[#C59B27] hover:text-[#140D0B] px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                <span>{lang === 'bn' ? 'সম্পূর্ণ মেনু দেখুন' : 'View Complete Menu'}</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.signatureDishes.map((sig) => (
                <article
                  key={sig.id}
                  onClick={() => handleOpenDishById(sig.menuItemId)}
                  className="group bg-[#211613] border border-[#C59B27]/30 hover:border-[#C59B27] overflow-hidden flex flex-col cursor-pointer transition-all duration-300 shadow-xl"
                >
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#140D0B]">
                    <img
                      src={sig.image}
                      alt={`${sig.nameEn} - ${sig.nameBn}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(20, 13, 11, 0.9) 0%, rgba(20, 13, 11, 0.15) 55%)',
                      }}
                    />
                    <span className="absolute top-4 left-4 bg-[#7A1C1C] text-[#FAF7F2] border border-[#C59B27]/50 px-3 py-1 text-[11px] uppercase tracking-widest font-medium">
                      {lang === 'bn' ? 'ডেমো সিগনেচার' : 'Demo Signature'}
                    </span>

                    <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-3xl font-semibold text-[#FAF7F2]">
                          {lang === 'bn' ? sig.nameBn : sig.nameEn}
                        </h3>
                        <p className="text-sm text-[#E6C665]">
                          {lang === 'bn' ? sig.nameEn : sig.nameBn}
                        </p>
                      </div>
                      <div className="text-right bg-[#140D0B]/90 border border-[#C59B27]/50 px-3.5 py-1.5">
                        <span className="font-display text-2xl font-bold text-[#E6C665] tabular-nums">
                          ₹{sig.demoPrice}
                        </span>
                        <span className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/70">
                          {lang === 'bn' ? 'ডেমো মূল্য' : 'Demo Price'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#E6C665]/90 mb-2">
                        {sig.subtitle[lang]}
                      </p>
                      <p className="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
                        {sig.description[lang]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#FAF7F2]/10 flex items-center justify-between text-xs text-[#E6C665]">
                      <span className="italic">{sig.pairingNote[lang]}</span>
                      <span className="font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        {lang === 'bn' ? 'বিস্তারিত →' : 'Inspect Dish →'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 12: LIVE-STYLE "TODAY'S SPECIAL" ("আজকের বিশেষ" / "Today's Special")
        ===================================================================== */}
        <section className="py-16 md:py-20 bg-[#F3EDE2] border-y border-[#C59B27]/40">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="bg-[#FAF7F2] border-2 border-[#7A1C1C] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
              <AlpanaCornerOrnament className="absolute top-3 left-3 text-[#7A1C1C] w-9 h-9" />
              <AlpanaCornerOrnament className="absolute bottom-3 right-3 text-[#7A1C1C] w-9 h-9 rotate-180" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Image Column */}
                <div className="lg:col-span-5 relative">
                  <div className="relative h-64 sm:h-80 overflow-hidden border border-[#7A1C1C]/25 bg-[#140D0B]">
                    <img
                      src={config.todaysSpecial.image}
                      alt={config.todaysSpecial.nameEn}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* Animated Live-Style Badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#7A1C1C] text-[#FAF7F2] border border-[#C59B27] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#E6C665] animate-ping" />
                      <span>Today’s Special · আজকের বিশেষ</span>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A1C1C] font-bold">
                    <Sparkles className="w-4 h-4 text-[#C59B27]" />
                    <span>{config.todaysSpecial.badgeText[lang]}</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1311]">
                    {lang === 'bn'
                      ? config.todaysSpecial.nameBn
                      : config.todaysSpecial.nameEn}
                  </h2>
                  <p className="font-display text-xl text-[#7A1C1C] italic">
                    {lang === 'bn'
                      ? config.todaysSpecial.nameEn
                      : config.todaysSpecial.nameBn}
                  </p>

                  <p className="text-sm sm:text-base text-[#5C4942] leading-relaxed">
                    {config.todaysSpecial.description[lang]}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#7A1C1C]/15">
                    <div>
                      <span className="font-display text-3xl font-bold text-[#7A1C1C] tabular-nums">
                        ₹{config.todaysSpecial.demoPrice}
                      </span>
                      <span className="text-xs text-[#5C4942] ml-2">
                        ({config.todaysSpecial.servingInfo[lang]})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenDishById(config.todaysSpecial.menuItemId)}
                        className="px-5 py-3 border border-[#7A1C1C] text-[#7A1C1C] hover:bg-[#7A1C1C] hover:text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                      >
                        {lang === 'bn' ? 'পদের বিবরণ দেখুন' : 'Dish Details'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleBookWithContext(
                            `Requesting Today's Special: ${config.todaysSpecial.nameEn}`
                          )
                        }
                        className="px-5 py-3 bg-[#7A1C1C] hover:bg-[#5E1414] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                      >
                        {lang === 'bn'
                          ? 'আজকের বিশেষ পদের জন্য বুক করুন'
                          : 'Reserve for Today’s Special'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 7: INTERACTIVE MENU
        ===================================================================== */}
        <InteractiveMenuSection
          items={config.menuItems}
          lang={lang}
          selectedItem={selectedMenuItem}
          onSelectItem={setSelectedMenuItem}
          onBookWithDish={(dishName) =>
            handleBookWithContext(`Interested in ordering: ${dishName}`)
          }
        />

        {/* =====================================================================
            SECTION 9: INTERACTIVE "DISCOVER BENGAL" FEATURE
        ===================================================================== */}
        <DiscoverBengalSection
          steps={config.discoverBengal}
          lang={lang}
          onExploreMenu={() => scrollToSection('menu')}
        />

        {/* =====================================================================
            SECTION 10: RESTAURANT EXPERIENCE ("Your Evening at Bengal Heritage")
        ===================================================================== */}
        <section
          id="experience"
          className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#7A1C1C]/10"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7A1C1C] font-semibold mb-2">
                {lang === 'bn'
                  ? 'প্রতিটি উপলক্ষের জন্য রাজকীয় পরিবেশ'
                  : 'Tailored Occasions & Seating'}
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1311] mb-3">
                {lang === 'bn'
                  ? `আপনার সন্ধ্যা, ${config.restaurantNameBengali}-এ`
                  : `Your Evening at ${config.restaurantName}`}
              </h2>
              <p className="text-sm sm:text-base text-[#5C4942]">
                {lang === 'bn'
                  ? 'পারিবারিক নৈশভোজ থেকে শুরু করে রোমান্টিক সন্ধ্যা বা বিজনেস লাঞ্চ—আপনার উপলক্ষ বেছে নিয়ে সরাসরি টেবিল বুকিংয়ে যান।'
                  : 'Whether planning a multi-generational family feast, an intimate candlelit dinner, or an executive business lunch, choose your occasion below.'}
              </p>
              <AlpanaDivider className="mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {config.experiences.map((exp) => (
                <article
                  key={exp.id}
                  className="group bg-[#F3EDE2] border border-[#7A1C1C]/20 hover:border-[#7A1C1C] overflow-hidden flex flex-col sm:flex-row transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden bg-[#140D0B] shrink-0">
                    <img
                      src={exp.image}
                      alt={lang === 'bn' ? exp.titleBn : exp.titleEn}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[11px] uppercase tracking-wider text-[#7A1C1C] font-semibold mb-1">
                        {lang === 'bn' ? exp.occasionTagBn : exp.occasionTagEn}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1311] mb-1">
                        {lang === 'bn' ? exp.titleBn : exp.titleEn}
                      </h3>
                      <p className="text-xs text-[#8A756D] mb-3">
                        {lang === 'bn' ? exp.titleEn : exp.titleBn}
                      </p>
                      <p className="text-sm text-[#5C4942] leading-relaxed mb-4">
                        {lang === 'bn' ? exp.descriptionBn : exp.descriptionEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#7A1C1C]/15 flex items-center justify-between gap-2">
                      <span className="text-xs text-[#1C1311] font-medium">
                        {lang === 'bn' ? exp.seatingNoteBn : exp.seatingNoteEn}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleBookWithContext(
                            `Occasion: ${exp.titleEn} (${exp.titleBn})`,
                            exp.recommendedGuests
                          )
                        }
                        className="shrink-0 px-3.5 py-2 bg-[#7A1C1C] hover:bg-[#5E1414] text-[#FAF7F2] text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                      >
                        {lang === 'bn' ? 'বুক করুন' : 'Select'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 11: GALLERY (Food, Interior, People, Culture + Lightbox)
        ===================================================================== */}
        <section
          id="gallery"
          className="py-20 md:py-28 bg-[#F3EDE2] border-t border-[#7A1C1C]/15"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7A1C1C] font-semibold mb-2">
                {lang === 'bn'
                  ? 'দৃশ্য ও আবহ · ডেমো গ্যালারি'
                  : 'Visual Storytelling · Demo Gallery'}
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1311] mb-3">
                {lang === 'bn' ? 'গ্যালারি ও অন্দরমহল' : 'Moments at Bengal Heritage'}
              </h2>
              <AlpanaDivider className="mt-5" />
            </div>

            {/* Gallery Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { key: 'all', labelEn: 'All Photos', labelBn: 'সব ছবি' },
                { key: 'food', labelEn: 'Food', labelBn: 'খাবার (Food)' },
                { key: 'interior', labelEn: 'Interior', labelBn: 'অন্দরমহল (Interior)' },
                { key: 'people', labelEn: 'People', labelBn: 'আতিথেয়তা (People)' },
                { key: 'culture', labelEn: 'Culture', labelBn: 'সংস্কৃতি (Culture)' },
              ].map((cat) => {
                const isCurr = galleryCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() =>
                      setGalleryCategory(
                        cat.key as 'all' | 'food' | 'interior' | 'people' | 'culture'
                      )
                    }
                    className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold border transition-colors cursor-pointer ${
                      isCurr
                        ? 'bg-[#7A1C1C] text-[#FAF7F2] border-[#7A1C1C]'
                        : 'bg-[#FAF7F2] text-[#1C1311] border-[#7A1C1C]/20 hover:border-[#7A1C1C]'
                    }`}
                  >
                    {lang === 'bn' ? cat.labelBn : cat.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Asymmetric Masonry-Style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxItem(item);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${item.titleEn} in lightbox`}
                  className={`group relative h-72 sm:h-80 overflow-hidden bg-[#140D0B] border border-[#7A1C1C]/20 cursor-pointer ${item.aspectClass}`}
                >
                  <img
                    src={item.image}
                    alt={lang === 'bn' ? item.titleBn : item.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-85 group-hover:opacity-95 transition-opacity"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(20, 13, 11, 0.88) 0%, rgba(20, 13, 11, 0.1) 55%)',
                    }}
                  />
                  <div className="absolute top-3 right-3 w-9 h-9 bg-[#140D0B]/70 text-[#E6C665] border border-[#C59B27]/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 text-[#FAF7F2]">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#E6C665] block mb-1">
                      {item.category.toUpperCase()} · DEMO
                    </span>
                    <h3 className="font-display text-2xl font-semibold leading-snug">
                      {lang === 'bn' ? item.titleBn : item.titleEn}
                    </h3>
                    <p className="text-xs text-[#FAF7F2]/75 mt-1 line-clamp-2">
                      {lang === 'bn' ? item.captionBn : item.captionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Lightbox Modal */}
          {lightboxItem && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Image Lightbox"
              className="fixed inset-0 z-50 bg-[#140D0B]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightboxItem(null)}
            >
              <div
                className="max-w-4xl w-full bg-[#211613] border border-[#C59B27]/50 overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  aria-label="Close lightbox"
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#140D0B]/85 hover:bg-[#7A1C1C] text-[#FAF7F2] border border-[#FAF7F2]/30 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="max-h-[70vh] overflow-hidden bg-[#140D0B] flex items-center justify-center">
                  <img
                    src={lightboxItem.image}
                    alt={lang === 'bn' ? lightboxItem.titleBn : lightboxItem.titleEn}
                    className="w-full max-h-[70vh] object-contain"
                  />
                </div>

                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[#FAF7F2]">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#E6C665]">
                      {lightboxItem.category} · Demo Visual Asset
                    </span>
                    <h3 className="font-display text-2xl font-semibold mt-0.5">
                      {lang === 'bn' ? lightboxItem.titleBn : lightboxItem.titleEn}
                    </h3>
                    <p className="text-sm text-[#FAF7F2]/75 mt-1">
                      {lang === 'bn' ? lightboxItem.captionBn : lightboxItem.captionEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const idx = filteredGallery.findIndex(
                          (g) => g.id === lightboxItem.id
                        );
                        const prev =
                          filteredGallery[
                            (idx - 1 + filteredGallery.length) % filteredGallery.length
                          ];
                        setLightboxItem(prev);
                      }}
                      aria-label="Previous image"
                      className="p-2.5 border border-[#C59B27]/40 hover:bg-[#7A1C1C] text-[#FAF7F2] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const idx = filteredGallery.findIndex(
                          (g) => g.id === lightboxItem.id
                        );
                        const next = filteredGallery[(idx + 1) % filteredGallery.length];
                        setLightboxItem(next);
                      }}
                      aria-label="Next image"
                      className="p-2.5 border border-[#C59B27]/40 hover:bg-[#7A1C1C] text-[#FAF7F2] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* =====================================================================
            SECTION 17: REVIEWS (Clearly Marked as DEMO Sample Placeholders)
        ===================================================================== */}
        <section
          id="reviews"
          className="py-20 md:py-24 bg-[#FAF7F2] border-t border-[#7A1C1C]/15"
        >
          <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 bg-[#7A1C1C]/10 border border-[#7A1C1C]/30 text-[#7A1C1C] text-xs uppercase tracking-widest font-semibold mb-3">
                {lang === 'bn'
                  ? 'ডেমো প্রশংসাপত্র কাঠামো (Sample Demo Testimonials)'
                  : 'Sample Testimonial Layout · Demo Placeholder'}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1311]">
                {lang === 'bn' ? 'অতিথিদের মতামত (ডেমো)' : 'Guest Impressions (Demo)'}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4942] mt-2">
                {lang === 'bn'
                  ? 'দ্রষ্টব্য: নিচের কার্ডগুলো শুধুমাত্র ডিজাইন প্রদর্শনের জন্য রাখা হয়েছে—আসল রেস্তোরাঁর ক্ষেত্রে প্রকৃত গ্রাহকদের রিভিউ বসানো হবে।'
                  : 'Transparency Note: Below are clearly labeled placeholder cards showing how genuine customer reviews will be presented for a real restaurant client.'}
              </p>
            </div>

            <div className="bg-[#F3EDE2] border-2 border-[#7A1C1C]/20 p-8 sm:p-12 relative shadow-md">
              <Quote className="w-10 h-10 text-[#C59B27]/40 mb-4" />

              <div className="inline-block bg-[#7A1C1C] text-[#FAF7F2] px-3 py-1 text-[11px] uppercase tracking-wider font-semibold mb-4">
                {currentReview.placeholderNotice[lang]}
              </div>

              <blockquote className="font-display text-2xl sm:text-3xl text-[#1C1311] italic leading-relaxed mb-6">
                “{currentReview.quote[lang]}”
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[#7A1C1C]/15">
                <div>
                  <p className="font-semibold text-sm text-[#1C1311]">
                    {currentReview.guestRole[lang]}
                  </p>
                  <p className="text-xs text-[#5C4942]">
                    {currentReview.occasion[lang]} · {currentReview.dateLabel[lang]}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveReviewIdx(
                        (prev) =>
                          (prev - 1 + config.reviews.length) % config.reviews.length
                      )
                    }
                    aria-label="Previous demo testimonial"
                    className="w-10 h-10 border border-[#7A1C1C]/30 hover:bg-[#7A1C1C] hover:text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono px-2 text-[#5C4942]">
                    {activeReviewIdx + 1} / {config.reviews.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveReviewIdx((prev) => (prev + 1) % config.reviews.length)
                    }
                    aria-label="Next demo testimonial"
                    className="w-10 h-10 border border-[#7A1C1C]/30 hover:bg-[#7A1C1C] hover:text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 18: KOLKATA CULTURAL VISUAL ("From Kolkata, With Love")
        ===================================================================== */}
        <section className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#7A1C1C]/10 overflow-hidden">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7A1C1C] font-semibold mb-2">
              {lang === 'bn'
                ? 'কলকাতার ঐতিহ্য ও ভালোবাসার শহর'
                : 'City of Joy · Architectural & Culinary Heritage'}
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#1C1311] mb-3">
              {lang === 'bn'
                ? 'কলকাতা থেকে, ভালোবাসায় (From Kolkata, With Love)'
                : 'From Kolkata, With Love'}
            </h2>
            <p className="text-sm sm:text-base text-[#5C4942] max-w-2xl mx-auto mb-8">
              {lang === 'bn'
                ? 'হাওড়া ব্রিজ, ঐতিহ্যবাহী ট্রাম এবং উত্তর কলকাতার ঠাকুরদালান—যে শহরের প্রতিটি গলিতে জড়িয়ে আছে আড্ডা আর খাবারের গল্প।'
                : 'Inspired by the timeless silhouettes of Howrah Bridge, heritage tramways, and colonnaded courtyard mansions that define Kolkata’s timeless soul.'}
            </p>

            {/* Custom Architectural Vector Artwork */}
            <div className="max-w-5xl mx-auto bg-[#F3EDE2]/70 border border-[#7A1C1C]/15 pt-8 px-4 pb-4">
              <KolkataSkylineIllustration />
              <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-widest text-[#7A1C1C]/80 font-medium">
                <span>Howrah Bridge (Rabindra Setu)</span>
                <span>•</span>
                <span>Heritage Kolkata Tramway</span>
                <span>•</span>
                <span>Zamindari Thakurdalan Arches</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 13 & 14: TABLE BOOKING SYSTEM
        ===================================================================== */}
        <TableBookingSection
          config={config}
          lang={lang}
          prefilledNote={bookingPrefillNote}
          prefilledGuests={bookingPrefillGuests}
        />

        {/* =====================================================================
            SECTION 15 & 16: LOCATION ("আমাদের ঠিকানা" / "Find Us") & CONTACT
        ===================================================================== */}
        <section
          id="contact"
          className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#7A1C1C]/15"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-xs uppercase tracking-[0.22em] text-[#7A1C1C] font-semibold mb-2">
                {lang === 'bn'
                  ? 'আমাদের ঠিকানা ও যোগাযোগ · ডেমো তথ্য'
                  : 'Location & Direct Concierge · Demo Info'}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#1C1311] mb-2">
                {lang === 'bn' ? 'আমাদের ঠিকানা (Find Us)' : 'Find Us · আমাদের ঠিকানা'}
              </h2>
              <AlpanaDivider className="mt-5" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
              {/* Left 5 Columns: Demo Kolkata Address, Phone, Hours, Get Directions */}
              <div className="lg:col-span-5 bg-[#F3EDE2] border border-[#7A1C1C]/20 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div className="inline-block bg-[#7A1C1C] text-[#FAF7F2] px-3 py-1 text-[11px] uppercase tracking-widest font-semibold">
                    {lang === 'bn'
                      ? 'ডেমো ঠিকানা ও যোগাযোগ (Demo Details)'
                      : 'Demo Location & Contact Details'}
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#7A1C1C] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#1C1311] mb-1">
                        {lang === 'bn' ? 'রেস্তোরাঁর ঠিকানা (ডেমো)' : 'Kolkata Courtyard Address (Demo)'}
                      </h3>
                      <p className="text-sm text-[#5C4942] leading-relaxed">
                        {config.address[lang]}
                      </p>
                      <p className="text-xs text-[#7A1C1C] font-medium mt-1">
                        {lang === 'bn' ? config.address.landmarkBn : config.address.landmarkEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#7A1C1C] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#1C1311] mb-1">
                        {lang === 'bn' ? 'ফোন এবং হোয়াটসঅ্যাপ (ডেমো)' : 'Phone & WhatsApp (Demo)'}
                      </h3>
                      <p className="text-sm text-[#5C4942] tabular-nums">{config.phone}</p>
                      <p className="text-sm text-[#5C4942] tabular-nums">
                        WhatsApp: {config.whatsapp}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#7A1C1C] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#1C1311] mb-1">
                        {lang === 'bn' ? 'খোলার সময়সূচী' : 'Opening Hours'}
                      </h3>
                      <p className="text-sm text-[#5C4942]">
                        {config.openingHours.lunchLabel[lang]}
                      </p>
                      <p className="text-sm text-[#5C4942]">
                        {config.openingHours.dinnerLabel[lang]}
                      </p>
                      <p className="text-xs text-[#7A1C1C] mt-1">
                        {config.openingHours.daysLabel[lang]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#7A1C1C]/15 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${config.address.googleMapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#7A1C1C] hover:bg-[#5E1414] text-[#FAF7F2] py-3.5 px-5 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#E6C665]" />
                    <span>{lang === 'bn' ? 'দিকনির্দেশ পান (Get Directions)' : 'Get Directions'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                  </a>
                </div>
              </div>

              {/* Right 7 Columns: Interactive Google Maps Embed / Visual Kolkata Map Area */}
              <div className="lg:col-span-7 bg-[#F3EDE2] border border-[#7A1C1C]/20 p-2 flex flex-col">
                <div className="relative flex-1 min-h-[340px] w-full bg-[#140D0B] overflow-hidden">
                  <iframe
                    title="Park Street Kolkata Demo Location Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=88.3460%2C22.5480%2C88.3620%2C22.5580&layer=mapnik&marker=22.5529%2C88.3539"
                    className="w-full h-full min-h-[340px] border-0 filter contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#140D0B]/90 text-[#FAF7F2] border border-[#C59B27]/50 px-3.5 py-2 text-xs shadow-lg max-w-xs">
                    <span className="text-[#E6C665] font-semibold block uppercase tracking-wider text-[10px]">
                      {lang === 'bn' ? 'ডেমো ম্যাপ পিন · পার্ক স্ট্রিট, কলকাতা' : 'Demo Map Pin · Park Street, Kolkata'}
                    </span>
                    <span className="text-[11px] text-[#FAF7F2]/80">
                      {lang === 'bn'
                        ? 'আসল রেস্তোরাঁর ক্ষেত্রে এখানে সরাসরি Google Maps Embed যুক্ত হবে।'
                        : 'Easily replaceable with client’s exact Google Maps place embed.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Channels Grid (Phone, WhatsApp, Instagram, Facebook, Email) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
              {[
                {
                  icon: Phone,
                  labelEn: 'Phone (Demo)',
                  labelBn: 'ফোন (ডেমো)',
                  value: config.phone,
                  href: '#book-table',
                },
                {
                  icon: MessageCircle,
                  labelEn: 'WhatsApp',
                  labelBn: 'হোয়াটসঅ্যাপ',
                  value: config.whatsapp,
                  href: '#book-table',
                },
                {
                  icon: Instagram,
                  labelEn: 'Instagram',
                  labelBn: 'ইনস্টাগ্রাম',
                  value: '@bengalheritage.demo',
                  href: '#gallery',
                },
                {
                  icon: Facebook,
                  labelEn: 'Facebook',
                  labelBn: 'ফেসবুক',
                  value: '/BengalHeritageDemo',
                  href: '#our-story',
                },
                {
                  icon: Mail,
                  labelEn: 'Email (Demo)',
                  labelBn: 'ইমেইল (ডেমো)',
                  value: config.email,
                  href: '#book-table',
                },
              ].map((channel, i) => {
                const IconComponent = channel.icon;
                return (
                  <a
                    key={i}
                    href={channel.href}
                    className="group bg-[#F3EDE2] hover:bg-[#7A1C1C] border border-[#7A1C1C]/15 hover:border-[#C59B27] p-5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 bg-[#FAF7F2] group-hover:bg-[#140D0B] text-[#7A1C1C] group-hover:text-[#E6C665] flex items-center justify-center mb-4 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-[#8A756D] group-hover:text-[#E6C665] font-semibold mb-1">
                        {lang === 'bn' ? channel.labelBn : channel.labelEn}
                      </span>
                      <span className="block text-xs sm:text-sm font-medium text-[#1C1311] group-hover:text-[#FAF7F2] truncate">
                        {channel.value}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Large Conversion CTA Banner: "Reserve Your Table" */}
            <div className="bg-[#140D0B] text-[#FAF7F2] border-2 border-[#C59B27]/60 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-[#E6C665] mb-2">
                {lang === 'bn'
                  ? 'আহারে কলকাতা · রাজকীয় ভোজের আমন্ত্রণ'
                  : 'An Unforgettable Culinary Evening Awaits'}
              </p>
              <h3 className="font-display text-3xl sm:text-5xl font-semibold text-[#FAF7F2] mb-6">
                {lang === 'bn'
                  ? 'আপনার টেবিল আজই সংরক্ষণ করুন'
                  : 'Reserve Your Table'}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('book-table')}
                  className="inline-flex items-center gap-2.5 bg-[#7A1C1C] hover:bg-[#962424] text-[#FAF7F2] border border-[#C59B27] px-8 py-4 text-sm uppercase tracking-widest font-semibold transition-all cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 text-[#E6C665]" />
                  <span>
                    {lang === 'bn' ? 'টেবিল বুক করুন · Reserve Your Table' : 'Reserve Your Table'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('menu')}
                  className="inline-flex items-center gap-2.5 bg-transparent hover:bg-[#FAF7F2]/10 text-[#FAF7F2] border border-[#FAF7F2]/35 px-7 py-4 text-sm uppercase tracking-widest font-medium transition-all cursor-pointer"
                >
                  <UtensilsCrossed className="w-4 h-4 text-[#E6C665]" />
                  <span>{lang === 'bn' ? 'মেনু দেখুন' : 'Explore Menu'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          SECTION 19: SOPHISTICATED FOOTER
      ===================================================================== */}
      <footer className="bg-[#140D0B] text-[#FAF7F2] border-t-2 border-[#C59B27]/40 pt-16 pb-12">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF7F2]/15">
            {/* Col 1: Brand & Tagline */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#C59B27] bg-[#7A1C1C] flex items-center justify-center text-[#E6C665] font-display text-xl font-bold">
                  আ
                </div>
                <div>
                  <span className="block font-display text-2xl font-semibold text-[#FAF7F2]">
                    {config.restaurantName} · {config.restaurantNameBengali}
                  </span>
                  <span className="block text-[11px] uppercase tracking-widest text-[#E6C665]">
                    {lang === 'bn' ? config.brandSubtitleBn : config.brandSubtitleEn}
                  </span>
                </div>
              </div>
              <p className="font-display text-xl italic text-[#E6C665]/90">
                “{lang === 'bn' ? config.taglineBengali : config.tagline}”
              </p>
              <p className="text-xs text-[#FAF7F2]/65 leading-relaxed">
                {lang === 'bn'
                  ? 'এটি একটি পেশাদার ডেমো ওয়েবসাইট কনসেপ্ট। রেস্তোরাঁ মালিকদের জন্য কাস্টম ডিজিটাল অভিজ্ঞতা প্রদর্শনের উদ্দেশ্যে নির্মিত।'
                  : 'A custom restaurant website demonstration showcasing bilingual Bengali/English storytelling, interactive menu architecture, and table reservation flow.'}
              </p>
            </div>

            {/* Col 2: Quick Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#E6C665] font-semibold">
                {lang === 'bn' ? 'নেভিগেশন' : 'Navigation'}
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-sm text-[#FAF7F2]/80">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-[#E6C665] transition-colors"
                    >
                      {lang === 'bn' ? item.labelBn : item.labelEn}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Opening Hours & Address */}
            <div className="lg:col-span-3 space-y-3 text-xs text-[#FAF7F2]/80">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#E6C665] font-semibold">
                {lang === 'bn' ? 'সময়সূচী ও ঠিকানা (ডেমো)' : 'Hours & Location (Demo)'}
              </h4>
              <p>{config.openingHours.lunchLabel[lang]}</p>
              <p>{config.openingHours.dinnerLabel[lang]}</p>
              <p className="text-[#FAF7F2]/60">{config.address[lang]}</p>
              <p className="text-[#E6C665] font-medium tabular-nums">{config.phone}</p>
            </div>

            {/* Col 4: Language Switcher & Socials */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#E6C665] font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ভাষা নির্বাচন' : 'Language'}</span>
              </h4>
              <div className="inline-flex border border-[#C59B27]/50 bg-[#211613] p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`px-3 py-1.5 cursor-pointer ${
                    lang === 'bn'
                      ? 'bg-[#C59B27] text-[#140D0B] font-semibold'
                      : 'text-[#FAF7F2]/80'
                  }`}
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#C59B27] text-[#140D0B] font-semibold'
                      : 'text-[#FAF7F2]/80'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Copyright & Explicit Demo Identification */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/65">
            <p className="font-medium text-[#FAF7F2]/85">
              © 2026 {config.restaurantName} ({config.restaurantNameBengali}) — Demo Website
            </p>
            <p className="text-center sm:text-right">
              {lang === 'bn'
                ? 'প্রদর্শনী ওয়েবসাইট: সমস্ত মেনু মূল্য, ঠিকানা এবং বুকিং তথ্য ডেমো হিসেবে ব্যবহৃত।'
                : 'Demonstration Website Concept: All prices, addresses, and reservations are fictional demo content.'}
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Conversion Bar (View Menu, Book a Table, Call, Location) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#140D0B] border-t border-[#C59B27]/50 grid grid-cols-4 text-[11px] text-[#FAF7F2] shadow-2xl">
        <button
          type="button"
          onClick={() => scrollToSection('menu')}
          className="py-2.5 flex flex-col items-center justify-center gap-1 hover:text-[#E6C665] cursor-pointer"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#E6C665]" />
          <span>{lang === 'bn' ? 'মেনু' : 'Menu'}</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('book-table')}
          className="py-2.5 flex flex-col items-center justify-center gap-1 bg-[#7A1C1C] text-[#FAF7F2] font-semibold cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4 text-[#E6C665]" />
          <span>{lang === 'bn' ? 'বুকিং' : 'Book Table'}</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className="py-2.5 flex flex-col items-center justify-center gap-1 hover:text-[#E6C665] cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#E6C665]" />
          <span>{lang === 'bn' ? 'কল/যোগাযোগ' : 'Contact'}</span>
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className="py-2.5 flex flex-col items-center justify-center gap-1 hover:text-[#E6C665] cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-[#E6C665]" />
          <span>{lang === 'bn' ? 'ঠিকানা' : 'Location'}</span>
        </button>
      </div>

      {/* Live Client Brand Customizer Drawer for Freelancer Presentations */}
      <DemoCustomizerDrawer
        config={config}
        onUpdateConfig={setConfig}
        lang={lang}
      />
    </div>
  );
}
