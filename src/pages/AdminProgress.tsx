import { ProgressFormDialog } from "@/components/dialogs/ProgressFormDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataTable } from "@/components/ui/data-table";
import { SearchInput } from "@/components/ui/search-input";
import { toast } from "@/hooks/use-toast";
import { ProgressRecord } from "@/lib/mock-data";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000";

export default function ProgressPage() {
  const [data, setData] = useState<ProgressRecord[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ProgressRecord | null>(
    null
  );
  const [deleteRecord, setDeleteRecord] = useState<ProgressRecord | null>(null);
  const [sessionIDs, setSessionIDs] = useState<string[]>([]);

  const pageSize = 5;

  // Fetch all progress records
  const fetchProgress = async () => {
    try {
      const res = await fetch(`${API_URL}/progress`);
      if (!res.ok) throw new Error("Failed to fetch progress data");
      const records: ProgressRecord[] = await res.json();
      setData(Array.isArray(records) ? records : []);
      console.log(records);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching data",
        description: "Could not load progress records",
      });
    }
  };

  // Fetch all session IDs for the dropdown
  const fetchSessionIDs = async () => {
    try {
      const res = await fetch(`${API_URL}/sessions/sessionids`);
      if (!res.ok) throw new Error("Failed to fetch session IDs");
      const sessions: string[] = await res.json();
      setSessionIDs(Array.isArray(sessions) ? sessions : []);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Could not load session IDs" });
    }
  };

  useEffect(() => {
    fetchProgress();
    fetchSessionIDs();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.sessionID.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  const handleAdd = () => {
    setEditingRecord(null);
    setIsFormOpen(true);
  };

  const handleEdit = (record: ProgressRecord) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (record: ProgressRecord) => {
    setDeleteRecord(record);
  };

  const confirmDelete = async () => {
    if (!deleteRecord) return;
    try {
      const res = await fetch(`${API_URL}/progress/${deleteRecord.sessionID}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete record");
      toast({
        title: "Record deleted",
        description: `Progress record for ${deleteRecord.sessionID} has been deleted.`,
      });
      setData(data.filter((item) => item.sessionID !== deleteRecord.sessionID));
      setDeleteRecord(null);
      fetchProgress();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete record" });
    }
  };

  const handleSave = async (record: ProgressRecord) => {
    try {
      if (editingRecord) {
        // Update existing record
        const res = await fetch(
          `${API_URL}/progress/${editingRecord.sessionID}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record),
          }
        );
        if (!res.ok) throw new Error("Failed to update record");
        setData(
          data.map((item) =>
            item.sessionID === record.sessionID ? record : item
          )
        );
        toast({
          title: "Record updated",
          description: `Progress record for ${record.sessionID} has been updated.`,
        });
      } else {
        // Create new record
        const res = await fetch(`${API_URL}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        if (!res.ok) throw new Error("Failed to create record");
        setData([...data, record]);
        toast({
          title: "Record created",
          description: `Progress record for ${record.sessionID} has been created.`,
        });
      }
      setIsFormOpen(false);
      setEditingRecord(null);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to save record" });
    }
  };

  // Badge helpers
  const getStabilityBadge = (stability: string) => {
    const variants: Record<string, string> = {
      Stable: "bg-success/10 text-success border-success/20",
      Moderate: "bg-warning/10 text-warning border-warning/20",
      Critical: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return (
      <Badge variant="outline" className={variants[stability]}>
        {stability}
      </Badge>
    );
  };

  const getLevelBadge = (level: number, max: number = 10) => {
    const percentage = level / max;
    let colorClass = "bg-success/10 text-success";
    if (percentage > 0.6) colorClass = "bg-destructive/10 text-destructive";
    else if (percentage > 0.3) colorClass = "bg-warning/10 text-warning";
    return (
      <Badge variant="outline" className={colorClass}>
        {level}
      </Badge>
    );
  };

  const columns = [
    { key: "sessionID" as const, label: "Session ID" },
    {
      key: "stability" as const,
      label: "Stability",
      render: (item: ProgressRecord) => getStabilityBadge(item.stability),
    },
    {
      key: "stressLevel" as const,
      label: "Stress",
      render: (item: ProgressRecord) => getLevelBadge(item.stressLevel),
    },
    {
      key: "depressionLevel" as const,
      label: "Depression",
      render: (item: ProgressRecord) => getLevelBadge(item.depressionLevel),
    },
    {
      key: "workPerformance" as const,
      label: "Work Perf.",
      render: (item: ProgressRecord) =>
        getLevelBadge(10 - item.workPerformance),
    },
    {
      key: "energyLevel" as const,
      label: "Energy",
      render: (item: ProgressRecord) => getLevelBadge(10 - item.energyLevel),
    },
    {
      key: "fatigueLevel" as const,
      label: "Fatigue",
      render: (item: ProgressRecord) => getLevelBadge(item.fatigueLevel),
    },
    {
      key: "note" as const,
      label: "Note",
      className: "max-w-[200px] truncate",
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (item: ProgressRecord) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(item)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(item)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Progress Tracking
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor patient mental health progress across sessions
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>

      <SearchInput
        placeholder="Search by Session ID..."
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        className="max-w-sm"
      />

      <DataTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onPageChange={setPage}
        emptyMessage="No progress records found"
      />

      <ProgressFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        record={editingRecord}
        onSave={handleSave}
        sessionIDs={sessionIDs}
      />

      <ConfirmDialog
        open={!!deleteRecord}
        onOpenChange={(open) => !open && setDeleteRecord(null)}
        title="Delete Progress Record"
        description={`Are you sure you want to delete the progress record for ${deleteRecord?.sessionID}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
}
