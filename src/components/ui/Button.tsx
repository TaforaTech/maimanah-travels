import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-gradient text-navy-900 shadow-soft hover:shadow-luxury hover:-translate-y-0.5",
  secondary:
    "bg-navy-800 text-cream-50 hover:bg-navy-700 hover:-translate-y-0.5 shadow-soft",
  outline:
    "border border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-navy-900",
  ghost: "text-navy-800 hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
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
