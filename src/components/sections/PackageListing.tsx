import { getPackages, type PackageCategory } from "@/content/data/packages";
import { localePath } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { PageHero } from "./PageHero";
import { PackageGrid } from "./PackageGrid";
import { CTASection } from "./CTASection";
import { Section } from "@/components/ui/Section";

export function PackageListing({
  category,
  locale,
  dict,
}: {
  category: PackageCategory;
  locale: Locale;
  dict: Dictionary;
}) {
  const isHajj = category === "hajj";
  const title = isHajj ? dict.nav.hajjPackages : dict.nav.umrahPackages;
  const pkgs = getPackages(category);
  const crumbs = [
    { label: dict.common.home, href: localePath("/", locale) },
    { label: isHajj ? dict.nav.hajj : dict.nav.umrah, href: localePath(`/${category}`, locale) },
    { label: title },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, url: c.href ?? localePath(`/${category}/packages`, locale) })))} />
      <PageHero
        title={title}
        subtitle={dict.home.packages.description}
        crumbs={crumbs}
        icon={isHajj ? "kaaba" : "mosque"}
      />
      <Section tone="cream">
        <PackageGrid packages={pkgs} locale={locale} dict={dict} />
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
