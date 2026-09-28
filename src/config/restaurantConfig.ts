const heroThaliImg = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=85';
const interiorImg = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85';
const shorsheIlishImg = 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1400&q=85';
const koshaMangshoImg = 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=1400&q=85';
const mishtiDoiImg = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=85';
const biryaniPulaoImg = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1400&q=85';
const chingriMalaiImg = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1400&q=85';
const vegCurryImg = 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1400&q=85';
const drinkCoolerImg = 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=1400&q=85';

export type Language = 'en' | 'bn';

export type MenuCategoryKey = 'vegetarian' | 'fish' | 'meat' | 'rice' | 'desserts' | 'drinks';

export interface BilingualText {
  en: string;
  bn: string;
}

export interface HeroVideoScene {
  id: string;
  label: BilingualText;
  subtitle: BilingualText;
  /**
   * Drop local .mp4 / .webm files in /public/videos/ and reference them here
   * e.g. '/videos/bengali-thali.mp4'. When empty or unavailable, the system
   * automatically renders the high-resolution poster image with cinematic motion.
   */
  videoSources: {
    mp4?: string;
    webm?: string;
  };
  posterImage: string;
  objectPosition?: string;
}

export interface MenuItem {
  id: string;
  category: MenuCategoryKey;
  nameBn: string;
  nameEn: string;
  shortDesc: BilingualText;
  fullDesc: BilingualText;
  demoPrice: number;
  isVeg: boolean;
  isSignature?: boolean;
  prepTimeMins: number;
  spiceLevel: BilingualText;
  ingredients: {
    en: string[];
    bn: string[];
  };
  dietaryNotes: BilingualText;
  image: string;
  imageCrop?: string;
}

export interface SignatureDish {
  id: string;
  menuItemId: string;
  nameBn: string;
  nameEn: string;
  subtitle: BilingualText;
  description: BilingualText;
  demoPrice: number;
  image: string;
  pairingNote: BilingualText;
}

export interface DiscoverStep {
  id: string;
  stepNumber: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  originNoteEn: string;
  originNoteBn: string;
  signatureDishEn: string;
  signatureDishBn: string;
  image: string;
}

export interface ExperienceCard {
  id: string;
  titleEn: string;
  titleBn: string;
  occasionTagEn: string;
  occasionTagBn: string;
  descriptionEn: string;
  descriptionBn: string;
  seatingNoteEn: string;
  seatingNoteBn: string;
  image: string;
  recommendedGuests: number;
}

export interface GalleryItem {
  id: string;
  category: 'food' | 'interior' | 'people' | 'culture';
  titleEn: string;
  titleBn: string;
  captionEn: string;
  captionBn: string;
  image: string;
  aspectClass: string;
}

export interface DemoReview {
  id: string;
  placeholderNotice: BilingualText;
  quote: BilingualText;
  guestRole: BilingualText;
  occasion: BilingualText;
  dateLabel: BilingualText;
}

export interface RestaurantConfig {
  isDemoSite: boolean;
  demoBannerText: BilingualText;
  restaurantName: string;
  restaurantNameBengali: string;
  brandSubtitleEn: string;
  brandSubtitleBn: string;
  tagline: string;
  taglineBengali: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: {
    en: string;
    bn: string;
    landmarkEn: string;
    landmarkBn: string;
    googleMapsQuery: string;
  };
  openingHours: {
    lunchLabel: BilingualText;
    dinnerLabel: BilingualText;
    daysLabel: BilingualText;
    validTimeSlots: string[];
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    whatsappUrl: string;
  };
  themeColors: {
    primaryBurgundy: string;
    accentGold: string;
    warmCanvas: string;
    darkMahogany: string;
  };
  heroVideos: HeroVideoScene[];
  todaysSpecial: {
    badgeText: BilingualText;
    nameEn: string;
    nameBn: string;
    description: BilingualText;
    demoPrice: number;
    servingInfo: BilingualText;
    image: string;
    menuItemId: string;
  };
  storyContent: {
    headingEn: string;
    headingBn: string;
    kickerEn: string;
    kickerBn: string;
    leadParagraph: BilingualText;
    secondParagraph: BilingualText;
    demoDisclaimer: BilingualText;
    primaryImage: string;
    secondaryImage: string;
    timeline: Array<{
      stage: string;
      titleEn: string;
      titleBn: string;
      descEn: string;
      descBn: string;
    }>;
  };
  soulOfBengal: Array<{
    id: string;
    titleBn: string;
    titleEn: string;
    transliteration: string;
    description: BilingualText;
    culinaryDetail: BilingualText;
    image: string;
  }>;
  signatureDishes: SignatureDish[];
  discoverBengal: DiscoverStep[];
  experiences: ExperienceCard[];
  menuItems: MenuItem[];
  galleryImages: GalleryItem[];
  reviews: DemoReview[];
}

/**
 * ============================================================================
 * CENTRAL CUSTOMIZATION CONFIGURATION FOR CLIENT PROJECTS
 * ============================================================================
 * Replace the values below to adapt this template for a real restaurant client.
 */
export const DEFAULT_RESTAURANT_CONFIG: RestaurantConfig = {
  isDemoSite: true,
  demoBannerText: {
    en: 'DEMO CONCEPT WEBSITE · Created to showcase a custom digital experience for Kolkata restaurants. All prices, addresses & bookings are demonstration content.',
    bn: 'ডেমো ওয়েবসাইট কনসেপ্ট · কলকাতার রেস্তোরাঁর জন্য তৈরি একটি প্রদর্শনী সংস্করণ। সমস্ত মূল্য, ঠিকানা এবং বুকিং তথ্য শুধুমাত্র ডেমো হিসেবে ব্যবহৃত।',
  },
  restaurantName: 'Bengal Heritage',
  restaurantNameBengali: 'আহারে কলকাতা',
  brandSubtitleEn: 'Fine Bengali Dining · Kolkata (Demo)',
  brandSubtitleBn: 'ঐতিহ্যবাহী বাঙালি রসনাবিলাস · কলকাতা (ডেমো)',
  tagline: 'A story of Bengal in every flavour.',
  taglineBengali: 'স্বাদের মধ্যে বাংলার গল্প',
  phone: '+91 33 0000 0000 (Demo)',
  whatsapp: '+91 98000 00000 (Demo)',
  email: 'reservations@bengalheritage-demo.example',
  address: {
    en: '24B Park Street Courtyard, Near Heritage Mansion Row, Kolkata 700016 (DEMO ADDRESS)',
    bn: '২৪বি পার্ক স্ট্রিট কোর্টইয়ার্ড, হেরিটেজ ম্যানসন রো, কলকাতা ৭০০০১৬ (ডেমো ঠিকানা)',
    landmarkEn: 'Demo Heritage Courtyard · Valet Parking Available',
    landmarkBn: 'ডেমো হেরিটেজ প্রাঙ্গণ · ভ্যালেট পার্কিং উপলব্ধ',
    googleMapsQuery: 'Park+Street+Kolkata+West+Bengal+India',
  },
  openingHours: {
    lunchLabel: {
      en: 'Lunch: 12:00 PM – 3:30 PM',
      bn: 'মধ্যাহ্নভোজ: দুপুর ১২:০০ – বিকেল ৩:৩০',
    },
    dinnerLabel: {
      en: 'Dinner: 6:30 PM – 10:45 PM',
      bn: 'নৈশভোজ: সন্ধ্যা ৬:৩০ – রাত ১০:৪৫',
    },
    daysLabel: {
      en: 'Open Tuesday to Sunday (Monday Closed for Spice Grinding)',
      bn: 'মঙ্গলবার থেকে রবিবার খোলা (সোমবার মশলা প্রস্তুতির জন্য বন্ধ)',
    },
    validTimeSlots: [
      '12:00 PM (Lunch)',
      '12:30 PM (Lunch)',
      '01:00 PM (Lunch)',
      '01:30 PM (Lunch)',
      '02:00 PM (Lunch)',
      '02:30 PM (Lunch)',
      '06:30 PM (Dinner)',
      '07:00 PM (Dinner)',
      '07:30 PM (Dinner)',
      '08:00 PM (Dinner)',
      '08:30 PM (Dinner)',
      '09:00 PM (Dinner)',
      '09:30 PM (Dinner)',
      '10:00 PM (Dinner)',
    ],
  },
  socialLinks: {
    instagram: '#contact',
    facebook: '#contact',
    whatsappUrl: '#book-table',
  },
  themeColors: {
    primaryBurgundy: '#7A1C1C',
    accentGold: '#C59B27',
    warmCanvas: '#FAF7F2',
    darkMahogany: '#140D0B',
  },
  heroVideos: [
    {
      id: 'scene-thali',
      label: {
        en: '01. Royal Kansa Thali',
        bn: '০১. রাজকীয় কাঁসার থালি',
      },
      subtitle: {
        en: 'Heirloom brass platters arranged with multi-course Bengali delicacies',
        bn: 'কাঁসার থালায় সাজানো বহু পদের ঐতিহ্যবাহী বাঙালি ভোজ',
      },
      videoSources: {
        // Drop local file e.g. '/videos/bengali-thali.mp4' when deploying for client
      },
      posterImage: heroThaliImg,
      objectPosition: 'center center',
    },
    {
      id: 'scene-interior',
      label: {
        en: '02. Zamindari Courtyard',
        bn: '০২. জমিদারি অন্দরমহল',
      },
      subtitle: {
        en: 'Louvred teakwood shutters, warm brass lanterns, and quiet heritage luxury',
        bn: 'সেগুন কাঠের খড়খড়ি, পিতলের প্রদীপ এবং শান্ত ঐতিহ্যবাহী পরিবেশ',
      },
      videoSources: {},
      posterImage: interiorImg,
      objectPosition: 'center center',
    },
    {
      id: 'scene-fish',
      label: {
        en: '03. Traditional Fish Preparation',
        bn: '০৩. সর্ষে ইলিশের প্রস্তুতি',
      },
      subtitle: {
        en: 'River Hilsa poached slowly in freshly stone-ground mustard & green chilli',
        bn: 'শিলে বাটা সর্ষে ও কাঁচালঙ্কায় ধীমে আঁচে রান্না পদ্মার ইলিশ',
      },
      videoSources: {},
      posterImage: shorsheIlishImg,
      objectPosition: 'center center',
    },
    {
      id: 'scene-chef-kosha',
      label: {
        en: '04. Slow-Braised Culinary Craft',
        bn: '০৪. কষা মাংসের রন্ধনশিল্প',
      },
      subtitle: {
        en: 'Hours of patient caramelization with whole spices and fragrant Gobindobhog rice',
        bn: 'গোটা গরম মশলা ও গোবিন্দভোগ চালের সুবাসে দীর্ঘ সময় ধরে কষানো রান্না',
      },
      videoSources: {},
      posterImage: koshaMangshoImg,
      objectPosition: 'center center',
    },
    {
      id: 'scene-sweets',
      label: {
        en: '05. Artisanal Mishti & Clay Pots',
        bn: '০৫. মাটির ভাঁড়ে মিষ্টি দই ও সন্দেশ',
      },
      subtitle: {
        en: 'Caramelized earthen-pot yogurt and Nolen Gur confections crafted daily',
        bn: 'প্রতিদিন তৈরি মাটির হাঁড়ির মিষ্টি দই এবং নলেন গুড়ের সন্দেশ',
      },
      videoSources: {},
      posterImage: mishtiDoiImg,
      objectPosition: 'center center',
    },
  ],
  todaysSpecial: {
    badgeText: {
      en: "Today's Special · Demo Featured Dish",
      bn: 'আজকের বিশেষ · ডেমো স্পেশাল পদ',
    },
    nameEn: 'Zamindari Daab Chingri (Jumbo Prawns in Tender Coconut)',
    nameBn: 'জমিদারি ডাব চিংড়ি',
    description: {
      en: 'Freshwater golda prawns simmered in tender coconut water, delicate mustard cream, and sweet malai, sealed inside a green coconut shell and slow-baked in our kitchen. (Demo Special)',
      bn: 'কচি ডাবের শাঁস, ডাবের জল ও হালকা সর্ষে-মালাই বাটায় মাখানো গলদা চিংড়ি—ডাবের ভেতরে মুখ বন্ধ করে ধীমে আঁচে দমে রান্না। (ডেমো বিশেষ পদ)',
    },
    demoPrice: 790,
    servingInfo: {
      en: 'Serves 1–2 · Accompanied by steamed Gobindobhog rice · Demo Price',
      bn: '১–২ জনের জন্য উপযুক্ত · সাথে গরম গোবিন্দভোগ ভাত · ডেমো মূল্য',
    },
    image: chingriMalaiImg,
    menuItemId: 'fish-daab-chingri',
  },
  storyContent: {
    headingEn: 'A Story. A Flavour.',
    headingBn: 'একটি গল্প, এক স্বাদ',
    kickerEn: 'Our Fictional Culinary Inspiration · Demo Concept',
    kickerBn: 'আমাদের রন্ধন ভাবনা · ডেমো সংস্করণ',
    leadParagraph: {
      en: 'Conceived as a tribute to Kolkata’s timeless dining rooms, Bengal Heritage (আহারে কলকাতা) celebrates the quiet poetry of Bengali home and courtyard kitchens—where recipes are measured not by timers, but by the aroma of tempered radhuni, roasted panch phoron, and golden mustard oil.',
      bn: 'কলকাতার চিরন্তন ভোজনরসিক ঐতিহ্যকে সম্মান জানিয়ে "আহারে কলকাতা" (Bengal Heritage)-এর ভাবনা। বাঙালির রান্নাঘরের সেই চিরচেনা ঘ্রাণ—যেখানে সময়ের চেয়ে পাঁচফোড়ন, রাঁধুনি আর খাঁটি সর্ষের তেলের সুবাসেই রান্নার পূর্ণতা মাপা হয়।',
    },
    secondParagraph: {
      en: 'From the first crisp bite of warm Luchi and Begun Bhaja to the velvety finish of earthen-pot Mishti Doi, our demo concept pairs ancestral cooking techniques with warm, contemporary hospitality in the heart of Kolkata.',
      bn: 'গরম ফুলকো লুচি ও বেগুন ভাজা থেকে শুরু করে মাটির ভাঁড়ের মিষ্টি দই—আমাদের এই ডেমো রেস্তোরাঁয় সাবেকি রন্ধনশৈলীর সাথে আধুনিক আতিথেয়তার এক অনন্য মেলবন্ধন ঘটানো হয়েছে।',
    },
    demoDisclaimer: {
      en: 'Note: This story is fictional and created for website demonstration purposes to illustrate editorial storytelling for restaurant owners.',
      bn: 'দ্রষ্টব্য: এই বিবরণটি কাল্পনিক এবং শুধুমাত্র রেস্তোরাঁর ওয়েবসাইট ডেমো প্রদর্শনের উদ্দেশ্যে রচিত।',
    },
    primaryImage: heroThaliImg,
    secondaryImage: interiorImg,
    timeline: [
      {
        stage: '01',
        titleEn: 'Kolkata',
        titleBn: 'কলকাতা',
        descEn: 'Inspired by the architectural warmth of North and Central Kolkata courtyard houses and afternoon adda.',
        descBn: 'উত্তর ও মধ্য কলকাতার সাবেকি ঠাকুরদালান এবং আন্তরিক আড্ডার আবহ থেকে অনুপ্রাণিত।',
      },
      {
        stage: '02',
        titleEn: 'Family Recipes',
        titleBn: 'পারিবারিক রন্ধনপ্রণালী',
        descEn: 'Honouring slow-cooked heirloom techniques passed across generations of Bengali home kitchens.',
        descBn: 'প্রজন্মের পর প্রজন্ম ধরে চলে আসা বাঙালি বাড়ির ধীমে আঁচে রান্নার ঘরোয়া কৌশল।',
      },
      {
        stage: '03',
        titleEn: 'Bengali Cuisine',
        titleBn: 'বাঙালি রসনাবিলাস',
        descEn: 'A delicate progression from bitter (Shukto) to tangy, spiced gravies, and artisanal milk sweets.',
        descBn: 'শুক্তোর তিতো থেকে শুরু করে সর্ষে-পোস্ত, কষা মাংস এবং শেষে মিষ্টির এক পরিপূর্ণ ভোজের ক্রম।',
      },
      {
        stage: '04',
        titleEn: 'Modern Dining',
        titleBn: 'আধুনিক আতিথেয়তা',
        descEn: 'Presented on handcrafted Kansa bronze tableware with attentive, unhurried fine-dining service.',
        descBn: 'হাতে তৈরি কাঁসার বাসনে পরিবেশন এবং আধুনিক ও আন্তরিক আতিথেয়তার অভিজ্ঞতা।',
      },
    ],
  },
  soulOfBengal: [
    {
      id: 'soul-fish',
      titleBn: 'মাছ',
      titleEn: 'Fish',
      transliteration: 'Maach · River & Estuary Bounty',
      description: {
        en: 'From prized monsoon Hilsa (Ilish) to sweet-water Rohu, Bhetki, and Golda Chingri, river fish lies at the heart of Kolkata’s culinary identity.',
        bn: 'বর্ষার রুপোলি ইলিশ থেকে শুরু করে রুই, কাতলা, ভেটকি ও গলদা চিংড়ি—নদীমাতৃক বাংলার আত্মার সাথে জড়িয়ে আছে মাছের স্বাদ।',
      },
      culinaryDetail: {
        en: 'Poached in mustard, steamed in banana leaf (Paturi), or simmered in light cumin broth.',
        bn: 'সর্ষে বাটা, কলাপাতায় পাতুরি কিংবা জিরে-আদা বাটার হালকা ঝোল।',
      },
      image: shorsheIlishImg,
    },
    {
      id: 'soul-spices',
      titleBn: 'মশলা',
      titleEn: 'Spices',
      transliteration: 'Moshla · Delicate Aromatics',
      description: {
        en: 'Guided by Panch Phoron (five-seed tempering), nutty poppy seeds (Posto), pungent yellow & black mustard, and aromatic Gondhoraj lime.',
        bn: 'পাঁচফোড়নের ফোড়ন, পোস্ত বাটা, কালো ও সাদা সর্ষের ঝাঁঝ এবং গন্ধরাজ লেবুর সতেজ সুবাসে অনন্য বাঙালি রান্না।',
      },
      culinaryDetail: {
        en: 'Freshly ground on stone (Shil-Nora) to preserve volatile oils and subtle warmth.',
        bn: 'শিল-নোড়ায় বাটা টাটকা মশলার স্বাদ ও ঘ্রাণ।',
      },
      image: koshaMangshoImg,
    },
    {
      id: 'soul-sweets',
      titleBn: 'মিষ্টি',
      titleEn: 'Sweets',
      transliteration: 'Mishti · Chhena & Nolen Gur Craft',
      description: {
        en: 'Kolkata’s legendary confectionary heritage built on delicate fresh cottage cheese (Chhena), smoky winter date-palm jaggery, and slow-reduced milk.',
        bn: 'টাটকা ছানা, শীতের নলেন গুড় এবং মাটির হাঁড়ির ঘন ক্ষীরের দই নিয়ে কলকাতার বিশ্বজোড়া মিষ্টির ঐতিহ্য।',
      },
      culinaryDetail: {
        en: 'Mishti Doi set in unglazed terracotta pots that wick moisture for a rich, creamy texture.',
        bn: 'মাটির ভাঁড়ে বসানো জমাট বাঁধা লালচে মিষ্টি দই ও নরম পাকের সন্দেশ।',
      },
      image: mishtiDoiImg,
    },
    {
      id: 'soul-rice',
      titleBn: 'ভাত',
      titleEn: 'Rice',
      transliteration: 'Bhaat · Fragrant Short-Grain Harvest',
      description: {
        en: 'Short-grain heirloom Gobindobhog rice—naturally buttery and aromatic—forms the canvas for golden Basanti Pulao, Bhoger Khichuri, and steamed platters.',
        bn: 'সুগন্ধি ছোট দানার গোবিন্দভোগ চাল—যার মনমাতানো সুবাসে তৈরি হয় বাসন্তী পোলাও, ভোগের খিচুড়ি ও গরম ভাতের থালি।',
      },
      culinaryDetail: {
        en: 'Tossed with clarified cow’s ghee, whole green cardamom, cashews, and golden raisins.',
        bn: 'খাঁটি গাওয়া ঘি, ছোট এলাচ, কাজু ও কিশমিশের মেলবন্ধন।',
      },
      image: biryaniPulaoImg,
    },
  ],
  signatureDishes: [
    {
      id: 'sig-1',
      menuItemId: 'fish-shorshe-ilish',
      nameBn: 'সর্ষে ইলিশ',
      nameEn: 'Shorshe Ilish',
      subtitle: {
        en: 'Monsoon Hilsa in Stone-Ground Mustard · Demo Signature',
        bn: 'শিলে বাটা সর্ষে ও কাঁচালঙ্কায় ইলিশ · ডেমো সিগনেচার পদ',
      },
      description: {
        en: 'Prime cut of bone-in river Hilsa gently poached in an emulsion of yellow and black mustard seeds, green chillies, and cold-pressed pungent mustard oil.',
        bn: 'কালো ও সাদা সর্ষে বাটা, চেরা কাঁচালঙ্কা এবং খাঁটি কাঁচা সর্ষের তেলের ঝাঁঝালো স্বাদে রান্না করা বাছাই করা ইলিশ মাছের পেটি ও গাদা।',
      },
      demoPrice: 740,
      image: shorsheIlishImg,
      pairingNote: {
        en: 'Traditionally paired with steaming hot Gobindobhog plain rice',
        bn: 'গরম ধোঁয়া ওঠা সাদা ভাতের সাথে পরিবেশনযোগ্য',
      },
    },
    {
      id: 'sig-2',
      menuItemId: 'meat-kosha-mangsho',
      nameBn: 'কষা মাংস',
      nameEn: 'Kosha Mangsho',
      subtitle: {
        en: 'Slow-Braised Heirloom Mutton Curry · Demo Signature',
        bn: 'ধীমে আঁচে দীর্ঘক্ষণ কষানো খাসির মাংস · ডেমো সিগনেচার পদ',
      },
      description: {
        en: 'Tender bone-in goat meat marinated in hung curd and caramelized onions, slow-braised over low heat for three hours until the gravy turns dark mahogany and velvety.',
        bn: 'টক দই, পেঁয়াজ বেরেস্তা ও গোটা গরম মশলায় ম্যারিনেট করে কম আঁচে দীর্ঘ সময় ধরে কষানো নরম খাসির মাংস।',
      },
      demoPrice: 680,
      image: koshaMangshoImg,
      pairingNote: {
        en: 'Best enjoyed with golden Luchi or fragrant Basanti Pulao',
        bn: 'ফুলকো লুচি অথবা বাসন্তী পোলাওয়ের সাথে অতুলনীয়',
      },
    },
    {
      id: 'sig-3',
      menuItemId: 'rice-basanti-pulao',
      nameBn: 'বাসন্তী পোলাও',
      nameEn: 'Basanti Pulao',
      subtitle: {
        en: 'Saffron & Turmeric Gobindobhog Rice · Demo Signature',
        bn: 'ঘি, কাজু ও কিশমিশে সুবাসিত গোবিন্দভোগ পোলাও · ডেমো সিগনেচার পদ',
      },
      description: {
        en: 'Aged short-grain Gobindobhog rice infused with pure cow’s ghee, saffron strands, crushed nutmeg, cinnamon bark, roasted cashews, and sweet raisins.',
        bn: 'পুরনো গোবিন্দভোগ চালে গাওয়া ঘি, জাফরান, দারুচিনি, লবঙ্গ, ভাজা কাজু ও কিশমিশ সহযোগে তৈরি মিষ্টি সুবাসের পোলাও।',
      },
      demoPrice: 360,
      image: biryaniPulaoImg,
      pairingNote: {
        en: 'The classic festive companion to Kosha Mangsho or Chhanar Dalna',
        bn: 'কষা মাংস বা ছানার ডালনার সাথে সাবেকি যুগলবন্দি',
      },
    },
    {
      id: 'sig-4',
      menuItemId: 'dessert-mishti-doi',
      nameBn: 'মাটির ভাঁড়ে মিষ্টি দই',
      nameEn: 'Matir Bhare Mishti Doi',
      subtitle: {
        en: 'Caramelized Earthen-Pot Yogurt · Demo Signature',
        bn: 'ঐতিহ্যবাহী মাটির ভাঁড়ে বসানো মিষ্টি দই · ডেমো সিগনেচার পদ',
      },
      description: {
        en: 'Full-cream milk reduced to half with palm jaggery and caramelized sugar, cultured overnight in porous terracotta clay cups for a dense, silky finish.',
        bn: 'ঘন দুধ ও গুড় জাল দিয়ে মাটির ভাঁড়ে সারারাত ধরে পাতা মাখনের মতো মসৃণ ও সুস্বাদু মিষ্টি দই।',
      },
      demoPrice: 210,
      image: mishtiDoiImg,
      pairingNote: {
        en: 'Served chilled alongside warm Nolen Gurer Sandesh',
        bn: 'নলেন গুড়ের সন্দেশের সাথে ঠান্ডা পরিবেশন',
      },
    },
  ],
  discoverBengal: [
    {
      id: 'step-hilsa',
      stepNumber: '01',
      titleEn: 'Hilsa (Ilish)',
      titleBn: 'ইলিশ (Hilsa)',
      subtitleEn: 'The Silver Pride of the Ganges Delta',
      subtitleBn: 'পদ্মা ও গঙ্গার রুপোলি শস্য',
      descriptionEn: 'Celebrated across Bengal whenever the monsoon clouds gather over Kolkata. Prized for its delicate, butter-soft texture that melts into spicy mustard or smoky steamed banana leaves.',
      descriptionBn: 'বর্ষার মেঘ জমলেই বাঙালির পাতে ইলিশের উৎসব শুরু হয়। কলাপাতায় ভাপা পাতুরি হোক বা সর্ষে ইলিশ—এর মাখনের মতো নরম স্বাদই বাংলার রসনাবিলাসের মুকুটমণি।',
      originNoteEn: 'Estuarine Waters · Monsoon & Autumn Harvest',
      originNoteBn: 'মোহনার ইলিশ · বর্ষা ও শরতের ঐতিহ্য',
      signatureDishEn: 'Shorshe Ilish & Ilish Paturi (Demo)',
      signatureDishBn: 'সর্ষে ইলিশ ও ইলিশ পাতুরি (ডেমো)',
      image: shorsheIlishImg,
    },
    {
      id: 'step-mustard',
      stepNumber: '02',
      titleEn: 'Mustard & Posto',
      titleBn: 'সর্ষে ও পোস্ত',
      subtitleEn: 'Pungent Gold & Velvety Poppy Seeds',
      subtitleBn: 'ঝাঁঝালো সর্ষে এবং মালাইদার পোস্ত বাটা',
      descriptionEn: 'Unlike heavy cream-based gravies, authentic Bengali kitchens build depth from freshly ground black and yellow mustard seeds, balanced by cooling white poppy seed (Posto) paste and cold-pressed Kachi Ghani oil.',
      descriptionBn: 'বাঙালি রান্নার আসল জাদু লুকিয়ে আছে শিলে বাটা কালো ও সাদা সর্ষের ঝাঁঝে এবং পোস্ত বাটার স্নিগ্ধতায়—যার সাথে মেশে খাঁটি কাঁচা সর্ষের তেলের ঘ্রাণ।',
      originNoteEn: 'Stone-Ground Daily · Zero Artificial Thickeners',
      originNoteBn: 'প্রতিদিন শিলে বাটা · কৃত্রিম উপাদানমুক্ত',
      signatureDishEn: 'Aloo Posto & Bhetki Paturi (Demo)',
      signatureDishBn: 'আলু পোস্ত ও ভেটকি পাতুরি (ডেমো)',
      image: koshaMangshoImg,
    },
    {
      id: 'step-rice',
      stepNumber: '03',
      titleEn: 'Gobindobhog Rice',
      titleBn: 'গোবিন্দভোগ চাল',
      subtitleEn: 'Heirloom Short-Grain Aroma of Bardhaman',
      subtitleBn: 'বর্ধমানের সুগন্ধি ছোট দানার চাল',
      descriptionEn: 'Cultivated in the fertile plains of Bengal, tiny pearl-white Gobindobhog grains release an unmistakable natural aroma that anchors everything from ceremonial Basanti Pulao to comforting Moong Dal Khichuri.',
      descriptionBn: 'বাংলার উর্বর মাটিতে ফলা ছোট মুক্তোর মতো গোবিন্দভোগ চাল—যার প্রাকৃতিক সুগন্ধে বাসন্তী পোলাও থেকে শুরু করে মুগ ডালের খিচুড়ি হয়ে ওঠে অমৃতসমান।',
      originNoteEn: 'GI-Heritage Grain · Clarified Ghee Tempering',
      originNoteBn: 'বাংলার নিজস্ব শস্য · খাঁটি গাওয়া ঘিয়ের ফোড়ন',
      signatureDishEn: 'Basanti Pulao & Royal Kansa Thali (Demo)',
      signatureDishBn: 'বাসন্তী পোলাও ও রাজকীয় কাঁসার থালি (ডেমো)',
      image: heroThaliImg,
    },
    {
      id: 'step-sweets',
      stepNumber: '04',
      titleEn: 'Artisanal Sweets',
      titleBn: 'বাংলার মিষ্টি',
      subtitleEn: 'Terracotta Mishti Doi & Nolen Gur Sandesh',
      subtitleBn: 'মাটির ভাঁড়ের দই ও নলেন গুড়ের সন্দেশ',
      descriptionEn: 'No meal in Kolkata is complete without Mishtiukh. Hand-kneaded fresh Chhena and smoky winter date-palm jaggery (Nolen Gur) create confections that are delicate, lightly sweet, and deeply nostalgic.',
      descriptionBn: 'শেষ পাতে মিষ্টিমুখ ছাড়া বাঙালির ভোজ অসম্পূর্ণ। টাটকা ছানার নরম পাক আর শীতের খেজুর গুড়ের জাদুতে তৈরি সন্দেশ ও মিষ্টি দই প্রতিটি ভোজকে পূর্ণতা দেয়।',
      originNoteEn: 'Unglazed Clay Pots · Small-Batch Confectionery',
      originNoteBn: 'পোড়ামাটির হাঁড়ি · প্রতিদিন তাজা ছানায় তৈরি',
      signatureDishEn: 'Matir Bhare Mishti Doi & Baked Rosogolla (Demo)',
      signatureDishBn: 'মাটির ভাঁড়ে মিষ্টি দই ও বেকড রসগোল্লা (ডেমো)',
      image: mishtiDoiImg,
    },
  ],
  experiences: [
    {
      id: 'exp-family',
      titleEn: 'Family Dinner',
      titleBn: 'পারিবারিক নৈশভোজ',
      occasionTagEn: 'Multi-Generational Sharing · Brass Thalis',
      occasionTagBn: 'সপরিবারে আনন্দভোজ · ঐতিহ্যবাহী থালি',
      descriptionEn: 'Spacious teakwood tables designed for unhurried family gatherings over shared Kansa platters, comforting dal, crisp bhajas, and classic fish delicacies.',
      descriptionBn: 'পরিবারের সকলে মিলে একসাথে বসে গল্প ও আড্ডার সাথে কাঁসার থালায় সাজানো বাঙালি পদের স্বাদ নেওয়ার প্রশস্ত ও আরামদায়ক ব্যবস্থা।',
      seatingNoteEn: 'Tables for 4–10 guests · Kid & Senior friendly seating',
      seatingNoteBn: '৪–১০ জনের টেবিল · প্রবীণ ও শিশুদের জন্য আরামদায়ক আসন',
      image: heroThaliImg,
      recommendedGuests: 4,
    },
    {
      id: 'exp-romantic',
      titleEn: 'Romantic Evening',
      titleBn: 'রোমান্টিক সন্ধ্যা',
      occasionTagEn: 'Candlelit Courtyard · Quiet Acoustic Instrumental',
      occasionTagBn: 'প্রদীপের আলোয় নিভৃত সন্ধ্যা · সরোদের সুর',
      descriptionEn: 'Intimate corner alcoves framed by louvered wooden shutters, soft brass lantern glow, and a curated tasting menu for two with artisanal mocktails and desserts.',
      descriptionBn: 'হালকা প্রদীপের আলো, সেতার ও সরোদের মৃদু সুর এবং দুজনের জন্য বিশেষভাবে সাজানো টেস্টিং মেনুতে এক স্মরণীয় সন্ধ্যা।',
      seatingNoteEn: 'Intimate 2-guest courtyard tables · Advance request available',
      seatingNoteBn: '২ জনের নিভৃত কর্নার টেবিল · অগ্রিম বুকিং উপলব্ধ',
      image: interiorImg,
      recommendedGuests: 2,
    },
    {
      id: 'exp-celebration',
      titleEn: 'Celebration & Milestones',
      titleBn: 'উৎসব ও বিশেষ উদযাপন',
      occasionTagEn: 'Anniversaries · Birthdays · Jamai Sasthi & Poila Boishakh',
      occasionTagBn: 'জন্মদিন · বিবাহবার্ষিকী · পয়লা বৈশাখ ও জামাই ষষ্ঠী',
      descriptionEn: 'Celebrate life’s milestones with custom festive menus, traditional Alpana table welcome, whole-fish presentations, and bespoke sweet platters.',
      descriptionBn: 'জন্মদিন, বিবাহবার্ষিকী বা যেকোনো পারিবারিক উৎসবে আলপনা সাজানো টেবিল ও বিশেষ ভোজের রাজকীয় আয়োজন।',
      seatingNoteEn: 'Private dining salon up to 16 guests (Demo)',
      seatingNoteBn: '১৬ জন পর্যন্ত প্রাইভেট ডাইনিং ব্যবস্থা (ডেমো)',
      image: mishtiDoiImg,
      recommendedGuests: 6,
    },
    {
      id: 'exp-business',
      titleEn: 'Business Lunch',
      titleBn: 'বিজনেস লাঞ্চ',
      occasionTagEn: 'Executive Kansa Platter · 45-Minute Express Option',
      occasionTagBn: 'এক্সিকিউটিভ থালি · মার্জিত ও শান্ত পরিবেশ',
      descriptionEn: 'Host visiting colleagues and clients in a refined setting that showcases Kolkata’s culinary sophistication with attentive, time-conscious table service.',
      descriptionBn: 'ব্যবসায়িক অতিথি বা সহকর্মীদের সাথে শান্ত পরিবেশে কলকাতার সেরা পদের স্বাদ নেওয়ার জন্য বিশেষ এক্সিকিউটিভ লাঞ্চ।',
      seatingNoteEn: 'Weekdays 12:00 PM – 3:30 PM · Quiet table zones',
      seatingNoteBn: 'দুপুর ১২:০০ – ৩:৩০ · নিরিবিলি সিটিং জোন',
      image: koshaMangshoImg,
      recommendedGuests: 3,
    },
  ],
  menuItems: [
    // VEGETARIAN (নিরামিষ)
    {
      id: 'veg-shukto',
      category: 'vegetarian',
      nameBn: 'সাবেকি শুক্তো',
      nameEn: 'Sabeki Shukto',
      shortDesc: {
        en: 'Traditional bitter-sweet vegetable medley in poppy seed, mustard & radhuni milk broth.',
        bn: 'করলা, কাঁচকলা, সজনে ডাঁটা ও বড়ি দিয়ে দুধ-পোস্ত-রাঁধুনি ফোড়নের সাবেকি শুক্তো।',
      },
      fullDesc: {
        en: 'The quintessential opening course of a traditional Bengali afternoon feast. Crisp fried lentil dumplings (Bori), drumstick, bitter gourd, sweet potato, and green plantain gently simmered in a fragrant emulsion of poppy seeds, yellow mustard, ginger paste, milk, and tempered wild celery seed (Radhuni), finished with a spoonful of pure ghee.',
        bn: 'বাঙালি ভোজের প্রথম পাতের অপরিহার্য পদ। ভাজা ডালের বড়ি, সজনে ডাঁটা, উচ্ছে, মিষ্টি আলু ও কাঁচকলা দিয়ে পোস্ত-সর্ষে বাটা, দুধ এবং রাঁধুনি-ঘি ফোড়নে তৈরি সুস্বাদু সাবেকি শুক্তো।',
      },
      demoPrice: 320,
      isVeg: true,
      prepTimeMins: 20,
      spiceLevel: { en: 'Mild & Aromatic', bn: 'হালকা ও সুগন্ধি' },
      ingredients: {
        en: ['Bitter Gourd', 'Drumsticks', 'Lentil Bori', 'Poppy Seeds (Posto)', 'Radhuni Spice', 'Cow Ghee'],
        bn: ['উচ্ছে', 'সজনে ডাঁটা', 'ডালের বড়ি', 'পোস্ত বাটা', 'রাঁধুনি ফোড়ন', 'গাওয়া ঘি'],
      },
      dietaryNotes: {
        en: '100% Vegetarian (Niramish · No Onion or Garlic) · Contains Dairy & Mustard',
        bn: 'সম্পূর্ণ নিরামিষ (পেঁয়াজ-রসুন ছাড়া) · দুগ্ধজাত উপাদান ও সর্ষে যুক্ত',
      },
      image: vegCurryImg,
    },
    {
      id: 'veg-mocha-ghonto',
      category: 'vegetarian',
      nameBn: 'নারকেল ছোলা দিয়ে মোচার ঘণ্ট',
      nameEn: 'Mochar Ghonto with Grated Coconut',
      shortDesc: {
        en: 'Slow-cooked banana blossom delicacy tossed with Bengal gram, grated coconut & roasted cumin.',
        bn: 'ভাজা জিরে, নারকেল কোরা, ছোলা ও ঘি-গরম মশলায় রান্না কলার মোচার ঘণ্ট।',
      },
      fullDesc: {
        en: 'Finely hand-chopped banana blossom florets steamed and braised with soaked Bengal gram (Chhola), fresh grated coconut, diced potatoes, roasted cumin-coriander masala, and a generous finish of clarified butter.',
        bn: 'যত্ন সহকারে কুচানো কলার মোচা সেদ্ধ করে ভিজিয়ে রাখা ছোলা, টাটকা নারকেল কোরা, ভাজা জিরে গুঁড়ো এবং ঘি-গরম মশলা সহযোগে তৈরি চিরন্তন বাঙালি নিরামিষ পদ।',
      },
      demoPrice: 340,
      isVeg: true,
      prepTimeMins: 25,
      spiceLevel: { en: 'Medium Warm Spice', bn: 'মাঝারি মশলাদার' },
      ingredients: {
        en: ['Banana Blossom (Mocha)', 'Fresh Coconut', 'Bengal Gram', 'Roasted Cumin', 'Garam Masala', 'Ghee'],
        bn: ['কলার মোচা', 'নারকেল কোরা', 'ছোলা', 'ভাজা জিরে', 'গরম মশলা', 'ঘি'],
      },
      dietaryNotes: {
        en: '100% Vegetarian (Niramish · No Onion or Garlic) · High Fibre',
        bn: 'সম্পূর্ণ নিরামিষ (পেঁয়াজ-রসুন ছাড়া)',
      },
      image: vegCurryImg,
    },
    {
      id: 'veg-chhanar-dalna',
      category: 'vegetarian',
      nameBn: 'ছানার ডালনা',
      nameEn: 'Thakurbarir Chhanar Dalna',
      shortDesc: {
        en: 'Hand-kneaded fresh cottage cheese dumplings in a velvety tomato, ginger & cumin gravy.',
        bn: 'টাটকা ছানার কোপ্তা ও আলু দিয়ে আদা-জিরে-টমেটোর হালকা মিষ্টি ঝালের ডালনা।',
      },
      fullDesc: {
        en: 'Inspired by Kolkata’s aristocratic Thakurbari kitchens. Pillowy medallions of house-made fresh Chhena are lightly golden-seared and simmered with baby potatoes in a fragrant ginger, Kashmiri chilli, and roasted cumin gravy.',
        bn: 'ঠাকুরবাড়ির রন্ধনশৈলী থেকে অনুপ্রাণিত। ঘরে তৈরি নরম ছানার বড়া হালকা ভেজে নিয়ে আদা বাটা, জিরে, টমেটো ও ঘি-গরম মশলার সুস্বাদু ঝোলে রান্না।',
      },
      demoPrice: 390,
      isVeg: true,
      prepTimeMins: 20,
      spiceLevel: { en: 'Mildly Spiced', bn: 'হালকা ঝাল-মিষ্টি' },
      ingredients: {
        en: ['Fresh House Chhena', 'Ginger Paste', 'Roasted Cumin', 'Green Cardamom', 'Potatoes', 'Ghee'],
        bn: ['ঘরের তৈরি ছানা', 'আদা বাটা', 'ভাজা জিরে', 'ছোট এলাচ', 'আলু', 'গাওয়া ঘি'],
      },
      dietaryNotes: {
        en: 'Vegetarian (No Onion or Garlic) · Contains Dairy',
        bn: 'নিরামিষ (পেঁয়াজ-রসুন ছাড়া) · ছানা ও ঘি যুক্ত',
      },
      image: vegCurryImg,
    },
    {
      id: 'veg-luchi-alur-dom',
      category: 'vegetarian',
      nameBn: 'ফুলকো লুচি ও কাশ্মীরি আলুর দম',
      nameEn: 'Phulko Luchi & Baby Potato Kosha (4 Pcs)',
      shortDesc: {
        en: 'Four golden puffed flatbreads served with slow-spiced baby potatoes and Chholar Dal.',
        bn: '৪টি গরম ফুলকো লুচি, কষা ছোট আলুর দম এবং নারকেল দেওয়া ছোলার ডাল।',
      },
      fullDesc: {
        en: 'Light, golden-puffed Bengali Luchis accompanied by baby potatoes braised in Kashmiri red chilli, ginger, fennel, and dry fruits, alongside a bowl of sweet-savory Chholar Dal studded with fried coconut slivers.',
        bn: 'গরম ফুলকো লুচির সাথে কাশ্মীরি লঙ্কা ও আদা-মৌরি বাটায় কষানো ছোট আলুর দম এবং ঘিয়ে ভাজা নারকেল কুচি দেওয়া ছোলার ডালের রাজকীয় জলখাবার ও ভোজ।',
      },
      demoPrice: 350,
      isVeg: true,
      prepTimeMins: 15,
      spiceLevel: { en: 'Medium', bn: 'মাঝারি' },
      ingredients: {
        en: ['Refined Flour Luchi', 'Baby Potatoes', 'Chholar Dal', 'Coconut Slivers', 'Kashmiri Chilli', 'Ghee'],
        bn: ['ফুলকো লুচি', 'ছোট আলু', 'ছোলার ডাল', 'নারকেল কুচি', 'কাশ্মীরি লঙ্কা', 'ঘি'],
      },
      dietaryNotes: {
        en: 'Vegetarian · Contains Gluten & Dairy',
        bn: 'নিরামিষ · ময়দা ও ঘি যুক্ত',
      },
      image: heroThaliImg,
    },

    // FISH (মাছ)
    {
      id: 'fish-shorshe-ilish',
      category: 'fish',
      nameBn: 'সর্ষে ইলিশ',
      nameEn: 'Shorshe Ilish (Prime Cut)',
      shortDesc: {
        en: 'Bone-in river Hilsa poached in stone-ground black & yellow mustard with green chillies.',
        bn: 'শিলে বাটা কালো ও সাদা সর্ষে, কাঁচালঙ্কা ও খাঁটি সর্ষের তেলে রান্না ইলিশ মাছ।',
      },
      fullDesc: {
        en: 'Our crown jewel. A generous bone-in steak of prized Hilsa simmered gently in freshly ground mustard paste, nigella seed (Kalo Jeere) tempering, slit green chillies, and a drizzle of raw pungent mustard oil.',
        bn: 'আমাদের সবচেয়ে জনপ্রিয় সিগনেচার পদ। বাছাই করা ইলিশ মাছ কালোজিরে ফোড়ন, শিলে বাটা সর্ষে, চেরা কাঁচালঙ্কা এবং ওপর থেকে ছড়ানো কাঁচা সর্ষের তেলের ঝাঁঝে অনন্য।',
      },
      demoPrice: 740,
      isVeg: false,
      isSignature: true,
      prepTimeMins: 25,
      spiceLevel: { en: 'Pungent Mustard & Chilli', bn: 'ঝাঁঝালো সর্ষে ও কাঁচালঙ্কা' },
      ingredients: {
        en: ['River Hilsa (Bone-in)', 'Black & Yellow Mustard', 'Kalo Jeere (Nigella)', 'Green Chillies', 'Cold-Pressed Mustard Oil'],
        bn: ['ইলিশ মাছ', 'কালো ও সাদা সর্ষে', 'কালোজিরে', 'কাঁচালঙ্কা', 'খাঁটি সর্ষের তেল'],
      },
      dietaryNotes: {
        en: 'Non-Vegetarian (Fish · Contains Natural Fish Bones) · Gluten-Free',
        bn: 'আমিষ (মাছ · কাঁটাযুক্ত ইলিশ) · গ্লুটেন-মুক্ত',
      },
      image: shorsheIlishImg,
    },
    {
      id: 'fish-daab-chingri',
      category: 'fish',
      nameBn: 'জমিদারি ডাব চিংড়ি',
      nameEn: 'Zamindari Daab Chingri',
      shortDesc: {
        en: 'Jumbo freshwater prawns baked inside a tender green coconut with mustard & coconut malai.',
        bn: 'কচি ডাবের ভেতরে ডাবের মালাই ও সর্ষে বাটায় দমে রান্না করা গলদা চিংড়ি।',
      },
      fullDesc: {
        en: 'Freshwater Golda Chingri (jumbo prawns) bathed in a velvety blend of tender coconut cream, mild yellow mustard, poppy seeds, and green chillies, sealed inside a whole tender coconut and baked until infused with sweet coastal aroma.',
        bn: 'বড় গলদা চিংড়ি কচি ডাবের শাঁস, সর্ষে-পোস্ত বাটা ও কাঁচালঙ্কার মালাইয়ে মাখিয়ে আস্ত ডাবের ভেতরে পুরে ধীমে আঁচে বেক করা এক রাজকীয় পদ।',
      },
      demoPrice: 790,
      isVeg: false,
      isSignature: true,
      prepTimeMins: 30,
      spiceLevel: { en: 'Mildly Pungent & Creamy', bn: 'হালকা ঝাঁঝালো ও মালাইদার' },
      ingredients: {
        en: ['Jumbo Freshwater Prawns', 'Tender Green Coconut', 'Coconut Malai', 'Yellow Mustard', 'Green Chilli'],
        bn: ['গলদা চিংড়ি', 'কচি ডাব', 'ডাবের মালাই', 'সাদা সর্ষে', 'কাঁচালঙ্কা'],
      },
      dietaryNotes: {
        en: 'Non-Vegetarian (Shellfish / Prawns) · Gluten-Free',
        bn: 'আমিষ (চিংড়ি মাছ)',
      },
      image: chingriMalaiImg,
    },
    {
      id: 'fish-bhetki-paturi',
      category: 'fish',
      nameBn: 'কলাপাতায় ভেটকি পাতুরি',
      nameEn: 'Kolkata Bhetki Paturi (2 Fillets)',
      shortDesc: {
        en: 'Boneless Bhetki fillets marinated in mustard-coconut paste, wrapped in banana leaf & griddle-roasted.',
        bn: 'সর্ষে-পোস্ত-নারকেল বাটায় মাখানো কাঁটাবিহীন ভেটকি মাছ কলাপাতায় মুড়ে তাওয়ায় সেঁকা।',
      },
      fullDesc: {
        en: 'Two thick, boneless fillets of genuine Kolkata Bhetki coated in spiced mustard, poppy seed, and grated coconut marinade, topped with a slit green chilli, wrapped tightly in fire-softened banana leaves, and slow-seared.',
        bn: 'দুটি পুরু কাঁটাবিহীন ভেটকি মাছের ফিলে সর্ষে, পোস্ত ও নারকেল বাটায় ম্যারিনেট করে কাঁচালঙ্কা দিয়ে কলাপাতায় মুড়ে হালকা আঁচে সেঁকে নেওয়া।',
      },
      demoPrice: 620,
      isVeg: false,
      prepTimeMins: 20,
      spiceLevel: { en: 'Medium Pungent', bn: 'মাঝারি ঝাঁঝালো' },
      ingredients: {
        en: ['Boneless Kolkata Bhetki', 'Banana Leaf', 'Mustard & Poppy Paste', 'Grated Coconut', 'Mustard Oil'],
        bn: ['কাঁটাবিহীন ভেটকি ফিলে', 'কলাপাতা', 'সর্ষে-পোস্ত বাটা', 'নারকেল কোরা', 'সর্ষের তেল'],
      },
      dietaryNotes: {
        en: 'Non-Vegetarian (Boneless Fish) · Gluten-Free',
        bn: 'আমিষ (কাঁটাবিহীন ভেটকি মাছ)',
      },
      image: shorsheIlishImg,
    },

    // MEAT (মাংস)
    {
      id: 'meat-kosha-mangsho',
      category: 'meat',
      nameBn: 'গোলবাড়ির ধাঁচে কষা মাংস',
      nameEn: 'Heritage Kosha Mangsho',
      shortDesc: {
        en: 'Slow-braised bone-in mutton in a dark, caramelized onion, yogurt & garam masala reduction.',
        bn: 'পেঁয়াজ বেরেস্তা, দই ও ভাজা মশলায় দীর্ঘক্ষণ কষানো গাঢ় রঙের খাসির মাংস।',
      },
      fullDesc: {
        en: 'Our kitchen’s labour of love. Prime cuts of tender goat meat marinated overnight with hung curd, mustard oil, ginger-garlic, and Shahi Garam Masala, then slow-braised ("Kosha") for hours until the meat falls off the bone in a glossy, dark-spiced gravy.',
        bn: 'আমাদের হেঁশেলের গর্ব। বাছাই করা খাসির মাংস টক দই, আদা-রসুন, সর্ষের তেল ও শাহী গরম মশলায় ম্যারিনেট করে ঘণ্টার পর ঘণ্টা ধীমে আঁচে কষিয়ে তৈরি কালচে-বাদামি ঘন গ্রেভি।',
      },
      demoPrice: 680,
      isVeg: false,
      isSignature: true,
      prepTimeMins: 25,
      spiceLevel: { en: 'Rich & Boldly Spiced', bn: 'ঘন ও মশলাদার' },
      ingredients: {
        en: ['Bone-in Goat Meat (Mutton)', 'Caramelized Onions', 'Hung Curd', 'Black Cardamom & Cloves', 'Mustard Oil', 'Ghee'],
        bn: ['খাসির মাংস', 'পেঁয়াজ বেরেস্তা', 'টক দই', 'বড় এলাচ ও লবঙ্গ', 'সর্ষের তেল', 'ঘি'],
      },
      dietaryNotes: {
        en: 'Non-Vegetarian (Mutton) · Contains Dairy (Curd & Ghee)',
        bn: 'আমিষ (খাসির মাংস) · দই ও ঘি যুক্ত',
      },
      image: koshaMangshoImg,
    },
    {
      id: 'meat-dak-bungalow',
      category: 'meat',
      nameBn: 'মুরগির ডাকবাংলো রোস্ট',
      nameEn: 'Colonial Dak Bungalow Chicken Curry',
      shortDesc: {
        en: 'Country-style chicken curry cooked with roasted whole spices, golden potatoes & spiced duck egg.',
        bn: 'সোনালি ভাজা আলু, সেদ্ধ ডিম ও গোটা মশলা বাটায় তৈরি সাবেকি ডাকবাংলো মুরগির ঝোল।',
      },
      fullDesc: {
        en: 'Born in the historic rest houses along Bengal’s old travel routes. Free-range chicken pieces simmered with golden-fried halve potatoes and a spiced boiled egg in a rustic, aromatic freshly roasted coriander-cumin-mace gravy.',
        bn: 'বাংলার প্রাচীন ডাকবাংলোর ঐতিহ্যবাহী রেসিপি। বড় ভাজা আলু, মশলা মাখানো ডিম এবং তাজা বাটা ধনে-জিরে-জয়িত্রী সহযোগে রান্না করা সুস্বাদু মুরগির মাংস।',
      },
      demoPrice: 520,
      isVeg: false,
      prepTimeMins: 25,
      spiceLevel: { en: 'Medium Rustic Spice', bn: 'মাঝারি সাবেকি ঝাল' },
      ingredients: {
        en: ['Chicken on the Bone', 'Golden Potatoes', 'Spiced Egg', 'Mace & Nutmeg', 'Stone-Ground Coriander'],
        bn: ['মুরগির মাংস', 'ভাজা আলু', 'সেদ্ধ ডিম', 'জয়িত্রী ও জায়ফল', 'ধনে-জিরে বাটা'],
      },
      dietaryNotes: {
        en: 'Non-Vegetarian (Poultry & Egg) · Dairy-Free',
        bn: 'আমিষ (মুরগির মাংস ও ডিম)',
      },
      image: koshaMangshoImg,
    },

    // RICE & BIRYANI (ভাত ও বিরিয়ানি)
    {
      id: 'rice-basanti-pulao',
      category: 'rice',
      nameBn: 'বাসন্তী পোলাও',
      nameEn: 'Gobindobhog Basanti Pulao',
      shortDesc: {
        en: 'Fragrant yellow short-grain rice tempered with pure cow’s ghee, cashews, raisins & whole spices.',
        bn: 'খাঁটি গাওয়া ঘি, কাজু, কিশমিশ ও গরম মশলায় সুবাসিত হলুদ গোবিন্দভোগ পোলাও।',
      },
      fullDesc: {
        en: 'Aged heirloom Gobindobhog rice gently toasted in pure cow’s ghee with bay leaf, cinnamon, cardamom, cloves, golden cashews, and plump raisins, imparting a balanced sweet-savory aroma designed to pair with spicy Kosha Mangsho.',
        bn: 'পুরনো গোবিন্দভোগ চাল গাওয়া ঘিয়ে ভেজে তেজপাতা, দারুচিনি, ছোট এলাচ, লবঙ্গ, কাজুবাদাম ও কিশমিশ সহযোগে দমে রান্না করা সুগন্ধি বাসন্তী পোলাও।',
      },
      demoPrice: 360,
      isVeg: true,
      isSignature: true,
      prepTimeMins: 15,
      spiceLevel: { en: 'Sweet & Fragrant', bn: 'মিষ্টি ও সুগন্ধি' },
      ingredients: {
        en: ['Aged Gobindobhog Rice', 'Pure Cow Ghee', 'Cashew Nuts', 'Golden Raisins', 'Saffron & Turmeric', 'Green Cardamom'],
        bn: ['গোবিন্দভোগ চাল', 'খাঁটি গাওয়া ঘি', 'কাজুবাদাম', 'কিশমিশ', 'জাফরান ও হলুদ', 'ছোট এলাচ'],
      },
      dietaryNotes: {
        en: '100% Vegetarian · Contains Nuts (Cashews) & Dairy (Ghee)',
        bn: 'সম্পূর্ণ নিরামিষ · কাজুবাদাম ও ঘি যুক্ত',
      },
      image: biryaniPulaoImg,
    },
    {
      id: 'rice-kolkata-biryani',
      category: 'rice',
      nameBn: 'কলকাতা শাহী মটন বিরিয়ানি',
      nameEn: 'Royal Kolkata Mutton Dum Biryani',
      shortDesc: {
        en: 'Saffron-kissed long-grain Basmati layered with melt-in-mouth mutton, signature golden Alu & egg.',
        bn: 'সুগন্ধি বাসমতী চাল, নরম মাংস, কলকাতার স্পেশাল বড় আলু ও ডিম সহ দম বিরিয়ানি।',
      },
      fullDesc: {
        en: 'Rooted in the royal kitchens of Metiabruz and Nawab Wajid Ali Shah. Fragrant long-grain Basmati steamed on Dum with saffron milk, rose & kewra water, succulent mutton, a boiled egg, and the unmistakable slow-spiced Kolkata potato.',
        bn: 'নবাব ওয়াজিদ আলি শাহের রন্ধন ঐতিহ্য মেনে তৈরি কলকাতার বিখ্যাত দম বিরিয়ানি। জাফরান, গোলাপ জল ও কেওড়া জলের সুবাসে নরম খাসির মাংস, ডিম এবং বড় আলুর অনন্য স্বাদ।',
      },
      demoPrice: 580,
      isVeg: false,
      prepTimeMins: 20,
      spiceLevel: { en: 'Subtle Royal Aromatics', bn: 'হালকা শাহী সুবাস' },
      ingredients: {
        en: ['Aged Basmati Rice', 'Mutton', 'Signature Spiced Potato (Alu)', 'Boiled Egg', 'Saffron & Itar', 'Ghee'],
        bn: ['বাসমতী চাল', 'খাসির মাংস', 'বিরিয়ানির আলু', 'সেদ্ধ ডিম', 'জাফরান ও আতর', 'ঘি'],
      },
      dietaryNotes: {
        en: 'Non-Vegetarian (Mutton & Egg) · Gluten-Free',
        bn: 'আমিষ (মাংস ও ডিম)',
      },
      image: biryaniPulaoImg,
    },

    // DESSERTS (মিষ্টি)
    {
      id: 'dessert-mishti-doi',
      category: 'desserts',
      nameBn: 'মাটির ভাঁড়ে মিষ্টি দই',
      nameEn: 'Matir Bhare Mishti Doi',
      shortDesc: {
        en: 'Thick caramelized sweet yogurt set overnight in traditional porous terracotta cups.',
        bn: 'পোড়ামাটির ভাঁড়ে পাতা গাঢ় ও মালাইদার সাবেকি মিষ্টি দই।',
      },
      fullDesc: {
        en: 'Slow-simmered full-cream milk sweetened with caramelized cane sugar and palm jaggery, poured warm into earthen clay pots and cultured until rich, sliceable, and cool.',
        bn: 'ঘন দুধ ও ক্যারামেল করা চিনি-গুড়ের মিশ্রণে তৈরি এবং মাটির ভাঁড়ে জমানো ঠান্ডা ও মালাইদার মিষ্টি দই।',
      },
      demoPrice: 210,
      isVeg: true,
      isSignature: true,
      prepTimeMins: 5,
      spiceLevel: { en: 'Caramel Sweet', bn: 'মিষ্টি' },
      ingredients: {
        en: ['Full-Cream Milk', 'Date Palm Jaggery', 'Caramelized Sugar', 'Live Yogurt Culture', 'Pistachio Slivers'],
        bn: ['ঘন দুধ', 'খেজুর গুড়', 'ক্যারামেল চিনি', 'দইয়ের সাজা', 'পেস্তা কুচি'],
      },
      dietaryNotes: {
        en: 'Vegetarian · Contains Dairy & Trace Nuts',
        bn: 'নিরামিষ · দুগ্ধজাত পদ',
      },
      image: mishtiDoiImg,
    },
    {
      id: 'dessert-baked-rosogolla',
      category: 'desserts',
      nameBn: 'বেকড নলেন গুড়ের রসগোল্লা',
      nameEn: 'Baked Nolen Gurer Rosogolla (3 Pcs)',
      shortDesc: {
        en: 'Spongy cottage cheese spheres soaked in winter jaggery and baked under a golden kheer crust.',
        bn: 'নলেন গুড়ের রসগোল্লা ঘন ক্ষীরের প্রলেপ দিয়ে মাটির পাত্রে বেক করা (৩ পিস)।',
      },
      fullDesc: {
        en: 'Three artisanal Nolen Gurer Rosogollas nestled in reduced cardamom rabri and baked in a clay dish until the top develops a blistered, golden-caramelized crust. Served warm.',
        bn: 'তিনটি নরম নলেন গুড়ের রসগোল্লা এলাচ-ক্ষীরের মধ্যে ডুবিয়ে ওভেনে বেক করা, যার ওপরে পড়ে সোনালি ব্রাউন প্রলেপ। গরম পরিবেশন করা হয়।',
      },
      demoPrice: 260,
      isVeg: true,
      prepTimeMins: 12,
      spiceLevel: { en: 'Warm & Jaggery Sweet', bn: 'নলেন গুড়ের মিষ্টি সুবাস' },
      ingredients: {
        en: ['Fresh Chhena Rosogolla', 'Nolen Gur (Date Palm Jaggery)', 'Reduced Milk Kheer', 'Green Cardamom', 'Almonds'],
        bn: ['ছানার রসগোল্লা', 'নলেন গুড়', 'ঘন ক্ষীর', 'ছোট এলাচ', 'বাদাম কুচি'],
      },
      dietaryNotes: {
        en: 'Vegetarian · Contains Dairy & Nuts',
        bn: 'নিরামিষ · দুধ ও ছানায় তৈরি',
      },
      image: mishtiDoiImg,
    },

    // DRINKS (পানীয়)
    {
      id: 'drink-gondhoraj-ghol',
      category: 'drinks',
      nameBn: 'গন্ধরাজ ঘোল',
      nameEn: 'Gondhoraj Lebur Ghol',
      shortDesc: {
        en: 'Chilled churned buttermilk infused with fragrant Bengal Gondhoraj lime zest & black salt.',
        bn: 'গন্ধরাজ লেবুর পাতা ও রসের সুবাসে তৈরি ঠান্ডা ঘোল ও বিট লবণ।',
      },
      fullDesc: {
        en: 'Kolkata’s most refreshing summer aperitif. Lightly sweetened house yogurt hand-churned with ice water, black salt, roasted cumin, and the unmistakable floral zest of Bengal’s prized Gondhoraj lime.',
        bn: 'বাংলার প্রিয় গন্ধরাজ লেবুর খোসা ও রসের মনোমুগ্ধকর সুবাসে তৈরি ঠান্ডা ঘোল, সাথে ভাজা জিরে ও বিট লবণের ছোঁয়া।',
      },
      demoPrice: 180,
      isVeg: true,
      prepTimeMins: 5,
      spiceLevel: { en: 'Citrus & Refreshing', bn: 'সতেজ লেবুর সুবাস' },
      ingredients: {
        en: ['Churned Yogurt', 'Gondhoraj Lime Zest & Juice', 'Black Salt (Bit Noon)', 'Roasted Cumin', 'Fresh Mint'],
        bn: ['ঘোল (টক-মিষ্টি দই)', 'গন্ধরাজ লেবু', 'বিট লবণ', 'ভাজা জিরে', 'পুদিনা পাতা'],
      },
      dietaryNotes: {
        en: 'Vegetarian · Digestive Cooler · Contains Dairy',
        bn: 'নিরামিষ · শরীর ঠান্ডা রাখার পানীয়',
      },
      image: drinkCoolerImg,
    },
    {
      id: 'drink-aam-pora-shorbot',
      category: 'drinks',
      nameBn: 'আম পোড়া শরবত',
      nameEn: 'Smoky Aam Pora Shorbot',
      shortDesc: {
        en: 'Char-roasted raw green mango cooler blended with jaggery, mint & roasted cumin.',
        bn: 'আগুনে পোড়ানো কাঁচা আমের শাঁস, পুদিনা পাতা ও ভাজা জিরের ঠান্ডা শরবত।',
      },
      fullDesc: {
        en: 'Whole green mangoes fire-roasted over charcoal until smoky and tender, hand-pulped with organic cane jaggery, crushed mint leaves, rock salt, and toasted cumin seeds.',
        bn: 'কাঠকয়লার আগুনে পোড়ানো কাঁচা আমের শাঁসের সাথে গুড়, পুদিনা পাতা, বিট লবণ ও ভাজা জিরে মিশিয়ে তৈরি টক-মিষ্টি-ঝাল শরবত।',
      },
      demoPrice: 190,
      isVeg: true,
      prepTimeMins: 5,
      spiceLevel: { en: 'Tangy & Smoky', bn: 'টক-মিষ্টি ও স্মোকি' },
      ingredients: {
        en: ['Char-Roasted Green Mango', 'Cane Jaggery', 'Fresh Mint Leaves', 'Roasted Cumin', 'Black Salt'],
        bn: ['পোড়া কাঁচা আম', 'আখের গুড়', 'পুদিনা পাতা', 'ভাজা জিরে', 'বিট লবণ'],
      },
      dietaryNotes: {
        en: '100% Vegan & Gluten-Free',
        bn: 'সম্পূর্ণ নিরামিষ ও ডেইরি-মুক্ত',
      },
      image: drinkCoolerImg,
    },
  ],
  galleryImages: [
    {
      id: 'gal-1',
      category: 'food',
      titleEn: 'Royal Kansa Thali Presentation',
      titleBn: 'রাজকীয় কাঁসার থালি পরিবেশন',
      captionEn: 'Multi-course Bengali feast served on handcrafted bell-metal bronze platters (Demo Photo).',
      captionBn: 'হাতে তৈরি কাঁসার থালায় সাজানো বহু পদের বাঙালি ভোজ (ডেমো ছবি)।',
      image: heroThaliImg,
      aspectClass: 'md:col-span-2',
    },
    {
      id: 'gal-2',
      category: 'interior',
      titleEn: 'The Zamindari Courtyard Dining Room',
      titleBn: 'জমিদারি ঠাকুরদালান ডাইনিং রুম',
      captionEn: 'High ceilings, louvered teak shutters, and warm brass lanterns inspired by heritage Kolkata mansions (Demo Photo).',
      captionBn: 'কলকাতার সাবেকি বাড়ির আদলে তৈরি উঁচু কড়ি-বরগা, কাঠের খড়খড়ি ও পিতলের লণ্ঠন (ডেমো ছবি)।',
      image: interiorImg,
      aspectClass: 'md:col-span-1',
    },
    {
      id: 'gal-3',
      category: 'food',
      titleEn: 'Shorshe Ilish in Stone-Ground Mustard',
      titleBn: 'শিলে বাটা সর্ষে ইলিশ',
      captionEn: 'Monsoon Hilsa simmered in golden mustard gravy with slit green chillies (Demo Photo).',
      captionBn: 'সর্ষে বাটা ও কাঁচালঙ্কায় রান্না করা রুপোলি ইলিশ (ডেমো ছবি)।',
      image: shorsheIlishImg,
      aspectClass: 'md:col-span-1',
    },
    {
      id: 'gal-4',
      category: 'culture',
      titleEn: 'Slow-Braised Kosha & Gobindobhog Harvest',
      titleBn: 'কষা মাংস ও বাসন্তী পোলাওয়ের যুগলবন্দি',
      captionEn: 'Traditional bronze bowls filled with three-hour braised Kosha Mangsho and fragrant yellow Pulao (Demo Photo).',
      captionBn: 'কাঁসার বাটিতে কষা মাংস ও ঘিয়ে ভাজা বাসন্তী পোলাও (ডেমো ছবি)।',
      image: koshaMangshoImg,
      aspectClass: 'md:col-span-1',
    },
    {
      id: 'gal-5',
      category: 'food',
      titleEn: 'Terracotta Mishti Doi & Nolen Gur Sandesh',
      titleBn: 'মাটির ভাঁড়ে মিষ্টি দই ও নলেন গুড়ের সন্দেশ',
      captionEn: 'Artisanal Bengali sweets crafted daily in unglazed earthen pots (Demo Photo).',
      captionBn: 'মাটির হাঁড়ির মিষ্টি দই এবং খাঁটি ছানার সন্দেশ (ডেমো ছবি)।',
      image: mishtiDoiImg,
      aspectClass: 'md:col-span-1',
    },
    {
      id: 'gal-6',
      category: 'people',
      titleEn: 'Evening Hospitality & Family Gatherings',
      titleBn: 'সান্ধ্যকালীন আতিথেয়তা ও পারিবারিক ভোজ',
      captionEn: 'Designed for warm family celebrations, cultural conversations, and memorable evenings in Kolkata (Demo Photo).',
      captionBn: 'পরিবার ও প্রিয়জনদের সাথে আনন্দমুখর সন্ধ্যার মুহূর্ত (ডেমো ছবি)।',
      image: interiorImg,
      aspectClass: 'md:col-span-2',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      placeholderNotice: {
        en: 'DEMO TESTIMONIAL SLOT #1 — Replace with the restaurant’s genuine Google or Zomato customer review',
        bn: 'ডেমো রিভিউ স্লট #১ — এখানে রেস্তোরাঁর প্রকৃত গ্রাহকদের মতামত ও রিভিউ যুক্ত করা হবে',
      },
      quote: {
        en: '“Sample placeholder review illustrating how a family dining guest’s feedback on the Royal Kansa Thali, Shorshe Ilish, and courtyard ambiance will be displayed on the live restaurant website.”',
        bn: '“ডেমো রিভিউ উদাহরণ: একটি প্রকৃত রেস্তোরাঁর ওয়েবসাইটে গ্রাহকদের সর্ষে ইলিশ, রাজকীয় থালি এবং আতিথেয়তা সম্পর্কিত আসল মতামত ঠিক এইভাবে প্রদর্শিত হবে।”',
      },
      guestRole: {
        en: 'Verified Guest Placeholder · Family Dinner Table',
        bn: 'ডেমো গ্রাহক প্রোফাইল · পারিবারিক নৈশভোজ',
      },
      occasion: {
        en: 'Sample Entry for Demonstration Only',
        bn: 'শুধুমাত্র ডেমো প্রদর্শনের জন্য নমুনা',
      },
      dateLabel: {
        en: 'Demo Review Format',
        bn: 'ডেমো রিভিউ ফরম্যাট',
      },
    },
    {
      id: 'rev-2',
      placeholderNotice: {
        en: 'DEMO TESTIMONIAL SLOT #2 — Replace with the restaurant’s genuine customer review',
        bn: 'ডেমো রিভিউ স্লট #২ — এখানে রেস্তোরাঁর প্রকৃত গ্রাহকদের মতামত যুক্ত করা হবে',
      },
      quote: {
        en: '“Sample placeholder review showing how feedback about private celebrations, Poila Boishakh feasts, or table reservation convenience will appear once connected to real guest testimonials.”',
        bn: '“ডেমো রিভিউ উদাহরণ: পয়লা বৈশাখ বা জন্মদিনের ভোজ এবং অনলাইন টেবিল বুকিংয়ের সুবিধা নিয়ে গ্রাহকদের আসল প্রশংসাপত্র এখানে যুক্ত করা যাবে।”',
      },
      guestRole: {
        en: 'Verified Guest Placeholder · Celebration Table',
        bn: 'ডেমো গ্রাহক প্রোফাইল · বিশেষ উদযাপন',
      },
      occasion: {
        en: 'Sample Entry for Demonstration Only',
        bn: 'শুধুমাত্র ডেমো প্রদর্শনের জন্য নমুনা',
      },
      dateLabel: {
        en: 'Demo Review Format',
        bn: 'ডেমো রিভিউ ফরম্যাট',
      },
    },
    {
      id: 'rev-3',
      placeholderNotice: {
        en: 'DEMO TESTIMONIAL SLOT #3 — Replace with a verified hospitality or food critic quote',
        bn: 'ডেমো রিভিউ স্লট #৩ — এখানে প্রকৃত ভোজনরসিক বা গ্রাহকের রিভিউ যুক্ত করা হবে',
      },
      quote: {
        en: '“Sample placeholder review highlighting the authenticity of slow-braised Kosha Mangsho, Gobindobhog Basanti Pulao, and earthen-pot Mishti Doi. No fictional reviews are presented as real.”',
        bn: '“ডেমো রিভিউ উদাহরণ: কষা মাংস, বাসন্তী পোলাও এবং মাটির ভাঁড়ের মিষ্টি দই সম্পর্কে গ্রাহকের প্রকৃত রিভিউ এখানে প্রতিস্থাপন করা হবে।”',
      },
      guestRole: {
        en: 'Verified Guest Placeholder · Evening Dining',
        bn: 'ডেমো গ্রাহক প্রোফাইল · সান্ধ্যকালীন ভোজ',
      },
      occasion: {
        en: 'Sample Entry for Demonstration Only',
        bn: 'শুধুমাত্র ডেমো প্রদর্শনের জন্য নমুনা',
      },
      dateLabel: {
        en: 'Demo Review Format',
        bn: 'ডেমো রিভিউ ফরম্যাট',
      },
    },
  ],
};

export const MENU_CATEGORIES: Array<{
  key: MenuCategoryKey | 'all';
  labelEn: string;
  labelBn: string;
}> = [
  { key: 'all', labelEn: 'All Dishes', labelBn: 'সব পদ' },
  { key: 'vegetarian', labelEn: 'Vegetarian', labelBn: 'নিরামিষ' },
  { key: 'fish', labelEn: 'Fish', labelBn: 'মাছ' },
  { key: 'meat', labelEn: 'Meat', labelBn: 'মাংস' },
  { key: 'rice', labelEn: 'Rice & Biryani', labelBn: 'ভাত ও বিরিয়ানি' },
  { key: 'desserts', labelEn: 'Desserts', labelBn: 'মিষ্টি' },
  { key: 'drinks', labelEn: 'Drinks', labelBn: 'পানীয়' },
];
