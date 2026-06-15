import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, localePath } from "@/lib/i18n";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { resolveLocale } from "@/lib/page-helpers";
import { posts, getPost } from "@/content/blog/posts";
import { locales, type Locale } from "@/content/i18n/config";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({ locale, path: `/blog/${slug}`, title: post.title[locale], description: post.excerpt[locale] });
}

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const Body = post.Body[locale];
  const url = localePath(`/blog/${slug}`, locale);
  const crumbs = [
    { label: dict.common.home, href: localePath("/", locale) },
    { label: dict.nav.blog, href: localePath("/blog", locale) },
    { label: post.title[locale] },
  ];
  const related = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd data={[
        articleJsonLd({ title: post.title[locale], description: post.excerpt[locale], date: post.date, url, author: post.author }),
        breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, url: c.href ?? url }))),
      ]} />
      <PageHero title={post.title[locale]} crumbs={crumbs} icon="book" />

      <Section tone="light">
        <article className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <Badge tone="gold">{post.category[locale]}</Badge>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4 text-gold-600" />
              {formatDate(post.date, locale)}
            </span>
            <span>· {post.author}</span>
          </div>
          <div className="mt-8">
            <Body />
          </div>
        </article>
      </Section>

      {/* Related */}
      <Section tone="cream" className="pb-24 pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-semibold text-navy-900">{locale === "bn" ? "আরও পড়ুন" : "Continue reading"}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={localePath(`/blog/${p.slug}`, locale)}
                className="group rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
              >
                <p className="text-xs text-muted">{formatDate(p.date, locale)}</p>
                <h3 className="mt-1 font-semibold text-navy-900">{p.title[locale]}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold-600">
                  {dict.common.readMore}
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
