import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export const CounsellorProfileCard = () => {
  return (
    <Card className="p-6 w-[360px] h-[340px] bg-card/80 backdrop-blur-sm border border-border shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 shadow-inner mb-3">
          <AvatarImage src="" alt="Dr. Alvee Sarker" />
          <AvatarFallback className="bg-primary text-white text-lg font-semibold">
            AS
          </AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-semibold text-foreground">
          Dr. Alvee Sarker
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Clinical Psychologist
        </p>

        <div className="flex items-center justify-center gap-1 text-yellow-500">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
        </div>

        <p className="text-sm mt-3 text-muted-foreground leading-snug px-3">
          Specialized in stress management and emotional regulation. Helping
          clients improve mental resilience.
        </p>
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-primary to-accent text-white shadow-md hover:opacity-90 transition-all">
        Message Counsellor
      </button>
    </Card>
  );
};
