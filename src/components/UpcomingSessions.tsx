import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import c1 from "../assets/images/c1.avif";
import c2 from "../assets/images/c2.jpg";
import c3 from "../assets/images/c4.webp";
import c4 from "../assets/images/c5.avif";
import { SessionCard } from "./DSessionCard";
import { Button } from "./ui/button";

const upcomingSessions = [
  {
    patient: {
      name: "Alex Thompson",
      photo: c1,
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
      photo: c2,
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
      photo: c3,
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
      photo: c4,
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
            <div key={index} className=" rounded-md shadow-sm  hover:shadow-xl">
              <SessionCard {...session} />
            </div>
          ))}
        </div>
      </CardContent>
      <Link to={"/session/book"}>
        <Button
          size="sm"
          variant="default"
          className="w-[96.5%] h-10 relative gap-1.5 mb-5 left-[50%] translate-x-[-50%]"
        >
          <MessageSquare className="h-4 w-4" />
          Book Another Session
        </Button>
      </Link>
    </Card>
  );
};
