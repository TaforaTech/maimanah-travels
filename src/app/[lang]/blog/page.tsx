import type { Metadata } from "next";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { PageHero } from "@/components/sections/PageHero";
import { ComingSoon } from "@/components/sections/ComingSoon";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/blog",
    title: dict.nav.blog,
    description: locale === "bn" ? "হজ্জ, উমরাহ ও ভ্রমণ বিষয়ে গাইড, টিপস ও অন্তর্দৃষ্টি—শীঘ্রই আসছে।" : "Guides, tips and insights on Hajj, Umrah and travel — coming soon.",
  });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.nav.blog}
        subtitle={locale === "bn" ? "হজ্জ, উমরাহ ও ভ্রমণ বিষয়ে গাইড ও টিপস।" : "Guides, tips and reflections to help you on your sacred journey."}
        crumbs={[{ label: dict.common.home, href: localePath("/", locale) }, { label: dict.nav.blog }]}
        icon="book"
      />
      <ComingSoon locale={locale} />
    </>
  );
}
