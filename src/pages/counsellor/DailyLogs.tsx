import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

import { ArrowLeft, Brain, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDailyLogsDetails = () => {
  const navigate = useNavigate();

  // ✅ Single user's daily logs
  const logs = [
    {
      id: 1,
      date: "2024-11-14",
      feeling: "great",
      stressLevel: 3,
      sleepDuration: 8.5,
      notes:
        "Had a productive day at work. Morning meditation really helped set a positive tone...",
    },
    {
      id: 2,
      date: "2024-11-14",
      feeling: "good",
      stressLevel: 4,
      sleepDuration: 7.5,
      notes:
        "Feeling better than yesterday. Social activities with friends helped improve mood...",
    },
    {
      id: 3,
      date: "2024-11-13",
      feeling: "okay",
      stressLevel: 6,
      sleepDuration: 6.0,
      notes:
        "Average day. Some ups and downs but managing. Exercise routine is helping...",
    },
    {
      id: 4,
      date: "2024-11-12",
      feeling: "low",
      stressLevel: 7,
      sleepDuration: 5.5,
      notes:
        "Feeling isolated. Family issues causing stress. Would like to schedule a session...",
    },
    {
      id: 5,
      date: "2024-11-11",
      feeling: "difficult",
      stressLevel: 9,
      sleepDuration: 4.5,
      notes:
        "Work pressure is overwhelming. Struggling with anxiety. Need to discuss coping strategies...",
    },
  ];

  // 🎨 Feeling color logic
  const getFeelingBadgeColor = (feeling: string) => {
    switch (feeling.toLowerCase()) {
      case "great":
      case "good":
        return "bg-green-500 text-white";
      case "okay":
        return "bg-yellow-500 text-white";
      case "low":
      case "difficult":
        return "bg-red-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  // 🎨 Stress color logic
  const getStressColor = (level: number) => {
    if (level <= 3) return "text-green-600";
    if (level <= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/counsellor/daily-logs")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Daily Logs History
            </h1>
            <p className="text-sm text-muted-foreground">
              John Doe • User ID: USR001
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Daily Submissions</CardTitle>
            <CardDescription>
              Latest mood and wellness entries from this user
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Feeling</TableHead>
                    <TableHead className="font-semibold">Stress Level</TableHead>
                    <TableHead className="font-semibold">Sleep (hrs)</TableHead>
                    <TableHead className="font-semibold">Daily Notes</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {logs.map((log) => (
                    <TableRow
                      key={log.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* Date */}
                      <TableCell className="text-muted-foreground">
                        {log.date}
                      </TableCell>

                      {/* Feeling */}
                      <TableCell>
                        <Badge className={getFeelingBadgeColor(log.feeling)}>
                          {log.feeling}
                        </Badge>
                      </TableCell>

                      {/* Stress Level */}
                      <TableCell>
                        <span
                          className={`font-semibold ${getStressColor(
                            log.stressLevel
                          )}`}
                        >
                          {log.stressLevel}/10
                        </span>
                      </TableCell>

                      {/* Sleep */}
                      <TableCell className="text-muted-foreground">
                        {log.sleepDuration} hrs
                      </TableCell>

                      {/* Notes */}
                      <TableCell className="max-w-md">
                        <p className="text-sm text-muted-foreground truncate">
                          {log.notes}
                        </p>
                      </TableCell>

                      {/* View Action */}
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UserDailyLogsDetails;
