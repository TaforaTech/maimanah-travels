import type { MetadataRoute } from "next";
import { site } from "@/content/data/site";
import { locales } from "@/content/i18n/config";
import { packages } from "@/content/data/packages";
import { posts } from "@/content/blog/posts";
import { contentPages } from "@/content/data/pages";

const staticPaths = [
  "",
  "/hajj",
  "/hajj/packages",
  "/umrah",
  "/umrah/packages",
  "/gallery",
  "/faq",
  "/testimonials",
  "/blog",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(staticPaths);
  for (const key of Object.keys(contentPages)) paths.add(`/${key}`);
  for (const p of packages) paths.add(`/${p.category}/packages/${p.slug}`);
  for (const post of posts) paths.add(`/blog/${post.slug}`);

  const entries: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    for (const locale of locales) {
      entries.push({
        url: `${site.domain}/${locale}${path}`,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${site.domain}/${l}${path}`]),
          ),
        },
      });
    }
  }
  return entries;
}
