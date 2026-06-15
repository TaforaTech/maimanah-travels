import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/content/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

/** Redirects unprefixed paths to the default locale and guards unknown locales. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals, API and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
