import type { Metadata } from "next";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata, organizationJsonLd, JsonLd } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { site } from "@/content/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/ui/Icon";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/contact", title: dict.nav.contact, description: dict.forms.contact.description });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  const details: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "pin", label: locale === "bn" ? "ঠিকানা" : "Address", value: `${site.address.line1}, ${site.address.line2}` },
    { icon: "phone", label: locale === "bn" ? "ফোন" : "Phone", value: site.phone, href: site.phoneHref },
    { icon: "mail", label: locale === "bn" ? "ইমেইল" : "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: "clock", label: locale === "bn" ? "সময়সূচি" : "Hours", value: site.hotlineHours },
  ];

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <PageHero
        title={dict.nav.contact}
        subtitle={dict.cta.talkToAdvisor}
        crumbs={[{ label: dict.common.home, href: localePath("/", locale) }, { label: dict.nav.contact }]}
        icon="chat"
      />
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Info panel */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold text-navy-900">{dict.footer.contact}</h2>
            <p className="mt-3 text-muted">{dict.footer.about}</p>
            <ul className="mt-8 space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-gold-600">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="text-navy-900 hover:text-gold-600">{d.value}</a>
                    ) : (
                      <p className="text-navy-900">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              {dict.common.whatsapp}
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl2 border border-line bg-cream-50 p-6 shadow-soft md:p-8">
              <h2 className="text-2xl font-semibold text-navy-900">{dict.forms.contact.title}</h2>
              <p className="mt-2 text-sm text-muted">{dict.forms.contact.description}</p>
              <div className="mt-6">
                <ContactForm locale={locale} dict={dict} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
