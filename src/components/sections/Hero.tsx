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
    <section className="relative flex min-h-[calc(100dvh-7.5rem)] items-center overflow-hidden bg-navy-gradient text-cream-50 lg:h-[calc(100dvh-7.5rem)]">
      <div className="absolute inset-0 pattern-arabesque opacity-60" aria-hidden />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-navy-500/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-[120rem] items-center gap-10 container-px py-12 lg:h-full lg:grid-cols-12 lg:gap-12 lg:py-0">
        <div className="lg:col-span-7">
          <Badge tone="soft">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
            {h.badge}
          </Badge>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.1] text-cream-50 sm:text-5xl lg:max-w-none lg:text-[2.25rem] xl:text-[2.75rem] 2xl:text-5xl">
            {h.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg lg:text-base">
            {h.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={localePath("/umrah/packages", locale)}
              size="lg"
              className="lg:px-5 lg:py-2.5 lg:text-base"
            >
              {h.ctaPrimary}
              <Icon name="arrow" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={site.whatsappHref}
              size="lg"
              variant="outline"
              className="border-white/30 text-cream-50 hover:bg-white/10 hover:text-cream-50 lg:px-5 lg:py-2.5 lg:text-base"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/icons8-whatsapp.svg" alt="" className="h-6 w-6" />
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

        {/* Looping hero video with overlaid card content */}
        <div className="relative lg:col-span-5 lg:self-stretch">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/15 shadow-luxury sm:aspect-[16/10] lg:absolute lg:left-0 lg:right-0 lg:top-1/2 lg:aspect-auto lg:h-[85%] lg:-translate-y-1/2">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/assets/running%20vedion_on_loop.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden
            />
            {/* Readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-navy-950/15" aria-hidden />
            {/* Overlaid content */}
            <div className="relative flex h-full flex-col p-8">
              <Icon name="kaaba" className="h-12 w-12 text-gold-400" strokeWidth={1.2} />
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
