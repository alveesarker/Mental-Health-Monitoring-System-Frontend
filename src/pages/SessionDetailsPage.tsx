import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SessionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        `http://localhost:5000/sessions/session-details/${id}`
      );
      const data = await res.json();
      setSession(data);
      console.log(data);
    };
    load();
  }, [id]);

  if (!session) return <p className="p-6">Loading...</p>;

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const progressItems = [
    { label: "Stability", value: session.stabilityScore },
    { label: "Stress Level", value: session.stressScore },
    { label: "Depression Level", value: session.depressionLevel },
    { label: "Work Performance", value: session.workPerformanceScore },
    { label: "Energy Level", value: session.energyLevel },
    { label: "Fatigue Level", value: session.fatigueLevel },
  ];

  function to12Hour(time24) {
    if (!time24) return "-";
    // Accept "HH:MM:SS" or "HH:MM"
    const parts = time24.split(":");
    if (parts.length < 2) return time24;
    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return "-";
    // if dateTime is a plain date string like "2025-12-06", Date will parse OK
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return dateTime;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Session Details</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      {/* Session Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Session Overview</span>
            <Badge className={`${statusColors[session.status]} capitalize`}>
              {session.status}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Patient:</strong> {session.patientName}
          </p>
          <p>
            <strong>Counsellor:</strong> {session.counsellorName}
          </p>
          <p>
            <strong>Type:</strong>{" "}
            {session.sessionType || (session.link ? "Online" : "Offline")}
          </p>
          <p>
            <strong>Duration:</strong> {session.duration} min
          </p>
          <p>
            <strong>Date:</strong> {formatDateTime(session.sessionDate)}
          </p>
          <p>
            <strong>Time:</strong> {to12Hour(session.sessionTime)}
          </p>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progressItems.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <Progress value={item.value} />
            </div>
          ))}

          {/* Other Symptoms */}
          <div className="mt-4 p-3 bg-muted rounded-md text-sm">
            <p>
              <strong>Sleep Consistency:</strong> {session.sleepConsistency}
            </p>
            <p>
              <strong>Dizziness:</strong> {session.dizziness}
            </p>
            <p>
              <strong>Nausea:</strong> {session.nausea}
            </p>
          </div>

          {/* Notes */}
          {session.progressNote && (
            <div className="mt-4 p-4 border rounded-md bg-muted">
              <p className="italic">“{session.progressNote}”</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Rating & Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {session.rating ? (
            <>
              <div className="flex items-center gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < session.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-3 text-sm">
                <p>
                  <strong>Comfort Level:</strong> {session.comfortLevel}/5
                </p>
                <p>
                  <strong>Clarity Level:</strong> {session.clarityLevel}/5
                </p>
              </div>

              {session.ratingComment && (
                <p className="mt-4 italic bg-muted/50 p-3 rounded-md">
                  “{session.ratingComment}”
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No rating available</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Export Report</Button>
      </div>
    </div>
  );
}
