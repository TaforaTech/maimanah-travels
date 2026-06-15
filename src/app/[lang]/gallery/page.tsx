import type { Metadata } from "next";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/gallery",
    title: dict.nav.gallery,
    description: locale === "bn" ? "মাইমানাহ ট্রাভেলসের সাথে পবিত্র সফরের মুহূর্তসমূহ।" : "Moments from sacred journeys with Maimanah Travels.",
  });
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero
        title={dict.nav.gallery}
        subtitle={locale === "bn" ? "আমাদের হাজীদের পবিত্র সফরের কিছু মুহূর্ত।" : "A glimpse of the sacred journeys our pilgrims have experienced."}
        crumbs={[{ label: dict.common.home, href: localePath("/", locale) }, { label: dict.nav.gallery }]}
        icon="pin"
      />
      <Section tone="cream" className="pb-24">
        <GalleryGrid locale={locale} />
      </Section>
    </>
  );
}
