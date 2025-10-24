import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Brain,
  Heart,
  MessageCircleHeart,
  TrendingUp,
} from "lucide-react";

interface AnalysisData {
  emotion: string;
  sentiment: number;
  topics: string[];
  riskLevel: "low" | "moderate" | "high";
  message: string;
}

interface AnalysisResultProps {
  analysis: AnalysisData;
  onSave?: () => void;
  onViewTrends?: () => void;
  onCounselor?: () => void;
  onNextQuestion?: () => void;
}

const emotionConfig = {
  happy: { color: "emotion-happy", icon: "😊", label: "Happy" },
  calm: { color: "emotion-calm", icon: "😌", label: "Calm" },
  sad: { color: "emotion-sad", icon: "😢", label: "Sad" },
  anxious: { color: "emotion-anxious", icon: "😰", label: "Anxious" },
  angry: { color: "emotion-angry", icon: "😡", label: "Frustrated" },
  neutral: { color: "muted", icon: "😐", label: "Neutral" },
};

const riskConfig = {
  low: { color: "success", label: "Low Risk", icon: "✓" },
  moderate: { color: "warning", label: "Moderate", icon: "⚠" },
  high: { color: "destructive", label: "Needs Attention", icon: "!" },
};

export const AnalysisResult = ({
  analysis,
  onSave,
  onViewTrends,
  onCounselor,
  onNextQuestion,
}: AnalysisResultProps) => {
  const emotion =
    emotionConfig[
      analysis.emotion.toLowerCase() as keyof typeof emotionConfig
    ] || emotionConfig.neutral;
  const risk = riskConfig[analysis.riskLevel];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-8 card-soft bg-card/80 backdrop-blur">
        <div className="space-y-6">
          {/* Emotion Detection */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Detected Emotion</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-3xl">{emotion.icon}</span>
                <span className="text-2xl font-semibold text-foreground">
                  {emotion.label}
                </span>
              </div>
            </div>
          </div>

          {/* Sentiment Score */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-accent/20 to-success/20">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Sentiment Score</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${(analysis.sentiment / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xl font-semibold text-foreground">
                  {analysis.sentiment.toFixed(1)}/5.0
                </span>
              </div>
            </div>
          </div>

          {/* Topics */}
          {analysis.topics.length > 0 && (
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 mt-1">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  Key Topics Identified
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.topics.map((topic, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="text-sm px-3 py-1"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Risk Level */}
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-full bg-${risk.color}/20`}>
              <AlertCircle className={`w-6 h-6 text-${risk.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Mental Health Status
              </p>
              <Badge
                className={`mt-1 bg-${risk.color} text-card-foreground text-base px-4 py-1`}
              >
                {risk.icon} {risk.label}
              </Badge>
            </div>
          </div>

          {/* AI Message */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💛</span>
              <div>
                <p className="text-sm font-medium text-primary mb-2">
                  Your AI Companion says:
                </p>
                <p className="text-foreground leading-relaxed italic">
                  {analysis.message}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              onClick={onNextQuestion}
            //   variant="hero"
              size="lg"
              className="flex-1 min-w-[180px]"
            >
              Next Question
            </Button>
            <Button
              onClick={onSave}
              variant="secondary"
              size="lg"
              className="flex-1 min-w-[180px]"
            >
              Save Analysis
            </Button>
            <Button
              onClick={onCounselor}
              variant="outline"
              size="lg"
              className="flex-1 min-w-[180px]"
            >
              <MessageCircleHeart className="w-4 h-4" />
              Talk to Counselor
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
