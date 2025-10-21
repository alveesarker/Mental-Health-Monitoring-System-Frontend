import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const moods = [
  { emoji: "😄", label: "Great", value: 5 },
  { emoji: "😊", label: "Good", value: 4 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "😟", label: "Low", value: 2 },
  { emoji: "😢", label: "Difficult", value: 1 },
];

const DailyLog = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [stressLevel, setStressLevel] = useState([5]);
  const [sleepDuration, setSleepDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast.error("Please select your mood");
      return;
    }
    if (!sleepDuration) {
      toast.error("Please enter sleep duration");
      return;
    }

    toast.success("Daily log saved successfully!");

    // Reset form
    setSelectedMood(null);
    setStressLevel([5]);
    setSleepDuration("");
    setNotes("");
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return "text-secondary";
    if (level <= 6) return "text-accent";
    return "text-destructive";
  };

  const getStressLabel = (level: number) => {
    if (level <= 3) return "Low";
    if (level <= 6) return "Moderate";
    return "High";
  };

  return (
    <Card className="bg-gradient-to-br from-background p-6 h-[712.6px] sm:p-8 w-[450px]">
      <div className="space-y-8">
        {/* Mood Selection */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            How are you feeling today?
          </Label>
          <div className="flex items-center justify-between">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center p-2 w-[70px] rounded-lg transition-all duration-300 hover:scale-105 ${
                  selectedMood === mood.value
                    ? "bg-gradient-to-br from-primary to-accent shadow-lg scale-105"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span
                  className={`text-xs font-medium ${
                    selectedMood === mood.value
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stress Level */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Stress Level</Label>
            <span
              className={`text-lg font-bold ${getStressColor(stressLevel[0])}`}
            >
              {getStressLabel(stressLevel[0])} ({stressLevel[0]}/10)
            </span>
          </div>
          <Slider
            value={stressLevel}
            onValueChange={setStressLevel}
            max={10}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>No Stress</span>
            <span>Extreme Stress</span>
          </div>
        </div>

        {/* Sleep Duration */}
        <div className="space-y-4">
          <Label htmlFor="sleep" className="text-lg font-semibold">
            Sleep Duration (hours)
          </Label>
          <Input
            id="sleep"
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={sleepDuration}
            onChange={(e) => setSleepDuration(e.target.value)}
            placeholder="e.g., 7.5"
            className="text-lg h-12 transition-all duration-300 focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <Label htmlFor="notes" className="text-lg font-semibold">
            Daily Notes
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How was your day? Any thoughts or reflections..."
            className="min-h-32 resize-none text-base transition-all duration-300 focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          Save Daily Log
        </Button>
      </div>
    </Card>
  );
};

export default DailyLog;
