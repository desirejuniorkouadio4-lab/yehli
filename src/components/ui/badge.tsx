import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold leading-none",
  {
    variants: {
      variant: {
        green: "bg-primary-pale text-primary",
        yellow: "bg-accent-light text-[#92610A]",
        outline: "border border-primary/30 text-primary",
        neutral: "bg-surface text-muted border border-border",
        dark: "bg-primary text-white",
        accent: "bg-accent text-dark",
      },
      size: {
        sm: "px-2.5 py-1 text-xs",
        md: "px-3.5 py-1.5 text-sm",
      },
    },
    defaultVariants: { variant: "green", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
