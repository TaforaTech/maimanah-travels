import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "navy" | "soft";
}) {
  const tones = {
    gold: "bg-gold-100 text-gold-600 ring-1 ring-gold-300",
    navy: "bg-navy-50 text-navy-700 ring-1 ring-navy-100",
    soft: "bg-white/10 text-cream-50 ring-1 ring-white/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
