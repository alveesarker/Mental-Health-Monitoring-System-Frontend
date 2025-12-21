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
import { Search } from "lucide-react";

const API_URL = "http://localhost:5000/daily-logs";

const columns = [
  { key: "timestamp", label: "Date / Time" },
  { key: "patientID", label: "Patient ID" },
  { key: "mood", label: "Mood" },
  { key: "stressLevel", label: "Stress Level" },
  { key: "sleepDuration", label: "Sleep Hours" },
  { key: "notes", label: "Notes" },
];

export default function CounsellorPatientDailyLog() {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const counsellorID = user.userID;

  const fetchDailyLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/dcounsellor/${counsellorID}`);
      const result = await res.json();

      if (result.success) {
        setData(result.logs);
      } else {
        toast.error("Failed to load logs");
      }
    } catch {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    if (counsellorID) fetchDailyLogs();
  }, [counsellorID]);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold">
          Assigned Patients Daily Logs
        </CardTitle>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
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
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-muted-foreground"
                  >
                    No logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, idx) => (
                  <TableRow key={idx}>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.key === "timestamp"
                          ? formatDateTime(item[col.key])
                          : item[col.key]}
                      </TableCell>
                    ))}
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
