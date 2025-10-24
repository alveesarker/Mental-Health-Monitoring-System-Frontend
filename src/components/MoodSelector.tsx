import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😢", label: "Sad", value: "sad" },
  { emoji: "😡", label: "Frustrated", value: "frustrated" },
  { emoji: "😴", label: "Tired", value: "tired" },
];

interface MoodSelectorProps {
  value: string;
  onChange: (mood: string) => void;
}

export const MoodSelector = ({ value, onChange }: MoodSelectorProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        Current Mood
        <span className="text-xs text-muted-foreground">(optional)</span>
      </label>
      <div className="flex gap-3 flex-wrap justify-center">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-110",
              value === mood.value
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <span className="text-xs font-medium text-foreground">
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
