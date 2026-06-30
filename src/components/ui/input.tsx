import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-[11px] border-[1.5px] border-border-strong bg-surface px-4 py-3 font-body text-[15px] text-text outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "placeholder:text-faint",
        "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--accent-soft)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
