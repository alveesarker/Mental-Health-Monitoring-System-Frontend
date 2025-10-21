import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";

export const SessionCard = () => {
  return (
    <Card className="p-5 w-[410px] h-[410px] flex flex-col justify-between shadow-md border ml-1 border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-5">
          Professional Support
        </h3>

        {/* Counsellor Info */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 border border-border/40">
          <Avatar className="h-12 w-12 shadow-inner">
            <AvatarImage src="" alt="Dr. Anya Sharma" />
            <AvatarFallback className="bg-primary text-white">AS</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground mb-0.5">
              Assigned Counsellor
            </p>
            <p className="font-medium text-foreground leading-tight">
              Dr. Alvee Sarker
            </p>
            <p className="text-xs text-muted-foreground">
              Clinical Psychologist
            </p>
          </div>
        </div>

        {/* Upcoming Session */}
        <Card className="p-4 mt-5 bg-gradient-to-br from-secondary/10 to-transparent border-secondary/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-secondary" />
              <span className="font-medium text-foreground">
                Upcoming Session
              </span>
            </div>
            {/* <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
              Confirmed
            </span> */}
          </div>

          <div className="space-y-2 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Friday, Nov 15 — 2:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Video Call (45 min)</span>
            </div>
          </div>

          <Button className="w-full" variant="default" size="sm">
            Join Session
          </Button>
        </Card>
      </div>

      <Button variant="outline" className="w-full mt-4">
        Book Another Session
      </Button>
    </Card>
  );
};
