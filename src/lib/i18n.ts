import { en, type Dictionary } from "@/content/i18n/en";
import { bn } from "@/content/i18n/bn";
import { defaultLocale, isLocale, type Locale } from "@/content/i18n/config";

const dictionaries: Record<Locale, Dictionary> = { en, bn };

export function getDictionary(locale: string): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

/** Prefix a locale-agnostic path with the active locale, e.g. ("/hajj","bn") -> "/bn/hajj". */
export function localePath(href: string, locale: Locale): string {
  if (href.startsWith("http") || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return href;
  }
  const clean = href === "/" ? "" : href;
  return `/${locale}${clean}`;
}

/** Swap the locale segment of a full pathname, preserving the rest of the route. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${target}`;
  if (isLocale(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return `/${segments.join("/")}`;
}

export type { Locale };
