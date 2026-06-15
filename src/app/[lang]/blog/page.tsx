import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { posts } from "@/content/blog/posts";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/content/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/blog",
    title: dict.nav.blog,
    description: locale === "bn" ? "হজ্জ, উমরাহ ও ভ্রমণ বিষয়ে গাইড, টিপস ও অন্তর্দৃষ্টি।" : "Guides, tips and insights on Hajj, Umrah and travel.",
  });
}

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        title={dict.nav.blog}
        subtitle={locale === "bn" ? "হজ্জ, উমরাহ ও ভ্রমণ বিষয়ে গাইড ও টিপস।" : "Guides, tips and reflections to help you on your sacred journey."}
        crumbs={[{ label: dict.common.home, href: localePath("/", locale) }, { label: dict.nav.blog }]}
        icon="book"
      />
      <Section tone="cream" className="pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 60}>
              <Link
                href={localePath(`/blog/${post.slug}`, locale)}
                className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
              >
                <div className={`relative aspect-[16/10] bg-gradient-to-br ${post.gradient}`}>
                  <div className="pattern-arabesque absolute inset-0 opacity-40" aria-hidden />
                  <span className="absolute left-4 top-4">
                    <Badge tone="soft">{post.category[locale]}</Badge>
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-muted">{formatDate(post.date, locale)}</p>
                  <h2 className="mt-2 text-lg font-semibold text-navy-900">{post.title[locale]}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt[locale]}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-600">
                    {dict.common.readMore}
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
