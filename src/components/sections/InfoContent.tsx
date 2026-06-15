import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { ContentSection } from "@/content/data/pages";
import type { Locale } from "@/content/i18n/config";

export function InfoContent({
  sections,
  locale,
}: {
  sections: ContentSection[];
  locale: Locale;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      {sections.map((section, i) => (
        <Reveal key={i} delay={i * 40}>
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-navy-900">
              <span className="h-6 w-1 rounded-full bg-gold-gradient" aria-hidden />
              {section.heading[locale]}
            </h2>
            {section.body?.map((p, j) => (
              <p key={j} className="mt-4 text-base leading-relaxed text-muted">
                {p[locale]}
              </p>
            ))}
            {section.list && (
              <ul className="mt-5 space-y-3">
                {section.list.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-base text-navy-800">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-600">
                      <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                    {item[locale]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
