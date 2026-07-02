/**
 * Deckcenter Design System — public package entry point.
 *
 * Consumers install `@pxpiestudio/sleeve-ds` and import components from
 * here, plus the stylesheet once at the app root:
 *
 *   import "@pxpiestudio/sleeve-ds/styles.css";
 *   import { Button, ProductCard, ThemeProvider } from "@pxpiestudio/sleeve-ds";
 */

// ── Theming / i18n providers ──
export {
  ThemeProvider,
  useTheme,
  themeInitScript,
} from "./components/providers/theme-provider";
export {
  LanguageProvider,
  useLanguage,
  type Lang,
} from "./components/providers/language-provider";

// ── shadcn-architecture primitives ──
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button";
export { Badge, badgeVariants } from "./components/ui/badge";
export { Input } from "./components/ui/input";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card";

// ── Deckcenter domain components ──
export * from "./components/dc";

// ── Utilities ──
export { cn } from "./lib/utils";
