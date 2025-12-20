import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { DataTable } from "../components/DataTable";

const API_URL = "http://localhost:5000/crisisalerts";

const ALERT_TYPES = ["Suicidal", "Self-harm", "Aggression", "Depression"];
const STATUS_TYPES = ["Pending", "Resolved", "In Progress"];

const EMPTY_FORM = {
  alertType: "",
  alertMessage: "",
  timestamp: "",
  status: "",
  counsellorID: "",
  patientID: "",
  analysisID: "",
};

export default function Alerts() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Load alerts
  const fetchAlerts = async () => {
    try {
      const res = await fetch(API_URL);
      const items = await res.json();
      setData(items);

      const pending = items.filter((i) => i.status === "Pending").length;
      const resolved = items.filter((i) => i.status === "Resolved").length;

      setStats({ total: items.length, pending, resolved });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Add alert
  const handleAddSubmit = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setIsAddOpen(false);
      setForm(EMPTY_FORM);
      fetchAlerts();
    } catch (e) {
      console.error(e);
    }
  };

  // Edit alert
  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/${selectedItem.alertID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setIsEditOpen(false);
      setSelectedItem(null);
      fetchAlerts();
    } catch (e) {
      console.error(e);
    }
  };

  // Delete alert
  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/${deleteItem.alertID}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setIsDeleteOpen(false);
      setDeleteItem(null);
      fetchAlerts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All recorded alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.resolved}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Handled successfully
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        title="Crisis Alerts"
        columns={[
          { key: "alertID", label: "Alert ID" },
          { key: "alertType", label: "Type" },
          { key: "alertMessage", label: "Message" },
          { key: "timestamp", label: "Timestamp" },
          { key: "status", label: "Status" },
          { key: "counsellorID", label: "Counsellor ID" },
          { key: "patientID", label: "Patient ID" },
          { key: "analysisID", label: "Analysis ID" },
        ]}
        data={data}
        onAdd={() => {
          setForm(EMPTY_FORM);
          setIsAddOpen(true);
        }}
        onEdit={(item) => {
          setSelectedItem(item);
          setForm({ ...item });
          setIsEditOpen(true);
        }}
        onDelete={(item) => {
          setDeleteItem(item);
          setIsDeleteOpen(true);
        }}
        searchPlaceholder="Search alerts..."
      />

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Crisis Alert</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {/* Alert Type */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Alert Type</label>
              <select
                className="border p-2 w-full rounded"
                value={form.alertType}
                onChange={(e) =>
                  setForm({ ...form, alertType: e.target.value })
                }
              >
                <option value="">Select type</option>
                {ALERT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <select
                className="border p-2 w-full rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="">Select status</option>
                {STATUS_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Alert Message */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="border p-2 w-full rounded resize-none"
                rows={3}
                value={form.alertMessage}
                onChange={(e) =>
                  setForm({ ...form, alertMessage: e.target.value })
                }
              />
            </div>

            {/* Timestamp */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Timestamp</label>
              <input
                type="datetime-local"
                className="border p-2 w-full rounded"
                value={form.timestamp ? form.timestamp.slice(0, 16) : ""}
                onChange={(e) =>
                  setForm({ ...form, timestamp: e.target.value })
                }
              />
            </div>

            {/* Counsellor ID */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Counsellor ID</label>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={form.counsellorID}
                onChange={(e) =>
                  setForm({ ...form, counsellorID: e.target.value })
                }
              />
            </div>

            {/* Patient ID */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Patient ID</label>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={form.patientID}
                onChange={(e) =>
                  setForm({ ...form, patientID: e.target.value })
                }
              />
            </div>

            {/* Analysis ID */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Analysis ID</label>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={form.analysisID}
                onChange={(e) =>
                  setForm({ ...form, analysisID: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Crisis Alert</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {/* Reuse same form structure */}
            {Object.keys(form)
              .filter((key) => key !== "alertID")
              .map((key) => {
                if (key === "alertType") {
                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium">Alert Type</label>
                      <select
                        className="border p-2 w-full rounded"
                        value={form.alertType}
                        onChange={(e) =>
                          setForm({ ...form, alertType: e.target.value })
                        }
                      >
                        <option value="">Select type</option>
                        {ALERT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else if (key === "status") {
                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium">Status</label>
                      <select
                        className="border p-2 w-full rounded"
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                      >
                        <option value="">Select status</option>
                        {STATUS_TYPES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else if (key === "alertMessage") {
                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium">Message</label>
                      <textarea
                        className="border p-2 w-full rounded resize-none"
                        rows={3}
                        value={form.alertMessage}
                        onChange={(e) =>
                          setForm({ ...form, alertMessage: e.target.value })
                        }
                      />
                    </div>
                  );
                } else if (key === "timestamp") {
                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium">Timestamp</label>
                      <input
                        type="datetime-local"
                        className="border p-2 w-full rounded"
                        value={
                          form.timestamp ? form.timestamp.slice(0, 16) : ""
                        }
                        onChange={(e) =>
                          setForm({ ...form, timestamp: e.target.value })
                        }
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-medium capitalize">
                        {key}
                      </label>
                      <input
                        type="number"
                        className="border p-2 w-full rounded"
                        value={form[key]}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                      />
                    </div>
                  );
                }
              })}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <p className="my-4">
            Delete alert ID: <strong>{deleteItem?.alertID}</strong>?
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
