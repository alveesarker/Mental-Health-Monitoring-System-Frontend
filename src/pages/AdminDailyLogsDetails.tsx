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
import { ArrowLeft, Brain, Eye } from "lucide-react";
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
              No daily log data available for this user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/admin/ai-analysis")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            onClick={() => navigate("/admin/daily-logs")}
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
            <CardTitle>Recent Daily Submissions</CardTitle>
            <CardDescription>
              Latest mood and wellness entries from this user
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Feeling</TableHead>
                    <TableHead className="font-semibold">Stress Level</TableHead>
                    <TableHead className="font-semibold">Sleep (hrs)</TableHead>
                    <TableHead className="font-semibold">Daily Notes</TableHead>
                    <TableHead className="font-semibold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {userAnalysis.analyses.map((log) => (
                    <TableRow
                      key={log.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* DATE */}
                      <TableCell className="text-muted-foreground">
                        {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm")}
                      </TableCell>

                      {/* FEELING */}
                      <TableCell>
                        <Badge variant={getSentimentVariant(log.sentiment)}>
                          {log.sentiment}
                        </Badge>
                      </TableCell>

                      {/* STRESS LEVEL */}
                      <TableCell>
                        <span className="font-semibold text-primary">
                          {(log.confidence * 10).toFixed(1)}/10
                        </span>
                      </TableCell>

                      {/* SLEEP – mock value */}
                      <TableCell className="text-muted-foreground">
                        {Math.floor(log.confidence * 8) + 4}
                      </TableCell>

                      {/* DAILY NOTES */}
                      <TableCell className="max-w-md">
                        <p className="text-sm text-muted-foreground truncate">
                          {log.summary}
                        </p>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => setSelectedAnalysis(log)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
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
