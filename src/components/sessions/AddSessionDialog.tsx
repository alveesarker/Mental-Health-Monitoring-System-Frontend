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

interface Patient {
  patientID: number;
  name: string;
}

interface Counsellor {
  counsellorID: number;
  name: string;
}

interface AddSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export const AddSessionDialog = ({
  open,
  onClose,
  onAdded,
}: AddSessionDialogProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [sessionType, setSessionType] = useState<"online" | "offline">(
    "online"
  );

  useEffect(() => {
    if (!open) return;

    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/patients/pname");
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to load patients");
        }

        setPatients(data.patients);
      } catch (err) {
        console.error("Patient load error:", err);
        alert("Failed to load patients");
      }
    };

    const fetchCounsellors = async () => {
      try {
        const res = await fetch("http://localhost:5000/counsellor/cname");
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to load counsellors");
        }

        setCounsellors(data.counsellors);
      } catch (err) {
        console.error("Counsellor load error:", err);
        alert("Failed to load counsellors");
      }
    };

    fetchPatients();
    fetchCounsellors();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const sessionData = {
      sessionDate: formData.get("sessionDate"),
      sessionTime: formData.get("sessionTime"),
      duration: formData.get("duration"),
      status: formData.get("status"),
      patientID: formData.get("patientID"),
      counsellorID: formData.get("counsellorID"),
    };

    const typeData =
      sessionType === "online"
        ? { link: formData.get("link") }
        : {
            counsellingCenter: formData.get("counsellingCenter"),
            roomNumber: formData.get("roomNumber"),
          };

    const res = await fetch("http://localhost:5000/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionData,
        typeData,
        type: sessionType,
      }),
    });

    if (!res.ok) {
      alert("Failed to create session");
      return;
    }

    onClose();
    onAdded();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient */}
          <div>
            <label className="text-sm font-medium">Patient</label>
            <select
              name="patientID"
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.patientID} value={p.patientID}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Counsellor */}
          <div>
            <label className="text-sm font-medium">Counsellor</label>
            <select
              name="counsellorID"
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Counsellor</option>
              {counsellors.map((c) => (
                <option key={c.counsellorID} value={c.counsellorID}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Session Date</label>
            <input
              type="date"
              name="sessionDate"
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Session Time</label>
            <input
              type="time"
              name="sessionTime"
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Duration</label>
            <input
              name="duration"
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue="pending"
              className="w-full border p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="requested">Requested</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Session Type</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value as any)}
              className="w-full border p-2 rounded"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {sessionType === "online" ? (
            <div>
              <label className="text-sm font-medium">Meeting Link</label>
              <input
                type="url"
                name="link"
                required
                className="w-full border p-2 rounded"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium">
                  Counselling Center
                </label>
                <input
                  name="counsellingCenter"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Room Number</label>
                <input
                  name="roomNumber"
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
