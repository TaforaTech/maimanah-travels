import { cn } from "@/lib/utils";

export type IconName =
  | "kaaba"
  | "mosque"
  | "plane"
  | "passport"
  | "chat"
  | "book"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "star"
  | "check"
  | "arrow"
  | "chevron"
  | "shield"
  | "bed"
  | "building"
  | "food"
  | "bus"
  | "facebook"
  | "instagram"
  | "youtube"
  | "whatsapp";

const paths: Record<IconName, React.ReactNode> = {
  kaaba: (
    <>
      <path d="M12 2 4 6v12l8 4 8-4V6l-8-4Z" />
      <path d="m4 6 8 4 8-4M12 10v12" />
      <path d="M8 8.5v3" />
    </>
  ),
  mosque: (
    <>
      <path d="M12 2c2.5 2.5 4 4.2 4 6a4 4 0 0 1-8 0c0-1.8 1.5-3.5 4-6Z" />
      <path d="M4 21v-7a3 3 0 0 1 3-3M20 21v-7a3 3 0 0 0-3-3" />
      <path d="M3 21h18M9 21v-3a3 3 0 0 1 6 0v3" />
    </>
  ),
  plane: <path d="M21 15.5 14 12V5a2 2 0 1 0-4 0v7l-7 3.5V18l7-2v3l-2 1.5V22l4-1 4 1v-1.5L13 19v-3l7 2v-2.5Z" />,
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M9 16h6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
      <path d="M9 11h6M9 14h4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M19 17H6a2 2 0 0 0-2 2" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 4v2a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-1Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" />,
  check: <path d="m5 12 4 4 10-10" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bed: (
    <>
      <path d="M2 19v-6a2 2 0 0 1 2-2h12a4 4 0 0 1 4 4v4" />
      <path d="M2 14h20" />
      <path d="M6 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M3 21h18" />
    </>
  ),
  food: (
    <>
      <path d="M3 18h18" />
      <path d="M4 18a8 8 0 0 1 16 0" />
      <path d="M9 6h6" />
      <path d="M12 6v4" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M4 11h16M8 8h8" />
      <path d="M7 16v2M17 16v2" />
    </>
  ),
  facebook: <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.5c0-.3.2-.5.5-.5Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m11 9 4 3-4 3V9Z" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.4-4A8 8 0 1 1 9 19.5L4 20Z" />
      <path d="M9 9c0 3 2 5 5 5 .6 0 1-.6 1-1l-1.5-1-1 .8c-1-.4-1.8-1.2-2.2-2.2l.8-1L10 8c0-.6-.4-1-1-1s-1 1-1 2Z" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
