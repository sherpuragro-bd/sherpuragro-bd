"use client";

import { usePathname } from "next/navigation";

export default function HideWrapper({ toHide, children }) {
  const pathname = usePathname();

  if (pathname.startsWith(toHide)) {
    return;
  }

  return <>{children}</>;
}
