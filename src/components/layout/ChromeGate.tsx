"use client";

import { usePathname } from "next/navigation";

/**
 * Hides site chrome (header/footer/announcement) on immersive, full-screen
 * routes such as the Hajj guide. Server-rendered children are passed through
 * untouched on all other routes.
 */
export function ChromeGate({
  hideOn,
  children,
}: {
  hideOn: string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  if (hideOn.some((seg) => pathname.includes(seg))) return null;
  return <>{children}</>;
}
