import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Brain, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

// Updated to match your SQL column names
interface Question {
  questionID: number;
  questionText: string;
}

interface AnswerEntry {
  questionID: number;
  answer: string;
}

const PatientQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState<AnswerEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Safely parse user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const patientID = user.userID

  // 1. Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!patientID) return;
      
      try {
        const res = await fetch(`http://localhost:5000/questions/patient/${patientID}`);
        const data = await res.json();
        
        if (data.success && data.data) {
          setQuestions(data.data);
        }
      } catch (err) {
        toast({
          title: "Error fetching questions",
          description: "Please check your server connection.",
          variant: "destructive",
        });
      }
    };
    fetchQuestions();
  }, [patientID]);

  // 2. Handle Navigation and Submission
  const handleNext = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Answer required",
        description: "Please write an answer before continuing.",
        variant: "destructive",
      });
      return;
    }

    const newAnswerEntry = { 
      questionID: questions[currentIndex].questionID, 
      answer: currentAnswer 
    };

    // Update local list of answers
    const updatedAnswers = [...answers, newAnswerEntry];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // If it's the last question, submit the updated list immediately
      submitAnswers(updatedAnswers);
    }
  };

  // 3. Submit to Backend
  const submitAnswers = async (finalAnswers: AnswerEntry[]) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/questions/patient/${patientID}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Progress Saved",
          description: "Your responses have been successfully recorded.",
        });
        setSubmitted(true);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Could not save answers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Render States ---

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
        <p className="text-muted-foreground">Loading personalized questions...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center space-y-4 shadow-xl animate-in fade-in zoom-in duration-300">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Session Complete</h2>
          <p className="text-muted-foreground">
            Thank you for checking in. Your counselor will review your responses to better support your journey.
          </p>
          <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-slate-50/50">
      <div className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Daily Reflection
          </h1>
          <p className="text-slate-500">
            Take a moment to check in with yourself.
          </p>
        </div>

        {/* Question Card */}
        <Card className="p-6 md:p-10 border-none shadow-2xl bg-white/90 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-6 rounded-full transition-all ${i <= currentIndex ? 'bg-primary' : 'bg-slate-200'}`} 
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800 flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                {questions[currentIndex].questionText}
              </h2>

              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your thoughts here..."
                className="min-h-[200px] text-lg p-4 bg-slate-50 border-slate-200 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>

            <Button
              onClick={handleNext}
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : currentIndex === questions.length - 1 ? (
                "Finish & Submit"
              ) : (
                "Next Question"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientQuestions;