import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Moon, Sparkles } from "lucide-react";

const recommendations = [
  {
    icon: Brain,
    title: "Try a 10-minute Meditation",
    description: "Based on your moderate stress level",
    color: "text-blue-500",
    bgColor: "from-blue-100/60 to-blue-200/40",
  },
  {
    icon: Moon,
    title: "Review Sleep Hygiene Tips",
    description: "Optimize your 7.5 hours of sleep",
    color: "text-indigo-500",
    bgColor: "from-indigo-100/60 to-indigo-200/40",
  },
  {
    icon: BookOpen,
    title: "Journal Your Stressors",
    description: "Reflect on what's causing stress",
    color: "text-emerald-500",
    bgColor: "from-emerald-100/60 to-emerald-200/40",
  },
  {
    icon: BookOpen,
    title: "Journal Your Stressors",
    description: "Reflect on what's causing stress",
    color: "text-emerald-500",
    bgColor: "from-emerald-100/60 to-emerald-200/40",
  },
  {
    icon: BookOpen,
    title: "Journal Your Stressors",
    description: "Reflect on what's causing stress",
    color: "text-emerald-500",
    bgColor: "from-emerald-100/60 to-emerald-200/40",
  },
];

export function RecommendationsCard() {
  return (
    <div className="bg-gradient-to-br from-white/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 w-[890px] shadow-md border border-border transition-all duration-300">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          Suggested Activities
        </h2>
      </div>

      <div className="space-y-3 flex items-center justify-between gap-2">
        {recommendations.map((rec, index) => (
          <Button
            key={index}
            variant="outline"
            className={`relative w-[270px] h-[180px] mt-3 p-3 flex flex-col items-start justify-start rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden`}
          >
            {/* subtle background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${rec.bgColor} opacity-60 group-hover:opacity-80 transition-all`}
            ></div>

            {/* icon */}
            <div
              className={`relative z-10 ${rec.color} bg-white/70 p-3 rounded-xl shadow-inner flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}
            >
              <rec.icon className="w-6 h-6" />
            </div>

            {/* text */}
            <div className="relative z-10 flex-1 text-left">
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary text-wrap transition-colors">
                {rec.title}
              </h3>
              <p className="text-sm text-muted-foreground text-wrap leading-snug">
                {rec.description}
              </p>
            </div>

            {/* soft glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
          </Button>
        ))}
      </div>
    </div>
  );
}
