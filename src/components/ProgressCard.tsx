/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/daily-logs/";

export const ProgressCard = () => {
  const [data, setData] = useState<
    { day: string; mood: number; stress: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const moodMap: Record<string, number> = {
    Great: 9,
    Good: 7,
    Okay: 5,
    Low: 3,
    Difficult: 1,
  };

  const fetchDailyLogs = async () => {
    if (!user?.userID) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}${user.userID}/last7`);
      const result = await res.json();

      if (result.success) {
        // Convert mood to number and stress to number
        const mappedLogs = result.logs.map((log: any) => ({
          day: log.day,
          mood: moodMap[log.mood] ?? 0,
          stress: Number(log.stress) || 0,
        }));

        // Optional: sort oldest → newest
        mappedLogs.reverse();

        setData(mappedLogs);
      } else {
        toast.error("Failed to load daily logs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load daily logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyLogs();
  }, []);

  return (
    <Card className="p-5 w-[470px] h-[410px] flex flex-col justify-between shadow-md border border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground tracking-tight">
          Your 7-Day Mood Trend
        </h3>
        <p className="text-sm text-muted-foreground">
          Track your emotional patterns over time
        </p>
      </div>

      {/* Chart */}
      <div className="h-[220px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--accent))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--accent))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "12px" }}
              domain={[0, 10]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="hsl(var(--primary))"
              fill="url(#colorMood)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="hsl(var(--accent))"
              fill="url(#colorStress)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Mood</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-muted-foreground">Stress</span>
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-3">
        <Card className="p-3 bg-muted/40 border-primary/20 shadow-inner rounded-lg">
          <p className="text-sm text-foreground leading-snug">
            <span className="font-medium">AI Insight:</span> Your stress levels
            peaked mid-week. Try brief breathing exercises during work breaks.
          </p>
        </Card>
      </div>
    </Card>
  );
};
