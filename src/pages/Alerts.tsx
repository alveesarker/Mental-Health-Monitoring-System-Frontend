import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircleIcon,
  AlertTriangle,
  Clock,
  AlertOctagon,
  Eye,
  MoreVertical,
  Phone,
  Trash2,
} from "lucide-react";

const alerts = [
  {
    id: "ALT001",
    userId: "USR002",
    userName: "Michael Chen",
    timestamp: "2024-10-25 14:23",
    issue: "Suicidal ideation detected in text",
    riskLevel: "critical",
    status: "pending",
  },
  {
    id: "ALT002",
    userId: "USR015",
    userName: "Jessica Taylor",
    timestamp: "2024-10-25 13:45",
    issue: "Severe stress spike detected",
    riskLevel: "high",
    status: "contacted",
  },
  {
    id: "ALT003",
    userId: "USR032",
    userName: "David Kim",
    timestamp: "2024-10-25 11:20",
    issue: "Anxiety keywords repeated",
    riskLevel: "medium",
    status: "resolved",
  },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case "critical":
    case "high":
      return "destructive";
    case "medium":
      return "default";
    default:
      return "secondary";
  }
};

export default function Alerts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Crisis Detection & Alerts
        </h1>
        <p className="text-muted-foreground">
          Monitor and respond to critical mental health situations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Require immediate action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">7</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting counsellor response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully handled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Active Alerts
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell className="font-medium ">
                  <AlertTriangle className="h-4 w-4 text-destructive inline-block mr-1 mb-[5px]" />
                  {alert.issue}
                </TableCell>

                <TableCell>{alert.userName}</TableCell>

                <TableCell>
                  <Badge variant={getRiskColor(alert.riskLevel)}>
                    {alert.riskLevel}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  <Clock className="h-4 w-4 inline-block mr-1 mb-[5px]" />
                  {alert.timestamp}
                </TableCell>

                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {alert.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <AlertOctagon className="h-4 w-4 mr-2" />
                        Send Alert
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
