import type { Metadata } from "next";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { PageHero } from "@/components/sections/PageHero";
import { Hajj2027Packages } from "@/components/sections/Hajj2027Packages";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { hajj2027Copy } from "@/content/data/hajj2027";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/hajj/packages", title: dict.nav.hajjPackages, description: hajj2027Copy.description[locale] });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const crumbs = [
    { label: dict.common.home, href: localePath("/", locale) },
    { label: dict.nav.hajj, href: localePath("/hajj", locale) },
    { label: dict.nav.hajjPackages },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, url: c.href ?? localePath("/hajj/packages", locale) })))} />
      <PageHero
        title={dict.nav.hajjPackages}
        subtitle={hajj2027Copy.description[locale]}
        crumbs={crumbs}
        icon="kaaba"
      />
      <Section tone="cream">
        <Hajj2027Packages locale={locale} showHeading={false} />
      </Section>
      <Section tone="light" className="pb-24 pt-0">
        <CTASection
          locale={locale}
          title={dict.cta.needHelp}
          description={dict.cta.talkToAdvisor}
          primaryHref={localePath("/contact", locale)}
          primaryLabel={dict.common.getConsultation}
        />
      </Section>
    </>
  );
}
