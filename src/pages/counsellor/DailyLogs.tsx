import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const DailyLogs = () => {
  const logs = [
    {
      id: 1,
      userName: "Sarah Johnson",
      date: "2024-11-14",
      feeling: "great",
      stressLevel: 3,
      sleepDuration: 8.5,
      notes: "Had a productive day at work. Morning meditation really helped set a positive tone...",
    },
    {
      id: 2,
      userName: "Michael Chen",
      date: "2024-11-14",
      feeling: "difficult",
      stressLevel: 9,
      sleepDuration: 4.5,
      notes: "Work pressure is overwhelming. Struggling with anxiety. Need to discuss coping strategies...",
    },
    {
      id: 3,
      userName: "Emma Davis",
      date: "2024-11-14",
      feeling: "good",
      stressLevel: 4,
      sleepDuration: 7.5,
      notes: "Feeling better than yesterday. Social activities with friends helped improve mood...",
    },
    {
      id: 4,
      userName: "James Wilson",
      date: "2024-11-13",
      feeling: "okay",
      stressLevel: 6,
      sleepDuration: 6.0,
      notes: "Average day. Some ups and downs but managing. Exercise routine is helping...",
    },
    {
      id: 5,
      userName: "Olivia Martinez",
      date: "2024-11-14",
      feeling: "low",
      stressLevel: 7,
      sleepDuration: 5.5,
      notes: "Feeling isolated. Family issues causing stress. Would like to schedule a session...",
    },
  ];

  const getFeelingBadgeColor = (feeling: string) => {
    switch (feeling.toLowerCase()) {
      case "great":
        return "bg-success text-success-foreground";
      case "good":
        return "bg-secondary text-secondary-foreground";
      case "okay":
        return "bg-primary/20 text-primary";
      case "low":
        return "bg-warning text-warning-foreground";
      case "difficult":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return "text-success";
    if (level <= 6) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Daily Logs</h2>
        <p className="text-muted-foreground mt-1">Review daily check-ins from your assigned users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Daily Submissions</CardTitle>
          <CardDescription>Latest mood and wellness entries from users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">User Name</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Feeling</TableHead>
                  <TableHead className="font-semibold">Stress Level</TableHead>
                  <TableHead className="font-semibold">Sleep (hrs)</TableHead>
                  <TableHead className="font-semibold">Daily Notes</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{log.userName}</TableCell>
                    <TableCell className="text-muted-foreground">{log.date}</TableCell>
                    <TableCell>
                      <Badge className={getFeelingBadgeColor(log.feeling)}>
                        {log.feeling}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getStressColor(log.stressLevel)}`}>
                        {log.stressLevel}/10
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.sleepDuration}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground truncate">
                        {log.notes}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
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
    </div>
  );
};

export default DailyLogs;
