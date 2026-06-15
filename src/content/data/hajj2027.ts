import type { LocalizedText } from "./packages";
import type { IconName } from "@/components/ui/Icon";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type Hajj2027Spec = {
  key: "duration" | "flight" | "aziziyah" | "makkah" | "madinah" | "food" | "services";
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
    aziziyah: t("Hotel Aziziyah", "হোটেল আজিজিয়া"),
    makkah: t("Hotel Makkah", "হোটেল মক্কা"),
    madinah: t("Hotel Madinah", "হোটেল মদিনা"),
    food: t("Food", "খাবার"),
    services: t("Special Services", "বিশেষ সেবা"),
  } as Record<Hajj2027Spec["key"], LocalizedText>,
};

const specs = (
  makkah: [string, string],
  madinah: [string, string],
): Hajj2027Spec[] => [
  { key: "duration", icon: "clock", value: t("40/42 Days", "৪০/৪২ দিন") },
  { key: "flight", icon: "plane", value: t("SA / Biman / Flynas", "এসএ / বিমান / ফ্লাইনাস") },
  { key: "aziziyah", icon: "bed", value: t("Near to Jamarat", "জামারাতের নিকটে") },
  { key: "makkah", icon: "building", value: t(makkah[0], makkah[1]) },
  { key: "madinah", icon: "building", value: t(madinah[0], madinah[1]) },
  { key: "food", icon: "food", value: t("Breakfast, Lunch & Dinner", "সকাল, দুপুর ও রাতের খাবার") },
  { key: "services", icon: "bus", value: t("Ziyarah Tour, Transportation & Guide", "যিয়ারাহ ট্যুর, পরিবহন ও গাইড") },
];

export const hajj2027Packages: Hajj2027Package[] = [
  {
    slug: "standard",
    name: t("Standard Package", "স্ট্যান্ডার্ড প্যাকেজ"),
    tagline: t(
      "Experience a fulfilling Hajj 2027 with our standard package, thoughtfully arranged to fit your budget.",
      "আপনার বাজেটের কথা ভেবে সাজানো আমাদের স্ট্যান্ডার্ড প্যাকেজে উপভোগ করুন এক পরিপূর্ণ হজ্জ ২০২৭।",
    ),
    price: 755000,
    specs: specs(["300/600M", "৩০০/৬০০ মি."], ["300/400M", "৩০০/৪০০ মি."]),
  },
  {
    slug: "classic",
    name: t("Classic Package", "ক্লাসিক প্যাকেজ"),
    tagline: t(
      "Our Classic Hajj 2027 blends essential comfort with spiritual excellence for a balanced journey.",
      "আমাদের ক্লাসিক হজ্জ ২০২৭ ভারসাম্যপূর্ণ সফরের জন্য আবশ্যিক আরাম ও আত্মিক উৎকর্ষকে একত্র করে।",
    ),
    price: 890000,
    featured: true,
    specs: specs(["300/600M", "৩০০/৬০০ মি."], ["300/400M", "৩০০/৪০০ মি."]),
  },
  {
    slug: "premium",
    name: t("Premium Package", "প্রিমিয়াম প্যাকেজ"),
    tagline: t(
      "Elevated Hajj 2027 with premium comfort and the closest hotels for a serene spiritual journey.",
      "প্রিমিয়াম আরাম ও সবচেয়ে কাছের হোটেল সহ এক প্রশান্ত আত্মিক সফরের জন্য উন্নত হজ্জ ২০২৭।",
    ),
    price: 1085000,
    specs: specs(["100/200M", "১০০/২০০ মি."], ["200/300M", "২০০/৩০০ মি."]),
  },
];
