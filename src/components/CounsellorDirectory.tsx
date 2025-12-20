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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MessageSquare, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Counsellor {
  counsellorID: number;
  name: string;
  email: string;
  contactNumber: string;
  yearOfExperience: number;
  availability: string;
  specializations: string;
  schedule: string[];
}

export const CounsellorDirectory = () => {
  const [assignedCounsellor, setAssignedCounsellor] =
    useState<Counsellor | null>(null);
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [selectedCounsellor, setSelectedCounsellor] =
    useState<Counsellor | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [sessionMode, setSessionMode] = useState<string>("online");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const patientID = user.userID;

  // Fetch assigned counsellor and all counsellors
  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        // Assigned counsellor
        const resAssigned = await fetch(
          `http://localhost:5000/counsellor/assigned/${patientID}`
        );
        const assignedData = await resAssigned.json();
        if (assignedData.length > 0) setAssignedCounsellor(assignedData[0]);
console.log(assignedData[0])
        // All counsellors
        const resAll = await fetch(`http://localhost:5000/counsellor/main`);
        const allData = await resAll.json();
        setCounsellors(allData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load counsellors.");
      }
    };
    fetchCounsellors();
  }, [patientID]);

  const handleRequestSession = (c: Counsellor) => {
    setSelectedCounsellor(c);
    setSessionMode("online");
    setShowDialog(true);
  };

  const handleSubmit = async () => {
    if (!sessionMode || !selectedCounsellor) {
      toast.error("Please select a session mode.");
      return;
    }

    try {
      await fetch("http://localhost:5000/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientID,
          counsellorID: selectedCounsellor.counsellorID,
          sessionType: sessionMode,
          status: "requested",
        }),
      });

      toast.success(`Session requested with ${selectedCounsellor.name}.`);
      setShowDialog(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to request session.");
    }
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
              <h2>{assignedCounsellor.name}</h2>
              <p className="text-muted-foreground text-sm">
                {assignedCounsellor.name} (
                {assignedCounsellor.specializations.split(",").join(", ")})
              </p>
            </div>
            <Button
              size="sm"
              variant="default"
              onClick={() => handleRequestSession(assignedCounsellor)}
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
              key={c.counsellorID}
              className="rounded-lg border border-border/50 bg-background/50 shadow-sm hover:shadow-md transition-all p-4 flex items-start gap-4"
            >
              <Avatar className="h-14 w-14">
                <AvatarImage src="/placeholder.svg" alt={c.name} />
                <AvatarFallback>{c.name}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">
                  {c.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {c.specializations?.split(",") || [].join(", ")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Experience: {c.yearOfExperience} years
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
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Session Request Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Request a Session with {selectedCounsellor?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Select
                value={sessionMode}
                onValueChange={(value) => setSessionMode(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select session mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
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
