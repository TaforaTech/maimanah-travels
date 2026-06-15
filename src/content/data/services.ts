import type { LocalizedText } from "./packages";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type Service = {
  slug: string;
  icon: string;
  title: LocalizedText;
  short: LocalizedText;
  body: LocalizedText[];
  href: string;
};

/** Service categories surfaced on the Home "Simplify Your Sacred Journey" grid. */
export const services: Service[] = [
  {
    slug: "hajj",
    icon: "kaaba",
    title: t("Hajj Packages", "হজ্জ প্যাকেজ"),
    short: t("Guided, fully-supported Hajj packages for every budget.", "প্রতিটি বাজেটের জন্য পরিচালিত, পূর্ণ-সমর্থিত হজ্জ প্যাকেজ।"),
    body: [
      t("Our Hajj packages cover visas, flights, accommodation, Mina and Arafah logistics, meals and scholar-led guidance — so you can focus entirely on worship.", "আমাদের হজ্জ প্যাকেজে ভিসা, ফ্লাইট, আবাসন, মিনা-আরাফাহ লজিস্টিকস, খাবার ও আলেম-পরিচালিত দিকনির্দেশনা অন্তর্ভুক্ত—যাতে আপনি সম্পূর্ণ মনোযোগ দিতে পারেন ইবাদতে।"),
    ],
    href: "/hajj/packages",
  },
  {
    slug: "umrah",
    icon: "mosque",
    title: t("Umrah Packages", "উমরাহ প্যাকেজ"),
    short: t("Year-round Umrah packages from economy to luxury.", "বছরজুড়ে ইকোনমি থেকে লাক্সারি উমরাহ প্যাকেজ।"),
    body: [
      t("Choose from carefully designed Umrah packages with hotels near the Haram, guided rituals and complete ground support for a serene journey.", "হারামের নিকটে হোটেল, পরিচালিত ইবাদত ও সম্পূর্ণ গ্রাউন্ড সহায়তা সহ যত্নে সাজানো উমরাহ প্যাকেজ থেকে বেছে নিন।"),
    ],
    href: "/umrah/packages",
  },
  {
    slug: "ticketing",
    icon: "plane",
    title: t("Air Ticket Booking", "বিমান টিকিট বুকিং"),
    short: t("Competitive fares on all major airlines.", "সকল প্রধান এয়ারলাইনে প্রতিযোগিতামূলক ভাড়া।"),
    body: [
      t("Book domestic and international air tickets at competitive fares, with flexible options and dedicated booking support for individuals and groups.", "ব্যক্তি ও গ্রুপের জন্য নমনীয় অপশন ও নিবেদিত বুকিং সহায়তা সহ প্রতিযোগিতামূলক ভাড়ায় দেশি-বিদেশি বিমান টিকিট বুক করুন।"),
    ],
    href: "/services/ticketing",
  },
  {
    slug: "visa-processing",
    icon: "passport",
    title: t("Visa Processing", "ভিসা প্রসেসিং"),
    short: t("Hassle-free visa support for multiple destinations.", "একাধিক গন্তব্যের জন্য ঝামেলাহীন ভিসা সহায়তা।"),
    body: [
      t("Our visa team handles documentation, applications and follow-up for Umrah, Hajj and selected tourist and business destinations.", "আমাদের ভিসা টিম উমরাহ, হজ্জ ও নির্বাচিত পর্যটন-ব্যবসায়িক গন্তব্যের জন্য কাগজপত্র, আবেদন ও ফলোআপ সামলায়।"),
    ],
    href: "/services/visa-processing",
  },
  {
    slug: "consultation",
    icon: "chat",
    title: t("Free Consultation", "ফ্রি পরামর্শ"),
    short: t("Personal guidance to plan your journey.", "আপনার সফর পরিকল্পনায় ব্যক্তিগত দিকনির্দেশনা।"),
    body: [
      t("Speak with an experienced advisor at no cost. We help you choose the right package, budget and schedule for your pilgrimage.", "বিনা খরচে একজন অভিজ্ঞ অ্যাডভাইজারের সাথে কথা বলুন। সঠিক প্যাকেজ, বাজেট ও সময়সূচি বেছে নিতে আমরা সাহায্য করি।"),
    ],
    href: "/services/consultation",
  },
  {
    slug: "training",
    icon: "book",
    title: t("Hajj & Umrah Training", "হজ্জ ও উমরাহ প্রশিক্ষণ"),
    short: t("Learn the rites correctly before you travel.", "যাত্রার আগে সঠিকভাবে মানাসিক শিখুন।"),
    body: [
      t("Attend structured training sessions led by qualified scholars to perform every rite of Hajj and Umrah with confidence.", "প্রতিটি মানাসিক আত্মবিশ্বাসের সাথে পালন করতে যোগ্য আলেমদের পরিচালিত কাঠামোবদ্ধ প্রশিক্ষণে অংশ নিন।"),
    ],
    href: "/services/training",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
