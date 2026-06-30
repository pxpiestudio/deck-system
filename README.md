# Deckcenter — Design System

A React implementation of the **Deckcenter** Pokémon TCG marketplace design
system, built from the Claude Design handoff prototype. Tokens, components and
the documentation page are all production code now: **Next.js (App Router) +
TypeScript + Tailwind v4 + shadcn/ui**.

The home route (`/`) is the living Design System page — a documented showcase of
every foundation and component, with light/dark theming and an EN/ES toggle.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config)
```

## Architecture

```
src/
├─ app/
│  ├─ globals.css          # design tokens (:root / .dark) + Tailwind theme bridge
│  ├─ layout.tsx           # fonts (Saira / Geist) + Theme & Language providers
│  └─ page.tsx             # the Design System documentation page
├─ components/
│  ├─ ui/                  # shadcn-architecture primitives (cva + Slot asChild)
│  │  ├─ button.tsx        #   primary · ghost · quiet, in 3 sizes
│  │  ├─ badge.tsx
│  │  ├─ card.tsx
│  │  └─ input.tsx
│  ├─ dc/                  # Deckcenter domain components
│  │  ├─ icon.tsx          #   hand-drawn inline-SVG icon set (ICON_PATHS)
│  │  ├─ card-art.tsx      #   hue-tinted card-art placeholder
│  │  ├─ badges.tsx        #   grade / rarity / order-status chips
│  │  ├─ product-card.tsx
│  │  ├─ price-comparison.tsx
│  │  ├─ inbox-row.tsx
│  │  ├─ navbar.tsx        #   guest · buyer · seller states
│  │  ├─ search-bar.tsx
│  │  ├─ qty-control.tsx
│  │  ├─ lang-toggle.tsx
│  │  ├─ role-switcher.tsx
│  │  └─ theme-toggle.tsx
│  ├─ design-system/       # the docs shell (sidebar + scroll-spy + ds-* styles)
│  └─ providers/           # ThemeProvider (.dark) + LanguageProvider (EN/ES)
└─ lib/utils.ts            # cn() — clsx + tailwind-merge
```

## Theming

The design tokens are the source of truth in `globals.css`. Brand hues from the
logo (`--magenta`, `--purple`, `--navy`, `--lavender`) seed semantic, theme-aware
surfaces. They are mapped into Tailwind's theme via `@theme inline`, so utilities
like `bg-surface`, `text-muted`, `border-border-strong` and `bg-accent` resolve
to the live CSS variables and react to theme switches at runtime. shadcn's
semantic names (`--color-background`, `--color-primary`, `--color-ring`, …) are
aliased onto the same tokens so upstream shadcn components inherit the look.

- **Light / dark** — a `.dark` class on `<html>` (shadcn / next-themes
  convention). Set before first paint by an inline script to avoid a theme
  flash; read via `useSyncExternalStore` in `ThemeProvider`.
- **Language** — `LanguageProvider` exposes a `useLanguage()` hook + `t()`; the
  `LangToggle` and navbar pills re-translate the tree (EN / ES).

## Using a component

```tsx
import { Button } from "@/components/ui/button";
import { ProductCard, StatusBadge } from "@/components/dc";

<Button variant="ghost" size="sm">Back</Button>

<ProductCard
  hue={8}
  rarity="Special"
  name="Charizard ex"
  meta="151 · 199/165"
  price="$412.50"
  listings="41 listings"
  delta={{ dir: "up", value: "6.2%" }}
/>

<StatusBadge tone="confirmed">Confirmed</StatusBadge>
```

## Provenance

Recreated from the `project/Design System.html` prototype and the chat
transcripts in the original handoff bundle. Visual output is matched to the
prototype; the internal structure is idiomatic React/shadcn rather than a copy
of the prototype's classic-script build.
