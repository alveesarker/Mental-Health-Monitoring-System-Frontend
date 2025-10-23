import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const BookSessionModal = () => {
  const handleBook = () => toast.success("Session booked successfully!");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Book Another Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Book a New Session</DialogTitle>
          <DialogDescription>
            Select your preferred date and time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Label>Date</Label>
          <Input type="date" />
          <Label>Time</Label>
          <Input type="time" />
          <Label>Mode</Label>
          <select className="border border-border rounded-md p-2 text-sm w-full">
            <option>Video Call</option>
            <option>In-Person</option>
          </select>
        </div>

        <Button onClick={handleBook} className="mt-4 w-full">
          Confirm Booking
        </Button>
      </DialogContent>
    </Dialog>
  );
};
