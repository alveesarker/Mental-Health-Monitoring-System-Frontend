// src/pages/SessionDetailsPage.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Star,
  User,
  UserSquare2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Session } from "./SessionManagement";

interface SessionDetailsPageProps {
  sessions?: Session[];
}

const mockSessions: Session[] = [
  {
    id: "SES-001",
    userName: "Sarah Johnson",
    counsellor: "Dr. Robert Wilson",
    specialization: "Anxiety & Depression",
    dateTime: "2025-11-03T14:00:00",
    status: "upcoming",
    progress: 75,
  },
  {
    id: "SES-002",
    userName: "Michael Chen",
    counsellor: "Dr. Emily Carter",
    specialization: "Stress Management",
    dateTime: "2025-11-01T10:30:00",
    status: "completed",
    feedback: "Very helpful session, great insights",
    rating: 5,
    progress: 100,
  },
  {
    id: "SES-003",
    userName: "Jessica Martinez",
    counsellor: "Dr. David Thompson",
    specialization: "Relationship Counseling",
    dateTime: "2025-11-01T15:00:00",
    status: "ongoing",
    progress: 45,
  },
  {
    id: "SES-004",
    userName: "Alex Kumar",
    counsellor: "Dr. Robert Wilson",
    specialization: "Career Guidance",
    dateTime: "2025-10-28T11:00:00",
    status: "cancelled",
    progress: 0,
  },
];

const SessionDetailsPage = ({
  sessions = mockSessions,
}: SessionDetailsPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const session = sessions.find((s) => s.id === id);

  if (!session) {
    return (
      <div className="p-6">
        <p className="text-lg font-semibold">Session not found</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-800",
    ongoing: "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Session Details</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive information about session{" "}
            <span className="font-medium">{session.id}</span>
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Session Overview</span>
            <Badge className={`${statusColors[session.status]} capitalize`}>
              {session.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>User:</strong> {session.userName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserSquare2 className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Counsellor:</strong> {session.counsellor}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Specialization:</strong> {session.specialization}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Date & Time:</strong>{" "}
              {new Date(session.dateTime).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Rating */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-medium">{session.progress}%</span>
            </div>
            <Progress value={session.progress} className="h-2" />
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Feedback & Rating</CardTitle>
          </CardHeader>
          <CardContent>
            {session.rating ? (
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < session.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{session.rating}/5</span>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No rating provided
              </p>
            )}

            {session.feedback && (
              <p className="italic text-sm mt-3 bg-muted/50 p-3 rounded-md border">
                “{session.feedback}”
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4">
        <Button className="px-6">Export Report</Button>
      </div>
    </div>
  );
};

export default SessionDetailsPage;
