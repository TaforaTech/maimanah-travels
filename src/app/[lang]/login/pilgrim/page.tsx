import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { LoginScreen } from "@/components/sections/LoginScreen";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/login/pilgrim", title: dict.forms.login.pilgrimTitle, description: dict.forms.login.pilgrimSubtitle });
}

export default async function PilgrimLoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return <LoginScreen role="pilgrim" locale={locale} dict={dict} />;
}
