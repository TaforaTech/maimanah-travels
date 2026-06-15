/**
 * Central business data for Maimanah Travels.
 * All values are placeholders — replace with the agency's real details.
 */
export const site = {
  name: "Maimanah Travels",
  legalName: "Maimanah Travels Ltd.",
  tagline: "Your Trusted Companion for a Sacred Journey",
  domain: "https://www.maimanahtravels.com",
  email: "info@maimanahtravels.example",
  phone: "+880 1700 000000",
  phoneHref: "tel:+8801700000000",
  whatsapp: "+880 1700 000000",
  whatsappHref: "https://wa.me/8801700000000",
  hotlineHours: "Sat–Thu, 9:00 AM – 8:00 PM",
  address: {
    line1: "Level 5, Baitul Mukarram Avenue",
    line2: "Paltan, Dhaka 1000, Bangladesh",
  },
  license: "Hajj License No. 0000 (placeholder) · IATA Accredited",
  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "WhatsApp", href: "https://wa.me/8801700000000", icon: "whatsapp" },
  ],
  stats: [
    { value: "12,000+", key: "pilgrims" },
    { value: "15", key: "years" },
    { value: "98%", key: "satisfaction" },
    { value: "24/7", key: "support" },
  ],
} as const;

export type SiteData = typeof site;
