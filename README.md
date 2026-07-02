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

## Consuming this design system in another project

This repo publishes itself as a private, versioned package —
`@pxpiestudio/sleeve-ds` — to **GitHub Packages**. Another platform installs
it as a dependency and pulls updates through normal semver: when the design
system is updated here and a new version is published, a consumer just runs
`npm update` and keeps building. (It is *not* a shadcn "copy the files in"
registry — consumers do not own or edit the component source.)

Target stack for consumers: **React 19 + Tailwind v4**.

### 1. Authenticate to GitHub Packages

Both the consuming project and each teammate need read access to the
`pxpiestudio` org. In the consuming project's root, add an `.npmrc`:

```ini
@pxpiestudio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then export a GitHub Personal Access Token (classic) with the `read:packages`
scope as `NODE_AUTH_TOKEN` (do **not** commit the token itself).

### 2. Install

```bash
npm install @pxpiestudio/sleeve-ds
```

`react` / `react-dom` are peer dependencies (use the host app's copy). The
component runtime deps (`clsx`, `tailwind-merge`, `class-variance-authority`,
`lucide-react`, `@radix-ui/react-slot`) come along automatically.

### 3. Wire up the stylesheet + Tailwind scanning

In the consuming app's Tailwind entry CSS:

```css
@import "tailwindcss";
@import "@pxpiestudio/sleeve-ds/styles.css";

/* Tailwind ignores node_modules by default. This tells it to scan the
   package's compiled components so it emits the utility classes they use
   (bg-surface, text-muted, …). Adjust the relative path to reach your
   node_modules; the important part is the package's dist folder. */
@source "../node_modules/@pxpiestudio/sleeve-ds/dist";
```

`styles.css` ships the design tokens, the `@theme` bridge and all the ported
component classes — so `bg-surface`, `text-muted`, `.pcard`, `.sb-*`, etc. are
available to the components **and** to your own new UI built on the same tokens.

### 4. Provide the fonts (important)

The tokens reference three font CSS variables that the host app must define —
otherwise the type falls back to `system-ui`. With Next's font loader:

```tsx
import { Saira, Geist, Geist_Mono } from "next/font/google";

const saira = Saira({ variable: "--font-saira", subsets: ["latin"], weight: ["400","500","600","700"] });
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], weight: ["400","500","600","700"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// on <html>: className={`${saira.variable} ${geist.variable} ${geistMono.variable}`}
```

### 5. Use it

```tsx
import {
  ThemeProvider,
  LanguageProvider,
  themeInitScript,
  Button,
  ProductCard,
} from "@pxpiestudio/sleeve-ds";

// Wrap the app once (ThemeProvider drives the `.dark` class; add
// `themeInitScript` in a <script> before first paint to avoid a theme flash).
<ThemeProvider>
  <LanguageProvider>
    <Button variant="ghost" size="sm">Back</Button>
    <ProductCard hue={8} name="Charizard ex" price="$412.50" listings="41 listings" />
  </LanguageProvider>
</ThemeProvider>
```

### Releasing a new version (maintainer)

```bash
npm version patch          # or minor / major — bumps package.json + tags
git push --follow-tags     # the Publish workflow builds & publishes on the tag
```

## Provenance

Recreated from the `project/Design System.html` prototype and the chat
transcripts in the original handoff bundle. Visual output is matched to the
prototype; the internal structure is idiomatic React/shadcn rather than a copy
of the prototype's classic-script build.
