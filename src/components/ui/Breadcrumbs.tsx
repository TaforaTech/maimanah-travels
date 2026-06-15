import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-navy-100">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-gold-400 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-gold-400" : undefined} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <span className="text-navy-500" aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
