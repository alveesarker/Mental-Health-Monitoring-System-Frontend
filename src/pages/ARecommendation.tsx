/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../components/DataTable";

const API_URL = "http://localhost:5000/recommendations";

const columns = [
  { key: "recommendationID", label: "REC ID" },
  { key: "type", label: "Type" },
  { key: "title", label: "Title" },
  { key: "priority", label: "Priority" },
  { key: "validForDays", label: "Valid For Days" },
];

export default function ARecommendation() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [form, setForm] = useState<any>({
    type: "",
    title: "",
    description: "",
    priority: "",
    dataWindowDays: "",
    validForDays: "",
    rules: [{ category: "", value: "" }],
  });

  const [selectedRec, setSelectedRec] = useState<any>(null);

  const ruleCategories = [
    "mood",
    "stress",
    "sleep duration",
    "depression level",
    "energy level",
  ];

  // ---------------- FETCH ----------------
  const fetchRecommendationData = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const logs = await res.json();

      // Convert categories/values into rules array
      const formatted = logs.map((rec: any) => {
        const categories = rec.categories ? rec.categories.split(",") : [];
        const values = rec.values ? rec.values.split(",") : [];
        const rules = categories.map((cat: string, idx: number) => ({
          category: cat,
          value: values[idx],
        }));
        return { ...rec, rules: rules.length ? rules : [{ category: "", value: "" }] };
      });

      setData(formatted);
    } catch (err) {
      toast.error("Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendationData();
  }, []);

  // ---------------- ADD ----------------
  const handleAdd = () => {
    setForm({
      type: "",
      title: "",
      description: "",
      priority: "",
      dataWindowDays: "",
      validForDays: "",
      rules: [{ category: "", value: "" }],
    });
    setIsAddOpen(true);
  };

  const handleAddSubmit = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();
      toast.success("Recommendation added");
      setIsAddOpen(false);
      fetchRecommendationData();
    } catch {
      toast.error("Failed to add recommendation");
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (item: any) => {
    setSelectedRec(item);
    setForm({
      type: item.type,
      title: item.title,
      description: item.description,
      priority: item.priority,
      dataWindowDays: item.dataWindowDays,
      validForDays: item.validForDays,
      rules: item.rules.length > 0 ? item.rules : [{ category: "", value: "" }],
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const url = `${API_URL}/${selectedRec.recommendationID}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("Recommendation updated");
      setIsEditOpen(false);
      fetchRecommendationData();
    } catch {
      toast.error("Update failed");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (item: any) => {
    if (!confirm("Delete this recommendation?")) return;

    try {
      await fetch(`${API_URL}/${item.recommendationID}`, {
        method: "DELETE",
      });
      toast.success("Deleted successfully");
      fetchRecommendationData();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ---------------- RULES ----------------
  const addRule = () => {
    setForm({ ...form, rules: [...form.rules, { category: "", value: "" }] });
  };

  const updateRule = (index: number, key: string, value: string) => {
    const updated = [...form.rules];
    updated[index][key] = value;
    setForm({ ...form, rules: updated });
  };

  const removeRule = (index: number) => {
    const updated = [...form.rules];
    updated.splice(index, 1);
    setForm({ ...form, rules: updated });
  };

  // ---------------- JSX ----------------
  const renderDialog = (isOpen: boolean, close: () => void, onSubmit: () => void, title: string) => (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          <input
            className="border p-2 w-full rounded"
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="border p-2 w-full rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Data Window Days"
            value={form.dataWindowDays}
            onChange={(e) => setForm({ ...form, dataWindowDays: e.target.value })}
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Valid For Days"
            value={form.validForDays}
            onChange={(e) => setForm({ ...form, validForDays: e.target.value })}
          />

          <h3 className="font-semibold text-lg mt-5">Rules</h3>

          {form.rules.map((rule: any, idx: number) => (
            <div key={idx} className="border p-3 rounded space-y-2 bg-gray-50">
              <div className="flex gap-2">
                <select
                  className="border p-2 rounded w-1/2"
                  value={rule.category}
                  onChange={(e) => updateRule(idx, "category", e.target.value)}
                >
                  <option value="">Select Category</option>
                  {ruleCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  className="border p-2 rounded flex-1"
                  placeholder="Value"
                  value={rule.value}
                  onChange={(e) => updateRule(idx, "value", e.target.value)}
                />

                <Button variant="destructive" onClick={() => removeRule(idx)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <Button className="mt-2" variant="outline" onClick={addRule}>
            + Add Rule
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>{title.includes("Add") ? "Add" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <DataTable
        title="Recommendations"
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search recommendations..."
      />

      {renderDialog(isAddOpen, () => setIsAddOpen(false), handleAddSubmit, "Add Recommendation")}
      {renderDialog(isEditOpen, () => setIsEditOpen(false), handleEditSubmit, "Edit Recommendation")}
    </>
  );
}
