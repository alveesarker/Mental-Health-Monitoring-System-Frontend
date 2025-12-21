import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface Patient {
  patientID: number;
  Name: string;
  Email: string;
  Gender: string;
  DateOfBirth: string;
  City: string;
  mood?: string;
  trend?: "up" | "down";
  riskLevel?: string;
}

const CounsellorUsers = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const counsellorID = user.userID;

    if (!counsellorID) return;

    const fetchPatients = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/patients/assigned-patient/${counsellorID}`
        );
        const data = await res.json();

        if (data.success) {
          // Add optional fields for table (mood, trend, riskLevel) if needed
          const formattedPatients = data.data.map((p: Patient) => ({
            ...p,
            mood: "Good", // you can modify this with real data if available
            trend: "up",
            riskLevel: "Low",
          }));

          setPatients(formattedPatients);
        }
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const getMoodBadgeVariant = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "great":
        return "default";
      case "good":
        return "secondary";
      case "okay":
        return "outline";
      case "low":
        return "secondary";
      case "difficult":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "high":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  if (loading) return <p>Loading assigned patients...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Assigned Users</h2>
        <p className="text-muted-foreground mt-1">
          Manage and monitor all users assigned to you
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Overview</CardTitle>
          <CardDescription>
            Complete list of your assigned patients with current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Patient ID</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Gender</TableHead>
                  <TableHead className="font-semibold">Date of Birth</TableHead>
                  <TableHead className="font-semibold">City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((user) => (
                  <TableRow
                    key={user.patientID}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {user.patientID}
                    </TableCell>
                    <TableCell className="font-medium">{user.Name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.Email}
                    </TableCell>
                    <TableCell>{user.Gender}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.DateOfBirth}
                    </TableCell>
                    <TableCell>{user.City}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounsellorUsers;
