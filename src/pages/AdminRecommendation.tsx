import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, PlusCircle, Search, Trash2 } from "lucide-react";
import { useState } from "react";

export interface Recommendation {
  id: string;
  icon: string;
  title: string;
  description: string;
  fullDescription: string;
}

// Base Recommendation List
const initialRecommendations = [
  {
    id: "meditation",
    icon: "brain",
    title: "Try a 10-minute Meditation",
    description: "Based on your moderate stress level",
    fullDescription:
      "Meditation is a powerful tool for reducing stress and anxiety. This 10-minute guided meditation will help you focus on your breath, clear your mind, and find inner peace. Regular meditation practice has been shown to lower cortisol levels, improve focus, and enhance emotional well-being. Start with just 10 minutes a day and gradually build up your practice for maximum benefits.",
  },
  {
    id: "sleep",
    icon: "moon",
    title: "Review Sleep Hygiene Tips",
    description: "Optimize your 7.5 hours of sleep",
    fullDescription:
      "Meditation is a powerful tool for reducing stress and anxiety. This 10-minute guided meditation will help you focus on your breath, clear your mind, and find inner peace. Regular meditation practice has been shown to lower cortisol levels, improve focus, and enhance emotional well-being. Start with just 10 minutes a day and gradually build up your practice for maximum benefits.",
  },
  {
    id: "journaling-1",
    icon: "bookOpen",
    title: "Journal Your Stressors",
    description: "Reflect on what's causing stress",
    fullDescription:
      "Meditation is a powerful tool for reducing stress and anxiety. This 10-minute guided meditation will help you focus on your breath, clear your mind, and find inner peace. Regular meditation practice has been shown to lower cortisol levels, improve focus, and enhance emotional well-being. Start with just 10 minutes a day and gradually build up your practice for maximum benefits.",
  },
];

export default function AdminRecommendation() {
  const [recommendations, setRecommendations] = useState(
    initialRecommendations
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedRec, setSelectedRec] = useState<Recommendation>(null);

  // New recommendation state
  const [newRec, setNewRec] = useState({
    id: "",
    icon: "",
    title: "",
    description: "",
    fullDescription: "",
  });

  // Filter by title
  const filteredRecs = recommendations.filter((rec) =>
    rec.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (!newRec.id || !newRec.title) return;

    setRecommendations([...recommendations, newRec]);
    setNewRec({
      id: "",
      icon: "",
      title: "",
      description: "",
      fullDescription: "",
    });
    setOpenAdd(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Recommendation Management
          </h1>
          <p className="text-muted-foreground">
            Manage mental health recommendations
          </p>
        </div>

        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Recommendation
            </Button>
          </DialogTrigger>

          {/* Add Recommendation Form */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Recommendation</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Input
                placeholder="Recommendation ID"
                value={newRec.id}
                onChange={(e) => setNewRec({ ...newRec, id: e.target.value })}
              />
              <Select
                value={newRec.icon}
                onValueChange={(v) => setNewRec({ ...newRec, icon: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brain">Brain</SelectItem>
                  <SelectItem value="moon">Moon</SelectItem>
                  <SelectItem value="heart">Heart</SelectItem>
                  <SelectItem value="sparkles">Sparkles</SelectItem>
                  <SelectItem value="bookOpen">Book Open</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Title"
                value={newRec.title}
                onChange={(e) =>
                  setNewRec({ ...newRec, title: e.target.value })
                }
              />

              <Input
                placeholder="Short Description"
                value={newRec.description}
                onChange={(e) =>
                  setNewRec({ ...newRec, description: e.target.value })
                }
              />

              <Input
                placeholder="Full Description"
                value={newRec.fullDescription}
                onChange={(e) =>
                  setNewRec({ ...newRec, fullDescription: e.target.value })
                }
              />
            </div>

            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpenAdd(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recommendation Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recommendations</CardTitle>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredRecs.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>{rec.id}</TableCell>
                  <TableCell>{rec.icon}</TableCell>
                  <TableCell className="font-medium">{rec.title}</TableCell>
                  <TableCell>{rec.description}</TableCell>

                  <TableCell className="text-right space-x-2">
                    {/* View */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedRec(rec);
                        setOpenView(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>

                    {/* Delete */}
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredRecs.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No recommendations found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="p-0 max-w-lg">
          <DialogHeader className="p-6 pb-3">
            <DialogTitle>{selectedRec?.title}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] px-6">
            <div className="space-y-3 pb-6">
              <p className="text-sm text-muted-foreground">
                <strong>Icon:</strong> {selectedRec?.icon}
              </p>

              <p className="text-sm leading-relaxed whitespace-pre-line">
                {selectedRec?.fullDescription}
              </p>
            </div>
          </ScrollArea>

          <DialogFooter className="p-6 pt-3">
            <Button onClick={() => setOpenView(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
