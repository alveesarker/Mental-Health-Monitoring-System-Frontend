import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GiveFeedbackPage() {
  const { id } = useParams(); // sessionID
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comfort, setComfort] = useState(3);
  const [clarity, setClarity] = useState(3);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFeedback = async () => {
    try {
      setLoading(true);
console.log(id)
      await fetch("http://localhost:5000/ratings", {
        method: "POST", // PUT for update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionID: id,
          rating,
          comfortLevel: comfort,
          clarityLevel: clarity,
          comment,
        }),
      });

      navigate(-1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-6">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Share Your Feedback
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Your feedback helps improve future sessions
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ⭐ Rating */}
          <div className="text-center space-y-2">
            <p className="font-medium">Overall Rating</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i)}
                  className={`h-8 w-8 cursor-pointer transition ${
                    i <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Comfort Level */}
          <div>
            <p className="font-medium mb-2">
              Comfort Level: <span className="text-primary">{comfort}</span>/5
            </p>
            <Slider
              value={[comfort]}
              min={1}
              max={5}
              step={1}
              onValueChange={(v) => setComfort(v[0])}
            />
          </div>

          {/* Clarity Level */}
          <div>
            <p className="font-medium mb-2">
              Clarity Level: <span className="text-primary">{clarity}</span>/5
            </p>
            <Slider
              value={[clarity]}
              min={1}
              max={5}
              step={1}
              onValueChange={(v) => setClarity(v[0])}
            />
          </div>

          {/* Comment */}
          <div>
            <p className="font-medium mb-2">Comment</p>
            <Textarea
              placeholder="Write your experience here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit */}
          <Button
            disabled={rating === 0 || loading}
            onClick={submitFeedback}
            className="w-full"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
