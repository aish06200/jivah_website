"use client";

import { usePathname } from "next/navigation";

export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "";

  return <main className={`flex-1 ${home ? "" : "pt-[61px] md:pt-[69px]"}`}>{children}</main>;
}
