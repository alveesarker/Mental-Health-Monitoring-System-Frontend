import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, Filter, Search, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: "USR001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    gender: "Female",
    joinDate: "2024-01-15",
    moodTrend: "stable",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "USR002",
    name: "Michael Chen",
    email: "m.chen@email.com",
    gender: "Male",
    joinDate: "2024-02-20",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR003",
    name: "Emma Davis",
    email: "emma.d@email.com",
    gender: "Female",
    joinDate: "2024-03-10",
    moodTrend: "improving",
    riskLevel: "medium",
    status: "active",
  },
  {
    id: "USR004",
    name: "James Wilson",
    email: "j.wilson@email.com",
    gender: "Male",
    joinDate: "2024-01-28",
    moodTrend: "stable",
    riskLevel: "low",
    status: "active",
  },
];

const getRiskBadge = (level: string) => {
  switch (level) {
    case "low":
      return <Badge className="bg-success">Low Risk</Badge>;
    case "medium":
      return <Badge className="bg-warning">Medium Risk</Badge>;
    case "high":
      return <Badge variant="destructive">High Risk</Badge>;
    default:
      return <Badge variant="secondary">{level}</Badge>;
  }
};

const getMoodIndicator = (trend: string) => {
  switch (trend) {
    case "improving":
      return <span className="text-success">↗ Improving</span>;
    case "declining":
      return <span className="text-destructive">↘ Declining</span>;
    case "stable":
      return <span className="text-muted-foreground">→ Stable</span>;
    default:
      return <span>{trend}</span>;
  }
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage user accounts and mental health status
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>User List</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Mood Trend</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{getMoodIndicator(user.moodTrend)}</TableCell>
                  <TableCell>{getRiskBadge(user.riskLevel)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
