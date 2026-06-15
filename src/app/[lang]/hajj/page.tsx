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
    path: "/hajj",
    title: dict.nav.hajj,
    description: dict.home.hajjCta.description,
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <CategoryHub
      category="hajj"
      locale={locale}
      dict={dict}
      subLinks={[
        { labelKey: "hajjPackages", href: "/hajj/packages", slug: "hajj/significance" },
        { labelKey: "hajjPreRegistration", href: "/hajj/pre-registration", slug: "hajj/pre-registration" },
        { labelKey: "hajjVisa", href: "/hajj/visa-requirements", slug: "hajj/visa-requirements" },
        { labelKey: "hajjSignificance", href: "/hajj/significance", slug: "hajj/significance" },
      ]}
    />
  );
}
