import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { resolveLocale, contentMetadata } from "@/lib/page-helpers";
import { InfoPage } from "@/components/sections/InfoPage";

const SLUG = "services/consultation";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return contentMetadata(params, SLUG);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <InfoPage
      slug={SLUG}
      locale={locale}
      dict={dict}
      parentCrumbs={[{ label: dict.nav.assistance }]}
    />
  );
}
