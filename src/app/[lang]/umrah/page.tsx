import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { CategoryHub } from "@/components/sections/CategoryHub";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/umrah",
    title: dict.nav.umrah,
    description: dict.home.packages.description,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <CategoryHub
      category="umrah"
      locale={locale}
      dict={dict}
      subLinks={[
        { labelKey: "umrahPackages", href: "/umrah/packages", slug: "umrah/significance" },
        { labelKey: "umrahVisa", href: "/umrah/visa-requirements", slug: "umrah/visa-requirements" },
        { labelKey: "umrahSignificance", href: "/umrah/significance", slug: "umrah/significance" },
      ]}
    />
  );
}
