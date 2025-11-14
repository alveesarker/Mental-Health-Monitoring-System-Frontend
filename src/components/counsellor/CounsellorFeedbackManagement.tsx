import { useState } from "react";
import { Star, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Feedback {
  id: string;
  user: string;
  comment: string;
  rating: number;
  sentiment: "positive" | "neutral" | "negative";
}

const initialFeedback: Feedback[] = [
  {
    id: "F001",
    user: "Sarah",
    comment: "Very helpful!",
    rating: 5,
    sentiment: "positive",
  },
  {
    id: "F002",
    user: "Michael",
    comment: "Okay, could be better.",
    rating: 3,
    sentiment: "neutral",
  },
  {
    id: "F003",
    user: "Alex",
    comment: "Not satisfied with advice",
    rating: 2,
    sentiment: "negative",
  },
];

export const CounsellorFeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState(initialFeedback);

  const handleDelete = (id: string) =>
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  const handleEdit = (id: string) => alert(`Edit feedback ${id}`);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Feedback Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {feedbacks.map((f) => (
          <div
            key={f.id}
            className="flex justify-between items-center border p-3 rounded-lg hover:bg-muted/40"
          >
            <div>
              <p className="font-medium">{f.user}</p>
              <p className="text-sm text-muted-foreground">{f.comment}</p>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < f.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-xs mt-1 ${
                  f.sentiment === "positive"
                    ? "text-green-500"
                    : f.sentiment === "negative"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                Sentiment: {f.sentiment}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(f.id)}>
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(f.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
