import { defineConfig } from "tsup";

/**
 * Library build for the published `@pxpiestudio/deckcenter-ds` package.
 *
 * - Resolves the `@/*` tsconfig alias into self-contained output so consumers
 *   never see internal `@/...` imports.
 * - Emits ESM + `.d.ts` types.
 * - `react`, `react-dom` and every runtime dependency declared in package.json
 *   are externalized automatically by tsup, so they're shared with the host app
 *   instead of duplicated.
 * - The `"use client"` directives on the providers and interactive components
 *   are preserved/hoisted so the package works inside React Server Components.
 *
 * The stylesheet is plain CSS with Tailwind at-rules that the *consumer's*
 * Tailwind must compile, so it is copied verbatim (see the `build` script) and
 * exported as `@pxpiestudio/deckcenter-ds/styles.css` — tsup does not touch it.
 */
export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Base tsconfig sets `incremental`/`noEmit` for the Next app; the dts build
  // needs its own emit-friendly config (paths are still inherited via extends).
  tsconfig: "tsconfig.build.json",
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
  // esbuild strips module-level directives when bundling, so `"use client"` is
  // prepended after the build (see the `build:lib` script) rather than here.
});
