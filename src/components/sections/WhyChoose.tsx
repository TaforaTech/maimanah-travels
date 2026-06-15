import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

const icons: IconName[] = ["book", "mosque", "check", "phone", "passport", "shield"];

export function WhyChoose({ dict }: { locale?: Locale; dict: Dictionary }) {
  const w = dict.home.why;
  return (
    <div>
      <SectionHeading eyebrow={w.eyebrow} title={w.title} description={w.description} align="left" className="max-w-3xl" />
      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {dict.why.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 50}>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-600">
                <Icon name={icons[i % icons.length]} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
