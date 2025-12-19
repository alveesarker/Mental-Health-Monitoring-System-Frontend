import { FeedbackFormDialog } from "@/components/dialogs/FeedbackFormDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DataTable } from "@/components/ui/data-table";
import { SearchInput } from "@/components/ui/search-input";
import { toast } from "@/hooks/use-toast";
import { FeedbackRecord } from "@/lib/mock-data";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000";

export default function AdminFeedbackPage() {
  const [data, setData] = useState<FeedbackRecord[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FeedbackRecord | null>(
    null
  );
  const [deleteRecord, setDeleteRecord] = useState<FeedbackRecord | null>(null);
  const [sessionIDs, setSessionIDs] = useState<string[]>([]);

  const pageSize = 5;

  /* ================= FETCH ================= */

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`${API_URL}/ratings`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const records: FeedbackRecord[] = await res.json();
      setData(Array.isArray(records) ? records : []);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching data",
        description: "Could not load feedback records",
      });
    }
  };

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
    fetchFeedback();
    fetchSessionIDs();
  }, []);

  /* ================= SEARCH & PAGINATION ================= */

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.sessionID.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  /* ================= CRUD HANDLERS ================= */

  const handleAdd = () => {
    setEditingRecord(null);
    setIsFormOpen(true);
  };

  const handleEdit = (record: FeedbackRecord) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (record: FeedbackRecord) => {
    setDeleteRecord(record);
  };

  const confirmDelete = async () => {
    if (!deleteRecord) return;

    try {
      const res = await fetch(`${API_URL}/ratings/${deleteRecord.sessionID}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      toast({
        title: "Feedback deleted",
        description: `Feedback for ${deleteRecord.sessionID} has been deleted.`,
      });

      setDeleteRecord(null);
      fetchFeedback();
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete feedback" });
    }
  };

  const handleSave = async (record: FeedbackRecord) => {
    try {
      if (editingRecord) {
        const res = await fetch(
          `${API_URL}/ratings/${editingRecord.sessionID}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record),
          }
        );
        if (!res.ok) throw new Error("Update failed");

        setData(
          data.map((item) =>
            item.sessionID === record.sessionID ? record : item
          )
        );

        toast({
          title: "Feedback updated",
          description: `Feedback for ${record.sessionID} has been updated.`,
        });
      } else {
        const res = await fetch(`${API_URL}/ratings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        if (!res.ok) throw new Error("Create failed");

        setData([...data, record]);

        toast({
          title: "Feedback created",
          description: `Feedback for ${record.sessionID} has been created.`,
        });
      }

      setIsFormOpen(false);
      setEditingRecord(null);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to save feedback" });
    }
  };

  /* ================= UI HELPERS ================= */

  const getStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${
            s <= rating
              ? "fill-warning text-warning"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );

  const getLevelBadge = (value: number) => {
    let cls = "bg-success/10 text-success";
    if (value <= 3) cls = "bg-destructive/10 text-destructive";
    else if (value <= 6) cls = "bg-warning/10 text-warning";

    return (
      <Badge variant="outline" className={cls}>
        {value}/10
      </Badge>
    );
  };

  /* ================= COLUMNS ================= */

  const columns = [
    { key: "sessionID" as const, label: "Session ID" },
    {
      key: "rating" as const,
      label: "Rating",
      render: (item: FeedbackRecord) => getStars(item.rating),
    },
    {
      key: "comfortLevel" as const,
      label: "Comfort",
      render: (item: FeedbackRecord) => getLevelBadge(item.comfortLevel),
    },
    {
      key: "clarityLevel" as const,
      label: "Clarity",
      render: (item: FeedbackRecord) => getLevelBadge(item.clarityLevel),
    },
    {
      key: "comment" as const,
      label: "Comment",
      className: "max-w-[300px] truncate",
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (item: FeedbackRecord) => (
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

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Session Feedback</h1>
          <p className="text-muted-foreground mt-1">
            Manage patient feedback across sessions
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Feedback
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
        emptyMessage="No feedback found"
      />

      <FeedbackFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        record={editingRecord}
        onSave={handleSave}
        sessionIDs={sessionIDs}
      />

      <ConfirmDialog
        open={!!deleteRecord}
        onOpenChange={(open) => !open && setDeleteRecord(null)}
        title="Delete Feedback"
        description={`Are you sure you want to delete feedback for ${deleteRecord?.sessionID}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
}
