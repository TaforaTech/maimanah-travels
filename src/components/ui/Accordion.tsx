"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-[--radius-xl2] border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7"
              >
                <span className="font-sans text-base font-semibold text-navy-900 md:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-300 text-gold-600 transition-transform duration-300",
                    isOpen && "rotate-45 bg-gold-500 text-navy-900",
                  )}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-muted md:px-7">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
