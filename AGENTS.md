<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Accessibility audits (WCAG 2 AA)

Three layers, each catching a different class of issue. None of them are wired into `npm run lint`/`build` yet — run them explicitly:

1. **`npm run lint`** — `eslint-plugin-jsx-a11y` runs at `strict` level (see `eslint.config.mjs`). Catches static, structural issues: missing `alt`, invalid/redundant ARIA, missing form-control associations it can detect syntactically, etc. Cannot catch color contrast — that requires resolving CSS custom properties and `color-mix()`, which static analysis doesn't do.
2. **`npm run test:contrast`** — a Vitest unit test (`src/lib/contrast.test.ts`) that computes the real WCAG contrast ratio for every foreground/background token pair the design system actually renders (in both light and dark themes), using the math in `src/lib/contrast.ts`. This is the only layer that checks contrast. When you add or change a design token (`src/app/globals.css`) or a component style that sets a text `color` against a token-driven background (`src/components/design-system/design-system.css`, the `.sb-*`/`.badge`/`.delta`/etc. rules), add or update the corresponding fixture row in `contrast.test.ts` — it's meant to be the durable record of every text/background combination in the system, not just a one-off check.
3. **`npm run test:a11y`** — Playwright + `@axe-core/playwright` (`e2e/a11y.spec.ts`). Boots the production build (`next build && next start`, per Next's own testing guide) and runs an axe scan against the design-system page in light and dark theme. Catches structural issues at runtime that static lint can't see — landmark/region problems, focus order, redundant alt text, and (as a second confirmation) color contrast.

## Status

Color-contrast violations found by this audit have been fixed (`npm run test:contrast` and `npm run test:a11y` are both green). Still outstanding, not yet fixed: the Forms demo `Input` has no associated `<label>`; there's no skip-to-content link; and `<html lang>` doesn't follow the EN/ES toggle in `language-provider.tsx`. None of these are color-contrast issues, so the existing tests won't catch them — they'd need either a new jsx-a11y rule, a dedicated Playwright assertion, or manual review to regress-test.

## Contrast token design (`--*-text` variants)

`--success`/`--danger`/`--amber`/`--info`/`--purple`/`--accent` stay at full brand saturation for non-text uses (dots, icon fills, backgrounds). Wherever one of these colors is the *text* itself, use the `-text` variant instead (`--accent-text`, `--success-text`, etc., defined in `src/app/globals.css`) — the base color usually doesn't clear 4.5:1 as text, and light/dark need independently-tuned values since the same hex can pass in one theme and fail in the other.

**`color-mix(in oklch, X N%, transparent)` tint backgrounds are backdrop-dependent and must be measured, not computed.** A translucent oklch-mixed color (e.g. `--accent-soft`) composites differently depending on which ancestor surface (`--bg`/`--surface`/`--bg-2`/`--surface-2`) is actually behind it — a naive sRGB alpha-blend formula gives the wrong answer (confirmed empirically while tuning these tokens; see the long comment above `measuredTints` in `src/lib/contrast.test.ts`). If you change a tint's mix percentage or the color it's mixed from, re-measure by rendering the element and sampling the real pixel (Playwright `page.screenshot` + canvas `getImageData`, or `@axe-core/playwright`'s own `failureSummary` for a quick read), not by hand-deriving it. Check every ancestor background the tint can realistically render over — `--accent-soft` in particular is used in prose (`.ds-code`) that can sit on any of the four surface tokens, so its `-text` pairing has to clear the lightest (dark theme) / darkest (light theme) of all of them, not just the one you happened to look at first.

Also watch for `opacity` on text-bearing containers: scaling opacity on a wrapper scales every descendant text color toward the background, which silently drags otherwise-compliant colors below threshold. Apply visual de-emphasis to non-text elements instead (see `InboxRow`'s `dim` prop, which fades only the thumbnail).
