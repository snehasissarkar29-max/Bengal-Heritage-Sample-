import React, { useEffect, useState } from 'react';
import { ChevronDown, Play, Pause, UtensilsCrossed, CalendarCheck, Sparkles } from 'lucide-react';
import { HeroVideoScene, Language } from '../config/restaurantConfig';

interface HeroVideoSystemProps {
  scenes: HeroVideoScene[];
  lang: Language;
  restaurantNameEn: string;
  restaurantNameBn: string;
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const HeroVideoSystem: React.FC<HeroVideoSystemProps> = ({
  scenes,
  lang,
  restaurantNameEn,
  restaurantNameBn,
  onExploreMenu,
  onBookTable,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoFailedMap, setVideoFailedMap] = useState<Record<string, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion || scenes.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % scenes.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [isPaused, reducedMotion, scenes.length]);

  const activeScene = scenes[activeIndex] || scenes[0];

  const handleVideoError = (sceneId: string) => {
    setVideoFailedMap((prev) => ({ ...prev, [sceneId]: true }));
  };

  return (
    <section
      id="home"
      aria-label={lang === 'bn' ? 'প্রধান প্রদর্শনী বিভাগ' : 'Hero Section'}
      className="relative min-h-screen w-full overflow-hidden bg-[#140D0B] text-[#FAF7F2] flex flex-col justify-between"
    >
      {/* Multi-Scene Video & Poster Background System */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {scenes.map((scene, idx) => {
          const isActive = idx === activeIndex;
          const hasVideoSource = Boolean(scene.videoSources?.webm || scene.videoSources?.mp4);
          const shouldRenderVideo = isActive && hasVideoSource && !videoFailedMap[scene.id];

          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {shouldRenderVideo ? (
                <video
                  key={scene.id}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={scene.posterImage}
                  onError={() => handleVideoError(scene.id)}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: scene.objectPosition || 'center center' }}
                >
                  {scene.videoSources.webm && (
                    <source src={scene.videoSources.webm} type="video/webm" />
                  )}
                  {scene.videoSources.mp4 && (
                    <source src={scene.videoSources.mp4} type="video/mp4" />
                  )}
                </video>
              ) : (
                <img
                  src={scene.posterImage}
                  alt=""
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className={`h-full w-full object-cover ${
                    isActive && !reducedMotion ? 'animate-ken-burns' : ''
                  }`}
                  style={{ objectPosition: scene.objectPosition || 'center center' }}
                />
              )}
            </div>
          );
        })}

        {/* Multi-layered dark cinematic gradient overlay for high-contrast legibility */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              'linear-gradient(180deg, rgba(20, 13, 11, 0.76) 0%, rgba(20, 13, 11, 0.52) 45%, rgba(20, 13, 11, 0.88) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              'radial-gradient(circle at 25% 50%, rgba(122, 28, 28, 0.28) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Top Spacer for Sticky Navigation */}
      <div className="h-28 md:h-32 relative z-30" />

      {/* Main Hero Editorial Content */}
      <div className="relative z-30 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 my-auto py-10 md:py-16">
        <div className="max-w-3xl">
          {/* Heritage Kicker */}
          <div className="inline-flex items-center gap-2.5 border border-[#C59B27]/40 bg-[#140D0B]/60 backdrop-blur-md px-3.5 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#E6C665] font-medium">
              {lang === 'bn'
                ? `${restaurantNameBn} · কলকাতার রাজকীয় রসনাবিলাস (ডেমো)`
                : `${restaurantNameEn} · Fine Dining in Kolkata (Demo Concept)`}
            </span>
          </div>

          {/* Bilingual Display Headline */}
          {lang === 'bn' ? (
            <div>
              <p className="text-sm sm:text-base uppercase tracking-[0.22em] text-[#E6C665]/90 mb-2 font-medium">
                {restaurantNameEn} · A Taste of Bengal
              </p>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#FAF7F2] leading-[1.12] tracking-tight mb-4">
                আহারে কলকাতা
              </h1>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#E6C665] italic mb-6">
                “স্বাদের মধ্যে বাংলার গল্প”
              </p>
            </div>
          ) : (
            <div>
              <p className="font-display text-2xl sm:text-3xl text-[#E6C665] mb-2 tracking-wide">
                আহারে কলকাতা · {restaurantNameEn}
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#FAF7F2] leading-[1.06] tracking-tight mb-4">
                A Taste of Bengal
              </h1>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2]/90 italic mb-6">
                “A story of Bengal in every flavour.”
              </p>
            </div>
          )}

          {/* Supporting Description */}
          <p className="text-base sm:text-lg text-[#FAF7F2]/80 max-w-2xl leading-relaxed mb-9 font-normal">
            {lang === 'bn'
              ? 'শিলে বাটা সর্ষে ইলিশ, ধীমে আঁচে কষা মাংস, সুগন্ধি গোবিন্দভোগ পোলাও এবং মাটির ভাঁড়ের মিষ্টি দই—কলকাতার সাবেকি আতিথেয়তার এক আধুনিক অভিজ্ঞতা।'
              : 'Heirloom recipes from Kolkata’s historic courtyard kitchens—featuring stone-ground Shorshe Ilish, slow-braised Kosha Mangsho, fragrant Gobindobhog rice, and earthen-pot Mishti Doi.'}
          </p>

          {/* Primary Conversion Actions (Always menampilkan Bengali + English cues as requested) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={onExploreMenu}
              className="group inline-flex items-center justify-center gap-3 bg-[#7A1C1C] hover:bg-[#5E1414] text-[#FAF7F2] border border-[#C59B27]/50 px-7 py-4 text-base font-medium transition-all duration-300 shadow-lg cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#E6C665] transition-transform duration-300 group-hover:rotate-12" />
              <span>
                {lang === 'bn' ? 'মেনু দেখুন' : 'View Menu'}
              </span>
              <span className="text-xs opacity-75 font-normal border-l border-[#FAF7F2]/25 pl-2.5">
                {lang === 'bn' ? 'View Menu' : 'মেনু দেখুন'}
              </span>
            </button>

            <button
              type="button"
              onClick={onBookTable}
              className="group inline-flex items-center justify-center gap-3 bg-[#FAF7F2]/10 hover:bg-[#C59B27] hover:text-[#140D0B] text-[#FAF7F2] backdrop-blur-md border border-[#FAF7F2]/35 hover:border-[#C59B27] px-7 py-4 text-base font-medium transition-all duration-300 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#E6C665] group-hover:text-[#140D0B] transition-colors" />
              <span>
                {lang === 'bn' ? 'টেবিল বুক করুন' : 'Book a Table'}
              </span>
              <span className="text-xs opacity-75 font-normal border-l border-current/25 pl-2.5">
                {lang === 'bn' ? 'Book a Table' : 'টেবিল বুক করুন'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Cinematic Scene Switcher & Scroll Indicator */}
      <div className="relative z-30 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 pb-7 pt-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-t border-[#FAF7F2]/15 pt-5">
          {/* Scene Selector Reel */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2.5">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={isPaused ? 'Resume background reel' : 'Pause background reel'}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#E6C665] hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>
                  {lang === 'bn'
                    ? 'সিনেমাটিক দৃশ্য পরিক্রমা'
                    : 'Cinematic Visual Reel'}
                </span>
              </button>
              <span className="text-[#FAF7F2]/30">•</span>
              <span className="text-xs text-[#FAF7F2]/75 truncate">
                {activeScene.subtitle[lang]}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {scenes.map((scene, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`text-left px-3 py-2 border transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'border-[#C59B27] bg-[#7A1C1C]/50 text-[#FAF7F2]'
                        : 'border-[#FAF7F2]/15 bg-[#140D0B]/45 text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:border-[#FAF7F2]/35'
                    }`}
                  >
                    <div className="text-[11px] font-medium truncate">{scene.label[lang]}</div>
                    <div className="mt-1.5 h-0.5 w-full bg-[#FAF7F2]/15 overflow-hidden">
                      <div
                        className={`h-full bg-[#C59B27] transition-all duration-500 ${
                          isCurrent ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subtle Scroll Indicator */}
          <a
            href="#our-story"
            className="hidden sm:inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[#FAF7F2]/75 hover:text-[#E6C665] transition-colors self-end pb-1"
          >
            <span>{lang === 'bn' ? 'নিচে স্ক্রোল করুন' : 'Scroll to Explore'}</span>
            <span className="w-7 h-7 rounded-full border border-[#C59B27]/50 flex items-center justify-center">
              <ChevronDown className="w-3.5 h-3.5 text-[#E6C665] animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
