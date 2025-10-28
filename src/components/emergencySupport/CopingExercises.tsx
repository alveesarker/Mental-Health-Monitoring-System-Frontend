import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const exercises = [
  {
    title: "5-4-3-2-1 Grounding",
    description:
      "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
  },
  {
    title: "Square Breathing",
    description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
  },
  {
    title: "Safe Place Visualization",
    description:
      "Close your eyes and imagine a place where you feel completely safe and calm",
  },
];

const CopingExercises = () => {
  return (
    <Card
      className="border-border/50 shadow-sm animate-fade-in"
      style={{ animationDelay: "0.5s" }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Quick Grounding Exercises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="space-y-1">
            <h4 className="font-medium text-sm text-foreground">
              {exercise.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {exercise.description}
            </p>
          </div>
        ))}
        <div className="pt-4 mt-4 border-t border-border/50">
          <p className="text-sm text-primary/80 italic">
            "You are stronger than you think. This moment will pass."
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CopingExercises;
