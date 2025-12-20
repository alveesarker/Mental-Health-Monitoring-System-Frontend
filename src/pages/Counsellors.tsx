import { Button } from "@/components/ui/button";
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
import { useEffect, useMemo, useState } from "react";

/*
  Full updated Counsellor component:
  - AddDialog: add counsellor main + specializations[] + qualifications[] + schedule[]
  - EditDialog: separate dialog, prefilled from API
  - ViewDialog: shows main + schedule + specializations + qualifications
  - Calls backend endpoints described in models/controllers earlier.
*/

const emptyMain = {
  name: "",
  email: "",
  yearOfExperience: "",
  contactNumber: "",
  availability: "online",
  street: "",
  city: "",
  postalCode: "",
  password:"",
};

const emptyQualification = () => ({
  name: "",
  institution: "",
  start: "",
  end: "",
});

const emptySchedule = () => ({
  day: "",
  startTime: "",
  endTime: "",
  mode: "online",
});

export default function Counsellors() {
  // data
  const [counsellors, setCounsellors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // dialogs / selected items
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // id used for view/edit
  const [loading, setLoading] = useState(false);

  // form state for add and edit (keeps separate to make dialogs independent)
  const [addMain, setAddMain] = useState({ ...emptyMain });
  const [addSpecializations, setAddSpecializations] = useState([""]);
  const [addQualifications, setAddQualifications] = useState([
    emptyQualification(),
  ]);
  const [addSchedules, setAddSchedules] = useState([emptySchedule()]);

  const [editMain, setEditMain] = useState({ ...emptyMain });
  const [editSpecializations, setEditSpecializations] = useState([]);
  const [editQualifications, setEditQualifications] = useState([]);
  const [editSchedules, setEditSchedules] = useState([]);

  // --- Delete Confirmation Dialog State ---
  const [deletePatientId, setDeletePatientId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // viewed details
  const [viewDetails, setViewDetails] = useState({
    main: null,
    specializations: [],
    qualifications: [],
    schedule: [],
  });

  // filtered list computed
  const filtered = useMemo(() => {
    return counsellors.filter((c) => {
      const matchesSearch =
        !search ||
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.id?.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = !filter || c.availability === filter;
      return matchesSearch && matchesFilter;
    });
  }, [counsellors, search, filter]);

  // --- API helpers (simple fetch wrapper) ---
  // --- API helpers (simple fetch wrapper) ---
  const BASE = "http://localhost:5000/counsellor";

  const api = {
    getMain: async () => {
      const res = await fetch(`${BASE}/main`);
      if (!res.ok) throw new Error("Failed to load main");
      const data = res.json();
      console.log(data);
      return data;
    },

    getDetails: async (id) => {
      const res = await fetch(`${BASE}/details/${id}`);
      if (!res.ok) throw new Error("Failed to load details");
      return res.json();
    },

    add: async (body) => {
      const res = await fetch(`${BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return res.json();
    },

    update: async (id, body) => {
      const res = await fetch(`${BASE}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return res.json();
    },

    delete: async (id) => {
      const res = await fetch(`${BASE}/delete/${id}`, { method: "DELETE" });
      return { message: "deleted" };
    },
  };

  // --- load main list on mount and after changes ---
  const loadMain = async () => {
    setLoading(true);
    try {
      const main = await api.getMain();
      // normalize: ensure fields exist, and id matches server PK
      const normalized = main.map((r) => ({
        id: r.counsellorID?.toString() || r.id || "",
        name: r.name || "",
        email: r.email || "",
        availability: r.availability || "online",
        contact: r.contactNumber || r.contact || "",
        yearOfExperience: r.yearOfExperience ?? 0,
        city: r.city || "",
        street: r.street || "",
        postalCode: r.postalCode?.toString() || "",
        password:r.password || "",
      }));
      setCounsellors(normalized);
    } catch (err) {
      console.error("Load main error", err);
      // keep previous list if error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMain();
  }, []);

  // --- Add helpers for arrays ---
  const addSpecRow = (listSetter) => listSetter((s) => [...s, ""]);
  const removeSpecRow = (idx, listSetter) =>
    listSetter((s) => s.filter((_, i) => i !== idx));

  const addQualRow = (listSetter) =>
    listSetter((s) => [...s, emptyQualification()]);
  const removeQualRow = (idx, listSetter) =>
    listSetter((s) => s.filter((_, i) => i !== idx));

  const addScheduleRow = (listSetter) =>
    listSetter((s) => [...s, emptySchedule()]);
  const removeScheduleRow = (idx, listSetter) =>
    listSetter((s) => s.filter((_, i) => i !== idx));

  // --- Add Counsellor (submit) ---
  const handleAddSubmit = async () => {
    // basic validation
    if (!addMain.name.trim() || !addMain.email.trim())
      return alert("Name and email required");

    const payload = {
      counsellor: {
        name: addMain.name,
        email: addMain.email,
        yearOfExperience: Number(addMain.yearOfExperience) || 0,
        contactNumber: addMain.contactNumber,
        availability: addMain.availability,
        street: addMain.street,
        city: addMain.city,
        postalCode: addMain.postalCode,
        password: addMain.password,
      },
      specializations: addSpecializations.filter((s) => s && s.trim()),
      qualifications: addQualifications
        .filter((q) => q.name && q.name.trim())
        .map((q) => ({
          name: q.name,
          institution: q.institution,
          start: q.start,
          end: q.end,
        })),
      schedule: addSchedules
        .filter((s) => s.day && s.startTime && s.endTime)
        .map((s) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          mode: s.mode,
        })),
    };

    try {
      setLoading(true);
      await api.add(payload);
      // reload list
      await loadMain();
      // reset add form
      setAddMain({ ...emptyMain });
      setAddSpecializations([""]);
      setAddQualifications([emptyQualification()]);
      setAddSchedules([emptySchedule()]);
      setAddOpen(false);
    } catch (err) {
      console.error(err);
      alert("Add failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Delete ---
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await api.delete(id);
      await loadMain();
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Prepare edit dialog: load details from backend then open edit dialog ---
  const openEdit = async (row) => {
    try {
      setLoading(true);
      const details = await api.getDetails(row.id);
      // details returns { specializations, qualifications, schedule }
      // load main info from main list (or refetch a single endpoint if you have one)
      const mainRow = counsellors.find((c) => c.id === row.id) || {};
      setEditMain({
        name: mainRow.name || "",
        email: mainRow.email || "",
        yearOfExperience: mainRow.yearOfExperience || "",
        contactNumber: mainRow.contact || "",
        availability: mainRow.availability || "online",
        street: mainRow.street || "",
        city: mainRow.city || "",
        postalCode: mainRow.postalCode || "",
        password:mainRow.password || "",
      });

      setEditSpecializations(
        details.specializations?.map((s) => s.specialization || s) || []
      );

      setEditQualifications(
        (details.qualifications || []).map((q) => ({
          name: q.qualificationName || q.name,
          institution: q.institutionName || q.institution,
          start: q.startDate || q.start,
          end: q.completionDate || q.end,
        }))
      );

      setEditSchedules(
        (details.schedule || []).map((s) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          mode: s.mode,
        }))
      );

      setSelectedId(row.id);
      setEditOpen(true);
    } catch (err) {
      console.error("Open edit error", err);
      alert("Failed to load details for edit");
    } finally {
      setLoading(false);
    }
  };

  // --- Submit edit (partial update allowed) ---
  const handleEditSubmit = async () => {
    if (!selectedId) return;
    const payload = {
      counsellor: {
        name: editMain.name,
        email: editMain.email,
        yearOfExperience: Number(editMain.yearOfExperience) || 0,
        contactNumber: editMain.contactNumber,
        availability: editMain.availability,
        street: editMain.street,
        city: editMain.city,
        postalCode: editMain.postalCode,
        password:editMain.password,
      },
      specializations: editSpecializations.filter((s) => s && s.trim()),
      qualifications: editQualifications
        .filter((q) => q.name && q.name.trim())
        .map((q) => ({
          name: q.name,
          institution: q.institution,
          start: q.start,
          end: q.end,
        })),
      schedule: editSchedules
        .filter((s) => s.day && s.startTime && s.endTime)
        .map((s) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          mode: s.mode,
        })),
    };

    try {
      setLoading(true);
      await api.update(selectedId, payload);
      await loadMain();
      setEditOpen(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- View dialog: load main + details and open view ---
  const openView = async (row) => {
    try {
      setLoading(true);
      const details = await api.getDetails(row.id);
      // const mainRow = counsellors.find((c) => c.id === row.id) || row;

      setViewDetails({
        main: {
          id: row.id,
          name: row.name,
          email: row.email,
          contactNumber: row.contact,
          availability: row.availability,
          yearOfExperience: row.yearOfExperience,
          street: row.street,
          city: row.city,
          postalCode: row.postalCode,
          password:row.password,
        },
        specializations: (details.specializations || []).map(
          (s) => s.specialization || s
        ),
        qualifications:
          (details.qualifications || []).map((q) => ({
            name: q.qualificationName || q.name,
            institution: q.institutionName || q.institution,
            start: q.startDate || q.start,
            end: q.completionDate || q.end,
          })) || [],
        schedule: (details.schedule || []).map((s) => ({
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          mode: s.mode,
        })),
      });

      setViewOpen(true);
    } catch (err) {
      console.error("View error", err);
      alert("Failed to load details for view");
    } finally {
      setLoading(false);
    }
  };

  // --- small helper to set array values in forms ---
  const setArrayValue = (setter, idx, prop, value) => {
    setter((arr) => {
      const copy = [...arr];
      copy[idx] = { ...(copy[idx] || {}), [prop]: value };
      return copy;
    });
  };

  function to12Hour(time24) {
    const [hour, minute] = time24.split(":");
    return new Date(0, 0, 0, hour, minute).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  // console.log(to12Hour("14:30")); // 2:30 PM

  // --- render ---
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

          {/* Add Dialog Trigger */}
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Counsellor
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Counsellor</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-2">
                {/* BASIC INFO */}
                <section>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={addMain.name}
                        onChange={(e) =>
                          setAddMain({ ...addMain, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        value={addMain.email}
                        onChange={(e) =>
                          setAddMain({ ...addMain, email: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Password</Label>
                      <Input
                        value={addMain.password}
                        onChange={(e) =>
                          setAddMain({ ...addMain, password: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Contact Number</Label>
                      <Input
                        value={addMain.contactNumber}
                        onChange={(e) =>
                          setAddMain({
                            ...addMain,
                            contactNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Years of Experience</Label>
                      <Input
                        value={addMain.yearOfExperience}
                        onChange={(e) =>
                          setAddMain({
                            ...addMain,
                            yearOfExperience: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Availability</Label>
                      <select
                        className="border rounded-md p-2 w-full"
                        value={addMain.availability}
                        onChange={(e) =>
                          setAddMain({
                            ...addMain,
                            availability: e.target.value,
                          })
                        }
                      >
                        <option value="available">Available</option>
                        <option value="not available">Not Available</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* ADDRESS */}
                <section>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Street</Label>
                      <Input
                        value={addMain.street}
                        onChange={(e) =>
                          setAddMain({ ...addMain, street: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>City</Label>
                      <Input
                        value={addMain.city}
                        onChange={(e) =>
                          setAddMain({ ...addMain, city: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Postal Code</Label>
                      <Input
                        value={addMain.postalCode}
                        onChange={(e) =>
                          setAddMain({ ...addMain, postalCode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* SPECIALIZATIONS */}
                <section>
                  <h3 className="font-semibold mb-2">Specializations</h3>
                  <div className="space-y-2">
                    {addSpecializations.map((s, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={s}
                          onChange={(e) =>
                            setAddSpecializations((prev) =>
                              prev.map((v, i) =>
                                i === idx ? e.target.value : v
                              )
                            )
                          }
                        />
                        <Button
                          variant="outline"
                          onClick={() =>
                            removeSpecRow(idx, setAddSpecializations)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      onClick={() => addSpecRow(setAddSpecializations)}
                    >
                      + Add Specialization
                    </Button>
                  </div>
                </section>

                {/* QUALIFICATIONS */}
                <section>
                  <h3 className="font-semibold mb-2">Qualifications</h3>
                  <div className="space-y-4">
                    {addQualifications.map((q, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end"
                      >
                        <Input
                          placeholder="Degree"
                          value={q.name}
                          onChange={(e) =>
                            setAddQualifications((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, name: e.target.value } : v
                              )
                            )
                          }
                        />
                        <Input
                          placeholder="Institution"
                          value={q.institution}
                          onChange={(e) =>
                            setAddQualifications((prev) =>
                              prev.map((v, i) =>
                                i === idx
                                  ? { ...v, institution: e.target.value }
                                  : v
                              )
                            )
                          }
                        />
                        <Input
                          type="date"
                          value={q.start}
                          onChange={(e) =>
                            setAddQualifications((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, start: e.target.value } : v
                              )
                            )
                          }
                        />
                        <Input
                          type="date"
                          value={q.end}
                          onChange={(e) =>
                            setAddQualifications((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, end: e.target.value } : v
                              )
                            )
                          }
                        />
                        <Button
                          variant="outline"
                          onClick={() =>
                            removeQualRow(idx, setAddQualifications)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      onClick={() => addQualRow(setAddQualifications)}
                    >
                      + Add Qualification
                    </Button>
                  </div>
                </section>

                {/* SCHEDULE */}
                <section>
                  <h3 className="font-semibold mb-2">Schedule</h3>
                  <div className="space-y-4">
                    {addSchedules.map((s, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end"
                      >
                        <Input
                          placeholder="Day"
                          value={s.day}
                          onChange={(e) =>
                            setAddSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, day: e.target.value } : v
                              )
                            )
                          }
                        />
                        <Input
                          type="time"
                          value={s.startTime}
                          onChange={(e) =>
                            setAddSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx
                                  ? { ...v, startTime: e.target.value }
                                  : v
                              )
                            )
                          }
                        />
                        <Input
                          type="time"
                          value={s.endTime}
                          onChange={(e) =>
                            setAddSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx
                                  ? { ...v, endTime: e.target.value }
                                  : v
                              )
                            )
                          }
                        />
                        <select
                          className="border rounded-md p-2"
                          value={s.mode}
                          onChange={(e) =>
                            setAddSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, mode: e.target.value } : v
                              )
                            )
                          }
                        >
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                        </select>
                        <Button
                          variant="outline"
                          onClick={() =>
                            removeScheduleRow(idx, setAddSchedules)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      onClick={() => addScheduleRow(setAddSchedules)}
                    >
                      + Add Schedule
                    </Button>
                  </div>
                </section>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSubmit} disabled={loading}>
                  {loading ? "Saving..." : "Save Counsellor"}
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
              <TableHead>Email</TableHead>
              <TableHead>Years Of Experience</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.yearOfExperience}</TableCell>
                <TableCell>{c.contact}</TableCell>
                <TableCell>{c.availability}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openView(c)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEdit(c)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setDeletePatientId(c.id);
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

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No counsellors found.
          </p>
        )}
      </Card>

      {/* Edit Dialog (separate) */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-6xl h-[82vh] overflow-y-auto rounded-2xl p-8 shadow-2xl border border-gray-200 bg-white">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Edit Counsellor
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            {/* MAIN FIELDS */}
            <div className="space-y-6">
              <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
                General Information
              </h2>

              <div>
                <Label className="font-semibold">Name</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.name}
                  onChange={(e) =>
                    setEditMain({ ...editMain, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">Email</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.email}
                  onChange={(e) =>
                    setEditMain({ ...editMain, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">Password</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.password}
                  onChange={(e) =>
                    setEditMain({ ...editMain, password: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">Years of Experience</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.yearOfExperience}
                  onChange={(e) =>
                    setEditMain({
                      ...editMain,
                      yearOfExperience: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">Contact Number</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.contactNumber}
                  onChange={(e) =>
                    setEditMain({ ...editMain, contactNumber: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">Availability</Label>
                <select
                  className="rounded-xl border-gray-300 p-2 w-full focus:ring-2 focus:ring-blue-400"
                  value={editMain.availability}
                  onChange={(e) =>
                    setEditMain({ ...editMain, availability: e.target.value })
                  }
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <h2 className="font-semibold text-lg text-gray-700 border-b pb-2 mt-6">
                Address
              </h2>

              <div>
                <Label className="font-semibold">Street</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.street}
                  onChange={(e) =>
                    setEditMain({ ...editMain, street: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">City</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.city}
                  onChange={(e) =>
                    setEditMain({ ...editMain, city: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="font-semibold">Postal Code</Label>
                <Input
                  className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                  value={editMain.postalCode}
                  onChange={(e) =>
                    setEditMain({ ...editMain, postalCode: e.target.value })
                  }
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-10">
              {/* SPECIALIZATIONS */}
              <div>
                <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
                  Specializations
                </h2>

                <div className="space-y-3 mt-4">
                  {editSpecializations.map((s, idx) => (
                    <div key={idx} className="flex gap-3">
                      <Input
                        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                        value={s}
                        onChange={(e) =>
                          setEditSpecializations((prev) =>
                            prev.map((v, i) => (i === idx ? e.target.value : v))
                          )
                        }
                      />
                      <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={() =>
                          removeSpecRow(idx, setEditSpecializations)
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    className="rounded-xl mt-2"
                    onClick={() => addSpecRow(setEditSpecializations)}
                  >
                    Add specialization
                  </Button>
                </div>
              </div>

              {/* QUALIFICATIONS */}
              <div>
                <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
                  Qualifications
                </h2>

                <div className="space-y-4 mt-4">
                  {editQualifications.map((q, idx) => (
                    <div
                      key={idx}
                      className=" gap-4 items-end bg-gray-50 p-4 rounded-xl border"
                    >
                      <div>
                        <Label className="font-semibold">Degree</Label>
                        <Input
                          className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                          value={q.name}
                          onChange={(e) =>
                            setEditQualifications((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, name: e.target.value } : v
                              )
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label className="font-semibold">Institution</Label>
                        <Input
                          className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                          value={q.institution}
                          onChange={(e) =>
                            setEditQualifications((prev) =>
                              prev.map((v, i) =>
                                i === idx
                                  ? { ...v, institution: e.target.value }
                                  : v
                              )
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label className="font-semibold">Start</Label>
                        <Input
                          type="date"
                          className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                          value={q.start}
                          onChange={(e) =>
                            setEditQualifications((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, start: e.target.value } : v
                              )
                            )
                          }
                        />
                      </div>

                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="font-semibold">End</Label>
                          <Input
                            type="date"
                            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                            value={q.end}
                            onChange={(e) =>
                              setEditQualifications((prev) =>
                                prev.map((v, i) =>
                                  i === idx ? { ...v, end: e.target.value } : v
                                )
                              )
                            }
                          />
                        </div>

                        <Button
                          variant="outline"
                          className="rounded-xl"
                          onClick={() =>
                            removeQualRow(idx, setEditQualifications)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    className="rounded-xl"
                    onClick={() => addQualRow(setEditQualifications)}
                  >
                    Add qualification
                  </Button>
                </div>
              </div>

              {/* SCHEDULE */}
              <div>
                <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
                  Schedule
                </h2>

                <div className="space-y-4 mt-4">
                  {editSchedules.map((s, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-gray-50 p-4 rounded-xl border"
                    >
                      <div>
                        <Label className="font-semibold">Day</Label>
                        <Input
                          className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                          value={s.day}
                          onChange={(e) =>
                            setEditSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, day: e.target.value } : v
                              )
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label className="font-semibold">Start</Label>
                        <Input
                          type="time"
                          className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                          value={s.startTime}
                          onChange={(e) =>
                            setEditSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx
                                  ? { ...v, startTime: e.target.value }
                                  : v
                              )
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label className="font-semibold">End</Label>
                        <Input
                          type="time"
                          className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-400"
                          value={s.endTime}
                          onChange={(e) =>
                            setEditSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx
                                  ? { ...v, endTime: e.target.value }
                                  : v
                              )
                            )
                          }
                        />
                      </div>

                      <div>
                        <Label className="font-semibold">Mode</Label>
                        <select
                          className="rounded-xl border-gray-300 p-2 w-full focus:ring-2 focus:ring-blue-400"
                          value={s.mode}
                          onChange={(e) =>
                            setEditSchedules((prev) =>
                              prev.map((v, i) =>
                                i === idx ? { ...v, mode: e.target.value } : v
                              )
                            )
                          }
                        >
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                        </select>
                      </div>

                      <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => removeScheduleRow(idx, setEditSchedules)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    className="rounded-xl"
                    onClick={() => addScheduleRow(setEditSchedules)}
                  >
                    Add schedule row
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4 mt-4">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl"
              onClick={handleEditSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {viewDetails.main?.name || "Counsellor"} — Profile
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="specializations">Specializations</TabsTrigger>
              <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="p-4 space-y-2">
                <p>
                  <b>ID:</b> {viewDetails.main?.id}
                </p>
                <p>
                  <b>Name:</b> {viewDetails.main?.name}
                </p>
                <p>
                  <b>Email:</b> {viewDetails.main?.email}
                </p>
                <p>
                  <b>Contact:</b> {viewDetails.main?.contactNumber}
                </p>
                <p>
                  <b>Availability:</b> {viewDetails.main?.availability}
                </p>
                <p>
                  <b>Years Exp:</b> {viewDetails.main?.yearOfExperience}
                </p>
                <p>
                  <b>Address:</b> {viewDetails.main?.street},{" "}
                  {viewDetails.main?.city} {viewDetails.main?.postalCode}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <div className="p-4">
                {viewDetails.schedule.length === 0 ? (
                  <p className="text-muted-foreground">No schedule found.</p>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="py-2">Day</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewDetails.schedule.map((s, i) => (
                        <tr key={i}>
                          <td className="py-2">{s.day}</td>
                          <td>{to12Hour(s.startTime)}</td>
                          <td>{to12Hour(s.endTime)}</td>
                          <td>{s.mode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specializations">
              <div className="p-4">
                {viewDetails.specializations.length === 0 ? (
                  <p className="text-muted-foreground">
                    No specializations found.
                  </p>
                ) : (
                  <ul className="list-disc pl-5">
                    {viewDetails.specializations.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>

            <TabsContent value="qualifications">
              <div className="p-4">
                {viewDetails.qualifications.length === 0 ? (
                  <p className="text-muted-foreground">
                    No qualifications found.
                  </p>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="py-2">Degree</th>
                        <th>Institution</th>
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewDetails.qualifications.map((q, i) => (
                        <tr key={i}>
                          <td className="py-2">{q.name}</td>
                          <td>{q.institution}</td>
                          <td>{q.start}</td>
                          <td>{q.end}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)}>
              Close
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
                  handleDelete(deletePatientId);
                  setDeleteDialogOpen(false);
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
