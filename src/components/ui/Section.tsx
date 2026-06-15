import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "light" | "cream" | "navy";

const toneClasses: Record<Tone, string> = {
  light: "bg-white text-ink",
  cream: "bg-cream-50 text-ink",
  navy: "bg-navy-gradient text-cream-50",
};

export function Section({
  tone = "light",
  className,
  containerClassName,
  id,
  children,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
            tone === "light" ? "text-gold-400" : "text-gold-600",
          )}
        >
          <span className="h-px w-6 bg-current opacity-60" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.25]",
          tone === "light" && "text-cream-50",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            tone === "light" ? "text-navy-100" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
