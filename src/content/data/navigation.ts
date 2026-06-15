/**
 * Site navigation. `href` values are locale-agnostic (no /en or /bn prefix);
 * the Header/Footer prepend the active locale. `labelKey` resolves against the
 * dictionary's `nav` map so labels are localized.
 */
export type NavLeaf = {
  labelKey: string;
  href: string;
};

export type NavGroup = {
  labelKey: string;
  href?: string;
  children?: NavLeaf[];
};

export const mainNav: NavGroup[] = [
  { labelKey: "home", href: "/" },
  {
    labelKey: "hajj",
    href: "/hajj",
    children: [
      { labelKey: "hajjPackages", href: "/hajj/packages" },
      { labelKey: "hajjPreRegistration", href: "/hajj/pre-registration" },
      { labelKey: "hajjVisa", href: "/hajj/visa-requirements" },
      { labelKey: "hajjSignificance", href: "/hajj/significance" },
    ],
  },
  {
    labelKey: "umrah",
    href: "/umrah",
    children: [
      { labelKey: "umrahPackages", href: "/umrah/packages" },
      { labelKey: "umrahVisa", href: "/umrah/visa-requirements" },
      { labelKey: "umrahSignificance", href: "/umrah/significance" },
    ],
  },
  {
    labelKey: "assistance",
    children: [
      { labelKey: "consultation", href: "/services/consultation" },
      { labelKey: "training", href: "/services/training" },
      { labelKey: "ticketing", href: "/services/ticketing" },
      { labelKey: "visaProcessing", href: "/services/visa-processing" },
    ],
  },
  {
    labelKey: "about",
    href: "/about",
    children: [
      { labelKey: "aboutUs", href: "/about" },
      { labelKey: "gallery", href: "/gallery" },
      { labelKey: "ziyarah", href: "/ziyarah" },
      { labelKey: "testimonials", href: "/testimonials" },
      { labelKey: "blog", href: "/blog" },
      { labelKey: "faq", href: "/faq" },
    ],
  },
  { labelKey: "contact", href: "/contact" },
];

export const footerNav: { titleKey: string; links: NavLeaf[] }[] = [
  {
    titleKey: "quickLinks",
    links: [
      { labelKey: "home", href: "/" },
      { labelKey: "aboutUs", href: "/about" },
      { labelKey: "ziyarah", href: "/ziyarah" },
      { labelKey: "gallery", href: "/gallery" },
      { labelKey: "blog", href: "/blog" },
      { labelKey: "contact", href: "/contact" },
    ],
  },
  {
    titleKey: "services",
    links: [
      { labelKey: "hajjPackages", href: "/hajj/packages" },
      { labelKey: "umrahPackages", href: "/umrah/packages" },
      { labelKey: "ticketing", href: "/services/ticketing" },
      { labelKey: "visaProcessing", href: "/services/visa-processing" },
      { labelKey: "training", href: "/services/training" },
    ],
  },
  {
    titleKey: "support",
    links: [
      { labelKey: "faq", href: "/faq" },
      { labelKey: "consultation", href: "/services/consultation" },
      { labelKey: "testimonials", href: "/testimonials" },
      { labelKey: "hajjPreRegistration", href: "/hajj/pre-registration" },
      { labelKey: "privacy", href: "/privacy-policy" },
    ],
  },
];
