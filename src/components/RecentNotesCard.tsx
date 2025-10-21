import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";

export function RecentNotesCard() {
  const recentNotes = [
    {
      date: "Oct 20, 2025",
      mood: "Good",
      preview:
        "Had a productive day at work. Managed to complete the project deadline...",
    },
    {
      date: "Oct 19, 2025",
      mood: "Okay",
      preview:
        "Feeling a bit overwhelmed with tasks. Need to prioritize better...",
    },
    {
      date: "Oct 18, 2025",
      mood: "Great",
      preview:
        "Wonderful day! Went for a morning walk and felt really energized...",
    },
  ];

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      Great: "text-success",
      Good: "text-accent",
      Okay: "text-warning",
      Low: "text-destructive",
      Difficult: "text-destructive",
    };
    return colors[mood] || "text-muted-foreground";
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Recent Notes
          </h3>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {recentNotes.map((note, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {note.date}
              </span>
              <span
                className={`text-sm font-semibold ${getMoodColor(note.mood)}`}
              >
                {note.mood}
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-2">
              {note.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
