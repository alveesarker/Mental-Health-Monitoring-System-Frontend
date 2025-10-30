"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, CheckCircle, Info, User, XCircle } from "lucide-react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "@/components/ui/sheet"; // ✅ fixed import (your import path may vary)

type NotificationType = "success" | "error" | "info";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Session Granted",
    message: "Your session has been approved.",
    type: "success",
    time: "2m ago",
  },
  {
    id: 2,
    title: "Session Pending",
    message: "Waiting for counsellor confirmation.",
    type: "info",
    time: "10m ago",
  },
  {
    id: 3,
    title: "Session Completed",
    message: "You have completed your session.",
    type: "success",
    time: "1h ago",
  },
  {
    id: 4,
    title: "Session Cancelled",
    message: "Your session was cancelled by counsellor.",
    type: "error",
    time: "3h ago",
  },
  {
    id: 5,
    title: "Reminder",
    message: "Your session starts in 30 minutes.",
    type: "info",
    time: "5h ago",
  },
  {
    id: 6,
    title: "New Message",
    message: "Counsellor sent a new message.",
    type: "info",
    time: "1d ago",
  },
];

const typeConfig: Record<
  NotificationType,
  { color: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  success: { color: "bg-green-100 text-green-600", Icon: CheckCircle },
  error: { color: "bg-red-100 text-red-600", Icon: XCircle },
  info: { color: "bg-blue-100 text-blue-600", Icon: Info },
};

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold hidden sm:block">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Panel */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[400px] sm:w-[480px] p-5">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold">
                Notifications
              </SheetTitle>
            </SheetHeader>

            <div className="mt-4 space-y-3 overflow-y-auto max-h-[80vh] pr-2">
              {notifications.map((notif) => {
                const { color, Icon } = typeConfig[notif.type];
                return (
                  <div
                    key={notif.id}
                    className="flex items-start gap-3 p-4 rounded-xl border hover:shadow-md transition-shadow duration-200 bg-background"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold leading-tight">
                        {notif.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {notif.message}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notif.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>

        {/* Account Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
