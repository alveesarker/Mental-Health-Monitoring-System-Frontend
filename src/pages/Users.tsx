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
import { Edit, Eye, Search, Trash2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Add Patient Dialog State ---
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    contactNumber: "",
    city: "",
    street: "",
    postalCode: "",
  });

  // --- Edit Patient Dialog State ---
  const [editingPatient, setEditingPatient] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    contactNumber: "",
    city: "",
    street: "",
    postalCode: "",
  });

  // --- Delete Confirmation Dialog State ---
  const [deletePatientId, setDeletePatientId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // --- Fetch Users from Backend ---
  useEffect(() => {
    fetch("http://localhost:5000/patients")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  // --- Add Patient ---
  const handleAddPatient = () => {
    fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers((prev) => [...prev, data]);
        setAddDialogOpen(false);
        setNewUser({
          name: "",
          email: "",
          gender: "",
          dob: "",
          contactNumber: "",
          city: "",
          street: "",
          postalCode: "",
        });
      })
      .catch((err) => console.error("Add Patient Error:", err));
  };

  // --- Open Edit Dialog ---
  const handleOpenEdit = (patient) => {
    setEditingPatient(patient);
    setEditUser({
      name: patient.name || "",
      email: patient.email || "",
      gender: patient.gender || "",
      dob: patient.dob?.split("T")[0] || "",
      contactNumber: patient.contactNumber || "",
      city: patient.city || "",
      street: patient.street || "",
      postalCode: patient.postalCode || "",
    });
  };

  // --- Update Patient ---
  const handleSavePatient = () => {
    if (!editingPatient) return;

    const payload = Object.fromEntries(
      Object.entries(editUser).filter(([_, v]) => v !== "")
    );

    fetch(`http://localhost:5000/patients/${editingPatient.patientID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((updatedPatient) => {
        const patientWithID = {
          patientID: editingPatient.patientID,
          ...updatedPatient,
        };
        setUsers((prev) =>
          prev.map((p) =>
            p.patientID === patientWithID.patientID ? patientWithID : p
          )
        );
        setEditingPatient(null);
      })
      .catch((err) => console.error("Update Patient Error:", err));
  };

  // --- Delete Patient ---
  const handleDeletePatient = (id: number) => {
    fetch(`http://localhost:5000/patients/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setUsers((prev) => prev.filter((p) => p.patientID !== id));
        } else {
          console.error("Failed to delete patient");
        }
      })
      .catch((err) => console.error("Delete Patient Error:", err))
      .finally(() => setDeleteDialogOpen(false));
  };

  // --- Filter Logic ---
  const filteredUsers = users.filter(
    (user) =>
      (user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.patientID || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
          <p className="text-muted-foreground">
            Manage patient records and health information securely.
          </p>
        </div>

        {/* Add Patient Button */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <Input
                placeholder="Date of Birth"
                type="date"
                value={newUser.dob}
                onChange={(e) =>
                  setNewUser({ ...newUser, dob: e.target.value })
                }
              />
              <Select
                value={newUser.gender}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, gender: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Contact Number"
                value={newUser.contactNumber}
                onChange={(e) =>
                  setNewUser({ ...newUser, contactNumber: e.target.value })
                }
              />
              <Input
                placeholder="City"
                value={newUser.city}
                onChange={(e) =>
                  setNewUser({ ...newUser, city: e.target.value })
                }
              />
              <Input
                placeholder="Street"
                value={newUser.street}
                onChange={(e) =>
                  setNewUser({ ...newUser, street: e.target.value })
                }
              />
              <Input
                placeholder="Postal Code"
                value={newUser.postalCode}
                onChange={(e) =>
                  setNewUser({ ...newUser, postalCode: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddPatient}>
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Patients</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((patient) => (
                <TableRow key={patient.patientID}>
                  <TableCell className="font-medium">
                    {patient.patientID}
                  </TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.dob?.split("T")[0]}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contactNumber}</TableCell>
                  <TableCell>{patient.city}</TableCell>

                  <TableCell className="text-right space-x-2">
                    {/* View */}
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>

                    {/* Edit */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenEdit(patient)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    {/* Delete */}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setDeletePatientId(patient.patientID);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No patients found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- Edit Patient Dialog --- */}
      <Dialog
        open={!!editingPatient}
        onOpenChange={() => setEditingPatient(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />
            <Input
              placeholder="Date of Birth"
              type="date"
              value={editUser.dob}
              onChange={(e) =>
                setEditUser({ ...editUser, dob: e.target.value })
              }
            />
            <Select
              value={editUser.gender}
              onValueChange={(value) =>
                setEditUser({ ...editUser, gender: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Contact Number"
              value={editUser.contactNumber}
              onChange={(e) =>
                setEditUser({ ...editUser, contactNumber: e.target.value })
              }
            />
            <Input
              placeholder="City"
              value={editUser.city}
              onChange={(e) =>
                setEditUser({ ...editUser, city: e.target.value })
              }
            />
            <Input
              placeholder="Street"
              value={editUser.street}
              onChange={(e) =>
                setEditUser({ ...editUser, street: e.target.value })
              }
            />
            <Input
              placeholder="Postal Code"
              value={editUser.postalCode}
              onChange={(e) =>
                setEditUser({ ...editUser, postalCode: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSavePatient}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Delete Confirmation Dialog --- */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="py-2">
            Are you sure you want to delete this patient? This action cannot be
            undone.
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deletePatientId !== null) {
                  handleDeletePatient(deletePatientId);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
