import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { getPackages, getPackage } from "@/content/data/packages";
import { locales } from "@/content/i18n/config";
import { PackageDetail } from "@/components/sections/PackageDetail";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getPackages("hajj").map((p) => ({ lang, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const pkg = getPackage(slug);
  if (!pkg) return {};
  return buildMetadata({ locale, path: `/hajj/packages/${slug}`, title: pkg.name[locale], description: pkg.summary[locale] });
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return <PackageDetail slug={slug} category="hajj" locale={locale} dict={dict} />;
}
