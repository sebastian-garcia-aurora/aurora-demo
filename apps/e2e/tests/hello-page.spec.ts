import { expect, test } from "@playwright/test";

test.describe("Hello Page (/hello)", () => {
  test("renders the page without crashing", async ({ page }) => {
    await page.goto("/hello");
    await expect(page).toHaveURL(/\/hello/);
  });

  test("displays 'Hello from Claude Agents Pipeline' heading", async ({
    page,
  }) => {
    await page.goto("/hello");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Hello from Claude Agents Pipeline");
  });

  test("heading uses semantic h1 tag", async ({ page }) => {
    await page.goto("/hello");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Hello from Claude Agents Pipeline");
  });

  test("page has a main landmark region", async ({ page }) => {
    await page.goto("/hello");
    const main = page.getByRole("main");
    await expect(main).toBeVisible();
  });

  test("renders correctly on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/hello");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("renders correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/hello");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });
});
