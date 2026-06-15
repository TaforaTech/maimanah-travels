import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "required"),
  email: z.string().trim().email("invalidEmail"),
  phone: z
    .string()
    .trim()
    .min(6, "invalidPhone")
    .regex(/^[+\d][\d\s().-]{5,}$/, "invalidPhone"),
  subject: z.string().trim().min(2, "required"),
  packageSlug: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "required"),
  // Honeypot — must remain empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof LeadInput, string>>;
};
