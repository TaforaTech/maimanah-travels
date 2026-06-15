import { notFound } from "next/navigation";
import { getContentPage } from "@/content/data/pages";
import { localePath } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { PageHero } from "./PageHero";
import { InfoContent } from "./InfoContent";
import { CTASection } from "./CTASection";
import { Section } from "@/components/ui/Section";
import type { Crumb } from "@/components/ui/Breadcrumbs";

export function InfoPage({
  slug,
  locale,
  dict,
  parentCrumbs = [],
}: {
  slug: string;
  locale: Locale;
  dict: Dictionary;
  parentCrumbs?: Crumb[];
}) {
  const page = getContentPage(slug);
  if (!page) notFound();

  const crumbs: Crumb[] = [
    { label: dict.common.home, href: localePath("/", locale) },
    ...parentCrumbs,
    { label: page.title[locale] },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          crumbs.map((c) => ({ name: c.label, url: c.href ?? localePath(`/${slug}`, locale) })),
        )}
      />
      <PageHero
        title={page.title[locale]}
        subtitle={page.subtitle[locale]}
        crumbs={crumbs}
        icon={page.icon}
      />
      <Section tone="light">
        <InfoContent sections={page.sections} locale={locale} />
      </Section>
      <Section tone="cream" className="pb-24 pt-0">
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
