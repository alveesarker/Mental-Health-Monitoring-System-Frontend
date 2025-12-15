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

const API_URL = "http://localhost:5000/daily-logs";

// Dropdown options
const moodOptions = ["Great", "Good", "Okay", "Low", "Difficult"];
const stressOptions = Array.from({ length: 10 }, (_, i) => i + 1);

// Column definitions
const columns = [
  { key: "patientID", label: "Patient ID" },
  { key: "timestamp", label: "Date / Time" },
  { key: "mood", label: "Mood" },
  { key: "stressLevel", label: "Stress Level" },
  { key: "sleepDuration", label: "Sleep Hours" },
  { key: "notes", label: "Notes" },
];

export default function DailyLogs() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [form, setForm] = useState<any>({
    patientID: "",
    timestamp: "",
    mood: "",
    notes: "",
    stressLevel: "",
    sleepDuration: "",
  });

  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Load logs
  const fetchDailyLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const logs = await res.json();
      setData(logs);
    } catch {
      toast.error("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyLogs();
  }, []);

  // Add
  const handleAdd = () => {
    setForm({
      patientID: "",
      timestamp: "",
      mood: "",
      notes: "",
      stressLevel: "",
      sleepDuration: "",
    });
    setIsAddOpen(true);
  };

  const handleAddSubmit = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stressLevel: Number(form.stressLevel),
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Daily log added");
      setIsAddOpen(false);
      fetchDailyLogs();
    } catch {
      toast.error("Failed to add log");
    }
  };

  // Edit
  const handleEdit = (item: any) => {
    setSelectedLog(item);
    setForm({
      patientID: item.patientID,
      timestamp: item.timestamp,
      mood: item.mood,
      notes: item.notes,
      stressLevel: item.stressLevel,
      sleepDuration: item.sleepDuration,
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const url = `${API_URL}/${selectedLog.patientID}/${selectedLog.timestamp}`;

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stressLevel: Number(form.stressLevel),
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Log updated");
      setIsEditOpen(false);
      fetchDailyLogs();
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDelete = async (item: any) => {
    if (!confirm("Delete this log?")) return;

    try {
      await fetch(`${API_URL}/${item.patientID}/${item.timestamp}`, {
        method: "DELETE",
      });

      toast.success("Deleted successfully");
      fetchDailyLogs();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <DataTable
        title="Daily Logs"
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search by date, mood, or notes..."
      />

      {/* -------- ADD DIALOG -------- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Daily Log</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <input
              className="border p-2 w-full rounded"
              placeholder="Patient ID"
              value={form.patientID}
              onChange={(e) =>
                setForm({ ...form, patientID: e.target.value })
              }
            />

            <input
              type="datetime-local"
              className="border p-2 w-full rounded"
              value={form.timestamp}
              onChange={(e) =>
                setForm({ ...form, timestamp: e.target.value })
              }
            />

            {/* Mood */}
            <select
              className="border p-2 w-full rounded"
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
            >
              <option value="">Select Mood</option>
              {moodOptions.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>

            {/* Stress */}
            <select
              className="border p-2 w-full rounded"
              value={form.stressLevel}
              onChange={(e) =>
                setForm({ ...form, stressLevel: e.target.value })
              }
            >
              <option value="">Select Stress Level</option>
              {stressOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <input
              className="border p-2 w-full rounded"
              placeholder="Sleep Duration (hours)"
              value={form.sleepDuration}
              onChange={(e) =>
                setForm({ ...form, sleepDuration: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full rounded"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
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

      {/* -------- EDIT DIALOG -------- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Daily Log</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm opacity-70">
              Editing entry for: {selectedLog?.timestamp}
            </p>

            <select
              className="border p-2 w-full rounded"
              value={form.mood}
              onChange={(e) => setForm({ ...form, mood: e.target.value })}
            >
              {moodOptions.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full rounded"
              value={form.stressLevel}
              onChange={(e) =>
                setForm({ ...form, stressLevel: e.target.value })
              }
            >
              {stressOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <input
              className="border p-2 w-full rounded"
              placeholder="Sleep Duration (hours)"
              value={form.sleepDuration}
              onChange={(e) =>
                setForm({ ...form, sleepDuration: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full rounded"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
    </>
  );
}
