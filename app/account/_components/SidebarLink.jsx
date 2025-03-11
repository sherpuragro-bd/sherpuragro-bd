"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

export const SidebarLinks = forwardRef(
  ({ link, icon, end, children, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === link;
    return (
      <Link
        {...props}
        ref={ref}
        href={`${link}`}
        className={`px-5 py-3 flex items-center border rounded-lg gap-2 transition-all ${
          isActive ? "bg-primary !text-white" : ""
        }`}
      >
        <span className="scale-90">{icon}</span>
        <span className={`font-normal ${isActive ? "!text-white" : ""}`}>
          {children}
        </span>
      </Link>
    );
  }
);
