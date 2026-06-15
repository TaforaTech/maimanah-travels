export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  bn: "বাংলা",
};

/** Compact labels for the segmented language toggle. */
export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  bn: "বাং",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
