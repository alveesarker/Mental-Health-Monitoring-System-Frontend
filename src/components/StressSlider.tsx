import { Slider } from "@/components/ui/slider";

interface StressSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const getStressColor = (value: number) => {
  if (value <= 3) return "bg-success";
  if (value <= 6) return "bg-warning";
  return "bg-destructive";
};

const getStressLabel = (value: number) => {
  if (value <= 3) return "Low Stress";
  if (value <= 6) return "Moderate Stress";
  return "High Stress";
};

export const StressSlider = ({ value, onChange }: StressSliderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          Stress Level
          <span className="text-xs text-muted-foreground">(optional)</span>
        </label>
        <span
          className={cn(
            "text-sm font-semibold px-3 py-1 rounded-full",
            getStressColor(value)
          )}
        >
          {value}/10 - {getStressLabel(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        max={10}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Calm 😌</span>
        <span>Stressed 😰</span>
      </div>
    </div>
  );
};

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");
