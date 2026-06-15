import type { MDXComponents } from "mdx/types";

/** Styled MDX elements that match the Maimanah design system (prose). */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mt-2 text-3xl font-semibold text-navy-900" {...props} />,
    h2: (props) => <h2 className="mt-10 text-2xl font-semibold text-navy-900" {...props} />,
    h3: (props) => <h3 className="mt-8 text-xl font-semibold text-navy-900" {...props} />,
    p: (props) => <p className="mt-4 text-base leading-relaxed text-muted" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted" {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    a: (props) => <a className="font-medium text-gold-600 underline underline-offset-2" {...props} />,
    blockquote: (props) => (
      <blockquote className="mt-6 border-l-4 border-gold-400 bg-cream-50 px-5 py-3 italic text-navy-800" {...props} />
    ),
    strong: (props) => <strong className="font-semibold text-navy-900" {...props} />,
    hr: () => <hr className="my-8 border-line" />,
    ...components,
  };
}
