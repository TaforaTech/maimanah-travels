import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/content/data/site";
import type { Locale } from "@/content/i18n/config";

export function CTASection({
  title,
  description,
  primaryHref,
  primaryLabel,
}: {
  /** Accepted for call-site consistency; not used internally. */
  locale?: Locale;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl container-px py-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-gradient px-8 py-14 text-center shadow-luxury md:px-16 md:py-20">
          <div className="pattern-arabesque absolute inset-0 opacity-50" aria-hidden />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold text-cream-50 md:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-navy-100 md:text-lg">{description}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={primaryHref} size="lg">
                {primaryLabel}
                <Icon name="arrow" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={site.phoneHref}
                size="lg"
                variant="outline"
                className="border-white/30 text-cream-50 hover:bg-white/10 hover:text-cream-50"
              >
                <Icon name="phone" className="h-4 w-4" />
                {site.phone}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
