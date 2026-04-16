import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-7: QA verification of test2 page implementation (AUR-6)
 *
 * Validates that:
 * - The /test2 route is accessible
 * - The page renders 'Page 2' text visibly
 * - The page loads without console errors
 * - Navigation to /test2 works correctly
 */

test.describe("Test2 page - AUR-6", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test2");
  });

  // ── Route accessibility ──────────────────────────────────────────────────

  test("navigates to /test2 route successfully", async ({ page }) => {
    await expect(page).toHaveURL("/test2");
  });

  test("returns 200 status for /test2 route", async ({ page }) => {
    const response = await page.goto("/test2");
    expect(response?.status()).toBe(200);
  });

  // ── Page content ─────────────────────────────────────────────────────────

  test("renders 'Page 2' heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "Page 2" }),
    ).toBeVisible();
  });

  test("renders 'Page 2' text visibly", async ({ page }) => {
    await expect(page.getByText("Page 2")).toBeVisible();
  });

  // ── No console errors ─────────────────────────────────────────────────────

  test("loads without console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/test2");
    await page.waitForLoadState("networkidle");

    expect(consoleErrors).toHaveLength(0);
  });

  // ── Navigation ────────────────────────────────────────────────────────────

  test("navigates to /test2 from the home page", async ({ page }) => {
    await page.goto("/");
    await page.goto("/test2");
    await expect(page).toHaveURL("/test2");
    await expect(
      page.getByRole("heading", { level: 1, name: "Page 2" }),
    ).toBeVisible();
  });

  test("navigates to /test2 from /test page", async ({ page }) => {
    await page.goto("/test");
    await page.goto("/test2");
    await expect(page).toHaveURL("/test2");
    await expect(page.getByText("Page 2")).toBeVisible();
  });
});
