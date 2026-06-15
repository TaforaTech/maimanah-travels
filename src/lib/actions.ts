"use server";

import { leadSchema, type LeadState } from "./validation";
import { sendLeadEmail } from "./email";

/** Server Action: validate a lead/contact submission and dispatch the email. */
export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    packageSlug: formData.get("packageSlug"),
    message: formData.get("message"),
    company: formData.get("company"), // honeypot
  };

  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: LeadState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<LeadState["errors"]>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  // Silently accept honeypot hits without sending.
  if (parsed.data.company) {
    return { status: "success" };
  }

  try {
    await sendLeadEmail(parsed.data);
    return { status: "success" };
  } catch {
    return { status: "error", message: "send-failed" };
  }
}
