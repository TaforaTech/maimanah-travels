import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { site } from "@/content/data/site";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { LoginForm } from "@/components/forms/LoginForm";

type Role = "agent" | "pilgrim";

// Airplane wing above a sea of clouds at golden hour (Unsplash, Ross Parmly).
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80";

export function LoginScreen({
  role,
  locale,
  dict,
}: {
  role: Role;
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.forms.login;
  const isAgent = role === "agent";

  const title = isAgent ? t.agentTitle : t.pilgrimTitle;
  const subtitle = isAgent ? t.agentSubtitle : t.pilgrimSubtitle;
  const switchHref = localePath(isAgent ? "/login/pilgrim" : "/login/agent", locale);
  const switchLabel = isAgent ? t.switchToPilgrim : t.switchToAgent;

  return (
    <div className="grid min-h-screen bg-cream-50 lg:grid-cols-2">
      {/* ── Left: airplane photograph + brand overlay ── */}
      <aside className="relative hidden overflow-hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          aria-hidden
        />
        {/* Brand gradient wash for contrast + on-palette tone */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(155deg, rgba(15,76,58,0.82) 0%, rgba(6,36,27,0.72) 55%, rgba(15,76,58,0.55) 100%)",
          }}
          aria-hidden
        />
        <div className="pattern-arabesque absolute inset-0 opacity-40" aria-hidden />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Link href={localePath("/", locale)} aria-label={dict.common.home}>
            <Logo variant="light" className="h-11" />
          </Link>

          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cream-50 backdrop-blur-sm">
              <Icon name="plane" className="h-4 w-4 text-gold-400" />
              {site.tagline}
            </span>
            <h2 className="mt-6 font-display text-4xl leading-tight text-white">
              {t.brandTagline}
            </h2>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {site.stats.slice(0, 3).map((s) => (
                <div key={s.key}>
                  <dt className="text-2xl font-semibold text-gold-400">{s.value}</dt>
                  <dd className="mt-1 text-xs capitalize text-cream-100/80">{s.key}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="flex items-center gap-2 text-xs text-cream-100/70">
            <Icon name="shield" className="h-4 w-4 text-gold-400" />
            {t.secure}
          </p>
        </div>
      </aside>

      {/* ── Right: login form ── */}
      <main className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile logo (hidden once the photo panel shows) */}
          <Link
            href={localePath("/", locale)}
            aria-label={dict.common.home}
            className="mb-10 inline-block lg:hidden"
          >
            <Logo className="h-11" />
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-700">
            <Icon name={isAgent ? "building" : "user"} className="h-3.5 w-3.5" />
            {isAgent ? dict.common.agent : dict.common.pilgrim}
          </span>

          <h1 className="mt-4 font-display text-3xl text-navy-900 sm:text-4xl">{title}</h1>
          <p className="mt-2 text-muted">{subtitle}</p>

          <div className="mt-8">
            <LoginForm role={role} locale={locale} dict={dict} />
          </div>

          {/* Role switch */}
          <div className="mt-8 rounded-2xl border border-line bg-white p-4 text-center text-sm text-muted">
            <Link
              href={switchHref}
              className="inline-flex items-center gap-1.5 font-medium text-navy-800 transition-colors hover:text-gold-700"
            >
              {switchLabel}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          {/* Footer links */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
            <Link
              href={localePath("/", locale)}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-navy-900"
            >
              <Icon name="chevron" className="h-4 w-4 rotate-90" />
              {t.backHome}
            </Link>
            <span>
              {t.noAccount}{" "}
              <Link href={localePath("/contact", locale)} className="font-medium text-gold-700 hover:underline">
                {t.contactUs}
              </Link>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
