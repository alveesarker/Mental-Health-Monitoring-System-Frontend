import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowLeft, Brain } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface AnalysisData {
  id: string;
  sentiment: string;
  confidence: number;
  topics: string[];
  summary: string;
  timestamp: string;
}

interface UserAnalysis {
  userId: string;
  userName: string;
  analyses: AnalysisData[];
}

const mockUserAnalyses: Record<string, UserAnalysis> = {
  USR001: {
    userId: "USR001",
    userName: "Alice Johnson",
    analyses: [
      {
        id: "AN001",
        sentiment: "Positive",
        confidence: 0.92,
        topics: ["Product Feedback", "User Experience", "Feature Request"],
        summary:
          "User expressed high satisfaction with the product's ease of use and requested additional customization options.",
        timestamp: "2024-01-15T10:30:00",
      },
      {
        id: "AN002",
        sentiment: "Positive",
        confidence: 0.88,
        topics: ["Customer Success", "Onboarding"],
        summary:
          "User completed onboarding successfully and shared positive feedback about the tutorial system.",
        timestamp: "2024-01-10T14:20:00",
      },
      {
        id: "AN003",
        sentiment: "Neutral",
        confidence: 0.75,
        topics: ["General Inquiry", "Pricing"],
        summary:
          "User inquired about enterprise pricing options and scalability features.",
        timestamp: "2024-01-05T09:15:00",
      },
    ],
  },
  USR002: {
    userId: "USR002",
    userName: "Bob Smith",
    analyses: [
      {
        id: "AN004",
        sentiment: "Neutral",
        confidence: 0.78,
        topics: ["Technical Support", "Bug Report"],
        summary:
          "User reported a minor bug in the dashboard loading sequence. Issue was acknowledged and being tracked.",
        timestamp: "2024-01-14T15:45:00",
      },
      {
        id: "AN005",
        sentiment: "Negative",
        confidence: 0.82,
        topics: ["Technical Support", "Performance"],
        summary:
          "User experiencing slow load times during peak hours. Investigation ongoing.",
        timestamp: "2024-01-12T11:30:00",
      },
    ],
  },
  USR003: {
    userId: "USR003",
    userName: "Carol White",
    analyses: [
      {
        id: "AN006",
        sentiment: "Positive",
        confidence: 0.88,
        topics: ["Customer Success", "Integration"],
        summary:
          "User successfully integrated the API and praised the documentation quality. Minimal support needed.",
        timestamp: "2024-01-13T09:20:00",
      },
    ],
  },
};

const AdminDailyLogsDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisData | null>(
    null
  );

  const userAnalysis = userId ? mockUserAnalyses[userId] : null;

  if (!userAnalysis) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Data Found</CardTitle>
            <CardDescription>
              No AI analysis data available for this user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/ai-analysis")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-success text-success-foreground";
      case "negative":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getSentimentVariant = (
    sentiment: string
  ): "default" | "secondary" | "destructive" => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "default";
      case "negative":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/ai-analysis")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Daily Logs History
            </h1>
            <p className="text-sm text-muted-foreground">
              {userAnalysis.userName} • User ID: {userId}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Records</CardTitle>
            <CardDescription>
              {userAnalysis.analyses.length} Daily Logs record
              {userAnalysis.analyses.length !== 1 ? "s" : ""} found for this
              user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Log ID</TableHead>
                    <TableHead className="font-semibold">Date & Time</TableHead>
                    <TableHead className="font-semibold">Mood</TableHead>
                    <TableHead className="font-semibold">Stress Level</TableHead>
                    <TableHead className="font-semibold">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userAnalysis.analyses.map((analysis) => (
                    <TableRow
                      key={analysis.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {analysis.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {format(
                              new Date(analysis.timestamp),
                              "MMM dd, yyyy"
                            )}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(analysis.timestamp), "HH:mm:ss")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getSentimentVariant(analysis.sentiment)}
                        >
                          {analysis.sentiment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${analysis.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {(analysis.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {analysis.topics.slice(0, 2).map((topic, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                          {analysis.topics.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{analysis.topics.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDailyLogsDetails;
