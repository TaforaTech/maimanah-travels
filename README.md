# Maimanah Travels

A premium, bilingual (English + Bangla) marketing website for a Hajj & Umrah travel agency, built with **Next.js 16 (App Router)**, **Tailwind CSS v4** and **TypeScript**. The information architecture mirrors a full-service pilgrimage agency; all code, UI, branding, copy and assets are original.

> Content (packages, prices, phone, address, photos, license) is **placeholder** — edit the typed data files to go live.

## Tech stack

- **Next.js 16** App Router, static rendering, Turbopack
- **Tailwind CSS v4** with a centralized Navy + Gold design system (`src/app/globals.css`)
- **TypeScript**, ESLint
- **next/font** (Inter, Cormorant Garamond, Noto Sans Bengali)
- **MDX** blog (`@next/mdx`)
- **Zod** + React Server Actions for forms

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  (→ /en)
npm run build    # production build
npm run start    # serve the build
npm run lint
```

## Internationalization

- Locales: `en` (default) and `bn`. Root `/` redirects to `/en` via `src/proxy.ts`.
- Routes live under `src/app/[lang]/…`; the active locale sets `<html lang>` and switches the Bangla font.
- UI strings: `src/content/i18n/{en,bn}.ts` (typed, `en` is the source of truth).
- The `LanguageSwitcher` preserves the current path when switching locales.

## Where the content lives

| Content | File |
|---|---|
| Business details (brand, phone, address, socials) | `src/content/data/site.ts` |
| Hajj/Umrah packages | `src/content/data/packages.ts` |
| Services | `src/content/data/services.ts` |
| FAQ / Testimonials / Gallery | `src/content/data/{faq,testimonials,gallery}.ts` |
| Informational pages (visa, significance, about, etc.) | `src/content/data/pages.ts` |
| Navigation (header/footer) | `src/content/data/navigation.ts` |
| Blog posts | `src/content/blog/*.mdx` + `posts.ts` |
| UI translations | `src/content/i18n/{en,bn}.ts` |

## Forms & email

Contact and booking forms use a Server Action (`src/lib/actions.ts`) with Zod validation. Submissions are sent through a pluggable email hook (`src/lib/email.ts`):

- Set `RESEND_API_KEY` (and optionally `LEAD_INBOX`, `LEAD_FROM`) to send real emails via Resend.
- Without a key, leads are logged to the server console so the form works in development.

## SEO

- Per-page metadata with canonical + `hreflang` alternates and Open Graph (`src/lib/seo.tsx`).
- JSON-LD: `TravelAgency`, `BreadcrumbList`, `FAQPage`, `Article`.
- `sitemap.xml`, `robots.txt`, generated OG image (`opengraph-image.tsx`) and SVG favicon (`icon.svg`).

## Project structure

```
src/
  app/[lang]/        # localized routes (home, hajj, umrah, services, blog, …)
  components/        # layout/, ui/, sections/, forms/
  content/           # data/, i18n/, blog/
  lib/               # i18n, seo, actions, email, validation, utils
  proxy.ts           # locale routing
```
