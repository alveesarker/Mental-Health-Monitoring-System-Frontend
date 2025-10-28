import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, User } from "lucide-react";

interface CounsellorCardProps {
  name?: string;
  availability?: string;
  isAvailable?: boolean;
}

const CounsellorCard = ({
  name = "Dr. Sarah Mitchell",
  availability = "Available now",
  isAvailable = true,
}: CounsellorCardProps) => {
  return (
    <Card
      className="border-border/50 shadow-sm animate-fade-in"
      style={{ animationDelay: "0.4s" }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Counsellor</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-primary/10 text-primary text-lg">
            <User className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <p className="font-medium text-foreground">{name}</p>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {availability}
            </span>
          </div>
          {isAvailable && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Available
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CounsellorCard;
