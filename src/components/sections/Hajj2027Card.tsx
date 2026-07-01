import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/i18n";
import { hajj2027Copy, type Hajj2027Package } from "@/content/data/hajj2027";
import type { Locale } from "@/content/i18n/config";

const groupBDT = (amount: number) => new Intl.NumberFormat("en-IN").format(amount);

export function Hajj2027Card({
  pkg,
  locale,
}: {
  pkg: Hajj2027Package;
  locale: Locale;
}) {
  const featured = !!pkg.featured;
  const c = hajj2027Copy;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl2 p-7 shadow-soft transition-all duration-300",
        featured
          ? "bg-navy-gradient text-cream-50 ring-1 ring-gold-400/40 lg:-translate-y-4 lg:shadow-luxury"
          : "border border-line bg-white text-ink hover:-translate-y-1 hover:border-gold-300 hover:shadow-luxury",
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-navy-900 shadow-soft">
          {c.mostPopular[locale]}
        </span>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-xl",
            featured ? "bg-white/10 text-gold-400" : "bg-gold-100 text-gold-600",
          )}
        >
          <Icon name="kaaba" className="h-6 w-6" />
        </span>
        <h3 className={cn("text-2xl font-bold", featured ? "text-cream-50" : "text-navy-900")}>
          {pkg.name[locale]}
        </h3>
      </div>
      <p
        className={cn(
          "mt-3 text-sm leading-relaxed",
          featured ? "text-navy-100" : "text-muted",
        )}
      >
        {pkg.tagline[locale]}
      </p>

      {/* Price */}
      <div className={cn("mt-6 border-t pt-5", featured ? "border-white/15" : "border-line")}>
        <span className={cn("text-xs font-semibold uppercase tracking-wider", featured ? "text-navy-100" : "text-muted")}>
          BDT
        </span>
        <div className="flex items-end gap-2">
          <span className={cn("text-4xl font-bold leading-none", featured ? "text-gold-400" : "text-navy-900")}>
            {groupBDT(pkg.price)}
          </span>
        </div>
      </div>

      {/* Specs */}
      <ul className="mt-6 flex-1 space-y-3.5">
        {pkg.specs.map((s) => (
          <li key={s.key} className="flex items-center gap-3 text-sm">
            <Icon
              name={s.icon}
              className={cn("h-5 w-5 shrink-0", featured ? "text-gold-400" : "text-gold-600")}
              strokeWidth={1.8}
            />
            <span className={featured ? "text-cream-50" : "text-navy-800"}>
              <span className="font-semibold">{c.rowLabels[s.key][locale]}:</span> {s.value[locale]}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <ButtonLink
        href={localePath("/contact", locale)}
        variant={featured ? "primary" : "secondary"}
        className="mt-7 w-full"
      >
        {c.selectPackage[locale]}
      </ButtonLink>
      <p className={cn("mt-3 text-center text-[0.7rem]", featured ? "text-navy-100" : "text-muted")}>
        {c.terms[locale]}
      </p>
    </div>
  );
}
