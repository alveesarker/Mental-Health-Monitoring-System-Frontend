import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { QuestionFormDialog } from "@/components/dialogs/QuestionFormDialog";
import { QuestionRecord, mockQuestionsData } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

export default function QuestionsPage() {
  const [data, setData] = useState<QuestionRecord[]>(mockQuestionsData);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<QuestionRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<QuestionRecord | null>(null);

  const pageSize = 5;

  const filteredData = useMemo(() => {
    const searchLower = search.toLowerCase();
    return data.filter(
      (item) =>
        item.questionID.toLowerCase().includes(searchLower) ||
        item.questionText.toLowerCase().includes(searchLower)
    );
  }, [data, search]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  const handleAdd = () => {
    setEditingRecord(null);
    setIsFormOpen(true);
  };

  const handleEdit = (record: QuestionRecord) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (record: QuestionRecord) => {
    setDeleteRecord(record);
  };

  const confirmDelete = () => {
    if (deleteRecord) {
      setData(data.filter((item) => item.id !== deleteRecord.id));
      toast({
        title: "Question deleted",
        description: `Question ${deleteRecord.questionID} has been deleted.`,
      });
      setDeleteRecord(null);
    }
  };

  const handleSave = (record: QuestionRecord) => {
    if (editingRecord) {
      setData(data.map((item) => (item.id === record.id ? record : item)));
      toast({
        title: "Question updated",
        description: `Question ${record.questionID} has been updated.`,
      });
    } else {
      setData([...data, { ...record, id: String(Date.now()) }]);
      toast({
        title: "Question created",
        description: `Question ${record.questionID} has been created.`,
      });
    }
    setIsFormOpen(false);
    setEditingRecord(null);
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      Scale: "bg-accent/10 text-accent border-accent/20",
      Text: "bg-primary/10 text-primary border-primary/20",
      "Yes/No": "bg-success/10 text-success border-success/20",
    };
    return (
      <Badge variant="outline" className={variants[type]}>
        {type}
      </Badge>
    );
  };

  const columns = [
    { key: "questionID" as const, label: "Question ID" },
    {
      key: "questionText" as const,
      label: "Question Text",
      className: "max-w-[400px]",
      render: (item: QuestionRecord) => (
        <span className="line-clamp-2">{item.questionText}</span>
      ),
    },
    {
      key: "type" as const,
      label: "Type",
      render: (item: QuestionRecord) => getTypeBadge(item.type),
    },
    {
      key: "actions" as const,
      label: "Actions",
      render: (item: QuestionRecord) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(item)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(item)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
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
          <h1 className="text-2xl font-semibold text-foreground">Assessment Questions</h1>
          <p className="text-muted-foreground mt-1">Manage mental health assessment questions and rules</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      {/* Search */}
      <SearchInput
        placeholder="Search by Question ID or text..."
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        className="max-w-sm"
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onPageChange={setPage}
        emptyMessage="No questions found"
      />

      {/* Form Dialog */}
      <QuestionFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        record={editingRecord}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteRecord}
        onOpenChange={(open) => !open && setDeleteRecord(null)}
        title="Delete Question"
        description={`Are you sure you want to delete question "${deleteRecord?.questionID}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
}
