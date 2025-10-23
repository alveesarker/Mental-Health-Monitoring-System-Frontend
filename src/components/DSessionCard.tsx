import { Video, MapPin, Calendar, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SessionCardProps {
  patient: {
    name: string;
    photo: string;
    initials: string;
  };
  date: string;
  time: string;
  mode: "online" | "offline";
  status: "scheduled" | "ongoing" | "completed";
}

const statusConfig = {
  scheduled: { label: "Scheduled", className: "bg-primary/10 text-primary border-primary/20" },
  ongoing: { label: "Ongoing", className: "bg-secondary/10 text-secondary border-secondary/20" },
  completed: { label: "Completed", className: "bg-accent/10 text-accent border-accent/20" },
};

export const SessionCard = ({ patient, date, time, mode, status }: SessionCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <Card className="group overflow-hidden border-border/50 bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20 ring-2 ring-transparent group-hover:ring-primary/10 transition-all">
              <AvatarImage src={patient.photo} alt={patient.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                {patient.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground text-base">{patient.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {mode === "online" ? (
                  <Video className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <MapPin className="h-3.5 w-3.5 text-secondary" />
                )}
                <span className="text-xs text-muted-foreground capitalize">{mode}</span>
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
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Reschedule</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <Badge variant="outline" className={statusInfo.className}>
              {statusInfo.label}
            </Badge>

            {status === "scheduled" && (
              <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Start Session
              </Button>
            )}
            {status === "ongoing" && (
              <Button size="sm" variant="secondary">
                Join Now
              </Button>
            )}
            {status === "completed" && (
              <Button size="sm" variant="outline">
                View Notes
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};