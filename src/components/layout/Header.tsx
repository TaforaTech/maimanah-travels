"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/content/data/navigation";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

type NavDict = Dictionary["nav"];

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (adjust state during render, React-recommended).
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
    setOpenGroup(null);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const label = (key: string) => dict.nav[key as keyof NavDict] ?? key;

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur shadow-soft"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[120rem] items-center justify-between container-px">
        <Link href={localePath("/", locale)} aria-label={dict.common.home}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((group) => {
            const href = group.href ? localePath(group.href, locale) : undefined;
            if (!group.children) {
              return (
                <Link
                  key={group.labelKey}
                  href={href!}
                  className="rounded-full px-4 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-50 hover:text-navy-900"
                >
                  {label(group.labelKey)}
                </Link>
              );
            }
            return (
              <div key={group.labelKey} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-50 hover:text-navy-900"
                  aria-haspopup="true"
                >
                  {label(group.labelKey)}
                  <Icon name="chevron" className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <ul className="w-64 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-luxury">
                    {group.children.map((child) => (
                      <li key={child.labelKey}>
                        <Link
                          href={localePath(child.href, locale)}
                          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden />
                          {label(child.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher current={locale} />
          </div>
          <ButtonLink href={localePath("/contact", locale)} size="sm" className="hidden sm:inline-flex">
            {dict.common.bookNow}
          </ButtonLink>

          {/* Profile → Login dropdown (expands on hover) */}
          <div className="group relative hidden sm:block">
            <button
              type="button"
              aria-haspopup="true"
              aria-label={dict.common.login}
              className="inline-flex items-center rounded-full border-2 border-[#C19A2E] px-2.5 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              <Icon name="user" className="h-5 w-5" />
              <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:max-w-[6rem] group-hover:opacity-100">
                {dict.common.login}
              </span>
            </button>
            <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <ul className="w-48 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-luxury">
                <li>
                  <Link
                    href={localePath("/login/agent", locale)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden />
                    {dict.common.agent}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localePath("/login/pilgrim", locale)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden />
                    {dict.common.pilgrim}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-navy-900 hover:bg-navy-50 lg:hidden"
            aria-label={mobileOpen ? dict.common.close : dict.common.menu}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform", mobileOpen && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity", mobileOpen && "opacity-0")} />
              <span className={cn("absolute left-0 top-3 h-0.5 w-5 bg-current transition-transform", mobileOpen && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer (rendered outside <header> so its fixed positioning resolves against the viewport, not the backdrop-blur header) */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 overflow-hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "h-full w-full overflow-y-auto border-t border-line bg-white transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
        <nav className="container-px py-6" aria-label="Mobile">
          <ul className="space-y-1">
            {mainNav.map((group) => {
              const href = group.href ? localePath(group.href, locale) : undefined;
              if (!group.children) {
                return (
                  <li key={group.labelKey}>
                    <Link href={href!} className="block rounded-xl px-4 py-3 text-base font-medium text-navy-900 hover:bg-navy-50">
                      {label(group.labelKey)}
                    </Link>
                  </li>
                );
              }
              const isOpen = openGroup === group.labelKey;
              return (
                <li key={group.labelKey}>
                  <button
                    type="button"
                    onClick={() => setOpenGroup(isOpen ? null : group.labelKey)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-navy-900 hover:bg-navy-50"
                  >
                    {label(group.labelKey)}
                    <Icon name="chevron" className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <ul className="mb-2 ml-3 space-y-1 border-l border-line pl-3">
                      {group.children.map((child) => (
                        <li key={child.labelKey}>
                          <Link href={localePath(child.href, locale)} className="block rounded-lg px-3 py-2 text-sm text-navy-700 hover:bg-navy-50">
                            {label(child.labelKey)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-3">
            <LanguageSwitcher current={locale} />
            <ButtonLink href={localePath("/contact", locale)} size="sm">
              {dict.common.bookNow}
            </ButtonLink>
          </div>
        </nav>
        </div>
      </div>
    </>
  );
}
