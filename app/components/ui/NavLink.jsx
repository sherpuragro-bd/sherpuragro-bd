"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ className, activeClass, href, children, ...props }) => {
  const path = usePathname();
  const isActive = path === href;
  return (
    <Link
      href={href}
      {...props}
      className={`${isActive ? `text-primary ${activeClass || ""}` : ""} ${
        className || ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
