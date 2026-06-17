import { cn } from "@/lib/utils";

/** Maimanah Travels brand lockup (mark + wordmark). */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/main-logo-navbar.svg"
      alt="Maimanah Travels — Hajj & Umrah"
      className={cn(
        "h-12 w-auto shrink-0",
        // On dark surfaces (footer) render the logo as solid white for contrast.
        variant === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}
