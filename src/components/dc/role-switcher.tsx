"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type Role = "buyer" | "seller";

type RoleSwitcherProps = {
  value?: Role;
  defaultValue?: Role;
  onValueChange?: (role: Role) => void;
  labels?: Record<Role, string>;
  className?: string;
};

/** Buyer / Seller pill used in the seller nav state. */
export function RoleSwitcher({
  value,
  defaultValue = "buyer",
  onValueChange,
  labels = { buyer: "Buyer", seller: "Seller" },
  className,
}: RoleSwitcherProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<Role>(defaultValue);
  const current = isControlled ? value : internal;

  const select = (role: Role) => {
    if (!isControlled) setInternal(role);
    onValueChange?.(role);
  };

  return (
    <div className={cn("role-switcher", className)} role="group" aria-label="Account role">
      {(["buyer", "seller"] as Role[]).map((role) => (
        <button
          key={role}
          type="button"
          className={cn("rs-opt", current === role && "on")}
          aria-pressed={current === role}
          onClick={() => select(role)}
        >
          {labels[role]}
        </button>
      ))}
    </div>
  );
}
