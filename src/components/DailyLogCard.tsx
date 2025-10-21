import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { CloudRain, Frown, Laugh, Meh, Smile } from "lucide-react";
import { useState } from "react";

const moods = [
  { icon: Laugh, label: "Great", value: 5 },
  { icon: Smile, label: "Good", value: 4 },
  { icon: Meh, label: "Okay", value: 3 },
  { icon: Frown, label: "Low", value: 2 },
  { icon: CloudRain, label: "Difficult", value: 1 },
];

const stressLabels = [
  "No Stress",
  "Low",
  "Moderate",
  "High",
  "Very High",
  "Extreme Stress",
];

export function DailyLogCard() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [stressLevel, setStressLevel] = useState([5]);
  const [sleepHours, setSleepHours] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    console.log({
      mood: selectedMood,
      stress: stressLevel[0],
      sleep: sleepHours,
      notes,
    });
    // TODO: Save to backend
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        How are you feeling today?
      </h2>

      {/* Mood Selector */}
      <div className="flex gap-3 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
              selectedMood === mood.value
                ? "bg-primary/10 ring-2 ring-primary scale-105"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            <mood.icon
              className={`w-8 h-8 ${
                selectedMood === mood.value
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            />
            <span className="text-xs font-medium">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Stress Level */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <label className="font-medium text-foreground">Stress Level</label>
          <span className="text-primary font-semibold">
            {stressLabels[Math.floor(stressLevel[0] / 2)]} ({stressLevel[0]}/10)
          </span>
        </div>
        <Slider
          value={stressLevel}
          onValueChange={setStressLevel}
          max={10}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>No Stress</span>
          <span>Extreme Stress</span>
        </div>
      </div>

      {/* Sleep Duration */}
      <div className="mb-6">
        <label className="block font-medium text-foreground mb-2">
          Sleep Duration (hours)
        </label>
        <Input
          type="number"
          placeholder="e.g., 7.5"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          className="w-full"
          step="0.5"
          min="0"
          max="24"
        />
      </div>

      {/* Daily Notes */}
      <div className="mb-6">
        <label className="block font-medium text-foreground mb-2">
          Daily Notes
        </label>
        <Textarea
          placeholder="How was your day? Any thoughts or reflections..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full min-h-[120px] resize-none"
        />
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
      >
        Save Daily Log
      </Button>
    </div>
  );
}
