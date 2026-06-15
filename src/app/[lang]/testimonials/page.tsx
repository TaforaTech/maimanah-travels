import type { Metadata } from "next";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/testimonials",
    title: dict.nav.testimonials,
    description: dict.home.testimonials.description,
  });
}

export default async function TestimonialsPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <>
      <PageHero
        title={dict.nav.testimonials}
        subtitle={dict.home.testimonials.description}
        crumbs={[{ label: dict.common.home, href: localePath("/", locale) }, { label: dict.nav.testimonials }]}
        icon="star"
      />
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
