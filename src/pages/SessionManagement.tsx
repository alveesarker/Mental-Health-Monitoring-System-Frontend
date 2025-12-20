/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionsFilterBar } from "@/components/sessions/SessionsFilterBar";
import { SessionsHeader } from "@/components/sessions/SessionsHeader";
import { SessionsTable, Session } from "@/components/sessions/SessionsTable";
import { AddSessionDialog } from "@/components/sessions/AddSessionDialog";
import { useEffect, useState } from "react";

const SessionManagement = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // =========================
  // FETCH SESSIONS
  // =========================
  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:5000/sessions");
      const data = await res.json();

      const mappedData: Session[] = data.map((s: any) => ({
        sessionID: s.sessionID,
        sessionDate: s.sessionDate,
        status: s.status,
        duration: s.duration,
        patientID: s.patientID,
        counsellorID: s.counsellorID,
        sessionType: s.sessionType,
        sessionTime: s.sessionTime,
        pname: s.pname,
        cname: s.cname,
        link: s.link || null,
        counsellingCenter: s.counsellingCenter || null,
        roomNumber: s.roomNumber || null,
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

  // =========================
  // FILTER HANDLER
  // =========================
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
          s.pname?.toLowerCase().includes(filters.search.toLowerCase()) ||
          s.cname?.toLowerCase().includes(filters.search.toLowerCase())
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

  // =========================
  // REFRESH
  // =========================
  const handleRefresh = () => {
    fetchSessions();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* HEADER */}
        <SessionsHeader
          onRefresh={handleRefresh}
          onAddSession={() => setIsAddDialogOpen(true)}
        />

        {/* FILTER BAR */}
        <SessionsFilterBar onFilter={handleFilter} sessions={sessions} />

        {/* TABLE */}
        <SessionsTable />
      </div>

      {/* ADD SESSION DIALOG */}
      <AddSessionDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdded={fetchSessions}
      />
    </div>
  );
};

export default SessionManagement;
