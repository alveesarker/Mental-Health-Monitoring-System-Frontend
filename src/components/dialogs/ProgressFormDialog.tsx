import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProgressRecord, stabilityOptions } from "@/lib/mock-data";

const formSchema = z.object({
  sessionID: z.string().min(1, "Session ID is required"),
  stability: z.enum(["Stable", "Moderate", "Critical"]),
  stressLevel: z.number().min(1).max(10),
  depressionLevel: z.number().min(1).max(10),
  workPerformance: z.number().min(1).max(10),
  energyLevel: z.number().min(1).max(10),
  fatigueLevel: z.number().min(1).max(10),
  note: z.string().max(500, "Note must be less than 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ProgressFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: ProgressRecord | null;
  onSave: (record: ProgressRecord) => void;
  sessionIDs: string[]; // <- dynamic session IDs
}

export function ProgressFormDialog({
  open,
  onOpenChange,
  record,
  onSave,
  sessionIDs, // <- accept as prop
}: ProgressFormDialogProps) {
  const isEditing = !!record;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionID: "",
      stability: "Stable",
      stressLevel: 5,
      depressionLevel: 5,
      workPerformance: 5,
      energyLevel: 5,
      fatigueLevel: 5,
      note: "",
    },
  });

  useEffect(() => {
    if (record) {
      form.reset({
        sessionID: record.sessionID,
        stability: record.stability,
        stressLevel: record.stressLevel,
        depressionLevel: record.depressionLevel,
        workPerformance: record.workPerformance,
        energyLevel: record.energyLevel,
        fatigueLevel: record.fatigueLevel,
        note: record.note,
      });
    } else {
      form.reset({
        sessionID: "",
        stability: "Stable",
        stressLevel: 5,
        depressionLevel: 5,
        workPerformance: 5,
        energyLevel: 5,
        fatigueLevel: 5,
        note: "",
      });
    }
  }, [record, form]);

  const onSubmit = (values: FormValues) => {
    onSave({
      id: record?.id || "",
      sessionID: values.sessionID,
      stability: values.stability,
      stressLevel: values.stressLevel,
      depressionLevel: values.depressionLevel,
      workPerformance: values.workPerformance,
      energyLevel: values.energyLevel,
      fatigueLevel: values.fatigueLevel,
      note: values.note,
    });
  };

  const levelOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Progress Record" : "Add Progress Record"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Session ID */}
            <FormField
              control={form.control}
              name="sessionID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session ID</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a session" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sessionIDs.map((id) => (
                        <SelectItem key={id} value={id}>
                          {id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stability */}
            <FormField
              control={form.control}
              name="stability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stability</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stability level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Numeric levels */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "stressLevel", label: "Stress Level" },
                { name: "depressionLevel", label: "Depression Level" },
                { name: "workPerformance", label: "Work Performance" },
                { name: "energyLevel", label: "Energy Level" },
                { name: "fatigueLevel", label: "Fatigue Level" },
              ].map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        value={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levelOptions.map((level) => (
                            <SelectItem key={level} value={String(level)}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes about this session..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
