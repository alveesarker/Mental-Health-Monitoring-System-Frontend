import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export function WellbeingScoreCard() {
  const score = 68; // This would come from AI analysis
  const trend = "up"; // "up", "down", or "stable"
  const change = "+5";

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 70) return "from-success/20 to-success/5";
    if (score >= 40) return "from-warning/20 to-warning/5";
    return "from-destructive/20 to-destructive/5";
  };

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Mental Wellbeing Score
      </h3>

      <div
        className={`bg-gradient-to-br ${getScoreBackground(
          score
        )} rounded-xl p-6 mb-4`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-5xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}
            </div>
            <p className="text-sm text-muted-foreground">Out of 100</p>
          </div>

          <div className={`flex items-center gap-1 ${getScoreColor(score)}`}>
            <TrendIcon className="w-5 h-5" />
            <span className="text-lg font-semibold">{change}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Your wellbeing score is calculated based on your mood, stress levels,
        sleep patterns, and daily notes.
      </p>
    </div>
  );
}
