import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Generic shadcn-style badge. Deckcenter's domain badges (grade, rarity, order
 * status) are built on top of this in `components/dc/badges.tsx`.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md font-head text-[11px] font-bold tracking-[0.03em] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-surface-2 text-muted px-[9px] py-1",
        accent: "bg-accent-soft text-accent px-[9px] py-1",
        outline: "border border-border-strong text-muted px-[9px] py-1",
        solid: "bg-accent text-white px-[9px] py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
