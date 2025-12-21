import { Home, Users, FileText, BrainCircuit, CalendarRange, Calendar, NotebookPen } from "lucide-react";
import { NavLink } from "@/components/counsellor/NavLink";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Assigned Users", url: "/counsellor", icon: Users },
  { title: "Session", url: "/counsellor/session", icon: Calendar},
  { title: "Daily Logs", url: "/counsellor/daily-logs", icon: FileText },
  { title: "AI Analysis", url: "/counsellor/ai-analysis", icon: BrainCircuit },
  { title: "Personalized Recommendation", url: "/counsellor/recommendations", icon: NotebookPen },
];

export function CounsellorAppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="px-6 py-5 border-b border-sidebar-border">
          <h2 className={`font-semibold text-sidebar-foreground transition-all ${
            isCollapsed ? "text-center text-lg" : "text-xl"
          }`}>
            {isCollapsed ? "MH" : "MindCare"}
          </h2>
          {!isCollapsed && (
            <p className="text-xs text-sidebar-foreground/70 mt-1">Counsellor Portal</p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent transition-colors"
                      activeClassName="font-bold"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
