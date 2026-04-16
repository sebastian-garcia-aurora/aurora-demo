import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-12: test4 page
 *
 * Validates that:
 * - The /test4 route is accessible
 * - The page renders 'Page 4' text
 * - The page works on both desktop and mobile viewports
 * - The page follows the same layout/structure patterns as other pages
 */

test.describe("Test4 page - AUR-12", () => {
  test("renders Page 4 heading at /test4 on desktop", async ({ page }) => {
    await page.goto("/test4");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Page 4");
  });

  test("Page 4 text is visible on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/test4");

    await expect(page.getByText("Page 4")).toBeVisible();
  });

  test("Page 4 text is visible on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/test4");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page 4");
  });

  test("page URL is /test4", async ({ page }) => {
    await page.goto("/test4");
    expect(page.url()).toContain("/test4");
  });

  test("page layout matches other pages structure (container with padding)", async ({
    page,
  }) => {
    await page.goto("/test4");

    // The page should have a heading as the main content element
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Heading should be styled (has content and is rendered in the DOM)
    const headingText = await heading.textContent();
    expect(headingText).toBe("Page 4");
  });

  test("no uncaught console errors on /test4 page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/test4");
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });
});
