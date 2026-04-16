import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-39: QA verification of sidebar-menu.tsx extraction (AUR-38)
 *
 * Validates that:
 * - The AppSidebar (extracted into sidebar-menu.tsx) renders correctly in-app
 * - TeamSwitcher displays correctly and allows switching teams via dropdown
 * - Nav items render and collapsible groups expand/collapse
 * - Non-collapsible nav items link correctly
 * - User section renders in sidebar footer
 * - No regressions: full-page-layout still imports and renders correctly
 *
 * KNOWN DEFECTS FOUND (AUR-39 QA):
 * - [DEFECT] TeamSwitcher and NavUser dropdowns crash with
 *   "Base UI: MenuGroupRootContext is missing. Menu group parts must be
 *   used within <Menu.Group>." — DropdownMenuLabel is used outside a
 *   DropdownMenuGroup wrapper in sidebar-menu.tsx (both TeamSwitcher and
 *   NavUser). Tests marked with "DEFECT:" are expected to fail until fixed.
 */

test.describe("AppSidebar extraction - AUR-38 QA (AUR-39)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  // ── Sidebar renders correctly ─────────────────────────────────────────────

  test("sidebar renders with TeamSwitcher showing first team", async ({
    page,
  }) => {
    await expect(page.getByText("Acme Inc")).toBeVisible();
    await expect(page.getByText("Enterprise")).toBeVisible();
  });

  test("sidebar renders Platform nav group label", async ({ page }) => {
    await expect(page.getByText("Platform")).toBeVisible();
  });

  test("sidebar renders all default nav items", async ({ page }) => {
    await expect(page.getByText("Playground")).toBeVisible();
    await expect(page.getByText("Models")).toBeVisible();
    await expect(page.getByText("Documentation")).toBeVisible();
    // Settings appears both as top-level nav item and Playground sub-item
    await expect(page.getByText("Settings").first()).toBeVisible();
  });

  test("sidebar renders user profile in footer", async ({ page }) => {
    await expect(page.getByText("shadcn")).toBeVisible();
    await expect(page.getByText("m@example.com")).toBeVisible();
  });

  // ── TeamSwitcher dropdown ─────────────────────────────────────────────────
  // DEFECT: All three tests below fail because clicking the TeamSwitcher
  // triggers a crash: "Base UI: MenuGroupRootContext is missing. Menu group
  // parts must be used within <Menu.Group>."
  // Root cause: DropdownMenuLabel in TeamSwitcher is used without a wrapping
  // DropdownMenuGroup (which maps to MenuPrimitive.GroupLabel requiring
  // MenuPrimitive.Group context). Fix: wrap the "Teams" label and team items
  // in <DropdownMenuGroup> in sidebar-menu.tsx.

  test("DEFECT: TeamSwitcher dropdown crashes on click - MenuGroupRootContext missing", async ({
    page,
  }) => {
    // This test documents a real defect: clicking TeamSwitcher crashes the app.
    // Expect this test to fail until the bug is fixed in sidebar-menu.tsx.
    const teamSwitcher = page.getByRole("button", {
      name: /Acme Inc Enterprise/i,
    });
    await teamSwitcher.click();

    // The dropdown should open showing all teams
    const menuContent = page.locator("[data-slot='dropdown-menu-content']");
    await expect(menuContent).toBeVisible({ timeout: 5000 });

    // Each team should be selectable
    await expect(
      page.getByRole("menuitem", { name: /Acme Inc/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: /Acme Corp/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: /Evil Corp/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: /Add team/ }),
    ).toBeVisible();
  });

  test("TeamSwitcher updates active team on selection", async ({
    page,
  }) => {
    // Previously crashed before selection was possible (fixed by AUR-40).
    await page.getByRole("button", { name: /Acme Inc Enterprise/i }).click();

    // Select a different team from the dropdown
    await page.getByRole("menuitem", { name: /Acme Corp/ }).click();

    // The active team button in the header should now show "Acme Corp. Startup"
    await expect(
      page.getByRole("button", { name: /Acme Corp\. Startup/i }),
    ).toBeVisible();
  });

  // ── Collapsible nav groups ────────────────────────────────────────────────

  test("Playground collapsible group is open by default with sub-items visible", async ({
    page,
  }) => {
    // Use role-based locator to avoid strict-mode ambiguity with devtools
    await expect(page.getByRole("link", { name: "History" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Starred" })).toBeVisible();
  });

  test("Playground collapsible group collapses on click", async ({ page }) => {
    const playgroundBtn = page.getByRole("button", { name: /playground/i });
    const historyLink = page.getByRole("link", { name: "History" });

    // Initially open
    await expect(historyLink).toBeVisible();

    // Click to collapse
    await playgroundBtn.click();
    await expect(historyLink).toBeHidden();
  });

  test("Playground collapsible group re-expands after second click", async ({
    page,
  }) => {
    const playgroundBtn = page.getByRole("button", { name: /playground/i });
    const historyLink = page.getByRole("link", { name: "History" });

    // Collapse
    await playgroundBtn.click();
    await expect(historyLink).toBeHidden();

    // Re-expand
    await playgroundBtn.click();
    await expect(historyLink).toBeVisible();
  });

  // ── Non-collapsible nav items ─────────────────────────────────────────────

  test("non-collapsible nav items render as links", async ({ page }) => {
    // Models is non-collapsible and has url="#"
    const modelsLink = page.getByRole("link", { name: /Models/i });
    await expect(modelsLink).toBeVisible();

    // Documentation is also non-collapsible
    const docsLink = page.getByRole("link", { name: /Documentation/i });
    await expect(docsLink).toBeVisible();
  });

  // ── User dropdown menu ────────────────────────────────────────────────────
  // DEFECT: Same root cause as TeamSwitcher — DropdownMenuLabel used outside
  // DropdownMenuGroup in NavUser crashes the app on click.

  test("User dropdown opens and shows profile actions (fixed by AUR-40)", async ({
    page,
  }) => {
    // Previously crashed with "MenuGroupRootContext missing" (fixed by AUR-40).
    // Use page.evaluate to click the trigger, bypassing the TanStack Router
    // devtools overlay that intercepts pointer events at the bottom of the page
    // in the dev environment.
    await page.evaluate(() => {
      const triggers = document.querySelectorAll(
        '[data-slot="dropdown-menu-trigger"][data-sidebar="menu-button"]',
      );
      const userTrigger = Array.from(triggers).find((el) =>
        el.textContent?.includes("shadcn"),
      ) as HTMLElement | undefined;
      userTrigger?.click();
    });

    // Dropdown should open with user actions
    await expect(
      page.getByRole("menuitem", { name: /Upgrade to Pro/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: /Settings/ }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("menuitem", { name: /Sign out/ }),
    ).toBeVisible();
  });

  // ── No regressions: full-page-layout still works ─────────────────────────

  test("FullPageLayout still renders dashboard content correctly (no regression)", async ({
    page,
  }) => {
    // Confirm page heading and content render - AUR-38 types were re-exported
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();
    await expect(page.getByText(/Welcome to the dashboard/)).toBeVisible();
  });

  test("layout renders metric cards with sidebar present (no regression)", async ({
    page,
  }) => {
    await expect(page.getByText("Revenue")).toBeVisible();
    await expect(page.getByText("Subscriptions")).toBeVisible();
    await expect(page.getByText("Active Users")).toBeVisible();
  });

  test("sidebar toggle still works after extraction (no regression)", async ({
    page,
  }) => {
    // Sidebar starts expanded
    await expect(page.locator("[data-state='expanded']").first()).toBeVisible();

    // Toggle collapses it
    const toggleBtn = page
      .getByRole("button", { name: /toggle sidebar/i })
      .first();
    await toggleBtn.click();
    await expect(page.locator("[data-state='collapsed']").first()).toBeVisible();

    // Toggle re-expands
    await toggleBtn.click();
    await expect(page.locator("[data-state='expanded']").first()).toBeVisible();
  });

  // ── No console errors on initial render (before any interaction) ──────────

  test("no uncaught console errors on initial sidebar render", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    // Wait for sidebar to render
    await expect(page.getByText("Acme Inc")).toBeVisible();

    expect(errors).toHaveLength(0);
  });
});
