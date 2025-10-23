import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MessageSquare, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
interface Counsellor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  availability: string;
  image: string;
}

const counsellors = [
  {
    id: 1,
    name: "Dr. Olivia Carter",
    specialization: "Clinical Psychologist",
    experience: "8 years",
    availability: "Available",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Dr. Ethan Lee",
    specialization: "Cognitive Behavioral Therapist",
    experience: "5 years",
    availability: "Busy",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Dr. Sophia Patel",
    specialization: "Child & Adolescent Therapist",
    experience: "6 years",
    availability: "Available",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Dr. Noah Smith",
    specialization: "Marriage & Family Counselor",
    experience: "10 years",
    availability: "Available",
    image: "/placeholder.svg",
  },
];

export const CounsellorDirectory = () => {
  const [assignedCounsellor, setAssignedCounsellor] = useState<number | null>(
    null
  );
  const [selectedCounsellor, setSelectedCounsellor] =
    useState<Counsellor | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    mode: "",
    notes: "",
  });

  const handleAssign = (id: number, name: string) => {
    setAssignedCounsellor(id);
    toast.success(`Counsellor ${name} has been assigned successfully.`);
  };

  const handleRequestSession = (counsellor: Counsellor) => {
    setSelectedCounsellor(counsellor);
    setShowDialog(true);
  };

  const handleSubmit = () => {
    if (!formData.date || !formData.time || !formData.mode) {
      toast.error("Please fill all required fields.");
      return;
    }
    setShowDialog(false);
    toast.success("Request sent successfully");

    toast.success(
      `Session request sent to ${selectedCounsellor.name} for ${formData.date} at ${formData.time} (${formData.mode}).`
    );
    setFormData({ date: "", time: "", mode: "", notes: "" });
    setShowDialog(false);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {assignedCounsellor && (
        <Card className="border-[1px] shadow-md rounded-xl bg-gradient-to-r from-primary/5 to-secondary/10">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg text-foreground">
                Assigned Counsellor
              </h2>
              <p className="text-muted-foreground text-sm">
                {counsellors.find((c) => c.id === assignedCounsellor)?.name}
              </p>
            </div>
            <Button
              size="sm"
              variant="default"
              onClick={() => handleRequestSession(assignedCounsellor[0])}
              className="gap-1.5"
            >
              <MessageSquare className="h-4 w-4" />
              Request Session
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-[1px] shadow-md rounded-xl hover:shadow-lg transition-all bg-card/80 backdrop-blur-sm">
        <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/10 rounded-t-xl">
          <CardTitle className="text-foreground font-semibold flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Available Counsellors
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
          {counsellors.map((c) => (
            <div
              key={c.id}
              className="rounded-lg border border-border/50 bg-background/50 shadow-sm hover:shadow-md transition-all p-4 flex items-start gap-4"
            >
              <Avatar className="h-14 w-14">
                <AvatarImage src={c.image} alt={c.name} />
                <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">
                  {c.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {c.specialization}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Experience: {c.experience}
                </p>
                <div className="mt-2">
                  <Badge
                    variant="outline"
                    className={
                      c.availability === "Available"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }
                  >
                    {c.availability}
                  </Badge>
                </div>

                <div className="mt-4 flex gap-2">
                  {assignedCounsellor === c.id ? (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleRequestSession(c)}
                      className="gap-1.5"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Request Session
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={c.availability !== "Available"}
                      onClick={() => handleAssign(c.id, c.name)}
                      className="gap-1.5"
                    >
                      <UserCheck className="h-4 w-4" />
                      Assign
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* --- Session Request Dialog --- */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Request a Session with {selectedCounsellor?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Session Mode</Label>
              <Select
                value={formData.mode}
                onValueChange={(value) =>
                  setFormData({ ...formData, mode: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Additional Notes (optional)</Label>
              <Textarea
                placeholder="Write a short message for your counsellor..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CounsellorDirectory;
