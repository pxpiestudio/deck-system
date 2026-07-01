import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Renders all components/states in one DOM (page.tsx statically lists every
 * Navbar auth state and component variant), so a single page load per theme
 * is sufficient coverage.
 */
async function runAxe(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const summary = results.violations.map(
    (v) =>
      `[${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"})\n` +
      v.nodes.map((n) => `    ${n.target.join(" ")}`).join("\n"),
  );
  expect(summary, summary.join("\n\n")).toEqual([]);
}

// `body` has a 0.5s color/background transition (theme crossfade). Scanning
// mid-transition makes axe sample an intermediate color and report a false
// positive, so wait for it to settle before running color-contrast checks.
const THEME_TRANSITION_MS = 1000;

test("design system page has no axe violations — light theme", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(THEME_TRANSITION_MS);
  await runAxe(page);
});

test("design system page has no axe violations — dark theme", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.waitForTimeout(THEME_TRANSITION_MS);
  await runAxe(page);
});
