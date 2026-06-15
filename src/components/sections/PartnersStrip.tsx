import { SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

/** Original, text-based accreditation badges (no third-party logos used). */
const accreditations: { label: Record<Locale, string>; icon: "shield" | "plane" | "check" | "star" }[] = [
  { label: { en: "Govt. Licensed Operator", bn: "সরকার অনুমোদিত অপারেটর" }, icon: "shield" },
  { label: { en: "IATA Accredited", bn: "IATA স্বীকৃত" }, icon: "plane" },
  { label: { en: "HAAB Member", bn: "HAAB সদস্য" }, icon: "check" },
  { label: { en: "5-Star Rated Service", bn: "৫-তারকা রেটেড সেবা" }, icon: "star" },
];

export function PartnersStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = dict.home.partners;
  return (
    <div>
      <SectionHeading eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {accreditations.map((a) => (
          <li
            key={a.icon}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-5 shadow-soft"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-gold-600">
              <Icon name={a.icon} className="h-6 w-6" />
            </span>
            <span className={`text-sm text-navy-900 ${locale === "bn" ? "font-semibold" : "font-display font-bold"}`}>{a.label[locale]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
