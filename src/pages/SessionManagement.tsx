// SessionManagement.tsx
import { AddSessionDialog } from "@/components/sessions/AddSessionDialog"; // 👈 new import
import { SessionsFilterBar } from "@/components/sessions/SessionsFilterBar";
import { SessionsHeader } from "@/components/sessions/SessionsHeader";
import { SessionsTable } from "@/components/sessions/SessionsTable";
import { useState } from "react";

// ... your Session and mockSessions as before

export type SessionStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface Session {
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

const mockSessions: Session[] = [
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

const SessionManagement = () => {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [filteredSessions, setFilteredSessions] =
    useState<Session[]>(mockSessions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSession = (newSession: {
    userName: string;
    counsellor: string;
    specialization: string;
    dateTime: string;
  }) => {
    const maxId = Math.max(
      0,
      ...sessions.map((s) => parseInt(s.id.split("-")[1]))
    );
    const newId = `SES-${(maxId + 1).toString().padStart(3, "0")}`;

    const session: Session = {
      id: newId,
      progress: 0,
      status: "upcoming",
      ...newSession,
    };

    const updated = [...sessions, session];
    setSessions(updated);
    setFilteredSessions(updated);
  };

  const handleFilter = (filters: {
    search: string;
    counsellor: string;
    user: string;
    status: string;
    dateRange: { from?: Date; to?: Date };
  }) => {
    // same filtering logic
  };

  const handleRefresh = () => {
    setFilteredSessions(sessions);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <SessionsHeader
          onRefresh={handleRefresh}
          onAddSession={() => setIsDialogOpen(true)} // 👈 open dialog
        />
        <SessionsFilterBar onFilter={handleFilter} sessions={sessions} />
        <SessionsTable sessions={filteredSessions} />
      </div>

      {/* Dialog */}
      <AddSessionDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddSession}
      />
    </div>
  );
};

export default SessionManagement;
