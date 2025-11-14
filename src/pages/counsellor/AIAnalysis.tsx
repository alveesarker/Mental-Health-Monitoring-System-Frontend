import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";

const AIAnalysis = () => {
  const analyses = [
    {
      id: 1,
      userName: "Sarah Johnson",
      moodPattern: "Consistently Positive",
      riskPrediction: "Low",
      trend: "Stable improvement",
      suggestions: "Continue current coping strategies. Consider group therapy for peer support.",
      lastUpdated: "2024-11-14",
    },
    {
      id: 2,
      userName: "Michael Chen",
      moodPattern: "Declining",
      riskPrediction: "High",
      trend: "Worsening rapidly",
      suggestions: "Immediate intervention recommended. Increase session frequency to twice weekly. Consider medication review.",
      lastUpdated: "2024-11-14",
    },
    {
      id: 3,
      userName: "Emma Davis",
      moodPattern: "Improving",
      riskPrediction: "Low",
      trend: "Positive trajectory",
      suggestions: "Excellent progress. Maintain current treatment plan. Introduce mindfulness exercises.",
      lastUpdated: "2024-11-14",
    },
    {
      id: 4,
      userName: "James Wilson",
      moodPattern: "Fluctuating",
      riskPrediction: "Medium",
      trend: "Inconsistent patterns",
      suggestions: "Monitor closely for triggers. Recommend daily mood tracking. Consider stress management workshops.",
      lastUpdated: "2024-11-13",
    },
    {
      id: 5,
      userName: "Olivia Martinez",
      moodPattern: "Declining",
      riskPrediction: "Medium",
      trend: "Gradual decline",
      suggestions: "Early intervention needed. Explore family therapy options. Review medication effectiveness.",
      lastUpdated: "2024-11-14",
    },
  ];

  const getPatternColor = (pattern: string) => {
    if (pattern.includes("Positive") || pattern === "Improving") return "text-success";
    if (pattern === "Fluctuating") return "text-warning";
    return "text-destructive";
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "high":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">AI Analysis</h2>
        <p className="text-muted-foreground mt-1">AI-powered insights and predictions for your assigned users</p>
      </div>

      <Card className="bg-accent/10 border-accent">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-accent" />
            <CardTitle className="text-accent">AI-Powered Insights</CardTitle>
          </div>
          <CardDescription>
            Advanced machine learning algorithms analyze user patterns to predict risk levels and suggest interventions
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Overview</CardTitle>
          <CardDescription>Comprehensive AI analysis of user mental health patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">User Name</TableHead>
                  <TableHead className="font-semibold">Mood Pattern</TableHead>
                  <TableHead className="font-semibold">Risk Prediction</TableHead>
                  <TableHead className="font-semibold">Trend</TableHead>
                  <TableHead className="font-semibold">AI Suggestions</TableHead>
                  <TableHead className="font-semibold">Last Updated</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => (
                  <TableRow key={analysis.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{analysis.userName}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getPatternColor(analysis.moodPattern)}`}>
                        {analysis.moodPattern}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskBadgeColor(analysis.riskPrediction)}>
                        {analysis.riskPrediction}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {analysis.trend}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {analysis.suggestions}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {analysis.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10">
                        <BrainCircuit className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalysis;
