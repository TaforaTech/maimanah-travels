import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { PackageListing } from "@/components/sections/PackageListing";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/umrah/packages", title: dict.nav.umrahPackages, description: dict.home.packages.description });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return <PackageListing category="umrah" locale={locale} dict={dict} />;
}
