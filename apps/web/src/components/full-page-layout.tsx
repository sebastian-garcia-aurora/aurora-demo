import {
  AudioWaveformIcon,
  BookOpenIcon,
  BotIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  GalleryVerticalEndIcon,
  SettingsIcon,
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

// ── Data ────────────────────────────────────────────────────────────────────

const TEAMS = [
  { name: "Acme Inc", plan: "Enterprise", logo: GalleryVerticalEndIcon },
  { name: "Acme Corp.", plan: "Startup", logo: AudioWaveformIcon },
  { name: "Evil Corp.", plan: "Free", logo: CommandIcon },
];

const NAV_ITEMS = [
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
    icon: BotIcon,
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

const USER = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

// ── TeamSwitcher ─────────────────────────────────────────────────────────────

function TeamSwitcher() {
  const [activeTeam, setActiveTeam] = React.useState(TEAMS[0]);
  const Logo = activeTeam.logo;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full rounded-md">
            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm w-full">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Teams</DropdownMenuLabel>
            {TEAMS.map((team) => {
              const TeamLogo = team.logo;
              return (
                <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <TeamLogo className="size-4 shrink-0" />
                  </div>
                  {team.name}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <span className="text-xs">+</span>
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// ── NavMain ──────────────────────────────────────────────────────────────────

function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {NAV_ITEMS.map((item) =>
          item.isCollapsible ? (
            <SidebarMenuItem key={item.title} className="group/collapsible">
              <Collapsible defaultOpen>
                <CollapsibleTrigger
                  render={<SidebarMenuButton tooltip={item.title} />}
                >
                  {item.icon && <item.icon />}
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
              <SidebarMenuButton
                tooltip={item.title}
                render={<a href={item.url} />}
              >
                {item.icon && <item.icon />}
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

function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full rounded-md">
            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm w-full">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={USER.avatar} alt={USER.name} />
                <AvatarFallback className="rounded-lg">
                  {USER.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{USER.name}</span>
                <span className="truncate text-xs">{USER.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

// ── AppSidebar ────────────────────────────────────────────────────────────────

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// ── FullPageLayout ───────────────────────────────────────────────────────────

interface FullPageLayoutProps {
  children: React.ReactNode;
}

export function FullPageLayout({ children }: FullPageLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
