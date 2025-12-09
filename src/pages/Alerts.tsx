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

// Empty form template
const EMPTY_FORM = {
  alertType: "",
  alertLevel: "",
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

      const pending = items.filter((i) => i.status === "Open").length;
      const resolved = items.filter((i) => i.status === "Closed").length;

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
            <p className="text-xs text-muted-foreground mt-1">All recorded alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground mt-1">Handled successfully</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        title="Crisis Alerts"
        columns={[
          { key: "alertID", label: "Alert ID" },
          { key: "alertType", label: "Type" },
          { key: "alertLevel", label: "Level" },
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
            {Object.keys(form)
              .filter((key) => key !== "alertID")
              .map((key) => (
                <div key={key} className="space-y-1">
                  <label className="text-sm font-medium capitalize">{key}</label>

                  {key === "timestamp" ? (
                    <input
                      type="datetime-local"
                      className="border p-2 w-full rounded"
                      value={form.timestamp ? form.timestamp.slice(0, 16) : ""}
                      onChange={(e) =>
                        setForm({ ...form, timestamp: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="border p-2 w-full rounded"
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
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
            <DialogTitle>Edit Alert</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {Object.keys(form)
              .filter((key) => key !== "alertID")
              .map((key) => (
                <div key={key} className="space-y-1">
                  <label className="text-sm font-medium capitalize">{key}</label>

                  {key === "timestamp" ? (
                    <input
                      type="datetime-local"
                      className="border p-2 w-full rounded"
                      value={form.timestamp ? form.timestamp.slice(0, 16) : ""}
                      onChange={(e) =>
                        setForm({ ...form, timestamp: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="border p-2 w-full rounded"
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
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
