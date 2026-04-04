import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BriefcaseIcon } from "lucide-react";
import { describe, expect, it } from "vitest";

import { FullPageLayout } from "./full-page-layout";

describe("FullPageLayout", () => {
  // ── Layout structure ──────────────────────────────────────────────────────

  it("renders children in the main content area", () => {
    render(
      <FullPageLayout>
        <p>Page content here</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Page content here")).toBeInTheDocument();
  });

  it("renders Platform group label in navigation", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Platform")).toBeInTheDocument();
  });

  // ── Default sidebar data ──────────────────────────────────────────────────

  it("renders the sidebar with default company name", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
  });

  it("renders default navigation items: Models, Documentation, Settings", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Models")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    // "Settings" appears in both the top-level nav and Playground sub-items
    const settingsItems = screen.getAllByText("Settings");
    expect(settingsItems.length).toBeGreaterThanOrEqual(1);
  });

  it("renders a collapsible Playground nav group", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Playground")).toBeInTheDocument();
  });

  it("renders default user profile in the sidebar footer", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("shadcn")).toBeInTheDocument();
    expect(screen.getByText("m@example.com")).toBeInTheDocument();
  });

  // ── Props API ─────────────────────────────────────────────────────────────

  it("renders custom user data passed via props", () => {
    const customUser = { name: "Alice", email: "alice@corp.io", avatar: "/alice.jpg" };
    render(
      <FullPageLayout user={customUser}>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@corp.io")).toBeInTheDocument();
  });

  it("renders custom teams passed via props", () => {
    const customTeams = [
      { name: "Wayne Enterprises", plan: "Enterprise", logo: BriefcaseIcon },
    ];
    render(
      <FullPageLayout teams={customTeams}>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Wayne Enterprises")).toBeInTheDocument();
  });

  it("renders custom nav items passed via props", () => {
    const customNav = [
      { title: "Analytics", icon: BriefcaseIcon, isCollapsible: false, url: "#analytics" },
    ];
    render(
      <FullPageLayout navItems={customNav}>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  // ── Sidebar toggle ────────────────────────────────────────────────────────

  it("renders a sidebar toggle button", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    // SidebarTrigger renders a button with sr-only "Toggle Sidebar" text;
    // multiple instances can exist (desktop + mobile), so use getAllByRole.
    const toggleBtns = screen.getAllByRole("button", { name: /toggle sidebar/i });
    expect(toggleBtns.length).toBeGreaterThanOrEqual(1);
  });

  it("collapses the sidebar when toggle is clicked", async () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );

    // The sidebar container tracks state via data-state on the element
    // that wraps the sidebar (data-slot="sidebar").
    const sidebarContainer = document
      .querySelector("[data-sidebar='sidebar']")
      ?.closest("[data-state]") as HTMLElement | null;

    expect(sidebarContainer).toHaveAttribute("data-state", "expanded");

    // Click the toggle button
    const toggleBtn = screen.getAllByRole("button", { name: /toggle sidebar/i })[0];
    await userEvent.click(toggleBtn);

    // Sidebar should now be collapsed
    expect(sidebarContainer).toHaveAttribute("data-state", "collapsed");
  });
});
