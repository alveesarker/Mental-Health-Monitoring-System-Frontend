import {
  Dialog,
  DialogContent,
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
  colorClass: string;
}

export const RecommendationDialog = ({
  open,
  onOpenChange,
  icon: Icon,
  title,
  description,
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
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-semibold mb-2 text-foreground">
              About This Activity
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
