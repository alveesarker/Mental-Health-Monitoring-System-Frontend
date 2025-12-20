/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/ui/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/emergency-contact";
const PATIENT_API = "http://localhost:5000/emergency-contact/patients";

export default function EmergencyContacts() {
  const [data, setData] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    contactNumber: "",
    name: "",
    relationship: "",
    email: "",
    patientID: "",
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const items = await res.json();
      setData(items);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contacts");
    }
  };

  // Fetch patient IDs
  const fetchPatients = async () => {
    try {
      const res = await fetch(PATIENT_API);
      const ids = await res.json();
      setPatients(ids);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load patients");
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchPatients();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.contactNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.relationship.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleAdd = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Contact added");
      setIsAddOpen(false);
      setForm({
        contactNumber: "",
        name: "",
        relationship: "",
        email: "",
        patientID: "",
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add contact");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(
        `${API_URL}/${selectedItem.contactNumber}/${selectedItem.patientID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Contact updated");
      setIsEditOpen(false);
      setSelectedItem(null);
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update contact");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${API_URL}/${selectedItem.contactNumber}/${selectedItem.patientID}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Contact deleted");
      setIsDeleteOpen(false);
      setSelectedItem(null);
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete contact");
    }
  };

  const columns = [
    { key: "contactNumber", label: "Contact Number" },
    { key: "name", label: "Name" },
    { key: "relationship", label: "Relationship" },
    { key: "email", label: "Email" },
    { key: "patientID", label: "Patient ID" },
    {
      key: "actions",
      label: "Actions",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedItem(item);
              setForm({ ...item });
              setIsEditOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedItem(item);
              setIsDeleteOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Emergency Contacts
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage emergency contacts for patients
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          Add Contact
        </Button>
      </div>

      {/* Search */}
      <SearchInput
        placeholder="Search by name, contact, or relationship..."
        value={search}
        onChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        className="max-w-sm"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onPageChange={setPage}
        emptyMessage="No emergency contacts found"
      />

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={(e) =>
                setForm({ ...form, contactNumber: e.target.value })
              }
            />
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Relationship"
              value={form.relationship}
              onChange={(e) =>
                setForm({ ...form, relationship: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Select
              value={form.patientID}
              onValueChange={(val) => setForm({ ...form, patientID: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.patient} value={p.patient}>
                    {p.patient}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={(e) =>
                setForm({ ...form, contactNumber: e.target.value })
              }
            />
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Relationship"
              value={form.relationship}
              onChange={(e) =>
                setForm({ ...form, relationship: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Select
              value={form.patientID}
              onValueChange={(val) => setForm({ ...form, patientID: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.patient} value={p.patient}>
                    {p.patient}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="my-2">
            Delete contact <strong>{selectedItem?.contactNumber}</strong> for
            patient <strong>{selectedItem?.patientID}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
