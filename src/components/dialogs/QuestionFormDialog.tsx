import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { QuestionRecord, QuestionRule, questionTypes, ruleCategories } from "@/lib/mock-data";

const formSchema = z.object({
  questionID: z.string().min(1, "Question ID is required").max(20, "Question ID must be less than 20 characters"),
  questionText: z.string().min(1, "Question text is required").max(500, "Question text must be less than 500 characters"),
  type: z.enum(["Scale", "Text", "Yes/No"]),
});

type FormValues = z.infer<typeof formSchema>;

interface QuestionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: QuestionRecord | null;
  onSave: (record: QuestionRecord) => void;
}

export function QuestionFormDialog({
  open,
  onOpenChange,
  record,
  onSave,
}: QuestionFormDialogProps) {
  const isEditing = !!record;
  const [rules, setRules] = useState<QuestionRule[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionID: "",
      questionText: "",
      type: "Scale",
    },
  });

  useEffect(() => {
    if (record) {
      form.reset({
        questionID: record.questionID,
        questionText: record.questionText,
        type: record.type,
      });
      setRules(record.rules || []);
    } else {
      form.reset({
        questionID: "",
        questionText: "",
        type: "Scale",
      });
      setRules([]);
    }
  }, [record, form]);

  const onSubmit = (values: FormValues) => {
    onSave({
      id: record?.id || "",
      questionID: values.questionID,
      questionText: values.questionText,
      type: values.type,
      rules,
    });
  };

  const addRule = () => {
    setRules([
      ...rules,
      { id: String(Date.now()), category: "stressLevel", value: "" },
    ]);
  };

  const updateRule = (id: string, field: keyof QuestionRule, value: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
  };

  const removeRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Question" : "Add Question"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="questionID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Q-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the question text..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Question Rules Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Question Rules</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRule}
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Rule
                </Button>
              </div>

              {rules.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-lg">
                  No rules added. Click "Add Rule" to create one.
                </p>
              ) : (
                <div className="space-y-3">
                  {rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                    >
                      <Select
                        value={rule.category}
                        onValueChange={(v) => updateRule(rule.id, "category", v)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {ruleCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Value"
                        value={rule.value}
                        onChange={(e) => updateRule(rule.id, "value", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRule(rule.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
