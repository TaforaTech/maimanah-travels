import type { IconName } from "@/components/ui/Icon";

/** Localized string helper (mirrors pages.ts). */
export type L = { en: string; bn: string };
const t = (en: string, bn: string): L => ({ en, bn });

/** A numbered instruction card inside a station. */
export type DetailStep = { title: L; body: L };

export type Dua = {
  title: L;
  /** Quranic-script Arabic — newlines split the display lines (RTL, Amiri). */
  arabic: string;
  translation: L;
  reference: L;
};

/** A point on the globe a station focuses the camera on. */
export type FocusId = "dhaka" | "mecca";

export type Station = {
  id: string;
  icon: IconName;
  /** Small eyebrow — a phase or a day of Dhul-Hijjah. */
  phase: L;
  title: L;
  /** Optional lead paragraph (used by the welcome / arrival stations). */
  intro?: L;
  details?: DetailStep[];
  duas?: Dua[];
  /** A line of dhikr shown as a ribbon, e.g. the welcome station. */
  dhikr?: L;
  /** Label on the advance button. */
  cta: L;
  focus: FocusId;
  /** When true, pressing the CTA flies the plane Dhaka → Makkah first. */
  flight?: boolean;
};

/** Geographic anchors used by the 3D globe. */
export const PLACES: Record<FocusId, { lat: number; lng: number; label: L; emoji: string }> = {
  dhaka: { lat: 23.81, lng: 90.41, label: t("Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"), emoji: "📍" },
  mecca: { lat: 21.42, lng: 39.83, label: t("Makkah, Saudi Arabia", "মক্কা, সৌদি আরব"), emoji: "🕌" },
};

/**
 * The full Hajj journey as a sequence of immersive "stations".
 * Station 0 begins in Dhaka and its CTA launches the flight to Makkah;
 * the rest unfold the rites, each with its supplications in Arabic & Bangla.
 */
export const stations: Station[] = [
  {
    id: "ihram",
    icon: "kaaba",
    focus: "dhaka",
    phase: t("Preparation before boarding", "বোর্ডিংয়ের আগে প্রস্তুতি"),
    title: t("Entering Ihram", "ইহরাম পরিধান"),
    details: [
      {
        title: t("Make the intention (Niyyah)", "নিয়্যাত করুন"),
        body: t(
          "The Miqat for pilgrims from Bangladesh is Yalamlam. Before crossing this boundary, make the intention for Hajj in your heart, purely for the pleasure of Allah.",
          "বাংলাদেশ থেকে আগত হাজীদের মিকাত হল ইয়ালামলাম। এই সীমা অতিক্রমের পূর্বে কেবলমাত্র আল্লাহর সন্তুষ্টির জন্য হজ্জের নিয়্যাত মনে মনে করুন।",
        ),
      },
      {
        title: t("Perform the ritual bath (Ghusl)", "গোসল করুন (গুসল)"),
        body: t(
          "Take a full purifying bath before Ihram. Trim your nails and remove unwanted hair. After entering Ihram, perfume may no longer be used.",
          "ইহরামের আগে পূর্ণ পবিত্রতার গোসল করুন। নখ কাটুন, অবাঞ্ছিত লোম পরিষ্কার করুন। ইহরামের পর আর সুগন্ধি ব্যবহার করা যাবে না।",
        ),
      },
      {
        title: t("Wear the Ihram garments", "ইহরামের পোশাক পরুন"),
        body: t(
          "For men: two unstitched white sheets — the izar (lower) and the rida (upper). Stitched clothing, head caps and ankle-covering shoes are forbidden. For women: fully modest dress, leaving the face and palms uncovered.",
          "পুরুষদের জন্য: সেলাইবিহীন দুটি সাদা কাপড় — ইযার (নিচের কাপড়) ও রিদা (উপরের কাপড়)। সেলাইকরা পোশাক, মাথার টুপি বা গোড়ালি ঢাকা জুতা পরা নিষিদ্ধ। মহিলাদের জন্য: সম্পূর্ণ শালীন পোশাক পরতে হবে। মুখমণ্ডল ও হাতের তালু খোলা রাখতে হবে।",
        ),
      },
      {
        title: t("Pray two rak'ahs of Nafl", "দুই রাকাত নফল নামায পড়ুন"),
        body: t(
          "Pray two voluntary rak'ahs before declaring Ihram. It is recommended to recite Surah al-Kafirun in the first and Surah al-Ikhlas in the second.",
          "ইহরাম ঘোষণার আগে দুই রাকাত নফল নামায পড়ুন। প্রথম রাকাতে সূরা কাফিরুন এবং দ্বিতীয় রাকাতে সূরা ইখলাস পড়া মুস্তাহাব।",
        ),
      },
      {
        title: t("Declare Ihram", "ইহরাম ঘোষণা করুন"),
        body: t(
          "After the prayer, face the Qiblah and recite the Talbiyah aloud. From this moment the restrictions of Ihram take effect. Keep reciting the Talbiyah throughout the journey.",
          "নামাযের পর কিবলামুখী হয়ে উচ্চস্বরে তালবিয়া পড়ুন। এই মুহূর্ত থেকে ইহরামের বিধিনিষেধ কার্যকর হবে। পুরো যাত্রায় তালবিয়া পড়তে থাকুন।",
        ),
      },
    ],
    duas: [
      {
        title: t("Supplication for travel", "সফরের দোয়া"),
        arabic:
          "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى\nوَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا\nوَاطْوِ عَنَّا بُعْدَهُ",
        translation: t(
          "O Allah, we ask You on this journey for righteousness, piety and deeds that please You. O Allah, make this journey easy for us and fold up its distance.",
          "হে আল্লাহ! এই সফরে আমরা আপনার কাছে নেকী, তাকওয়া এবং এমন আমল প্রার্থনা করি যা আপনি পছন্দ করেন। হে আল্লাহ! এই সফরকে আমাদের জন্য সহজ করুন এবং এর দূরত্ব কমিয়ে দিন।",
        ),
        reference: t("Sahih Muslim: 1342", "সহীহ মুসলিম: ১৩৪২"),
      },
      {
        title: t("The Talbiyah", "তালবিয়া"),
        arabic:
          "لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ\nلَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ\nإِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ\nلَا شَرِيكَ لَكَ",
        translation: t(
          "Here I am, O Allah, here I am. Here I am — You have no partner — here I am. Verily all praise, grace and sovereignty are Yours alone. You have no partner.",
          "হাজির আমি, হে আল্লাহ, হাজির আমি। হাজির আমি — আপনার কোনো শরিক নেই — হাজির আমি। নিশ্চয়ই সকল প্রশংসা, নিয়ামত ও রাজত্ব শুধুমাত্র আপনারই। আপনার কোনো শরিক নেই।",
        ),
        reference: t("Bukhari: 1549 · Muslim: 1184", "বুখারি: ১৫৪৯ · মুসলিম: ১১৮৪"),
      },
      {
        title: t("Supplication on boarding", "বিমানে আরোহণের দোয়া"),
        arabic:
          "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ\nوَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
        translation: t(
          "Glory to Him who has subjected this to us, for we could never have accomplished it. And to our Lord we shall surely return.",
          "পবিত্র সেই সত্তা যিনি এটিকে আমাদের বশীভূত করেছেন, অথচ আমরা নিজেরা এটিকে বশে আনতে অক্ষম ছিলাম। আর নিশ্চয়ই আমরা আমাদের রবের কাছেই প্রত্যাবর্তনকারী।",
        ),
        reference: t("Surah az-Zukhruf: 13–14 · Tirmidhi: 3446", "সূরা যুখরুফ: ১৩–১৪ · তিরমিযি: ৩৪৪৬"),
      },
    ],
    cta: t("Board the plane ✈", "বিমানে উঠুন ✈"),
    flight: true,
  },
  {
    id: "arrival",
    icon: "kaaba",
    focus: "mecca",
    phase: t("Arrival in the Holy City", "পবিত্র নগরীতে আগমন"),
    title: t("Marhaba! Welcome to Makkah", "মারহাবা! মক্কায় স্বাগতম"),
    intro: t(
      "Alhamdulillah — you have reached Makkah al-Mukarramah, the most sacred city on earth. From here the Tawaf, the Sa'i and the remaining rites of Hajj begin.",
      "আলহামদুলিল্লাহ — আপনি মক্কাল মুকাররামায় পৌঁছেছেন, পৃথিবীর পবিত্রতম শহরে। এখান থেকে তাওয়াফ, সায়ী এবং হজ্জের পরবর্তী পবিত্র ধাপগুলো শুরু হবে।",
    ),
    duas: [
      {
        title: t("Supplication on entering Makkah — Musnad Ahmad", "মক্কায় প্রবেশের দোয়া — মুসনাদ আহমাদ"),
        arabic:
          "اللَّهُمَّ هَذَا حَرَمُكَ وَأَمْنُكَ\nفَحَرِّمْنِي عَلَى النَّارِ وَأَمِّنِّي مِنْ عَذَابِكَ\nيَوْمَ تَبْعَثُ عِبَادَكَ",
        translation: t(
          "O Allah, this is Your sanctuary and Your place of safety. Forbid me to the Fire and keep me safe from Your punishment on the Day You raise Your servants.",
          "হে আল্লাহ! এটি আপনার হারাম ও নিরাপদ স্থান। আমাকে জাহান্নামের আগুনের জন্য হারাম করুন এবং কিয়ামতের দিন আপনার আজাব থেকে নিরাপদ রাখুন।",
        ),
        reference: t("Musnad Ahmad", "মুসনাদ আহমাদ"),
      },
    ],
    dhikr: t("SubhanAllah · Alhamdulillah · Allahu Akbar", "সুবহানাল্লাহ · আলহামদুলিল্লাহ · আল্লাহু আকবার"),
    cta: t("Begin the rites of Hajj 🕋", "হজ্জের রিচুয়াল শুরু করুন 🕋"),
  },
  {
    id: "tawaf",
    icon: "kaaba",
    focus: "mecca",
    phase: t("In Masjid al-Haram", "মসজিদুল হারামে"),
    title: t("Tawaf — Seven Circuits", "তাওয়াফ — সাত চক্কর"),
    details: [
      {
        title: t("Begin at the Black Stone", "হাজরে আসওয়াদ থেকে শুরু"),
        body: t(
          "Face the Black Stone, point toward it and say 'Bismillah, Allahu Akbar'. Begin each circuit from here, keeping the Kaaba on your left.",
          "হাজরে আসওয়াদের দিকে মুখ করে ইশারা করে বলুন 'বিসমিল্লাহ, আল্লাহু আকবার'। কাবা বাঁ দিকে রেখে এখান থেকেই প্রতিটি চক্কর শুরু করুন।",
        ),
      },
      {
        title: t("Complete seven circuits", "সাত চক্কর সম্পন্ন করুন"),
        body: t(
          "Circle the Kaaba seven times anticlockwise. In the first three, men walk briskly (raml). Supplicate freely in your own words throughout.",
          "কাবার চারপাশে ঘড়ির কাঁটার বিপরীতে সাতবার ঘুরুন। প্রথম তিন চক্করে পুরুষরা দ্রুত হাঁটেন (রমল)। পুরো সময় নিজের ভাষায় দোয়া করুন।",
        ),
      },
      {
        title: t("Pray at Maqam Ibrahim & drink Zamzam", "মাকামে ইব্রাহীমে নামায ও যমযম"),
        body: t(
          "After Tawaf, pray two rak'ahs behind Maqam Ibrahim, then drink your fill of Zamzam water.",
          "তাওয়াফের পর মাকামে ইব্রাহীমের পেছনে দুই রাকাত পড়ুন, এরপর তৃপ্তি ভরে যমযম পান করুন।",
        ),
      },
    ],
    duas: [
      {
        title: t("Between the Yemeni Corner & the Black Stone", "রুকনে ইয়ামানী ও হাজরে আসওয়াদের মাঝে"),
        arabic:
          "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً\nوَفِي الْآخِرَةِ حَسَنَةً\nوَقِنَا عَذَابَ النَّارِ",
        translation: t(
          "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
          "হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দিন ও আখিরাতে কল্যাণ দিন এবং জাহান্নামের আযাব থেকে রক্ষা করুন।",
        ),
        reference: t("Al-Baqarah: 201 · Abu Dawud: 1892", "সূরা বাকারা: ২০১ · আবু দাউদ: ১৮৯২"),
      },
    ],
    cta: t("Proceed to Sa'i", "সায়ীর দিকে এগিয়ে যান"),
  },
  {
    id: "sai",
    icon: "mosque",
    focus: "mecca",
    phase: t("Between Safa & Marwah", "সাফা ও মারওয়ার মাঝে"),
    title: t("Sa'i — In the Footsteps of Hajar", "সায়ী — হাজেরা (আঃ)-এর পদচিহ্নে"),
    details: [
      {
        title: t("Begin at Safa", "সাফা থেকে শুরু"),
        body: t(
          "Climb Mount Safa, face the Kaaba, and recite the verse and the dhikr three times, supplicating between each.",
          "সাফা পাহাড়ে উঠুন, কাবার দিকে মুখ করুন এবং আয়াত ও যিকর তিনবার পাঠ করুন, প্রতিবারের মাঝে দোয়া করুন।",
        ),
      },
      {
        title: t("Walk seven times to Marwah", "মারওয়া পর্যন্ত সাতবার চলুন"),
        body: t(
          "Walk between Safa and Marwah seven times. Men jog between the two green markers. The trip ends at Marwah.",
          "সাফা ও মারওয়ার মাঝে সাতবার চলুন। পুরুষরা দুই সবুজ চিহ্নের মাঝে দৌড়ান। যাত্রা মারওয়ায় শেষ হয়।",
        ),
      },
    ],
    duas: [
      {
        title: t("Beginning the Sa'i at Safa", "সাফায় সায়ী শুরুর দোয়া"),
        arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ\nأَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ",
        translation: t(
          "Indeed Safa and Marwah are among the symbols of Allah. I begin with what Allah began with.",
          "নিশ্চয়ই সাফা ও মারওয়া আল্লাহর নিদর্শনসমূহের অন্তর্ভুক্ত। আল্লাহ যা দিয়ে শুরু করেছেন আমি তা দিয়েই শুরু করছি।",
        ),
        reference: t("Al-Baqarah: 158 · Muslim: 1218", "সূরা বাকারা: ১৫৮ · মুসলিম: ১২১৮"),
      },
      {
        title: t("Atop Safa and Marwah", "সাফা ও মারওয়ার চূড়ায়"),
        arabic:
          "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ\nلَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: t(
          "None has the right to be worshipped but Allah alone, He has no partner. His is the dominion and His is the praise, and He is over all things capable.",
          "আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই, প্রশংসা তাঁরই, তিনি সর্ববিষয়ে ক্ষমতাবান।",
        ),
        reference: t("Muslim: 1218", "মুসলিম: ১২১৮"),
      },
    ],
    cta: t("Depart for Mina", "মিনার দিকে রওনা হন"),
  },
  {
    id: "mina",
    icon: "building",
    focus: "mecca",
    phase: t("8th Dhul-Hijjah — Yawm at-Tarwiyah", "৮ই জিলহজ্জ — ইয়াওমুত তারবিয়া"),
    title: t("The Day at Mina", "মিনায় অবস্থান"),
    details: [
      {
        title: t("Travel to Mina", "মিনায় যান"),
        body: t(
          "On the 8th of Dhul-Hijjah, move to the tent city of Mina before Dhuhr, reciting the Talbiyah.",
          "৮ই জিলহজ্জ যোহরের পূর্বে তালবিয়া পড়তে পড়তে মিনার তাঁবু-নগরীতে চলে যান।",
        ),
      },
      {
        title: t("Pray five prayers, shortened", "পাঁচ ওয়াক্ত নামায কসর করে পড়ুন"),
        body: t(
          "Pray Dhuhr, Asr, Maghrib, Isha and the next Fajr at Mina, shortening the four-unit prayers (qasr) but not combining them.",
          "মিনায় যোহর, আসর, মাগরিব, এশা ও পরদিনের ফজর পড়ুন; চার রাকাত নামায কসর করুন তবে জমা করবেন না।",
        ),
      },
    ],
    duas: [
      {
        title: t("Keep reciting the Talbiyah", "তালবিয়া পড়তে থাকুন"),
        arabic: "لَبَّيْكَ اللّٰهُمَّ لَبَّيْكَ\nلَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ",
        translation: t(
          "Here I am, O Allah, here I am. Here I am, You have no partner, here I am.",
          "হাজির আমি, হে আল্লাহ, হাজির আমি। হাজির আমি, আপনার কোনো শরিক নেই, হাজির আমি।",
        ),
        reference: t("Bukhari: 1549", "বুখারি: ১৫৪৯"),
      },
    ],
    cta: t("Stand at Arafah", "আরাফায় অবস্থান করুন"),
  },
  {
    id: "arafah",
    icon: "mosque",
    focus: "mecca",
    phase: t("9th Dhul-Hijjah — the greatest day", "৯ই জিলহজ্জ — শ্রেষ্ঠ দিন"),
    title: t("Standing at Arafah — the Essence of Hajj", "আরাফায় অবস্থান — হজ্জের মূল"),
    intro: t(
      "'Hajj is Arafah.' From midday until sunset, stand in humble du'a on the plain of Arafah. The Prophet ﷺ said the best supplication is that of the Day of Arafah.",
      "‘হজ্জ মানেই আরাফাহ।’ দ্বিপ্রহর থেকে সূর্যাস্ত পর্যন্ত আরাফার ময়দানে বিনীতভাবে দোয়ায় দাঁড়িয়ে থাকুন। রাসূল ﷺ বলেছেন, শ্রেষ্ঠ দোয়া হলো আরাফার দিনের দোয়া।",
    ),
    details: [
      {
        title: t("Combine Dhuhr and Asr", "যোহর ও আসর একত্রে পড়ুন"),
        body: t(
          "At Namirah, pray Dhuhr and Asr combined and shortened, then devote yourself entirely to supplication.",
          "নামিরায় যোহর ও আসর একত্রে কসর করে পড়ুন, এরপর সম্পূর্ণভাবে দোয়ায় মগ্ন হন।",
        ),
      },
      {
        title: t("Supplicate until sunset", "সূর্যাস্ত পর্যন্ত দোয়া করুন"),
        body: t(
          "Face the Qiblah and raise your hands in continuous du'a. Do not leave Arafah until the sun has fully set.",
          "কিবলামুখী হয়ে হাত তুলে একনাগাড়ে দোয়া করুন। সূর্য সম্পূর্ণ অস্ত যাওয়ার আগে আরাফাহ ত্যাগ করবেন না।",
        ),
      },
    ],
    duas: [
      {
        title: t("The best du'a — of the Day of Arafah", "শ্রেষ্ঠ দোয়া — আরাফার দিনের"),
        arabic:
          "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ\nلَهُ الْمُلْكُ وَلَهُ الْحَمْدُ\nوَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        translation: t(
          "None has the right to be worshipped but Allah alone, He has no partner. His is the dominion and His is the praise, and He is over all things capable.",
          "আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই, প্রশংসা তাঁরই, তিনি সর্ববিষয়ে ক্ষমতাবান।",
        ),
        reference: t("Tirmidhi: 3585", "তিরমিযি: ৩৫৮৫"),
      },
    ],
    cta: t("Move to Muzdalifah", "মুজদালিফায় যান"),
  },
  {
    id: "muzdalifah",
    icon: "star",
    focus: "mecca",
    phase: t("Night of the 9th", "৯ তারিখের রাত"),
    title: t("The Night at Muzdalifah", "মুজদালিফায় রাত"),
    details: [
      {
        title: t("Combine Maghrib and Isha", "মাগরিব ও এশা একত্রে পড়ুন"),
        body: t(
          "On reaching Muzdalifah after sunset, pray Maghrib and Isha together, then rest under the open sky.",
          "সূর্যাস্তের পর মুজদালিফায় পৌঁছে মাগরিব ও এশা একত্রে পড়ুন, এরপর খোলা আকাশের নিচে বিশ্রাম নিন।",
        ),
      },
      {
        title: t("Gather pebbles & make dhikr", "কঙ্কর সংগ্রহ ও যিকর"),
        body: t(
          "Collect the pebbles for the stoning of the Jamarat. After Fajr, face the Qiblah at Mash'ar al-Haram and supplicate.",
          "জামারাতে নিক্ষেপের জন্য কঙ্কর সংগ্রহ করুন। ফজরের পর মাশআরুল হারামে কিবলামুখী হয়ে দোয়া করুন।",
        ),
      },
    ],
    duas: [
      {
        title: t("Dhikr at Mash'ar al-Haram", "মাশআরুল হারামে যিকর"),
        arabic:
          "اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ\nاللَّهُمَّ آتِنَا فِي الدُّنْيَا حَسَنَةً\nوَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        translation: t(
          "Allah is the Greatest, none has the right to be worshipped but Allah. O Allah, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
          "আল্লাহ সর্বশ্রেষ্ঠ, আল্লাহ ছাড়া কোনো ইলাহ নেই। হে আল্লাহ! আমাদের দুনিয়াতে কল্যাণ দিন ও আখিরাতে কল্যাণ দিন এবং জাহান্নামের আযাব থেকে রক্ষা করুন।",
        ),
        reference: t("Al-Baqarah: 198–201 · Muslim: 1218", "সূরা বাকারা: ১৯৮–২০১ · মুসলিম: ১২১৮"),
      },
    ],
    cta: t("Stone the Jamarat", "জামারাতে কঙ্কর নিক্ষেপ"),
  },
  {
    id: "jamarat",
    icon: "shield",
    focus: "mecca",
    phase: t("10th Dhul-Hijjah — Eid al-Adha", "১০ই জিলহজ্জ — ঈদুল আজহা"),
    title: t("Stoning, Sacrifice & Shaving", "কঙ্কর, কুরবানি ও হলক"),
    details: [
      {
        title: t("Stone Jamrat al-Aqabah", "জামরাতুল আকাবায় নিক্ষেপ"),
        body: t(
          "On the Day of Eid, throw seven pebbles at the large pillar, saying 'Allahu Akbar' with each.",
          "ঈদের দিন বড় শয়তানকে সাতটি কঙ্কর নিক্ষেপ করুন, প্রতিটির সাথে 'আল্লাহু আকবার' বলুন।",
        ),
      },
      {
        title: t("Offer the sacrifice (Hady)", "কুরবানি দিন (হাদী)"),
        body: t(
          "Offer the sacrificial animal in the name of Allah, in gratitude and following the Sunnah of Ibrahim ﷺ.",
          "আল্লাহর নামে কৃতজ্ঞতাভরে ও ইব্রাহীম ﷺ-এর সুন্নাহ অনুসরণে কুরবানির পশু জবাই করুন।",
        ),
      },
      {
        title: t("Shave or trim the hair", "মাথা মুণ্ডন বা চুল ছাঁটুন"),
        body: t(
          "Men shave the head (preferred) or trim; women cut a fingertip's length. The first release from Ihram now takes place.",
          "পুরুষরা মাথা মুণ্ডান (উত্তম) বা ছাঁটেন; নারীরা আঙুলের অগ্রভাগ পরিমাণ ছাঁটেন। এখন প্রথম তাহাল্লুল সম্পন্ন হয়।",
        ),
      },
    ],
    duas: [
      {
        title: t("With each pebble", "প্রতিটি কঙ্কর নিক্ষেপে"),
        arabic: "اللَّهُ أَكْبَرُ",
        translation: t("Allah is the Greatest.", "আল্লাহ সর্বশ্রেষ্ঠ।"),
        reference: t("Bukhari: 1750", "বুখারি: ১৭৫০"),
      },
      {
        title: t("At the sacrifice", "কুরবানির সময়"),
        arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ\nاللَّهُمَّ هَذَا مِنْكَ وَلَكَ",
        translation: t(
          "In the name of Allah, and Allah is the Greatest. O Allah, this is from You and for You.",
          "আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ। হে আল্লাহ! এটি আপনার পক্ষ থেকে ও আপনারই জন্য।",
        ),
        reference: t("Muslim: 1967 · Abu Dawud: 2810", "মুসলিম: ১৯৬৭ · আবু দাউদ: ২৮১০"),
      },
    ],
    cta: t("Return for Tawaf al-Ifadah", "তাওয়াফুল ইফাদার জন্য ফিরুন"),
  },
  {
    id: "tawaf-ifadah",
    icon: "kaaba",
    focus: "mecca",
    phase: t("10th Dhul-Hijjah", "১০ই জিলহজ্জ"),
    title: t("Tawaf al-Ifadah & Sa'i", "তাওয়াফুল ইফাদা ও সায়ী"),
    details: [
      {
        title: t("Perform Tawaf al-Ifadah", "তাওয়াফুল ইফাদা করুন"),
        body: t(
          "Return to the Kaaba and perform seven circuits — an essential pillar of Hajj — followed by two rak'ahs at Maqam Ibrahim.",
          "কাবায় ফিরে সাত চক্কর তাওয়াফ করুন — এটি হজ্জের একটি রুকন — এরপর মাকামে ইব্রাহীমে দুই রাকাত পড়ুন।",
        ),
      },
      {
        title: t("Perform the Sa'i", "সায়ী করুন"),
        body: t(
          "Perform Sa'i between Safa and Marwah. After this, all restrictions of Ihram are completely lifted.",
          "সাফা ও মারওয়ার মাঝে সায়ী করুন। এর পর ইহরামের সকল বিধিনিষেধ সম্পূর্ণ উঠে যায়।",
        ),
      },
    ],
    duas: [
      {
        title: t("Between the corners", "দুই রুকনের মাঝে"),
        arabic:
          "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً\nوَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        translation: t(
          "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
          "হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দিন ও আখিরাতে কল্যাণ দিন এবং জাহান্নামের আযাব থেকে রক্ষা করুন।",
        ),
        reference: t("Al-Baqarah: 201", "সূরা বাকারা: ২০১"),
      },
    ],
    cta: t("Spend the Days of Tashreeq", "আইয়ামে তাশরীক কাটান"),
  },
  {
    id: "tashreeq",
    icon: "shield",
    focus: "mecca",
    phase: t("11th–13th Dhul-Hijjah", "১১–১৩ই জিলহজ্জ"),
    title: t("The Days of Tashreeq", "আইয়ামে তাশরীক"),
    details: [
      {
        title: t("Stone the three Jamarat", "তিন জামারাতে নিক্ষেপ"),
        body: t(
          "Each afternoon after Dhuhr, stone the small, middle and large Jamarat in order, seven pebbles each with the takbir.",
          "প্রতিদিন যোহরের পর ক্রমানুসারে ছোট, মধ্যম ও বড় জামারাতে সাতটি করে কঙ্কর নিক্ষেপ করুন, প্রতিটিতে তাকবীর।",
        ),
      },
      {
        title: t("Days of remembrance", "যিকরের দিন"),
        body: t(
          "These are days of eating, drinking and the remembrance of Allah. Recite the takbir of Tashreeq abundantly.",
          "এগুলো পানাহার ও আল্লাহর স্মরণের দিন। তাশরীকের তাকবীর বেশি বেশি পাঠ করুন।",
        ),
      },
    ],
    duas: [
      {
        title: t("Takbir of Tashreeq", "তাশরীকের তাকবীর"),
        arabic:
          "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ\nوَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
        translation: t(
          "Allah is the Greatest, Allah is the Greatest, none has the right to be worshipped but Allah. Allah is the Greatest, Allah is the Greatest, and to Allah belongs all praise.",
          "আল্লাহ সর্বশ্রেষ্ঠ, আল্লাহ সর্বশ্রেষ্ঠ, আল্লাহ ছাড়া কোনো ইলাহ নেই। আল্লাহ সর্বশ্রেষ্ঠ, আল্লাহ সর্বশ্রেষ্ঠ, সকল প্রশংসা আল্লাহরই।",
        ),
        reference: t("Reported from Ibn Mas'ud", "ইবনে মাসঊদ (রাঃ) থেকে বর্ণিত"),
      },
    ],
    cta: t("The Farewell Tawaf", "বিদায়ী তাওয়াফ"),
  },
  {
    id: "farewell",
    icon: "kaaba",
    focus: "mecca",
    phase: t("Departure from Makkah", "মক্কা থেকে বিদায়"),
    title: t("The Farewell Tawaf", "বিদায়ী তাওয়াফ"),
    intro: t(
      "The final rite before leaving Makkah is Tawaf al-Wada. Make it the last thing you do, then depart with a heart full of hope — praying that it is not your last visit to the Sacred House. Hajj Mabrur, in sha Allah.",
      "মক্কা ত্যাগের পূর্বে শেষ মানাসিক হলো তাওয়াফুল বিদা। এটিকে আপনার সর্বশেষ কাজ বানান, এরপর আশায় ভরা হৃদয়ে বিদায় নিন — দোয়া করুন যেন এটিই পবিত্র ঘরে আপনার শেষ সফর না হয়। হজ্জ মাবরূর, ইনশাআল্লাহ।",
    ),
    duas: [
      {
        title: t("On departing the Sacred House", "পবিত্র ঘর থেকে বিদায়ের দোয়া"),
        arabic:
          "اللَّهُمَّ لَا تَجْعَلْهُ آخِرَ الْعَهْدِ بِبَيْتِكَ الْحَرَامِ\nوَارْزُقْنِي الْعَوْدَ إِلَيْهِ مَرَّاتٍ",
        translation: t(
          "O Allah, do not make this the last of my covenant with Your Sacred House, and grant me to return to it again and again.",
          "হে আল্লাহ! এটিকে আপনার পবিত্র ঘরের সাথে আমার শেষ সাক্ষাৎ বানাবেন না, এবং বারবার এখানে ফিরে আসার তাওফিক দিন।",
        ),
        reference: t("A supplication of the departing pilgrims", "বিদায়ী হাজীদের একটি দোয়া"),
      },
    ],
    dhikr: t("Hajj Mabrur · May Allah accept", "হজ্জ মাবরূর · আল্লাহ কবুল করুন"),
    cta: t("Restart the journey", "সফর পুনরায় শুরু করুন"),
  },
];

/* ═══════════════════════════════════════════════════════════════
   PHASE 2 — the rites on a 3D satellite map (maplibre-gl)
   Esri World Imagery tiles; each stage flies a tilted camera to
   the real location of the rite, with its supplication.
   ═══════════════════════════════════════════════════════════════ */

export const MAP_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
export const MAP_ATTRIBUTION = "© Esri, Maxar, Earthstar Geographics";

export type MapMarker = { id: string; lngLat: [number, number]; label: L; color: string };

/** The eight holy-site markers placed on the satellite map. */
export const MAP_MARKERS: MapMarker[] = [
  { id: "miqat", lngLat: [41.37, 20.52], label: t("Miqat", "মীকাত"), color: "#88bbff" },
  { id: "kaba", lngLat: [39.8262, 21.4225], label: t("Ka'ba", "কা'বা"), color: "#d4af37" },
  { id: "safa", lngLat: [39.8271, 21.4218], label: t("Safa", "সাফা"), color: "#ff9944" },
  { id: "marwa", lngLat: [39.8285, 21.4234], label: t("Marwah", "মারওয়া"), color: "#ff9944" },
  { id: "mina", lngLat: [39.8936, 21.4137], label: t("Mina", "মিনা"), color: "#22ff88" },
  { id: "jamarat", lngLat: [39.8725, 21.4228], label: t("Jamarat", "জামারাত"), color: "#ff4455" },
  { id: "muzdalifah", lngLat: [39.9436, 21.3742], label: t("Muzdalifah", "মুযদালিফা"), color: "#aaaaff" },
  { id: "arafat", lngLat: [39.9846, 21.3547], label: t("Arafah", "আরাফাহ"), color: "#ffdd55" },
];

export type MapCam = { center: [number, number]; zoom: number; pitch: number; bearing: number };
export type MapDua = { title: L; arabic: string; translation: L; source: L };
export type MapStage = {
  id: string;
  /** "tawaf" stages orbit the camera around the Ka'ba. */
  mode: "tawaf" | "static";
  cam: MapCam;
  modeTxt: L;
  title: L;
  /** May contain <b>…</b>. */
  desc: L;
  dua: MapDua;
};

export const mapStages: MapStage[] = [
  {
    id: "miqat",
    mode: "static",
    cam: { center: [41.37, 20.52], zoom: 11, pitch: 45, bearing: 0 },
    modeTxt: t("Miqat — Yalamlam", "মীকাত — ইয়ালামলাম"),
    title: t("Miqat — the Boundary of Ihram", "মীকাত — ইহরামের সীমানা"),
    desc: t(
      "The Miqat for pilgrims from Bangladesh is <b>Yalamlam</b>. Before crossing this boundary by air you must already be in Ihram, having made the intention and the Talbiyah. One may not cross the Miqat except in the state of Ihram.",
      "বাংলাদেশ থেকে আগত হাজীদের মীকাত হল <b>ইয়ালামলাম</b>। বিমানপথে এই সীমা অতিক্রমের আগেই ইহরামের পোশাক পরে নিয়্যাত ও তালবিয়া পড়তে হবে। মীকাত অতিক্রম করতে হলে অবশ্যই ইহরাম অবস্থায় হতে হবে।",
    ),
    dua: {
      title: t("Intention for Ihram", "ইহরামের নিয়্যাত"),
      arabic: "لَبَّيْكَ اللّٰهُمَّ حَجًّا",
      translation: t("Here I am, O Allah, for Hajj.", "হে আল্লাহ! আমি হজ্জের ইহরাম বাঁধলাম।"),
      source: t("Bukhari: 1554", "বুখারি: ১৫৫৪"),
    },
  },
  {
    id: "mecca-entry",
    mode: "static",
    cam: { center: [39.8262, 21.4225], zoom: 17, pitch: 55, bearing: -17 },
    modeTxt: t("Masjid al-Haram", "মসজিদুল হারাম"),
    title: t("Entering Makkah — Masjid al-Haram", "মক্কায় প্রবেশ — মসজিদুল হারাম"),
    desc: t(
      "On reaching Makkah, enter Masjid al-Haram with your right foot. The moment you first see the Ka'ba, supplicate — du'a at this moment is answered. Ensure you have wudu before beginning Tawaf.",
      "মক্কায় পৌঁছে ডান পা দিয়ে মসজিদুল হারামে প্রবেশ করুন। প্রথমবার কা'বা দেখামাত্র দোয়া করুন — এই মুহূর্তের দোয়া কবুল হয়। তাওয়াফ শুরু করার আগে অযু নিশ্চিত করুন।",
    ),
    dua: {
      title: t("Du'a on entering the mosque", "মসজিদে প্রবেশের দোয়া"),
      arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      translation: t("O Allah, open for me the gates of Your mercy.", "হে আল্লাহ! আমার জন্য আপনার রহমতের দরজাসমূহ খুলে দিন।"),
      source: t("Muslim: 713", "মুসলিম: ৭১৩"),
    },
  },
  {
    id: "tawaf",
    mode: "tawaf",
    cam: { center: [39.8262, 21.4225], zoom: 18.5, pitch: 65, bearing: -17 },
    modeTxt: t("Tawaf — Circling the Ka'ba", "তাওয়াফ — কা'বা প্রদক্ষিণ"),
    title: t("Tawaf of Umrah — 7 Circuits", "উমরাহর তাওয়াফ — ৭ চক্কর"),
    desc: t(
      "Circle the Ka'ba seven times anticlockwise, beginning at the Black Stone. In the first three circuits men do raml (brisk walking). Touch the Yemeni Corner and supplicate. After Tawaf, pray two rak'ahs behind Maqam Ibrahim.",
      "হাজারে আসওয়াদ থেকে ঘড়ির বিপরীতে ৭ বার কা'বা প্রদক্ষিণ করুন। প্রথম ৩ চক্করে পুরুষরা রমল করুন (দ্রুত হাঁটুন)। রুকনে ইয়ামানি ছুঁয়ে দোয়া পড়ুন। তাওয়াফ শেষে মাকামে ইব্রাহিমের পেছনে দুই রাকাত পড়ুন।",
    ),
    dua: {
      title: t("From the Yemeni Corner to Maqam Ibrahim", "রুকনে ইয়ামানি থেকে মাকামে ইব্রাহিম পর্যন্ত"),
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      translation: t(
        "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
        "হে রব! দুনিয়ায় কল্যাণ, আখিরাতে কল্যাণ এবং জাহান্নামের আজাব থেকে রক্ষা করুন।",
      ),
      source: t("Al-Baqarah: 201", "সূরা বাকারা: ২০১"),
    },
  },
  {
    id: "sai",
    mode: "static",
    cam: { center: [39.8278, 21.4226], zoom: 18, pitch: 50, bearing: 5 },
    modeTxt: t("Sa'i — Safa to Marwah", "সাফা-মারওয়া সা'ঈ"),
    title: t("Sa'i between Safa & Marwah — 7 times", "সাফা-মারওয়া সা'ঈ — ৭ বার"),
    desc: t(
      "Walk between Safa and Marwah seven times (Safa → Marwah counts as one). Men jog briskly between the two green lights. Each time on Safa and Marwah, face the Qiblah and supplicate.",
      "সাফা পাহাড় থেকে মারওয়া পর্যন্ত ৭ বার যাতায়াত করুন (সাফা → মারওয়া = ১ বার)। সবুজ বাতির মধ্যবর্তী অংশে পুরুষরা দ্রুত হাঁটুন (রমল)। প্রতিবার সাফা ও মারওয়ায় উঠে কিবলামুখী হয়ে দোয়া করুন।",
    ),
    dua: {
      title: t("Standing on Safa", "সাফায় দাঁড়িয়ে"),
      arabic:
        "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      translation: t(
        "None has the right to be worshipped but Allah alone, with no partner. His is the dominion and the praise, and He is over all things capable.",
        "আল্লাহ ছাড়া কোনো ইলাহ নেই, একক, শরিকহীন। রাজত্ব ও প্রশংসা তাঁরই, তিনি সর্বশক্তিমান।",
      ),
      source: t("Muslim: 1218", "মুসলিম: ১২১৮"),
    },
  },
  {
    id: "mina",
    mode: "static",
    cam: { center: [39.8936, 21.4137], zoom: 14, pitch: 45, bearing: 0 },
    modeTxt: t("Mina — 8th Dhul-Hijjah", "মিনা — ৮ই যিলহজ্জ"),
    title: t("Departure to Mina — 8th Dhul-Hijjah", "মিনায় গমন — ৮ই যিলহজ্জ (তারবিয়া)"),
    desc: t(
      "After Fajr on the 8th, set out for Mina. Pray Dhuhr, Asr, Maghrib, Isha and the next Fajr at Mina, shortening the four-rak'ah prayers to two (qasr). Spend the night in Mina.",
      "৮ই যিলহজ্জ ফজরের পর মিনায় রওনা দিন। জোহর, আসর, মাগরিব, এশা ও পরদিন ফজর — ৫ ওয়াক্ত নামায মিনায় পড়ুন। চার রাকাত নামায দুই রাকাত (কসর) করে পড়ুন। রাত মিনায় কাটান।",
    ),
    dua: {
      title: t("Du'a on entering Mina", "মিনায় প্রবেশের দোয়া"),
      arabic: "اللَّهُمَّ هَذِهِ مِنًى فَامْنُنْ عَلَيَّ بِمَا مَنَنْتَ بِهِ عَلَى أَوْلِيَائِكَ",
      translation: t(
        "O Allah, this is Mina; bestow upon me as You bestowed upon Your devoted servants.",
        "হে আল্লাহ! এটি মিনা — আপনার প্রিয় বান্দাদের মতো আমার উপরও অনুগ্রহ করুন।",
      ),
      source: t("Bayhaqi: 9398", "বায়হাকি: ৯৩৯৮"),
    },
  },
  {
    id: "arafah",
    mode: "static",
    cam: { center: [39.9846, 21.3547], zoom: 12, pitch: 40, bearing: 0 },
    modeTxt: t("Arafah — Pillar of Hajj", "আরাফাহ — হজ্জের রুকন"),
    title: t("Standing at Arafah — 9th Dhul-Hijjah ⭐", "আরাফাহয় উকুফ — ৯ই যিলহজ্জ ⭐"),
    desc: t(
      "The greatest pillar of Hajj — 'Hajj is Arafah.' From after Dhuhr until sunset, stand on the plain of Arafah. Recite the Talbiyah, tahlil, takbir, tasbih and istighfar abundantly. Weep and supplicate.",
      "হজ্জের সবচেয়ে গুরুত্বপূর্ণ রুকন — \"হজ্জ হল আরাফাহ\"। যোহরের পর থেকে সূর্যাস্ত পর্যন্ত আরাফার ময়দানে অবস্থান করুন। বেশি বেশি তালবিয়া, তাহলিল, তাকবির, তাসবিহ ও ইস্তিগফার পড়ুন। কান্নাকাটি করে দোয়া করুন।",
    ),
    dua: {
      title: t("The best du'a of Arafah", "আরাফার সর্বোত্তম দোয়া"),
      arabic:
        "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      translation: t(
        "None has the right to be worshipped but Allah alone, with no partner. His is all dominion and praise, and He is over all things capable.",
        "আল্লাহ ছাড়া কোনো ইলাহ নেই, একক, শরিকহীন। সকল রাজত্ব ও প্রশংসা তাঁর, তিনি সর্বশক্তিমান।",
      ),
      source: t("Tirmidhi: 3585 — the best dhikr of Arafah", "তিরমিযি: ৩৫৮৫ — আরাফার শ্রেষ্ঠ দিকর"),
    },
  },
  {
    id: "muzdalifah",
    mode: "static",
    cam: { center: [39.9436, 21.3742], zoom: 12, pitch: 40, bearing: 0 },
    modeTxt: t("Muzdalifah — night of the 9th", "মুযদালিফা — ৯ই যিলহজ্জ রাত"),
    title: t("The Night at Muzdalifah", "মুযদালিফায় রাত্রিযাপন"),
    desc: t(
      "After sunset, come to Muzdalifah. Pray Maghrib and Isha together (Isha shortened) with one adhan. Spend the night here. After Fajr, set out for Mina before sunrise. Collect <b>70 small pebbles</b> here.",
      "সূর্যাস্তের পর মুযদালিফায় আসুন। মাগরিব ও এশা এক আযানে কসর করে পড়ুন। রাত এখানে কাটান। ফজর পড়ে সূর্যোদয়ের আগে মিনার দিকে রওনা হন। এখান থেকে <b>৭০টি ছোট নুড়ি পাথর</b> সংগ্রহ করুন।",
    ),
    dua: {
      title: t("Morning du'a at Muzdalifah", "মুযদালিফায় সকালের দোয়া"),
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      translation: t(
        "O Allah, by You we enter the morning and the evening, by You we live and die, and to You is the resurrection.",
        "হে আল্লাহ! আপনার কৃপায় আমরা সকালে উঠলাম, সন্ধ্যায় পৌঁছলাম, আপনার সাহায্যে বাঁচি ও মরি এবং আপনার দিকেই পুনরুত্থান।",
      ),
      source: t("Tirmidhi: 3391", "তিরমিযি: ৩৩৯১"),
    },
  },
  {
    id: "jamarat",
    mode: "static",
    cam: { center: [39.8725, 21.4228], zoom: 16, pitch: 55, bearing: 0 },
    modeTxt: t("Jamarat — Day of Sacrifice", "জামারাত — কুরবানির দিন"),
    title: t("Jamrat al-Aqabah — 10th Dhul-Hijjah", "জামারাতুল আকাবা — ১০ই যিলহজ্জ"),
    desc: t(
      "After Fajr, return to Mina and stone <b>Jamrat al-Aqabah</b> (the large pillar) with 7 pebbles — saying 'Allahu Akbar' with each. Then shave (halq) or trim (qasr) the hair, and offer the sacrifice. After this you leave Ihram.",
      "ফজরের পর মিনায় ফিরে <b>জামারাতুল আকাবা</b> (বড় শয়তান)-কে ৭টি পাথর মারুন — প্রতিটিতে \"আল্লাহু আকবার\"। এরপর মাথা মুণ্ডন (হলক) অথবা চুল ছোট করুন (কসর)। তারপর কুরবানি করুন। এরপর ইহরাম খুলে ফেলুন।",
    ),
    dua: {
      title: t("When throwing the pebbles", "পাথর মারার সময়"),
      arabic: "اللَّهُ أَكْبَرُ",
      translation: t("Allah is the Greatest! (with each pebble)", "আল্লাহ সর্বমহান! (প্রতিটি পাথরের সাথে বলুন)"),
      source: t("Bukhari: 1750", "বুখারি: ১৭৫০"),
    },
  },
  {
    id: "ifadah",
    mode: "tawaf",
    cam: { center: [39.8262, 21.4225], zoom: 18, pitch: 60, bearing: -17 },
    modeTxt: t("Tawaf al-Ifadah — obligatory", "তাওয়াফুল ইফাদা — ফরজ"),
    title: t("Tawaf al-Ifadah — 10th Dhul-Hijjah", "তাওয়াফুল ইফাদা — ১০ই যিলহজ্জ"),
    desc: t(
      "After the sacrifice, come to Makkah and perform <b>Tawaf al-Ifadah</b> (the obligatory Tawaf) — a pillar of Hajj. After this all Ihram restrictions end. Many also perform Sa'i now (if it was not done during Umrah).",
      "কুরবানির পর মক্কায় এসে <b>তাওয়াফুল ইফাদা</b> (ফরজ তাওয়াফ) করুন — এটি হজ্জের ফরজ। এই তাওয়াফের পর ইহরামের সকল বিধিনিষেধ শেষ হয়। অনেকে এরপর সাফা-মারওয়া সা'ঈও করেন (যদি উমরার সময় না করা হয়)।",
    ),
    dua: {
      title: t("Du'a beginning the Tawaf", "তাওয়াফ শুরুর দোয়া"),
      arabic:
        "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ",
      translation: t(
        "In the name of Allah, Allah is the Greatest. O Allah, out of faith in You, belief in Your Book, and fulfilment of Your covenant.",
        "আল্লাহর নামে, আল্লাহ মহান। হে আল্লাহ, আপনার প্রতি ঈমান, কিতাবের সত্যায়ন ও অঙ্গীকার পূরণ করতে।",
      ),
      source: t("Ibn Hibban: 3823", "ইবনে হিব্বান: ৩৮২৩"),
    },
  },
  {
    id: "tashreeq",
    mode: "static",
    cam: { center: [39.8725, 21.4228], zoom: 15, pitch: 50, bearing: 0 },
    modeTxt: t("Days of Tashreeq — three Jamarat", "আইয়ামে তাশরীক — তিন জামারাত"),
    title: t("Days of Tashreeq — 11, 12, 13 Dhul-Hijjah", "আইয়ামে তাশরীক — ১১, ১২, ১৩ যিলহজ্জ"),
    desc: t(
      "Each day after Dhuhr, stone the three Jamarat: <b>Sughra</b> → <b>Wusta</b> → <b>Kubra</b> — 7 pebbles each. After the small and middle Jamarat, stand facing the Qiblah and supplicate. Leaving before sunset on the 12th (a shortened stay) is permitted.",
      "প্রতিদিন যোহরের পর তিনটি জামারাতে পাথর মারুন: <b>সুগ্রা</b> → <b>উস্তা</b> → <b>কুবরা</b> — প্রতিটিতে ৭টি পাথর। ছোট ও মধ্যম জামারাতে পাথর মেরে কিবলামুখী দাঁড়িয়ে দোয়া করুন। ১২ই তারিখে সূর্যাস্তের আগে বের হলে কসর (সংক্ষিপ্ত) জায়েজ।",
    ),
    dua: {
      title: t("After the small & middle Jamarat", "ছোট ও মধ্যম জামারাতের পর দোয়া"),
      arabic: "اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَذَنْبًا مَغْفُورًا وَسَعْيًا مَشْكُورًا",
      translation: t(
        "O Allah, make it an accepted Hajj, a forgiven sin, and an appreciated effort.",
        "হে আল্লাহ! এটিকে মকবুল হজ্জ, মাফ পাওয়া গুনাহ এবং স্বীকৃত সা'ঈ বানিয়ে দিন।",
      ),
      source: t("Ibn Majah — from Ibn Umar (RA)", "ইবনে মাজাহ — ইবনে উমার (রা.) থেকে"),
    },
  },
  {
    id: "farewell",
    mode: "tawaf",
    cam: { center: [39.8262, 21.4225], zoom: 18, pitch: 60, bearing: -17 },
    modeTxt: t("Farewell Tawaf", "বিদায়ী তাওয়াফ"),
    title: t("Tawaf al-Wada — the Farewell Tawaf", "তাওয়াফুল বিদা — বিদায়ী তাওয়াফ"),
    desc: t(
      "The last act before leaving Makkah is the <b>Farewell Tawaf</b> — it is obligatory (wajib). Bid farewell to the Ka'ba as if taking a final look. After the Tawaf, leave normally. Visiting Madinah afterwards is Sunnah.",
      "মক্কা ছাড়ার আগে সর্বশেষ কাজ হল <b>বিদায়ী তাওয়াফ</b> — এটি ওয়াজিব। শেষ দেখা নেওয়ার মতো করে কা'বাকে বিদায় দিন। তাওয়াফ শেষে পেছন দিকে হেঁটে বের না হয়ে স্বাভাবিকভাবে বের হোন। মদিনায় যাওয়া সুন্নাত।",
    ),
    dua: {
      title: t("The farewell du'a", "বিদায়ের দোয়া"),
      arabic: "اللَّهُمَّ لَا تَجْعَلْ هَذَا آخِرَ الْعَهْدِ بِبَيْتِكَ الْحَرَامِ",
      translation: t(
        "O Allah, do not make this the last of my covenant with Your Sacred House.",
        "হে আল্লাহ! এটিকে আপনার পবিত্র ঘরের সাথে আমার শেষ সাক্ষাৎ করবেন না।",
      ),
      source: t("Hakim: 1753", "হাকেম: ১৭৫৩"),
    },
  },
];

/** Shown after the final stage is completed. */
export const mapComplete = {
  title: t("🎉 Hajj Mabrur!", "🎉 হজ্জ মোবারক!"),
  desc: t(
    "<b>Alhamdulillah!</b> You have completed all the rites of the blessed Hajj. May Allah accept your Hajj.<br><br>You are now a <b>Hajji</b>.",
    "<b>আলহামদুলিল্লাহ!</b> আপনি পবিত্র হজ্জের সকল রিচুয়াল সম্পন্ন করেছেন। আল্লাহ আপনার হজ্জ কবুল করুন।<br><br>আপনি এখন <b>হাজী</b>।",
  ),
  dua: {
    title: t("Hajj Mabrur", "হজ্জে মাবরুর"),
    arabic: "الْحَجُّ الْمَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الْجَنَّةُ",
    translation: t("An accepted Hajj has no reward but Paradise.", "মকবুল হজ্জের বিনিময় শুধু জান্নাত।"),
    source: t("Bukhari: 1773 · Muslim: 1349", "বুখারি: ১৭৭৩ · মুসলিম: ১৩৪৯"),
  } as MapDua,
};
