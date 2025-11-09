import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CounsellorFeedback, mockFeedbackData } from "@/data/feedbackData";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeedbackDialog } from "../components/feedback/FeedbackDialog";

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] =
    useState<CounsellorFeedback | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewClick = (feedback: CounsellorFeedback) => {
    setSelectedFeedback(feedback);
    setDialogOpen(true);
  };

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

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 font-semibold";
    if (score >= 6) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Counsellor Feedback & Progress Tracking
          </h1>
          <p className="text-muted-foreground">
            Track counselling outcomes, feedback, and patient progress across
            multiple sessions
          </p>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg shadow-2xl border border-border overflow-hidden ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session Date</TableHead>
                {/* <TableHead>Patient Name</TableHead> */}
                <TableHead>Counsellor</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Brief Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeedbackData.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">
                    {new Date(feedback.sessionDate).toLocaleDateString()}
                  </TableCell>
                  {/* <TableCell>{feedback.patientName}</TableCell> */}
                  <TableCell>{feedback.counsellorName}</TableCell>
                  <TableCell>
                    <span className={getScoreColor(feedback.feedbackScore)}>
                      {feedback.feedbackScore}/10
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(feedback.improvementStatus)}
                    >
                      {feedback.improvementStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {feedback.briefNotes}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClick(feedback)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <FeedbackDialog
        feedback={selectedFeedback}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Feedback;
