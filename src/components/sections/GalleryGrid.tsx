import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { gallery } from "@/content/data/gallery";
import type { Locale } from "@/content/i18n/config";

/**
 * Original gallery tiles rendered as gradient artwork (no copyrighted photos).
 * Swap each tile for a next/image when real photography is available.
 */
export function GalleryGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item, i) => (
        <Reveal key={item.id} delay={(i % 3) * 60}>
          <figure className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} shadow-soft`}>
            <div className="pattern-arabesque absolute inset-0 opacity-40" aria-hidden />
            <Icon
              name="mosque"
              className="absolute right-4 top-4 h-8 w-8 text-white/30"
              strokeWidth={1}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-4 text-sm font-medium text-cream-50">
              {item.caption[locale]}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
