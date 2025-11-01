import { useState } from "react";
import { Eye, Edit, Trash2, XCircle, MoreVertical, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Session, SessionStatus } from "@/pages/SessionManagement";

interface SessionsTableProps {
  sessions: Session[];
}

const statusConfig: Record<
  SessionStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  upcoming: { label: "Upcoming", variant: "default" },
  ongoing: { label: "Ongoing", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export const SessionsTable = ({ sessions }: SessionsTableProps) => {
  const [sortField, setSortField] = useState<keyof Session | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? "fill-warning text-warning" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
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
              <TableHead
                className="cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => handleSort("dateTime")}
              >
                Date & Time
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No sessions found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              sortedSessions.map((session) => (
                <TableRow key={session.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{session.id}</TableCell>
                  <TableCell>{session.userName}</TableCell>
                  <TableCell>{session.counsellor}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {session.specialization}
                  </TableCell>
                  <TableCell className="text-sm">{formatDateTime(session.dateTime)}</TableCell>
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
                      <span className="text-sm text-muted-foreground">No feedback</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{session.progress}%</span>
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
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {session.status !== "cancelled" && session.status !== "completed" && (
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
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
  );
};
