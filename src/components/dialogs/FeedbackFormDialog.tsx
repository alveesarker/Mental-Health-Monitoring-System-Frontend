import { Button } from "@/components/ui/button";
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
import { FeedbackRecord } from "@/lib/mock-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ----------------- Form Schema -----------------
const formSchema = z.object({
  sessionID: z.string().min(1, "Session ID is required"),
  rating: z.number().min(1).max(5),
  comfortLevel: z.number().min(1).max(10),
  clarityLevel: z.number().min(1).max(10),
  comment: z.string().max(1000, "Comment must be less than 1000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// ----------------- Props -----------------
interface FeedbackFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: FeedbackRecord | null;
  onSave: (record: FeedbackRecord) => void;
  sessionIDs: string[];
}

// ----------------- Component -----------------
export function FeedbackFormDialog({
  open,
  onOpenChange,
  record,
  onSave,
  sessionIDs,
}: FeedbackFormDialogProps) {
  const isEditing = !!record;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionID: "",
      rating: 3,
      comfortLevel: 5,
      clarityLevel: 5,
      comment: "",
    },
  });

  // Reset form when record changes (edit vs add)
  useEffect(() => {
    if (record) {
      form.reset({
        sessionID: record.sessionID,
        rating: record.rating,
        comfortLevel: record.comfortLevel,
        clarityLevel: record.clarityLevel,
        comment: record.comment,
      });
    } else {
      form.reset({
        sessionID: "",
        rating: 3,
        comfortLevel: 5,
        clarityLevel: 5,
        comment: "",
      });
    }
  }, [record, form]);

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    onSave({
      id: record?.id || "", // keep id if editing, else empty
      sessionID: values.sessionID,
      rating: values.rating,
      comfortLevel: values.comfortLevel,
      clarityLevel: values.clarityLevel,
      comment: values.comment,
    });
  };

  // Options
  const ratingOptions = [1, 2, 3, 4, 5];
  const levelOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Feedback" : "Add Feedback"}
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

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1-5 stars)</FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ratingOptions.map((rating) => (
                        <SelectItem key={rating} value={String(rating)}>
                          {rating} Star{rating > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comfort & Clarity */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="comfortLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comfort Level</FormLabel>
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

              <FormField
                control={form.control}
                name="clarityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clarity Level</FormLabel>
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
            </div>

            {/* Comment */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add feedback comments..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
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
