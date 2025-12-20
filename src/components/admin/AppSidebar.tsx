import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertTriangle,
  BarChart3,
  Brain,
  Calendar,
  HelpCircle,
  LayoutDashboard,
  Logs,
  MessageSquareText,
  Phone,
  ScanFace,
  Settings,
  Shield,
  UserCog,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/admin/", icon: LayoutDashboard },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Counsellors", url: "/admin/counsellors", icon: UserCog },
  { title: "Sessions", url: "/admin/sessions", icon: Calendar },
  { title: "Daily Logs", url: "/admin/daily-logs", icon: Logs},
  { title: "Recommendation", url: "/admin/recommendation", icon: ScanFace },
  // { title: "AI Analysis", url: "/ai-analysis", icon: Brain },
  { title: "AI-Analysis", url: "/admin/ai-analysis", icon: Brain },
  { title: "Crisis Alerts", url: "/admin/alerts", icon: AlertTriangle },
  { title: "Progress", url: "/admin/progress", icon: BarChart3 },
  { title: "Feedback", url: "/admin/feedback", icon: MessageSquareText },
  { title: "Questions", url: "/admin/questions", icon: HelpCircle },
  { title: "Emergency Contact", url: "/admin/emergency-contact", icon: Phone },
  { title: "Assign Counsellor", url: "/admin/assignment", icon: Phone },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
            <Brain className="h-6 w-6 " />
          </div>
          {open && (
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">
                MindCare AI
              </h2>
              <p className="text-xs text-sidebar-foreground/60">Admin Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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
