import { Recommendation, recommendations } from "@/data/recommendations";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { RecommendationCard } from "../components/recommendation/RecommendationCard";
import { RecommendationDialog } from "../components/recommendation/RecommendationDialog";

const RecommendationPage = () => {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation | null>(null);

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
            Based on your wellness profile, here are tailored recommendations to
            help you thrive
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              icon={recommendation.icon}
              title={recommendation.title}
              description={recommendation.description}
              colorClass={recommendation.colorClass}
              onViewDetails={() => setSelectedRecommendation(recommendation)}
            />
          ))}
        </div>

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
          icon={selectedRecommendation.icon}
          title={selectedRecommendation.title}
          description={selectedRecommendation.description}
          fullDescription={selectedRecommendation.fullDescription}
          colorClass={selectedRecommendation.colorClass}
        />
      )}
    </div>
  );
};

export default RecommendationPage;
