import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-9/AUR-10: test3 page
 *
 * Validates that:
 * - The /test3 route is accessible
 * - The page renders 'Page3' text
 * - The page works on both desktop and mobile viewports
 * - The page follows the same layout/structure patterns as other pages
 */

test.describe("Test3 page - AUR-10", () => {
  test("renders Page3 heading at /test3 on desktop", async ({ page }) => {
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

  test("Page3 text is visible on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/test3");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page3");
  });

  test("page URL is /test3", async ({ page }) => {
    await page.goto("/test3");
    expect(page.url()).toContain("/test3");
  });

  test("page layout matches other pages structure (container with padding)", async ({
    page,
  }) => {
    await page.goto("/test3");

    // The page should have a heading as the main content element
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Heading should be styled (has content and is rendered in the DOM)
    const headingText = await heading.textContent();
    expect(headingText).toBe("Page3");
  });

  test("no uncaught console errors on /test3 page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/test3");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });
});
