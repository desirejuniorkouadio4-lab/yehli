import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("block text-sm font-semibold text-dark", className)}
    {...props}
  >
    {children}
    {required && (
      <span className="text-error" aria-hidden="true">
        {" "}
        *
      </span>
    )}
  </label>
));
Label.displayName = "Label";

export { Label };
