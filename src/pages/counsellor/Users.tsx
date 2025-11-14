import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, UserMinus } from "lucide-react";

const CounsellorUsers = () => {
  const users = [
    {
      id: "U001",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      gender: "Female",
      joinDate: "2024-01-15",
      mood: "Good",
      trend: "up",
      riskLevel: "Low",
    },
    {
      id: "U002",
      name: "Michael Chen",
      email: "m.chen@email.com",
      gender: "Male",
      joinDate: "2024-02-03",
      mood: "Difficult",
      trend: "down",
      riskLevel: "High",
    },
    {
      id: "U003",
      name: "Emma Davis",
      email: "emma.d@email.com",
      gender: "Female",
      joinDate: "2024-01-20",
      mood: "Great",
      trend: "up",
      riskLevel: "Low",
    },
    {
      id: "U004",
      name: "James Wilson",
      email: "j.wilson@email.com",
      gender: "Male",
      joinDate: "2024-02-10",
      mood: "Okay",
      trend: "down",
      riskLevel: "Medium",
    },
    {
      id: "U005",
      name: "Olivia Martinez",
      email: "o.martinez@email.com",
      gender: "Female",
      joinDate: "2024-01-28",
      mood: "Low",
      trend: "down",
      riskLevel: "Medium",
    },
  ];

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Assigned Users</h2>
        <p className="text-muted-foreground mt-1">Manage and monitor all users assigned to you</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Overview</CardTitle>
          <CardDescription>Complete list of your assigned patients with current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">User ID</TableHead>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Gender</TableHead>
                  <TableHead className="font-semibold">Join Date</TableHead>
                  <TableHead className="font-semibold">Mood</TableHead>
                  <TableHead className="font-semibold">Trend</TableHead>
                  <TableHead className="font-semibold">Risk Level</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                    <TableCell>
                      <Badge variant={getMoodBadgeVariant(user.mood)}>
                        {user.mood}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskBadgeColor(user.riskLevel)}>
                        {user.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <UserMinus className="h-4 w-4 mr-1" />
                        Release
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

export default CounsellorUsers;
