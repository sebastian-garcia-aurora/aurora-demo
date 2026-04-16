import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-9: test3 page
 *
 * Validates that:
 * - The /test3 route is accessible
 * - The page renders 'Page3' text
 */

test.describe("Test3 page - AUR-9", () => {
  test("renders Page3 text at /test3", async ({ page }) => {
    await page.goto("/test3");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Page3");
  });

  test("Page3 text is visible on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/test3");

    await expect(page.getByText("Page3")).toBeVisible();
  });
});
