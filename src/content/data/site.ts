/**
 * Central business data for Maimanah Travels.
 * All values are placeholders — replace with the agency's real details.
 */
export const site = {
  name: "Maimanah Travels",
  legalName: "Maimanah Travels Ltd.",
  tagline: "Your Trusted Companion for a Sacred Journey",
  domain: "https://www.maimanahtravels.com",
  email: "info.maimanahtravels@gmail.com",
  phone: "+880 1335 266876",
  phoneHref: "tel:+8801335266876",
  whatsapp: "+880 1335 266876",
  whatsappHref: "https://wa.me/8801335266876",
  hotlineHours: "Sat–Thu, 9:00 AM – 8:00 PM",
  address: {
    line1: "House No. 1121, Road No. 11, Avenue 8/A",
    line2: "Mirpur DOHS, Dhaka 1216, Bangladesh",
  },
  license: "Hajj License No. 0000 (placeholder) · IATA Accredited",
  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "WhatsApp", href: "https://wa.me/8801335266876", icon: "whatsapp" },
  ],
  stats: [
    { value: "12,000+", key: "pilgrims" },
    { value: "15", key: "years" },
    { value: "98%", key: "satisfaction" },
    { value: "24/7", key: "support" },
  ],
} as const;

export type SiteData = typeof site;
