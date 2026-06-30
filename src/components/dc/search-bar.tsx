"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/dc/icon";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  placeholder?: string;
  ctaLabel?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
};

/**
 * Primary search entry point. Focus state lives on the container via
 * `:focus-within` — never on the input directly.
 */
export function SearchBar({
  placeholder = "Search Charizard ex, sets, sealed product…",
  ctaLabel = "Search",
  defaultValue = "",
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = React.useState(defaultValue);

  return (
    <form
      className={cn("searchbar", className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(query);
      }}
      role="search"
    >
      <div className="searchbar-box">
        <Icon name="search" size={20} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <Button type="submit" size="sm">
          {ctaLabel}
          <Icon name="arrow" size={15} />
        </Button>
      </div>
    </form>
  );
}
