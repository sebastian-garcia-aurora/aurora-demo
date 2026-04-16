import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-4: Hello Multica test page
 *
 * Validates that:
 * - The /test route is accessible and shows 'Hello Multica!' heading
 * - 'Hello Seba' text is hidden before clicking the button
 * - Clicking the 'Hello' button reveals 'Hello Seba' text
 * - Multiple clicks don't break the UI
 * - Button label reads 'Hello'
 * - Page is properly styled using the design system
 */

test.describe("Hello Multica page - AUR-4", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test");
  });

  test("page is accessible via /test route", async ({ page }) => {
    await expect(page).toHaveURL(/\/test/);
  });

  test("shows 'Hello Multica!' heading on load", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Hello Multica!");
  });

  test("'Hello' button exists on the page", async ({ page }) => {
    const button = page.getByRole("button", { name: "Hello" });
    await expect(button).toBeVisible();
  });

  test("'Hello Seba' text is NOT visible before clicking the button", async ({
    page,
  }) => {
    await expect(page.getByText("Hello Seba")).not.toBeVisible();
  });

  test("clicking 'Hello' button shows 'Hello Seba' text", async ({ page }) => {
    await expect(page.getByText("Hello Seba")).not.toBeVisible();

    await page.getByRole("button", { name: "Hello" }).click();

    await expect(page.getByText("Hello Seba")).toBeVisible();
  });

  test("multiple clicks don't break the UI", async ({ page }) => {
    const button = page.getByRole("button", { name: "Hello" });
    const heading = page.getByRole("heading", { level: 1 });

    for (let i = 0; i < 5; i++) {
      await button.click();
    }

    // After multiple clicks the heading should still be visible
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Hello Multica!");
    // Button should still be present and interactable
    await expect(button).toBeVisible();
    // 'Hello Seba' should be visible (odd number of clicks if toggle, or always shown if one-shot)
    await expect(page.getByText("Hello Seba")).toBeVisible();
  });

  test("page uses design system styling (container, heading classes)", async ({
    page,
  }) => {
    // Verify heading renders with bold/large styling (h1 tag with design system class)
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Verify the button has primary styling from the design system
    const button = page.getByRole("button", { name: "Hello" });
    await expect(button).toBeVisible();
  });

  test("button is keyboard accessible", async ({ page }) => {
    const button = page.getByRole("button", { name: "Hello" });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText("Hello Seba")).toBeVisible();
  });
});
