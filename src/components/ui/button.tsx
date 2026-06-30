import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Deckcenter button — shadcn architecture (cva + Slot `asChild`) styled to the
 * Deckcenter design language. Three intent levels in three sizes; the primary
 * button is the single accent CTA, ghost keeps structure without filled weight,
 * quiet is a text affordance.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[11px] font-head font-semibold tracking-[-0.01em] transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-[0_8px_22px_var(--accent-soft)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_color-mix(in_oklch,var(--accent)_32%,transparent)]",
        ghost:
          "border border-border-strong bg-surface text-text hover:-translate-y-0.5 hover:bg-surface-2",
        quiet:
          "text-text hover:bg-[color-mix(in_oklch,var(--text)_8%,transparent)]",
      },
      size: {
        default: "px-[22px] py-3 text-[15px]",
        sm: "px-4 py-[9px] text-[13.5px]",
        lg: "px-7 py-[15px] text-[16.5px]",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
