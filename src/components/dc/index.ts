/**
 * Deckcenter component library — barrel export.
 * Primitives live in `@/components/ui` (shadcn architecture); these are the
 * domain components built on top of them.
 */
export { Icon, ICON_PATHS, type IconName } from "./icon";
export { CardArt } from "./card-art";
export { GradeBadge, RarityChip, StatusBadge, STATUS_TONES, type StatusTone } from "./badges";
export { ProductCard, type PriceDelta } from "./product-card";
export { PriceComparison, type StorePrice } from "./price-comparison";
export { InboxRow, type InboxCheckbox } from "./inbox-row";
export { Navbar, type NavState } from "./navbar";
export { SearchBar } from "./search-bar";
export { QtyControl } from "./qty-control";
export { LangToggle } from "./lang-toggle";
export { RoleSwitcher, type Role } from "./role-switcher";
export { ThemeToggle } from "./theme-toggle";
