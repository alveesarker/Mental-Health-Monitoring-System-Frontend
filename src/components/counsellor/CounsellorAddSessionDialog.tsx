import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newSession: {
    userName: string;
    counsellor: string;
    specialization: string;
    dateTime: string;
  }) => void;
}

export const CounsellorAddSessionDialog = ({
  open,
  onClose,
  onAdd,
}: AddSessionDialogProps) => {
  const [userName, setUserName] = useState("");
  const [counsellor, setCounsellor] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = () => {
    if (!userName || !counsellor || !specialization || !dateTime) return;
    onAdd({ userName, counsellor, specialization, dateTime });
    onClose();
    setUserName("");
    setCounsellor("");
    setSpecialization("");
    setDateTime("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Session</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>User Name</Label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <Label>Counsellor</Label>
            <Input
              value={counsellor}
              onChange={(e) => setCounsellor(e.target.value)}
            />
          </div>
          <div>
            <Label>Specialization</Label>
            <Input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div>
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
