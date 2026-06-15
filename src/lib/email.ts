import type { LeadInput } from "./validation";
import { site } from "@/content/data/site";

/**
 * Pluggable email sender. When RESEND_API_KEY is set, sends a real email via
 * Resend's REST API; otherwise it logs the lead to the server console so the
 * form works end-to-end in development without any credentials.
 */
export async function sendLeadEmail(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_INBOX ?? site.email;
  const from = process.env.LEAD_FROM ?? "Maimanah Travels <onboarding@resend.dev>";

  const subject = `New enquiry: ${lead.subject}`;
  const text = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    lead.packageSlug ? `Package: ${lead.packageSlug}` : null,
    "",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    console.info("[lead] No RESEND_API_KEY set — logging enquiry instead:\n", text);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text, reply_to: lead.email }),
  });

  if (!res.ok) {
    throw new Error(`Email send failed: ${res.status}`);
  }
}
