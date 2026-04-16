import { render, screen } from "@testing-library/react";
import { BriefcaseIcon, FileIcon } from "lucide-react";
import { describe, expect, it } from "vitest";

import { SidebarProvider } from "@aurora-demo/ui/components/sidebar";

import {
	AppSidebar,
	DEFAULT_NAV_ITEMS,
	DEFAULT_TEAMS,
	DEFAULT_USER,
} from "./sidebar-menu";

// Wrap AppSidebar in SidebarProvider since it requires context
function renderSidebar(props?: Partial<React.ComponentProps<typeof AppSidebar>>) {
	return render(
		<SidebarProvider>
			<AppSidebar
				teams={DEFAULT_TEAMS}
				navItems={DEFAULT_NAV_ITEMS}
				user={DEFAULT_USER}
				{...props}
			/>
		</SidebarProvider>,
	);
}

describe("AppSidebar", () => {
	// ── Default rendering ─────────────────────────────────────────────────────

	it("renders the sidebar with default team name", () => {
		renderSidebar();
		expect(screen.getByText("Acme Inc")).toBeInTheDocument();
	});

	it("renders default navigation items", () => {
		renderSidebar();
		expect(screen.getByText("Models")).toBeInTheDocument();
		expect(screen.getByText("Documentation")).toBeInTheDocument();
		expect(screen.getByText("Playground")).toBeInTheDocument();
	});

	it("renders Platform group label", () => {
		renderSidebar();
		expect(screen.getByText("Platform")).toBeInTheDocument();
	});

	it("renders default user in sidebar footer", () => {
		renderSidebar();
		expect(screen.getByText("shadcn")).toBeInTheDocument();
		expect(screen.getByText("m@example.com")).toBeInTheDocument();
	});

	// ── Custom props ──────────────────────────────────────────────────────────

	it("renders custom teams passed via props", () => {
		renderSidebar({
			teams: [{ name: "Wayne Enterprises", plan: "Enterprise", logo: BriefcaseIcon }],
		});
		expect(screen.getByText("Wayne Enterprises")).toBeInTheDocument();
		expect(screen.getByText("Enterprise")).toBeInTheDocument();
	});

	it("renders custom nav items passed via props", () => {
		renderSidebar({
			navItems: [
				{ title: "Analytics", icon: FileIcon, isCollapsible: false, url: "#analytics" },
			],
		});
		expect(screen.getByText("Analytics")).toBeInTheDocument();
	});

	it("renders custom user passed via props", () => {
		renderSidebar({
			user: { name: "Alice", email: "alice@example.com", avatar: "/alice.jpg" },
		});
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("alice@example.com")).toBeInTheDocument();
	});

	// ── Collapsible navigation ────────────────────────────────────────────────

	it("renders sub-items of collapsible nav groups", () => {
		renderSidebar();
		// Playground is collapsible with History, Starred, Settings sub-items
		expect(screen.getByText("History")).toBeInTheDocument();
		expect(screen.getByText("Starred")).toBeInTheDocument();
	});

	it("renders collapsible nav group with sub-items", () => {
		const collapsibleNav = [
			{
				title: "Reports",
				icon: FileIcon,
				isCollapsible: true,
				items: [
					{ title: "Monthly", url: "#monthly" },
					{ title: "Annual", url: "#annual" },
				],
			},
		];
		renderSidebar({ navItems: collapsibleNav });
		expect(screen.getByText("Reports")).toBeInTheDocument();
		expect(screen.getByText("Monthly")).toBeInTheDocument();
		expect(screen.getByText("Annual")).toBeInTheDocument();
	});

	// ── TeamSwitcher interaction ───────────────────────────────────────────────

	it("shows team switcher dropdown trigger", () => {
		renderSidebar();
		// The active team name is rendered as a button-like element
		expect(screen.getByText("Acme Inc")).toBeInTheDocument();
		expect(screen.getByText("Enterprise")).toBeInTheDocument();
	});

	it("shows the first team as the active team by default", () => {
		renderSidebar({
			teams: [
				{ name: "Alpha Corp", plan: "Pro", logo: BriefcaseIcon },
				{ name: "Beta Inc", plan: "Free", logo: FileIcon },
			],
		});

		// The first team should be displayed in the header as the active team
		expect(screen.getByText("Alpha Corp")).toBeInTheDocument();
		expect(screen.getByText("Pro")).toBeInTheDocument();
	});

	// ── Default exports ───────────────────────────────────────────────────────

	it("DEFAULT_TEAMS contains Acme Inc", () => {
		expect(DEFAULT_TEAMS[0].name).toBe("Acme Inc");
	});

	it("DEFAULT_NAV_ITEMS contains Playground, Models, Documentation, Settings", () => {
		const titles = DEFAULT_NAV_ITEMS.map((item) => item.title);
		expect(titles).toContain("Playground");
		expect(titles).toContain("Models");
		expect(titles).toContain("Documentation");
		expect(titles).toContain("Settings");
	});

	it("DEFAULT_USER is shadcn", () => {
		expect(DEFAULT_USER.name).toBe("shadcn");
		expect(DEFAULT_USER.email).toBe("m@example.com");
	});
});
