import {
  AudioWaveformIcon,
  BookOpenIcon,
  BotIcon,
  BrainCircuitIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  GalleryVerticalEndIcon,
  LogOutIcon,
  SettingsIcon,
  SparklesIcon,
} from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@aurora-demo/ui/components/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@aurora-demo/ui/components/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@aurora-demo/ui/components/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@aurora-demo/ui/components/sidebar";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TeamConfig {
  name: string;
  plan: string;
  logo: React.ElementType;
}

export interface NavSubItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  icon: React.ElementType;
  isCollapsible: boolean;
  url?: string;
  items?: NavSubItem[];
}

export interface UserConfig {
  name: string;
  email: string;
  avatar: string;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_TEAMS: TeamConfig[] = [
  { name: "Acme Inc", plan: "Enterprise", logo: GalleryVerticalEndIcon },
  { name: "Acme Corp.", plan: "Startup", logo: AudioWaveformIcon },
  { name: "Evil Corp.", plan: "Free", logo: CommandIcon },
];

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    title: "Playground",
    icon: BotIcon,
    isCollapsible: true,
    items: [
      { title: "History", url: "#" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Models",
    icon: BrainCircuitIcon,
    isCollapsible: false,
    url: "#",
  },
  {
    title: "Documentation",
    icon: BookOpenIcon,
    isCollapsible: false,
    url: "#",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    isCollapsible: false,
    url: "#",
  },
];

const DEFAULT_USER: UserConfig = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

// ── TeamSwitcher ─────────────────────────────────────────────────────────────

interface TeamSwitcherProps {
  teams: TeamConfig[];
}

function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const Logo = activeTeam.logo;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/*
           * Use render prop so the DropdownMenuTrigger delegates its button
           * element to SidebarMenuButton — avoids the invalid button > div
           * nesting that results from having DropdownMenuTrigger render its
           * own <button> and then wrapping a <div> inside it.
           */}
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground"
              />
            }
          >
            <span className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Logo className="size-4" />
            </span>
            <span className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{activeTeam.name}</span>
              <span className="truncate text-xs">{activeTeam.plan}</span>
            </span>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Teams</DropdownMenuLabel>
            {teams.map((team) => {
              const TeamLogo = team.logo;
              return (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <span className="flex size-6 items-center justify-center rounded-sm border">
                    <TeamLogo className="size-4 shrink-0" />
                  </span>
                  {team.name}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <span className="flex size-6 items-center justify-center rounded-md border bg-background">
                <span className="text-xs">+</span>
              </span>
              <span className="font-medium text-muted-foreground">Add team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// ── NavMain ──────────────────────────────────────────────────────────────────

interface NavMainProps {
  navItems: NavItem[];
}

function NavMain({ navItems }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) =>
          item.isCollapsible ? (
            <SidebarMenuItem key={item.title} className="group/collapsible">
              <Collapsible defaultOpen>
                <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.title} />}>
                  <item.icon />
                  <span>{item.title}</span>
                  <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton href={subItem.url}>
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} render={<a href={item.url} />}>
                <item.icon />
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

// ── NavUser ──────────────────────────────────────────────────────────────────

interface NavUserProps {
  user: UserConfig;
}

function NavUser({ user }: NavUserProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </span>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            {/* Profile header */}
            <DropdownMenuLabel className="p-0 font-normal">
              <span className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SparklesIcon className="mr-2 size-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// ── AppSidebar ────────────────────────────────────────────────────────────────

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  teams: TeamConfig[];
  navItems: NavItem[];
  user: UserConfig;
}

function AppSidebar({ teams, navItems, user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain navItems={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

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
