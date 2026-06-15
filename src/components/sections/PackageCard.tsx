import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { formatBDT, cn } from "@/lib/utils";
import { localePath } from "@/lib/i18n";
import type { TravelPackage } from "@/content/data/packages";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

export function PackageCard({
  pkg,
  locale,
  dict,
}: {
  pkg: TravelPackage;
  locale: Locale;
  dict: Dictionary;
}) {
  const href = localePath(`/${pkg.category}/packages/${pkg.slug}`, locale);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[--radius-xl2] border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury">
      {/* Original gradient artwork instead of a copyrighted photo */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-gradient">
        <div className="pattern-arabesque absolute inset-0 opacity-50" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name={pkg.category === "hajj" ? "kaaba" : "mosque"} className="h-16 w-16 text-gold-400/80" strokeWidth={1} />
        </div>
        <div className="absolute left-4 top-4">
          <Badge tone="soft">{pkg.tier[locale]}</Badge>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1" aria-label={`${pkg.hotelStars} star`}>
          {Array.from({ length: pkg.hotelStars }).map((_, i) => (
            <Icon key={i} name="star" className="h-4 w-4 text-gold-400" strokeWidth={0} />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className={`text-2xl text-navy-900 ${locale === "bn" ? "font-semibold" : "font-bold"}`}>{pkg.name[locale]}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{pkg.summary[locale]}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
          <li className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="h-4 w-4 text-gold-600" />
            {pkg.durationDays} {dict.common.days}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Icon name="pin" className="h-4 w-4 text-gold-600" />
            Makkah {pkg.nights.makkah}N · Madinah {pkg.nights.madinah}N
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
          <div>
            <p className="text-xs text-muted">{dict.common.from}</p>
            <p className="text-xl font-semibold text-navy-900">{formatBDT(pkg.price)}</p>
            <p className="text-[0.7rem] text-muted">{dict.common.perPerson}</p>
          </div>
          <Link
            href={href}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-4 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-gold-gradient hover:text-navy-900",
            )}
          >
            {dict.common.viewDetails}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
