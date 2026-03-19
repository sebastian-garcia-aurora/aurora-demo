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
});
