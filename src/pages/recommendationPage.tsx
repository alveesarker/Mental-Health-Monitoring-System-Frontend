
import { useEffect, useState } from "react";
import { RecommendationCard } from "../components/recommendation/RecommendationCard";
import { RecommendationDialog } from "../components/recommendation/RecommendationDialog";
import {
  Sparkles,
  Bed,
  Brain,
  Activity,
  BatteryCharging,
  HeartPulse
} from "lucide-react";


// Type for recommendation
interface Recommendation {
  recommendationID: number;
  type: string;
  title: string;
  description: string;
  priority?: number;
  colorClass?: string; // optional, can be generated
}




const RecommendationPage = () => {
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

  

  // Optional: assign color classes based on type or randomly
  const getColorClass = (type: string) => {
    switch (type) {
      case "Sleep":
        return "bg-blue-100 text-blue-800";
      case "Stress":
        return "bg-red-100 text-red-800";
      case "Mood":
        return "bg-yellow-100 text-yellow-800";
      case "Energy":
        return "bg-green-100 text-green-800";
      case "Depression":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Personalized For You
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Suggested Activities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your wellness profile, here are some recommendations to
            help you thrive
          </p>
        </div>

        {/* Recommendations Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No recommendations available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.recommendationID}
                icon= {getIconByType(recommendation.type)}// you can add icons based on type
                title={recommendation.title}
                description={recommendation.description}
                colorClass={getColorClass(recommendation.type)}
                onViewDetails={() => setSelectedRecommendation(recommendation)}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Activities update daily based on your progress and wellness metrics
          </p>
        </div>
      </div>

      {/* Dialog */}
      {selectedRecommendation && (
        <RecommendationDialog
          open={!!selectedRecommendation}
          onOpenChange={(open) => !open && setSelectedRecommendation(null)}
          icon={getIconByType(selectedRecommendation.type)}
          title={selectedRecommendation.title}
          description={selectedRecommendation.description}
          colorClass={getColorClass(selectedRecommendation.type)}
        />
      )}
    </div>
  );
};

export default RecommendationPage;
