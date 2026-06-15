import type { Metadata } from "next";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { faqs } from "@/content/data/faq";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/faq",
    title: dict.nav.faq,
    description: locale === "bn" ? "হজ্জ ও উমরাহ সম্পর্কে সাধারণ প্রশ্নের উত্তর।" : "Answers to common questions about Hajj and Umrah travel.",
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const items = faqs.map((f) => ({ question: f.question[locale], answer: f.answer[locale] }));

  return (
    <>
      <JsonLd data={faqJsonLd(items)} />
      <PageHero
        title={dict.nav.faq}
        subtitle={locale === "bn" ? "আপনার সফর পরিকল্পনায় সবচেয়ে সাধারণ প্রশ্নের উত্তর।" : "Answers to the questions pilgrims ask us most often."}
        crumbs={[{ label: dict.common.home, href: localePath("/", locale) }, { label: dict.nav.faq }]}
        icon="chat"
      />
      <Section tone="light">
        <div className="mx-auto max-w-3xl">
          <Accordion items={items} />
        </div>
      </Section>
      <Section tone="cream" className="pb-24 pt-0">
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
