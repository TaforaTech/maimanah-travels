import type { Metadata } from "next";
import { isLocale, type Locale } from "@/content/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { getContentPage } from "@/content/data/pages";

/** Resolve the locale from a route params promise. */
export async function resolveLocale(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  return (isLocale(lang) ? lang : "en") as Locale;
}

/** Build metadata for a content (informational) page from its slug. */
export async function contentMetadata(
  params: Promise<{ lang: string }>,
  slug: string,
): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const page = getContentPage(slug);
  if (!page) return {};
  return buildMetadata({
    locale,
    path: `/${slug}`,
    title: page.title[locale],
    description: page.subtitle[locale],
  });
}
