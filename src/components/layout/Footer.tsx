import Link from "next/link";
import { footerNav } from "@/content/data/navigation";
import { site } from "@/content/data/site";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { Logo } from "./Logo";
import { Icon, type IconName } from "@/components/ui/Icon";

type NavDict = Dictionary["nav"];
type FooterDict = Dictionary["footer"];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const label = (key: string) => dict.nav[key as keyof NavDict] ?? key;
  const title = (key: string) => dict.footer[key as keyof FooterDict] ?? key;
  const year = 2026;

  return (
    <footer className="bg-navy-gradient text-cream-50">
      <div className="mx-auto max-w-[120rem] container-px py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-100">
              {dict.footer.about}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3 text-navy-100">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                <span>{site.address.line1}, {site.address.line2}</span>
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 text-navy-100 transition-colors hover:text-gold-300">
                  <Icon name="phone" className="h-5 w-5 shrink-0 text-gold-400" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-navy-100 transition-colors hover:text-gold-300">
                  <Icon name="mail" className="h-5 w-5 shrink-0 text-gold-400" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6">
            {footerNav.map((col) => (
              <nav key={col.titleKey} aria-label={title(col.titleKey)}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                  {title(col.titleKey)}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.labelKey + link.href}>
                      <Link
                        href={localePath(link.href, locale)}
                        className="text-navy-100 transition-colors hover:text-gold-300"
                      >
                        {label(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Newsletter + social */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {dict.footer.newsletter}
            </h2>
            <form className="mt-4 flex flex-col gap-2" aria-label={dict.footer.newsletter}>
              <label htmlFor="footer-email" className="sr-only">
                {dict.footer.emailPlaceholder}
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder={dict.footer.emailPlaceholder}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-cream-50 placeholder:text-navy-100 focus:border-gold-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-navy-900 transition-transform hover:-translate-y-0.5"
              >
                {dict.footer.newsletterCta}
              </button>
            </form>
            <ul className="mt-5 flex gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-navy-100 transition-colors hover:border-gold-400 hover:text-gold-300"
                  >
                    <Icon name={s.icon as IconName} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-navy-100 sm:flex-row">
          <p>© {year} {site.legalName}. {dict.footer.rights}</p>
          <p className="text-center sm:text-right">{site.license}</p>
        </div>
      </div>
    </footer>
  );
}
