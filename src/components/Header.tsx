import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  Compass,
  Info,
  LogOut,
  MessageSquare,
  Sparkles,
  User,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import alveeImg from "../assets/images/alvee.jpg";

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
    message: "Your session is approved",
    type: "success",
    time: "2m ago",
  },
  {
    id: 2,
    title: "Session Pending",
    message: "Waiting for counsellor confirmation",
    type: "info",
    time: "10m ago",
  },
  {
    id: 3,
    title: "Session Completed",
    message: "You have completed your session",
    type: "success",
    time: "1h ago",
  },
  {
    id: 4,
    title: "Session Cancelled",
    message: "Your session was cancelled by counsellor",
    type: "error",
    time: "3h ago",
  },
  {
    id: 5,
    title: "Reminder",
    message: "Your session starts in 30 minutes",
    type: "info",
    time: "5h ago",
  },
  {
    id: 6,
    title: "New Message",
    message: "Counsellor sent a new message",
    type: "info",
    time: "1d ago",
  },
  {
    id: 1,
    title: "New Session Granted",
    message: "Your session is approved",
    type: "success",
    time: "2m ago",
  },
  {
    id: 2,
    title: "Session Pending",
    message: "Waiting for counsellor confirmation",
    type: "info",
    time: "10m ago",
  },
  {
    id: 3,
    title: "Session Completed",
    message: "You have completed your session",
    type: "success",
    time: "1h ago",
  },
  {
    id: 4,
    title: "Session Cancelled",
    message: "Your session was cancelled by counsellor",
    type: "error",
    time: "3h ago",
  },
  {
    id: 5,
    title: "Reminder",
    message: "Your session starts in 30 minutes",
    type: "info",
    time: "5h ago",
  },
  {
    id: 6,
    title: "New Message",
    message: "Counsellor sent a new message",
    type: "info",
    time: "1d ago",
  },
];

// Map type to color and icon
const typeConfig: Record<
  NotificationType,
  { color: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  success: { color: "bg-green-100 text-green-600", Icon: CheckCircle },
  error: { color: "bg-red-100 text-red-600", Icon: XCircle },
  info: { color: "bg-blue-100 text-blue-600", Icon: Info },
};

export const Header = () => {
  const location = useLocation(); // ✅ detect current route

  // helper to check if route is active
  const isActive = (path: string) => location.pathname === path;

  // a shared style logic for links
  const baseLink =
    "flex items-center gap-2 text-sm font-medium transition-colors";
  const muted = "text-muted-foreground hover:text-foreground";
  const active = "text-primary"; // highlight color when active

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Link to={'/'}>
              <span className="text-xl font-bold cursor-pointer text-foreground">
                PSYTrack
              </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`${baseLink} ${isActive("/") ? active : muted}`}
              >
                <BookOpen className="h-4 w-4" />
                Dashboard
              </Link>

              <Link
                to="/moodanalysis"
                className={`${baseLink} ${
                  isActive("/moodanalysis") ? active : muted
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Mood Analysis
              </Link>

              <Link
                to="/recommendation"
                className={`${baseLink} ${
                  isActive("/recommendation") ? active : muted
                }`}
              >
                <Compass className="h-4 w-4" />
                Recommendation
              </Link>

              <Link
                to="/session"
                className={`${baseLink} ${
                  isActive("/session") || isActive("/session/book")
                    ? active
                    : muted
                }`}
              >
                <Calendar className="h-4 w-4" />
                Session
              </Link>

              <Link
                to="/feedback"
                className={`${baseLink} ${
                  isActive("/feedback") ? active : muted
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Counsellro Feedback
              </Link>

              <Link
                to="/emergency"
                className={`${baseLink} ${
                  isActive("/emergency") ? active : muted
                }`}
              >
                <AlertTriangle className="h-4 w-4" />
                Emergency Support
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-muted-foreground">
              Welcome back,{" "}
              <span className="font-medium text-foreground">Alvee</span>
            </div>

            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-[25px]">Notifications</SheetTitle>
                  {notifications.map((notif) => {
                    const { color, Icon } = typeConfig[notif.type];
                    return (
                      <div
                        key={notif.id}
                        className="relative w-full p-4 flex items-start gap-3 rounded-xl border border-border shadow-sm 
            hover:shadow-md transition-shadow duration-200 cursor-pointer bg-background"
                      >
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${color}`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {notif.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {notif.message}
                          </p>
                        </div>

                        {/* Timestamp */}
                        <span className="text-xs text-muted-foreground">
                          {notif.time}
                        </span>
                      </div>
                    );
                  })}
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9 border-2 border-primary/20">
                    <AvatarImage
                      src={alveeImg}
                      alt="Dr. Sarah Chen"
                      className="object-cover" // <-- preserves aspect ratio and fills container
                    />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      SC
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-card"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      MD Alvee Sarker
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      alveesarker196@gmail.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
