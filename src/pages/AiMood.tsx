import { AnalysisResult } from "@/components/AnalysisResult";
import { MoodSelector } from "@/components/MoodSelector";
import { StressSlider } from "@/components/StressSlider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Brain, Sparkles } from "lucide-react";
import { useState } from "react";

interface AnalysisResultType {
  emotion: string;
  sentiment: number;
  topics: string[];
  riskLevel: "low" | "moderate" | "high";
  message: string;
}

const QUESTIONS = [
  "What's been on your mind today?",
  "Describe a moment you felt grateful today.",
  "Have you faced any challenges recently?",
  "What made you feel happy today?",
  "Is there something you want to improve in your day-to-day life?",
  "How are you feeling emotionally right now?",
];

const AiMood = () => {
  const [thoughts, setThoughts] = useState("");
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState(5);
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Loading animation flag
  const [analysis, setAnalysis] = useState<AnalysisResultType | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setThoughts("");
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      toast({
        title: "Maximum Questions Reached",
        description: "You have reached the last question.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAnswer = () => {
    if (!thoughts.trim()) {
      toast({
        title: "Answer required",
        description: "You must type an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    setAnswers((prev) => [...prev, thoughts]);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setThoughts("");
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Last question submitted → trigger analysis with loading animation
      handleAnalyze();
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const mockAnalysis: AnalysisResultType = {
        emotion: ["happy", "calm", "sad", "anxious"][
          Math.floor(Math.random() * 4)
        ],
        sentiment: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        topics: ["Work", "Relationships", "Self-care"].slice(
          0,
          Math.floor(Math.random() * 3) + 1
        ),
        riskLevel: stress > 7 ? "high" : stress > 4 ? "moderate" : "low",
        message:
          "You seem to be processing a lot of emotions right now. Remember that it's completely normal to have ups and downs. Taking time to reflect like this is a positive step. Consider reaching out to someone you trust or engaging in an activity that brings you peace. You're doing great by checking in with yourself 💛",
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: "Your emotional insight is ready",
      });
    }, 2000);
  };

  const handleSave = () => {
    toast({
      title: "Analysis Saved",
      description: "Your emotional data has been saved to your profile",
    });
  };

  const handleViewTrends = () => {
    toast({
      title: "Coming Soon",
      description: "Emotional trends feature will be available soon",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 animate-glow-pulse">
              <Brain className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            AI Mood & Thought Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reflect, express, and let AI understand your emotions. A safe space
            for your thoughts.
          </p>
        </div>

        {/* Main Input Card */}
        {!analysis && (
          <Card className="p-6 md:p-8 card-soft bg-card/80 backdrop-blur">
            <div className="space-y-6">
              {/* Question Progress */}
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {QUESTIONS.length}
              </p>

              {/* Thoughts Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  {QUESTIONS[currentQuestionIndex]}
                  <Sparkles className="w-4 h-4 text-accent" />
                </label>
                <Textarea
                  value={thoughts}
                  onChange={(e) => setThoughts(e.target.value)}
                  placeholder="Write your answer here..."
                  className="min-h-[160px] text-base resize-none bg-background/50 border-2 focus:border-primary transition-colors"
                />
              </div>

              {/* Mood Selector */}
              <MoodSelector value={mood} onChange={setMood} />

              {/* Stress Slider */}
              <StressSlider value={stress} onChange={setStress} />

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={handleNext}
                  variant="outline"
                  className="flex-1 text-lg h-14"
                  disabled={isAnalyzing}
                >
                  Next Question
                </Button>

                <Button
                  onClick={handleSubmitAnswer}
                  size="lg"
                  className="flex-1 text-lg h-14"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    "Submit Answer"
                  )}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        {analysis && (
          <AnalysisResult
            analysis={analysis}
            onSave={handleSave}
            onViewTrends={handleViewTrends}
          />
        )}
      </div>
    </div>
  );
};

export default AiMood;
