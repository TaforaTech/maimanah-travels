"use client";

import { useActionState } from "react";
import { submitLead } from "@/lib/actions";
import type { LeadState } from "@/lib/validation";
import { Field, TextInput, TextArea, Select } from "./FormField";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";
import { packages } from "@/content/data/packages";

const initialState: LeadState = { status: "idle" };

export function ContactForm({
  locale,
  dict,
  defaultPackage,
  defaultSubject,
}: {
  locale: Locale;
  dict: Dictionary;
  defaultPackage?: string;
  defaultSubject?: string;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const f = dict.forms.contact;
  const err = (key: keyof NonNullable<LeadState["errors"]>) => {
    const code = state.errors?.[key];
    if (!code) return undefined;
    return (f as Record<string, string>)[code] ?? f.required;
  };

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl2 border border-gold-300 bg-gold-100/50 p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-navy-900">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
        </span>
        <p className="text-lg font-semibold text-navy-900">{f.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot (hidden from users) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.name} name="name" required error={err("name")}>
          <TextInput id="name" name="name" autoComplete="name" error={!!err("name")} />
        </Field>
        <Field label={f.phone} name="phone" required error={err("phone")}>
          <TextInput id="phone" name="phone" type="tel" autoComplete="tel" error={!!err("phone")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.email} name="email" required error={err("email")}>
          <TextInput id="email" name="email" type="email" autoComplete="email" error={!!err("email")} />
        </Field>
        <Field label={f.subject} name="subject" required error={err("subject")}>
          <TextInput id="subject" name="subject" defaultValue={defaultSubject} error={!!err("subject")} />
        </Field>
      </div>

      <Field label={f.package} name="packageSlug">
        <Select id="packageSlug" name="packageSlug" defaultValue={defaultPackage ?? ""}>
          <option value="">{f.selectPackage}</option>
          {packages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name[locale]}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={f.message} name="message" required error={err("message")}>
        <TextArea id="message" name="message" error={!!err("message")} />
      </Field>

      {state.status === "error" && state.message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {f.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-luxury disabled:opacity-60 sm:w-auto"
      >
        {pending ? f.submitting : f.submit}
        {!pending && <Icon name="arrow" className="h-4 w-4" />}
      </button>
    </form>
  );
}
