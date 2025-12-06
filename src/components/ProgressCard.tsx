import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "25/7", mood: 2, stress: 3 },
  { day: "26/7", mood: 2, stress: 9 },
  { day: "27/7", mood: 3, stress: 5 },
  { day: "27/7", mood: 4, stress: 3 },
  { day: "29/7", mood: 7, stress: 2 },
  { day: "30/7", mood: 4, stress: 1 },
  { day: "1/8", mood: 6, stress: 3 },
  { day: "2/8", mood: 9, stress: 6 },
];

export const ProgressCard = () => {
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
        <ResponsiveContainer width="100%" height="100%" >
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
