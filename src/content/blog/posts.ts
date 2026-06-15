import type { Locale } from "@/content/i18n/config";
import type { LocalizedText } from "@/content/data/packages";

import UmrahGuideEn from "./umrah-first-time-guide.en.mdx";
import UmrahGuideBn from "./umrah-first-time-guide.bn.mdx";
import HajjPrepEn from "./preparing-for-hajj.en.mdx";
import HajjPrepBn from "./preparing-for-hajj.bn.mdx";
import PackingEn from "./umrah-packing-checklist.en.mdx";
import PackingBn from "./umrah-packing-checklist.bn.mdx";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type BlogPost = {
  slug: string;
  date: string; // ISO
  author: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  gradient: string;
  Body: Record<Locale, React.ComponentType>;
};

export const posts: BlogPost[] = [
  {
    slug: "umrah-first-time-guide",
    date: "2026-05-20",
    author: "Maimanah Travels",
    category: t("Umrah", "উমরাহ"),
    title: t("A First-Timer's Guide to Performing Umrah", "প্রথমবার উমরাহ পালনের গাইড"),
    excerpt: t(
      "Everything a first-time pilgrim should know before performing Umrah, from Ihram to the final steps.",
      "ইহরাম থেকে শেষ ধাপ পর্যন্ত—প্রথমবারের হাজীর জন্য উমরাহ পালনের আগে যা জানা দরকার।",
    ),
    gradient: "from-navy-900 via-navy-700 to-gold-600",
    Body: { en: UmrahGuideEn, bn: UmrahGuideBn },
  },
  {
    slug: "preparing-for-hajj",
    date: "2026-04-12",
    author: "Maimanah Travels",
    category: t("Hajj", "হজ্জ"),
    title: t("How to Prepare for Hajj: A Practical Checklist", "হজ্জের প্রস্তুতি: একটি ব্যবহারিক চেকলিস্ট"),
    excerpt: t(
      "Spiritual, physical and practical preparation tips to help you make the most of your Hajj.",
      "আপনার হজ্জকে পূর্ণরূপে কাজে লাগাতে আত্মিক, শারীরিক ও ব্যবহারিক প্রস্তুতির পরামর্শ।",
    ),
    gradient: "from-navy-800 via-gold-600 to-gold-400",
    Body: { en: HajjPrepEn, bn: HajjPrepBn },
  },
  {
    slug: "umrah-packing-checklist",
    date: "2026-03-02",
    author: "Maimanah Travels",
    category: t("Travel Tips", "ভ্রমণ টিপস"),
    title: t("The Essential Umrah Packing Checklist", "উমরাহর জরুরি প্যাকিং চেকলিস্ট"),
    excerpt: t(
      "Pack smart for your journey with this concise, pilgrim-tested checklist of essentials.",
      "এই সংক্ষিপ্ত, হাজী-পরীক্ষিত চেকলিস্ট দিয়ে আপনার সফরের জন্য বুদ্ধিমানের মতো প্যাক করুন।",
    ),
    gradient: "from-gold-500 via-navy-600 to-navy-900",
    Body: { en: PackingEn, bn: PackingBn },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
