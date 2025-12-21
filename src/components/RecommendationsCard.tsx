import { Button } from "@/components/ui/button";
import {
  Activity,
  BatteryCharging,
  Bed,
  Brain,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Type for recommendation
interface Recommendation {
  recommendationID: number;
  type: string;
  title: string;
  description: string;
  priority?: number;
  colorClass?: string; // optional, can be generated
}

export function RecommendationsCard() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch delivered recommendations for the logged-in patient
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // Replace with your actual patientID or get from auth context
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const res = await fetch(
          `http://localhost:5000/d-reco/patient/${user.userID}`
        );
        if (!res.ok) throw new Error("Failed to fetch recommendations");

        const data: Recommendation[] = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);
  const navigate = useNavigate();

  const getColorClass = (type: string) => {
    switch (type) {
      case "Sleep":
        return "bg-blue-300 text-blue-800";
      case "Stress":
        return "bg-red-300 text-red-800";
      case "Mood":
        return "bg-yellow-300 text-yellow-800";
      case "Energy":
        return "bg-green-300 text-green-800";
      case "Depression":
        return "bg-purple-300 text-purple-800";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case "Sleep":
        return Bed;

      case "Stress":
        return Brain;

      case "Mood":
        return HeartPulse;

      case "Energy":
        return BatteryCharging;

      case "Depression":
        return Activity;

      default:
        return Sparkles;
    }
  };
  return (
    <div className="bg-gradient-to-br from-white/90 to-background/60 backdrop-blur-sm rounded-2xl p-6 w-[890px] shadow-md border border-border transition-all duration-300">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          Suggested Activities
        </h2>
      </div>

      <div className="space-y-3 flex items-center justify-between gap-2">
        {recommendations.slice(0, 4).map((rec, index) => {
          const Icon = getIconByType(rec.type);

          return (
            <Button
              key={rec.recommendationID}
              variant="outline"
              className="relative w-[270px] h-[180px] mt-3 p-3 flex flex-col items-start justify-start rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
              onClick={() => navigate("/recommendation")}
            >
              {/* background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getColorClass(
                  rec.type
                )} opacity-60 group-hover:opacity-80`}
              />

              {/* icon */}
              <div className="relative z-10 bg-white/70 p-3 rounded-xl mb-2 transition-transform group-hover:scale-110">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              {/* text */}
              <div className="relative z-10 flex-1 text-left">
                <h3 className="font-semibold mb-1">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {rec.description}
                </p>
              </div>

              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100" />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
