import { SessionsFilterBar } from "@/components/sessions/SessionsFilterBar";
import { SessionsHeader } from "@/components/sessions/SessionsHeader";
import { Session, SessionsTable } from "@/components/sessions/SessionsTable";
import { useEffect, useState } from "react";

const SessionManagement = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch sessions from API
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
        sessionType: s.sessionType,
        sessionTime: s.sessionTime,
        cname: s.cname,
        pname: s.pname, // adjust based on your API
        link: s.link,
        counsellingCenter: s.counsellingCenter,
        roomNumber: s.roomNumber,
      }));
      setSessions(mappedData);
      setFilteredSessions(mappedData);
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const showDetailDialog = (session: Session) => {
    setIsDetailDialogOpen(true);
    setSession(session);
  };

  const handleFilter = (filters: {
    search: string;
    counsellor: string;
    user: string;
    status: string;
    dateRange: { from?: Date; to?: Date };
  }) => {
    let filtered = [...sessions];

    if (filters.search) {
      filtered = filtered.filter(
        (s) =>
          s.cname?.toLowerCase().includes(filters.search.toLowerCase()) ||
          s.pname?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }
    if (filters.dateRange.from) {
      filtered = filtered.filter(
        (s) => new Date(s.sessionDate) >= filters.dateRange.from!
      );
    }
    if (filters.dateRange.to) {
      filtered = filtered.filter(
        (s) => new Date(s.sessionDate) <= filters.dateRange.to!
      );
    }

    setFilteredSessions(filtered);
  };

  const handleRefresh = () => {
    fetchSessions();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <SessionsHeader
          onRefresh={handleRefresh}
          onAddSession={() => setIsDialogOpen(true)}
        />
        <SessionsFilterBar onFilter={handleFilter} sessions={sessions} />
        <SessionsTable />
      </div>

      {/* <AddSessionDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddSession}
      /> */}

      {/* <SessionDetailsDialog
        open={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        session={session}
      /> */}
    </div>
  );
};

export default SessionManagement;
