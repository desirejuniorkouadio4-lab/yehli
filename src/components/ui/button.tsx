import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:h-[1.1em] [&_svg]:w-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-sm hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-cta",
        secondary:
          "border-2 border-primary text-primary hover:bg-primary-pale",
        accent:
          "bg-accent font-bold text-dark hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-cta",
        ghost: "text-primary hover:bg-primary-pale",
        outline:
          "border border-border bg-white text-dark hover:border-primary hover:text-primary",
        subtle: "bg-primary-pale text-primary hover:bg-primary-mid",
        white: "bg-white text-primary shadow-sm hover:bg-accent-light",
        destructive: "bg-error text-white hover:bg-error/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-sm",
        md: "h-11 rounded-full px-7 text-[0.9375rem]",
        lg: "h-12 rounded-full px-9 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
