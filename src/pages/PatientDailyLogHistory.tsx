/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:5000/daily-logs";

// Dropdown options (not used now but can keep if needed)
const moodOptions = ["Great", "Good", "Okay", "Low", "Difficult"];
const stressOptions = Array.from({ length: 10 }, (_, i) => i + 1);

// Columns
const columns = [
  { key: "timestamp", label: "Date / Time" },
  { key: "mood", label: "Mood" },
  { key: "stressLevel", label: "Stress Level" },
  { key: "sleepDuration", label: "Sleep Hours" },
  { key: "notes", label: "Notes" },
];

export default function PatientDailyLogHistory() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Load logs
  const fetchDailyLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${user.userID}`);
      const result = await res.json();
      if (result.success) {
        setData(result.logs);
      } else {
        toast.error("Failed to load logs");
      }
    } catch {
      toast.error("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userID) fetchDailyLogs();
  }, [user]);

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

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDateTime = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold">Daily Logs</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by date, mood, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground">
                    No logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.key === "timestamp" ? formatDateTime(item[column.key]) : item[column.key]}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
