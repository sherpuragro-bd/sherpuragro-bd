import Link from "next/link";
import { forwardRef } from "react";

export const LinkHighLight = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <Link
        className={`text-primary hover:underline font-light ${className || ""}`}
        {...props}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
);
