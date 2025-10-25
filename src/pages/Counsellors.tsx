import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Star, Users } from "lucide-react";

const counsellors = [
  {
    id: "CNS001",
    name: "Dr. Robert Wilson",
    specialization: "Anxiety & Depression",
    availability: "online",
    rating: 4.8,
    assignedUsers: 23,
    sessions: 156,
  },
  {
    id: "CNS002",
    name: "Dr. Lisa Anderson",
    specialization: "Trauma & PTSD",
    availability: "offline",
    rating: 4.9,
    assignedUsers: 18,
    sessions: 142,
  },
  {
    id: "CNS003",
    name: "Dr. David Martinez",
    specialization: "Stress Management",
    availability: "online",
    rating: 4.7,
    assignedUsers: 31,
    sessions: 189,
  },
];

export default function Counsellors() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Counsellor Management
          </h1>
          <p className="text-muted-foreground">
            Manage mental health professionals and their caseloads
          </p>
        </div>
        <Button>Add Counsellor</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {counsellors.map((counsellor) => (
          <Card key={counsellor.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {counsellor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{counsellor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {counsellor.specialization}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    counsellor.availability === "online"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    counsellor.availability === "online" ? "bg-success" : ""
                  }
                >
                  {counsellor.availability}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold">{counsellor.rating}</span>
                <span className="text-sm text-muted-foreground">rating</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      {counsellor.assignedUsers}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Assigned Users
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <Calendar className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">{counsellor.sessions}</p>
                    <p className="text-xs text-muted-foreground">
                      Total Sessions
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  View Profile
                </Button>
                <Button className="flex-1">Assign Users</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
