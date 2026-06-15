import { site } from "@/content/data/site";
import type { Locale } from "@/content/i18n/config";
import { Icon } from "@/components/ui/Icon";

const messages: Record<Locale, string> = {
  en: "Hajj 2027 pre-registration is now open — limited seats available.",
  bn: "হজ্জ ২০২৭ প্রাক-নিবন্ধন চলছে — সীমিত আসন।",
};

export function AnnouncementBar({ locale }: { locale: Locale }) {
  return (
    <div className="bg-navy-900 text-cream-50">
      <div className="mx-auto flex h-10 max-w-[120rem] items-center justify-between gap-4 container-px text-xs">
        <p className="flex items-center gap-2 truncate">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" aria-hidden />
          <span className="truncate text-navy-100">{messages[locale]}</span>
        </p>
        <div className="hidden items-center gap-5 sm:flex">
          <a href={site.phoneHref} className="flex items-center gap-1.5 text-navy-100 transition-colors hover:text-gold-300">
            <Icon name="phone" className="h-3.5 w-3.5" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 text-navy-100 transition-colors hover:text-gold-300">
            <Icon name="mail" className="h-3.5 w-3.5" />
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
