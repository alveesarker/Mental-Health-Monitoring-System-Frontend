"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Pencil, PlusCircle, Search, Trash2 } from "lucide-react";
import { useState } from "react";

// --- Initial Counsellors Data ---
const initialCounsellors = [
  {
    id: "CNS001",
    name: "Dr. Robert Wilson",
    specialization: "Anxiety & Depression",
    availability: "online",
    rating: 4.8,
    sessions: 156,
    contact: "robert.wilson@mindcare.com",
    qualification: "PhD Clinical Psychology",
  },
  {
    id: "CNS002",
    name: "Dr. Lisa Anderson",
    specialization: "Trauma & PTSD",
    availability: "offline",
    rating: 4.9,
    sessions: 142,
    contact: "lisa.anderson@mindcare.com",
    qualification: "MSc Psychology, CBT Specialist",
  },
  {
    id: "CNS003",
    name: "Dr. David Martinez",
    specialization: "Stress Management",
    availability: "online",
    rating: 4.7,
    sessions: 189,
    contact: "david.martinez@mindcare.com",
    qualification: "PhD Behavioral Science",
  },
];

export default function Counsellors() {
  const [counsellors, setCounsellors] = useState(initialCounsellors);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [newCounsellor, setNewCounsellor] = useState({
    name: "",
    specialization: "",
    availability: "online",
    rating: 4.5,
    sessions: 0,
    contact: "",
    qualification: "",
  });

  // --- Filtered Data ---
  const filtered = counsellors.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? c.availability === filter : true)
  );

  // --- Add / Edit Counsellor ---
  const handleSave = () => {
    if (!newCounsellor.name.trim()) return;

    if (editing) {
      setCounsellors((prev) =>
        prev.map((c) =>
          c.id === editing.id ? { ...newCounsellor, id: c.id } : c
        )
      );
      setEditing(null);
    } else {
      const newItem = {
        ...newCounsellor,
        id: `CNS${(counsellors.length + 1).toString().padStart(3, "0")}`,
      };
      setCounsellors([...counsellors, newItem]);
    }

    setNewCounsellor({
      name: "",
      specialization: "",
      availability: "online",
      rating: 4.5,
      sessions: 0,
      contact: "",
      qualification: "",
    });
    setOpen(false);
  };

  // --- Delete Counsellor ---
  const handleDelete = (id) => {
    setCounsellors(counsellors.filter((c) => c.id !== id));
  };

  // --- Edit Counsellor ---
  const handleEdit = (counsellor) => {
    setEditing(counsellor);
    setNewCounsellor(counsellor);
    setOpen(true);
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
            Manage counsellor profiles, schedules, and feedback
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

          <select
            className="border rounded-md p-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Counsellor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit Counsellor" : "Add New Counsellor"}
                </DialogTitle>
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
                  />
                </div>
                <div>
                  <Label>Availability</Label>
                  <select
                    className="border rounded-md p-2 w-full"
                    value={newCounsellor.availability}
                    onChange={(e) =>
                      setNewCounsellor({
                        ...newCounsellor,
                        availability: e.target.value,
                      })
                    }
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div>
                  <Label>Contact</Label>
                  <Input
                    value={newCounsellor.contact}
                    onChange={(e) =>
                      setNewCounsellor({
                        ...newCounsellor,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Qualification</Label>
                  <Input
                    value={newCounsellor.qualification}
                    onChange={(e) =>
                      setNewCounsellor({
                        ...newCounsellor,
                        qualification: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editing ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table Section */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Counsellor ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>No. of Sessions</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.specialization}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      c.availability === "online"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300"
                    }
                  >
                    {c.availability}
                  </Badge>
                </TableCell>
                <TableCell>{c.sessions}</TableCell>
                <TableCell>{c.rating}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelected(c)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(c)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(c.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No counsellors found.
          </p>
        )}
      </Card>

      {/* Profile Tabs Dialog */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selected.name} — Profile</DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="p-4 space-y-2">
                  <p>
                    <b>ID:</b> {selected.id}
                  </p>
                  <p>
                    <b>Name:</b> {selected.name}
                  </p>
                  <p>
                    <b>Specialization:</b> {selected.specialization}
                  </p>
                  <p>
                    <b>Qualification:</b> {selected.qualification}
                  </p>
                  <p>
                    <b>Contact:</b> {selected.contact}
                  </p>
                  <p>
                    <b>Availability:</b> {selected.availability}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <div className="p-4">
                  <Calendar />
                </div>
              </TabsContent>

              <TabsContent value="sessions">
                <p className="p-4 text-muted-foreground">
                  Session records table coming soon...
                </p>
              </TabsContent>

              <TabsContent value="feedback">
                <p className="p-4 text-muted-foreground">
                  Feedback and ratings section coming soon...
                </p>
              </TabsContent>

              <TabsContent value="progress">
                <p className="p-4 text-muted-foreground">
                  Progress trends visualization coming soon...
                </p>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelected(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
