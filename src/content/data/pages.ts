import type { LocalizedText } from "./packages";
import type { IconName } from "@/components/ui/Icon";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type ContentSection = {
  heading: LocalizedText;
  body?: LocalizedText[];
  list?: LocalizedText[];
};

export type ContentPage = {
  slug: string;
  icon: IconName;
  title: LocalizedText;
  subtitle: LocalizedText;
  sections: ContentSection[];
};

/** Informational pages rendered by app/[lang] routes via the InfoPage renderer. */
export const contentPages: Record<string, ContentPage> = {
  "hajj/visa-requirements": {
    slug: "hajj/visa-requirements",
    icon: "passport",
    title: t("Hajj Visa Requirements", "হজ্জ ভিসা প্রয়োজনীয়তা"),
    subtitle: t(
      "Everything you need to prepare for a smooth Hajj visa, handled with care by our documentation team.",
      "হজ্জ ভিসা সহজ করতে যা যা প্রয়োজন—আমাদের ডকুমেন্টেশন টিমের যত্নে।",
    ),
    sections: [
      {
        heading: t("Documents you will need", "যেসব কাগজপত্র লাগবে"),
        list: [
          t("Passport valid for at least 6 months with blank pages", "কমপক্ষে ৬ মাস মেয়াদি পাসপোর্ট ও খালি পৃষ্ঠা"),
          t("Recent passport-size photographs (white background)", "সাম্প্রতিক পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড)"),
          t("Completed Hajj application form", "পূরণকৃত হজ্জ আবেদন ফরম"),
          t("Vaccination certificates required for the season", "মৌসুম অনুযায়ী প্রয়োজনীয় টিকা সনদ"),
          t("National ID and necessary supporting papers", "জাতীয় পরিচয়পত্র ও প্রয়োজনীয় সহায়ক কাগজ"),
        ],
      },
      {
        heading: t("How we help", "আমরা যেভাবে সাহায্য করি"),
        body: [
          t(
            "Our team reviews your documents, completes the application, and coordinates submission and biometrics — keeping you informed at every step so there are no surprises.",
            "আমাদের টিম আপনার কাগজপত্র যাচাই করে, আবেদন পূরণ করে এবং জমা ও বায়োমেট্রিক সমন্বয় করে—প্রতিটি ধাপে আপনাকে অবহিত রাখে যাতে কোনো অপ্রত্যাশিত কিছু না ঘটে।",
          ),
        ],
      },
    ],
  },

  "hajj/significance": {
    slug: "hajj/significance",
    icon: "kaaba",
    title: t("The Significance of Hajj", "হজ্জের তাৎপর্য"),
    subtitle: t(
      "Hajj is the fifth pillar of Islam — a once-in-a-lifetime obligation upon every able Muslim.",
      "হজ্জ ইসলামের পঞ্চম স্তম্ভ—সামর্থ্যবান প্রত্যেক মুসলিমের উপর জীবনে অন্তত একবার ফরজ।",
    ),
    sections: [
      {
        heading: t("A journey of a lifetime", "জীবনের শ্রেষ্ঠ সফর"),
        body: [
          t(
            "Performed in the month of Dhul-Hijjah, Hajj unites millions of believers from every corner of the world in a single act of devotion, equality and submission to Allah.",
            "জিলহজ্জ মাসে পালিত হজ্জ পৃথিবীর প্রতিটি প্রান্ত থেকে লক্ষ লক্ষ মুমিনকে এক অভিন্ন ভক্তি, সাম্য ও আল্লাহর প্রতি আত্মসমর্পণে একত্র করে।",
          ),
        ],
      },
      {
        heading: t("The rites of Hajj", "হজ্জের মানাসিক"),
        list: [
          t("Ihram and the intention to perform Hajj", "ইহরাম ও হজ্জের নিয়ত"),
          t("Standing at Arafah — the essence of Hajj", "আরাফায় অবস্থান—হজ্জের মূল"),
          t("Muzdalifah, the stoning of the Jamarat, and sacrifice", "মুজদালিফা, জামারাতে কঙ্কর নিক্ষেপ ও কুরবানি"),
          t("Tawaf al-Ifadah and Sa'i", "তাওয়াফুল ইফাদা ও সাঈ"),
        ],
      },
    ],
  },

  "hajj/pre-registration": {
    slug: "hajj/pre-registration",
    icon: "check",
    title: t("Hajj Pre-Registration 2027", "হজ্জ প্রাক-নিবন্ধন ২০২৭"),
    subtitle: t(
      "Reserve your place for the 2027 Hajj season early — government quotas are limited and fill quickly.",
      "২০২৭ হজ্জ মৌসুমের জন্য আগেভাগে আপনার আসন সংরক্ষণ করুন—সরকারি কোটা সীমিত এবং দ্রুত পূর্ণ হয়।",
    ),
    sections: [
      {
        heading: t("Why pre-register early", "কেন আগে প্রাক-নিবন্ধন"),
        body: [
          t(
            "Pre-registration secures your serial in the national Hajj queue. Registering early gives you the best chance of confirmation, preferred packages and ample time to prepare.",
            "প্রাক-নিবন্ধন জাতীয় হজ্জ সিরিয়ালে আপনার ক্রম নিশ্চিত করে। আগে নিবন্ধন করলে নিশ্চিতকরণ, পছন্দের প্যাকেজ ও প্রস্তুতির পর্যাপ্ত সময়ের সর্বোত্তম সুযোগ মেলে।",
          ),
        ],
      },
      {
        heading: t("The process with Maimanah", "মাইমানাহর সাথে প্রক্রিয়া"),
        list: [
          t("Free consultation to choose the right package", "সঠিক প্যাকেজ বাছাইয়ে ফ্রি পরামর্শ"),
          t("Document collection and verification", "কাগজপত্র সংগ্রহ ও যাচাই"),
          t("Government pre-registration and serial confirmation", "সরকারি প্রাক-নিবন্ধন ও সিরিয়াল নিশ্চিতকরণ"),
          t("Ongoing guidance until departure", "যাত্রা পর্যন্ত নিয়মিত দিকনির্দেশনা"),
        ],
      },
    ],
  },

  "umrah/visa-requirements": {
    slug: "umrah/visa-requirements",
    icon: "passport",
    title: t("Umrah Visa Requirements", "উমরাহ ভিসা প্রয়োজনীয়তা"),
    subtitle: t(
      "Simple, fast Umrah visa processing with full support from our experienced team.",
      "আমাদের অভিজ্ঞ টিমের সম্পূর্ণ সহায়তায় সহজ ও দ্রুত উমরাহ ভিসা প্রসেসিং।",
    ),
    sections: [
      {
        heading: t("Required documents", "প্রয়োজনীয় কাগজপত্র"),
        list: [
          t("Passport valid for at least 6 months", "কমপক্ষে ৬ মাস মেয়াদি পাসপোর্ট"),
          t("Recent passport-size photographs", "সাম্প্রতিক পাসপোর্ট সাইজ ছবি"),
          t("Completed application form", "পূরণকৃত আবেদন ফরম"),
          t("Required vaccination certificates", "প্রয়োজনীয় টিকা সনদ"),
        ],
      },
      {
        heading: t("Processing time", "প্রসেসিং সময়"),
        body: [
          t(
            "Umrah visas are typically processed within a few working days. Our team monitors the application and keeps you updated until your visa is confirmed.",
            "উমরাহ ভিসা সাধারণত কয়েক কর্মদিবসে প্রসেস হয়। আমাদের টিম আবেদন পর্যবেক্ষণ করে এবং ভিসা নিশ্চিত না হওয়া পর্যন্ত আপনাকে আপডেট রাখে।",
          ),
        ],
      },
    ],
  },

  "umrah/significance": {
    slug: "umrah/significance",
    icon: "mosque",
    title: t("The Significance of Umrah", "উমরাহর তাৎপর্য"),
    subtitle: t(
      "A blessed journey that can be undertaken at any time of the year, cleansing the heart and renewing faith.",
      "বছরের যেকোনো সময়ে পালনযোগ্য এক বরকতময় সফর, যা হৃদয় পরিশুদ্ধ করে ও ঈমান নবায়ন করে।",
    ),
    sections: [
      {
        heading: t("A beloved act of worship", "প্রিয় এক ইবাদত"),
        body: [
          t(
            "Though not obligatory like Hajj, Umrah is a deeply rewarding act of worship that draws the believer closer to Allah and follows the blessed example of the Prophet ﷺ.",
            "হজ্জের মতো ফরজ না হলেও উমরাহ এক অত্যন্ত ফজিলতপূর্ণ ইবাদত, যা মুমিনকে আল্লাহর নিকটবর্তী করে এবং রাসূল ﷺ-এর বরকতময় সুন্নাহ অনুসরণ করে।",
          ),
        ],
      },
      {
        heading: t("The rites of Umrah", "উমরাহর মানাসিক"),
        list: [
          t("Entering the state of Ihram with intention", "নিয়তসহ ইহরাম বাঁধা"),
          t("Tawaf — seven circuits around the Kaaba", "তাওয়াফ—কাবার চারপাশে সাত চক্কর"),
          t("Sa'i between Safa and Marwah", "সাফা ও মারওয়ার মাঝে সাঈ"),
          t("Halq or Taqsir to conclude", "সমাপ্তিতে হলক বা তাকসীর"),
        ],
      },
    ],
  },

  "services/consultation": {
    slug: "services/consultation",
    icon: "chat",
    title: t("Free Consultation", "ফ্রি পরামর্শ"),
    subtitle: t(
      "Speak with an experienced advisor at no cost and plan your pilgrimage with confidence.",
      "বিনা খরচে একজন অভিজ্ঞ অ্যাডভাইজারের সাথে কথা বলুন এবং আত্মবিশ্বাসে সফর পরিকল্পনা করুন।",
    ),
    sections: [
      {
        heading: t("What we cover", "যা নিয়ে আলোচনা হয়"),
        list: [
          t("Choosing the right package for your budget", "আপনার বাজেটের জন্য সঠিক প্যাকেজ নির্বাচন"),
          t("Travel dates, duration and group options", "ভ্রমণের তারিখ, মেয়াদ ও গ্রুপ অপশন"),
          t("Visa, documentation and preparation", "ভিসা, কাগজপত্র ও প্রস্তুতি"),
          t("Special needs for elderly or first-time pilgrims", "বয়োবৃদ্ধ বা প্রথমবারের হাজীদের বিশেষ প্রয়োজন"),
        ],
      },
    ],
  },

  "services/training": {
    slug: "services/training",
    icon: "book",
    title: t("Hajj & Umrah Training", "হজ্জ ও উমরাহ প্রশিক্ষণ"),
    subtitle: t(
      "Learn to perform every rite correctly through structured sessions led by qualified scholars.",
      "যোগ্য আলেমদের পরিচালিত কাঠামোবদ্ধ সেশনের মাধ্যমে প্রতিটি মানাসিক সঠিকভাবে পালন করতে শিখুন।",
    ),
    sections: [
      {
        heading: t("Our training programme", "আমাদের প্রশিক্ষণ কর্মসূচি"),
        body: [
          t(
            "Before departure, every pilgrim is invited to attend orientation sessions covering the rites, supplications and practical etiquette of the journey, so you travel prepared and confident.",
            "যাত্রার পূর্বে প্রত্যেক হাজীকে মানাসিক, দোয়া ও সফরের ব্যবহারিক আদব নিয়ে ওরিয়েন্টেশন সেশনে অংশ নেওয়ার আমন্ত্রণ জানানো হয়, যাতে আপনি প্রস্তুত ও আত্মবিশ্বাসী হয়ে যাত্রা করেন।",
          ),
        ],
      },
    ],
  },

  "services/ticketing": {
    slug: "services/ticketing",
    icon: "plane",
    title: t("Air Ticket Booking", "বিমান টিকিট বুকিং"),
    subtitle: t(
      "Competitive fares on all major airlines for domestic and international travel.",
      "দেশি ও বিদেশি ভ্রমণের জন্য সকল প্রধান এয়ারলাইনে প্রতিযোগিতামূলক ভাড়া।",
    ),
    sections: [
      {
        heading: t("Why book with us", "কেন আমাদের সাথে বুক করবেন"),
        list: [
          t("Best available fares from trusted airlines", "নির্ভরযোগ্য এয়ারলাইন থেকে সেরা ভাড়া"),
          t("Group and individual bookings", "গ্রুপ ও ব্যক্তিগত বুকিং"),
          t("Flexible dates and rescheduling support", "নমনীয় তারিখ ও রিশিডিউল সহায়তা"),
          t("Dedicated assistance from enquiry to boarding", "অনুসন্ধান থেকে বোর্ডিং পর্যন্ত নিবেদিত সহায়তা"),
        ],
      },
    ],
  },

  "services/visa-processing": {
    slug: "services/visa-processing",
    icon: "passport",
    title: t("Visa Processing", "ভিসা প্রসেসিং"),
    subtitle: t(
      "Hassle-free visa support for Umrah, Hajj and selected tourist and business destinations.",
      "উমরাহ, হজ্জ ও নির্বাচিত পর্যটন-ব্যবসায়িক গন্তব্যের জন্য ঝামেলাহীন ভিসা সহায়তা।",
    ),
    sections: [
      {
        heading: t("Our visa services", "আমাদের ভিসা সেবা"),
        list: [
          t("Document review and application preparation", "কাগজপত্র যাচাই ও আবেদন প্রস্তুতি"),
          t("Submission and follow-up", "জমা ও ফলোআপ"),
          t("Status updates until approval", "অনুমোদন পর্যন্ত স্ট্যাটাস আপডেট"),
          t("Guidance on requirements for each destination", "প্রতিটি গন্তব্যের শর্ত সম্পর্কে দিকনির্দেশনা"),
        ],
      },
    ],
  },

  ziyarah: {
    slug: "ziyarah",
    icon: "pin",
    title: t("Ziyarah Tours", "যিয়ারাহ ট্যুর"),
    subtitle: t(
      "Visit the blessed historical sites of Makkah and Madinah with knowledgeable guides.",
      "জ্ঞানী গাইডদের সাথে মক্কা ও মদিনার বরকতময় ঐতিহাসিক স্থানসমূহ পরিদর্শন করুন।",
    ),
    sections: [
      {
        heading: t("Sites in Madinah", "মদিনার স্থানসমূহ"),
        list: [
          t("Masjid an-Nabawi and the Rawdah", "মসজিদে নববী ও রওজা"),
          t("Masjid Quba — the first mosque", "মসজিদে কুবা—প্রথম মসজিদ"),
          t("Mount Uhud and the martyrs", "উহুদ পাহাড় ও শহীদগণ"),
          t("Masjid al-Qiblatayn", "মসজিদে কিবলাতাইন"),
        ],
      },
      {
        heading: t("Sites in Makkah", "মক্কার স্থানসমূহ"),
        list: [
          t("Jabal al-Nour and the Cave of Hira", "জাবালে নূর ও হেরা গুহা"),
          t("Mina, Muzdalifah and Arafah", "মিনা, মুজদালিফা ও আরাফাহ"),
          t("Jabal Thawr", "জাবালে সওর"),
        ],
      },
    ],
  },

  about: {
    slug: "about",
    icon: "shield",
    title: t("About Maimanah Travels", "মাইমানাহ ট্রাভেলস সম্পর্কে"),
    subtitle: t(
      "A premium Hajj & Umrah agency built on trust, scholarship and genuine care for every pilgrim.",
      "আস্থা, ইলম ও প্রতিটি হাজীর প্রতি আন্তরিক যত্নের উপর গড়া এক প্রিমিয়াম হজ্জ ও উমরাহ এজেন্সি।",
    ),
    sections: [
      {
        heading: t("Who we are", "আমরা কারা"),
        body: [
          t(
            "Maimanah Travels was founded to make the sacred journey of Hajj and Umrah accessible, comfortable and spiritually focused for every pilgrim from Bangladesh. We combine premium hospitality with scholarly guidance and transparent, all-inclusive packages.",
            "বাংলাদেশের প্রতিটি হাজীর জন্য হজ্জ ও উমরাহর পবিত্র সফরকে সহজলভ্য, আরামদায়ক ও ইবাদতকেন্দ্রিক করতে মাইমানাহ ট্রাভেলস প্রতিষ্ঠিত। আমরা প্রিমিয়াম আতিথেয়তা, ইলমভিত্তিক দিকনির্দেশনা ও স্বচ্ছ, সম্পূর্ণ-অন্তর্ভুক্ত প্যাকেজ একত্র করি।",
          ),
        ],
      },
      {
        heading: t("Our mission", "আমাদের লক্ষ্য"),
        body: [
          t(
            "To serve the guests of Allah with honesty, excellence and care — ensuring every pilgrim returns home with a journey well performed and a heart at peace.",
            "সততা, উৎকর্ষ ও যত্নে আল্লাহর মেহমানদের সেবা করা—যাতে প্রতিটি হাজী সুসম্পন্ন সফর ও প্রশান্ত হৃদয় নিয়ে ঘরে ফেরেন।",
          ),
        ],
      },
      {
        heading: t("Our values", "আমাদের মূল্যবোধ"),
        list: [
          t("Honesty and transparency in every dealing", "প্রতিটি লেনদেনে সততা ও স্বচ্ছতা"),
          t("Excellence in service and comfort", "সেবা ও আরামে উৎকর্ষ"),
          t("Respect and care for every pilgrim", "প্রতিটি হাজীর প্রতি সম্মান ও যত্ন"),
          t("Adherence to the Sunnah in worship", "ইবাদতে সুন্নাহর অনুসরণ"),
        ],
      },
    ],
  },

  "privacy-policy": {
    slug: "privacy-policy",
    icon: "shield",
    title: t("Privacy Policy", "গোপনীয়তা নীতি"),
    subtitle: t(
      "How we collect, use and protect your personal information.",
      "আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করি।",
    ),
    sections: [
      {
        heading: t("Information we collect", "আমরা যে তথ্য সংগ্রহ করি"),
        body: [
          t(
            "We collect only the information you provide through our enquiry forms — such as your name, phone number, email and message — solely to respond to your request and arrange your travel services.",
            "আমরা কেবল আমাদের অনুসন্ধান ফরমের মাধ্যমে আপনার দেওয়া তথ্য—যেমন নাম, ফোন নম্বর, ইমেইল ও বার্তা—সংগ্রহ করি, শুধুমাত্র আপনার অনুরোধে সাড়া দিতে ও ভ্রমণ সেবা সাজাতে।",
          ),
        ],
      },
      {
        heading: t("How we use it", "আমরা কীভাবে ব্যবহার করি"),
        body: [
          t(
            "Your information is used to contact you about your enquiry and to provide our services. We do not sell or share your personal data with third parties for marketing purposes.",
            "আপনার তথ্য আপনার অনুসন্ধান সম্পর্কে যোগাযোগ ও আমাদের সেবা প্রদানে ব্যবহৃত হয়। আমরা বিপণনের উদ্দেশ্যে তৃতীয় পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিক্রি বা শেয়ার করি না।",
          ),
        ],
      },
      {
        heading: t("Contact us", "যোগাযোগ"),
        body: [
          t(
            "For any questions about this policy or your data, please contact us using the details on our Contact page. (This is placeholder text pending final legal content.)",
            "এই নীতি বা আপনার তথ্য সম্পর্কে যেকোনো প্রশ্নে আমাদের যোগাযোগ পৃষ্ঠার তথ্য ব্যবহার করে যোগাযোগ করুন। (চূড়ান্ত আইনি কন্টেন্টের পূর্বে এটি প্লেসহোল্ডার।)",
          ),
        ],
      },
    ],
  },
};

export function getContentPage(slug: string): ContentPage | undefined {
  return contentPages[slug];
}
