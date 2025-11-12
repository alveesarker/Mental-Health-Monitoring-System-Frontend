import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Session } from "@/pages/SessionManagement";
import { Star } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  session?: Session;
}

export const SessionDetailsDialog = ({ open, onClose, session }: Props) => {
  if (!session) return null;

  const progressData = [
    { name: "Before", mood: 45, stress: 70 },
    { name: "After", mood: 80, stress: 40 },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Session Details — {session.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            <strong>User:</strong> {session.userName}
          </p>
          <p>
            <strong>Counsellor:</strong> {session.counsellor}
          </p>
          <p>
            <strong>Specialization:</strong> {session.specialization}
          </p>
          <p>
            <strong>Date:</strong> {new Date(session.dateTime).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {session.status}
          </p>

          <div>
            <strong>Progress:</strong>
            {/* <Progress value={session.progress || 0} className="h-2 mt-1" /> */}
          </div>

          {/* {session.rating && (
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < session.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted"
                  }`}
                />
              ))}
              <span>{session.rating}/5</span>
            </div>
          )} */}

          {/* {session.feedback && (
            <div className="bg-muted/40 p-3 rounded-md">
              <p className="italic text-sm">“{session.feedback}”</p>
            </div>
          )} */}

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="ml-2">Export Report</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
