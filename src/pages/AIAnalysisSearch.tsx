/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../components/DataTable";

const API_URL = "http://localhost:5000/analysis";

// Column definitions
const columns = [
  { key: "analysisID", label: "Analysis ID" },
  { key: "riskScore", label: "Risk Score" },
  { key: "sentimentScore", label: "Sentiment Score" },
  { key: "issue", label: "Issue" },
  { key: "emotionalClassification", label: "Emotion" },
];

export default function AIAnalysisSearch() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  // Form state
  const [form, setForm] = useState<any>({
    analysisID: "",
    riskScore: "",
    sentimentScore: "",
    issue: "",
    emotionalClassification: "",
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Fetch all analysis
  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const logs = await res.json();
      setData(logs);
    } catch (err) {
      toast.error("Failed to load analysis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  // Add button
  const handleAdd = () => {
    setForm({
      riskScore: "",
      sentimentScore: "",
      issue: "",
      emotionalClassification: "",
    });
    setIsAddOpen(true);
  };

  // Submit add
  const handleAddSubmit = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("d2");
      if (!res.ok) throw new Error();

      console.log("D1");
      toast.success("AI analysis added");
      setIsAddOpen(false);
      fetchAnalysis();
    } catch (e) {
      console.error("Fetch error:", e);
      toast.error("Failed to add record");
    }
  };

  // Edit item
  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setForm({
      analysisID: item.analysisID,
      riskScore: item.riskScore,
      sentimentScore: item.sentimentScore,
      issue: item.issue,
      emotionalClassification: item.emotionalClassification,
    });
    setIsEditOpen(true);
  };

  // Submit edit
  const handleEditSubmit = async () => {
    try {
      const url = `${API_URL}/${selectedItem.analysisID}`;

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("AI analysis updated");
      setIsEditOpen(false);
      fetchAnalysis();
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDelete = (item: any) => {
    setDeleteItem(item);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;

    try {
      const res = await fetch(`${API_URL}/${deleteItem.analysisID}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Deleted successfully");
      fetchAnalysis();
    } catch (e) {
      console.error(e);
      toast.error("Delete failed");
    } finally {
      setIsDeleteOpen(false);
      setDeleteItem(null);
    }
  };

  return (
    <>
      <DataTable
        title="AI Analysis"
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search by issue or emotion..."
      />

      {/* ----------------- ADD DIALOG ----------------- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add AI Analysis</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <input
              type="number"
              min={0}
              max={100}
              className="border p-2 w-full rounded"
              placeholder="Risk Score (0–100)"
              value={form.riskScore}
              onChange={(e) => setForm({ ...form, riskScore: e.target.value })}
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Sentiment Score"
              value={form.sentimentScore}
              onChange={(e) =>
                setForm({ ...form, sentimentScore: e.target.value })
              }
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Issue"
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Emotional Classification"
              value={form.emotionalClassification}
              onChange={(e) =>
                setForm({
                  ...form,
                  emotionalClassification: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ----------------- EDIT DIALOG ----------------- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit AI Analysis</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm opacity-70">
              Editing: {selectedItem?.analysisID}
            </p>

            <input
              type="number"
              min={0}
              max={100}
              className="border p-2 w-full rounded"
              placeholder="Risk Score (0–100)"
              value={form.riskScore}
              onChange={(e) => setForm({ ...form, riskScore: e.target.value })}
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Sentiment Score"
              value={form.sentimentScore}
              onChange={(e) =>
                setForm({ ...form, sentimentScore: e.target.value })
              }
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Issue"
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Emotional Classification"
              value={form.emotionalClassification}
              onChange={(e) =>
                setForm({
                  ...form,
                  emotionalClassification: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ----------------- DELETE CONFIRM DIALOG ----------------- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>

          <p className="my-4">
            Are you sure you want to delete analysis ID:{" "}
            {deleteItem?.analysisID}?
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
