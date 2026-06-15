import type { LocalizedText } from "./packages";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type Faq = { question: LocalizedText; answer: LocalizedText };

export const faqs: Faq[] = [
  {
    question: t("How early should I book my Umrah or Hajj?", "উমরাহ বা হজ্জ কত আগে বুক করা উচিত?"),
    answer: t(
      "For Umrah we recommend booking 4–6 weeks ahead for the best fares and hotels. Hajj requires pre-registration months in advance due to limited government quotas.",
      "উমরাহর জন্য সেরা ভাড়া ও হোটেলের জন্য ৪–৬ সপ্তাহ আগে বুকিং পরামর্শ দিই। সীমিত সরকারি কোটার কারণে হজ্জে কয়েক মাস আগে প্রাক-নিবন্ধন প্রয়োজন।",
    ),
  },
  {
    question: t("What documents do I need to apply?", "আবেদনের জন্য কোন কাগজপত্র প্রয়োজন?"),
    answer: t(
      "A passport valid for at least six months, recent photographs, a completed application form and any health/vaccination certificates required for the season.",
      "কমপক্ষে ছয় মাস মেয়াদি পাসপোর্ট, সাম্প্রতিক ছবি, পূরণকৃত আবেদন ফরম ও মৌসুম অনুযায়ী প্রয়োজনীয় স্বাস্থ্য/টিকা সনদ।",
    ),
  },
  {
    question: t("Are the package prices all-inclusive?", "প্যাকেজ মূল্য কি সম্পূর্ণ অন্তর্ভুক্ত?"),
    answer: t(
      "Each package clearly lists what is included and excluded. Core items — flights, visa, hotels, meals and transport — are included; personal expenses and optional add-ons are not.",
      "প্রতিটি প্যাকেজে কী অন্তর্ভুক্ত ও কী বাদ তা স্পষ্ট উল্লেখ থাকে। মূল বিষয়—ফ্লাইট, ভিসা, হোটেল, খাবার ও পরিবহন—অন্তর্ভুক্ত; ব্যক্তিগত খরচ ও ঐচ্ছিক অ্যাড-অন নয়।",
    ),
  },
  {
    question: t("Do you arrange group and family packages?", "আপনারা কি গ্রুপ ও পারিবারিক প্যাকেজ ব্যবস্থা করেন?"),
    answer: t(
      "Yes. We organise group departures and tailor private family packages with connecting rooms and flexible scheduling on request.",
      "হ্যাঁ। আমরা গ্রুপ ডিপারচার আয়োজন করি এবং অনুরোধে কানেক্টিং রুম ও নমনীয় সময়সূচি সহ ব্যক্তিগত পারিবারিক প্যাকেজ সাজাই।",
    ),
  },
  {
    question: t("Is there support for elderly or first-time pilgrims?", "বয়োবৃদ্ধ বা প্রথমবারের হাজীদের জন্য সহায়তা আছে কি?"),
    answer: t(
      "Absolutely. We provide extra assistance, wheelchair support where needed, and patient guidance so first-time and elderly pilgrims feel cared for throughout.",
      "অবশ্যই। আমরা অতিরিক্ত সহায়তা, প্রয়োজনে হুইলচেয়ার সাপোর্ট ও ধৈর্যশীল দিকনির্দেশনা প্রদান করি যাতে প্রথমবার ও বয়োবৃদ্ধ হাজীরা সর্বত্র যত্ন অনুভব করেন।",
    ),
  },
  {
    question: t("What is your refund and cancellation policy?", "রিফান্ড ও বাতিল নীতি কী?"),
    answer: t(
      "Cancellation terms depend on airline and hotel rules at the time of booking. Our team explains the applicable policy clearly before you confirm.",
      "বাতিলের শর্ত বুকিংয়ের সময়ের এয়ারলাইন ও হোটেল নিয়মের উপর নির্ভর করে। নিশ্চিত করার আগে আমাদের টিম প্রযোজ্য নীতি স্পষ্টভাবে ব্যাখ্যা করে।",
    ),
  },
];
