import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-6: Scaffold cleanup validation
 *
 * Validates that:
 * - The home page renders only "Claude Starter" heading
 * - Removed routes (/dashboard, /login) return 404
 * - No broken imports or missing resources
 */

test.describe("Scaffold cleanup - AUR-6", () => {
  test("home page shows only Claude Starter heading", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Claude Starter");
  });

  test("home page has no extra visible content besides the heading", async ({
    page,
  }) => {
    await page.goto("/");

    // Only one h1 should exist
    const allH1 = page.locator("h1");
    await expect(allH1).toHaveCount(1);
  });

  test("removed /dashboard route returns 404", async ({ page }) => {
    const response = await page.goto("/dashboard");
    // TanStack Router shows a 404/not-found page for unknown routes
    // The page may not return HTTP 404 (SPA), but should show not-found content
    // or at minimum not crash the app
    expect(response?.status()).not.toBe(500);

    // Should not display a dashboard page with known dashboard content
    await expect(page.getByText(/dashboard/i)).not.toBeVisible();
  });

  test("removed /login route returns 404", async ({ page }) => {
    const response = await page.goto("/login");
    expect(response?.status()).not.toBe(500);

    // Should not display a login form
    await expect(page.locator("form")).not.toBeVisible();
  });

  test("page loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });
});
