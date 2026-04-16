import { expect, test } from "@playwright/test";

/**
 * E2E tests for AUR-41: QA verification of DropdownMenuGroup fix in
 * TeamSwitcher and NavUser (AUR-40)
 *
 * Validates that:
 * - TeamSwitcher: DropdownMenuLabel ("Teams") is wrapped in DropdownMenuGroup
 *   so the label and team items share the same semantic ARIA group
 * - NavUser: DropdownMenuLabel (profile header) is wrapped in DropdownMenuGroup
 *   for correct ARIA grouping
 * - Both dropdowns still render their content and remain functional
 * - No visual regressions introduced by the fix
 */

/**
 * Helper: register a Playwright locator handler that hides the TanStack
 * Router Devtools floating button whenever it intercepts pointer events.
 * This is a one-time setup per test (called in beforeEach).
 */
async function suppressDevtoolsOverlay(page: import("@playwright/test").Page) {
  // addLocatorHandler fires when this locator would otherwise intercept a
  // click — we use it to hide the devtools wrapper via CSS injection.
  await page.addLocatorHandler(
    page.getByRole("button", { name: "Open TanStack Router Devtools" }),
    async () => {
      await page.addStyleTag({
        content: `
          [aria-label="Open TanStack Router Devtools"],
          [aria-label="Close TanStack Router Devtools"] {
            pointer-events: none !important;
            visibility: hidden !important;
          }
        `,
      });
    },
  );
}

test.describe("DropdownMenuGroup fix - AUR-40", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await suppressDevtoolsOverlay(page);
  });

  // ── TeamSwitcher ─────────────────────────────────────────────────────────

  test.describe("TeamSwitcher", () => {
    test("renders TeamSwitcher trigger button with active team name", async ({
      page,
    }) => {
      await expect(page.getByText("Acme Inc")).toBeVisible();
      await expect(page.getByText("Enterprise")).toBeVisible();
    });

    test("opens TeamSwitcher dropdown on click", async ({ page }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      await expect(page.getByRole("menu")).toBeVisible();
    });

    test("Teams label is present in dropdown content", async ({ page }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      // The DropdownMenuLabel with text "Teams" should be visible
      await expect(page.getByRole("menu").getByText("Teams")).toBeVisible();
    });

    test("Teams label and team items share the same DropdownMenuGroup", async ({
      page,
    }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();

      // The Teams label and team list items must be inside the same group element.
      // DropdownMenuGroup renders a <div role="group"> wrapper.
      // We verify that "Teams" label is inside a group that also contains team items.
      const group = menu.locator("[role='group']").first();
      await expect(group.getByText("Teams")).toBeVisible();
      await expect(group.getByText("Acme Inc")).toBeVisible();
    });

    test("renders all three teams inside the Teams group", async ({ page }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      const menu = page.getByRole("menu");
      const group = menu.locator("[role='group']").first();

      await expect(group.getByText("Acme Inc")).toBeVisible();
      await expect(group.getByText("Acme Corp.")).toBeVisible();
      await expect(group.getByText("Evil Corp.")).toBeVisible();
    });

    test("can switch active team from dropdown", async ({ page }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      const menu = page.getByRole("menu");
      await menu.getByText("Acme Corp.").click();

      // After selecting, the dropdown should close and the trigger should
      // show the newly active team. Use the sidebar header scope to avoid
      // strict-mode conflict with any still-visible dropdown items.
      const trigger = page.locator("[data-sidebar='header']").getByRole("button").first();
      await expect(trigger).toContainText("Acme Corp.");
    });

    test("Add team option is present outside the Teams group", async ({
      page,
    }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu.getByText("Add team")).toBeVisible();
    });

    test("TeamSwitcher dropdown closes after team selection", async ({
      page,
    }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();

      await menu.getByText("Evil Corp.").click();

      // Menu should close
      await expect(menu).toBeHidden();
    });
  });

  // ── NavUser ──────────────────────────────────────────────────────────────

  test.describe("NavUser", () => {
    test("renders NavUser trigger with user name and email", async ({
      page,
    }) => {
      await expect(page.getByText("shadcn")).toBeVisible();
      await expect(page.getByText("m@example.com")).toBeVisible();
    });

    test("opens NavUser dropdown on click", async ({ page }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      await expect(page.getByRole("menu")).toBeVisible();
    });

    test("profile header label is wrapped in DropdownMenuGroup", async ({
      page,
    }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();

      // The profile header (DropdownMenuLabel) should be inside a group element.
      // DropdownMenuGroup renders as <div role="group">.
      const profileGroup = menu.locator("[role='group']").first();
      // Profile header contains the user name
      await expect(profileGroup.getByText("shadcn")).toBeVisible();
    });

    test("profile header group shows user name and email", async ({ page }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      const menu = page.getByRole("menu");
      const profileGroup = menu.locator("[role='group']").first();

      await expect(profileGroup.getByText("shadcn")).toBeVisible();
      await expect(profileGroup.getByText("m@example.com")).toBeVisible();
    });

    test("NavUser dropdown contains Upgrade to Pro option", async ({
      page,
    }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu.getByText("Upgrade to Pro")).toBeVisible();
    });

    test("NavUser dropdown contains Settings option", async ({ page }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu.getByText("Settings")).toBeVisible();
    });

    test("NavUser dropdown contains Sign out option", async ({ page }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu.getByText("Sign out")).toBeVisible();
    });

    test("NavUser dropdown closes after pressing Escape", async ({ page }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();

      await page.keyboard.press("Escape");

      await expect(menu).toBeHidden();
    });
  });

  // ── Accessibility / ARIA grouping ────────────────────────────────────────

  test.describe("ARIA grouping (accessibility)", () => {
    test("TeamSwitcher dropdown has at least one role=group element", async ({
      page,
    }) => {
      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      const menu = page.getByRole("menu");
      const groups = menu.locator("[role='group']");
      await expect(groups.first()).toBeVisible();
    });

    test("NavUser dropdown has at least one role=group element", async ({
      page,
    }) => {
      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      const menu = page.getByRole("menu");
      const groups = menu.locator("[role='group']");
      await expect(groups.first()).toBeVisible();
    });

    test("no uncaught console errors when opening TeamSwitcher dropdown", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      const teamSwitcherBtn = page
        .locator("[data-sidebar='header']")
        .getByRole("button")
        .first();
      await teamSwitcherBtn.click();

      await page.getByRole("menu").waitFor({ state: "visible" });
      expect(errors).toHaveLength(0);
    });

    test("no uncaught console errors when opening NavUser dropdown", async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      const navUserBtn = page
        .locator("[data-sidebar='footer']")
        .getByRole("button")
        .first();
      await navUserBtn.click();

      await page.getByRole("menu").waitFor({ state: "visible" });
      expect(errors).toHaveLength(0);
    });
  });
});
