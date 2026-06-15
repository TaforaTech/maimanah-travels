import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { localePath } from "@/lib/i18n";
import { Hajj2027Card } from "./Hajj2027Card";
import { hajj2027Copy, hajj2027Packages } from "@/content/data/hajj2027";
import type { Locale } from "@/content/i18n/config";

export function Hajj2027Packages({
  locale,
  showButton = false,
  showHeading = true,
}: {
  locale: Locale;
  showButton?: boolean;
  showHeading?: boolean;
}) {
  const c = hajj2027Copy;
  return (
    <div>
      {showHeading && (
        <SectionHeading eyebrow={c.eyebrow[locale]} title={c.title[locale]} description={c.description[locale]} />
      )}
      <div className="mt-14 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hajj2027Packages.map((pkg, i) => (
          <Reveal key={pkg.slug} delay={i * 60}>
            <Hajj2027Card pkg={pkg} locale={locale} />
          </Reveal>
        ))}
      </div>
      {showButton && (
        <div className="mt-12 text-center">
          <ButtonLink href={localePath("/hajj/packages", locale)} variant="secondary">
            {c.seeAll[locale]}
            <Icon name="arrow" className="h-4 w-4" />
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
