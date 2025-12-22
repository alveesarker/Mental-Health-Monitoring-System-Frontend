import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Brain, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

// -------------------- Types --------------------
interface Question {
  questionID: number;
  questionText: string;
  type: string;
}

interface AnswerEntry {
  questionID: number;
  answer: string;
}

// -------------------- Component --------------------
const PatientQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState<AnswerEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Safe user parsing
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const patientID = user?.userID;

  // -------------------- Fetch Questions --------------------
  useEffect(() => {
    if (!patientID) return;

    const fetchQuestions = async () => {
      try {
        setFetching(true);

        const res = await fetch(
          `http://localhost:5000/questions/patient/${patientID}`
        );
        const data = await res.json();

        if (data.success && Array.isArray(data.data?.questions)) {
          setQuestions(data.data.questions);
        } else {
          throw new Error("Invalid questions format");
        }
      } catch (err) {
        toast({
          title: "Error fetching questions",
          description: "Please check your server connection.",
          variant: "destructive",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchQuestions();
  }, [patientID]);

  // -------------------- Next / Submit --------------------
  const handleNext = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Answer required",
        description: "Please write an answer before continuing.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: AnswerEntry = {
      questionID: questions[currentIndex].questionID,
      answer: currentAnswer,
    };

    const updatedAnswers = [...answers, newEntry];
    setAnswers(updatedAnswers);
    setCurrentAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitAnswers(updatedAnswers);
    }
  };

  // -------------------- Submit Answers --------------------
  const submitAnswers = async (finalAnswers: AnswerEntry[]) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/questions/patient/${patientID}/answers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: finalAnswers }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Progress Saved",
          description: "Your responses have been recorded.",
        });
        setSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Could not save answers. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Render States --------------------
  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No questions available.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Session Complete</h2>
          <p className="text-muted-foreground">
            Your counselor will review your responses.
          </p>
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full"
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // -------------------- Main UI --------------------
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50/50">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">Daily Reflection</h1>
          <p className="text-slate-500">
            Take a moment to check in with yourself.
          </p>
        </div>

        <Card className="p-8 shadow-xl bg-white">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-primary">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            <h2 className="text-xl font-semibold flex gap-2">
              <Sparkles className="text-amber-400" />
              {questions[currentIndex].questionText}
            </h2>

            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your thoughts here..."
              className="min-h-[180px]"
            />

            <Button
              onClick={handleNext}
              className="w-full h-12 text-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
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
