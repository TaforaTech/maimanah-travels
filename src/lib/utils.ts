import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Bangladeshi Taka, e.g. 160000 -> "৳ 1,60,000". */
export function formatBDT(amount: number): string {
  const grouped = new Intl.NumberFormat("en-IN").format(amount);
  return `৳ ${grouped}`;
}
