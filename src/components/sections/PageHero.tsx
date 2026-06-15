import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Icon, type IconName } from "@/components/ui/Icon";

export function PageHero({
  title,
  subtitle,
  crumbs,
  icon,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  icon?: IconName;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-cream-50">
      <div className="pattern-arabesque absolute inset-0 opacity-50" aria-hidden />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-[120rem] container-px py-16 md:py-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 flex items-start gap-5">
          {icon && (
            <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold-400 sm:grid">
              <Icon name={icon} className="h-8 w-8" strokeWidth={1.3} />
            </span>
          )}
          <div>
            <h1 className="text-3xl font-semibold text-cream-50 sm:text-4xl lg:text-5xl">{title}</h1>
            {subtitle && <p className="mt-4 max-w-2xl text-base text-navy-100 md:text-lg">{subtitle}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
