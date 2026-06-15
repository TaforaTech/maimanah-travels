import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/data/site";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home.hero;
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-cream-50">
      <div className="absolute inset-0 pattern-arabesque opacity-60" aria-hidden />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-navy-500/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 container-px py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <Badge tone="soft">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
            {h.badge}
          </Badge>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-cream-50 sm:text-5xl lg:text-6xl">
            {h.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
            {h.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={localePath("/umrah/packages", locale)} size="lg">
              {h.ctaPrimary}
              <Icon name="arrow" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={site.whatsappHref} size="lg" variant="outline" className="border-white/30 text-cream-50 hover:bg-white/10 hover:text-cream-50">
              <Icon name="whatsapp" className="h-4 w-4" />
              {h.ctaSecondary}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.key}>
                <dt className="text-2xl font-semibold text-gold-400">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-navy-100">
                  {statLabel(s.key, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Decorative card stack (original, CSS-only) */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[2rem] border border-white/10 bg-white/5" />
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 shadow-luxury">
              <div className="pattern-arabesque absolute inset-0 opacity-40" aria-hidden />
              <div className="relative flex h-full flex-col justify-between p-8">
                <Icon name="kaaba" className="h-12 w-12 text-gold-400" strokeWidth={1.2} />
                <div>
                  <p className="font-display text-2xl text-cream-50">{site.tagline}</p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-navy-100">
                    <Icon name="shield" className="h-5 w-5 text-gold-400" />
                    {site.license}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function statLabel(key: string, locale: Locale): string {
  const labels: Record<string, Record<Locale, string>> = {
    pilgrims: { en: "Happy Pilgrims", bn: "সন্তুষ্ট হাজী" },
    years: { en: "Years of Service", bn: "বছরের সেবা" },
    satisfaction: { en: "Satisfaction", bn: "সন্তুষ্টি" },
    support: { en: "On-ground Support", bn: "সহায়তা" },
  };
  return labels[key]?.[locale] ?? key;
}
