import type { LocalizedText } from "./packages";
import type { IconName } from "@/components/ui/Icon";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type Hajj2027Spec = {
  key:
    | "duration"
    | "flight"
    | "transitFlight"
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

export type Hajj2027Package = {
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  price: number; // BDT, "starts from"
  featured?: boolean;
  specs: Hajj2027Spec[];
};

/** Static, localized labels used by the Hajj 2027 packages section and listing. */
export const hajj2027Copy = {
  eyebrow: t("Limited Seats · Hajj 2027", "সীমিত আসন · হজ্জ ২০২৭"),
  title: t("Secure Your Exclusive 2027 Hajj Package", "আপনার এক্সক্লুসিভ ২০২৭ হজ্জ প্যাকেজ নিশ্চিত করুন"),
  description: t(
    "Embark on a sacred journey with our exclusive 2027 Hajj packages, thoughtfully designed by Maimanah Travels for a seamless, spiritually focused pilgrimage. Confirm your arrangements today — limited spaces are filling quickly.",
    "মাইমানাহ ট্রাভেলসের যত্নে সাজানো এক্সক্লুসিভ ২০২৭ হজ্জ প্যাকেজের মাধ্যমে শুরু করুন আপনার পবিত্র সফর—নিরবচ্ছিন্ন ও ইবাদতকেন্দ্রিক যাত্রার জন্য। আসন সীমিত ও দ্রুত পূর্ণ হচ্ছে, তাই আজই আপনার ব্যবস্থা নিশ্চিত করুন।",
  ),
  startsFrom: t("Starts from", "শুরু"),
  selectPackage: t("Select Package", "প্যাকেজ নির্বাচন করুন"),
  terms: t("*Terms & Conditions Applicable", "*শর্তাবলী প্রযোজ্য"),
  seeAll: t("See all Packages", "সব প্যাকেজ দেখুন"),
  mostPopular: t("Most Popular", "সর্বাধিক জনপ্রিয়"),
  rowLabels: {
    duration: t("Duration", "সময়কাল"),
    flight: t("Direct Flight", "সরাসরি ফ্লাইট"),
    transitFlight: t("Transit Flight", "ট্রানজিট ফ্লাইট"),
    aziziyah: t("Hotel Aziziyah", "হোটেল আজিজিয়া"),
    makkah: t("Hotel Makkah", "হোটেল মক্কা"),
    madinah: t("Hotel Madinah", "হোটেল মদিনা"),
    hotel: t("Hotel", "হোটেল"),
    distance: t("Distance from Haram", "হারাম থেকে দূরত্ব"),
    room: t("Room Sharing", "রুম শেয়ারিং"),
    food: t("Food", "খাবার"),
    ziyarah: t("Ziyarah", "যিয়ারাহ"),
    transport: t("Transportation", "পরিবহন"),
    services: t("Special Services", "বিশেষ সেবা"),
  } as Record<Hajj2027Spec["key"], LocalizedText>,
};

const fullSpecs = (o: {
  hotel: LocalizedText;
  distance: LocalizedText;
}): Hajj2027Spec[] => [
  { key: "duration", icon: "clock", value: t("35–40 Days", "৩৫–৪০ দিন") },
  { key: "flight", icon: "plane", value: t("Saudia / Biman Bangladesh", "সৌদিয়া / বিমান বাংলাদেশ") },
  { key: "hotel", icon: "building", value: o.hotel },
  { key: "distance", icon: "pin", value: o.distance },
  { key: "room", icon: "bed", value: t("4–5 per room", "প্রতি রুমে ৪–৫ জন") },
  { key: "food", icon: "food", value: t("3 meals daily", "দৈনিক ৩ বেলা") },
  { key: "ziyarah", icon: "mosque", value: t("Sites in Makkah & Madinah", "মক্কা ও মদিনার দর্শনীয় স্থান") },
  { key: "transport", icon: "bus", value: t("Bus service in Saudi Arabia", "সৌদি আরবে বাস সার্ভিস") },
];

/** Static, localized labels for the Hajj 2027 short-package listing. */
export const hajjShortCopy = {
  eyebrow: t("Short Packages · Hajj 2027", "শর্ট প্যাকেজ · হজ্জ ২০২৭"),
  title: t("Your Journey to Makkah: Explore Our 2027 Hajj Short Packages", "মক্কার পথে আপনার সফর: আমাদের ২০২৭ হজ্জ শর্ট প্যাকেজসমূহ"),
  description: t(
    "Shorter, focused Hajj 2027 itineraries for pilgrims with limited time — without compromising on care or comfort.",
    "সীমিত সময়ের হাজীদের জন্য সংক্ষিপ্ত ও কেন্দ্রীভূত হজ্জ ২০২৭ ইটিনারারি—যত্ন বা আরামে কোনো ছাড় ছাড়াই।",
  ),
  callNow: t("Call Now", "এখনই কল করুন"),
  itineraryBn: t("Itinerary (Bangla)", "ইটিনারারি (বাংলা)"),
  itineraryEn: t("Itinerary (English)", "ইটিনারারি (ইংরেজি)"),
};

function shortSpecs(o: {
  duration: LocalizedText;
  makkah: LocalizedText;
  madinah: LocalizedText;
  services?: LocalizedText;
}): Hajj2027Spec[] {
  return [
    { key: "duration", icon: "clock", value: o.duration },
    { key: "flight", icon: "plane", value: t("SA / Biman / Flynas", "এসএ / বিমান / ফ্লাইনাস") },
    { key: "aziziyah", icon: "bed", value: t("Near to Jamarat", "জামারাতের নিকটে") },
    { key: "makkah", icon: "building", value: o.makkah },
    { key: "madinah", icon: "building", value: o.madinah },
    { key: "food", icon: "food", value: t("Breakfast, Lunch & Dinner", "সকাল, দুপুর ও রাতের খাবার") },
    {
      key: "services",
      icon: "bus",
      value: o.services ?? t("Ziyarah Tour, Transportation & Guide", "যিয়ারাহ ট্যুর, পরিবহন ও গাইড"),
    },
  ];
}

const NA = t("N/A", "N/A");

export const hajjShortPackages: Hajj2027Package[] = [
  {
    slug: "delux-short",
    name: t("Delux Short Package", "ডিলাক্স শর্ট প্যাকেজ"),
    tagline: t("Experience Hajj 2027 with premium comfort.", "প্রিমিয়াম আরামে উপভোগ করুন হজ্জ ২০২৭।"),
    price: 895000,
    specs: shortSpecs({
      duration: t("22/23 Days", "২২/২৩ দিন"),
      makkah: t("00/200M", "০০/২০০ মি."),
      madinah: t("150/250M", "১৫০/২৫০ মি."),
    }),
  },
  {
    slug: "premium-short",
    name: t("Premium Short Package", "প্রিমিয়াম শর্ট প্যাকেজ"),
    tagline: t("Condensed, efficient Hajj 2027 pilgrimage for the time-constrained.", "সময়স্বল্প হাজীদের জন্য সংক্ষিপ্ত ও কার্যকর হজ্জ ২০২৭ সফর।"),
    price: 975000,
    specs: shortSpecs({
      duration: t("22/23 Days", "২২/২৩ দিন"),
      makkah: t("00/200M", "০০/২০০ মি."),
      madinah: t("00/250M", "০০/২৫০ মি."),
    }),
  },
  {
    slug: "gold-short",
    name: t("Gold Short Package", "গোল্ড শর্ট প্যাকেজ"),
    tagline: t("Experience luxury with our premium Hajj 2027 package.", "আমাদের প্রিমিয়াম হজ্জ ২০২৭ প্যাকেজে উপভোগ করুন বিলাসিতা।"),
    price: 865000,
    specs: shortSpecs({
      duration: t("20/22 Days", "২০/২২ দিন"),
      makkah: t("00/200M", "০০/২০০ মি."),
      madinah: t("150/250M", "১৫০/২৫০ মি."),
    }),
  },
  {
    slug: "royal-short",
    name: t("Royal Short Package", "রয়্যাল শর্ট প্যাকেজ"),
    tagline: t("A luxury Hajj 2027 experience — a refined itinerary for the discerning pilgrim.", "এক বিলাসবহুল হজ্জ ২০২৭ অভিজ্ঞতা—রুচিশীল হাজীর জন্য পরিশীলিত ইটিনারারি।"),
    price: 825000,
    specs: shortSpecs({
      duration: t("16/17 Days", "১৬/১৭ দিন"),
      makkah: t("00/200M", "০০/২০০ মি."),
      madinah: t("00/250M", "০০/২৫০ মি."),
    }),
  },
  {
    slug: "executive-short",
    name: t("Executive Short Package", "এক্সিকিউটিভ শর্ট প্যাকেজ"),
    tagline: t("Executive Hajj 2027 offering ultimate comfort and a personalized spiritual journey.", "চূড়ান্ত আরাম ও ব্যক্তিগতকৃত আত্মিক সফরের এক্সিকিউটিভ হজ্জ ২০২৭।"),
    price: 735000,
    specs: shortSpecs({
      duration: t("13/14 Days", "১৩/১৪ দিন"),
      makkah: NA,
      madinah: t("200/250M", "২০০/২৫০ মি."),
    }),
  },
  {
    slug: "standard-short",
    name: t("Standard Short Package", "স্ট্যান্ডার্ড শর্ট প্যাকেজ"),
    tagline: t("Efficient and complete Hajj 2027, focusing on the core rituals for maximum spiritual reward.", "সর্বোচ্চ আত্মিক পুরস্কারের জন্য মূল ইবাদতকেন্দ্রিক কার্যকর ও পরিপূর্ণ হজ্জ ২০২৭।"),
    price: 625000,
    specs: shortSpecs({
      duration: t("10/12 Days", "১০/১২ দিন"),
      makkah: NA,
      madinah: NA,
      services: t("Ziyarah Tour (N/A), Transportation & Guide", "যিয়ারাহ ট্যুর (N/A), পরিবহন ও গাইড"),
    }),
  },
];

export const hajj2027Packages: Hajj2027Package[] = [
  {
    slug: "standard",
    name: t("Standard Package", "স্ট্যান্ডার্ড প্যাকেজ"),
    tagline: t(
      "Experience a fulfilling Hajj 2027 with our standard package, thoughtfully arranged to fit your budget.",
      "আপনার বাজেটের কথা ভেবে সাজানো আমাদের স্ট্যান্ডার্ড প্যাকেজে উপভোগ করুন এক পরিপূর্ণ হজ্জ ২০২৭।",
    ),
    price: 550000,
    specs: fullSpecs({
      hotel: t("Star-rated", "স্টার মানের"),
      distance: t("~1,500m (18–20 min walk)", "প্রায় ১,৫০০ মি. (১৮–২০ মিনিট হাঁটা পথ)"),
    }),
  },
  {
    slug: "classic",
    name: t("Classic Package", "ক্লাসিক প্যাকেজ"),
    tagline: t(
      "Our Classic Hajj 2027 blends essential comfort with spiritual excellence for a balanced journey.",
      "আমাদের ক্লাসিক হজ্জ ২০২৭ ভারসাম্যপূর্ণ সফরের জন্য আবশ্যিক আরাম ও আত্মিক উৎকর্ষকে একত্র করে।",
    ),
    price: 680000,
    featured: true,
    specs: fullSpecs({
      hotel: t("Star-rated", "স্টার মানের"),
      distance: t("~1,000m (8–10 min walk)", "প্রায় ১,০০০ মি. (৮–১০ মিনিট হাঁটা পথ)"),
    }),
  },
  {
    slug: "premium",
    name: t("Premium Package", "প্রিমিয়াম প্যাকেজ"),
    tagline: t(
      "Elevated Hajj 2027 with premium comfort and the closest hotels for a serene spiritual journey.",
      "প্রিমিয়াম আরাম ও সবচেয়ে কাছের হোটেল সহ এক প্রশান্ত আত্মিক সফরের জন্য উন্নত হজ্জ ২০২৭।",
    ),
    price: 980000,
    specs: fullSpecs({
      hotel: t("Makkah 5-star, Madinah 3-star", "মক্কা ৫-স্টার, মদিনা ৩-স্টার"),
      distance: t("Makkah 0m (adjacent), Madinah ~200m", "মক্কা ০ মি. (হারাম সংলগ্ন), মদিনা প্রায় ২০০ মি."),
    }),
  },
];
