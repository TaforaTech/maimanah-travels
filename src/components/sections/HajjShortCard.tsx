import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { site } from "@/content/data/site";
import { hajj2027Copy, hajjShortCopy, type Hajj2027Package } from "@/content/data/hajj2027";
import type { Locale } from "@/content/i18n/config";

const groupBDT = (amount: number) => new Intl.NumberFormat("en-IN").format(amount);

export function HajjShortCard({
  pkg,
  locale,
}: {
  pkg: Hajj2027Package;
  locale: Locale;
}) {
  const c = hajj2027Copy;
  const s = hajjShortCopy;
  const titleWeight = locale === "bn" ? "font-semibold" : "font-bold";

  return (
    <div className="flex h-full flex-col rounded-xl2 border border-line bg-white p-7 text-ink shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxury">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-600">
          <Icon name="star" className="h-6 w-6" />
        </span>
        <h3 className={cn("text-xl text-navy-900", titleWeight)}>{pkg.name[locale]}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{pkg.tagline[locale]}</p>

      {/* Price */}
      <div className="mt-6 border-t border-line pt-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">BDT</span>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold leading-none text-navy-900">{groupBDT(pkg.price)}</span>
        </div>
      </div>

      {/* Specs */}
      <ul className="mt-6 flex-1 space-y-3.5">
        {pkg.specs.map((spec) => (
          <li key={spec.key} className="flex items-center gap-3 text-sm">
            <Icon name={spec.icon} className="h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.8} />
            <span className="text-navy-800">
              <span className="font-semibold">{c.rowLabels[spec.key][locale]}:</span> {spec.value[locale]}
            </span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-7">
        <ButtonLink href={site.phoneHref} variant="secondary" className="w-full">
          <Icon name="phone" className="h-4 w-4" />
          {s.callNow[locale]}
        </ButtonLink>
      </div>
      <p className="mt-3 text-center text-[0.7rem] text-muted">{c.terms[locale]}</p>
    </div>
  );
}
