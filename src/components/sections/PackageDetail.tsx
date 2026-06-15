import { notFound } from "next/navigation";
import { getPackage, type PackageCategory } from "@/content/data/packages";
import { localePath } from "@/lib/i18n";
import { formatBDT } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { PageHero } from "./PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function PackageDetail({
  slug,
  category,
  locale,
  dict,
}: {
  slug: string;
  category: PackageCategory;
  locale: Locale;
  dict: Dictionary;
}) {
  const pkg = getPackage(slug);
  if (!pkg || pkg.category !== category) notFound();

  const isHajj = category === "hajj";
  const crumbs = [
    { label: dict.common.home, href: localePath("/", locale) },
    { label: isHajj ? dict.nav.hajj : dict.nav.umrah, href: localePath(`/${category}`, locale) },
    { label: isHajj ? dict.nav.hajjPackages : dict.nav.umrahPackages, href: localePath(`/${category}/packages`, locale) },
    { label: pkg.name[locale] },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, url: c.href ?? localePath(`/${category}/packages/${slug}`, locale) })))} />
      <PageHero title={pkg.name[locale]} subtitle={pkg.summary[locale]} crumbs={crumbs} icon={isHajj ? "kaaba" : "mosque"} />

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Main content */}
          <div className="space-y-10 lg:col-span-7">
            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: "clock", label: `${pkg.durationDays} ${dict.common.days}` },
                { icon: "star", label: `${pkg.hotelStars}★ ${dict.common.included}` },
                { icon: "mosque", label: `Makkah ${pkg.nights.makkah}${dict.common.nights.charAt(0)}` },
                { icon: "pin", label: `Madinah ${pkg.nights.madinah}${dict.common.nights.charAt(0)}` },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl border border-line bg-cream-50 p-4 text-center">
                  <Icon name={f.icon as "clock"} className="mx-auto h-6 w-6 text-gold-600" />
                  <p className="mt-2 text-xs font-semibold text-navy-900">{f.label}</p>
                </div>
              ))}
            </div>

            <DetailList title={dict.common.highlights} items={pkg.highlights.map((h) => h[locale])} icon="star" />
            <DetailList title={dict.common.included} items={pkg.includes.map((h) => h[locale])} icon="check" />
            <DetailList title={dict.common.notIncluded} items={pkg.excludes.map((h) => h[locale])} icon="arrow" muted />

            {/* Itinerary */}
            <div>
              <h2 className="text-2xl font-semibold text-navy-900">{dict.common.itinerary}</h2>
              <ol className="mt-6 space-y-5 border-l border-line pl-6">
                {pkg.itinerary.map((step, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[1.95rem] grid h-8 w-8 place-items-center rounded-full bg-gold-gradient text-xs font-bold text-navy-900">
                      {step.day === "—" ? i + 1 : step.day.split("-")[0]}
                    </span>
                    <h3 className="text-base font-semibold text-navy-900">{step.title[locale]}</h3>
                    <p className="mt-1 text-sm text-muted">{step.detail[locale]}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sticky booking sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Card className="overflow-hidden">
                <div className="bg-navy-gradient p-6 text-cream-50">
                  <Badge tone="soft">{pkg.tier[locale]}</Badge>
                  <p className="mt-4 text-sm text-navy-100">{dict.common.from}</p>
                  <p className="text-3xl font-semibold text-gold-400">{formatBDT(pkg.price)}</p>
                  <p className="text-xs text-navy-100">{dict.common.perPerson}</p>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-navy-900">{dict.common.bookThisPackage}</h2>
                  <p className="mt-1 text-sm text-muted">{dict.forms.contact.description}</p>
                  <div className="mt-5">
                    <ContactForm
                      locale={locale}
                      dict={dict}
                      defaultPackage={pkg.slug}
                      defaultSubject={pkg.name[locale]}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function DetailList({
  title,
  items,
  icon,
  muted,
}: {
  title: string;
  items: string[];
  icon: "star" | "check" | "arrow";
  muted?: boolean;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy-900">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-navy-800">
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${muted ? "bg-navy-50 text-muted" : "bg-gold-100 text-gold-600"}`}>
              <Icon name={icon} className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
