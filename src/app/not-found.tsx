import Link from "next/link";
import { fontVars } from "@/app/fonts";

export default function NotFound() {
  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full bg-navy-gradient text-cream-50">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-7xl font-semibold text-gold-400">404</p>
          <h1 className="mt-4 text-2xl font-semibold text-cream-50">Page not found</h1>
          <p className="mt-3 text-navy-100">
            The page you are looking for could not be found. Let us guide you back.
          </p>
          <Link
            href="/en"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold text-navy-900 transition-transform hover:-translate-y-0.5"
          >
            Return home
          </Link>
        </main>
      </body>
    </html>
  );
}
