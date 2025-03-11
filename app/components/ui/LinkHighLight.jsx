import { forwardRef } from "react";
import NewLink from "./NewLink";

export const LinkHighLight = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <NewLink
        className={`text-primary hover:underline font-light ${className || ""}`}
        {...props}
        ref={ref}
      >
        {children}
      </NewLink>
    );
  }
);
