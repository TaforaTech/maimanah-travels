import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/content/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { fontVars } from "@/app/fonts";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChromeGate } from "@/components/layout/ChromeGate";

/** Full-screen routes that render without the site header/footer. */
const IMMERSIVE_ROUTES = ["/hajj-guide"];

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dict.meta.dir}
      className={`${fontVars} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Mark JS as available before paint so scroll-reveal can hide content (no FOUC, no permanent hiding without JS). */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-cream-50"
        >
          {dict.common.skipToContent}
        </a>
        <ChromeGate hideOn={IMMERSIVE_ROUTES}>
          <AnnouncementBar locale={locale} />
          <Header locale={locale} dict={dict} />
        </ChromeGate>
        <main id="main" className="flex-1">
          {children}
        </main>
        <ChromeGate hideOn={IMMERSIVE_ROUTES}>
          <Footer locale={locale} dict={dict} />
        </ChromeGate>
      </body>
    </html>
  );
}
