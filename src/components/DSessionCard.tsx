import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock, MapPin, MoreVertical, Video } from "lucide-react";
import { Link } from "react-router-dom";
import c1 from "../assets/images/c1.avif";

interface SessionCardProps {
  counsellorName: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: "Online" | "Offline";
  status: string;
  link: string;
  counsellingCenter: string;
  roomNumber: string;
}

export const SessionCard = ({
  counsellorName,
  sessionDate,
  sessionTime,
  sessionType,
  status,
  link,
  counsellingCenter,
  roomNumber,
}: SessionCardProps) => {


  
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function to12Hour(time24) {
    const [hour, minute] = time24.split(":");
    return new Date(0, 0, 0, hour, minute).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
  return (
    <Card className="overflow-hidden border border-border/40 bg-gradient-to-br from-white/90 to-background/60 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl backdrop-blur-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20 ring-2 ring-transparent group-hover:ring-primary/10 transition-all">
              <AvatarImage
                className="object-cover"
                src={c1}
                alt={counsellorName}
              />
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground text-base">
                {counsellorName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {sessionType === "Online" ? (
                  <Video className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <MapPin className="h-3.5 w-3.5 text-secondary" />
                )}
                <span className="text-xs text-muted-foreground capitalize">
                  {sessionType}
                </span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card">
              {sessionType == "Online" ? (
                <Link to={link}>
                  <DropdownMenuItem>Join</DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem>
                  Counselling Center:{counsellingCenter}, Room Number:
                  {roomNumber}{" "}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDateTime(sessionDate)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{to12Hour(sessionTime)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <Badge variant="outline" className={status}>
              Upcomming
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
