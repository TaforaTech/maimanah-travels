import type { LocalizedText } from "./packages";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type GalleryItem = {
  id: string;
  caption: LocalizedText;
  /** Tailwind gradient classes used for the original placeholder artwork. */
  gradient: string;
  category: "makkah" | "madinah" | "groups" | "journey";
};

/**
 * Original placeholder gallery. Each item renders as an abstract gradient tile
 * with a caption — swap `gradient` for real `next/image` photos later.
 */
export const gallery: GalleryItem[] = [
  { id: "g1", caption: t("The Holy Kaaba at Fajr", "ফজরে পবিত্র কাবা"), gradient: "from-navy-900 via-navy-700 to-gold-600", category: "makkah" },
  { id: "g2", caption: t("Masjid an-Nabawi, Madinah", "মসজিদে নববী, মদিনা"), gradient: "from-navy-800 via-navy-600 to-gold-500", category: "madinah" },
  { id: "g3", caption: t("Our pilgrims in Mina", "মিনায় আমাদের হাজীগণ"), gradient: "from-gold-600 via-navy-700 to-navy-900", category: "groups" },
  { id: "g4", caption: t("Arrival at Jeddah", "জেদ্দায় আগমন"), gradient: "from-navy-700 via-gold-500 to-gold-300", category: "journey" },
  { id: "g5", caption: t("Tawaf around the Kaaba", "কাবার চারপাশে তাওয়াফ"), gradient: "from-navy-950 via-navy-800 to-gold-600", category: "makkah" },
  { id: "g6", caption: t("Rawdah, Madinah", "রওজা, মদিনা"), gradient: "from-gold-500 via-navy-600 to-navy-900", category: "madinah" },
  { id: "g7", caption: t("Group departure from Dhaka", "ঢাকা থেকে গ্রুপ যাত্রা"), gradient: "from-navy-700 via-navy-600 to-gold-400", category: "groups" },
  { id: "g8", caption: t("Ziyarah in Madinah", "মদিনায় যিয়ারাহ"), gradient: "from-gold-600 via-gold-400 to-navy-700", category: "journey" },
  { id: "g9", caption: t("Evening at the Haram", "হারামে সন্ধ্যা"), gradient: "from-navy-900 via-gold-600 to-gold-400", category: "makkah" },
];
