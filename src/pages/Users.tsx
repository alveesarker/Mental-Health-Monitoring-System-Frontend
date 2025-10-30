import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

// --- 30 Demo Users ---
const initialUsers = [
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
  {
    id: "USR005",
    name: "Olivia Brown",
    email: "olivia.b@email.com",
    gender: "Female",
    joinDate: "2024-04-02",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR006",
    name: "Daniel Martinez",
    email: "daniel.m@email.com",
    gender: "Male",
    joinDate: "2024-04-10",
    moodTrend: "improving",
    riskLevel: "medium",
    status: "active",
  },
  {
    id: "USR007",
    name: "Sophia Anderson",
    email: "sophia.a@email.com",
    gender: "Female",
    joinDate: "2024-05-01",
    moodTrend: "stable",
    riskLevel: "low",
    status: "inactive",
  },
  {
    id: "USR008",
    name: "Ethan Thompson",
    email: "ethan.t@email.com",
    gender: "Male",
    joinDate: "2024-05-15",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR009",
    name: "Ava White",
    email: "ava.w@email.com",
    gender: "Female",
    joinDate: "2024-06-01",
    moodTrend: "improving",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "USR010",
    name: "Liam Harris",
    email: "liam.h@email.com",
    gender: "Male",
    joinDate: "2024-06-20",
    moodTrend: "stable",
    riskLevel: "medium",
    status: "active",
  },
  {
    id: "USR011",
    name: "Mia Clark",
    email: "mia.c@email.com",
    gender: "Female",
    joinDate: "2024-07-05",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR012",
    name: "Noah Lewis",
    email: "noah.l@email.com",
    gender: "Male",
    joinDate: "2024-07-18",
    moodTrend: "improving",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "USR013",
    name: "Isabella Walker",
    email: "isabella.w@email.com",
    gender: "Female",
    joinDate: "2024-08-02",
    moodTrend: "stable",
    riskLevel: "medium",
    status: "inactive",
  },
  {
    id: "USR014",
    name: "Lucas Hall",
    email: "lucas.h@email.com",
    gender: "Male",
    joinDate: "2024-08-15",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR015",
    name: "Charlotte Allen",
    email: "charlotte.a@email.com",
    gender: "Female",
    joinDate: "2024-09-01",
    moodTrend: "improving",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "USR016",
    name: "Benjamin Young",
    email: "benjamin.y@email.com",
    gender: "Male",
    joinDate: "2024-09-12",
    moodTrend: "stable",
    riskLevel: "medium",
    status: "active",
  },
  {
    id: "USR017",
    name: "Amelia King",
    email: "amelia.k@email.com",
    gender: "Female",
    joinDate: "2024-09-25",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR018",
    name: "Elijah Wright",
    email: "elijah.w@email.com",
    gender: "Male",
    joinDate: "2024-10-02",
    moodTrend: "improving",
    riskLevel: "medium",
    status: "active",
  },
  {
    id: "USR019",
    name: "Harper Scott",
    email: "harper.s@email.com",
    gender: "Female",
    joinDate: "2024-10-15",
    moodTrend: "stable",
    riskLevel: "low",
    status: "inactive",
  },
  {
    id: "USR020",
    name: "Logan Green",
    email: "logan.g@email.com",
    gender: "Male",
    joinDate: "2024-10-30",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR021",
    name: "Evelyn Adams",
    email: "evelyn.a@email.com",
    gender: "Female",
    joinDate: "2024-11-05",
    moodTrend: "improving",
    riskLevel: "medium",
    status: "active",
  },
  {
    id: "USR022",
    name: "Henry Baker",
    email: "henry.b@email.com",
    gender: "Male",
    joinDate: "2024-11-20",
    moodTrend: "stable",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "USR023",
    name: "Ella Gonzalez",
    email: "ella.g@email.com",
    gender: "Female",
    joinDate: "2024-12-01",
    moodTrend: "declining",
    riskLevel: "high",
    status: "inactive",
  },
  {
    id: "USR024",
    name: "Jack Nelson",
    email: "jack.n@email.com",
    gender: "Male",
    joinDate: "2024-12-10",
    moodTrend: "improving",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "USR025",
    name: "Grace Carter",
    email: "grace.c@email.com",
    gender: "Female",
    joinDate: "2025-01-05",
    moodTrend: "stable",
    riskLevel: "medium",
    status: "active",
  },
  {
    id: "USR026",
    name: "Sebastian Perez",
    email: "sebastian.p@email.com",
    gender: "Male",
    joinDate: "2025-01-18",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR027",
    name: "Victoria Roberts",
    email: "victoria.r@email.com",
    gender: "Female",
    joinDate: "2025-02-02",
    moodTrend: "improving",
    riskLevel: "low",
    status: "active",
  },
  {
    id: "USR028",
    name: "Matthew Turner",
    email: "matthew.t@email.com",
    gender: "Male",
    joinDate: "2025-02-15",
    moodTrend: "stable",
    riskLevel: "medium",
    status: "inactive",
  },
  {
    id: "USR029",
    name: "Luna Phillips",
    email: "luna.p@email.com",
    gender: "Female",
    joinDate: "2025-03-01",
    moodTrend: "declining",
    riskLevel: "high",
    status: "active",
  },
  {
    id: "USR030",
    name: "Alexander Campbell",
    email: "alex.c@email.com",
    gender: "Male",
    joinDate: "2025-03-20",
    moodTrend: "improving",
    riskLevel: "low",
    status: "active",
  },
];

// --- Helper Display Functions ---
const getRiskBadge = (level: string) => {
  switch (level) {
    case "low":
      return <Badge className="bg-green-500 text-white">Low Risk</Badge>;
    case "medium":
      return <Badge className="bg-yellow-500 text-white">Medium Risk</Badge>;
    case "high":
      return <Badge className="bg-red-500 text-white">High Risk</Badge>;
    default:
      return <Badge variant="secondary">{level}</Badge>;
  }
};

const getMoodIndicator = (trend: string) => {
  switch (trend) {
    case "improving":
      return <span className="text-green-500">↗ Improving</span>;
    case "declining":
      return <span className="text-red-500">↘ Declining</span>;
    case "stable":
      return <span className="text-gray-500">→ Stable</span>;
    default:
      return <span>{trend}</span>;
  }
};

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    gender: "",
    joinDate: "",
    moodTrend: "",
    riskLevel: "",
    status: "active",
  });

  // --- Filter Logic ---
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = riskFilter === "all" || user.riskLevel === riskFilter;

    return matchesSearch && matchesRisk;
  });

  const handleAddUser = () => {
    const id = `USR${(users.length + 1).toString().padStart(3, "0")}`;
    const userToAdd = { id, ...newUser };
    setUsers([...users, userToAdd]);
    setNewUser({
      name: "",
      email: "",
      gender: "",
      joinDate: "",
      moodTrend: "",
      riskLevel: "",
      status: "active",
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage user accounts and mental health status
          </p>
        </div>

        {/* Add User Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Input
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <Select
                value={newUser.gender}
                onValueChange={(v) => setNewUser({ ...newUser, gender: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newUser.joinDate}
                onChange={(e) =>
                  setNewUser({ ...newUser, joinDate: e.target.value })
                }
              />
              <Select
                value={newUser.moodTrend}
                onValueChange={(v) => setNewUser({ ...newUser, moodTrend: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Mood Trend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="improving">Improving</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                  <SelectItem value="declining">Declining</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newUser.riskLevel}
                onValueChange={(v) => setNewUser({ ...newUser, riskLevel: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Save User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* User List */}
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
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
                  {/* <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No users match your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
