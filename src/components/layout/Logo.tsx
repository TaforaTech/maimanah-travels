import { cn } from "@/lib/utils";

/** Original Maimanah Travels mark: a gold crescent cradling a geometric arch. */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const wordColor = variant === "light" ? "text-cream-50" : "text-navy-900";
  const subColor = variant === "light" ? "text-navy-100" : "text-muted";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <defs>
          <linearGradient id="maimanahGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E9C46A" />
            <stop offset="1" stopColor="#B8962E" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="23" className="fill-navy-900" />
        <path
          d="M34 14a13 13 0 1 0 0 20 11 11 0 1 1 0-20Z"
          fill="url(#maimanahGold)"
        />
        <path d="M24 30l4-6 4 6h-8Z" fill="url(#maimanahGold)" />
        <circle cx="34.5" cy="16" r="1.6" fill="url(#maimanahGold)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-xl font-bold tracking-wide", wordColor)}>
          Maimanah Travels
        </span>
        <span className={cn("mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.42em]", subColor)}>
          Hajj &amp; Umrah
        </span>
      </span>
    </span>
  );
}
