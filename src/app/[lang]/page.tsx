import type { Metadata } from "next";
import { isLocale, type Locale } from "@/content/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata, organizationJsonLd, JsonLd } from "@/lib/seo";
import { getFeatured } from "@/content/data/packages";
import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { PackageGrid } from "@/components/sections/PackageGrid";
import { SectionHeading } from "@/components/ui/Section";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Hajj2027Packages } from "@/components/sections/Hajj2027Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { localePath } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/",
    title: dict.home.hero.title,
    description: dict.home.hero.subtitle,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const dict = getDictionary(locale);
  const featuredUmrah = getFeatured("umrah");

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero locale={locale} dict={dict} />

      <Section tone="light">
        <Hajj2027Packages locale={locale} showButton />
      </Section>

      <Section tone="cream">
        <ServiceGrid locale={locale} dict={dict} />
      </Section>

      <Section tone="light">
        <PartnersStrip locale={locale} dict={dict} />
      </Section>

      <Section tone="cream">
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            eyebrow={dict.home.packages.eyebrow}
            title={dict.home.packages.title}
            description={dict.home.packages.description}
          />
        </div>
        <div className="mt-14">
          <PackageGrid packages={featuredUmrah} locale={locale} dict={dict} />
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href={localePath("/umrah/packages", locale)} variant="secondary">
            {dict.common.allPackages}
            <Icon name="arrow" className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>

      <Section tone="light">
        <WhyChoose locale={locale} dict={dict} />
      </Section>

      <Section tone="navy">
        <Testimonials locale={locale} dict={dict} />
      </Section>

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
