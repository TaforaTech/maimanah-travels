import type { Metadata } from "next";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { PageHero } from "@/components/sections/PageHero";
import { ComingSoon } from "@/components/sections/ComingSoon";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/blog", title: dict.nav.blog, description: locale === "bn" ? "শীঘ্রই আসছে।" : "Coming soon." });
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const crumbs = [
    { label: dict.common.home, href: localePath("/", locale) },
    { label: dict.nav.blog, href: localePath("/blog", locale) },
    { label: locale === "bn" ? "শীঘ্রই আসছে" : "Coming Soon" },
  ];

  return (
    <>
      <PageHero title={dict.nav.blog} crumbs={crumbs} icon="book" />
      <ComingSoon locale={locale} />
    </>
  );
}
