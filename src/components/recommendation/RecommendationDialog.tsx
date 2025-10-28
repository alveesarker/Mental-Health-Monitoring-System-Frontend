import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";

interface RecommendationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  colorClass: string;
}

export const RecommendationDialog = ({
  open,
  onOpenChange,
  icon: Icon,
  title,
  description,
  fullDescription,
  colorClass,
}: RecommendationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <div
            className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${colorClass}`}
          >
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-base pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">
              About This Activity
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {fullDescription}
            </p>
          </div>

          <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Tip:</span> Regular practice of
              this activity can significantly improve your overall well-being
              and help manage stress levels effectively.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
