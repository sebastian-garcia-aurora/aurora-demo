import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-36: QA verification of FullPageLayout component
 *
 * Validates that:
 * - The /dashboard route renders the FullPageLayout with all expected elements
 * - Sidebar contains company switcher, nav items, and user profile
 * - Sidebar toggle button is present and functional
 * - Playground collapsible nav group works correctly
 * - Dashboard content (children) renders properly
 * - No console errors or broken layouts
 */

test.describe("FullPageLayout - AUR-36", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  // ── Route & layout ───────────────────────────────────────────────────────

  test("navigates to /dashboard and renders page content", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(
      page.getByText(/Welcome to the dashboard/),
    ).toBeVisible();
  });

  test("renders the metric cards in dashboard content", async ({ page }) => {
    await expect(page.getByText("Revenue")).toBeVisible();
    await expect(page.getByText("Subscriptions")).toBeVisible();
    await expect(page.getByText("Active Users")).toBeVisible();
  });

  // ── Sidebar structure ────────────────────────────────────────────────────

  test("renders sidebar with default company name 'Acme Inc'", async ({ page }) => {
    await expect(page.getByText("Acme Inc")).toBeVisible();
  });

  test("renders platform nav group label", async ({ page }) => {
    await expect(page.getByText("Platform")).toBeVisible();
  });

  test("renders top-level nav items: Models, Documentation, Settings", async ({
    page,
  }) => {
    await expect(page.getByText("Models")).toBeVisible();
    await expect(page.getByText("Documentation")).toBeVisible();
    // Settings appears in both top-level and Playground sub-nav
    const settingsItems = page.getByText("Settings");
    await expect(settingsItems.first()).toBeVisible();
  });

  test("renders Playground collapsible nav group", async ({ page }) => {
    await expect(page.getByText("Playground")).toBeVisible();
  });

  test("renders user profile in sidebar footer", async ({ page }) => {
    await expect(page.getByText("shadcn")).toBeVisible();
    await expect(page.getByText("m@example.com")).toBeVisible();
  });

  // ── Sidebar toggle ───────────────────────────────────────────────────────

  test("renders sidebar toggle button", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /toggle sidebar/i }).first();
    await expect(toggleBtn).toBeVisible();
  });

  test("sidebar starts in expanded state", async ({ page }) => {
    // The sidebar wrapper uses data-state to track expanded/collapsed
    const sidebar = page.locator("[data-sidebar='sidebar']").first();
    await expect(sidebar).toBeVisible();
    const wrapper = page.locator("[data-state='expanded']").first();
    await expect(wrapper).toBeVisible();
  });

  test("sidebar collapses when toggle button is clicked", async ({ page }) => {
    // Verify expanded first
    await expect(page.locator("[data-state='expanded']").first()).toBeVisible();

    // Click toggle
    const toggleBtn = page.getByRole("button", { name: /toggle sidebar/i }).first();
    await toggleBtn.click();

    // Verify collapsed state appears
    await expect(page.locator("[data-state='collapsed']").first()).toBeVisible();
  });

  test("sidebar re-expands after second toggle click", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /toggle sidebar/i }).first();

    // Collapse
    await toggleBtn.click();
    await expect(page.locator("[data-state='collapsed']").first()).toBeVisible();

    // Re-expand
    await toggleBtn.click();
    await expect(page.locator("[data-state='expanded']").first()).toBeVisible();
  });

  // ── Playground sub-items ─────────────────────────────────────────────────

  test("Playground shows sub-items by default (defaultOpen)", async ({ page }) => {
    // The Playground collapsible is defaultOpen, so sub-items are visible immediately
    await expect(page.getByText("History")).toBeVisible();
    await expect(page.getByText("Starred")).toBeVisible();
  });

  test("Playground collapses and re-expands when clicked", async ({ page }) => {
    const playgroundTrigger = page.getByRole("button", { name: /playground/i });
    // Target the nav link specifically to avoid ambiguity with sidebar rail
    const historyLink = page.getByRole("link", { name: "History" });

    // Initially open: History link is visible
    await expect(historyLink).toBeVisible();

    // Click to collapse
    await playgroundTrigger.click();
    await expect(historyLink).toBeHidden();

    // Click to re-expand
    await playgroundTrigger.click();
    await expect(historyLink).toBeVisible();
  });

  // ── No console errors ────────────────────────────────────────────────────

  test("no uncaught console errors on dashboard page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);
  });

  // ── Accessibility ────────────────────────────────────────────────────────

  test("sidebar toggle button is keyboard accessible", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /toggle sidebar/i }).first();
    await toggleBtn.focus();
    await page.keyboard.press("Enter");

    // After keyboard activation, sidebar should toggle
    await expect(page.locator("[data-state='collapsed']").first()).toBeVisible();
  });
});
