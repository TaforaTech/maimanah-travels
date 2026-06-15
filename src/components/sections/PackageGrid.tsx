import { Reveal } from "@/components/ui/Reveal";
import { PackageCard } from "./PackageCard";
import type { TravelPackage } from "@/content/data/packages";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

export function PackageGrid({
  packages,
  locale,
  dict,
}: {
  packages: TravelPackage[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg, i) => (
        <Reveal key={pkg.slug} delay={i * 60}>
          <PackageCard pkg={pkg} locale={locale} dict={dict} />
        </Reveal>
      ))}
    </div>
  );
}
