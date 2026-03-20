import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-23: Hello Claude button feature
 *
 * Validates that:
 * - The "Hello Claude" button renders on the home page
 * - Clicking the button shows "This is working!" text
 * - Clicking again hides the text (toggle behavior)
 * - Existing page content (h1) is not affected
 * - Button is a proper accessible button element
 */

test.describe("Hello Claude button - AUR-23", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the Hello Claude button", async ({ page }) => {
    const button = page.getByRole("button", { name: "Hello Claude" });
    await expect(button).toBeVisible();
  });

  test("shows 'This is working!' text when button is clicked", async ({
    page,
  }) => {
    await expect(page.getByText("This is working!")).not.toBeVisible();

    await page.getByRole("button", { name: "Hello Claude" }).click();

    await expect(page.getByText("This is working!")).toBeVisible();
  });

  test("toggles text off when button is clicked again", async ({ page }) => {
    const button = page.getByRole("button", { name: "Hello Claude" });

    await button.click();
    await expect(page.getByText("This is working!")).toBeVisible();

    await button.click();
    await expect(page.getByText("This is working!")).not.toBeVisible();
  });

  test("does not affect existing heading content", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Claude Starter");

    // Click button and verify heading still unchanged
    await page.getByRole("button", { name: "Hello Claude" }).click();
    await expect(heading).toHaveText("Claude Starter");
  });

  test("button is a proper accessible button element", async ({ page }) => {
    const button = page.getByRole("button", { name: "Hello Claude" });
    await expect(button).toBeVisible();
    // Verify it responds to keyboard activation
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText("This is working!")).toBeVisible();
  });
});
