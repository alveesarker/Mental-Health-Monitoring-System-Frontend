import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, MessageSquare, Phone, Wind } from "lucide-react";
import ActionButton from "../components/emergencySupport/ActionButton";
import BreathingCircle from "../components/emergencySupport/BreathingCircle";
import CopingExercises from "../components/emergencySupport/CopingExercises";
import CounsellorCard from "../components/emergencySupport/CounsellorCard";

const Crisis = () => {
  // Simulated AI detection - in real app this would come from props/context
  const hasDetectedDistress = true;

  const handleCallHotline = () => {
    // In real app, this would trigger actual phone call or show number
    window.open("tel:988", "_self");
  };

  const handleMessageCounsellor = () => {
    // Navigate to messaging interface
    console.log("Opening counsellor chat...");
  };

  const handleCalmingExercise = () => {
    // Scroll to breathing exercise
    document
      .getElementById("breathing")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-calm relative overflow-hidden">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/20" />

      {/* Content */}
      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 space-y-3 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            We're Here for You
          </h1>
          <p className="text-lg text-foreground/80 max-w-md mx-auto">
            You're not alone. Help is available right now.
          </p>
        </div>

        {/* AI Detected Insight - Optional */}
        {hasDetectedDistress && (
          <Alert
            className="mb-6 border-accent/30 bg-card/80 backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription className="text-sm text-foreground/80">
              We noticed some signs of distress in your recent entries.
              Remember, reaching out is a sign of strength.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Action Card */}
        <Card
          className="mb-6 border-border/50 shadow-lg bg-card/80 backdrop-blur-sm animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="text-center pb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Get Immediate Support
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose the option that feels right for you
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <ActionButton
              icon={Phone}
              label="Call Crisis Hotline (988)"
              onClick={handleCallHotline}
              variant="default"
            />
            <ActionButton
              icon={MessageSquare}
              label="Message My Counsellor"
              onClick={handleMessageCounsellor}
              variant="secondary"
            />
            <ActionButton
              icon={Wind}
              label="Try Calming Exercise"
              onClick={handleCalmingExercise}
              variant="outline"
            />
          </CardContent>
        </Card>

        {/* Breathing Exercise */}
        <Card
          id="breathing"
          className="mb-6 border-border/50 shadow-sm bg-card/80 backdrop-blur-sm animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Take a Moment to Breathe
            </h3>
          </CardHeader>
          <CardContent>
            <BreathingCircle />
          </CardContent>
        </Card>

        {/* Counsellor Card */}
        <div className="mb-6">
          <CounsellorCard />
        </div>

        {/* Coping Exercises */}
        <CopingExercises />

        {/* Footer Note */}
        <div
          className="mt-8 text-center text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <p>
            If you're in immediate danger, please call emergency services (911)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Crisis;
