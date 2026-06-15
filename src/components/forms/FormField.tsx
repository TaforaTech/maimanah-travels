import { cn } from "@/lib/utils";

export function Field({
  label,
  name,
  error,
  children,
  required,
  className,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400";

export function TextInput({
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn(inputBase, error ? "border-red-400" : "border-line", className)}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

export function TextArea({
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      className={cn(inputBase, "min-h-32 resize-y", error ? "border-red-400" : "border-line", className)}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

export function Select({
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={cn(inputBase, "appearance-none", error ? "border-red-400" : "border-line", className)}
      aria-invalid={error || undefined}
      {...props}
    >
      {children}
    </select>
  );
}
