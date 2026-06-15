import Link from "next/link";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { services } from "@/content/data/services";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

export function ServiceGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.home.services;
  return (
    <div>
      <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.description} />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 60}>
            <Link
              href={localePath(service.href, locale)}
              className="group flex h-full flex-col rounded-[--radius-xl2] border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxury"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-gradient group-hover:text-navy-900">
                <Icon name={service.icon as IconName} className="h-7 w-7" />
              </span>
              <h3 className={`mt-6 text-2xl text-navy-900 ${locale === "bn" ? "font-semibold" : "font-bold"}`}>
                {service.title[locale]}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {service.short[locale]}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-600">
                {dict.common.learnMore}
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
