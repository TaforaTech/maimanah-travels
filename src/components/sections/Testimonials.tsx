import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/content/data/testimonials";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

export function Testimonials({
  locale,
  dict,
  limit,
}: {
  locale: Locale;
  dict: Dictionary;
  limit?: number;
}) {
  const t = dict.home.testimonials;
  const items = limit ? testimonials.slice(0, limit) : testimonials;
  return (
    <div>
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} tone="light" />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 60}>
            <figure className="flex h-full flex-col rounded-xl2 border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
              <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5`}>
                {Array.from({ length: item.rating }).map((_, s) => (
                  <Icon key={s} name="star" className="h-5 w-5 text-gold-400" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-navy-100">
                “{item.quote[locale]}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-gradient font-semibold text-navy-900">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-cream-50">{item.name}</span>
                  <span className="block text-sm text-navy-100">{item.location[locale]}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
