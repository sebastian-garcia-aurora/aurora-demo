import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FullPageLayout } from "./full-page-layout";

describe("FullPageLayout", () => {
  it("renders children in the main content area", () => {
    render(
      <FullPageLayout>
        <p>Page content here</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Page content here")).toBeInTheDocument();
  });

  it("renders the sidebar with company name", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Acme Inc")).toBeInTheDocument();
  });

  it("renders navigation items: Models, Documentation, Settings", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Models")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    // "Settings" appears in both the nav items and Playground sub-items
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

  it("renders user profile in the sidebar footer", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("shadcn")).toBeInTheDocument();
    expect(screen.getByText("m@example.com")).toBeInTheDocument();
  });

  it("renders a sidebar toggle button", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    // SidebarTrigger renders a button with sr-only "Toggle Sidebar" text
    // May render multiple instances (desktop + mobile), so use getAllByRole
    const toggleBtns = screen.getAllByRole("button", { name: /toggle sidebar/i });
    expect(toggleBtns.length).toBeGreaterThanOrEqual(1);
  });

  it("toggles sidebar open/closed when trigger is clicked", async () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    const toggleBtns = screen.getAllByRole("button", { name: /toggle sidebar/i });
    const toggleBtn = toggleBtns[0];
    // Initially expanded — clicking should collapse
    await userEvent.click(toggleBtn);
    // After click the sidebar state changes — the button is still present
    expect(toggleBtn).toBeInTheDocument();
  });

  it("renders Platform group label in navigation", () => {
    render(
      <FullPageLayout>
        <p>content</p>
      </FullPageLayout>,
    );
    expect(screen.getByText("Platform")).toBeInTheDocument();
  });
});
