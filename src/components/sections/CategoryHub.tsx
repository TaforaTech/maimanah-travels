import Link from "next/link";
import { getPackages, type PackageCategory } from "@/content/data/packages";
import { getContentPage } from "@/content/data/pages";
import { localePath } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { PageHero } from "./PageHero";
import { PackageGrid } from "./PackageGrid";
import { CTASection } from "./CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export function CategoryHub({
  category,
  locale,
  dict,
  subLinks,
}: {
  category: PackageCategory;
  locale: Locale;
  dict: Dictionary;
  subLinks: { labelKey: keyof Dictionary["nav"]; href: string; slug: string }[];
}) {
  const isHajj = category === "hajj";
  const title = isHajj ? dict.nav.hajj : dict.nav.umrah;
  const intro = getContentPage(`${category}/significance`);
  const pkgs = getPackages(category);
  const crumbs = [{ label: dict.common.home, href: localePath("/", locale) }, { label: title }];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, url: c.href ?? localePath(`/${category}`, locale) })))} />
      <PageHero
        title={isHajj ? dict.nav.hajj : dict.nav.umrah}
        subtitle={intro?.subtitle[locale]}
        crumbs={crumbs}
        icon={isHajj ? "kaaba" : "mosque"}
      />

      {/* Sub-section quick links */}
      <Section tone="cream">
        <SectionHeading
          eyebrow={dict.cta.needHelp}
          title={isHajj ? dict.nav.hajj : dict.nav.umrah}
          description={dict.cta.talkToAdvisor}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subLinks.map((link, i) => {
            const page = getContentPage(link.slug);
            return (
              <Reveal key={link.href} delay={i * 50}>
                <Link
                  href={localePath(link.href, locale)}
                  className="group flex h-full flex-col rounded-xl2 border border-line bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxury"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-gold-600 group-hover:bg-gold-gradient group-hover:text-navy-900">
                    <Icon name={page?.icon ?? "check"} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-navy-900">{dict.nav[link.labelKey]}</h3>
                  {page && <p className="mt-2 flex-1 text-sm text-muted">{page.subtitle[locale]}</p>}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-600">
                    {dict.common.learnMore}
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Packages */}
      <Section tone="light" id="packages">
        <SectionHeading
          eyebrow={dict.home.packages.eyebrow}
          title={isHajj ? dict.nav.hajjPackages : dict.nav.umrahPackages}
          description={dict.home.packages.description}
        />
        <div className="mt-14">
          <PackageGrid packages={pkgs} locale={locale} dict={dict} />
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href={localePath(`/${category}/packages`, locale)} variant="secondary">
            {dict.common.allPackages}
            <Icon name="arrow" className="h-4 w-4" />
          </ButtonLink>
        </div>
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
