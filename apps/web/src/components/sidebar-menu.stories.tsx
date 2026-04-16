import type { Meta, StoryObj } from "@storybook/react";
import {
	BookOpenIcon,
	BriefcaseIcon,
	LayoutDashboardIcon,
	SettingsIcon,
	UsersIcon,
} from "lucide-react";

import { SidebarProvider } from "@aurora-demo/ui/components/sidebar";

import {
	AppSidebar,
	DEFAULT_NAV_ITEMS,
	DEFAULT_TEAMS,
	DEFAULT_USER,
} from "./sidebar-menu";

const meta: Meta<typeof AppSidebar> = {
	title: "Components/AppSidebar",
	component: AppSidebar,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SidebarProvider>
				<Story />
			</SidebarProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
	args: {
		teams: DEFAULT_TEAMS,
		navItems: DEFAULT_NAV_ITEMS,
		user: DEFAULT_USER,
	},
};

// ── Custom Teams ──────────────────────────────────────────────────────────────

export const CustomTeams: Story = {
	args: {
		teams: [
			{ name: "Wayne Enterprises", plan: "Enterprise", logo: BriefcaseIcon },
			{ name: "Stark Industries", plan: "Pro", logo: SettingsIcon },
		],
		navItems: DEFAULT_NAV_ITEMS,
		user: DEFAULT_USER,
	},
};

// ── Custom Navigation ─────────────────────────────────────────────────────────

export const CustomNavigation: Story = {
	args: {
		teams: DEFAULT_TEAMS,
		navItems: [
			{
				title: "Dashboard",
				icon: LayoutDashboardIcon,
				isCollapsible: false,
				url: "#",
			},
			{
				title: "Users",
				icon: UsersIcon,
				isCollapsible: true,
				items: [
					{ title: "All Users", url: "#users" },
					{ title: "Roles", url: "#roles" },
					{ title: "Permissions", url: "#permissions" },
				],
			},
			{
				title: "Documentation",
				icon: BookOpenIcon,
				isCollapsible: false,
				url: "#docs",
			},
		],
		user: DEFAULT_USER,
	},
};

// ── Custom User ───────────────────────────────────────────────────────────────

export const CustomUser: Story = {
	args: {
		teams: DEFAULT_TEAMS,
		navItems: DEFAULT_NAV_ITEMS,
		user: {
			name: "Alice Johnson",
			email: "alice@corp.io",
			avatar: "/avatars/alice.jpg",
		},
	},
};
