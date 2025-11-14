import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Session, SessionStatus } from "@/pages/SessionManagement";
import { Edit, Eye, MoreVertical, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ define props interface
interface SessionsTableProps {
  sessions: Session[];
  onViewDetails?: (session: Session) => void;
  onDelete?: (id: string) => void;
  onEdit?: (session: Session) => void;
}

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

export const SessionsTable = ({
  sessions,
  onViewDetails,
  onDelete,
  onEdit,
}: SessionsTableProps) => {
  const [selected, setSelected] = useState<Session | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof Session | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleView = (session: Session) => {
    setSelected(session);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this session?")) {
      onDelete?.(id);
    }
  };

  const handleSort = (field: keyof Session) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedSessions = [...sessions].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

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
    <>
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort("id")}
                >
                  Session ID
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort("userName")}
                >
                  User Name
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/70 transition-colors"
                  onClick={() => handleSort("counsellor")}
                >
                  Counsellor
                </TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedSessions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No sessions found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                sortedSessions.map((session) => (
                  <TableRow
                    key={session.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>{session.id}</TableCell>
                    <TableCell>{session.userName}</TableCell>
                    <TableCell>{session.counsellor}</TableCell>
                    <TableCell>{session.specialization}</TableCell>
                    <TableCell>{formatDateTime(session.dateTime)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={statusConfig[session.status].variant}
                        className="font-medium"
                      >
                        {statusConfig[session.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {session.rating ? (
                        <div className="space-y-1">
                          {renderStars(session.rating)}
                          {session.feedback && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {session.feedback}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No feedback
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">
                            {session.progress}%
                          </span>
                        </div>
                        <Progress value={session.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => navigate(`/admin/sessions/${session.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit?.(session)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(session.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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
      </div>

      {/* View Details Dialog */}
      {/* <SessionDetailsDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        session={selected || undefined}
      /> */}
    </>
  );
};
