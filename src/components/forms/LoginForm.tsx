"use client";

import { useState } from "react";
import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { Icon } from "@/components/ui/Icon";

type Role = "agent" | "pilgrim";

const inputBase =
  "w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-muted/60 transition-colors focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400";

export function LoginForm({
  role,
  locale,
  dict,
}: {
  role: Role;
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.forms.login;
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  const identifierLabel = role === "agent" ? t.identifierAgent : t.identifier;
  const identifierPlaceholder =
    role === "agent" ? t.identifierAgentPlaceholder : t.identifierPlaceholder;

  // No auth backend yet — surface a brief pending state so the flow feels real.
  // Wire this up to a server action once the auth API is available.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => setPending(false), 1200);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Identifier */}
      <div>
        <label htmlFor="identifier" className="mb-1.5 block text-sm font-medium text-navy-900">
          {identifierLabel}
        </label>
        <div className="relative">
          <Icon
            name={role === "agent" ? "user" : "mail"}
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          />
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            required
            placeholder={identifierPlaceholder}
            className={inputBase}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-navy-900">
            {t.password}
          </label>
          <Link
            href={localePath("/contact", locale)}
            className="text-xs font-medium text-gold-700 hover:text-gold-600 hover:underline"
          >
            {t.forgot}
          </Link>
        </div>
        <div className="relative">
          <Icon
            name="lock"
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder={t.passwordPlaceholder}
            className={`${inputBase} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t.hidePassword : t.showPassword}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted transition-colors hover:bg-navy-50 hover:text-navy-800"
          >
            <Icon name={showPassword ? "eye-off" : "eye"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Remember me */}
      <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-navy-800">
        <input
          type="checkbox"
          name="remember"
          className="h-4 w-4 rounded border-line text-gold-600 accent-gold-600 focus:ring-gold-400"
        />
        {t.remember}
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-luxury disabled:translate-y-0 disabled:opacity-60"
      >
        {pending ? t.submitting : t.submit}
        {!pending && <Icon name="arrow" className="h-4 w-4" />}
      </button>
    </form>
  );
}
