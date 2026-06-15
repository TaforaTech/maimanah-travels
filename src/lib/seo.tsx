import type { Metadata } from "next";
import { site } from "@/content/data/site";
import { locales, type Locale } from "@/content/i18n/config";

/** Build per-page metadata with canonical + hreflang alternates and Open Graph. */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string; // locale-agnostic, e.g. "/umrah/packages" or "/"
  title: string;
  description: string;
}): Metadata {
  const clean = path === "/" ? "" : path;
  const canonical = `/${locale}${clean}`;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${clean}`;
  languages["x-default"] = `/en${clean}`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${site.domain}${canonical}`,
      siteName: site.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

type Json = Record<string, unknown>;

/** Organization / TravelAgency structured data for the whole site. */
export function organizationJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    legalName: site.legalName,
    url: site.domain,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: site.socials.map((s) => s.href),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.domain}${item.url}`,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  url: string;
  author: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.domain}${post.url}`,
  };
}

/** Renders a JSON-LD <script> tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
