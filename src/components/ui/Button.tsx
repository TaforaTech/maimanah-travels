import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Primary CTA — gold, draws attention (Book Now, Apply, Get a Quote)
  primary:
    "bg-gold-500 text-white shadow-soft hover:bg-gold-700 hover:shadow-luxury hover:-translate-y-0.5",
  // Secondary CTA — brand green, supportive (View Packages, Learn More)
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5 shadow-soft",
  // WhatsApp — standard recognizable green
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-dark hover:-translate-y-0.5 shadow-soft",
  outline:
    "border border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white",
  ghost: "text-navy-800 hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-6 py-3 text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & {
  href: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
