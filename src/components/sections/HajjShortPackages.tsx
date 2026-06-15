import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { HajjShortCard } from "./HajjShortCard";
import { hajjShortCopy, hajjShortPackages } from "@/content/data/hajj2027";
import type { Locale } from "@/content/i18n/config";

export function HajjShortPackages({ locale }: { locale: Locale }) {
  const c = hajjShortCopy;
  return (
    <div>
      <SectionHeading eyebrow={c.eyebrow[locale]} title={c.title[locale]} description={c.description[locale]} />
      <div className="mt-14 grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {hajjShortPackages.map((pkg, i) => (
          <Reveal key={pkg.slug} delay={i * 50}>
            <HajjShortCard pkg={pkg} locale={locale} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
