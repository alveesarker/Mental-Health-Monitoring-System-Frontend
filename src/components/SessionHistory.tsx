import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { FileText, MoreVertical, Star, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusConfig: Record<
  SessionStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  upcoming: { label: "Upcoming", variant: "default" },
  ongoing: { label: "Ongoing", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export type SessionStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface CounsellorSession {
  id: string;
  userName: string;
  counsellor: string;
  specialization: string;
  dateTime: string;
  status: SessionStatus;
  feedback?: string;
  rating?: number;
  progress: number;
}

const sessions: CounsellorSession[] = [
  {
    id: "SES-001",
    userName: "Sarah Johnson",
    counsellor: "Dr. Robert Wilson",
    specialization: "Anxiety & Depression",
    dateTime: "2025-11-03T14:00:00",
    status: "upcoming",
    progress: 75,
  },
  {
    id: "SES-002",
    userName: "Michael Chen",
    counsellor: "Dr. Emily Carter",
    specialization: "Stress Management",
    dateTime: "2025-11-01T10:30:00",
    status: "completed",
    feedback: "Very helpful session, great insights",
    rating: 5,
    progress: 100,
  },
  {
    id: "SES-003",
    userName: "Jessica Martinez",
    counsellor: "Dr. David Thompson",
    specialization: "Relationship Counseling",
    dateTime: "2025-11-01T15:00:00",
    status: "ongoing",
    progress: 45,
  },
  {
    id: "SES-004",
    userName: "Alex Kumar",
    counsellor: "Dr. Robert Wilson",
    specialization: "Career Guidance",
    dateTime: "2025-10-28T11:00:00",
    status: "cancelled",
    progress: 0,
  },
];

export const SessionHistory = () => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? "fill-warning text-warning"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="border-[1px] shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
      {" "}
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/10 rounded-t-xl">
        {" "}
        <CardTitle className="flex items-center gap-2 text-foreground font-semibold">
          {" "}
          <FileText className="h-5 w-5 text-primary" />
          Session History & Feedback{" "}
        </CardTitle>{" "}
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-lg border border-border/50 overflow-hidden bg-background/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Session ID</TableHead>
                <TableHead>Counsellor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No sessions found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow
                    key={session.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>{session.id}</TableCell>
                    <TableCell>{session.counsellor}</TableCell>
                    <TableCell>{formatDateTime(session.dateTime)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={statusConfig[session.status].variant}
                        className="font-medium"
                      >
                        {statusConfig[session.status].label}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// import { Star, FileText, Eye } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
// Table,
// TableBody,
// TableCell,
// TableHead,
// TableHeader,
// TableRow,
// } from "@/components/ui/table";

// const sessionHistory = [
// { id: "S-1234", patient: "Emily Johnson", date: "Oct 20, 2025", duration: "60 min", rating: 5, hasNotes: true },
// { id: "S-1233", patient: "Michael Brown", date: "Oct 19, 2025", duration: "45 min", rating: 4, hasNotes: true },
// { id: "S-1232", patient: "Sarah Davis", date: "Oct 18, 2025", duration: "60 min", rating: 5, hasNotes: false },
// { id: "S-1231", patient: "James Wilson", date: "Oct 17, 2025", duration: "50 min", rating: 4, hasNotes: true },
// ];

// export const SessionHistory = () => {
// return (
// ```

// );
// };
