import type { Locale } from "@/content/i18n/config";
import type { IconName } from "@/components/ui/Icon";

export type PackageCategory = "umrah" | "hajj";

export type LocalizedText = Record<Locale, string>;

export type PackageSpec = {
  key:
    | "duration"
    | "flight"
    | "aziziyah"
    | "makkah"
    | "madinah"
    | "hotel"
    | "distance"
    | "room"
    | "food"
    | "ziyarah"
    | "transport"
    | "services";
  icon: IconName;
  value: LocalizedText;
};

export type TravelPackage = {
  slug: string;
  category: PackageCategory;
  name: LocalizedText;
  tier: LocalizedText;
  price: number; // BDT
  durationDays: number;
  nights: { makkah: number; madinah: number };
  hotelStars: number;
  featured: boolean;
  /** Highlights the card with the dark "Most Popular" treatment. */
  highlight?: boolean;
  /** Spec rows shown on the package card (duration, flight, hotels, food, services). */
  specs?: PackageSpec[];
  summary: LocalizedText;
  highlights: LocalizedText[];
  includes: LocalizedText[];
  excludes: LocalizedText[];
  itinerary: { day: string; title: LocalizedText; detail: LocalizedText }[];
};

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export const packages: TravelPackage[] = [
  {
    slug: "umrah-economy",
    category: "umrah",
    name: t("Package A", "প্যাকেজ A"),
    tier: t("Value", "সাশ্রয়ী"),
    price: 130000,
    durationDays: 14,
    nights: { makkah: 8, madinah: 5 },
    hotelStars: 3,
    featured: true,
    specs: [
      { key: "duration", icon: "clock", value: t("14 Days", "১৪ দিন") },
      { key: "flight", icon: "plane", value: t("Saudia / Biman Bangladesh", "সৌদিয়া / বিমান বাংলাদেশ") },
      { key: "hotel", icon: "building", value: t("Star-standard hotels", "স্টার মানের হোটেল") },
      { key: "distance", icon: "pin", value: t("~1,000m (10–12 min walk)", "প্রায় ১,০০০ মিটার (১০–১২ মিনিট হাঁটা পথ)") },
      { key: "room", icon: "bed", value: t("4–5 per room", "প্রতি রুমে ৪–৫ জন") },
      { key: "food", icon: "food", value: t("3 meals daily", "দৈনিক ৩ বেলা") },
      { key: "ziyarah", icon: "mosque", value: t("Sites in Makkah & Madinah", "মক্কা ও মদিনার দর্শনীয় স্থান") },
      { key: "transport", icon: "bus", value: t("Bus service in Saudi Arabia", "সৌদি আরবে বাস সার্ভিস") },
    ],
    summary: t(
      "A value Umrah over 14 days — BDT 1,30,000 with a transit flight or BDT 1,50,000 direct, with star-standard hotels and full ziyarah.",
      "১৪ দিনের সাশ্রয়ী উমরাহ—ট্রানজিট ফ্লাইটে ১,৩০,০০০ টাকা অথবা ডাইরেক্ট ফ্লাইটে ১,৫০,০০০ টাকা, স্টার মানের হোটেল ও পূর্ণ যিয়ারাহ সহ।",
    ),
    highlights: [
      t("Transit & direct flight options", "ট্রানজিট ও ডাইরেক্ট ফ্লাইট অপশন"),
      t("3 meals daily", "দৈনিক ৩ বেলা খাবার"),
      t("Ziyarah in Makkah & Madinah", "মক্কা ও মদিনায় যিয়ারাহ"),
    ],
    includes: [
      t("Round-trip air ticket", "রাউন্ড-ট্রিপ বিমান টিকিট"),
      t("Umrah visa processing", "উমরাহ ভিসা প্রসেসিং"),
      t("Star-standard hotels (4–5 per room)", "স্টার মানের হোটেল (প্রতি রুমে ৪–৫ জন)"),
      t("3 meals daily", "দৈনিক ৩ বেলা খাবার"),
      t("Ziyarah & bus transport in Saudi Arabia", "সৌদি আরবে যিয়ারাহ ও বাস পরিবহন"),
      t("Experienced group guide", "অভিজ্ঞ গ্রুপ গাইড"),
    ],
    excludes: [
      t("Personal expenses", "ব্যক্তিগত খরচ"),
      t("Qurbani / sacrifice", "কুরবানি"),
      t("Travel insurance", "ভ্রমণ বীমা"),
    ],
    itinerary: [
      { day: "01", title: t("Departure & arrival in Jeddah", "জেদ্দায় যাত্রা ও আগমন"), detail: t("Reception at the airport and transfer to your Makkah hotel.", "এয়ারপোর্টে অভ্যর্থনা ও মক্কার হোটেলে স্থানান্তর।") },
      { day: "02-08", title: t("Umrah & worship in Makkah", "মক্কায় উমরাহ ও ইবাদত"), detail: t("Perform Umrah with guidance and dedicate days to prayer at the Haram.", "দিকনির্দেশনায় উমরাহ পালন ও হারামে ইবাদতে সময় ব্যয়।") },
      { day: "09-13", title: t("Madinah & Ziyarah", "মদিনা ও যিয়ারাহ"), detail: t("Travel to Madinah for prayers at Masjid an-Nabawi and historic ziyarah.", "মসজিদে নববীতে নামাজ ও ঐতিহাসিক যিয়ারাহর জন্য মদিনায় যাত্রা।") },
      { day: "14", title: t("Return home", "ঘরে ফেরা"), detail: t("Transfer to the airport for your return flight.", "ফেরার ফ্লাইটের জন্য এয়ারপোর্টে স্থানান্তর।") },
    ],
  },
  {
    slug: "umrah-premium",
    category: "umrah",
    name: t("Package B", "প্যাকেজ B"),
    tier: t("Most Popular", "সর্বাধিক জনপ্রিয়"),
    price: 185000,
    durationDays: 14,
    nights: { makkah: 8, madinah: 5 },
    hotelStars: 3,
    featured: true,
    highlight: true,
    specs: [
      { key: "duration", icon: "clock", value: t("14 Days", "১৪ দিন") },
      { key: "flight", icon: "plane", value: t("Saudia / Biman / US-Bangla", "সৌদিয়া / বিমান / ইউএস-বাংলা") },
      { key: "hotel", icon: "building", value: t("3-star hotels", "৩-স্টার হোটেল") },
      { key: "distance", icon: "pin", value: t("~500m (4–5 min walk)", "প্রায় ৫০০ মিটার (৪–৫ মিনিট হাঁটা পথ)") },
      { key: "room", icon: "bed", value: t("4–5 per room", "প্রতি রুমে ৪–৫ জন") },
      { key: "food", icon: "food", value: t("3 meals daily", "দৈনিক ৩ বেলা") },
      { key: "ziyarah", icon: "mosque", value: t("Sites in Makkah & Madinah", "মক্কা ও মদিনার দর্শনীয় স্থান") },
      { key: "transport", icon: "bus", value: t("Bus service in Saudi Arabia", "সৌদি আরবে বাস সার্ভিস") },
    ],
    summary: t(
      "A 14-day Umrah for BDT 1,85,000 (direct flight) with 3-star hotels about 500m from the Haram and 3 meals daily.",
      "১৪ দিনের উমরাহ, ১,৮৫,০০০ টাকা (ডাইরেক্ট ফ্লাইট)—হারাম থেকে প্রায় ৫০০ মিটার দূরে ৩-স্টার হোটেল ও দৈনিক ৩ বেলা খাবার সহ।",
    ),
    highlights: [
      t("Hotels ~500m from the Haram", "হারাম থেকে প্রায় ৫০০ মিটার দূরে হোটেল"),
      t("Direct flight included", "ডাইরেক্ট ফ্লাইট অন্তর্ভুক্ত"),
      t("3 meals daily", "দৈনিক ৩ বেলা খাবার"),
    ],
    includes: [
      t("Round-trip air ticket", "রাউন্ড-ট্রিপ বিমান টিকিট"),
      t("Umrah visa processing", "উমরাহ ভিসা প্রসেসিং"),
      t("3-star hotels near the Haram (4–5 per room)", "হারামের নিকটে ৩-স্টার হোটেল (প্রতি রুমে ৪–৫ জন)"),
      t("3 meals daily", "দৈনিক ৩ বেলা খাবার"),
      t("Ziyarah & bus transport in Saudi Arabia", "সৌদি আরবে যিয়ারাহ ও বাস পরিবহন"),
      t("Dedicated scholar-guide", "নিবেদিত আলেম-গাইড"),
    ],
    excludes: [
      t("Personal expenses", "ব্যক্তিগত খরচ"),
      t("Optional day tours", "ঐচ্ছিক ডে ট্যুর"),
      t("Travel insurance", "ভ্রমণ বীমা"),
    ],
    itinerary: [
      { day: "01", title: t("Arrival in Jeddah / Madinah", "জেদ্দা / মদিনায় আগমন"), detail: t("VIP reception and comfortable transfer to your hotel.", "ভিআইপি অভ্যর্থনা ও আরামদায়ক হোটেল স্থানান্তর।") },
      { day: "02-07", title: t("Umrah & Makkah", "উমরাহ ও মক্কা"), detail: t("Guided Umrah and unhurried days of worship at the Haram.", "পরিচালিত উমরাহ ও হারামে স্বাচ্ছন্দ্যে ইবাদত।") },
      { day: "08-13", title: t("Madinah & Ziyarah", "মদিনা ও যিয়ারাহ"), detail: t("Prayers at Masjid an-Nabawi and curated historical ziyarah.", "মসজিদে নববীতে নামাজ ও নির্বাচিত ঐতিহাসিক যিয়ারাহ।") },
      { day: "14", title: t("Return home", "ঘরে ফেরা"), detail: t("Relaxed transfer for your return flight.", "ফেরার ফ্লাইটের জন্য আরামদায়ক স্থানান্তর।") },
    ],
  },
  {
    slug: "umrah-luxury",
    category: "umrah",
    name: t("Special Package C", "স্পেশাল প্যাকেজ C"),
    tier: t("Signature", "সিগনেচার"),
    price: 285000,
    durationDays: 14,
    nights: { makkah: 8, madinah: 5 },
    hotelStars: 5,
    featured: true,
    specs: [
      { key: "duration", icon: "clock", value: t("14 Days", "১৪ দিন") },
      { key: "flight", icon: "plane", value: t("Saudia / Biman / US-Bangla", "সৌদিয়া / বিমান / ইউএস-বাংলা") },
      { key: "hotel", icon: "building", value: t("Makkah 5-star · Madinah 3-star", "মক্কায় ৫-স্টার · মদিনায় ৩-স্টার") },
      { key: "distance", icon: "pin", value: t("Makkah: adjacent (0 min) · Madinah: ~200m", "মক্কা: হারাম সংলগ্ন (০ মিনিট) · মদিনা: প্রায় ২০০ মিটার") },
      { key: "room", icon: "bed", value: t("4–5 per room", "প্রতি রুমে ৪–৫ জন") },
      { key: "food", icon: "food", value: t("3 meals daily", "দৈনিক ৩ বেলা") },
      { key: "ziyarah", icon: "mosque", value: t("Sites in Makkah & Madinah", "মক্কা ও মদিনার দর্শনীয় স্থান") },
      { key: "transport", icon: "bus", value: t("Bus service in Saudi Arabia", "সৌদি আরবে বাস সার্ভিস") },
    ],
    summary: t(
      "Our signature 14-day Umrah for BDT 2,85,000 (direct flight) — a 5-star hotel adjacent to the Haram in Makkah and 3-star near Masjid an-Nabawi in Madinah.",
      "আমাদের সিগনেচার ১৪ দিনের উমরাহ, ২,৮৫,০০০ টাকা (ডাইরেক্ট ফ্লাইট)—মক্কায় হারাম সংলগ্ন ৫-স্টার হোটেল ও মদিনায় মসজিদে নববীর নিকটে ৩-স্টার হোটেল সহ।",
    ),
    highlights: [
      t("Makkah 5-star adjacent to the Haram", "মক্কায় হারাম সংলগ্ন ৫-স্টার হোটেল"),
      t("Madinah 3-star ~200m from the mosque", "মদিনায় মসজিদ থেকে প্রায় ২০০ মিটারে ৩-স্টার"),
      t("3 meals daily", "দৈনিক ৩ বেলা খাবার"),
    ],
    includes: [
      t("Round-trip air ticket (direct flight)", "রাউন্ড-ট্রিপ বিমান টিকিট (ডাইরেক্ট ফ্লাইট)"),
      t("Umrah visa processing", "উমরাহ ভিসা প্রসেসিং"),
      t("Makkah 5-star & Madinah 3-star (4–5 per room)", "মক্কায় ৫-স্টার ও মদিনায় ৩-স্টার (প্রতি রুমে ৪–৫ জন)"),
      t("3 meals daily", "দৈনিক ৩ বেলা খাবার"),
      t("Ziyarah & bus transport in Saudi Arabia", "সৌদি আরবে যিয়ারাহ ও বাস পরিবহন"),
      t("Experienced group guide", "অভিজ্ঞ গ্রুপ গাইড"),
    ],
    excludes: [
      t("Personal shopping", "ব্যক্তিগত কেনাকাটা"),
      t("Spa & extra services", "স্পা ও অতিরিক্ত সেবা"),
    ],
    itinerary: [
      { day: "01", title: t("Arrival & VIP transfer", "আগমন ও ভিআইপি স্থানান্তর"), detail: t("Meet-and-assist service and luxury transfer to your suite.", "মিট-অ্যান্ড-অ্যাসিস্ট সেবা ও স্যুটে লাক্সারি স্থানান্তর।") },
      { day: "02-07", title: t("Makkah in comfort", "আরামে মক্কা"), detail: t("Private guidance and Haram-view stays for serene worship.", "প্রাইভেট দিকনির্দেশনা ও হারাম-ভিউ আবাসনে প্রশান্ত ইবাদত।") },
      { day: "08-13", title: t("Madinah retreat", "মদিনা রিট্রিট"), detail: t("Premium Madinah stay with personalised ziyarah.", "ব্যক্তিগতকৃত যিয়ারাহ সহ প্রিমিয়াম মদিনা অবস্থান।") },
      { day: "14", title: t("Return home", "ঘরে ফেরা"), detail: t("Lounge access and assisted departure.", "লাউঞ্জ অ্যাক্সেস ও সহায়তায় প্রস্থান।") },
    ],
  },
  {
    slug: "hajj-standard",
    category: "hajj",
    name: t("Standard Hajj Package 2027", "স্ট্যান্ডার্ড হজ্জ প্যাকেজ ২০২৭"),
    tier: t("Balanced", "ভারসাম্যপূর্ণ"),
    price: 695000,
    durationDays: 35,
    nights: { makkah: 20, madinah: 8 },
    hotelStars: 3,
    featured: false,
    summary: t(
      "A complete, well-supported Hajj with comfortable lodging and experienced group leadership.",
      "আরামদায়ক আবাসন ও অভিজ্ঞ গ্রুপ নেতৃত্ব সহ সম্পূর্ণ, সুসমর্থিত হজ্জ।",
    ),
    highlights: [
      t("Maktab tents in Mina & Arafah", "মিনা ও আরাফায় মাকতাব তাঁবু"),
      t("Scholar-led rites training", "আলেম-পরিচালিত মানাসিক প্রশিক্ষণ"),
      t("Full ground logistics", "সম্পূর্ণ গ্রাউন্ড লজিস্টিকস"),
    ],
    includes: [
      t("Round-trip air ticket", "রাউন্ড-ট্রিপ বিমান টিকিট"),
      t("Hajj visa & permits", "হজ্জ ভিসা ও অনুমতি"),
      t("Hotel & Mina/Arafah tents", "হোটেল ও মিনা/আরাফাহ তাঁবু"),
      t("Daily meals", "প্রতিদিন খাবার"),
      t("All internal transport", "সকল অভ্যন্তরীণ পরিবহন"),
      t("Experienced muallim", "অভিজ্ঞ মুয়াল্লিম"),
    ],
    excludes: [
      t("Qurbani", "কুরবানি"),
      t("Personal expenses", "ব্যক্তিগত খরচ"),
    ],
    itinerary: [
      { day: "—", title: t("Pre-departure training", "প্রাক-যাত্রা প্রশিক্ষণ"), detail: t("Attend orientation sessions on Hajj rites before travel.", "যাত্রার আগে হজ্জের মানাসিক বিষয়ে ওরিয়েন্টেশন সেশন।") },
      { day: "—", title: t("Makkah & the rites of Hajj", "মক্কা ও হজ্জের মানাসিক"), detail: t("Perform the rites of Hajj with close guidance and support.", "নিবিড় দিকনির্দেশনা ও সহায়তায় হজ্জের মানাসিক পালন।") },
      { day: "—", title: t("Madinah & return", "মদিনা ও ফেরা"), detail: t("Conclude with a Madinah stay before returning home.", "ঘরে ফেরার আগে মদিনায় অবস্থান করে সমাপ্তি।") },
    ],
  },
  {
    slug: "hajj-premium",
    category: "hajj",
    name: t("Premium Hajj Package 2027", "প্রিমিয়াম হজ্জ প্যাকেজ ২০২৭"),
    tier: t("Premium", "প্রিমিয়াম"),
    price: 1095000,
    durationDays: 30,
    nights: { makkah: 16, madinah: 8 },
    hotelStars: 5,
    featured: false,
    summary: t(
      "A premium Hajj with 5-star hotels close to the Haram and upgraded Mina accommodation.",
      "হারামের নিকটে ৫-তারকা হোটেল ও উন্নত মিনা আবাসন সহ প্রিমিয়াম হজ্জ।",
    ),
    highlights: [
      t("Upgraded VIP Mina camp", "উন্নত ভিআইপি মিনা ক্যাম্প"),
      t("5-star Haram-adjacent hotels", "হারাম-সংলগ্ন ৫-তারকা হোটেল"),
      t("Smaller premium group", "ছোট প্রিমিয়াম গ্রুপ"),
    ],
    includes: [
      t("Premium air ticket", "প্রিমিয়াম বিমান টিকিট"),
      t("Hajj visa & permits", "হজ্জ ভিসা ও অনুমতি"),
      t("5-star hotels & VIP tents", "৫-তারকা হোটেল ও ভিআইপি তাঁবু"),
      t("Full-board premium meals", "ফুল-বোর্ড প্রিমিয়াম খাবার"),
      t("Private transport", "প্রাইভেট পরিবহন"),
      t("Dedicated scholar team", "নিবেদিত আলেম টিম"),
    ],
    excludes: [
      t("Qurbani", "কুরবানি"),
      t("Personal expenses", "ব্যক্তিগত খরচ"),
    ],
    itinerary: [
      { day: "—", title: t("VIP orientation", "ভিআইপি ওরিয়েন্টেশন"), detail: t("Personalised pre-departure preparation and briefing.", "ব্যক্তিগতকৃত প্রাক-যাত্রা প্রস্তুতি ও ব্রিফিং।") },
      { day: "—", title: t("Hajj in comfort", "আরামে হজ্জ"), detail: t("Perform the rites with premium logistics and close care.", "প্রিমিয়াম লজিস্টিকস ও নিবিড় যত্নে মানাসিক পালন।") },
      { day: "—", title: t("Madinah & return", "মদিনা ও ফেরা"), detail: t("Premium Madinah stay and assisted return.", "প্রিমিয়াম মদিনা অবস্থান ও সহায়তায় ফেরা।") },
    ],
  },
];

export function getPackages(category?: PackageCategory): TravelPackage[] {
  return category ? packages.filter((p) => p.category === category) : packages;
}

export function getFeatured(category?: PackageCategory): TravelPackage[] {
  return getPackages(category).filter((p) => p.featured);
}

export function getPackage(slug: string): TravelPackage | undefined {
  return packages.find((p) => p.slug === slug);
}
