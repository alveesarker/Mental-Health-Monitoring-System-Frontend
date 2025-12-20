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

interface Assignment {
  assignmentID: number;
  patientID: number;
  patientName: string;
  counsellorID: number;
  counsellorName: string;
  startDate: string;
  endDate: string | null;
}

export const AssignmentPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);

  const [patients, setPatients] = useState<
    { patientID: number; name: string }[]
  >([]);
  const [counsellors, setCounsellors] = useState<
    { counsellorID: number; name: string }[]
  >([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientID: "",
    counsellorID: "",
    startDate: "",
    endDate: "",
  });

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/assignment");
      const data = await res.json();
      if (data.success) setAssignments(data.assignments);
    } catch {
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:5000/patients/pname");
      const data = await res.json();
      if (!data.success) throw new Error();
      setPatients(data.patients);
    } catch {
      toast.error("Failed to load patients");
    }
  };

  const fetchCounsellors = async () => {
    try {
      const res = await fetch("http://localhost:5000/counsellor/cname");
      const data = await res.json();
      if (!data.success) throw new Error();
      setCounsellors(data.counsellors);
    } catch {
      toast.error("Failed to load counsellors");
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchPatients();
    fetchCounsellors();
  }, []);

  // Add
  const handleAdd = () => {
    setFormData({
      patientID: "",
      counsellorID: "",
      startDate: "",
      endDate: "",
    });
    setIsAddOpen(true);
  };

  const handleAddSubmit = async () => {
    try {
      await fetch("http://localhost:5000/assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientID: formData.patientID,
          counsellorID: formData.counsellorID,
          startDate: new Date().toISOString().split("T")[0], // current date
          endDate: null,
        }),
      });
      toast.success("Assignment added");
      setIsAddOpen(false);
      fetchAssignments();
    } catch {
      toast.error("Failed to add assignment");
    }
  };

  // Edit
  const handleEdit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      patientID: assignment.patientID.toString(),
      counsellorID: assignment.counsellorID.toString(),
      startDate: assignment.startDate,
      endDate: assignment.endDate || "",
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/assignment/${selectedAssignment?.assignmentID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Assignment updated");
      setIsEditOpen(false);
      fetchAssignments();
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDelete = async (assignment: Assignment) => {
    if (!confirm("Delete this assignment?")) return;

    try {
      await fetch(
        `http://localhost:5000/assignment/${assignment.assignmentID}`,
        { method: "DELETE" }
      );
      toast.success("Deleted successfully");
      fetchAssignments();
    } catch {
      toast.error("Delete failed");
    }
  };

  // DataTable columns
  const columns = [
    { key: "assignmentID", label: "ID" },
    { key: "patientName", label: "Patient" },
    { key: "counsellorName", label: "Counsellor" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
  ];

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <DataTable
        title="Assignments"
        columns={columns}
        data={assignments.map((a) => ({
          ...a,
          startDate: formatDateTime(a.startDate),
          endDate: a.endDate ? formatDateTime(a.endDate) : "-",
        }))}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search by patient or counsellor..."
      />

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Assignment</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <select
              className="border p-2 w-full rounded"
              value={formData.patientID}
              onChange={(e) =>
                setFormData({ ...formData, patientID: e.target.value })
              }
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.patientID} value={p.patientID}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full rounded"
              value={formData.counsellorID}
              onChange={(e) =>
                setFormData({ ...formData, counsellorID: e.target.value })
              }
            >
              <option value="">Select Counsellor</option>
              {counsellors.map((c) => (
                <option key={c.counsellorID} value={c.counsellorID}>
                  {c.name}
                </option>
              ))}
            </select>
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
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <select
              className="border p-2 w-full rounded"
              value={formData.patientID}
              onChange={(e) =>
                setFormData({ ...formData, patientID: e.target.value })
              }
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.patientID} value={p.patientID}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full rounded"
              value={formData.counsellorID}
              onChange={(e) =>
                setFormData({ ...formData, counsellorID: e.target.value })
              }
            >
              <option value="">Select Counsellor</option>
              {counsellors.map((c) => (
                <option key={c.counsellorID} value={c.counsellorID}>
                  {c.name}
                </option>
              ))}
            </select>
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
};
