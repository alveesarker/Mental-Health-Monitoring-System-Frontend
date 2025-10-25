import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock, Phone, User } from "lucide-react";

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
      return "destructive";
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Crisis Detection & Alerts
        </h1>
        <p className="text-muted-foreground">
          Monitor and respond to critical mental health situations
        </p>
      </div>

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
            <div className="text-3xl font-bold text-warning">7</div>
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
            <div className="text-3xl font-bold text-success">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully handled
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-destructive">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="rounded-full bg-destructive/10 p-3">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{alert.issue}</h3>
                        <Badge variant={getRiskColor(alert.riskLevel)}>
                          {alert.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {alert.userName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <User className="h-3 w-3" />
                          View Profile
                        </Button>
                        <Button size="sm" className="gap-2 bg-primary">
                          <Phone className="h-3 w-3" />
                          Contact Counsellor
                        </Button>
                        <Button size="sm" variant="outline">
                          Send Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {alert.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
