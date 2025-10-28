import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass: string;
  onViewDetails: () => void;
}

export const RecommendationCard = ({
  icon: Icon,
  title,
  description,
  colorClass,
  onViewDetails,
}: RecommendationCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]",
        "shadow-[var(--shadow-card)]",
        colorClass
      )}
    >
      <div className="space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 shadow-sm transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        
        <Button
          onClick={onViewDetails}
          variant="secondary"
          size="sm"
          className="mt-2 w-full bg-white/90 hover:bg-white text-foreground shadow-sm"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};