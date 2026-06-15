import { redirect } from "next/navigation";
import { defaultLocale } from "@/content/i18n/config";

// Middleware handles locale redirects; this is a fallback for the bare root.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
