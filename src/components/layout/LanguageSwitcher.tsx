"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/content/i18n/config";
import { switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  current,
  variant = "dark",
}: {
  current: Locale;
  variant?: "dark" | "light";
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-xs font-semibold",
        variant === "light" ? "bg-white/10" : "bg-navy-50",
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors",
              active
                ? "bg-gold-gradient text-navy-900"
                : variant === "light"
                  ? "text-cream-50 hover:text-gold-300"
                  : "text-navy-700 hover:text-navy-900",
            )}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
