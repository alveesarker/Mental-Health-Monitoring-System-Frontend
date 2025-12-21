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
import { Eye, FileText, MoreVertical, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";




interface ApiSession {
  sessionID: number;
  counsellorName: string;
  sessionDate: string;
  sessionTime: string;
  status: string;
}

export const CSessionHistory = () => {
  const [sessions, setSessions] = useState<ApiSession[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}"); // 🔴 replace with auth/context later

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/sessions/c/${user.userID}`);
        const json = await res.json();

        if (json.success) {
          setSessions(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const formatDateTime = (date: string, time: string) => {
    const dt = new Date(`${date}T${time}`);
    return dt.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className="border shadow-md rounded-xl bg-card/80">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/10">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Session History
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session ID</TableHead>
                <TableHead>Counsellor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Loading sessions...
                  </TableCell>
                </TableRow>
              ) : sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No sessions found
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((s) => (
                  <TableRow key={s.sessionID}>
                    <TableCell>{s.sessionID}</TableCell>
                    <TableCell>{s.counsellorName}</TableCell>
                    <TableCell>
                      {formatDateTime(s.sessionDate, s.sessionTime)}
                    </TableCell>
                    <TableCell>
                      <Badge>{s.status === "Pending" ? "Upcoming" : s.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/counsellor/session/${s.sessionID}`}
                              className="flex w-full items-center"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>

                          {s.status === "Completed" && (
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/counsellor/session/give-progress/${s.sessionID}`}
                                className="flex w-full items-center"
                              >
                                <Pen className="h-4 w-4 mr-2" />
                                Patient Progress
                              </Link>
                            </DropdownMenuItem>
                          )}
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
