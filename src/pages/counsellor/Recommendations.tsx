import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  patient: string;
  dateCreated: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Mindfulness Practice",
    description: "Daily meditation to reduce anxiety levels",
    fullDescription: "Engage in 10-15 minutes of guided meditation each morning. Focus on breath awareness and body scanning techniques. This practice helps regulate the nervous system and provides tools for managing anxiety throughout the day.",
    patient: "Sarah Johnson",
    dateCreated: "2024-01-15",
  },
  {
    id: "2",
    title: "Journaling Routine",
    description: "Evening reflection to process emotions",
    fullDescription: "Maintain a daily journal focusing on three things: emotions felt during the day, situations that triggered them, and alternative perspectives. This cognitive restructuring technique helps identify patterns and develop healthier thought processes.",
    patient: "Michael Chen",
    dateCreated: "2024-01-14",
  },
  {
    id: "3",
    title: "Social Connection Plan",
    description: "Weekly activities to reduce isolation",
    fullDescription: "Schedule at least two social interactions per week with trusted friends or family members. Activities can include coffee meetings, phone calls, or shared hobbies. Building social support is crucial for emotional wellbeing.",
    patient: "Emma Wilson",
    dateCreated: "2024-01-13",
  },
];

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredRecommendations = recommendations.filter(
    (rec) =>
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Personalized Recommendations
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage therapeutic recommendations for your patients
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Recommendation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Recommendation</DialogTitle>
              <DialogDescription>
                Provide personalized guidance for your patient's wellbeing journey
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Morning Meditation Practice" />
              </div>
              <div>
                <Label htmlFor="description">Short Description</Label>
                <Input
                  id="description"
                  placeholder="Brief summary (1-2 lines)"
                />
              </div>
              <div>
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  placeholder="Detailed explanation and instructions..."
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Recommendation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title or patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRecommendations.map((recommendation) => (
          <Card
            key={recommendation.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {recommendation.patient}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {recommendation.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(recommendation.dateCreated).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRecommendation(recommendation);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedRecommendation?.title}</DialogTitle>
            <DialogDescription>
              For: {selectedRecommendation?.patient} • Created:{" "}
              {selectedRecommendation?.dateCreated &&
                new Date(selectedRecommendation.dateCreated).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Summary</h4>
              <p className="text-sm text-muted-foreground">
                {selectedRecommendation?.description}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Detailed Guidance</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedRecommendation?.fullDescription}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button>Edit Recommendation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recommendations;
