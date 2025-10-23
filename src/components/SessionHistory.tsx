import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FileText, Star } from "lucide-react";

const sessionHistory = [
  {
    id: "S-1234",
    patient: "Emily Johnson",
    date: "Oct 20, 2025",
    duration: "60 min",
    rating: 5,
    hasNotes: true,
  },
  {
    id: "S-1233",
    patient: "Michael Brown",
    date: "Oct 19, 2025",
    duration: "45 min",
    rating: 4,
    hasNotes: true,
  },
  {
    id: "S-1232",
    patient: "Sarah Davis",
    date: "Oct 18, 2025",
    duration: "60 min",
    rating: 5,
    hasNotes: false,
  },
  {
    id: "S-1231",
    patient: "James Wilson",
    date: "Oct 17, 2025",
    duration: "50 min",
    rating: 4,
    hasNotes: true,
  },
];

export const SessionHistory = () => {
  return (
    <Card className="border-[1px] shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
      {" "}
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/10 rounded-t-xl">
        {" "}
        <CardTitle className="flex items-center gap-2 text-foreground font-semibold">
          {" "}
          <FileText className="h-5 w-5 text-primary" />
          Session History & Feedback{" "}
        </CardTitle>{" "}
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-lg border border-border/50 overflow-hidden bg-background/50">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wide">
                  Session ID
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wide">
                  Patient Name
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wide">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wide">
                  Duration
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wide">
                  My Rating
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wide">
                  Notes
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground text-right uppercase text-xs tracking-wide">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sessionHistory.map((session) => (
                <TableRow
                  key={session.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <TableCell className="font-medium text-primary">
                    {session.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {session.patient}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.date}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {session.duration}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">
                        {session.rating}.0
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {session.hasNotes ? (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-700 border-green-200"
                      >
                        Available
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-500 border-gray-200"
                      >
                        None
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1.5 text-primary hover:bg-primary/5"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="font-medium">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

// import { Star, FileText, Eye } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
// Table,
// TableBody,
// TableCell,
// TableHead,
// TableHeader,
// TableRow,
// } from "@/components/ui/table";

// const sessionHistory = [
// { id: "S-1234", patient: "Emily Johnson", date: "Oct 20, 2025", duration: "60 min", rating: 5, hasNotes: true },
// { id: "S-1233", patient: "Michael Brown", date: "Oct 19, 2025", duration: "45 min", rating: 4, hasNotes: true },
// { id: "S-1232", patient: "Sarah Davis", date: "Oct 18, 2025", duration: "60 min", rating: 5, hasNotes: false },
// { id: "S-1231", patient: "James Wilson", date: "Oct 17, 2025", duration: "50 min", rating: 4, hasNotes: true },
// ];

// export const SessionHistory = () => {
// return (
// ```

// );
// };
