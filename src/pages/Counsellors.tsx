import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Calendar, Search, Star, Users } from "lucide-react";
import { useState } from "react";

const initialCounsellors = [
  {
    id: "CNS001",
    name: "Dr. Robert Wilson",
    specialization: "Anxiety & Depression",
    availability: "online",
    rating: 4.8,
    assignedUsers: 23,
    sessions: 156,
  },
  {
    id: "CNS002",
    name: "Dr. Lisa Anderson",
    specialization: "Trauma & PTSD",
    availability: "offline",
    rating: 4.9,
    assignedUsers: 18,
    sessions: 142,
  },
  {
    id: "CNS003",
    name: "Dr. David Martinez",
    specialization: "Stress Management",
    availability: "online",
    rating: 4.7,
    assignedUsers: 31,
    sessions: 189,
  },
];

export default function Counsellors() {
  const [counsellors, setCounsellors] = useState(initialCounsellors);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [newCounsellor, setNewCounsellor] = useState({
    name: "",
    specialization: "",
    availability: "online",
    rating: 4.5,
    assignedUsers: 0,
    sessions: 0,
  });

  // --- Search Filter ---
  const filtered = counsellors.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- Add Counsellor ---
  const handleAdd = () => {
    if (!newCounsellor.name.trim()) return;
    const newItem = {
      ...newCounsellor,
      id: `CNS${(counsellors.length + 1).toString().padStart(3, "0")}`,
    };
    setCounsellors([...counsellors, newItem]);
    setNewCounsellor({
      name: "",
      specialization: "",
      availability: "online",
      rating: 4.5,
      assignedUsers: 0,
      sessions: 0,
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Counsellor Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage mental health professionals and their caseloads
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search counsellor..."
              className="pl-8 w-48 sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Counsellor</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Counsellor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={newCounsellor.name}
                    onChange={(e) =>
                      setNewCounsellor({
                        ...newCounsellor,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter counsellor name"
                  />
                </div>
                <div>
                  <Label>Specialization</Label>
                  <Input
                    value={newCounsellor.specialization}
                    onChange={(e) =>
                      setNewCounsellor({
                        ...newCounsellor,
                        specialization: e.target.value,
                      })
                    }
                    placeholder="e.g., Anxiety, Trauma, Stress"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((counsellor) => (
          <Card
            key={counsellor.id}
            className="transition hover:shadow-md hover:scale-[1.01]"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {counsellor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-semibold">
                      {counsellor.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {counsellor.specialization}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    counsellor.availability === "online"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    counsellor.availability === "online"
                      ? "bg-green-500 text-white"
                      : ""
                  }
                >
                  {counsellor.availability}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{counsellor.rating}</span>
                <span className="text-sm text-muted-foreground">rating</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-lg font-bold">
                      {counsellor.assignedUsers}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Assigned Users
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <Calendar className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-lg font-bold">{counsellor.sessions}</p>
                    <p className="text-xs text-muted-foreground">
                      Total Sessions
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  View Profile
                </Button>
                <Button className="flex-1">Assign Users</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No counsellors found.
        </p>
      )}
    </div>
  );
}
