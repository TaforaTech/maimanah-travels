import type { LocalizedText } from "./packages";

const t = (en: string, bn: string): LocalizedText => ({ en, bn });

export type Testimonial = {
  name: string;
  location: LocalizedText;
  rating: number;
  quote: LocalizedText;
};

export const testimonials: Testimonial[] = [
  {
    name: "Abdullah Rahman",
    location: t("Dhaka", "ঢাকা"),
    rating: 5,
    quote: t(
      "From visa to return, everything was handled with care. The hotel was steps from the Haram and our guide was patient and knowledgeable.",
      "ভিসা থেকে ফেরা পর্যন্ত সবকিছু যত্নের সাথে সামলানো হয়েছে। হোটেল ছিল হারামের কাছেই আর গাইড ছিলেন ধৈর্যশীল ও জ্ঞানী।",
    ),
  },
  {
    name: "Fatima Begum",
    location: t("Chattogram", "চট্টগ্রাম"),
    rating: 5,
    quote: t(
      "As a first-time pilgrim I felt completely supported. The team explained each rite clearly and were always available when we needed them.",
      "প্রথমবার হাজী হিসেবে আমি পূর্ণ সহায়তা পেয়েছি। টিম প্রতিটি মানাসিক স্পষ্টভাবে বুঝিয়েছেন এবং প্রয়োজনে সবসময় পাশে ছিলেন।",
    ),
  },
  {
    name: "Imran Hossain",
    location: t("Sylhet", "সিলেট"),
    rating: 5,
    quote: t(
      "Transparent pricing and no hidden costs. The whole journey felt organised, calm and spiritually focused. Highly recommended.",
      "স্বচ্ছ মূল্য, কোনো লুকানো খরচ নেই। পুরো সফর ছিল সুসংগঠিত, প্রশান্ত ও ইবাদতকেন্দ্রিক। অত্যন্ত প্রস্তাবিত।",
    ),
  },
  {
    name: "Nusrat Jahan",
    location: t("Khulna", "খুলনা"),
    rating: 5,
    quote: t(
      "They arranged a family package with connecting rooms and looked after my elderly parents wonderfully. May Allah reward this team.",
      "তাঁরা কানেক্টিং রুম সহ পারিবারিক প্যাকেজ সাজিয়েছিলেন এবং আমার বয়স্ক বাবা-মায়ের দারুণ যত্ন নিয়েছিলেন। আল্লাহ এই টিমকে উত্তম প্রতিদান দিন।",
    ),
  },
];
