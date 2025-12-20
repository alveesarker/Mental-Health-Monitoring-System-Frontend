/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { SessionCard } from "./DSessionCard";
import { Button } from "./ui/button";

/* ================= TYPES ================= */


export const UpcomingSessions = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingSessions = async () => {
      try {
        setLoading(true);

        // TODO: replace with auth-based patientID later
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const res = await fetch(
          `http://localhost:5000/sessions/${user.userID}/pending`
        );

        if (!res.ok) throw new Error("Failed to fetch sessions");

        const json = await res.json();
        setSessions(json.data || []);
      } catch (error) {
        console.error("Fetch pending sessions error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingSessions();
  }, []);

  
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function to12Hour(time24) {
    const [hour, minute] = time24.split(":");
    return new Date(0, 0, 0, hour, minute).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <Card className="border-[1px] bg-gradient-to-br from-background to-muted/40 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/10 rounded-t-xl">
        <CardTitle className="flex items-center gap-2 text-foreground font-semibold tracking-tight">
          <CalendarIcon className="h-5 w-5 text-primary animate-pulse" />
          Upcoming Sessions
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        {loading ? (
          <p className="text-sm text-muted-foreground text-center">
            Loading sessions...
          </p>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center">
            No upcoming sessions
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sessions.map((session, index) => (
              <div
                key={index}
                className="rounded-md shadow-sm hover:shadow-xl"
              >
                <SessionCard {...session} />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Link to={"/session/book"}>
        <Button
          size="sm"
          variant="default"
          className="w-[96.5%] h-10 relative gap-1.5 mb-5 left-[50%] translate-x-[-50%]"
        >
          <MessageSquare className="h-4 w-4" />
          Book Another Session
        </Button>
      </Link>
    </Card>
  );
};
