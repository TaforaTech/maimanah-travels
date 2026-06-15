import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl2 border border-line bg-white shadow-soft transition-shadow",
        className,
      )}
    >
      {children}
    </div>
  );
}
