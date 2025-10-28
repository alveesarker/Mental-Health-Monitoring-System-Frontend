import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Star, User, UserCheck } from "lucide-react";
import { CounsellorFeedback } from "../../data/feedbackData";

interface FeedbackDialogProps {
  feedback: CounsellorFeedback | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeedbackDialog = ({
  feedback,
  open,
  onOpenChange,
}: FeedbackDialogProps) => {
  if (!feedback) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent progress":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "improving":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "stable":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "needs support":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            Session Feedback Details
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detailed feedback for counselling session
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Patient and Counsellor Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Patient:</span>
              <span className="font-medium">{feedback.patientName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <UserCheck className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Counsellor:</span>
              <span className="font-medium">{feedback.counsellorName}</span>
            </div>
          </div>

          {/* Session Date and Score */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Session Date:</span>
              <span className="font-medium">
                {new Date(feedback.sessionDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Score:</span>
              <span className="font-medium">{feedback.feedbackScore}/10</span>
            </div>
          </div>

          {/* Status Badge */}
          <div>
            <Badge className={getStatusColor(feedback.improvementStatus)}>
              {feedback.improvementStatus}
            </Badge>
          </div>

          {/* Brief Notes */}
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
              Brief Summary
            </h4>
            <p className="text-sm leading-relaxed">{feedback.briefNotes}</p>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
              Detailed Feedback
            </h4>
            <p className="text-sm leading-relaxed">
              {feedback.detailedDescription}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
