import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale, contentMetadata } from "@/lib/page-helpers";
import { getContentPage } from "@/content/data/pages";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { HajjExperience } from "@/components/sections/HajjExperience";

const SLUG = "hajj-guide";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return contentMetadata(params, SLUG);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const page = getContentPage(SLUG);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.common.home, url: localePath("/", locale) },
          { name: dict.nav.hajj, url: localePath("/hajj", locale) },
          { name: page.title[locale], url: localePath(`/${SLUG}`, locale) },
        ])}
      />
      <HajjExperience locale={locale} />
      <Section tone="cream" className="pb-24">
        <CTASection
          locale={locale}
          title={dict.home.finalCta.title}
          description={dict.home.finalCta.description}
          primaryHref={localePath("/contact", locale)}
          primaryLabel={dict.common.getConsultation}
        />
      </Section>
    </>
  );
}
