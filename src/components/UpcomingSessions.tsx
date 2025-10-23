import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionCard } from "./DSessionCard";

const upcomingSessions = [
  {
    patient: {
      name: "Alex Thompson",
      photo: "/placeholder.svg",
      initials: "AT",
    },
    date: "Oct 23, 2025",
    time: "10:00 AM",
    mode: "online" as const,
    status: "scheduled" as const,
  },
  {
    patient: {
      name: "Rachel Green",
      photo: "/placeholder.svg",
      initials: "RG",
    },
    date: "Oct 23, 2025",
    time: "2:00 PM",
    mode: "offline" as const,
    status: "scheduled" as const,
  },
  {
    patient: {
      name: "David Martinez",
      photo: "/placeholder.svg",
      initials: "DM",
    },
    date: "Oct 23, 2025",
    time: "4:30 PM",
    mode: "online" as const,
    status: "scheduled" as const,
  },
  {
    patient: {
      name: "Lisa Anderson",
      photo: "/placeholder.svg",
      initials: "LA",
    },
    date: "Oct 24, 2025",
    time: "11:00 AM",
    mode: "offline" as const,
    status: "scheduled" as const,
  },
];

export const UpcomingSessions = () => {
  return (
    <Card className="border-[1px] bg-gradient-to-br from-background to-muted/40 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5  to-secondary/10 rounded-t-xl">
        <CardTitle className="flex items-center gap-2 text-foreground font-semibold tracking-tight">
          <CalendarIcon className="h-5 w-5 text-primary animate-pulse" />
          Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className=" rounded-md shadow-sm  hover:shadow-xl"
            >
              <SessionCard {...session} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
