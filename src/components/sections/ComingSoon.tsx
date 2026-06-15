import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";

export function ComingSoon({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  return (
    <Section tone="cream" className="pb-24">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gold-100 text-gold-600">
          <Icon name="book" className="h-8 w-8" strokeWidth={1.4} />
        </span>
        <h2 className="mt-6 text-3xl font-bold text-navy-900 md:text-4xl">
          {bn ? "শীঘ্রই আসছে" : "Coming Soon"}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {bn
            ? "আমাদের ব্লগ শীঘ্রই আসছে—হজ্জ, উমরাহ ও ভ্রমণ নিয়ে গাইড, টিপস ও অন্তর্দৃষ্টি। ততক্ষণে আমাদের প্যাকেজ দেখুন বা আমাদের সাথে যোগাযোগ করুন।"
            : "Our blog is on its way — insightful guides, tips and reflections on Hajj, Umrah and travel are coming soon. In the meantime, explore our packages or get in touch with our team."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={localePath("/umrah/packages", locale)} variant="secondary">
            {bn ? "প্যাকেজ দেখুন" : "View Packages"}
          </ButtonLink>
          <ButtonLink href={localePath("/contact", locale)} variant="outline">
            {bn ? "যোগাযোগ করুন" : "Contact Us"}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
