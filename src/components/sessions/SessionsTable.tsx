import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Session {
  sessionID: string;
  sessionDate: string;
  status: "pending" | "requested" | "completed" | "cancelled";
  duration: string;
  patientID: string;
  counsellorID: string;
  sessionType: string;
  sessionTime: string;
  pname?: string; // patient name
  cname?: string;
  link?: string;
  counsellingCenter?: string;
  roomNumber?: string;
}

export const SessionsTable = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState("Online");

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this session?")) return;
    await fetch(`http://localhost:5000/sessions/${id}`, { method: "DELETE" });
    fetchSessions();
  };

  const handleEdit = (session: Session) => {
    setSelectedSession(session);
    setEditData(session.sessionType.toLowerCase()); // FIX
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSession) return;

    const formData = new FormData(e.currentTarget);
    const sessionDate = formData.get("sessionDate") as string;
    const sessionTime = formData.get("sessionTime") as string;
    const duration = formData.get("duration") as string;
    const status = formData.get("status") as Session["status"];
    const sessionType = formData.get("sessionType") as "online" | "offline";
    const typeData =
      sessionType === "online"
        ? { link: formData.get("link") }
        : {
            counsellingCenter: formData.get("counsellingCenter"),
            roomNumber: formData.get("roomNumber"),
          };

    // Close dialog first
    console.log("UPDATE START");

    // Then update backend
    await fetch(`http://localhost:5000/sessions/${selectedSession.sessionID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionData: { sessionDate, sessionTime, duration, status },
        typeData,
        type: sessionType,
      }),
    });

    // Refresh sessions
    setIsEditOpen(false);
    fetchSessions();
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:5000/sessions");
      const data = await res.json();
      // map API fields if needed
      const mappedData: Session[] = data.map((s) => ({
        sessionID: s.sessionID,
        sessionDate: s.sessionDate,
        status: s.status,
        duration: s.duration,
        patientID: s.patientID,
        counsellorID: s.counsellorID,
        sessionType: s.sessionType.toLowerCase(),
        sessionTime: s.sessionTime,
        cname: s.cname,
        pname: s.pname, // adjust based on your API
        link: s.link,
        counsellingCenter: s.counsellingCenter,
        roomNumber: s.roomNumber,
      }));
      console.log(mappedData);
      setSessions(mappedData);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function to12Hour(time24) {
    const [hour, minute] = time24.split(":");
    return new Date(0, 0, 0, hour, minute).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <>
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Counsellor</TableHead>
                <TableHead>Session Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Type</TableHead>
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
                    No sessions found
                  </TableCell>
                </TableRow>
              ) : (
                sessions.map((session) => (
                  <TableRow
                    key={session.sessionID}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>{session.sessionID}</TableCell>
                    <TableCell>{session.pname}</TableCell>
                    <TableCell>{session.cname}</TableCell>
                    <TableCell>{formatDateTime(session.sessionDate)}</TableCell>
                    <TableCell>{to12Hour(session.sessionTime)}</TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>{session.sessionType}</TableCell>
                    <TableCell>
                      <Badge>{session.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/admin/sessions/${session.sessionID}`)
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(session)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(session.sessionID)}
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

      {/* Edit Session Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Session</DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {/* Patient */}
              <div>
                <h1 className="text-sm font-medium">Patient</h1>
                <p>{selectedSession.pname}</p>
              </div>

              {/* Counsellor */}
              <div>
                <h1 className="text-sm font-medium">Counsellor</h1>
                <p>{selectedSession.cname}</p>
              </div>

              {/* Session Date */}
              <div>
                <label className="text-sm font-medium">Session Date</label>
                <input
                  type="date"
                  name="sessionDate"
                  defaultValue={selectedSession.sessionDate.split("T")[0]}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Session Time */}
              <div>
                <label className="text-sm font-medium">Session Time</label>
                <input
                  type="time"
                  name="sessionTime"
                  defaultValue={selectedSession.sessionTime}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium">
                  Duration (e.g., 1hr 30m)
                </label>
                <input
                  type="text"
                  name="duration"
                  defaultValue={selectedSession.duration}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  name="status"
                  defaultValue={selectedSession.status}
                  className="w-full border p-2 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="requested">Requested</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* FIXED SESSION TYPE */}
              <div>
                <label className="text-sm font-medium">Session Type</label>
                <select
                  name="sessionType"
                  value={editData}
                  onChange={(e) => setEditData(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              {/* CONDITIONAL FIELDS */}
              {editData === "online" ? (
                <div>
                  <label className="text-sm font-medium">Link</label>
                  <input
                    type="url"
                    name="link"
                    defaultValue={selectedSession.link || ""}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium">Center</label>
                    <input
                      type="text"
                      name="counsellingCenter"
                      defaultValue={selectedSession.counsellingCenter || ""}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Room Number</label>
                    <input
                      type="text"
                      name="roomNumber"
                      defaultValue={selectedSession.roomNumber || ""}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </>
              )}

              <DialogFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
