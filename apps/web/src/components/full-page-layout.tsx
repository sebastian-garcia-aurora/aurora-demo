import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@aurora-demo/ui/components/sidebar";
import * as React from "react";

import {
	AppSidebar,
	DEFAULT_NAV_ITEMS,
	DEFAULT_TEAMS,
	DEFAULT_USER,
	type NavItem,
	type TeamConfig,
	type UserConfig,
} from "./sidebar-menu";

export type { NavItem, NavSubItem, TeamConfig, UserConfig } from "./sidebar-menu";

// ── FullPageLayout ───────────────────────────────────────────────────────────

export interface FullPageLayoutProps {
	children: React.ReactNode;
	/** Teams shown in the company switcher. Defaults to Acme Inc sample data. */
	teams?: TeamConfig[];
	/** Navigation items in the sidebar. Defaults to Platform sample navigation. */
	navItems?: NavItem[];
	/** Logged-in user shown in the sidebar footer. Defaults to shadcn sample user. */
	user?: UserConfig;
}

export function FullPageLayout({
	children,
	teams = DEFAULT_TEAMS,
	navItems = DEFAULT_NAV_ITEMS,
	user = DEFAULT_USER,
}: FullPageLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar teams={teams} navItems={navItems} user={user} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
